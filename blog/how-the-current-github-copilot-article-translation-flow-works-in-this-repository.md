# How the Current GitHub Copilot Article Translation Flow Works in This Repository

**Author:** Yauheni Kurbayeu  
**Published:** Mar 21, 2026

---

## TL;DR

This repository implements a layered GitHub Copilot article-translation pipeline built from repository-wide instructions, a main orchestration agent, five language-specific subagents, one reusable skill, and a hook-based safety and logging system. The real control plane is split across three places: instructions define policy, agents define role behavior, and hooks enforce or observe tool execution. The result is not "one prompt that translates a post," but a governed workflow that selects a source article, extracts metadata, updates publication state, delegates translation work, validates outputs, and writes an execution summary.

---

## Why this repository is interesting

This workspace is a strong example of how GitHub Copilot customization becomes agentic software design rather than prompt tweaking.

The flow is distributed across:

- `.github/copilot-instructions.md`
- `.github/agents/article-orchestrator.agent.md`
- `.github/agents/translate-de.agent.md`
- `.github/agents/translate-fr.agent.md`
- `.github/agents/translate-es.agent.md`
- `.github/agents/translate-pl.agent.md`
- `.github/agents/translate-ru.agent.md`
- `.github/skills/article-translation/SKILL.md`
- `.github/hooks/hooks.json`
- `.github/hooks/*.py`

From the perspective of recent GitHub Copilot docs, this repository combines the major customization surfaces that matter today:

- repository-wide instructions in `.github/copilot-instructions.md`
- custom agents in `.github/agents/*.agent.md`
- project skills in `.github/skills/*/SKILL.md`
- hooks in `.github/hooks/*.json`

That makes it a useful case study for understanding how repository context, delegation, quality gates, and shared state work together.

---

## The architecture in one picture

```text
User prompt
  |
  v
Repository context loads
  - .github/copilot-instructions.md
  - selected custom agent prompt
  - optionally a matching skill
  |
  v
article-orchestrator
  |
  +--> select source article
  +--> extract title / author / date
  +--> generate English TL;DR
  +--> create or patch blog/manifest.json
  +--> update blog/README.md
  +--> delegate to 5 translation subagents
           |
           +--> translate-de
           +--> translate-fr
           +--> translate-es
           +--> translate-pl
           +--> translate-ru
  |
  +--> collect JSON results from subagents
  +--> patch one manifest language block per result
  +--> verify files and structure
  +--> run npm run build
  +--> write blog/translation-summary.md
  |
  v
Hook layer wraps the run
  - sessionStart logs session metadata
  - userPromptSubmitted records the triggering prompt
  - preToolUse blocks out-of-scope edit/create writes
  - postToolUse records validations after edits
  - errorOccurred logs failures
  - sessionEnd checks whether translation-summary.md exists
```

---

## The five control layers

The cleanest way to understand the flow is to separate it into control layers.

### 1. Repository-wide instructions define the universal rules

`.github/copilot-instructions.md` is the repository constitution for the translation workflow.

It defines:

- what counts as a source article
- how title, author, and date are extracted
- how dates should be normalized
- that `blog/manifest.json` is the source of truth
- which languages are supported
- what the orchestrator must do
- what every localized README and translated article must preserve
- that `npm run build` is the final quality gate

This aligns with GitHub's current documentation: repository-wide instructions in `.github/copilot-instructions.md` are automatically applied to requests in repository context.

### 2. The custom agent defines the execution role

`.github/agents/article-orchestrator.agent.md` turns a generic Copilot session into a translation orchestrator with a sharply defined mission.

It narrows behavior by:

- naming the role
- describing the end-to-end job
- constraining tools to `agent`, `read`, `search`, and `edit`
- listing the language workers
- locking the model to `gpt-5`
- prescribing the exact execution order

This is the operational brain of the workflow.

### 3. The skill defines reusable workflow memory

`.github/skills/article-translation/SKILL.md` captures the reusable procedure for article translation.

The skill is not another agent. It is a reusable instruction package that tells Copilot how to execute this kind of task consistently.

