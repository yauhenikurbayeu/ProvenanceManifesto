# Hooks for the Article Translation Workflow

This folder contains the actual GitHub Copilot hooks configuration and helper scripts.

## Important compatibility note

GitHub Copilot hooks are configured with JSON files under `.github/hooks/`, not Markdown.
The supported top-level hook events are:

- `sessionStart`
- `sessionEnd`
- `userPromptSubmitted`
- `preToolUse`
- `postToolUse`
- `errorOccurred`

This means the previous idea of using a `subagentStop` hook is not valid for GitHub Copilot coding agent hooks.

## What this hook set does

This hook set is intentionally lightweight and aligned with the documented hook model:

- `sessionStart`
  - creates a hooks log directory
  - starts a session log entry

- `userPromptSubmitted`
  - records the original user prompt as part of the translation workflow audit trail
  - makes it easier to trace which translation request produced which manifest and article updates

- `preToolUse`
  - guards `edit` and `create` operations
  - denies writes outside the article translation workflow scope

- `postToolUse`
  - records tool execution
  - performs lightweight validation after successful `edit` or `create` operations on translation-related files

- `sessionEnd`
  - verifies whether `blog/translation-summary.md` exists
  - writes a concise completion record

- `errorOccurred`
  - logs runtime errors emitted by the session

## What hooks do not do

Hooks do not perform the translation work themselves.
Hooks do not provide a dedicated subagent lifecycle event.
Hooks do not provide a dedicated build-validation event.
Hooks do not replace the orchestrator's own semantic verification and final summary generation.

The main orchestrator agent remains responsible for:
- dispatching language subagents
- collecting their results
- updating `blog/manifest.json`
- checking translated outputs semantically
- running `npm run build` as the final quality gate
- writing `blog/translation-summary.md`

## Files in this folder

- `hooks.json` — actual GitHub Copilot hooks configuration
- `session_start.py` — session-start logger
- `user_prompt_submitted.py` — prompt submission logger
- `pre_tool_guard.py` — write-scope guard for edit/create
- `post_tool_validate.py` — lightweight validation and tool logging
- `session_end.py` — final completion logger
- `error_occurred.py` — error logger

## Validation scope used by the hooks

Allowed translation workflow write targets:
- `blog/manifest.json`
- `blog/README.md`
- `blog/translation-summary.md`
- English source article `.md` files under `blog/`
- files under `blog/de`, `blog/fr`, `blog/es`, `blog/pl`, `blog/ru`

Anything outside that scope is denied by the pre-tool guard for `edit` and `create`.

The post-tool validator also performs a lightweight manifest sanity check:
- `blog/manifest.json` must parse as JSON
- it must expose an `articles` array
- every published language entry must have a non-empty `tldr`
- every published language entry must point to an existing file
