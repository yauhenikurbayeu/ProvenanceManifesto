import type { SupportedLang } from '../i18n/utils';
import { marked } from 'marked';

const markdownLoaders = import.meta.glob('/blog/**/*.md');
const markdownRaw = import.meta.glob('/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;
const blogManifestRaw = import.meta.glob('/blog/manifest.json', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const MANIFEST_PATH = '/blog/manifest.json';
const SUPPORTED_BLOG_LANGS: SupportedLang[] = ['en', 'de', 'es', 'fr', 'pl', 'ru'];
const ENGLISH_ARTICLE_PATTERN = /^\/blog\/(?!README\.md$)([^/]+)\.md$/i;
const LOCALIZED_ARTICLE_PATTERN = /^\/blog\/([a-z]{2})\/(?!README\.md$)([^/]+)\.md$/i;

interface BlogManifestLanguageRule {
  file: string;
  published?: boolean;
  tldr?: string;
}

interface BlogManifestArticleRule {
  id: string;
  canonicalSlug: string;
  languages: Partial<Record<SupportedLang, BlogManifestLanguageRule>>;
}

interface BlogManifest {
  articles: BlogManifestArticleRule[];
}

marked.setOptions({
  gfm: true
});

function normalizeBlogSourcePath(pathLike: string): string {
  const normalizedPath = pathLike.trim().replace(/^\.\//, '');
  if (normalizedPath.startsWith('/blog/')) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith('blog/')) {
    return `/${normalizedPath}`;
  }

  return `/blog/${normalizedPath.replace(/^\//, '')}`;
}

function parseBlogManifest(): BlogManifest {
  const raw = blogManifestRaw[MANIFEST_PATH];
  if (!raw) {
    return { articles: [] };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<BlogManifest>;
    if (!Array.isArray(parsed.articles)) {
      return { articles: [] };
    }

    const rules = parsed.articles
      .filter((rule): rule is BlogManifestArticleRule => Boolean(rule && rule.canonicalSlug && rule.languages))
      .map((rule) => ({
        ...rule,
        canonicalSlug: rule.canonicalSlug.trim()
      }))
      .filter((rule) => Boolean(rule.canonicalSlug));

    return { articles: rules };
  } catch {
    return { articles: [] };
  }
}

const blogManifest = parseBlogManifest();

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

export interface BlogTocItem {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

export interface BlogMarkdownRenderResult {
  html: string;
  toc: BlogTocItem[];
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
  return cleanInlineMarkdown(value.replace(/_/g, ' '))
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeHeadingId(value: string): string {
  const normalized = cleanInlineMarkdown(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'section';
}

function createHeadingIdGenerator() {
  const counts = new Map<string, number>();

  return (text: string): string => {
    const baseId = normalizeHeadingId(text);
    const count = counts.get(baseId) ?? 0;
    counts.set(baseId, count + 1);

    return count === 0 ? baseId : `${baseId}-${count + 1}`;
  };
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

function createManifestBackedArticle(
  lang: SupportedLang,
  rule: BlogManifestArticleRule,
  sourcePath: string,
  rawContent: string
): BlogArticle {
  const langRule = rule.languages[lang];
  if (!langRule) {
    throw new Error(`Missing manifest language rule for ${lang}:${rule.canonicalSlug}`);
  }

  const tldr = cleanInlineMarkdown(langRule.tldr || '');

  if (!tldr) {
    throw new Error(`Manifest metadata is incomplete for ${lang}:${rule.canonicalSlug}. Required: tldr.`);
  }

  const article = createArticle(lang, rule.canonicalSlug, rawContent);
  article.tldr = tldr;
  article.keywords = getKeywords(article.title, tldr);
  article.sourcePath = sourcePath;
  return article;
}

function getManifestSourcePath(rule: BlogManifestArticleRule, lang: SupportedLang): string | null {
  const langRule = rule.languages[lang];
  if (!langRule || langRule.published === false) {
    return null;
  }

  const sourcePath = normalizeBlogSourcePath(langRule.file);
  if (!markdownRaw[sourcePath]) {
    return null;
  }

  return sourcePath;
}

function sortByPublishedDateDesc(posts: BlogArticle[]): BlogArticle[] {
  return [...posts].sort((a, b) => b.publishedISO.localeCompare(a.publishedISO));
}

function getEnglishHiddenArticles(excludePaths: Set<string>, excludeSlugs: Set<string>): BlogArticle[] {
  return Object.entries(markdownRaw)
    .map(([path, rawContent]) => {
      const match = path.match(ENGLISH_ARTICLE_PATTERN);
      if (!match || excludePaths.has(path) || excludeSlugs.has(match[1])) {
        return null;
      }

      const article = createArticle('en', match[1], rawContent);
      article.sourcePath = path;
      return article;
    })
    .filter((article): article is BlogArticle => Boolean(article));
}

function getLocalizedHiddenArticles(
  lang: SupportedLang,
  excludePaths: Set<string>,
  excludeSlugs: Set<string>
): BlogArticle[] {
  if (lang === 'en') {
    return getEnglishHiddenArticles(excludePaths, excludeSlugs);
  }

  return Object.entries(markdownRaw)
    .map(([path, rawContent]) => {
      const match = path.match(LOCALIZED_ARTICLE_PATTERN);
      if (!match || match[1] !== lang || excludePaths.has(path) || excludeSlugs.has(match[2])) {
        return null;
      }

      const article = createArticle(lang, match[2], rawContent);
      article.sourcePath = path;
      return article;
    })
    .filter((article): article is BlogArticle => Boolean(article));
}

function getManifestBackedArticles(lang: SupportedLang): {
  articles: BlogArticle[];
  usedPaths: Set<string>;
  usedSlugs: Set<string>;
} {
  const usedPaths = new Set<string>();
  const usedSlugs = new Set<string>();

  const manifestPosts = blogManifest.articles
    .map((rule) => {
      const sourcePath = getManifestSourcePath(rule, lang);
      if (!sourcePath || usedSlugs.has(rule.canonicalSlug)) {
        return null;
      }

      const article = createManifestBackedArticle(lang, rule, sourcePath, markdownRaw[sourcePath]);
      usedPaths.add(sourcePath);
      usedSlugs.add(rule.canonicalSlug);
      return article;
    })
    .filter((article): article is BlogArticle => Boolean(article));

  return {
    articles: manifestPosts,
    usedPaths,
    usedSlugs
  };
}

interface GetBlogArticlesOptions {
  includeHidden?: boolean;
}

export function getEnglishBlogArticles(options: GetBlogArticlesOptions = {}): BlogArticle[] {
  const { articles: manifestPosts, usedPaths, usedSlugs } = getManifestBackedArticles('en');
  const hiddenPosts = options.includeHidden ? getEnglishHiddenArticles(usedPaths, usedSlugs) : [];

  return sortByPublishedDateDesc([...manifestPosts, ...hiddenPosts]);
}

export function getLocalizedBlogArticles(lang: SupportedLang, options: GetBlogArticlesOptions = {}): BlogArticle[] {
  if (lang === 'en') {
    return getEnglishBlogArticles(options);
  }

  const { articles: manifestPosts, usedPaths, usedSlugs } = getManifestBackedArticles(lang);
  const hiddenPosts = options.includeHidden ? getLocalizedHiddenArticles(lang, usedPaths, usedSlugs) : [];

  return sortByPublishedDateDesc([...manifestPosts, ...hiddenPosts]);
}

export function getLocalizedBlogLanguages(): SupportedLang[] {
  const localizedLanguages = new Set<SupportedLang>();

  for (const lang of SUPPORTED_BLOG_LANGS) {
    const hasArticles = getLocalizedBlogArticles(lang, { includeHidden: true }).length > 0;
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

export function getMarkdownRenderResult(path: string): BlogMarkdownRenderResult | null {
  const rawContent = getMarkdownRawContent(path);
  if (!rawContent) {
    return null;
  }

  const toc: BlogTocItem[] = [];
  const nextHeadingId = createHeadingIdGenerator();
  const renderer = new marked.Renderer();

  renderer.heading = ({ text: rawText, depth }) => {
    const text = cleanInlineMarkdown(rawText);
    const id = nextHeadingId(text);

    if (depth >= 2 && depth <= 4) {
      toc.push({
        id,
        text,
        level: depth as 2 | 3 | 4
      });
    }

    const innerHtml = marked.parseInline(rawText) as string;
    return `<h${depth} id="${id}">${innerHtml}</h${depth}>`;
  };

  return {
    html: marked.parse(rawContent, { renderer }) as string,
    toc
  };
}

export function getMarkdownHtml(path: string): string | null {
  return getMarkdownRenderResult(path)?.html ?? null;
}