According to the current GitHub docs, when Copilot chooses to use a skill, its `SKILL.md` is injected into the agent's context. In this repository, the orchestrator explicitly says `Use the article-translation skill.`, so the skill is intended to be loaded on every real run.

### 4. The subagents specialize by language

Each translation agent is intentionally narrow:

- `translate-de`
- `translate-fr`
- `translate-es`
- `translate-pl`
- `translate-ru`

Each one is responsible for:

- ensuring a language folder exists
- ensuring the localized `README.md` exists
- translating only the TL;DR in the localized README block
- translating the full article into the target language
- returning one final machine-readable JSON object

The subagents are configured as internal workers:

- `user-invocable: false`
- `disable-model-invocation: true`

In practical terms, that means they are supposed to be called by the orchestrator, not selected directly by a human and not auto-invoked by model inference.

### 5. Hooks add enforcement and observability around tool use

`.github/hooks/hooks.json` wires Python scripts into the Copilot lifecycle:

- `sessionStart`
- `userPromptSubmitted`
- `preToolUse`
- `postToolUse`
- `sessionEnd`
- `errorOccurred`

Hooks do not do translation. They guard or observe the work around translation.

That distinction matters because it explains the real governance model in this repository:

- semantic workflow control lives in instructions + agents + skill
- prompt-level audit logging lives in `sessionStart` and `userPromptSubmitted`
- hard write-scope control lives in `preToolUse`
- lightweight validation and audit logging live in `postToolUse`

---

## The exact flow, step by step

What follows is the current flow as it exists in this repository today.

### Step 1. The session starts and the hook layer initializes logging

When a Copilot agent session begins, `.github/hooks/session_start.py` runs.

It:

- creates `.github/hooks/logs/` if needed
- reads hook input JSON from stdin
- writes a JSONL record to `.github/hooks/logs/session-start.jsonl`
- stores fields such as `source`, `timestamp`, `cwd`, and `initialPrompt`

This gives the workflow a persistent session audit trail.

### Step 2. The submitted prompt is captured as an audit artifact

When the user submits the actual translation request, `.github/hooks/user_prompt_submitted.py` runs.

It:

- reads the prompt event payload from stdin
- appends a JSONL record to `.github/hooks/logs/user-prompt-submitted.jsonl`
- stores fields such as `timestamp`, `cwd`, and `prompt`

This matters because it preserves the initiating request separately from the session-start metadata. In the updated hook model, the audit trail now records both:

- the existence of the session
- the exact prompt that triggered the workflow

### Step 3. Repository instructions become ambient context

Because the work is happening in repository context, `.github/copilot-instructions.md` becomes the base layer of behavior.

That means the agent already knows, before doing task-specific reasoning:

- source articles live in `blog/`
- language targets are `de`, `fr`, `es`, `pl`, `ru`
- the manifest is authoritative
- only the orchestrator may edit `blog/manifest.json`
- a final `blog/translation-summary.md` must always be produced

No `.github/instructions/**/*.instructions.md` files exist in this repository, so there is no path-specific instruction layer competing with the repository-wide rules.

### Step 4. The orchestrator agent takes over

If the user selects `article-orchestrator`, the agent prompt from `.github/agents/article-orchestrator.agent.md` becomes the role-specific execution plan.

This is where Copilot stops being "a general assistant" and becomes "the translation orchestrator for this repo."

The agent prompt adds:

- the end-to-end checklist
- the exact manifest patching rules
- the subagent JSON contract
- the required verification sequence
- the requirement to run `npm run build`

### Step 5. The translation skill is loaded

The orchestrator says `Use the article-translation skill.`

So the skill in `.github/skills/article-translation/SKILL.md` becomes the reusable procedure for the job.

This is an important context-sharing moment:

- repository instructions give global policy
- the custom agent gives the current role
- the skill gives the reusable procedure

Together, those three layers define the workflow before any file is modified.

### Step 6. The source article is selected

The source selection rule is repeated in both the repository instructions and the skill:

- choose the explicitly requested article, or
- choose the newest root-level English Markdown file in `blog/`
- exclude `README.md`
- exclude `manifest.json`
- exclude translation summaries
- exclude language folders

Based on the current workspace state, if the orchestrator were invoked without an explicit file, the default source article would be:

- `blog/the-fluency-paradox-when-ai-sounds-right-but-stops-being-reliable.md`

That is the newest root-level English article once `README.md`, `translation-summary.md`, and `translation-summary-log.md` are excluded.

### Step 7. Metadata is extracted from the source article

The orchestrator extracts:

- title
- author
- date

The rule source is consistent across the repository:

- title from the first H1 or equivalent title line
- author from `**Author:** ...` or `Author: ...`
- date from `**Published:** ...`, `Published: ...`, or `Date: ...`

The normalized date target is `MMM dd, yyyy`.

### Step 8. The English TL;DR is generated

The English TL;DR is treated as a first-class output artifact, not just a convenience summary.

It is used in three places:

- `blog/manifest.json`
- root `blog/README.md`
- as the source text to be localized by each language subagent

That makes the TL;DR a shared semantic artifact across the entire flow.

### Step 9. The orchestrator creates or patches the manifest entry

`blog/manifest.json` is the publication source of truth.

The orchestrator must:

1. read the manifest if it exists
2. compute `canonicalSlug` from the English source filename stem
3. look for an existing article by:
   - `canonicalSlug`
   - or `languages.en.file`
4. reuse `id` and `canonicalSlug` if found
5. otherwise create a new article entry
6. patch the English block before any translation workers run

That early English patch is important because it gives the workflow a stable shared record before subagent fan-out begins.

### Step 10. The root README is updated

The repository instructions require the root `blog/README.md` to be prepended with a summary block containing:

- title
- author
- published date
- English TL;DR

This makes the README a human-facing publication index, while the manifest remains the machine-facing source of truth.

### Step 11. The orchestrator delegates to five language subagents

Now the workflow fans out into five specialized workers:

- German
- French
- Spanish
- Polish
- Russian

Each worker receives a compact explicit payload:

- source article path
- source filename
- canonical slug
- English TL;DR
- target language folder

This is the repository's most important context-sharing design choice:

- subagents do not share writable state directly
- they share a stable input contract
- they return a stable output contract
- the orchestrator serializes their results back into the manifest

In other words, shared state is mediated through the orchestrator rather than through peer-to-peer subagent writes.

### Step 12. Each subagent builds two artifacts

Every language worker creates:

- `blog/<lang>/README.md`
- `blog/<lang>/<source_filename>`

The localized README rule is intentionally strict:

- keep the title line unchanged
- keep `Author:` unchanged
- keep the author value unchanged
- keep `Published:` unchanged
- keep the date value unchanged
- translate only the TL;DR text

That is a nice example of selective localization instead of full document translation.

### Step 13. Each subagent returns machine-readable JSON

Each translation worker must finish with one fenced JSON block containing:

- `language`
- `status`
- `translatedArticlePath`
- `localizedReadmePath`
- `localizedTldr`
- `published`
- `blockers`

That contract is what makes orchestration deterministic.

Without it, the parent agent would have to interpret free-form prose to recover operational state. With it, the orchestrator can map output directly into `blog/manifest.json`.

### Step 14. The orchestrator patches one manifest language block per result

As each subagent finishes, the orchestrator updates only that language section:

- `languages.<lang>.file`
- `languages.<lang>.published`
- `languages.<lang>.tldr`

If a subagent fails, the orchestrator still preserves the language block and marks it as unpublished.

This is a strong design decision because failure in one language does not destroy continuity of the publication record.

### Step 15. Hooks police edit scope during the run

Before any `edit` or `create` action, `.github/hooks/pre_tool_guard.py` runs.

This script:

- parses tool arguments
- gathers target paths from `path`, `filePath`, `targetPath`, or `paths`
- checks whether each write target is inside the allowed article-translation scope

Allowed writes include:

- `blog/manifest.json`
- `blog/README.md`
- any root-level `blog/*.md`
- anything under `blog/de`
- anything under `blog/fr`
- anything under `blog/es`
- anything under `blog/pl`
- anything under `blog/ru`

If an `edit` or `create` target is outside that scope, the hook prints a denial JSON payload and blocks the write.

