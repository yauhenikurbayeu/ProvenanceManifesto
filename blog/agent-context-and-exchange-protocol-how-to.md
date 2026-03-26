![Managing Agent Context and the Exchange Protocol](/images/blog/agent-context-and-exchange-protocol-how-to.png)

# Managing Agent Context and the Exchange Protocol

**Author:** Yauheni Kurbayeu  
**Published:** Mar 26, 2026  

## A Follow-Up to Agentic Flow How-To Guide

This guide picks up where  [Agentic Flow How-To Guide](/blog/agentic-flow-how-to-guide) stops.

The first guide explained the three execution modes:

- sequential
- parallel
- hierarchical

This guide focuses on the thing that makes those modes workable in practice:

- how agents keep a shared context
- how they hand work to one another
- how they return results without breaking the flow

The most accurate name for this pattern is a **shared agent handoff protocol**.

That protocol is centered on [.github/skills/shared-agent-contract/SKILL.md](/blog/artifacts/agentic-flow-how-to-guide-shared-agent-contract-SKILL).

## Purpose

Use this guide when you want to:

- understand what `shared-agent-contract` actually does
- see how it is used by the current agents
- reproduce the pattern locally with copy-pasteable examples
- extend it into more realistic multi-agent flows later

## What `shared-agent-contract` Actually Is

In the current example, `shared-agent-contract` is the shared protocol every agent inherits through instruction composition.

It is responsible for standardizing:

- the incoming task envelope
- the minimum execution rules
- the outgoing result shape
- the failure shape

It is **not** the entire orchestration system.

It does **not** decide:

- which mode to run
- which child agent to call
- when to fan out
- how to aggregate branch results

Those responsibilities live elsewhere:

- `.github/copilot-instructions.md` defines the workspace-wide baseline
- `.github/skills/agents-orchestration/SKILL.md` defines parent-agent delegation behavior
- `.github/skills/worker/SKILL.md` defines worker behavior
- `.github/agents/*.agent.md` define agent-specific specialization

So the clean mental model is:

```text
shared-agent-contract = the envelope + exchange protocol
agents-orchestration = the delegation strategy
worker = the leaf/default execution behavior
agent files = role specialization
```

## Why This Contract Exists

Without a shared contract, each agent handoff turns into free-form prompt passing.

That usually causes the same problems:

- missing fields
- unstable output shape
- hidden assumptions
- brittle chaining
- hard-to-debug failures

The contract solves that by making every agent speak the same small protocol.

That is why the current example can support all three execution modes without inventing a new prompt format for each one.

## Sample Workspace Structure

In sample workspace files, `shared-agent-contract` should be referenced directly by the agents that use it:

- `.github/agents/main-orchestrator.agent.md`
- `.github/agents/worker1.agent.md`
- `.github/agents/worker2.agent.md`
- `.github/agents/worker3.agent.md`

That means the contract is the common layer shared by:

- the root orchestrator
- normal leaf-worker execution
- hierarchical worker-to-worker delegation

### Sample structure

```text
.github/
  copilot-instructions.md
  AGENT-ARCHITECTURE.md
  agents/
    main-orchestrator.agent.md
    worker1.agent.md
    worker2.agent.md
    worker3.agent.md
  skills/
    shared-agent-contract/
      SKILL.md
    agents-orchestration/
      SKILL.md
    worker/
      SKILL.md
  hooks/
    HOOKS.md
```

### Layering

```text
User request
  -> global instructions
  -> shared contract
  -> role skill
  -> agent specialization
  -> runtime task envelope
```

### Where the contract is used

| Layer | File | What it contributes |
| --- | --- | --- |
| Global base | `.github/copilot-instructions.md` | Shared fields, operating rules, delegation baseline |
| Shared protocol | `.github/skills/shared-agent-contract/SKILL.md` | Required input, execution rules, success/failure return templates |
| Parent behavior | `.github/skills/agents-orchestration/SKILL.md` | Mode selection, delegation rules, aggregation rules |
| Worker behavior | `.github/skills/worker/SKILL.md` | Narrow scope, stable shape, leaf-by-default rules |
| Specialization | `.github/agents/*.agent.md` | Which worker does what, and who may call whom |

## Reality Check: What This Example Models Today

The current example models a clean idea, but there are two important nuances to keep in mind.

### 1. The contract is stable, but the role model changes by mode

