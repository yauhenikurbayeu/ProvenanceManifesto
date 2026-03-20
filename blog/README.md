
# Building an Automated Multi-Language Translation Pipeline for a Markdown Blog with GitHub Copilot Agents

Author: Yauheni Kurbayeu
Published: 20.03.2026

**TL;DR This guide explains how to automate a Markdown blog into a multilingual publishing pipeline using GitHub Copilot Agents, where an orchestrator coordinates language subagents, updates README summaries, applies hooks and skills as guardrails, and produces reproducible, scalable outputs.**

# "Where Provenance Ends, Knowledge Decays" Reflections

**Author:** Yauheni Kurbayeu  
**Published:** Mar 17, 2026  

**TL;DR Here is another strong argument on something that has been quietly breaking beneath the surface of the AI wave - the relationship between knowledge and its origin.**

# Provenance Is Not About Tools. It Is About Mindset

**Author:** Yauheni Kurbayeu  
**Published:** Mar 15, 2026  

**TL;DR Humans naturally resist sharing the reasoning behind their decisions because context and memory have historically been a source of influence and professional advantage. As a result, many critical decisions remain undocumented and live only in conversations or individual memory. In the AI-augmented era this becomes a serious governance problem, because systems evolve faster and the reasoning behind changes disappears even more quickly. Without preserved decision context, organizations lose the ability to explain, audit, or safely evolve their systems. The AI shift therefore turns decision provenance from a cultural preference into a structural requirement for organizational governance.**


# Why Decisions Must Become a First-Class Artifact

**Author:** Yauheni Kurbayeu  
**Published:** Mar 14, 2026  

**TL;DR Once decisions become first-class artifacts, something fundamentally changes. When the environment evolves, we are no longer forced to rediscover the reasoning behind the system through archaeology and speculation. Instead, we can revisit the original decision, update the assumptions that are no longer valid, and regenerate the implementation in a way that reflects the new context.**


# 2030 A Provenance-Native Company

**Author:** Yauheni Kurbayeu  
**Published:** Mar 13, 2026 

**TL;DR Let's imagine a "Provenance-native company" in 2030 - an organization built from the beginning around decision lineage, SDLC memory, and AI execution traceability rather than trying to retrofit it later.**


# Why Organizational Memory Is Not Just an AI Knowledge System.

**Author:** Yauheni Kurbayeu  
**Published:** Mar 11, 2026 

**TL;DR Following the release of the initial version of the Provenance Manifesto, I began examining whether existing market solutions align with principles outlined therein.**


# The Day the Provenance Manifesto was Born

**Author:** Yauheni Kurbayeu  
**Published:** March 8, 2026  

**TL;DR The article explores a simple but overlooked problem: software organizations rarely preserve the reasoning behind their decisions, even though those decisions shape everything they build. It argues that AI retrieval and documentation alone cannot solve this, because what’s missing is a structured system that records the relationships between decisions, assumptions, and outcomes. The Provenance Manifesto proposes treating decisions as first-class artifacts so organizations can preserve intent, accountability, and decision lineage as AI accelerates software development.** 
 

# Git for Decisions Needs a Brain, But What Kind?

**Author:** Yauheni Kurbayeu  
**Published:** Mar 4, 2026  

**TL;DR While building SDLC Memory, I ran into an unexpected architectural dilemma. Should the system reason like an autonomous agent, behave like a deterministic data transformer, or sit somewhere in between? I'm still deciding which direction is the right one for the MVP.**


# From RAG to Provenance (Part 2): How Incremental Graph Memory Actually Learns.

**Author:** Yauheni Kurbayeu  
**Published:** Feb 28, 2026  

**TL;DR In "Part 1 - From RAG to Provenance: How We Realized Vector Alone Is Not Memory", we moved from RAG to Provenance, from similarity to lineage. But if AI agents will generate 50–80% of future work, the real question becomes: How does memory update safely? How do new decisions get validated, linked, and governed, instead of just embedded? This article shows the incremental graph update process behind the decision memory step by step, with a real example. Because in the AI era, memory must evolve, not just retrieve.**


# From RAG to Provenance: How We Realized Vector Alone Is Not Memory.

**Author:** Yauheni Kurbayeu  
**Published:** Feb 22, 2026 

