---
name: article-translation
description: Process a root English markdown article, extract metadata, generate a TL;DR, update root and localized README files, orchestrate language-specific translation subagents, verify outputs, and write a translation summary.
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
  - - specified by user input and located in the workspace root
  - - or the most recent an English `.md` file other than README.md placed in the workspace root.
- Ignore `README.md`.
- Ignore files inside `.github`, `.vscode`, and language folders.
- Prefer the newest or explicitly requested root-level article.

## Metadata extraction

Extract:
- title from the first `# ...` heading or explicit title line near the top
- author from `**Author:** ...` or `Author: ...`
- date from `**Published:** ...`, `Published: ...`, or `Date: ...`

Normalize the date for README output as `MMM dd, yyyy` .

## English TL;DR generation

Generate one concise TL;DR sentence or short paragraph that remains faithful to the article.

## Root README output

Find or create root `README.md` and prepend exactly:

- `# {title}`
- empty line
- `**Author: {author}**`
- `**Published: {normalized_date}**`
- empty line
- `**TL;DR {english_tldr}**`

Preserve existing content below and insert one blank line between the new block and the previous file content.

## Localized README output

For each language folder, find or create `<lang>/README.md` and prepend exactly:

- `# {title}`
- empty line
- `**Author:** {author}`
- `**Published:** {normalized_date}`
- empty line
- `**TL;DR {localized_tldr}**`

Constraints:
- do not translate the title line
- do not translate `Author:`
- do not translate the author value
- do not translate `Published:`
- do not translate the date value
- translate only the TL;DR text

## Translated article output

Create a translated article file at `/<lang>/{source_filename}`.

Constraints:
- translate the article content fully
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
4. update root `README.md`
5. invoke `translate-de`, `translate-fr`, `translate-es`, `translate-pl`, and `translate-ru`
6. collect subagent outputs
7. verify each language result
8. write `translation-summary.md`
9. report final status

## Verification checklist

For each language, confirm:
- language folder exists
- localized `README.md` exists
- translated article file exists
- localized README header block is correctly formatted
- title and metadata lines are not translated in localized README
- translated article is complete and structurally consistent

## Final summary

Write `translation-summary.md` containing:
- source file path
- extracted title, author, date
- English TL;DR
- files created or updated for each language
- verification outcome for each language
- failures or warnings
- final status: `success`, `partial`, or `failed`
