import { languages } from '../i18n/ui';
import { getLocalizedPath, type SupportedLang } from '../i18n/utils';
import { getLocalizedBlogArticles } from './blog';

export const defaultSiteUrl = 'https://provenancemanifesto.org';

export function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export function toAbsoluteUrl(siteUrl: string, path: string): string {
	return new URL(path, siteUrl).toString();
}

export function getFeedLanguages(): SupportedLang[] {
	return Object.keys(languages) as SupportedLang[];
}

export function buildRssXml(lang: SupportedLang, siteUrl: string, feedPath: string): string {
	const blogBasePath = getLocalizedPath(lang, 'blog');
	const items = getLocalizedBlogArticles(lang)
		.map((article) => ({
			title: article.title,
			description: article.tldr || article.title,
			link: toAbsoluteUrl(siteUrl, `${blogBasePath}/${article.slug}`),
			publishedISO: article.publishedISO
		}))
		.sort((left, right) => right.publishedISO.localeCompare(left.publishedISO));

	const latestPublishedDate = items[0]?.publishedISO
		? new Date(items[0].publishedISO).toUTCString()
		: new Date().toUTCString();

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Provenance Manifesto (${lang.toUpperCase()})</title>
    <description>Latest ${lang.toUpperCase()} articles from the Provenance Manifesto blog.</description>
    <link>${escapeXml(toAbsoluteUrl(siteUrl, blogBasePath))}</link>
    <atom:link href="${escapeXml(toAbsoluteUrl(siteUrl, feedPath))}" rel="self" type="application/rss+xml" />
    <language>${lang}</language>
    <lastBuildDate>${latestPublishedDate}</lastBuildDate>
${items
	.map(
		(item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <pubDate>${new Date(item.publishedISO).toUTCString()}</pubDate>
    </item>`
	)
	.join('\n')}
  </channel>
</rss>`;
}