**TL;DR What if your SDLC doesn’t actually remember anything, and it only retrieves fragments? We’ve built powerful RAG systems that can surface “relevant” text in milliseconds. But relevance is not causality. And when something breaks in production, similarity won’t tell you why it happened, or which decision, risk, or dependency led there. In this article, I unpack why vector search alone is not memory, how graph structure changes the game, and how combining vector with a strict provenance model turns scattered documentation into something closer to organizational cognition. If you care about explainability, decision lineage, and real delivery intelligence - this one is for you.**


# Why Humans Think They Remember Everything, And Why SDLC Memory Proves They Don’t

**Author:** Yauheni Kurbayeu  
**Published:** Feb 22, 2026  

**TL;DR Chapter Next: SDLC Memory & Provenance. In the previous chapters, we explored why SDLC has no real memory and why provenance must become structural, not optional. In this next step, we go deeper into a more uncomfortable question. What if the real bottleneck in delivery isn’t velocity, tooling, or even AI capability… but the biological limits of human context. Humans can actively hold about four meaningful constraints at once. Modern agents can process hundreds of thousands of tokens. And yet, neither can remember a living product over time without structure. This chapter connects cognitive science, AI context windows, and a practical Hot/Warm/Cold memory architecture to show why durable SDLC memory is not documentation overhead; it’s a competitive advantage. If execution is getting cheaper, memory is becoming the differentiator. Let’s talk about how to build it.**


# How Should Intellectual Capital Be Assessed In The Context Of Artificial Intelligence Increasingly Replacing Human Roles?

**Author:** Yauheni Kurbayeu  
**Published:** Feb 16, 2026  

**TL;DR In the previous chapters, we spoke about SDLC Memory and Provenance as a way to reduce chaos, protect delivery integrity,and make decisions traceable inside engineering organizations. Now I want to zoom it out.Because if AI is changing how software is built, it is also changing something much bigger - how Intellectual Capital itself is valued. This article is not a deviation from the Provenance discussion. It is the next logical step. If execution becomes abundant, then memory, governance, and decision architecture become the real assets. Let’s talk about what happens to Intellectual Capital when AI materially replaces human positions, and what that means for companies that want to survive:**


# AI will take the “What”, but Humans must own the “Why”

**Author:** Yauheni Kurbayeu  
**Published:** Feb 10, 2026 

**TL;DR AI is rapidly taking over the “What” layer of software development — generating architectures, code, optimizations, and alternative solutions faster than humans ever could. As a result, implementation and solution exploration are becoming cheap, scalable, and increasingly automated. But the real strategic layer of engineering has never been the “What.” The critical questions are the “Why” — why a solution exists, why a trade-off was accepted, why a risk is tolerable, and why a particular outcome matters for the business. These questions define intent, not implementation.**


# We are teaching AI to decide. But we are forgetting how to remember.

**Author:** Yauheni Kurbayeu  
**Published:** Jan 3, 2026  

**TL;DR As AI becomes capable of proposing architectures, writing code, and optimizing systems, the real danger is not malicious AI but losing track of the human intent behind the systems we build. Organizations already struggle to remember why decisions were made; in an AI-augmented environment this problem becomes much more serious because machines can optimize solutions faster than humans can understand them. To avoid building systems that perfectly optimize the wrong goals, we need a new infrastructure layer called Provenance—a structured record of decisions, constraints, trade-offs, and intent that links system behavior back to human purpose. Without such a memory layer, organizations risk becoming highly efficient but strategically misaligned, gradually losing the ability to explain or control the systems they create.** 


# Why SDLC has no memory (and why delivery teams keep paying for it)

**Author:** Yauheni Kurbayeu  
**Published:** Jan 1, 2026  

**TL;DR Software delivery organizations repeatedly lose the context behind their decisions. Months after implementation, teams often cannot explain why something was built, what trade-offs were made, or what was originally promised. This happens because SDLC tools track artifacts like tickets, commits, hours, and costs — but not the intent, commitments, and reasoning behind them. The result is “Context Amnesia : teams rebuild solutions, repeat decisions, argue about scope, and incur rework, margin loss, and burnout. The core problem is not careless teams but a systemic gap — SDLC has no built-in memory of decision rationale. The uncomfortable question the article raises is: why, in modern software development, do we rigorously track execution but not the reasoning that shaped it?**
