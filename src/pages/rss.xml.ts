import { getLocalizedRssPath } from '../i18n/utils';
import { buildRssXml, defaultSiteUrl } from '../lib/rss';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = (site?.toString() || import.meta.env.SITE_URL || defaultSiteUrl).replace(/\/+$/, '/');
	const xml = buildRssXml('en', siteUrl, getLocalizedRssPath('en'));

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
};