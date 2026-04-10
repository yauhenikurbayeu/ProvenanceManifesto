# The Provenance Manifesto

## Extended Meetup Script

**Companion file for:** `blog/artifacts/slides/provenancemanifesto/slides.md`  
**Target length:** about 18 to 22 minutes  
**Suggested pace:** 50 to 90 seconds per slide

---

# Slide 1

## Opening

**Suggested time:** 45 to 60 seconds

Today I want to share an idea I’ve been exploring through the Provenance Manifesto.

At its core, it starts from a simple observation: software organizations are very good at preserving outputs, but very bad at preserving the reasoning that created those outputs.

For a long time, that gap was inconvenient.

In the age of AI, I believe it becomes strategic.

As machines help us produce more code, more plans, and more decisions, the question is no longer only what we can build faster. The question is how we preserve the intent, context, and accountability behind what gets built.

That is where the idea of decision provenance comes from.

---

# Slide 2

## The Problem We Normalized

**Suggested time:** 60 to 75 seconds

If we look at modern software organizations, we preserve almost everything around delivery.

We preserve code, tickets, deployments, infrastructure, and documents.

But the most important part often disappears: why a decision was made.

Which trade-off did we accept? Which assumptions were true at the time? Which alternatives did we reject? Who actually owned the decision?

What is striking is not only that we lose this reasoning. It is that we have normalized losing it.

We accept it as part of the job. We inherit systems where the implementation survives, but the intellectual lineage behind it does not.

So the core problem is this: we preserve the result, but we lose the reasoning.

---

# Slide 3

## A Familiar Scene

**Suggested time:** 60 to 75 seconds

Most people in engineering have experienced some version of this.

Six months into a project, maybe a year, someone asks: "Why are we doing it this way?"

And then the archaeology begins.

Somebody vaguely remembers the original scope. Somebody else thinks the decision came later. Someone opens outdated documentation. And often the people who knew the full story are no longer around.

So the team does what teams usually do: they guess, they decide again, and they move on.

This is not just bad documentation hygiene. This is organizational context amnesia.

And once you see it clearly, you notice how much of software delivery is shaped by rediscovering decisions that were already made once before.

---

# Slide 4

## Why This Matters More Now

**Suggested time:** 60 to 80 seconds

For years, this was mainly a delivery problem.

Teams lost context. They repeated debates. They rebuilt workarounds. They hesitated to change systems because they were no longer sure which invisible constraints still mattered.

AI changes the stakes.

AI is making the "what" cheaper. It can generate code, plans, architectures, solution options, and polished documentation much faster than humans could before.

So the "why" becomes more valuable.

Intent, trade-offs, constraints, accountability, and decision ownership become the scarce layer.

That is why I keep coming back to this formulation: AI accelerates execution, but provenance preserves accountability.

---

# Slide 5

## The Core Idea

**Suggested time:** 65 to 85 seconds

The central idea is simple: decisions should become first-class artifacts.

Today, decisions usually exist only as side effects of conversations. They appear in meetings, chats, design reviews, pull requests, and sometimes later in documents.

But rarely do they exist as durable, structured knowledge in their own right.

A meaningful decision should preserve more than the final answer.

It should preserve the problem being solved, the context and constraints, the alternatives considered, the reasoning behind the choice, the owner of the decision, and how that decision later evolved.

So decision provenance is really about making the "why" of the system durable, not just the "what."

It explains why a system exists in its current form.

---

# Slide 6

## What Provenance Is And Is Not

**Suggested time:** 70 to 85 seconds

This distinction matters, because people often hear this idea and immediately translate it into something smaller than it is.

Provenance is not just another documentation tool.
It is not just Jira, Confluence, meeting notes, static ADR files, or a RAG layer over old documents.

Those things may still be useful, but they mostly describe artifacts or preserve fragments.

Provenance is different.

It is a memory layer for decisions.
It is a system of record for reasoning.
It is a trace from execution back to intent.
And most importantly, it preserves causality, not just text.

That is why I like to phrase it this way: documentation describes the system, but provenance explains how and why it became that system.

---

# Slide 7

## Through This Work We Have Come To Value

**Suggested time:** 60 to 80 seconds

The manifesto expresses this shift through a set of values.

We value traceable decisions with context over undocumented intuition.
Institutional memory over repeated rediscovery.
Transparent reasoning over hidden assumptions.
Evolution of decisions over static documentation.
Accountable decision ownership over anonymous outputs.
And governed collaboration between humans and AI over uncontrolled automation.

This does not mean the things on the right have no value.

It means that in the world we are entering, the things on the left become more important if we want organizations that can evolve safely and intelligently.

This is really a statement about what kind of engineering culture we need next.

---

# Slide 8

## The Principles

**Suggested time:** 90 to 110 seconds

The manifesto then turns that value shift into principles.

First, decisions are first-class artifacts. Every architecture, product behavior, operational process, and incident response originates from decisions. So organizations should treat decisions with the same rigor as source code.

Second, decisions must carry context. A decision without its assumptions, alternatives, risks, and reasoning is incomplete. Context transforms a decision from a statement into knowledge.

