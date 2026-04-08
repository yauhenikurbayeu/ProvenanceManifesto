# The Provenance Manifesto

## 10-Minute Meetup Script

**Companion file for:** `blog/provenance-manifesto-meetup-slides-10min.md`  
**Target length:** about 10 minutes  
**Suggested pace:** 40 to 65 seconds per slide

---

# Slide 1

## Opening

**Suggested time:** 45 to 60 seconds

Today I want to share an idea I’ve been exploring through the Provenance Manifesto.

The short version is this: in software, we are very good at preserving artifacts, but very bad at preserving the reasoning that created them.

That gap mattered before, but in the age of AI it becomes much more serious. As machines help us produce more code, more plans, and more decisions, we need a better way to preserve the intent and reasoning behind what gets built.

That is the space where the idea of decision provenance comes from.

---

# Slide 2

## About Me

**Suggested time:** 35 to 50 seconds

Before I go deeper into the idea, let me briefly introduce myself.

My name is Yauheni Kurbayeu. I’m a software engineering leader, and over the years I’ve spent a lot of time building and operating complex systems and managing large engineering teams.

I’ve worked across enterprise platforms, large-scale SaaS products, and distributed engineering organizations.

Over time, I became increasingly interested not only in how systems are built, but in how the decisions behind those systems are made, preserved, and evolved.

Provenance is really an exploration of that question.

---

# Slide 3

## The Problem

**Suggested time:** 55 to 70 seconds

If we look at how software organizations work today, we preserve almost everything around delivery.

We preserve code, tickets, deployments, infrastructure, and documentation.

But the most important thing often disappears: why a decision was made in the first place.

What trade-off did we accept? What assumption was true at the time? Who made the call? What alternatives were rejected?

Months later, the artifact is still there, but the reasoning is gone.

So we inherit systems without inheriting the logic that shaped them.

That is the core problem: we keep the artifact, but we lose the reasoning.

---

# Slide 4

## Why Now

**Suggested time:** 55 to 70 seconds

For a long time, this was mostly a delivery problem.

Teams lost context, repeated discussions, rebuilt the same workarounds, and spent time rediscovering past decisions. Painful, but familiar.

AI changes the stakes.

AI is making the "what" cheaper. It can generate code, plans, architectures, and polished outputs much faster than before.

So the "why" becomes more valuable.

Intent, constraints, accountability, and decision ownership become the scarce part.

That is why I often phrase it this way: AI accelerates execution, but provenance preserves accountability.

---

# Slide 5

## The Core Idea

**Suggested time:** 60 to 75 seconds

The central idea is simple: decisions should become first-class artifacts.

Today, decisions usually live as side effects of conversations. They appear in meetings, chats, design reviews, and maybe later in documentation, but rarely as durable, structured knowledge.

A meaningful decision should preserve more than the final statement.

It should preserve the problem, the context, the assumptions, the alternatives, the reasoning, the owner, and how that decision evolves over time.

So decision provenance is really about making the "why" of the system durable, not just the "what."

It explains why the system exists in its current form.

---

# Slide 6

## What Provenance Changes

**Suggested time:** 55 to 70 seconds

Once you start treating decisions this way, a deeper shift happens.

You move from undocumented intuition to traceable decisions.
From private memory to institutional memory.
From hidden assumptions to transparent reasoning.
From static documentation to evolving decision history.

And importantly, you move from uncontrolled automation to governed collaboration between humans and AI.

That last part matters a lot to me.

Provenance is not just a nicer way to write docs. It is a memory layer for reasoning. It gives organizations a way to preserve how conclusions were formed, not just what the conclusion was.

---

# Slide 7

## The Principles

**Suggested time:** 90 to 120 seconds

The manifesto turns this idea into a small set of principles.

First, decisions are first-class artifacts. Every architecture, product behavior, operational process, and incident response originates from decisions. Organizations should treat decisions with the same rigor as source code.

Second, decisions must carry context. A decision without its assumptions, alternatives, risks, and reasoning is incomplete. Context transforms a decision from a statement into knowledge.

Third, decisions evolve but are never erased. Decisions may be revised, superseded, or branched, but their history must remain preserved. Organizational intelligence grows through the evolution of reasoning, not through rewriting history.

Fourth, decisions must be queryable. Organizations should be able to ask why a system was designed this way, what assumptions justified it, and which risks were accepted. Institutional memory must be structured so those answers can be retrieved instantly.

Fifth, decisions must be attributable. Every meaningful decision must have ownership. Accountability enables trust, governance, and responsible change.

Sixth, AI must operate within decision governance. Artificial intelligence can generate code, architecture, and solutions, but it must operate within a traceable decision framework where reasoning, assumptions, and approvals remain visible. AI accelerates execution. Provenance preserves accountability.

And seventh, institutional memory is a strategic asset. Organizations that preserve the reasoning behind their systems move faster, avoid repeating mistakes, and make better decisions.

The short summary is this: memory compounds. For modern organizations, decision provenance becomes intellectual capital.

---

# Slide 8

## The Value

**Suggested time:** 55 to 70 seconds

So what value does this create in practice?

It reduces rework and repeated rediscovery.
It helps people onboard faster.
It makes architectural change safer because you can revisit the original reasoning instead of guessing.
It exposes hidden assumptions earlier.
It also improves incident reviews, audits, and compliance discussions because you can trace not only what happened, but why certain paths were chosen.

And in an AI context, it gives models access to the reasoning layer, not only the artifact layer.

The more AI generates, the more important this becomes.

---

# Slide 9

## What This Looks Like In Practice

**Suggested time:** 60 to 75 seconds

This does not require waiting for a perfect platform.

A practical starting point is to preserve the decisions that already carry the most risk or long-term impact: architecture trade-offs, scope decisions, incident responses, policy boundaries, and AI-assisted implementation plans.

For each important decision, capture a few essentials:

Why was it made?
What alternatives were considered?
What assumptions and risks existed at the time?
Who owned it?
And how did it change later?

The exact format can vary.

The important change is not the tool. It is the intention to preserve reasoning in a reusable way.

---

# Slide 10

## The Real Shift

**Suggested time:** 50 to 65 seconds

This is why I see provenance primarily as a cultural shift, not a tooling project.

The hardest part is not building a schema or choosing a storage model.

The hardest part is accepting that important reasoning should not disappear into conversations, and that critical context should not remain private inside the heads of a few people.

It also means AI should not operate outside visible governance.

So when I say provenance is not primarily about tools, what I mean is this:

It is really about how organizations remember, share responsibility, and preserve intent over time.

---

# Slide 11

## Closing And Discussion

**Suggested time:** 60 to 75 seconds

I’ll close with the distinction that matters most to me.

The real divide is not human-written versus AI-generated.

The real divide is opaque outputs versus traceable reasoning.

If we cannot reconstruct how a conclusion was formed, then even a polished output is still just a well-presented guess.

So the question I want to leave with is not whether AI will write more of our systems. It clearly will.

The real question is whether we will build organizations that can still explain themselves when that happens.

And that opens the discussion:

Where does your organization lose decision context today?
Which decisions are most worth preserving?
And how should AI participate in governed organizational memory?
