![Your Gut Feeling Is Not Magic. It Is Compressed Decision Provenance](/images/blog/gut-feeling-decision-provenance.png)

# Your Gut Feeling Is Not Magic. It Is Compressed Decision Provenance.

**Author:** Yauheni Kurbayeu  
**Published:** Mar 26, 2026

## TL;DR

What teams call intuition is usually not mystical talent. It is a human ability to reconstruct likely outcomes from previously seen decisions, assumptions, constraints, rejected alternatives, incidents, and trade-offs. In other words, gut feeling is a lossy local cache of **decision provenance**.

Modern AI systems can retrieve documents, code, and tickets. But they rarely preserve the reasoning layer behind them. That is why RAG often retrieves relevant fragments yet still fails to explain why a system exists in its current form.

If we want intuition to become shareable, auditable, and usable by both humans and AI, we need to treat **decisions as first-class artifacts** and preserve their provenance as a queryable graph of reasoning.

## The Familiar Engineering Scene

Every senior engineer knows this moment.

A pull request looks fine on the surface. Tests are green. Static analysis passes. The code is clean enough.

And then someone says:

> "Something feels off here."

That sentence is often treated as instinct, talent, or seniority magic.

But from a technical point of view, something more precise is happening.

The engineer is not reacting to syntax. They are reacting to a compressed pattern of prior reasoning:

- a similar architectural shortcut that later caused a production incident
- a dependency that previously introduced operational fragility
- a constraint that was valid in one context but dangerous in another
- a trade-off that looked harmless during implementation and expensive during maintenance

What appears as intuition is usually **historical decision context being reconstructed under time pressure**.

## What Gut Feeling Actually Contains

The Provenance Manifesto argues that systems are shaped not mainly by documents, but by **decisions**.

That is the important shift.

A human gut feeling is not random emotional noise. It is a fast, imperfect reconstruction of decision lineage:

- what was decided
- why it was decided
- which assumptions were active
- which alternatives were rejected
- which risks were accepted
- which incidents later validated or invalidated the reasoning
- how the decision evolved over time

That is exactly what the site calls **decision provenance**: the traceable origin, context, and evolution of a decision.

So when an experienced person says, "this feels risky," what they often mean is:

> "I have seen a neighboring decision pattern before, and the surrounding assumptions, constraints, and outcomes do not support repeating it."

The problem is that this reasoning usually lives only in biological memory.

It is useful, but it is private.
It is fast, but it is not queryable.
It is powerful, but it is hard to audit, transfer, or govern.

## Why This Breaks at Organizational Scale

Human working memory is small, and organizational memory is fragmented.

That is why teams keep rediscovering the same logic.

One engineer remembers why a fallback path was introduced. Another vaguely remembers that legal blocked a rollout in the past. A staff engineer recalls that a certain cache invalidation strategy caused a severe incident six months earlier. None of this is fully wrong, but none of it is reliably externalized either.

This creates a structural problem:

- when a person leaves, part of the reasoning leaves
- when a new team joins, decision context resets
- when AI assists with delivery, it sees artifacts but not the full causality behind them

This is why the manifesto values **traceable decisions with context over undocumented intuition** and **institutional memory over repeated rediscovery**.

The issue is not that humans lack intuition.

The issue is that organizations keep storing critical reasoning in a form that cannot compound.

## Why AI Still Misses What Humans "Sense"

This is also why many AI systems look impressive and still fail in subtle ways.

Most AI knowledge systems ingest code, tickets, notes, and documentation, then expose them through retrieval. That is useful. But technically, it is still mostly an **information layer**.

It answers questions like:

- what code exists
- where the documentation lives
- which ticket mentioned the feature
- what similar text appeared in the past

That is not the same as remembering why the system became this way.

If a retrieval pipeline finds a document saying "we split EU and US infrastructure," it can retrieve the result.
But can it answer:

- was the split driven by GDPR interpretation, latency, or team ownership?
- which alternatives were considered and rejected?
- what risk was being mitigated?
- which later decision superseded the original rationale?

That is where decision provenance becomes the missing layer.

To borrow the distinction from the other articles:

- vector retrieval gives relevance
- provenance structure gives causality

Or more bluntly:

**Similarity is not lineage.**

That is why an AI assistant can look well-informed and still fail to demonstrate the equivalent of human intuition. It can retrieve fragments, but it often cannot traverse the reasoning that connected them.

## Decision Provenance Is Externalized Intuition

If we want to make intuition operational, we should stop treating it as a mysterious personal trait and start modeling what it is made of.

From a technical standpoint, a meaningful decision artifact should carry at least:

- the problem being solved
- the context and constraints active at the time
- the assumptions the team believed
- the alternatives that were considered
- the selected option and its rationale
- the risks that were accepted or mitigated
- the owner of the decision
- the systems, services, or product areas affected
- the later incidents, measurements, or outcomes that validated or challenged it
- whether the decision was revised, superseded, or branched

In simplified form, that might look like this:

```yaml
Decision: Split EU infrastructure
Owner: Platform architecture
Context:
  Problem: Support EU customers under data residency pressure
  Constraints:
    - GDPR interpretation uncertainty
    - existing US-centric deployment model
Assumptions:
  - legal risk is likely to increase
  - separate infrastructure is operationally feasible
Alternatives:
  - keep single-region deployment
  - isolate data per workspace
Selected:
  - create dedicated EU infrastructure boundary
Accepted Risks:
  - higher deployment complexity
  - duplicated operational overhead
Affects:
  - payment-service
  - deployment-pipeline
  - customer-onboarding
Status: active
```

Now the important part: this artifact should not live alone.

It should be connected to related entities in a graph:

```text
Decision -> based_on -> Assumption
Decision -> constrained_by -> Constraint
Decision -> mitigates -> Risk
Decision -> affects -> System
Decision -> produces -> Artifact
Decision -> supersedes -> Decision
Incident -> invalidates -> Assumption
ActionItem -> mitigates -> Risk
Question -> references -> Decision
```

At that point, intuition stops being a feeling trapped inside one person and becomes **structured organizational memory**.

## Why This Is Bigger Than ADRs

Architecture Decision Records are useful, but they are often treated as isolated snapshots.

The provenance-native view is broader.

A decision is not just a document.
It is a node in an evolving causal system.

That means:

- decisions are first-class artifacts
- decisions are queryable
- decisions are attributable
- decisions evolve but are not erased

This matters because real systems do not stand still.

What felt correct in February may become dangerous in August because a regulation changed, an assumption failed, a dependency degraded, or a strategic priority moved. If we only preserve the final answer and not the reasoning path, we cannot tell whether the old decision is still justified or merely inherited.

That is the difference between static documentation and living decision provenance.

## How a Provenance System Reconstructs "Gut Feeling"

Once decision provenance is modeled explicitly, the system can do something very close to what experienced engineers do internally.

A query such as:

> "Why does this rollout design feel risky?"

can be handled in stages:

1. Use vector retrieval to find relevant decisions, incidents, risks, and discussions.
2. Identify the corresponding canonical nodes behind those fragments.
3. Expand the graph around those nodes to recover assumptions, supersession chains, affected systems, mitigations, and prior failures.
4. Assemble a context pack grounded in evidence rather than raw similarity.
5. Let the model reason only over that recovered neighborhood.

This is the crucial shift explored across the other provenance articles:

- the vector is the entry point
- the graph is the explanation
- the decision artifact is the primary knowledge unit

Now the answer stops sounding like generic pattern matching and starts sounding like grounded reasoning:

> "This rollout resembles the earlier EU split decision, but the prior justification depended on a legal assumption that has since changed. The current proposal also reintroduces an operational risk that previously caused incident X, and the earlier mitigation was never completed."

That is not mystical intuition.

That is a system traversing decision lineage.

## What Changes for Humans

This does not eliminate human intuition.

It changes its role.

Humans remain excellent at noticing weak signals, ambiguity, and emerging contradictions. But once provenance exists, they no longer need to store the entire reasoning chain privately.

Intuition becomes the trigger.
Provenance becomes the memory.

That makes the organization stronger in several ways:

- senior judgment becomes explainable instead of folkloric
- onboarding improves because new people can traverse reasoning, not just read outcomes
- AI agents operate within governed context instead of free-floating prompts
- decisions can be audited months later without relying on personal recollection

This is exactly why the manifesto emphasizes **transparent reasoning over hidden assumptions** and **governed collaboration between humans and AI over uncontrolled automation**.

## Final Thought

The real technical insight is simple.

What we call gut feeling is often a local, lossy, human implementation of decision provenance.

It works surprisingly well inside experienced people.
But it does not scale well across teams, time, or AI-assisted delivery.

Logs tell us what happened.
Metrics tell us how it performed.
Code tells us how it works.
**Decision provenance tells us why it exists this way.**

Once that layer is preserved, intuition does not disappear.

It becomes the interface, not the storage.

And that is the deeper shift behind the Provenance Manifesto:

not replacing human judgment,  
not blindly trusting AI,  
but building systems where decisions are remembered, reasoning remains visible, and organizational intelligence can actually compound over time.