Third, decisions evolve but are never erased. Decisions may be revised, superseded, or branched, but their history must remain preserved. Organizational intelligence grows through the evolution of reasoning, not through rewriting history.

And fourth, decisions must be queryable. Teams should be able to ask: Why was this system designed this way? Which assumptions justified it? Which risks were accepted? Memory has to be structured so those answers can be retrieved.

So these first principles are already pushing us away from static documents and toward living, queryable memory.

---

# Slide 9

## The Principles, Continued

**Suggested time:** 80 to 100 seconds

The remaining principles complete that picture.

Fifth, decisions must be attributable. Every meaningful decision must have ownership. Accountability enables trust, governance, and responsible change.

Sixth, AI must operate within decision governance. Artificial intelligence can generate code, architecture, and solutions, but it must operate inside a traceable decision framework where reasoning, assumptions, and approvals remain visible.

And seventh, institutional memory is a strategic asset. Organizations that preserve the reasoning behind their systems move faster, avoid repeating mistakes, and make better decisions.

This is why the short summary is so important: memory compounds.

For modern organizations, decision provenance becomes intellectual capital.

---

# Slide 10

## Why This Creates Real Value

**Suggested time:** 60 to 80 seconds

So what does this create in practice?

It reduces rework and repeated rediscovery.
It shortens onboarding time.
It makes architectural change safer because teams can revisit original reasoning instead of guessing.
It exposes hidden assumptions earlier.
And it improves audits, incident reviews, and compliance discussions because you can trace not only what happened, but why certain paths were chosen.

In an AI context, it also gives models access to the reasoning layer, not just the artifact layer.

That is a very important distinction.

The shift is simple, but powerful: from private memory to institutional memory.

---

# Slide 11

## Why AI Changes The Stakes

**Suggested time:** 65 to 85 seconds

Without provenance, AI can often explain what the code does, what the docs say, or what the current system looks like.

But it usually cannot explain why a trade-off was accepted, why a workaround exists, why one option was rejected, or why a constraint still matters.

So without preserved reasoning, AI can optimize the system while the organization gradually loses the ability to explain itself.

That is where this stops being just an efficiency topic and becomes a governance topic.

And that is why I sometimes put it quite bluntly: at that point, humans do not lose their jobs first. They lose their authority over the "why."

If the machine keeps producing better "whats" and the organization can no longer reconstruct its intent, then control begins to drift.

---

# Slide 12

## What A Provenance Layer Captures

**Suggested time:** 60 to 80 seconds

So what would a provenance layer actually contain?

A real provenance model can preserve and connect decisions, assumptions, risks, questions, actions, evidence, ownership, affected systems and artifacts, and superseded or related decisions.

That list matters because it shows that provenance is not only about capturing a sentence that says, "we decided X."

It is about capturing the structure around that decision.

Over time, this becomes a graph of reasoning that evolves with the system, not a pile of disconnected documents.

That shift from isolated notes to connected reasoning is what makes provenance much more powerful than traditional documentation.

---

# Slide 13

## How Teams Can Start

**Suggested time:** 70 to 90 seconds

The good news is that teams do not need to wait for a perfect platform to begin.

The practical starting point is to preserve major decisions where AI or complexity already creates the most risk.

That usually means architecture trade-offs, product and scope decisions, operational responses, incident-related decisions, and AI-assisted implementation plans.

And then follow a simple discipline.

Capture the decision.
Capture its context, assumptions, risks, and alternatives.
Assign ownership.
Preserve the history when the decision changes.
And make it queryable later.

The exact format can vary. Markdown, ADR-like records, structured notes, graphs, or other systems can all play a role.

The important change is not the format. It is the intent to preserve reasoning in a reusable way.

---

# Slide 14

## This Is Not Really About Tools

**Suggested time:** 60 to 80 seconds

And that brings us to what may be the hardest part.

The hardest change here is cultural, not technical.

Provenance is a mindset shift.

It asks organizations to move from hidden context to shared context, from undocumented authority to traceable ownership, from static artifacts to evolving reasoning, and from outputs without lineage to accountable decisions.

That is why I keep emphasizing that provenance is not primarily about changing tools.

It is about changing how we think about knowledge, decisions, and responsibility.

In many ways, the technical systems are the easier part. The real challenge is deciding that reasoning itself deserves to become part of the system.

---

# Slide 15

## Closing Thought

**Suggested time:** 45 to 60 seconds

I’ll close with the distinction that matters most to me.

The real divide is not human-written versus AI-generated.

The real divide is opaque outputs versus traceable reasoning.

If we cannot reconstruct how a conclusion was formed, then even the most polished output is still just a well-presented guess.

That applies to human work, AI work, and increasingly to the hybrid systems we are all building together.

---

# Slide 16

## Invitation

**Suggested time:** 50 to 70 seconds

The Provenance Manifesto is not a finished product.

It is a concept, a research direction, a practical architecture question, and really an invitation to rethink how engineering organizations preserve memory.

So I’d like to end not with a final answer, but with a few questions.

Where does your organization lose critical decision context today?
Which decisions would be most valuable to preserve?
And how should AI participate in a governed decision memory?

If this topic resonates with you, that conversation is exactly the point.