In `sequential` and `parallel` mode:

- `worker1`, `worker2`, and `worker3` behave like normal workers
- the orchestrator remains the control point

In `hierarchical` mode:

- `worker1` becomes a parent of `worker2`
- `worker2` becomes a parent of `worker3`
- only `worker3` stays a true terminal worker

So in practice, `shared-agent-contract` is shared by both:

- leaf workers
- intermediate worker-coordinators

### 2. The contract is stable, but the handoff strategy changes by mode

In `sequential` mode, every handoff goes back to the orchestrator.
In `parallel` mode, every worker gets the same original input from the orchestrator.
In `hierarchical` mode, every handoff goes directly to the next worker.

## The Shared Task Envelope

The current contract expects every delegated task to carry the same top-level fields:

```yaml
task_id: text-flow-001
objective: transform the input through the configured worker flow
mode: sequential
input_artifact: "hello"
constraints:
  - preserve string output
  - do not remove previous worker changes
expected_output:
  type: text
  format: plain-string
parent_agent: main-orchestrator
```

### What each field is for

- `task_id`: stable run identifier across the whole flow
- `objective`: the final purpose, not just the current step
- `mode`: execution strategy that controls handoff behavior
- `input_artifact`: the current working payload
- `constraints`: cross-step rules that must survive every handoff
- `expected_output`: what the final result should look like
- `parent_agent`: who delegated the current step

## The Shared Return Contract

Every agent is expected to return the same top-level structure:

```yaml
status: success
agent: worker1
summary: Appended the worker1 marker to the input text
result: hello_worker1
notes:
  - Assumed plain string input
```

### Failure shape

```yaml
status: failed
agent: worker2
summary: Unable to complete the assigned step
result: null
notes:
  - Missing input_artifact
```

### Why this matters

When every agent returns the same top-level shape, parent agents can safely:

- route results to the next worker
- aggregate results across branches
- stop on failure without custom parsing
- log lineage and assumptions consistently

## The Exchange Protocol in One Diagram

```text
                    +---------------------------+
                    |      User or Parent       |
                    +-------------+-------------+
                                  |
                                  v
                    +---------------------------+
                    |   Shared Task Envelope    |
                    | task_id                   |
                    | objective                 |
                    | mode                      |
                    | input_artifact            |
                    | constraints               |
                    | expected_output           |
                    | parent_agent              |
                    +-------------+-------------+
                                  |
                                  v
                    +---------------------------+
                    |         Agent Runs        |
                    | role-specific behavior    |
                    | stable shape rules        |
                    | notes for assumptions     |
                    +-------------+-------------+
                                  |
                                  v
                    +---------------------------+
                    |   Shared Return Contract  |
                    | status                    |
                    | agent                     |
                    | summary                   |
                    | result                    |
                    | notes                     |
                    +---------------------------+
```

## The Most Important Design Rule

The protocol works best when agents pass forward:

- the same run identity
- the original objective
- the current artifact
- the unchanged constraints
- the same expected output contract

Only the `input_artifact` and `parent_agent` should normally change at each hop.

That is the simplest way to preserve context without ballooning prompt size.

## Step-by-Step: How To Reproduce This Locally

This section gives you a minimal version of the current pattern that you can copy into a project.

It stays close to the current example, but the wording is cleaned up slightly so the protocol is easier to reason about.

### Step 1. Create the folder structure

```text
.github/
  copilot-instructions.md
  agents/
    main-orchestrator.agent.md
    worker1.agent.md
    worker2.agent.md
    worker3.agent.md
  skills/
    shared-agent-contract/
      SKILL.md
    agents-orchestration/
      SKILL.md
    worker/
      SKILL.md
```

### Step 2. Add the global instructions

Create `.github/copilot-instructions.md`:

```md
# Copilot Instructions

This example demonstrates an inheritance-like pattern for GitHub Copilot agents.

## Instruction hierarchy

Apply instructions in this order:

1. Global rules from this file
2. Shared skills referenced by an agent
3. Agent-local rules in the `.agent.md` file
4. Runtime task details passed by the parent agent or user

## Common task envelope

Every agent should reason from the same task envelope:

- `task_id`
- `objective`
- `mode`
- `input_artifact`
- `constraints`
- `expected_output`
- `parent_agent`

## Standard return contract

All agents should return the same top-level fields:

- `status`
- `agent`
- `summary`
- `result`
- `notes`
```