The repository already contains evidence that this works. In `.github/hooks/logs/pre-tool-use.jsonl`, an attempted edit to `src/lib/blog.ts` was denied with the reason that the article translation workflow may only write inside `blog/`.

### Step 16. Hooks run lightweight post-edit validation

After successful `edit` or `create` operations, `.github/hooks/post_tool_validate.py` runs.

This script does not block. It records checks.

Its validations include:

- if `blog/manifest.json` changed:
  - file parses as JSON
  - `articles` exists
  - every published language has a file
  - every published language has a non-empty TL;DR
- if `blog/README.md` changed:
  - file exists
  - looks like a README with author or TL;DR content
- if `blog/translation-summary.md` changed:
  - file exists
  - contains `Final Status` or `final status`
- if a localized README changed:
  - file exists
  - has author line
  - has date line
  - has TL;DR marker
- if a localized article changed:
  - file exists
  - file is non-empty

This is why the hook layer is partly a quality gate and partly telemetry.

More precisely:

- `preToolUse` is a hard gate
- `postToolUse` is a soft validation logger

### Step 17. The orchestrator performs semantic verification

The hook validator only checks structure and existence. The orchestrator is expected to verify semantics.

That includes:

- manifest language blocks match actual files
- localized README headers keep title, author, and date unchanged
- only TL;DR text is translated in localized README
- translated articles remain structurally consistent with the source

This separation is sensible. Hooks are fast and mechanical. The orchestrator handles the higher-order semantic checks.

### Step 18. `npm run build` is the final repository-level quality gate

The repository instructions and the orchestrator both require `npm run build` to succeed.

That means the final acceptance criteria are not only:

- files exist
- manifest is patched
- summaries are written

They also include:

- no Astro build regression was introduced by the translation run

This is the last quality gate in the declared workflow.

### Step 19. The orchestrator writes `blog/translation-summary.md`

This file is the final operational report.

It is supposed to contain:

- source file
- extracted metadata
- English TL;DR
- manifest update status
- README update status
- per-language file changes
- per-language verification results
- build validation result
- errors or warnings
- final status

This summary is the workflow's audit artifact for humans.

### Step 20. The session ends and the final hooks close the execution trace

At session end, `.github/hooks/session_end.py` runs.

It checks whether `blog/translation-summary.md` exists and writes a record to `.github/hooks/logs/session-end.jsonl`.

If a runtime failure occurred earlier, `.github/hooks/error_occurred.py` logs the error payload to `.github/hooks/logs/errors.jsonl`.

---

## How context is actually shared

The phrase "context sharing" can mean many things in agent systems, so it helps to be precise.

In this repository, context is shared through six different mechanisms.

### 1. Ambient repository context

` .github/copilot-instructions.md` is the baseline context that applies at repository scope.

This is where source selection rules, manifest semantics, and publication constraints are made global.

### 2. Role context

The selected `.agent.md` file overlays role-specific behavior.

That is how the same repository can support an orchestrator role and multiple worker roles.

### 3. Skill context

The skill adds a reusable procedure for this task family.

This is procedural context rather than policy context.

### 4. Explicit task payloads

The orchestrator passes explicit inputs to each subagent.

This is the cleanest form of context sharing because it is structured and narrow.

### 5. Shared persistent state in the manifest

`blog/manifest.json` is the cross-agent system record.

Subagents do not edit it directly, but they influence it through returned JSON that the orchestrator merges into the manifest.

### 6. Hook logs as execution memory

The JSONL files in `.github/hooks/logs/` create an execution trace outside the conversational thread:

- session starts
- user prompt submissions
- tool use
- denials
- post-edit checks
- session completion
- runtime errors

This is not semantic article state, but it is operational state.

---

## What each Python hook script is really doing

The Python layer deserves separate analysis because this is where policy becomes code.

### `session_start.py`

Purpose:

- initialize logging
- record session metadata

Behavior:

- reads JSON from stdin
- gracefully tolerates parse failures
- appends JSON lines to `session-start.jsonl`
- emits a stderr message only for operator visibility

Strength:

- simple and reliable

Limitation:

- purely observational

### `user_prompt_submitted.py`

Purpose:

- capture the triggering request as a first-class audit event

