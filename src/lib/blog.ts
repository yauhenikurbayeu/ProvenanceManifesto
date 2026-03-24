import type { SupportedLang } from '../i18n/utils';
import { marked } from 'marked';
import { codeToHtml } from 'shiki';

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
const ARTIFACT_PATTERN = /^\/blog\/artifacts\/(?!README\.md$)(.+)\.md$/i;
const DEFAULT_BLOG_CATEGORIES = {
  provenance_philosophy: {},
  technical_articles: {},
  other: {}
} as const;
const DEFAULT_BLOG_CATEGORY_KEYS = Object.keys(DEFAULT_BLOG_CATEGORIES);

interface BlogManifestLanguageRule {
  file: string;
  published?: boolean;
  tldr?: string;
}

interface BlogManifestArticleRule {
  id: string;
  canonicalSlug: string;
  category?: string;
  languages: Partial<Record<SupportedLang, BlogManifestLanguageRule>>;
}

interface BlogManifest {
  categories: Record<string, Record<string, never>>;
  categoryKeys: string[];
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
    return {
      categories: DEFAULT_BLOG_CATEGORIES,
      categoryKeys: DEFAULT_BLOG_CATEGORY_KEYS,
      articles: []
    };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<BlogManifest>;
    const categoryKeys =
      parsed.categories && typeof parsed.categories === 'object'
        ? Object.keys(parsed.categories).map((key) => key.trim()).filter(Boolean)
        : [];
    const effectiveCategoryKeys = categoryKeys.length > 0 ? categoryKeys : DEFAULT_BLOG_CATEGORY_KEYS;

    if (!Array.isArray(parsed.articles)) {
      return {
        categories: Object.fromEntries(effectiveCategoryKeys.map((key) => [key, {}])),
        categoryKeys: effectiveCategoryKeys,
        articles: []
      };
    }

    const rules = parsed.articles
      .filter((rule): rule is BlogManifestArticleRule => Boolean(rule && rule.canonicalSlug && rule.languages))
      .map((rule) => ({
        ...rule,
        canonicalSlug: rule.canonicalSlug.trim(),
        category: typeof rule.category === 'string' ? rule.category.trim() : undefined
      }))
      .filter((rule) => Boolean(rule.canonicalSlug));

    return {
      categories: Object.fromEntries(effectiveCategoryKeys.map((key) => [key, {}])),
      categoryKeys: effectiveCategoryKeys,
      articles: rules
    };
  } catch {
    return {
      categories: DEFAULT_BLOG_CATEGORIES,
      categoryKeys: DEFAULT_BLOG_CATEGORY_KEYS,
      articles: []
    };
  }
}

const blogManifest = parseBlogManifest();
const blogCategoryKeySet = new Set(blogManifest.categoryKeys);

export type BlogCategoryKey = string;

function getFallbackBlogCategoryKey(): BlogCategoryKey {
  return blogManifest.categoryKeys[blogManifest.categoryKeys.length - 1] ?? 'other';
}

function normalizeBlogCategoryKey(category?: string): BlogCategoryKey {
  if (category && blogCategoryKeySet.has(category)) {
    return category;
  }

  return getFallbackBlogCategoryKey();
}

export interface BlogArticle {
  lang: SupportedLang;
  slug: string;
  category: BlogCategoryKey;
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

export interface BlogArtifact {
  slug: string;
  title: string;
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
  return cleanInlineMarkdown(value.replace(/_/g, ' '))
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugToTitle(slug: string): string {
  return slug
    .split('/')
    .map((segment) =>
      segment
        .replace(/[_.-]+/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join(' / ');
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

function createArticle(lang: SupportedLang, slug: string, rawContent: string, category?: string): BlogArticle {
  const title = getTitle(rawContent, slug.replace(/-/g, ' '));
  const publishedLabel = getPublishedLabel(rawContent);
  const publishedISO = toISODate(publishedLabel);
  const tldr = getTldr(rawContent);

  return {
    lang,
    slug,
    category: normalizeBlogCategoryKey(category),
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
  article.category = normalizeBlogCategoryKey(rule.category);
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

export function getBlogCategoryKeys(): BlogCategoryKey[] {
  return [...blogManifest.categoryKeys];
}

export function getPrimaryBlogCategoryKey(): BlogCategoryKey {
  return blogManifest.categoryKeys[0] ?? 'provenance_philosophy';
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

export function getLocalizedBlogArticlesByCategory(
  lang: SupportedLang,
  category: BlogCategoryKey,
  options: GetBlogArticlesOptions = {}
): BlogArticle[] {
  const normalizedCategory = normalizeBlogCategoryKey(category);
  return getLocalizedBlogArticles(lang, options).filter((article) => article.category === normalizedCategory);
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

function collectCodeBlocks(tokenList: any[]): Array<{ text: string; lang: string }> {
  const result: Array<{ text: string; lang: string }> = [];
  for (const token of tokenList) {
    if (token.type === 'code') {
      result.push({ text: token.text as string, lang: (token.lang as string) || '' });
    }
    const nested: any[] =
      token.tokens ??
      token.items?.flatMap((item: any) => item.tokens ?? []) ??
      [];
    if (nested.length > 0) {
      result.push(...collectCodeBlocks(nested));
    }
  }
  return result;
}

function normalizeLang(raw: string): string {
  return raw.split(/[\s:{]/)[0].toLowerCase() || 'text';
}

export async function getMarkdownRenderResultFromRaw(rawContent: string): Promise<BlogMarkdownRenderResult | null> {
  if (!rawContent) {
    return null;
  }

  // Pre-highlight all code blocks in parallel using Shiki
  const codeBlocks = collectCodeBlocks(marked.lexer(rawContent) as any[]);
  const highlightCache = new Map<string, string>();

  await Promise.all(
    codeBlocks.map(async ({ text, lang: rawLang }) => {
      const lang = normalizeLang(rawLang);
      const key = `${lang}\0${text}`;
      if (highlightCache.has(key)) return;
      try {
        const html = await codeToHtml(text, { lang, theme: 'github-dark' });
        highlightCache.set(key, html);
      } catch {
        highlightCache.set(key, ''); // unsupported language — will use fallback renderer
      }
    })
  );

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

  renderer.code = ({ text, lang: rawLang }) => {
    const lang = normalizeLang(rawLang ?? '');
    const key = `${lang}\0${text}`;
    const highlighted = highlightCache.get(key);
    if (highlighted) return highlighted;
    // Fallback for unsupported languages
    return `<pre class="shiki" style="background-color:#24292e;color:#e1e4e8"><code class="language-${lang}">${text}</code></pre>`;
  };

  return {
    html: marked.parse(rawContent, { renderer }) as string,
    toc
  };
}

export async function getMarkdownRenderResult(path: string): Promise<BlogMarkdownRenderResult | null> {
  const rawContent = getMarkdownRawContent(path);
  if (!rawContent) {
    return null;
  }

  return getMarkdownRenderResultFromRaw(rawContent);
}

export async function getMarkdownHtml(path: string): Promise<string | null> {
  const result = await getMarkdownRenderResult(path);
  return result?.html ?? null;
}

export function getBlogArtifacts(): BlogArtifact[] {
  return Object.entries(markdownRaw)
    .map(([path, rawContent]) => {
      const match = path.match(ARTIFACT_PATTERN);
      if (!match) {
        return null;
      }

      const slug = match[1];
      const fallbackTitle = slugToTitle(slug);
      const title = getTitle(rawContent, fallbackTitle);

      return {
        slug,
        title,
        sourcePath: path
      };
    })
    .filter((artifact): artifact is BlogArtifact => Boolean(artifact))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
