![The day the Provenance Manifesto was Born](/images/blog/the_day_the_provenance_manifesto_was_born.jpeg)


# The Day the Provenance Manifesto was Born.

**Author:** Yauheni Kurbayeu  
**Published:** March 8, 2026  
**[LinkedIn](https://www.linkedin.com/posts/yauhenikurbayeu_over-the-past-months-i-have-been-exploring-activity-7436171607305318401-Vj3D?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAvr38Bav3RGiyv777cbZGFw7M1kSDr-dU)** 


Over the past months, I have been exploring a question that initially
appeared technical but gradually became much broader.

**Why does software development have almost no memory of its own
decisions?**

This question led to a series of articles in which I examined the
problem from several angles.

First, I looked at the illusion that humans remember everything about
the systems they build. In reality, teams change, architects move on,
and the reasoning behind systems quietly disappears while the systems
themselves remain.

Then I explored whether modern AI retrieval approaches could help
preserve that reasoning. Vector search and RAG looked promising at
first, but the deeper the analysis went, the clearer it became that
similarity search alone cannot reconstruct the chain of assumptions,
risks, constraints, and trade-offs behind real engineering decisions.

That realization led to the idea of **incremental graph-based provenance
memory**, a way to preserve not just documents, but the relationships
between decisions and the context that produced them.

At some point, the discussion stopped being purely technical.

The real issue turned out to be something deeper: **software engineering
has never treated decisions as first-class artifacts.**

We version code, store commits, and reproduce builds.\
But the reasoning that shapes systems disappears almost immediately.

As AI accelerates how fast software can be produced, this gap becomes
even more dangerous.

Which is why today I'm publishing the **Provenance Manifesto**.

-   AI can accelerate execution dramatically.
-   Provenance preserves accountability.

## A few additional thoughts behind the manifesto

During this research, it became clear that the real challenge is not
documentation or knowledge retrieval. The challenge is that software
engineering has never established a **system of record for decisions**.

Every architecture, product behavior, operational process, and incident
response originates from decisions. Yet those decisions rarely survive
longer than the teams that made them.

Organizations inherit systems, but not the reasoning behind them.

The **Provenance Manifesto** proposes a simple shift:

-   Decisions should carry context.
-   They should evolve but never disappear.
-   They should be queryable.
-   They should have ownership.

And as AI becomes an active participant in development, it should
operate within a **transparent framework of decision governance**.

Publishing the manifesto is **not the conclusion of the research**.

In many ways, **it is the beginning**.

If this topic resonates with you, whether you work on architecture,
knowledge systems, AI tooling, or engineering leadership, I would
genuinely value your perspective.

------------------------------------------------------------------------

### Contribute

Your contribution is greatly appreciated:

https://github.com/yauhenikurbayeu/ProvenanceManifesto/blob/main/README.md