Behavior:

- reads the submitted prompt event from stdin
- appends a JSON line to `user-prompt-submitted.jsonl`
- stores `timestamp`, `cwd`, and `prompt`

Strength:

- this closes an important observability gap between "a session existed" and "this exact request was submitted"

Limitation:

- it is observational only
- it does not classify prompt intent or validate prompt structure

### `pre_tool_guard.py`

Purpose:

- prevent out-of-scope writes during article translation runs

Behavior:

- only checks `edit` and `create`
- resolves tool targets from common argument keys
- denies writes outside `blog/` and the supported language folders
- writes all decisions to `pre-tool-use.jsonl`

Strength:

- this is the only truly hard enforcement gate in the local workflow

Important limitation:

- it does not inspect shell execution
- if a shell tool modifies files outside `blog/`, this script will not stop it

That is a meaningful gap relative to current GitHub hook capabilities, because GitHub's docs explicitly describe `preToolUse` as able to approve or deny tool executions broadly, including shell tools.

### `post_tool_validate.py`

Purpose:

- record structured post-edit validation

Behavior:

- runs only after successful `edit` or `create`
- checks manifests, READMEs, summaries, and translated files
- appends results to `post-tool-use.jsonl`

Strength:

- creates low-cost audit visibility

Important limitation:

- it does not block bad output
- it only logs

So this is best understood as a soft quality gate.

### `session_end.py`

Purpose:

- mark session completion

Behavior:

- checks if `blog/translation-summary.md` exists
- logs the end reason and whether the summary exists

Strength:

- confirms whether the expected final artifact was produced

Important limitation:

- it does not verify summary quality
- it does not verify build success
- it does not verify per-language success

### `error_occurred.py`

Purpose:

- capture runtime errors

Behavior:

- writes a simple error record to `errors.jsonl`

Strength:

- useful for debugging failed runs

Limitation:

- intentionally minimal

---

## What the current hooks prove in practice

The log files show the hook layer is not theoretical.

Observed behavior in this repository includes:

- a prompt-submission audit record in `user-prompt-submitted.jsonl`
- successful writes to `blog/manifest.json`
- denied edits to `src/lib/blog.ts`
- post-edit validation records for manifest updates
- session-end records confirming whether `blog/translation-summary.md` existed

That means the system already has:

- prompt-level audit logging
- write-scope enforcement
- edit-time audit logging
- session completion logging

What it does not yet have is full hook-based workflow orchestration. That still belongs to the main agent.

---

## Alignment with recent GitHub Copilot docs

This repository is largely aligned with the current GitHub Copilot customization model, but not perfectly. The details matter.

### Aligned

These parts match current documentation well:

- repository-wide instructions in `.github/copilot-instructions.md`
- project skills in `.github/skills/*/SKILL.md`
- custom agents in `.github/agents/*.agent.md`
- hooks in `.github/hooks/*.json`
- tool scoping via the custom agent `tools` field
- private worker agents using `user-invocable: false`
- explicit use of `disable-model-invocation: true` for subagents

### Partially aligned

These parts are directionally correct but have local conventions or drift:

- the orchestrator uses an `agents:` frontmatter field
- current public GitHub docs emphasize documented fields such as `tools`, `model`, `user-invocable`, and `disable-model-invocation`, plus the `agent` tool for invoking other agents
- `agents:` is not described in the current public custom-agent configuration reference

Best interpretation:

- `agents:` in this repository should be treated as repository convention or environment-specific metadata, not as a portability guarantee documented by GitHub

### Out of date or internally inconsistent

There are several places where the repository's own materials disagree with each other or with the current docs.

#### 1. The root README format rules are inconsistent across files

` .github/copilot-instructions.md` says README dates should normalize to `MMM dd, yyyy` and the TL;DR line should begin with `**TL;DR ...**`.

But the current top block in `blog/README.md` begins with:

- `**Published:** March 21, 2026`
- and the summary line is bold text without the `TL;DR` label

That means the observed artifact format is drifting from the declared rules.

#### 2. The skill and instructions disagree about README strictness

The skill describes README files as optional human-facing artifacts.

