import { defaultLang, routeMap, ui } from './ui';

export type SupportedLang = keyof typeof ui;
export type RouteKey = keyof typeof routeMap[typeof defaultLang];

const getBaseUrl = () => {
	const baseUrl = import.meta.env.BASE_URL || '/';
	return baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '');
};

function normalizeSegments(pathname: string) {
	return pathname
		.split('/')
		.filter(Boolean);
}

export function getLangFromUrl(url: URL) {
    const segments = normalizeSegments(url.pathname);
    for (const segment of segments) {
        if (segment in ui) {
            return segment as SupportedLang;
        }
    }
    return defaultLang;
}

export function useTranslations(lang: SupportedLang) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

export function getLocalizedPath(lang: SupportedLang, route: RouteKey = 'manifesto') {
	const baseUrl = getBaseUrl();
	if (route === 'manifesto' && lang === defaultLang) {
		return `${baseUrl}/`;
	}
	const slug = routeMap[lang]?.[route] ?? '';
	return `${baseUrl}/${lang}${slug ? `/${slug}` : ''}`;
}

export function getLocalizedBlogCategoryPath(lang: SupportedLang, category: string) {
	const blogPath = getLocalizedPath(lang, 'blog');
	return `${blogPath}/category/${category}`;
}

export function getBlogCategoryLabel(lang: SupportedLang, category: string): string {
	const t = useTranslations(lang);
	const keyMap: Record<string, keyof typeof ui[typeof defaultLang]> = {
		provenance_philosophy: 'blog.category.provenance_philosophy',
		technical_articles: 'blog.category.technical_articles',
		other: 'blog.category.other'
	};

	const translationKey = keyMap[category];
	if (translationKey) {
		return t(translationKey);
	}

	return category
		.replace(/[_-]+/g, ' ')
		.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getSupabaseClientConfig() {
	return {
		url: import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '',
		anonKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
	};
}