### Step 3. Add the shared contract skill

Create `.github/skills/shared-agent-contract/SKILL.md`:

````md
---
name: shared-agent-contract
description: Base protocol inherited by all agents in this workspace.
---

# Shared Agent Contract

Use this skill in every agent to simulate inheritance through shared instruction composition.

## Required input

Expect a task envelope containing:

- `task_id`
- `objective`
- `mode`
- `input_artifact`
- `constraints`
- `expected_output`
- `parent_agent`

## Execution rules

- Operate only on the current `input_artifact`.
- Preserve the artifact shape unless your role explicitly owns schema changes.
- Keep outputs deterministic so downstream agents can chain safely.
- Propagate important assumptions in `notes`.
- Fail fast when required input is missing or malformed.

## Return template

```yaml
status: success
agent: <agent-name>
summary: <one-sentence summary>
result: <updated artifact>
notes:
  - <optional warning or assumption>
```

## Failure template

```yaml
status: failed
agent: <agent-name>
summary: Unable to complete the assigned step
result: null
notes:
  - <reason for failure>
```
````

### Step 4. Add the orchestration skill

Create `.github/skills/agents-orchestration/SKILL.md`:

```md
---
name: agents-orchestration
description: Shared orchestration behavior for parent agents.
---

# Agents Orchestration Skill

Use this skill whenever a parent agent needs to delegate work to child agents.

## Responsibilities

- Normalize the incoming request into the shared task envelope.
- Decide whether the flow should run in `sequential`, `parallel`, or `hierarchical` mode.
- Delegate only to the child agents declared in the current agent file.
- Preserve shared constraints as work moves between workers.
- Aggregate worker outputs into a single final response.

## Delegation protocol

- In `sequential` mode, send the original `input_artifact` to the first worker.
- For each next worker, pass the previous worker's `result` as the new `input_artifact`.
- In `parallel` mode, send the same original `input_artifact` to every worker.
- In `hierarchical` mode, send the previous worker's `result` directly to the next worker without returning to the orchestrator.
- Include `task_id`, `mode`, `objective`, `constraints`, `expected_output`, and `parent_agent` in every child request.
```

### Step 5. Add the worker skill

Create `.github/skills/worker/SKILL.md`:

```md
---
name: worker
description: Shared execution rules for leaf worker agents.
---

# Worker Skill

Use this skill for worker agents that perform one narrow step in a parent-controlled flow.

## Responsibilities

- Receive a task envelope from the parent orchestrator.
- Execute only the worker-specific transformation defined in the agent file.
- Preserve prior worker changes unless your role explicitly replaces them.
- Return the updated artifact using the shared return contract.

## Worker rules

- Treat worker agents as leaf nodes unless the agent file explicitly says otherwise.
- Do not reinterpret the whole workflow; focus on your single responsibility.
- Keep the output shape stable so the next worker can consume it without extra parsing.
- Put edge cases or assumptions in `notes` instead of burying them in the main result.
```

### Step 6. Add the orchestrator

Create `.github/agents/main-orchestrator.agent.md`:

```md
---
name: main-orchestrator
description: Root coordinator for sequential, parallel, and hierarchical flows.
tools: ['agent', 'read', 'search', 'edit']
agents: ['worker1', 'worker2', 'worker3']
model: GPT-5.1 (copilot)
---

Use the `shared-agent-contract` skill.
Use the `agents-orchestration` skill.

You are the root orchestration agent for this workspace.

## Role

- Accept a user request and normalize it into the shared task envelope.
- Choose `sequential`, `parallel`, or `hierarchical` execution based on the user request.
- Delegate work only to `worker1`, `worker2`, and `worker3`.
- Aggregate worker outputs into the shared return contract.
```

### Step 7. Add the workers

Create `.github/agents/worker1.agent.md`:

```md
---
name: worker1
description: First worker in the sample flow.
user-invocable: false
disable-model-invocation: true
tools: ['read', 'search', 'edit']
agents: ['worker2']
model: GPT-5.1 (copilot)
---

Use the `shared-agent-contract` skill.
Use the `worker` skill.

You are the first worker in the sample pipeline.

## Responsibility

- Read the current `input_artifact` and `mode`.
- Append `_worker1` in sequential or parallel mode.
- Append `>worker1` in hierarchical mode.
- Return to `main-orchestrator` in sequential or parallel mode.
- Delegate to `worker2` in hierarchical mode.
```

