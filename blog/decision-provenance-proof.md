![From Manifesto to Prototype: Can Agents Build Decision Provenance?](/images/blog/decision-provenance-proof.png)

# From Manifesto to Prototype: Can Agents Build Decision Provenance?

**Author:** Yauheni Kurbayeu  
**Published:** Apr 17, 2026

The core idea behind [The Provenance Manifesto](https://provenancemanifesto.org/) is simple, but far-reaching: in the age of AI, organizations need to preserve not only artifacts, but also the provenance of the decisions that produced them.

The manifesto frames this shift clearly. We should value traceable decisions with context over undocumented intuition, institutional memory over repeated rediscovery, transparent reasoning over hidden assumptions, the evolution of decisions over static documentation, accountable ownership over anonymous outputs, and governed human-AI collaboration over uncontrolled automation.

That same direction is explored in [Why Decisions Must Become a First-Class Artifact](https://provenancemanifesto.org/en/blog/why_decisions_must_become_a_first_class_artifact). If software teams preserve only code, architecture, and delivery artifacts, but lose the reasoning that shaped them, they inherit systems without the memory required to evolve them well. In an AI-accelerated environment, that gap becomes even more dangerous. AI makes it easier to generate outputs. It does not automatically preserve why those outputs were chosen.

This is exactly where decision provenance becomes important. If decisions can be captured as first-class artifacts with context, alternatives, risks, and ownership, they can become a real memory layer for engineering and operational work.

But that immediately raises a practical question:

> Can agents participate in that memory layer in a meaningful way?

When I was presenting [this earlier article on decision provenance and agent memory](https://provenancemanifesto.org/en/blog/decision-provenance-how-to/), I was asked two very fair questions:

1. Can an agent self-identify the meaningful decisions it makes, classify their importance, and log both the decision and its context?
2. Can an agent later reuse prior decision logs as a kind of virtual gut feeling and improve its decision-making quality and consistency?

This article is a high-level walkthrough of the prototype validation work I ran to explore those two questions.

If you want to explore the prototype directly, the [DecisionLog](https://github.com/yauhenikurbayeu/DecisionLog) repository contains the working solution, a [detailed evaluation report](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/DESISION_PROVENANCE_EVOLUTION.md), sample prompts, and test results.

It is not a source-artifact review, not a benchmark dump, and not a statistical appendix. It is a structured explanation of what I tested, why I expanded the scenarios after each stage, and what became clear as the prototype matured.

## Why I started with a simple prototype

I did not start by building a full organizational memory platform.

I started with the smallest practical thing that could validate the core idea:

- an agent workflow that performs a task
- a `decision-log` that stores meaningful decisions as structured records
- repeated scenarios where prior decisions can later be reused

At this stage, the `decision-log` is only a file. That is deliberate. This work is still a prototype for core idea validation, not the final memory architecture.

The longer-term direction is broader. As I argued in [From RAG to Provenance: How We Realized Vector Alone Is Not Memory](https://provenancemanifesto.org/en/blog/from-rag-to-provenance-how-we-realized-vector-alone-is-not-memory/), a true organizational memory system will eventually need more than flat storage. It will need retrieval, structure, temporal evolution, and relationships between decisions, constraints, risks, outcomes, and actors. In other words, it should evolve toward a provenance memory layer that combines retrieval approaches with graph-shaped memory.

But before discussing that larger architecture, I wanted to answer a simpler question:

> Does the basic decision-provenance behavior work at all when agents are asked to do real tasks?

## The two questions I wanted to validate

Everything in the prototype was designed around two questions.

### Question 1

Can an agent recognize that it is making a meaningful decision, rather than just producing text or completing a task?

That requires more than answering correctly. It requires the agent to notice that a non-trivial judgment happened, identify its importance, preserve the surrounding context, and log the decision in a form that can be reused later.

### Question 2

Can prior decision logs function as a reusable memory for future decisions?

Not as hard rules. Not as majority vote. And not as blind replay.

What I wanted to test was whether earlier decisions could act as a soft prior, a kind of virtual gut feeling, helping the agent reason more consistently while still leaving room to reuse, refine, or override prior logic when the context changes.

## The validation path

I approached this in stages. Each new scenario was added because the previous one answered one part of the question, but exposed a new uncertainty.

## Scenario 1: Ambiguous roadmap prioritization

The first scenario used a product-roadmap decision with several plausible options and real trade-offs between trust, delivery pressure, competitive urgency, and engineering constraints.

I started here because it is exactly the kind of decision that organizations revisit repeatedly:

- there is more than one defensible answer
- trade-offs are real
- a final choice affects later work
- the decision should be explainable later

This first scenario answered the first question in a meaningful way.

At a high level, the prototype showed that agents can recognize that this kind of strategic choice is a meaningful decision worth logging. They were not explicitly asked to produce a separate provenance memory record as the main deliverable, yet the decision layer still activated. That was the first important signal: decision logging was not merely a formatting effect. The agent could detect the presence of a real decision.

The scenario also gave the first signal on the second question. When prior decision logs were made available in later runs, the earlier decisions clearly began to influence new ones. The memory behaved less like a database lookup and more like a soft prior. It nudged later decisions toward a more stable pattern.

That first result was promising, but still incomplete. It showed that provenance could exist. It did not yet show whether provenance would stay structured enough to be dependable.

That is why I added the second scenario.

## Scenario 2: Same decision family, but with stricter provenance structure

The second scenario stayed in the same general decision family, but changed the validation goal.

After the first round, the important open question was no longer "can the agent log something?" The more useful question became:

> Can the agent log decisions in a way that stays explicit, structured, and inspectable enough to support reuse?

So the second round focused more on schema discipline and on making prior-review scope visible.

This produced a more nuanced conclusion about virtual gut feeling.

What became clear is that prior decision memory does not have to force one canonical answer in order to be useful. In an ambiguous scenario, the more interesting effect is often narrower than that. Prior decisions can suppress weaker options, stabilize the viable frontier, and still leave room for legitimate disagreement inside that frontier.

**That distinction matters.**

If provenance simply forced uniformity, it would be little more than consensus lock-in. But if provenance helps the agent eliminate weak options while preserving the ability to rank strong options differently depending on emphasis, then it is behaving much more like real judgment memory.

After this stage, the answer to the second question became stronger:

> Yes, prior decision logs can act like a virtual gut feeling. But they are most useful when they narrow the space of good choices rather than pretending that one historical answer is always correct.

At the same time, this round still left an important blind spot.

The agent was mostly being tested on one major decision shape at a time. Real work is often messier than that. A single task may contain more than one meaningful decision, and a provenance system has to preserve those boundaries cleanly.

That is why I added the third scenario.

## Scenario 3: Rollout and safety as a multi-decision task

The third scenario changed the structure of the task itself.

Instead of asking for one main decision with a supporting choice, it required two explicit decisions in one session. One decision concerned rollout scope. The other concerned safety guardrails.

This scenario was important because it tested something different from the earlier rounds.

The previous scenarios mainly tested:

- decision recognition
- warm-start reuse
- strategic consistency

This new scenario tested:

- whether the agent can identify more than one meaningful decision inside the same task
- whether it can keep those decisions separate
- whether the provenance layer stays complete even when the user-facing artifact looks correct

**This turned out to be a crucial distinction.**

One of the clearest lessons from this stage was that correct task output and correct provenance are not the same thing.

An agent can complete a task convincingly and still under-log its internal decisions. It can merge two meaningful decisions into one blurred record. It can preserve one choice clearly while leaving the other implicit. In other words, a task can look successful from the outside while still producing weak memory.

This scenario therefore deepened the answer to the first question.

> Yes, agents can self-identify meaningful decisions. But multi-decision tasks reveal that identifying "there is a decision here" is easier than preserving all decision boundaries with equal discipline. Once a task contains multiple explicit choices, provenance quality becomes a stricter test than output quality.

That led to the next step.

If no single model was strongest at everything, and if execution quality and logging quality were not the same cognitive job, then perhaps the right answer was not "pick a winner," but "split the roles."

That is why I added the fourth scenario.

## Scenario 4: Split-agent architecture and failure-mode coverage

The fourth scenario was not just another prompt. It was a change in architecture.

Instead of asking one agent to reason, execute, and log everything, I moved to a split workflow with three responsibilities:

- a provenance-aware coordinator
- an execution-focused worker
- a strict logger

I also expanded the scenario suite beyond baseline decision-making. At this point the goal was to test not only ordinary reuse, but also more realistic failure modes:

- what happens when an earlier prior is stale
- what happens when prior history is internally inconsistent
- what happens when escalation is the right answer
- what happens when the task should produce no decision log at all

**This is where the prototype became much more convincing.**

At a high level, the split-agent flow showed the cleanest overall provenance behavior:

- prior decisions were reused when the context still fit
- stale priors were overridden when the binding constraint changed
- conflicting priors were treated as soft evidence rather than majority truth
- multi-decision tasks were preserved as separate decisions
- escalation could be represented as a real decision rather than as indecision
- non-decision tasks did not produce fake provenance records

This was the first stage where the architecture itself started to matter as much as the prompt.

By this point, the answer to both validation questions had become much stronger.

The prototype was no longer only showing that agents can sometimes log decisions, or that prior memory can sometimes influence later runs. It was showing that decision provenance works best when the workflow is explicitly designed for it.

## What became clear across the scenarios

Taken together, the scenarios produced a coherent progression.

### After Scenario 1

The main conclusion was:

> Agents can recognize and log meaningful decisions, and earlier decision logs can visibly influence later decisions.

### After Scenario 2

The conclusion became more precise:

> Provenance memory works best as a soft prior. It narrows the viable decision frontier, but does not need to eliminate all legitimate disagreement to be useful.

### After Scenario 3

The conclusion became stricter:

> Decision provenance is harder than correct output generation. A task can be completed successfully while still producing incomplete or merged provenance.

### After Scenario 4

The conclusion became architectural:

> The strongest observed behavior came not from one model doing everything, but from separating judgment, execution, and strict logging into different roles.

## Differences across models, and why a hybrid combination makes sense

One of the most useful outcomes of the research was not a universal model ranking, but a role-based interpretation of model behavior.

At a high level, the tested models appeared to separate into different strengths.

This comparison should also be read with one practical note in mind. The four models I used in this prototype were the ones available in my environment at the time: `Claude Opus 4.6`, `Claude Sonnet 4.6`, `Gemini 3.1 Pro`, and `GPT-5.4`. That does not make this set final or uniquely correct. I assume other model combinations may prove even better for this kind of provenance workflow, but that would require additional exploration rather than assumption.

### GPT-style behavior

GPT was strongest when the job required turning decisions into explicit, structured, auditable records.

Its behavior aligned well with:

- field discipline
- explicit separation of decision units
- cleaner logging contracts
- more reliable provenance structure

The simplest metaphor is that GPT behaved like a decision compiler.

### Claude Sonnet-style behavior

Claude Sonnet was strongest at execution-oriented reasoning.

It tended to produce:

- clearer trade-off explanations
- stronger delivery quality
- more natural strategic prose
- better task-facing synthesis

This made it feel like the most reliable execution worker in the flow.

### Claude Opus-style behavior

Claude Opus was strongest when prior context had to be interpreted rather than merely retrieved.

It was especially good at:

- reasoning across prior decisions
- recognizing when a prior still fit
- recognizing when a prior should be refined
- recognizing when a prior should be overridden

This made it the best fit for provenance-aware coordination.

### Why the combination makes sense

The research gradually made one thing clear:

**decision provenance needs at least three kinds of intelligence at once.**

- judgment about what matters now
- execution quality on the live task
- structural discipline in the memory record

These are related, but they are not identical.

If one model is strong at narrative judgment but weaker at strict schema behavior, and another is strong at explicit logging but less rich in live synthesis, then the right move is not to force one model to do every job. The better move is to split the jobs.

That is why the final architecture made sense:

- a provenance-aware coordinator for reasoning with prior decisions
- an execution-focused worker for completing the task
- a strict logger for preserving memory cleanly

## Why this architecture is needed for decision provenance

Decision provenance is not just note-taking after the fact.

If decisions are first-class artifacts, then provenance has to be present at three moments:

- before a decision, when prior reasoning is reviewed
- during the task, when the live choice is actually made
- after the task, when the decision is preserved in durable form

A generic single-agent workflow often struggles here for a simple reason:

- the same agent that makes the decision is also doing the work
- the same agent is also expected to write the structured memory
- the same agent must also decide whether something was a decision at all

In practice, that usually causes one of two failures:

- reasoning stays rich, but the memory becomes vague
- memory stays structured, but the reasoning becomes rigid

The split architecture exists to reduce that tension.

## Detailed flow of the current prototype

The current prototype is best understood as a provenance pipeline.

### 1. Intake and decision screening

The workflow begins by asking a simple question:

> Is this task likely to contain a meaningful decision?

This matters because not every task deserves provenance. If a system logs every small edit, the memory layer becomes noisy and loses value.

### 2. Prior review as virtual gut feeling

If the task is non-trivial, the coordinator reviews relevant prior decisions.

The purpose is not to copy history mechanically. The purpose is to decide whether earlier reasoning should be:

- reused
- refined
- overridden

This is the point where memory becomes judgment rather than storage.

### 3. Task execution

The execution worker then performs the live task.

Its job is to solve the problem well, while preserving enough decision context that the provenance layer can later record what actually mattered.

### 4. Strict decision logging

Once the work is complete, the logger converts the meaningful decisions into structured records.

Its role is not to rethink the task from zero. Its role is to preserve:

- what was decided
- why it was decided
- what alternatives were considered
- what trade-offs were accepted
- what prior reasoning influenced the choice

### 5. No-decision path

If no meaningful decision was made, the task still completes, but no provenance record is created.

**This is essential.**

A serious provenance system must avoid over-logging just as carefully as it avoids under-logging.

## Benefits provided by this prototype

Even as a prototype, the workflow shows several benefits clearly.

### Better traceability

It becomes easier to answer:

- What was decided?
- Why was it decided?
- What alternatives were rejected?
- Which prior reasoning still mattered?
- What changed when an earlier decision was overturned?

### Reusable decision memory

Prior decisions stop being dead documents and start becoming a usable soft prior for future work.

### Clearer multi-decision handling

The workflow is capable of treating one task as more than one decision event, which is essential for realistic governance.

### Safer prior reuse

The goal is not only to remember history, but to remember it in a governed way, where stale precedent can be rejected and conflicting precedent can be interpreted rather than obeyed.

### Better match to heterogeneous model strengths

The prototype benefits from using different styles of intelligence for different responsibilities instead of forcing one model to do everything equally well.

## Best-fit use cases

This approach is most useful when work contains recurring judgment and where later teams, agents, or stakeholders will need to understand why a decision happened.

Strong fits include:

- product prioritization
- rollout and release decisions
- safety and guardrail design
- escalation-sensitive go or no-go calls
- architecture trade-offs
- compliance-sensitive workflow choices
- repeated operational decisions where prior incidents should inform future action

It is especially valuable when the same option families recur over time and when decisions need to be revisited under changing conditions.

## Weak-fit or unnecessary use cases

This architecture is not necessary for every kind of agent work.

Weak fits include:

- clarity rewrites
- cosmetic formatting changes
- straightforward retrieval tasks
- mechanical transformations with no real trade-off

In those cases, the right behavior is usually to complete the task and avoid creating provenance records.

## Design review of the current prototype

At this stage, the final prototype is strong in concept and still intentionally limited in implementation.

Its strengths are clear:

- the role boundaries are understandable
- provenance is treated as part of the workflow, not a post-processing extra
- prior reasoning is reusable without being made absolute
- non-decision tasks can be left out of the log

**But it is still a prototype.**

The most important caveat is not that the idea is weak. The caveat is that the memory substrate is still minimal. A flat `decision-log` file is enough to validate the core behavior, but it is not the final form of organizational memory.

There is also a second caveat at the workflow level. Once a system becomes multi-agent, role boundaries can be designed more clearly than they are later observed in persisted artifacts. In other words, the workflow can behave better than its trace model currently proves. That is acceptable at prototype stage, but it is still a boundary worth naming.

## Current prototype boundary: from file log to organizational memory

The current prototype should be understood as validation of the core idea, not as the finished memory architecture.

Today, the memory substrate is:

- explicit
- structured
- reusable
- append-only

But it is still just a file-based decision log.

That is enough to show that agents can detect meaningful decisions and that prior decisions can influence future ones. It is not yet a full organizational memory system.

The broader direction remains the one outlined across the Provenance work:

- decisions as first-class artifacts
- decisions carrying context
- decisions evolving rather than disappearing
- decisions becoming queryable organizational memory

Over time, a mature version of this should move beyond a flat log toward a provenance memory layer that combines retrieval and graph structure, so that decision history becomes linked, queryable, and reusable across people, agents, systems, and time.

## Final flow interpretation

The clearest way to understand the current prototype is this:

> it is not just an orchestration stack for agents.
>
> It is a provenance pipeline.

Its purpose is not only to solve the current task. Its purpose is also to preserve enough decision memory that the next related task can be more intelligible, more consistent, and easier to audit.

**That is the key shift.**

Without provenance, an agent run ends as soon as the output is delivered.

With decision provenance, the run leaves behind reusable reasoning:

- what mattered
- what was chosen
- what was rejected
- what risk was accepted
- what prior judgment still applied
- what prior judgment no longer fit

That is why this architecture matters. It turns agent execution from isolated output generation into cumulative decision memory.

## Executive summary

The prototype was built to answer two practical questions.

### 1. Can an agent self-identify meaningful decisions and log them with context?

**At a high level, yes.**

Across the validation path, the prototype showed that agents can recognize non-trivial decisions, classify them as important, and preserve them as structured records rather than leaving them implicit inside the final output. The biggest qualification is that multi-decision tasks are a stricter test than single-decision tasks. An agent may complete a task correctly while still weakening provenance if it merges or omits decision boundaries.

### 2. Can prior decision logs act as a virtual gut feeling?

**Again, yes.**

Prior decision memory clearly influenced later reasoning. The most useful effect was not blind consensus, but frontier narrowing: weak options were filtered out, stronger patterns became easier to reuse, and stale or conflicting priors could still be refined or overridden when the context changed.

### What the full validation process suggests

The research did not end at "agents can log decisions."

It led to a stronger conclusion:

> decision provenance works best when the workflow is designed for it.

That means:

- one role for provenance-aware interpretation of prior memory
- one role for execution of the live task
- one role for strict preservation of the decision record

And it means treating the current file-based `decision-log` as a prototype memory layer on the way toward a richer organizational provenance system.

So the short answer to the original audience questions is:

- Yes, agents can begin to build decision memory.
- Yes, prior decision logs can become a usable virtual gut feeling.
- And yes, the strongest path forward appears to be not a single all-purpose agent, but a provenance-native architecture built around explicit decision memory.

For readers who want to explore the prototype directly, the [DecisionLog](https://github.com/yauhenikurbayeu/DecisionLog) repository contains the working solution, a [detailed evaluation report](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/DESISION_PROVENANCE_EVOLUTION.md), sample prompts, and test results.
