# Modern Software Architecture in the Age of Agents

![Modern Software Architecture in the Age of Agents](/images/blog/modern-agentic-architecture.png)

**Author:** Yauheni Kurbayeu  
**Published:** Apr 11, 2026  

---

## From Code-Centric Systems to Decision-Centric Design

Over the past months I keep coming back to the same uncomfortable question:

> If agents can interpret goals, choose tools, coordinate workflows, and adapt at runtime, why are we still writing so much software the old way?

Every time I ask it, the first answer feels seductive and wrong.

It is tempting to say that most application code will collapse into orchestration, prompts, and tool wrappers. It is equally tempting to dismiss the whole thing and insist that "real systems" will always remain mostly deterministic.

At this point, I believe both instincts are too simple.

This article is not a finished doctrine. It is a research note. I am trying to understand where system intelligence should live when software becomes increasingly agentic. If you are thinking about the same problem, I would genuinely like to compare notes. We are still building the foundations of AI-native engineering, and I suspect many of our current assumptions will not survive.

---

## TL;DR

Modern architecture is not about replacing code with agents.  
It is about **redistributing where system intelligence lives**.

Three viable patterns emerge:

- **Thin deterministic core + strong orchestration** -> adaptive, decision-heavy systems
- **Balanced architecture** -> mixed domains with both strict rules and ambiguity
- **Strong deterministic core + thin orchestration** -> correctness-critical systems

The real shift is this:

> Decisions move from implicit code to explicit, governed artifacts.

And that means architecture is no longer only about service boundaries.

It becomes a question of:

- where interpretation is allowed
- where ambiguity must stop
- where correctness must remain deterministic
- and how all of it stays governable once agents participate in execution

---

## The Question That Keeps Bothering Me

At some point, the question inevitably appears:

> Why are we building large amounts of code if agents can orchestrate behavior with minimal logic?

The question is not stupid.

In some domains, it is devastatingly accurate.

A surprising amount of application logic is really coordination logic in disguise:

- move information from one system to another
- interpret a request
- choose a path
- call a tool
- validate output
- escalate when confidence is low

Once you see that, large parts of traditional backend design start to look suspiciously overbuilt.

But when applied broadly, reality pushes back.

Some systems collapse without deterministic guarantees.  
Others become dramatically simpler when orchestration replaces code.

This tension is not accidental.

It is architectural.

---

## The Provocation

I suspect a lot of current "AI architecture" discussion is still too shallow.

In one camp, people act as if agents are just a nicer interface on top of existing systems.

In the other, people act as if deterministic software is mostly legacy and prompts will eat the middle tier.

Both positions underestimate the shift.

The first underestimates how much runtime interpretation is entering systems.

The second underestimates how violently reality punishes ambiguity in domains where mistakes are expensive, irreversible, or regulated.

If we are not careful, we will build one of two bad futures:

- brittle systems with AI lipstick
- or expensive orchestration theater with no trustworthy core

Neither is modern architecture.

---

## The Real Problem: Where Does Intelligence Live?

Traditional systems looked roughly like this:

```text
UI -> Backend -> Database
```

Most system intelligence lived inside backend services.

Business rules, validation, sequencing, and decisions were encoded directly in application code. The system was code-centric not only because code executed the work, but because code also contained most of the reasoning.

Agentic systems begin to separate concerns that were previously fused together.

Modern systems increasingly distribute intelligence across:

- execution
- orchestration
- decisions
- policy
- memory

This is the deeper shift.

The architecture question is no longer simply "how do I decompose services?"

It becomes:

> Which parts of the system should still be deterministic, and which parts should be allowed to interpret, adapt, and decide?

---

## From Code-Centric Stack To Decision-Centric Stack

![From Code-Centric Stack To Decision-Centric Stack](/images/blog/1-decision-dentric-stack.png)

Once you start looking at systems this way, a different layered model starts to appear:

```text
Interfaces / Channels
(web, API, chat)
            ↓
Orchestration Layer
(agents, workflows, routing)
            ↓
Decision Layer
(prompts, constraints, reasoning)
            ↓
Policy & Control Layer
(permissions, approvals)
            ↓
Tool Contract Layer
(structured capabilities)
            ↓
Deterministic Core
(domain logic, transactions)
            ↓
State & Memory Layer
(data, vectors, graphs, provenance)
```

This is not a universal blueprint, but it makes one thing explicit:

system intelligence is no longer concentrated in one place.

Some intelligence lives in deterministic rules.  
Some lives in orchestration.  
Some lives in decisions.  
Some lives in memory.

And once intelligence is distributed, architecture stops being just a code-organization problem.

It becomes a **decision-allocation problem**.

---

## Why Three Patterns Emerge

The next question is obvious:

If intelligence is now distributed, what shape should the system take?

The answer depends less on fashion and more on a few uncomfortable constraints:

- How ambiguous is the domain?
- How expensive is a wrong decision?
- Can errors be reversed?
- How much runtime adaptation creates value?
- How much governance or auditability is required?
- How far can interpretation be trusted before it becomes operational risk?

Once you evaluate systems through those lenses, three viable patterns start to emerge.

Not one.

Three.

And I think that matters because the industry keeps searching for a single winning AI-native architecture, when what is actually emerging is a spectrum with three distinct stable shapes.

### A Simple Decision Matrix

![Agentic Architecture Decision Matrix](/images/blog/3-decision-matrix.png)

| Dimension | Thin Core + Strong Orchestration | Balanced Architecture | Strong Core + Thin Orchestration |
|-----|-----|-----|-----|
| Domain ambiguity | High | Mixed | Low |
| Cost of wrong decision | Moderate and recoverable | Uneven, depends on layer | High or irreversible |
| Reversibility | Usually possible | Partial | Often limited |
| Auditability pressure | Moderate | High | Very high |
| Runtime variability | Valuable | Selectively valuable | Dangerous |
| Best use of agents | Flow control, adaptation, decomposition | Triage, explanation, recommendation | Assistance at the edges only |

This is not a formal taxonomy. It is a practical shortcut.

If ambiguity is high and mistakes are recoverable, orchestration can safely own more of the system.

If ambiguity is low and mistakes are expensive, the deterministic core must stay in charge.

And if your answer is "some of both," you are probably in the balanced middle, which is where I suspect most serious business systems will actually live.

![Three Patterns of Agentic Architecture](/images/blog/2-three-architecture-patterns.png)

---

## Pattern 1: Thin Deterministic Core + Strong Orchestration

This pattern works when **decision-making dominates execution**.

In these systems, most of the value is not inside complex transactional logic. It is in interpreting intent, selecting tools, adapting the workflow, coordinating substeps, handling uncertainty, and recovering from partial failure.

The deterministic core still matters, but it becomes small. It mainly protects tool contracts, state transitions, and a few hard invariants.

The orchestration layer becomes the real operating surface of the system.

This pattern is powerful because it removes a lot of fake structure. It stops pretending that every adaptive workflow needs to be frozen into rigid backend logic before it can be useful.

### Why It Wins

- context changes faster than code can be rewritten
- workflow paths are numerous and partially ambiguous
- runtime adaptation creates more value than static optimization
- human review and escalation are part of the design, not an exception

### Content Localization Pipeline

In a content localization pipeline, the hard part is usually not the translation API itself.

The hard part is orchestration:

- which content should be translated
- in what order
- with which validation gates
- which fallback path should be used if one step fails
- how publishing should proceed when outputs differ in quality

```text
Tools:
- translateArticle
- generateSummary
- publishContent

Orchestration:
- parallel flows
- validation gates
- fallback strategies
```

Here, trying to encode the whole system as static application logic often adds more rigidity than value.

### Engineering Delivery Copilot

The same is true for an engineering delivery copilot.

The valuable behavior is not a single deterministic algorithm. It is a coordinated reasoning process:

```text
Flow:
1. Interpret task
2. Retrieve context
3. Decompose
4. Assign subagents
5. Validate outputs
6. Store decisions
```

The system becomes useful because it can decompose work, route it, validate it, and preserve the decisions behind it.

That is orchestration-heavy architecture.

### The Hidden Risk

This pattern is powerful, but also dangerously easy to fake.

If you build strong orchestration without:

- strict tool contracts
- clear permission boundaries
- validation gates
- provenance

you do not get adaptive architecture.

You get probabilistic chaos with good demos.

---

## Pattern 2: Balanced Architecture

This pattern works when the system must be **both exact and adaptive**.

This is probably the most important pattern because it is where most real businesses actually live.

The system cannot be fully orchestration-heavy because some rules must remain exact.

But it also cannot be fully deterministic because real-world interactions contain ambiguity, exceptions, changing context, and human interpretation.

