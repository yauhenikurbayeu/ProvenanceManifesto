# Copilot Instructions

This repository contains Astro site development and multilingual blog content.

## Repository-wide scope

- Treat this file as global guidance for all tasks in this workspace.
- Do not assume article translation workflow unless the user explicitly asks for translation/localization work.
- For general development tasks, prioritize code correctness, minimal diffs, and build stability.

## Task routing

- For article translation workflow requests, use:
  - `.github/agents/article-orchestrator.agent.md`
  - `.github/skills/article-translation/SKILL.md`
- Translation-specific policy (source selection, manifest patching, localized README rules, subagent contract, and translation summary) is owned by those files.

## Quality gates

- When changes can affect Astro output, run the relevant validation commands (for example `npm run build`) before reporting completion.
- If validation fails, report the failure clearly and include the root cause and impacted files.

## Hooks and guardrails

- Runtime hook behavior is defined under `.github/hooks/`.
- Keep instruction files and hook rules aligned; avoid duplicating operational policy across multiple files unless one file is explicitly the source of truth.
