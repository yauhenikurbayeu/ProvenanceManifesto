import type { SupportedLang } from '../i18n/utils';
import { marked } from 'marked';

const markdownLoaders = import.meta.glob('/blog/**/*.md');
const markdownRaw = import.meta.glob('/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const ENGLISH_ARTICLE_PATTERN = /^\/blog\/(?!README\.md$)([^/]+)\.md$/i;
const LOCALIZED_ARTICLE_PATTERN = /^\/blog\/([a-z]{2})\/(?!README\.md$)([^/]+)\.md$/i;
const ENGLISH_README_PATTERN = /^\/blog\/README\.md$/i;
const LOCALIZED_README_PATTERN = /^\/blog\/([a-z]{2})\/README\.md$/i;

marked.setOptions({
  gfm: true
});

export interface BlogArticle {
  lang: SupportedLang;
  slug: string;
  title: string;
  author: string;
  publishedLabel: string;
  publishedISO: string;
  tldr: string;
  keywords: string[];
  linkedInUrl: string;
  sourcePath: string;
}

function firstRegexGroup(content: string, pattern: RegExp): string {
  const match = content.match(pattern);
  return (match?.[1] || '').trim();
}

function cleanInlineMarkdown(value: string): string {
  return value
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeSlug(value: string): string {
  return cleanInlineMarkdown(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTitle(content: string, fallback: string): string {
  const fromHeading = firstRegexGroup(content, /^#\s+(.+)$/m);
  return cleanInlineMarkdown(fromHeading || fallback);
}

function getAuthor(content: string): string {
  const author = firstRegexGroup(content, /\*\*Author:\*\*\s*(.+)$/im);
  return cleanInlineMarkdown(author || 'Yauheni Kurbayeu');
}

function getPublishedLabel(content: string): string {
  const published = firstRegexGroup(content, /\*\*Published:\*\*\s*(.+)$/im);
  return cleanInlineMarkdown(published || 'Jan 1, 2026');
}

function toISODate(label: string): string {
  const parsed = new Date(label);
  if (Number.isNaN(parsed.getTime())) {
    return '2026-01-01';
  }

  const year = parsed.getUTCFullYear();
  const month = `${parsed.getUTCMonth() + 1}`.padStart(2, '0');
  const day = `${parsed.getUTCDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getLinkedInUrl(content: string): string {
  const linkedInMatch = content.match(/https?:\/\/(?:www\.)?linkedin\.com\/[^\s)]+/i);
  return linkedInMatch?.[0] || 'https://www.linkedin.com/in/yauhenikurbayeu/';
}

function getTldr(content: string): string {
  const tldrSection = content.match(/\n##\s*TL;DR\s*\n([\s\S]*?)(?:\n##\s|$)/i);
  if (tldrSection?.[1]) {
    return cleanInlineMarkdown(tldrSection[1]);
  }

  const withoutHeader = content
    .replace(/^#\s+.+$/m, '')
    .replace(/\*\*Author:\*\*.+$/gim, '')
    .replace(/\*\*Published:\*\*.+$/gim, '')
    .replace(/\*\*\[.*?\]\(.*?\)\*\*$/gim, '')
    .trim();

  const paragraphs = withoutHeader
    .split(/\n\s*\n/)
    .map((part) => cleanInlineMarkdown(part))
    .filter((part) => part.length > 40 && !part.startsWith('##'));

  return paragraphs[0] || 'Traceable decisions and institutional memory are essential for resilient delivery teams in the AI era.';
}

function getKeywords(title: string, tldr: string): string[] {
  const defaults = ['Provenance Manifesto', 'Decision Memory', 'AI Governance', 'SDLC Memory'];
  const titleTerms = `${title} ${tldr}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((term) => term.length > 3);

  const uniqueTerms = Array.from(new Set(titleTerms)).slice(0, 8);
  return Array.from(new Set([...defaults, ...uniqueTerms]));
}

function getReadmeTldrBySlug(lang: SupportedLang): Map<string, string> {
  const readmePath = getBlogReadmePath(lang);
  const readmeContent = readmePath ? getMarkdownRawContent(readmePath) : null;
  if (!readmeContent) {
    return new Map<string, string>();
  }

  const sections = readmeContent
    .split(/\n(?=#\s+)/)
    .map((section) => section.trim())
    .filter((section) => section.startsWith('# '));

  const map = new Map<string, string>();

  for (const section of sections) {
    const heading = firstRegexGroup(section, /^#\s+(.+)$/m);
    if (!heading) {
      continue;
    }

    const tldr = firstRegexGroup(section, /\*\*TL;DR\s*:?[ \t]*([\s\S]*?)\*\*/im);
    const normalizedSlug = normalizeSlug(heading);
    const cleanTldr = cleanInlineMarkdown(tldr);

    if (normalizedSlug && cleanTldr) {
      map.set(normalizedSlug, cleanTldr);
    }
  }

  return map;
}

function createArticle(lang: SupportedLang, slug: string, rawContent: string): BlogArticle {
  const title = getTitle(rawContent, slug.replace(/-/g, ' '));
  const publishedLabel = getPublishedLabel(rawContent);
  const publishedISO = toISODate(publishedLabel);
  const tldr = getTldr(rawContent);

  return {
    lang,
    slug,
    title,
    author: getAuthor(rawContent),
    publishedLabel,
    publishedISO,
    tldr,
    keywords: getKeywords(title, tldr),
    linkedInUrl: getLinkedInUrl(rawContent),
    sourcePath: ''
  };
}

function sortByPublishedDateDesc(posts: BlogArticle[]): BlogArticle[] {
  return [...posts].sort((a, b) => b.publishedISO.localeCompare(a.publishedISO));
}

export function getEnglishBlogArticles(): BlogArticle[] {
  const readmeTldrBySlug = getReadmeTldrBySlug('en');

  const posts = Object.entries(markdownRaw)
    .map(([path, rawContent]) => {
      const match = path.match(ENGLISH_ARTICLE_PATTERN);
      if (!match) {
        return null;
      }

      const article = createArticle('en', match[1], rawContent);
      const readmeTldr = readmeTldrBySlug.get(normalizeSlug(match[1]));
      if (readmeTldr) {
        article.tldr = readmeTldr;
        article.keywords = getKeywords(article.title, readmeTldr);
      }
      article.sourcePath = path;
      return article;
    })
    .filter((article): article is BlogArticle => Boolean(article));

  return sortByPublishedDateDesc(posts);
}

export function getLocalizedBlogArticles(lang: SupportedLang): BlogArticle[] {
  if (lang === 'en') {
    return getEnglishBlogArticles();
  }

  const readmeTldrBySlug = getReadmeTldrBySlug(lang);

  const posts = Object.entries(markdownRaw)
    .map(([path, rawContent]) => {
      const match = path.match(LOCALIZED_ARTICLE_PATTERN);
      if (!match || match[1] !== lang) {
        return null;
      }

      const article = createArticle(lang, match[2], rawContent);
      const readmeTldr = readmeTldrBySlug.get(normalizeSlug(match[2]));
      if (readmeTldr) {
        article.tldr = readmeTldr;
        article.keywords = getKeywords(article.title, readmeTldr);
      }
      article.sourcePath = path;
      return article;
    })
    .filter((article): article is BlogArticle => Boolean(article));

  return sortByPublishedDateDesc(posts);
}

export function getBlogReadmePath(lang: SupportedLang): string | null {
  const paths = Object.keys(markdownRaw);
  if (lang === 'en') {
    return paths.find((path) => ENGLISH_README_PATTERN.test(path)) || null;
  }

  return (
    paths.find((path) => {
      const match = path.match(LOCALIZED_README_PATTERN);
      return Boolean(match && match[1] === lang);
    }) || null
  );
}

export function getLocalizedBlogLanguages(): SupportedLang[] {
  const localizedLanguages = new Set<SupportedLang>();

  if (getBlogReadmePath('en') && getEnglishBlogArticles().length > 0) {
    localizedLanguages.add('en');
  }

  for (const path of Object.keys(markdownRaw)) {
    const readmeMatch = path.match(LOCALIZED_README_PATTERN);
    if (!readmeMatch) {
      continue;
    }

    const lang = readmeMatch[1] as SupportedLang;
    const hasArticles = getLocalizedBlogArticles(lang).length > 0;
    if (hasArticles) {
      localizedLanguages.add(lang);
    }
  }

  return Array.from(localizedLanguages);
}

export async function getMarkdownContent(path: string) {
  const loader = markdownLoaders[path];
  if (!loader) {
    return null;
  }

  const mod = await loader();
  return mod as { Content: unknown };
}

export function getMarkdownRawContent(path: string): string | null {
  return markdownRaw[path] ?? null;
}

export function getMarkdownHtml(path: string): string | null {
  const rawContent = getMarkdownRawContent(path);
  if (!rawContent) {
    return null;
  }

  return marked.parse(rawContent) as string;
}