Balanced architecture is uncomfortable precisely because it refuses both extremes.

### Why It Wins

- some parts of the domain are non-negotiable
- other parts are fuzzy and context-sensitive
- users need explanations, recommendations, or triage
- the system must remain governable without becoming rigid

### Customer Support

Customer support is a good example.

Some parts must remain deterministic:

- SLA logic
- ticket lifecycle
- routing rules

Other parts benefit from orchestration:

- classify intent
- propose response
- escalate

```text
Core:
- SLA logic
- ticket lifecycle

Orchestration:
- classify intent
- propose response
- escalate
```

If you make the whole thing deterministic, the system becomes rigid and unhelpful.  
If you make the whole thing agentic, the support process becomes inconsistent and hard to govern.

### E-commerce Advisory

E-commerce advisory follows the same pattern.

Pricing and inventory need correctness. Recommendations and explanations benefit from adaptation.

```text
Core:
- pricing
- inventory

Orchestration:
- recommendations
- explanations
```

This is the kind of architecture where AI should shape the decision surface, but not quietly redefine the rules of the business.

### Security Investigation

Security investigation may be an even better example.

The system often needs:

- deterministic ingestion
- deterministic evidence collection
- adaptive reasoning
- hypothesis generation

Some parts must be exact because evidence integrity matters. Other parts must remain exploratory because the investigation itself is about forming and testing interpretations.

That is balanced architecture in its purest form.

### The Hidden Risk

The danger here is not lack of sophistication. It is architectural indecision.

Teams often collapse into one of two bad moves:

- they push too much into orchestration and accidentally turn business rules into suggestions
- or they push too much into the core and lose the adaptive value that made agents worth introducing in the first place

Balanced architecture is harder because it requires discipline. It forces teams to say, explicitly, where interpretation stops.

If I had to make one prediction, it is this: most enterprise systems that survive the AI transition will end up here.

Not because the middle is philosophically elegant.

But because reality is messy. Most businesses have one layer that must remain exact, another that benefits from judgment, and a third that only exists because humans are bad at keeping context in working memory.

---

## Pattern 3: Strong Deterministic Core + Thin Orchestration

This pattern works when **correctness dominates**.

And I think this is the pattern current AI enthusiasm underestimates most.

Not everything should become agentic.

There are domains where runtime interpretation is not a feature. It is a liability.

In those systems, the deterministic core must remain sovereign. The orchestration layer may help with routing, explanation, analysis, or user interaction, but it should not own truth.

### Why It Wins

- mistakes are expensive or irreversible
- correctness is legally, financially, or operationally critical
- state transitions must be auditable and reproducible
- ambiguity at execution time is far more dangerous than rigidity

### Payments / Ledger

Payments and ledgers are the obvious example.

The core must own:

- ledger engine
- transaction rules
- settlement logic
- invariants around money movement

```text
Core:
- ledger engine
- transactions

Orchestration:
- minimal
```

Agents can help explain, route, monitor, or prepare actions.

But the moment orchestration starts behaving like a probabilistic ledger, the architecture is already broken.

### ERP Systems

ERP systems are another example people underestimate because they feel boring compared to flashy AI demos.

But ERP is exactly where organizations encode real operational commitments:

- workflows
- approvals
- integrations
- compliance-sensitive state transitions

```text
Core:
- workflows
- integrations

Orchestration:
- limited assistance
```

Here, agents may improve interaction and decision support, but they should remain thin relative to the deterministic system of record.

### Why This Pattern Matters More Than People Admit

Many AI demos quietly avoid domains where the cost of being wrong is real.

They look impressive precisely because they operate where ambiguity is cheap.

But real enterprises run on domains where:

- money moves
- contracts matter
- compliance exists
- errors are audited
- rollback is not always possible

In those domains, strong deterministic core + thin orchestration is not a conservative compromise.

It is often the only sane architecture.

### The Hidden Risk

The failure mode here is different.

If the core becomes too dominant and orchestration too weak, the system becomes rigid, expensive to evolve, and miserable to interact with.

So even here, thin orchestration still matters.

It just matters at the edge, not at the center of truth.

---

## Agentic Flow vs Legacy Code

![Agentic Flow vs Legacy Code](/images/blog/4-agentic-flow-vs-legacy-code.png)

What makes this harder is that many teams are still comparing the wrong things.

They compare "agents" to "services" or "prompts" to "methods."

But the deeper contrast is this:

- **legacy code** optimizes fixed-path execution
- **agentic flow** optimizes runtime path selection under uncertainty

Legacy code assumes that the important path can be known in advance and encoded directly into deterministic logic.

Agentic flow assumes that the important path may depend on context discovered only at runtime:

- what the user actually meant
- what tools are currently available
- what prior decisions matter
- what confidence level is acceptable
- when escalation is required

That is why agentic systems feel both powerful and unsettling.

They are not just executing.

They are deciding how to execute.

And the moment a system starts deciding its own path, architecture can no longer be evaluated only in terms of modules and APIs. It must also be evaluated in terms of control, explainability, and memory.

---

## The Layer That Becomes Non-Negotiable

Regardless of which pattern wins in a given domain, one layer becomes increasingly hard to avoid:

the **provenance layer**.

Why?

Because once decisions move into orchestration, prompts, runtime routing, and AI-assisted reasoning, the system starts making important choices outside of traditional code paths.

If those choices are not preserved, the architecture becomes harder to govern precisely when it becomes more adaptive.

That is why I think provenance is not optional decoration. It becomes structural.

And the same is true for tool contracts.

I increasingly suspect that many agentic systems fail not because the model is weak, but because the contracts are weak.

If tools are vague, permissions are fuzzy, or outputs are loosely structured, the orchestration layer quietly turns business logic into improvisation.

The model gets blamed, but the architecture was careless.

```text
Decision -> Context -> Assumptions -> Outcome
        ↘ Dependencies ↙
         Provenance Graph
```

![Provenance Becomes Non-Negotiable](/images/blog/5-provenance-graph.png)

Without provenance, you may still have execution.

But you do not have memory of why the system behaved the way it did.

And once that happens, AI makes the architecture more powerful and less understandable at the same time.

That is not progress.

That is managed amnesia.

Provenance matters in all three patterns, but for different reasons:

- in orchestration-heavy systems, to explain adaptive runtime choices
- in balanced systems, to govern the boundary between exact rules and interpretation
- in deterministic-heavy systems, to justify exceptions, overrides, and policy decisions around the core

---

## The Anti-Pattern

![The Anti-Pattern](/images/blog/6-anti-pattern.png)

The architecture I worry about most looks like this:

```text
Fat Core + Fat Orchestration + Weak Contracts + No Provenance
```

This is the worst of all worlds.

The core is still bloated.  
The orchestration layer is also bloated.  
Business logic is duplicated across prompts, services, and hidden routing rules.  
Contracts are weak.  
No one can clearly explain why one path was chosen instead of another.

This is not future-proof architecture.

It is architectural debt with AI acceleration.

And I suspect many teams are drifting toward exactly this shape because they are layering orchestration onto legacy systems without deciding, explicitly, where intelligence should move and where it should not.

---

## Architectural Smell Tests

![Architectural Smell Tests](/images/blog/7-smell-tests.png)

If I had to reduce this article to a few blunt tests, they would be these:

- If replayability is mandatory, push the logic into the deterministic core.
- If the number of valid execution paths explodes with context, push behavior into orchestration.
- If the system cannot explain why it chose a path, provenance is missing.
- If prompts are silently redefining business rules, your orchestration layer is too powerful.
- If agents can mutate important state through vague interfaces, your tool contracts are too weak.
- If every exception ends up handled by humans in chat, you have not built architecture yet, only delegation theater.

These are not perfect rules.

But they are useful pressure tests when the architecture starts getting vague.

---

## Final Thought

Modern architecture is not:

> code vs agents

It is:

> where decisions live, where ambiguity is allowed, and how both are governed

That is the deeper architectural question.

Not whether agents will be used.  
They will.

But **where they should be trusted**, **where they should be constrained**, and **how their decisions become part of system memory**.

I do not think we have stable answers yet.

I think we are still in the research phase of AI-native architecture.

And that is exactly why this conversation matters now.

---

## Invitation To Collaborate

These are my current thoughts, not a finished framework.

If you are exploring similar questions, I would genuinely like to compare models, counterexamples, and failure cases.

Especially on questions like:

- Where should orchestration stop and deterministic logic begin?
- Which domains truly benefit from agent-heavy architecture?
- Which domains only look agent-friendly until something expensive breaks?
- What does good provenance look like when decisions are made at runtime?

We are still building the foundation layer of AI-era software architecture.

This is exactly the moment when collaboration matters more than certainty.
