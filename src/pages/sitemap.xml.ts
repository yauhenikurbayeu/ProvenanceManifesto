import { languages, routeMap } from '../i18n/ui';
import { getLocalizedPath } from '../i18n/utils';
import type { APIRoute } from 'astro';

export const prerender = true;

const siteUrl = import.meta.env.SITE_URL || 'https://provenancemanifesto.org';
const sitePath = siteUrl.replace(/\/+$/, '');
const routeKeys = Object.keys(routeMap.en) as Array<keyof typeof routeMap.en>;
const today = new Date().toISOString().split('T')[0];

export const GET: APIRoute = async () => {
	const urls = [];
	const locales = Object.keys(languages) as Array<keyof typeof languages>;
	const deeplinks = ['/manifesto', '/principles', '/about', '/faq', '/sign'];
	const rootManifestoAliases = new Set<string>(deeplinks);

	for (const lang of locales) {
		for (const route of routeKeys) {
			const path = getLocalizedPath(lang as keyof typeof routeMap, route);
			const normalizedPath = path.startsWith('/') ? path : `/${path}`;
			const full = `${sitePath}${normalizedPath}`;
			urls.push(`<url><loc>${full}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
		}

		const indexPath = getLocalizedPath(lang as keyof typeof routeMap);
		const normalizedIndexPath = indexPath.endsWith('/') ? indexPath : `${indexPath}/`;
		const localizedManifestoPath = `${normalizedIndexPath}manifesto`;
		if (!rootManifestoAliases.has(localizedManifestoPath)) {
			urls.push(
				`<url><loc>${sitePath}${localizedManifestoPath}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
			);
			rootManifestoAliases.add(localizedManifestoPath);
		}
	}

	for (const path of deeplinks) {
		urls.push(
			`<url><loc>${sitePath}${path}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
		);
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
