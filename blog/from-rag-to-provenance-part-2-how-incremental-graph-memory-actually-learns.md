# From RAG to Provenance (Part 2): How Incremental Graph Memory Actually Learns.

**Author:** Yauheni Kurbayeu  
**Published:** Feb 28, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/from-rag-provenance-part-2-how-incremental-graph-memory-kurbayeu-2ropf/?trackingId=kc5ApIClam%2Fx3BEz8owRvw%3D%3D)**

In the previous article, I described the moment we realized that vector search alone is not memory. Embeddings are excellent at finding “similar text.” But similarity is not lineage. It does not tell you who decided what, based on which assumption, conflicting with whom, and when that decision was superseded.

This time, I want to show what happens next.

How does a system actually update organizational memory incrementally?

## Step 1 — Scribing: Turning Text into Structured Meaning

**Business goal:** Extract explicit artifacts so they can be governed.

The system reads the text and converts it into structured objects.

## Step 2 — Build a Small Staged Graph

**Business goal:** Represent the logic inside this one note before mixing it with global memory.

From the extracted artifacts, the system builds a small temporary graph.

Logical structure created:

- Decision → depends_on → Risk
- ActionItem → mitigates → Risk
- Question → references → Decision

This graph exists only inside the current transaction. It is not yet part of the company’s permanent memory.

## Why staged graphing matters

Before anything is merged into global memory, the system needs to ask:

- Who owned the earlier “Delay EU rollout”?
- What was the reason?
- Was it temporary?
- Was it superseded?

This is where graph memory matters.

## Step 6 — Conflict Detection (Authority Matters)

Now imagine something important.

Two months ago, the CTO formally decided:

> “EU instance must go live before Q2 to support enterprise pipeline.”

Higher authority. Opposite direction.

The system detects:

- Same scope (EU instance)
- Opposing decision
- Different owner ranking

It raises:

**⚠ Conflict: Higher-ranking decision exists.**

At this point, the system does not block reality. It asks for human validation.

## Step 7 — Human Review (Trust Layer)

**Business goal:** Maintain accountability.

The reviewer sees a “Change Set”:

Creates:

- New Decision
- New ActionItem

Merges:

- Risk → existing GDPR risk

New Relationships:

- Decision depends_on Risk
- ActionItem mitigates Risk

Conflict:

- Prior CTO directive requires review

The reviewer can:

- Approve
- Modify
- Escalate
- Explicitly supersede the prior decision

If superseded, the graph records:

`Decision A → supersedes → Decision B`

## Why This Matters Beyond Architecture

Let’s step back.

In most cases:

- Decisions are scattered.
- Rationale is lost.
- Ownership shifts.
- Context disappears.
- People argue about history instead of solving the problem.

With incremental provenance updates:

- Every note becomes structured governance.
- Every dependency becomes explicit.
- Every conflict becomes visible.
- Every change is traceable.

This is not RAG.
This is not just vector similarity.

## From Retrieval to Evolution

RAG answers questions about the past. Provenance builds the past incrementally.

Each ingestion:

- Extracts meaning
- Resolves identity
- Validates authority
- Records lineage
- Strengthens or updates prior memory

Over time, the graph becomes:

- A decision history
- A risk heatmap
- A governance ledger
- A living SDLC memory

And this happens incrementally. One meeting note at a time.