Create `.github/agents/worker2.agent.md`:

```md
---
name: worker2
description: Second worker in the sample flow.
user-invocable: false
disable-model-invocation: true
tools: ['read', 'search', 'edit']
agents: ['worker3']
model: GPT-5.1 (copilot)
---

Use the `shared-agent-contract` skill.
Use the `worker` skill.

You are the second worker in the sample pipeline.

## Responsibility

- Read the current `input_artifact` and `mode`.
- Append `_worker2` in sequential or parallel mode.
- Append `>worker2` in hierarchical mode.
- Return to `main-orchestrator` in sequential or parallel mode.
- Delegate to `worker3` in hierarchical mode.
```

Create `.github/agents/worker3.agent.md`:

```md
---
name: worker3
description: Final worker in the sample flow.
user-invocable: false
disable-model-invocation: true
tools: ['read', 'search', 'edit']
model: GPT-5.1 (copilot)
---

Use the `shared-agent-contract` skill.
Use the `worker` skill.

You are the final worker in the sample pipeline.

## Responsibility

- Read the current `input_artifact` and `mode`.
- Append `_worker3` in sequential or parallel mode.
- Append `>worker3` in hierarchical mode.
- Return the updated artifact using the shared return contract.
```

## How Context Moves in Each Mode

This is the part that usually causes confusion.

The mode changes:

- who talks to whom
- which agent owns the next handoff
- how much context each agent needs to keep

The contract itself does not change.

### Mode 1. Sequential

In sequential mode, the orchestrator stays in the middle of every handoff.

```text
main-orchestrator
  -> worker1
  -> main-orchestrator
  -> worker2
  -> main-orchestrator
  -> worker3
  -> main-orchestrator
```

#### Sample request sent to `worker1`

```yaml
task_id: demo-seq-001
objective: transform the input through all workers in order
mode: sequential
input_artifact: "draft"
constraints:
  - keep output as plain text
  - preserve previous worker edits
expected_output:
  type: text
parent_agent: main-orchestrator
```

#### `worker1` response

```yaml
status: success
agent: worker1
summary: Appended the worker1 sequential suffix
result: draft_worker1
notes:
  - Input treated as plain text
```

#### Request sent to `worker2`

```yaml
task_id: demo-seq-001
objective: transform the input through all workers in order
mode: sequential
input_artifact: "draft_worker1"
constraints:
  - keep output as plain text
  - preserve previous worker edits
expected_output:
  type: text
parent_agent: main-orchestrator
```

#### `worker2` response

```yaml
status: success
agent: worker2
summary: Appended the worker2 sequential suffix
result: draft_worker1_worker2
notes:
  - Preserved previous worker output
```

#### Request sent to `worker3`

```yaml
task_id: demo-seq-001
objective: transform the input through all workers in order
mode: sequential
input_artifact: "draft_worker1_worker2"
constraints:
  - keep output as plain text
  - preserve previous worker edits
expected_output:
  type: text
parent_agent: main-orchestrator
```

#### `worker3` response

```yaml
status: success
agent: worker3
summary: Appended the worker3 sequential suffix
result: draft_worker1_worker2_worker3
notes:
  - Final sequential stage completed
```

#### Final orchestrator result

```yaml
status: success
agent: main-orchestrator
summary: Completed the sequential worker chain
result:
  mode: sequential
  final_output: draft_worker1_worker2_worker3
  steps:
    - worker: worker1
      output: draft_worker1
    - worker: worker2
      output: draft_worker1_worker2
    - worker: worker3
      output: draft_worker1_worker2_worker3
notes:
  - Orchestrator remained the control point between every step
```

#### What matters in sequential mode

- context stays easiest to observe
- retries are straightforward
- the orchestrator is always the source of truth
- every worker only needs the current artifact plus the shared envelope

### Mode 2. Parallel

In parallel mode, the orchestrator fans out the same input to multiple workers.

```text
                  -> worker1 ->
main-orchestrator                 main-orchestrator
                  -> worker2 ->
                  -> worker3 ->
```

#### Shared request sent to all workers

```yaml
task_id: demo-par-001
objective: compare worker outputs on the same input
mode: parallel
input_artifact: "draft"
constraints:
  - keep output as plain text
  - do not mutate the original request object
expected_output:
  type: comparison
parent_agent: main-orchestrator
```

