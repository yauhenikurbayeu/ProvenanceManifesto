---
name: article-translation
description: Process a blog English markdown article, extract metadata, generate TL;DRs, update blog/manifest.json, optionally update README files, orchestrate language-specific translation subagents, verify outputs, and write a translation summary.
---

# Article Translation Skill

Use this skill when a new English Markdown article needs to be processed and translated into German, French, Spanish, Polish, and Russian.

## Supported languages

- `de`
- `fr`
- `es`
- `pl`
- `ru`

## Source article identification

- A source article is
  - specified by user input and located in `/blog`
  - or the most recent English `.md` file in `/blog` other than `README.md`.
- Ignore `README.md`, `manifest.json`, translation summary files, and language folders.
- Prefer the newest or explicitly requested `/blog` article.
- Process one source article at a time unless batch mode is explicitly requested.

## Metadata extraction

Extract:
- title from the first `# ...` heading or explicit title line near the top
- author from `**Author:** ...` or `Author: ...`
- date from `**Published:** ...`, `Published: ...`, or `Date: ...`

Normalize the date as `MMM dd, yyyy`.

## Manifest output

Find or create `/blog/manifest.json` and treat it as the authoritative publication registry.

For the English article, ensure:
- `id`
- `canonicalSlug`
- `languages.en.file`
- `languages.en.published = true`
- `languages.en.tldr = {english_tldr}`

For each translated language, the orchestrator should update:
- `languages.<lang>.file`
- `languages.<lang>.published`
- `languages.<lang>.tldr`

If translation fails for a language, keep the language block and set `published: false`.

## Manifest patch procedure

During a real translation run:
1. Read `/blog/manifest.json` if it exists.
2. Compute `canonicalSlug` from the English source filename stem.
3. Reuse an existing entry when either `canonicalSlug` matches or `languages.en.file` matches the source filename.
4. Otherwise create a new entry with:
  - `id = canonicalSlug.replace(/_/g, '-')`
  - `canonicalSlug`
  - supported language blocks for `en`, `de`, `es`, `fr`, `pl`, `ru`
5. Patch `languages.en` before launching subagents.
6. Require each subagent to return a machine-readable final JSON object.
7. Patch one localized manifest block per subagent result.
8. Save `/blog/manifest.json` before final verification and summary generation.

Manifest path values must stay relative to `/blog`, for example `de/article.md`.

## English TL;DR generation

Generate one concise TL;DR sentence or short paragraph that remains faithful to the article.

## README output

README files are optional human-facing summary artifacts and are not the source of truth for publication.

When root README updates are requested in the run, find or create `/blog/README.md` and prepend exactly:

- `# {title}`
- empty line
- `**Author:** {author}`
- `**Published:** {normalized_date}`
- empty line
- `**TL;DR {english_tldr}**`

Preserve existing content below and insert one blank line between the new block and the previous file content.

## Localized README output

For each language folder, find or create `/blog/<lang>/README.md` and prepend exactly:

- `# {title}`
- empty line
- `**Author:** {author}`
- `**Published:** {normalized_date}`
- empty line
- `**TL;DR {localized_tldr}**`

Constraints:
- do not translate the title line in localized README header blocks
- do not translate `Author:`
- do not translate the author value
- do not translate `Published:`
- do not translate the date value
- translate only the TL;DR text

## Translated article output

Create a translated article file at `/blog/<lang>/{source_filename}`.

Constraints:
- translate the article title (`# ...`) into the target language
- translate the article content fully
- translate section headings and other human-language headings into the target language
- preserve meaning and order
- preserve markdown structure
- preserve links, images, tables, blockquotes, and code fences
- do not inject commentary
- do not shorten or expand unnecessarily

## Delegation pattern

The main orchestrator agent should:
1. identify the source article
2. extract metadata
3. generate English TL;DR
4. update the English block in `/blog/manifest.json`
5. update `/blog/README.md` when requested for the run
6. invoke `translate-de`, `translate-fr`, `translate-es`, `translate-pl`, and `translate-ru`
7. collect subagent outputs
8. update localized manifest language blocks
9. verify each language result
10. write `/blog/translation-summary.md`
11. run `npm run build` from the workspace root as a final quality gate
12. report final status

The orchestrator is the only agent allowed to edit `/blog/manifest.json`.

Each language subagent should return a final fenced `json` block with:
- `language`
- `status`
- `translatedArticlePath`
- `localizedReadmePath`
- `localizedTldr`
- `published`
- `blockers`

## Verification checklist

For each language, confirm:
- manifest language block exists
- translated article file exists when `published: true`
- localized TL;DR exists in manifest when `published: true`
- localized `README.md` exists if README updates were requested
- localized README header block is correctly formatted
- the localized README title line remains unchanged from the English source title
- `Author:`, author value, `Published:`, and date value remain unchanged in localized README
- only TL;DR text is translated in localized README
- the translated article H1 title is translated into the target language
- section headings inside the translated article are translated into the target language
- translated article is complete and structurally consistent

For the full run, also confirm:
- `npm run build` exits with code `0`
- if the build fails, record the failure in `/blog/translation-summary.md` and mark the overall result as `partial`

## Final summary

Write `/blog/translation-summary.md` containing:
- source file path
- extracted title, author, date
- English TL;DR
- manifest update status
- files created or updated for each language
- verification outcome for each language
- build validation result
- failures or warnings
- final status: `success`, `partial`, or `failed`