The repository-wide instructions describe them as mandatory outputs for the run.

That is a real behavioral ambiguity.

#### 3. The active hook set is intentionally narrower than the full platform surface

The current repository hook set is:

- `sessionStart`
- `userPromptSubmitted`
- `preToolUse`
- `postToolUse`
- `sessionEnd`
- `errorOccurred`

That is the active implementation and should be treated as authoritative for this workspace. Even if GitHub exposes additional hook lifecycle surfaces in some environments, this repository's actual logic does not depend on them. Instead, subagent completion, semantic verification, and build validation remain orchestrator responsibilities.

#### 4. The older blog post shows an outdated hooks JSON shape

`blog/building-an-automated-translation-pipeline-for-a-markdown-blog-with-github-copilot.md` shows a nested `bash.run` example for hooks.

The live `hooks.json` in this repository uses the current documented command-hook shape:

```json
{
  "type": "command",
  "bash": "python3 .github/hooks/session_start.py"
}
```

The live file should be treated as the authoritative implementation.

---

## The real quality-gate model

The phrase "hooks as quality gates" is true here, but only partly.

The actual model is:

### Hard gates

- repository-wide instructions constrain the desired workflow
- subagents are forbidden from editing the manifest
- `preToolUse` blocks out-of-scope `edit` and `create` operations

### Soft gates

- `userPromptSubmitted` improves traceability but does not validate or block anything
- `postToolUse` records validation checks but does not reject bad output
- `sessionEnd` checks only for the existence of the summary file

### Semantic gates

- the orchestrator verifies translation completeness
- the orchestrator verifies README correctness
- the orchestrator runs `npm run build`
- the orchestrator determines the final `success` / `partial` / `failed` state

So the highest-value insight is this:

> The hooks are not the workflow engine. They are guardrails around the workflow engine.

The orchestrator still carries the real business logic.

---

## If you executed the workflow right now

Assuming the user does not explicitly specify a source file, the current translation run would likely look like this:

1. `sessionStart` logs the session.
2. `userPromptSubmitted` records the actual translation request.
3. Repository instructions load.
4. `article-orchestrator` is selected.
5. The `article-translation` skill is loaded.
6. Source selection chooses `blog/the-fluency-paradox-when-ai-sounds-right-but-stops-being-reliable.md`.
7. Metadata and English TL;DR are extracted.
8. The English manifest block is created or updated.
9. Root `blog/README.md` is prepended.
10. The orchestrator dispatches `translate-de`, `translate-fr`, `translate-es`, `translate-pl`, and `translate-ru`.
11. Each worker creates a translated article and localized README block.
12. Each worker returns JSON status.
13. The orchestrator patches each language block in `blog/manifest.json`.
14. `preToolUse` guards edit/create writes throughout the run.
15. `postToolUse` logs validations after each edit.
16. The orchestrator verifies file existence and structure.
17. `npm run build` runs as the final quality gate.
18. The orchestrator writes `blog/translation-summary.md`.
19. `sessionEnd` logs whether the summary file exists.

That is the real end-to-end flow implied by the current repository.

---

## Final assessment

This repository already demonstrates a credible agentic publishing architecture.

Its strongest design choices are:

- separating universal policy from role prompts
- using an orchestrator as the only manifest writer
- forcing subagents to return machine-readable JSON
- using hooks for write-scope enforcement and audit logging
- preserving a final translation summary as an execution artifact

Its main weaknesses are not architectural. They are consistency and coverage issues:

- some local docs are older than the current GitHub docs
- some formatting rules disagree with observed artifacts
- the pre-tool guard does not inspect shell writes
- the post-tool validator is informative, not blocking

Even so, the overall design is solid. The flow is understandable, governable, and extensible. Most importantly, it treats agentic translation as a reproducible repository process rather than as a one-off chat interaction.

---

## Further Reading

Official GitHub Copilot documentation referenced while preparing this analysis:

- [About customizing Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization)
- [Creating custom agents for Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Creating agent skills for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills)
- [About hooks](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks)
- [Using hooks with GitHub Copilot agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks)
- [Hooks configuration](https://docs.github.com/en/copilot/reference/hooks-configuration)