#### `worker1` response

```yaml
status: success
agent: worker1
summary: Appended the worker1 parallel suffix
result: draft_worker1
notes:
  - Executed independently from sibling workers
```

#### `worker2` response

```yaml
status: success
agent: worker2
summary: Appended the worker2 parallel suffix
result: draft_worker2
notes:
  - Executed independently from sibling workers
```

#### `worker3` response

```yaml
status: success
agent: worker3
summary: Appended the worker3 parallel suffix
result: draft_worker3
notes:
  - Executed independently from sibling workers
```

#### Final orchestrator result

```yaml
status: success
agent: main-orchestrator
summary: Completed parallel fan-out and aggregation
result:
  mode: parallel
  outputs:
    worker1: draft_worker1
    worker2: draft_worker2
    worker3: draft_worker3
notes:
  - All workers received the same original input_artifact
```

#### What matters in parallel mode

- workers should not depend on one another
- the same contract is reused, but result aggregation changes
- traceability matters because there are multiple sibling outputs

### Mode 3. Hierarchical

In hierarchical mode, the orchestrator starts the run, but workers pass the artifact down the chain themselves.

```text
main-orchestrator -> worker1 -> worker2 -> worker3
```

This is the mode where the contract matters most, because worker-to-worker handoff becomes part of the design.

#### Initial request sent to `worker1`

```yaml
task_id: demo-hier-001
objective: run a delegated worker-owned chain
mode: hierarchical
input_artifact: "draft"
constraints:
  - keep output as plain text
  - preserve prior worker edits
expected_output:
  type: text
parent_agent: main-orchestrator
```

#### `worker1` local result before delegation

```yaml
status: success
agent: worker1
summary: Appended the worker1 hierarchical marker
result: draft>worker1
notes:
  - Passing result directly to worker2
```

#### `worker1` request sent to `worker2`

```yaml
task_id: demo-hier-001
objective: run a delegated worker-owned chain
mode: hierarchical
input_artifact: "draft>worker1"
constraints:
  - keep output as plain text
  - preserve prior worker edits
expected_output:
  type: text
parent_agent: worker1
```

#### `worker2` local result before delegation

```yaml
status: success
agent: worker2
summary: Appended the worker2 hierarchical marker
result: draft>worker1>worker2
notes:
  - Passing result directly to worker3
```

#### `worker2` request sent to `worker3`

```yaml
task_id: demo-hier-001
objective: run a delegated worker-owned chain
mode: hierarchical
input_artifact: "draft>worker1>worker2"
constraints:
  - keep output as plain text
  - preserve prior worker edits
expected_output:
  type: text
parent_agent: worker2
```

#### `worker3` terminal response

```yaml
status: success
agent: worker3
summary: Appended the worker3 hierarchical marker
result: draft>worker1>worker2>worker3
notes:
  - Final hierarchical stage completed
```

#### Final top-level result

```yaml
status: success
agent: main-orchestrator
summary: Completed hierarchical worker delegation
result:
  mode: hierarchical
  root_output: draft>worker1>worker2>worker3
notes:
  - worker1 delegated to worker2
  - worker2 delegated to worker3
```

#### What matters in hierarchical mode

- worker agents are no longer pure leaf nodes
- `parent_agent` changes at each hop
- lineage becomes more important than in sequential mode
- observability gets harder unless you log intermediate summaries

## Side-by-Side Handoff Comparison

| Topic | Sequential | Parallel | Hierarchical |
| --- | --- | --- | --- |
| Control point | Orchestrator between every step | Orchestrator fans out and aggregates | Workers delegate down the chain |
| `input_artifact` evolution | Changes after each step | Same original input for each worker | Changes at each worker-to-worker hop |
| `parent_agent` | Usually `main-orchestrator` | Usually `main-orchestrator` | Changes from orchestrator to worker1 to worker2 |
| Best for | Pipelines | Independent branches | Nested delegated subflows |
| Main risk | Slow critical path | Output comparison complexity | Harder tracing and failure recovery |

## A More Realistic Artifact Example

The current example uses string transforms because they are easy to see.

That is useful for teaching, but in production you will usually pass structured artifacts.

Here is the same protocol with a document object instead of a plain string.

### Example envelope

