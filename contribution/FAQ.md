# Frequently Asked Questions

*An introduction to the Provenance Manifesto and the concept of decision provenance in modern software systems.*

---

## What is the Provenance Manifesto?

The Provenance Manifesto is a proposal for how organizations should manage and preserve the decisions that shape their systems.

Modern software systems are not created only from code. They are shaped by thousands of decisions: architectural choices, trade-offs, assumptions, operational responses, and product reasoning. In most organizations these decisions are discussed in meetings or chats and gradually disappear.

The Provenance Manifesto proposes that decisions should be treated as **first-class artifacts** whose provenance — the context, reasoning, alternatives, and evolution behind them — must be preserved as part of an organization’s knowledge.

---

## What problem does the manifesto address?

The manifesto addresses a widespread problem known as **organizational context loss**.

Important decisions are usually scattered across meetings, chat threads, design documents, and pull requests. Over time the reasoning behind those decisions disappears. New engineers are forced to rediscover the same constraints, repeat the same architectural debates, and rebuild the same workarounds.

This leads to repeated rediscovery of architectural decisions, fragile institutional memory, slower onboarding, hidden system assumptions, and AI tools generating answers without the original decision context.

---

## What does “decision provenance” mean?

**Decision provenance** refers to the traceable origin, context, and evolution of a decision.

A well-preserved decision typically includes:

- the problem that needed to be solved  
- the context and constraints at the time  
- alternatives that were evaluated  
- the reasoning behind the selected approach  
- the people responsible for the decision  
- the subsequent evolution of the decision  

Decision provenance explains **why a system exists in its current form**, not only what the system currently does.

---

## How is this different from documentation?

Traditional documentation describes systems. Decision provenance explains **how and why those systems came to exist**.

Documentation typically describes the current state of a system. Because systems evolve, documentation quickly becomes outdated. Decisions, however, form the reasoning chain behind system evolution.

The Provenance Manifesto proposes that **decisions become the primary knowledge unit**, from which documentation, explanations, and AI-generated reasoning can be reconstructed.

---

## Why is this especially important in the age of AI?

Artificial intelligence systems can read code repositories, documentation, and commit history. However, these sources rarely contain the full reasoning behind design decisions.

Without decision provenance, AI systems can explain what a system does but struggle to explain why it was designed that way.

For example, AI tools may not know:

- why a specific architectural trade-off was made  
- why a constraint exists in the system  
- why a workaround was introduced  
- why an alternative approach was rejected  

When decision provenance is preserved, AI systems gain access to the reasoning layer of engineering knowledge and can assist humans with deeper explanations and analysis.

---

## Is this similar to Architecture Decision Records (ADR)?

Architecture Decision Records (ADR) are an important step toward preserving architectural reasoning. However, in many organizations ADRs remain static documents stored in repositories.

The Provenance Manifesto proposes a broader model where decisions are:

- evolving artifacts rather than static records  
- connected to other decisions and events  
- queryable organizational knowledge  
- integrated with development workflows and AI systems  

In this model, decisions form an evolving **organizational decision graph** rather than isolated documents.

---

## Who is this manifesto for?

The Provenance Manifesto is intended for people involved in designing, building, and operating complex systems.

This includes:

- software engineers  
- system architects  
- engineering leaders  
- product leaders  
- researchers working on AI-assisted development  
- organizations building knowledge-driven systems  

Anyone interested in improving how organizations preserve and evolve engineering knowledge can participate in the discussion.

---

## Is the manifesto connected to a specific tool or technology?

No. The Provenance Manifesto describes principles, not a product.

Organizations may implement these ideas using different technologies and approaches, including:

- architecture decision records  
- structured knowledge systems  
- graph-based knowledge models  
- AI-assisted development environments  
- governance frameworks for decision management  

The manifesto is intentionally technology-agnostic so the ideas can evolve across different ecosystems.

---

## How does this relate to Agile or DevOps?

Agile transformed how teams manage **work and collaboration**.

DevOps transformed how teams manage **delivery, infrastructure, and operations**.

The Provenance Manifesto focuses on how organizations manage **decisions and institutional knowledge**.

It addresses a different layer of the software lifecycle: the reasoning and context that guide architecture, product evolution, and operational behavior.

---

## Is the manifesto finished?

No. Like other manifestos in the history of software engineering, the Provenance Manifesto is intended to evolve through discussion, critique, and collaboration.

Its purpose is to start a broader conversation about how organizations should manage decision provenance and institutional memory in the age of artificial intelligence.

---

## How can I contribute?

There are several ways to contribute to the development of the Provenance Manifesto.

You can:

- discuss the ideas publicly  
- propose improvements to the manifesto  
- contribute translations  
- help refine the principles  
- share real-world experiences related to decision provenance and organizational memory  

Contribution guidelines are available in the project repository.

---

## Who started the Provenance Manifesto?

The Provenance Manifesto was initiated by **Yauheni Kurbayeu**, based on research and discussions about decision provenance, organizational memory, and AI-assisted software development.

The goal is not to create a personal project, but to start an open discussion within the engineering community about how decision knowledge should be preserved and governed.

---

## Where can I learn more?

You can explore the manifesto and its principles at:

https://provenancemanifesto.org

Additional articles and discussions explore decision provenance, institutional memory, and knowledge preservation in modern software systems.