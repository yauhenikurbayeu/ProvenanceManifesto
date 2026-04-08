import { marked } from 'marked';

// Eagerly load all markdown files under blog/artifacts/slides/ as raw strings
const slideFiles = import.meta.glob('/blog/artifacts/slides/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ParsedSlide {
  number: number;
  /** URL of the first image found immediately after the # Slide N header */
  backgroundImage: string | null;
  /** Markdown body with the header and background image line removed */
  markdown: string;
}

export interface PresentationData {
  name: string;
  slides: ParsedSlide[];
  /** Speaker notes keyed by 1-based slide number */
  scriptMap: Map<number, string>;
}

// ─── Parsers ──────────────────────────────────────────────────────────────────

function parseSlides(raw: string): ParsedSlide[] {
  // Split on "# Slide N" first-level headers
  const chunks = raw.split(/(?=^# Slide \d+\b)/m).filter(c => c.trim());
  const slides: ParsedSlide[] = [];

  for (const chunk of chunks) {
    const headerMatch = chunk.match(/^# Slide (\d+)\b[^\n]*\n/);
    if (!headerMatch) continue;

    const number = parseInt(headerMatch[1], 10);
    let body = chunk.slice(headerMatch[0].length);

    // Read the first Markdown image URL to use as a CSS background, then remove it from the body
    const imageMatch = body.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    const backgroundImage = imageMatch ? imageMatch[2] : null;
    if (imageMatch) body = body.replace(imageMatch[0], '');

    // Strip horizontal rule separators and leading/trailing whitespace
    body = body.replace(/^---\s*$/gm, '').trim();

    slides.push({ number, backgroundImage, markdown: body });
  }

  return slides.sort((a, b) => a.number - b.number);
}

function parseScript(raw: string): Map<number, string> {
  const map = new Map<number, string>();
  const chunks = raw.split(/(?=^# Slide \d+\b)/m).filter(c => c.trim());

  for (const chunk of chunks) {
    const headerMatch = chunk.match(/^# Slide (\d+)\b[^\n]*\n/);
    if (!headerMatch) continue;

    const number = parseInt(headerMatch[1], 10);
    const body = chunk.slice(headerMatch[0].length).trim();
    map.set(number, body);
  }

  return map;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Returns the name of every presentation folder that contains a slides.md */
export function getPresentationNames(): string[] {
  const names = new Set<string>();
  for (const path of Object.keys(slideFiles)) {
    const match = path.match(/^\/blog\/artifacts\/slides\/([^/]+)\/slides\.md$/);
    if (match) names.add(match[1]);
  }
  return [...names];
}

/** Returns the parsed slides and script map for a presentation folder */
export function getPresentation(name: string): PresentationData | null {
  const slidesKey = `/blog/artifacts/slides/${name}/slides.md`;
  const scriptKey  = `/blog/artifacts/slides/${name}/script.md`;

  const slidesRaw = slideFiles[slidesKey];
  if (!slidesRaw) return null;

  const slides    = parseSlides(slidesRaw);
  const scriptMap = slideFiles[scriptKey]
    ? parseScript(slideFiles[scriptKey])
    : new Map<number, string>();

  return { name, slides, scriptMap };
}

/** Render a markdown string to HTML using the project-wide marked instance */
export async function renderMarkdown(md: string): Promise<string> {
  return String(await marked.parse(md, { gfm: true }));
}
