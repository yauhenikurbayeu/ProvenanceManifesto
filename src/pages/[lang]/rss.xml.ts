import { languages } from '../../i18n/ui';
import { getLocalizedRssPath, type SupportedLang } from '../../i18n/utils';
import { buildRssXml, defaultSiteUrl } from '../../lib/rss';
import type { APIRoute } from 'astro';

export const prerender = true;

export function getStaticPaths() {
	return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params, site }) => {
	const lang = params.lang as SupportedLang;
	const siteUrl = (site?.toString() || import.meta.env.SITE_URL || defaultSiteUrl).replace(/\/+$/, '/');
	const feedPath = getLocalizedRssPath(lang);
	const xml = buildRssXml(lang, siteUrl, feedPath);

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
};