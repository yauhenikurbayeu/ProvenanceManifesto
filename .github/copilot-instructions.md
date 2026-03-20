# Copilot Instructions

This workspace is used to process English source articles in Markdown and produce:
- a blog root `/blog/README.md` summary header
- localized `README.md` summary headers in `/blog/de`, `/blog/fr`, `/blog/es`, `/blog/pl`, `/blog/ru`
- translated article files in `/blog/de`, `/blog/fr`, `/blog/es`, `/blog/pl`, `/blog/ru`
- a final `/blog/translation-summary.md` report

## Source article rules

- A source article is
  - - specified by user input and located in the workspace "/blog" folder,
  - - or the most recent an English `.md` file other than README.md placed in the workspace "/blog" folder.
- Ignore files inside `.github`, `.vscode`, language folders, and any `README.md` file when selecting the source article.
- Prefer the newest or explicitly requested root-level article file.
- Process one source article at a time unless the user explicitly requests batch mode.

## Metadata extraction rules

Extract from the source article:
- title: from the first top-level heading (`# ...`) or explicit title line near the top
- author: from `**Author:** ...` or `Author: ...`
- date: from `**Published:** ...`, `Published: ...`, or `Date: ...`

Normalize README date output to exactly `dd.mm.yyy` whenever possible.

## TL;DR generation rules

- Generate a concise TL;DR based on the article text.
- Keep it faithful to the source.
- Use a single logical line suitable for insertion into a `README.md` header block.
- Do not add interpretation that is not present in the article.

## Root README rules

Find or create in blog `/blog/README.md` and prepend exactly these four lines:

- `# {title}`
- `Author: {author}`
- `Published: {normalized_date}`
- `**TL;DR {english_tldr}**`

Additional constraints:
- preserve existing content below
- insert one blank line between the new summary block and prior content
- do not translate the root README block

## Localized README rules

Supported languages:
- `de`
- `fr`
- `es`
- `pl`
- `ru`

For each language:
- ensure the language folder exists
- ensure `/blog/<lang>/README.md` exists
- prepend the localized summary block to `/blog/<lang>/README.md`
- keep the title line unchanged
- keep `Author:` unchanged
- keep the author value unchanged
- keep `Published:` unchanged
- keep the date value unchanged
- translate only the TL;DR text in the localized README block
- preserve existing content below with one blank line after the inserted block

## Article translation rules

For each target language:
- create a translated version of the source article using the same file name inside the corresponding language folder
- translate all article text
- preserve meaning
- preserve markdown structure, headings, emphasis, links, images, blockquotes, lists, tables, and code fences
- preserve text order
- preserve approximate article size
- do not add commentary, notes, or summaries inside translated article files
- do not change file names unless explicitly requested

## Orchestration rules

The main agent must:
- identify the source article
- extract title, author, and date
- generate the English TL;DR
- update root `/blog/README.md`
- delegate translation work to language-specific subagents for `de`, `fr`, `es`, `pl`, and `ru`
- monitor subagent completion
- verify the output of each subagent
- write `/blog/translation-summary.md`
- report final status to the user

## Verification rules

For each language, verify:
- `/blog/<lang>/README.md` exists
- `/blog/<lang>/{source_filename}` exists
- localized README begins with the expected four-line header block
- title, `Author:`, author value, `Published:`, and date value remain unchanged in localized README
- only TL;DR text is translated in localized README
- translated article appears complete and structurally consistent with the source

## Failure handling

- If one language fails, continue processing the others.
- Always write `translation-summary.md`.
- Mark final status as `success`, `partial`, or `failed`.
- Include clear failure reasons per language when applicable.
