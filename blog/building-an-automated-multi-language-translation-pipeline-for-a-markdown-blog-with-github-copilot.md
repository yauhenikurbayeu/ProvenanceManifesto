# Building an Automated Multi-Language Translation Pipeline for a Markdown Blog with GitHub Copilot Agents

**Author:** Yauheni Kurbayeu  
**Published:** 20.03.2026

![Building an Automated Multi-Language Translation Pipeline for a Markdown Blog with GitHub Copilot Agents](/images/blog/how-to-copilot-translation-pipeline.png)

---

## TL;DR

This guide shows how to turn a simple Markdown-based blog into an automated, multi-language publishing pipeline using GitHub Copilot Agents, Skills, and Hooks. A main orchestrator agent coordinates language-specific subagents to translate content, update localized README summaries, and generate consistent outputs. Hooks enforce guardrails and logging, while a skill encapsulates the workflow. The result is a reproducible, scalable, and governance-friendly system that turns Git commits into a provenance-aware content pipeline.

---

## Why this approach

I wanted a workflow where:
- I write **one English Markdown article**.
- The system automatically:
  - extracts metadata,
  - generates a TL;DR,
  - updates a global README,
  - translates the article into multiple languages,
  - updates localized READMEs,
  - verifies results,
  - and produces a summary.

At the same time, I wanted:
- reproducibility (everything lives in Git),
- auditability (what happened, when, and why),
- and extensibility (easy to add more languages or steps later).

GitHub Copilot Agents provided the right abstraction:
- **Agents** for roles,
- **Subagents** for parallel specialization,
- **Skills** for reusable workflows,
- **Hooks** for guardrails and lifecycle control.

---

## Final architecture

```
root/
├─ README.md
├─ my-article.md
├─ de/
│  └─ README.md
├─ fr/
│  └─ README.md
├─ es/
│  └─ README.md
├─ pl/
│  └─ README.md
├─ ru/
│  └─ README.md
└─ .github/
   ├─ copilot-instructions.md
   ├─ agents/
   │  ├─ article-orchestrator.agent.md
   │  ├─ translate-de.agent.md
   │  ├─ translate-fr.agent.md
   │  ├─ translate-es.agent.md
   │  ├─ translate-pl.agent.md
   │  └─ translate-ru.agent.md
   ├─ skills/
   │  └─ article-translation/
   │     └─ SKILL.md
   └─ hooks/
      ├─ hooks.json
      ├─ session_start.py
      ├─ pre_tool_guard.py
      ├─ post_tool_validate.py
      ├─ session_end.py
      └─ error_occurred.py
```

---

## Step 1 — Repository-level instructions

Create `.github/copilot-instructions.md`.

This defines global rules for the system.

### Example

```md
# Copilot Instructions

This repository processes English Markdown articles and produces:

- Root README summary
- Localized README summaries (de, fr, es, pl, ru)
- Translated article files

## Source rules

- Source article is a root-level `.md` file
- Ignore README.md and language folders

## Metadata extraction

Extract:
- title
- author
- date

Normalize date to dd.mm.yyy

## Output format

# Title
Author: Name
Date: dd.mm.yyy
**TL;DR summary**

## Translation rules

- Preserve markdown structure
- Preserve meaning
- Do not translate title/author/date in localized README
- Translate only TL;DR in localized README
```

---

## Step 2 — The Skill (workflow brain)

Create:

```
.github/skills/article-translation/SKILL.md
```

This is the reusable pipeline logic.

### Example

```md
---
name: article-translation
description: Process markdown article and generate translations
---

1. Find source article
2. Extract metadata
3. Generate TL;DR
4. Update root README
5. Trigger subagents
6. Validate outputs
```

---

## Step 3 — Main orchestrator agent

Create:

```
.github/agents/article-orchestrator.agent.md
```

### Example

```md
---
name: article-orchestrator
tools: ['agent', 'read', 'search', 'edit']
agents: ['translate-de', 'translate-fr', 'translate-es', 'translate-pl', 'translate-ru']
---

Use article-translation skill.

1. Find article
2. Extract metadata
3. Generate TL;DR
4. Update README.md
5. Run subagents
6. Verify outputs
7. Write translation-summary.md
```

This is your **control tower**.

---

## Step 4 — Language subagents

Each language has its own agent.

Example: `translate-de.agent.md`

```md
---
name: translate-de
user-invocable: false
---

Translate article into German.

Create:
- /de/README.md
- /de/<article>.md

Rules:
- keep title unchanged
- keep Author and Date unchanged
- translate TL;DR only in README
- preserve markdown
```

Repeat for FR, ES, PL, RU.

---

## Step 5 — Hooks (guardrails and lifecycle)

Create:

```
.github/hooks/hooks.json
```

### Example

```json
{
  "version": 1,
  "hooks": {
    "sessionStart": [{ "bash": { "run": "python3 .github/hooks/session_start.py" } }],
    "preToolUse": [{ "bash": { "run": "python3 .github/hooks/pre_tool_guard.py" } }],
    "postToolUse": [{ "bash": { "run": "python3 .github/hooks/post_tool_validate.py" } }],
    "sessionEnd": [{ "bash": { "run": "python3 .github/hooks/session_end.py" } }],
    "errorOccurred": [{ "bash": { "run": "python3 .github/hooks/error_occurred.py" } }]
  }
}
```

### Purpose

- **preToolUse** → prevent unsafe edits  
- **postToolUse** → validate outputs  
- **sessionEnd** → notify completion  
- **errorOccurred** → log failures  

---

## Step 6 — Running the pipeline

### Option 1 — Manual

```
copilot
```

Then:

```
Use article-orchestrator to process my-article.md
```

---

### Option 2 — Git commit trigger

Add a `pre-commit` or GitHub Action:

```
on push:
  - "*.md"
```

Trigger:

```
copilot -p "Run article-orchestrator on new article"
```

---

## Step 7 — Output example

After execution:

### Root README

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Short summary**
```

### German README

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Kurze Zusammenfassung**
```

### Translated file

```
/de/my-article.md
```

---

## Step 8 — What GPT helped me with

This system was not built from scratch manually.

GPT helped with:

- designing the **architecture**
- defining **agent roles**
- writing **all agent configs**
- designing **skills and hooks**
- creating **guardrails**
- generating **ready-to-use repo bundle**
- refining **best practices based on Copilot docs**

The key shift GPT enabled:

> From “scripts that translate files”  
> → to “agents that coordinate knowledge transformation”

---

## Step 9 — Key insights

### 1. Git becomes an event system

```
commit → agent → transformation → commit
```

### 2. Agents are better than scripts

- easier to extend
- easier to reason about
- closer to how humans think

### 3. Provenance is built-in

Every step:
- who triggered
- what changed
- what output produced

---

## Step 10 — Next steps

You can extend this into:

- diff-based translation
- AI quality scoring
- SEO optimization per language
- publishing pipelines
- provenance graph ingestion

---

## Final thoughts

This is more than translation.

It is a **content operating system**:
- deterministic
- explainable
- extensible

And it scales naturally into:
- knowledge systems
- decision provenance
- AI-native workflows

---

## Want to improve it?

If you want, I can help you:

- add incremental translation (only changed paragraphs)
- integrate with your blog engine (Astro, Jekyll)
- add Slack/email notifications
- convert this into a SaaS-ready architecture