```yaml
task_id: editorial-017
objective: enrich a release note through multi-agent processing
mode: sequential
input_artifact:
  doc_id: release-note-017
  title: April release notes
  body: "Added new export endpoint."
  history: []
constraints:
  - preserve doc_id
  - append to history instead of replacing it
expected_output:
  type: release-note-document
parent_agent: main-orchestrator
```

### Example worker result

```yaml
status: success
agent: worker1
summary: Added normalization metadata
result:
  doc_id: release-note-017
  title: April release notes
  body: "Added new export endpoint."
  history:
    - worker: worker1
      action: normalized-text
notes:
  - Preserved document identity
```

This is still the same contract.

Only `input_artifact` became richer.

## Internal Context That Each Agent Really Needs

One of the easiest mistakes in multi-agent design is oversharing context.

The current example works because it keeps the payload small.

### Minimum context every agent needs

- the current `input_artifact`
- the original `objective`
- the current `mode`
- shared `constraints`
- expected final shape in `expected_output`
- immediate upstream actor in `parent_agent`

### Context most agents do not need

- the entire user conversation history
- all sibling worker outputs
- the full prompt text of every previous agent
- low-value narrative explanations that are not machine-usable

### Good rule of thumb

Pass enough context to make the next step correct.

Do not pass so much context that the next step starts re-deciding the workflow.

## Recommendations This Pattern Is Based On

This pattern is aligned with a few stable ideas from current agent tooling and prompting practice.

### GitHub Copilot customization model

The repository structure matches GitHub's current customization model for:

- repository instructions
- custom agents
- skills
- hooks

Useful references:

- GitHub Docs: [About custom agents](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/coding-agent/about-custom-agents)
- GitHub Docs: [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- GitHub Docs: [Creating agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-skills)
- GitHub Docs: [Invoking custom agents](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-agents/invoke-custom-agents)
- GitHub Docs: [About hooks](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks)
- GitHub Docs: [Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

### General AI best practices

The protocol also follows common prompt and orchestration best practices:

- use clear instruction layering
- keep roles narrow
- prefer structured handoff payloads over free-form prose
- define explicit failure shapes
- preserve stable schemas across multi-step chains
- include examples when you need reliable behavior

Useful references:

- OpenAI Docs: [Structured model outputs](https://platform.openai.com/docs/guides/structured-outputs?api-mode=chat)

## Recommended Use Cases

This specific contract pattern is a good fit when you need:

- stepwise transformations with predictable handoffs
- multiple specialist workers that share the same artifact shape
- orchestrator-led pipelines with reusable prompt layers
- branch comparison across several workers
- nested subflows where worker-owned delegation is intentional

### Concrete examples

- content pipelines: normalize -> enrich -> finalize
- code pipelines: analyze -> refactor -> verify
- documentation flows: extract facts -> rewrite -> format
- review flows: lint review -> security review -> test review
- research flows: gather evidence -> summarize -> synthesize

## Pros and Cons

### Pros

- easy to reason about
- easy to extend with new workers
- low duplication across agent files
- works across several execution modes
- failure handling becomes more consistent
- easier to audit because the schema is stable

### Cons

- hierarchical mode blurs the leaf-worker model
- YAML-only contracts can drift without validation
- a too-small envelope can hide needed context
- a too-large envelope can create prompt bloat
- aggregation logic still has to be designed separately
- ambiguous ownership shows up quickly if agent files are too loose

## How To Scale This Pattern

The current example is intentionally small.

If you want to scale it, these are the next logical steps.

### 1. Add contract versioning

Introduce a field such as:

```yaml
contract_version: 1
```

This helps when new workers or tools need a changed payload shape later.

### 2. Move from simple YAML conventions to validated schemas

Today the contract is prompt-defined.

At scale, you usually want:

- JSON Schema
- Zod or Pydantic models
- pre-flight validation hooks

### 3. Track lineage explicitly

Add fields such as:

```yaml
lineage:
  root_task_id: editorial-017
  hop: 2
  path:
    - main-orchestrator
    - worker1
```

This becomes very helpful in hierarchical and DAG-like flows.

### 4. Separate transport metadata from business payload

For larger systems, keep these concerns distinct:

- routing and control metadata
- the actual artifact being transformed

That often leads to cleaner debugging and easier schema evolution.

### 5. Introduce hooks for validation and observability

Hooks are a strong next step for:

- envelope validation
- audit logging
- policy enforcement
- failure capture

### 6. Evolve from chain orchestration to DAG orchestration

Once you have a stable contract, you can expand from:

- linear chains
- simple fan-out/fan-in

to:

- conditional routing
- retry branches
- validation branches
- merge nodes

## A Simple Scaling Roadmap

```text
Level 1: Shared prompt contract
  One envelope, one return schema

Level 2: Role-specific skills
  Orchestrator skill + worker skill

Level 3: Validated handoffs
  Hooks or schema validators check every message

Level 4: Traceable lineage
  Contract versioning, hop IDs, path metadata

Level 5: Graph or DAG execution
  Conditional branches, retries, merges, specialized aggregators
```


## Copy-Paste Demo Data

If you want a quick test set for local experimentation, use these payloads.

### Sequential demo payload

```yaml
task_id: demo-seq-002
objective: append worker markers in order
mode: sequential
input_artifact: "alpha"
constraints:
  - keep output as plain text
expected_output:
  type: text
parent_agent: main-orchestrator
```

Expected final result:

```yaml
result: alpha_worker1_worker2_worker3
```

### Parallel demo payload

```yaml
task_id: demo-par-002
objective: compare worker outputs from the same input
mode: parallel
input_artifact: "beta"
constraints:
  - keep output as plain text
expected_output:
  type: comparison
parent_agent: main-orchestrator
```

Expected final result:

```yaml
result:
  outputs:
    worker1: beta_worker1
    worker2: beta_worker2
    worker3: beta_worker3
```

### Hierarchical demo payload

```yaml
task_id: demo-hier-002
objective: append hierarchical worker markers through delegated handoff
mode: hierarchical
input_artifact: "gamma"
constraints:
  - keep output as plain text
expected_output:
  type: text
parent_agent: main-orchestrator
```

Expected final result:

```yaml
result: gamma>worker1>worker2>worker3
```

## Why This Matters at Scale

Everything in this guide may look like structure for its own sake, but it is not 

It is the difference between a demo and a system.

When you have one agent, or even a small chain, you can get away with free-form prompts. The model fills the gaps, the outputs look plausible, and the flow appears to work.

At scale, that illusion breaks.

As soon as you introduce:
- multiple agents
- parallel branches
- nested delegation
- long-running flows
you are no longer dealing with prompts.

You are dealing with a distributed system.

And distributed systems fail in predictable ways.

Without a shared contract, agent interactions degrade into:
- implicit assumptions about input shape
- inconsistent output formats
- silent data loss between steps
- brittle chaining that breaks on small variations
- debugging that depends on reading full prompt histories

And this is not an AI problem, it is an interface problem.

The `shared-agent-contract` exists to make agent communication explicit, stable, and machine-readable.

It gives you:

- **Deterministic handoffs**  
  Every agent knows exactly what it receives and what it must return.

- **Composable workflows**  
  You can add, remove, or reorder agents without redesigning the prompt each time.

- **Observable execution**  
  Each step produces a predictable artifact that can be logged, inspected, and replayed.

- **Failure containment**  
  Errors are structured, not implicit, which allows orchestration layers to stop, retry, or reroute safely.

- **Mode independence**  
  Sequential, parallel, and hierarchical flows reuse the same protocol instead of redefining communication rules.

Most importantly, the contract turns agent flows from:

> prompt choreography

into:

> protocol-driven execution

That shift is what makes higher-level capabilities possible:

- validation hooks before and after each step
- lineage tracking across multi-agent runs
- policy enforcement at handoff boundaries
- reproducibility of complex workflows
- eventual transition from chains to DAG-based execution

Without a contract, every new agent increases entropy.

With a contract, every new agent becomes a predictable component in a larger system.

This is why the protocol layer is not optional.

It is the foundation that allows agentic systems to scale without collapsing under their own complexity.

## Final Takeaway

In this example, `shared-agent-contract` is best understood as the reusable handoff layer that keeps multi-agent collaboration stable.

It gives every agent:

- the same minimum context shape
- the same return schema
- the same failure shape

That is what allows:

- orchestrator-led pipelines
- fan-out/fan-in flows
- worker-to-worker delegated chains

to coexist without collapsing into prompt chaos.

If you are building a similar system, start here:

1. define one shared envelope
2. define one shared return contract
3. keep workers narrow
4. change orchestration strategy without changing the protocol

That is the main lesson behind the current example.
