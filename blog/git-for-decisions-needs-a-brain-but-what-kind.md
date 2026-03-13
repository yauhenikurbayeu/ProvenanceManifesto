
![Git for Decisions Needs a Brain, But What Kind?](/images/blog/git_for_decisions_needs_a_brain_but_what_kind.png)

# Git for Decisions Needs a Brain, But What Kind?

**Author:** Yauheni Kurbayeu  
**Published:** Mar 4, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/git-decisions-needs-brain-what-kind-yauheni-kurbayeu-pzc9c/?trackingId=8QfsKWcXmBSVGbckPOYlOA%3D%3D)**

Over the last few months, I’ve been building something that started as a thought experiment and slowly turned into a real system. I call it SDLC Memory. The idea behind it is simple, almost embarrassingly obvious once you say it out loud: software organizations have no memory.

We have Git for code. We have Jira for tasks. We have documentation systems full of explanations written after the fact.
But the actual reasoning behind engineering decisions almost always disappears.

A few months later, someone new joins the team, opens a repository, looks at a strange piece of architecture, and asks the inevitable question:

> “Why did we build it like this?”

The usual answer is a mix of guesses and vague recollections. Someone remembers a production incident. Someone else thinks it had something to do with scaling. A third person vaguely recalls a conversation about compliance. None of these explanations is wrong, but none of them is really reliable either.

That is where the idea of **Git for Decisions** was born.

Imagine if every important discussion, meeting note, and architectural conversation could be translated into structured artifacts. A decision node explaining what was chosen. A risk node explaining what might go wrong. An assumption node capturing what everyone believed at the time. Questions that were still unresolved. Action items that followed.

Instead of living inside Slack threads and meeting recordings, those artifacts would form a graph. Over time, the system would accumulate a living map of engineering reasoning. When a new decision appears, the system could compare it with historical ones and say something like:

> “Two months ago, the team decided to delay the EU rollout because infrastructure instability created operational risk. Today, a new decision proposes postponing the rollout again due to GDPR interpretation changes. These decisions may be related.”

The more I explored this idea, the more it started to look technically feasible. Modern LLMs are surprisingly good at extracting structured meaning from messy conversations. Graph databases are excellent at connecting entities and relationships. Vector search works well for identifying semantically similar decisions across time.

The architecture started forming naturally: ingest text, extract artifacts, resolve identities, link them to the existing graph, detect contradictions, and commit the update as a new transaction.

But then I ran into a problem I did not expect.

The real challenge wasn’t extracting knowledge.

The real challenge was deciding how the system itself should think.

There are at least three fundamentally different ways to design the runtime behavior of such a system, and each of them leads to a completely different philosophy of how AI should operate inside software engineering workflows.

## Approach 1: Runtime agentic flow (LLM-as-controller)

The first approach is what people usually call **agentic architecture**.

In this model, the system behaves almost like an investigator. The process begins when new meeting notes or architectural discussions enter the pipeline. An agent reads the text and extracts potential decisions and questions. Then it looks at the existing graph and decides which parts might be relevant.

Suppose the system reads a note saying: 

> “We should postpone the EU instance release because new GDPR clarifications introduce compliance risks.”

An agentic system might respond by exploring the graph. It could search for previous decisions related to EU infrastructure, retrieve the one about delaying rollout due to infrastructure instability, inspect related risks, and examine the timeline of decisions around that release.

At some point, the system might decide it has enough evidence and propose an update:

> “A new decision appears to conflict with a previous commitment that the EU instance must go live before Q2.”

The beauty of this approach is that the system behaves almost like a curious engineer. It follows leads, explores context, and sometimes discovers relationships that the developers themselves did not explicitly encode into the workflow.

But this flexibility comes with an uncomfortable realization. In an agentic system, the AI decides what to investigate and when to stop investigating. That may be perfectly acceptable for an assistant or a research tool, but when the system’s job is to maintain the authoritative memory of engineering decisions, unpredictability suddenly becomes a serious concern.

So the second architectural philosophy goes in the opposite direction.

## Approach 2: Python controls the flow, LLM and embedding models are just transformers

Instead of treating the model as an autonomous agent, we treat it as nothing more than a data transformer. The intelligence of the system moves into the deterministic parts of the code.

In this version, Python orchestrates the entire pipeline with strict control. When a new piece of text arrives, the runtime performs a fixed sequence of operations. First, it retrieves potential candidate nodes from the graph using vector similarity. Then it fetches their surrounding context from Neo4j. Only after the relevant evidence is assembled does the system call the language model.

At that point, the model receives a carefully prepared bundle of information and is asked a very specific question: given these artifacts and these candidate matches, decide whether they represent the same decision, a related one, or a completely new node.

The model produces structured output and nothing more. It cannot explore the graph. It cannot fetch additional information. It cannot decide to run another search. It simply transforms the given input into a structured conclusion.

From a software engineering perspective, this approach feels extremely comfortable. Every step is deterministic. Every graph query is controlled. The system behaves more like a compiler pipeline than an AI agent.

But it also raises an uncomfortable question. If we reduce the model to a pure transformer, are we underutilizing the reasoning capabilities that make these models powerful in the first place? After all, part of the promise of AI is that it can notice connections that our handcrafted rules might miss.

That leads to the third approach, which tries to balance both worlds.

## Approach 3: Hybrid pattern - Use AI as transformers, but allow Python-controlled branching based on confidence signals.

The hybrid model starts with the deterministic pipeline but allows the system to become more curious when uncertainty appears. The runtime still controls the main workflow. It still retrieves candidate nodes and constructs evidence bundles before asking the model to analyze them.

However, when the model reports low confidence or ambiguous matches, the pipeline expands its search space. The system might retrieve a larger set of candidate decisions, explore the graph neighborhood around a potentially related node, or widen the time window to include older architectural discussions.

In other words, the system remains governed by code, but it is allowed to dig deeper when the situation demands it.

A practical example might look like this. The system reads a discussion proposing to postpone an EU deployment because legal requirements have changed. The deterministic pipeline retrieves the most similar historical decisions. The model analyzes them but returns low confidence because the evidence is inconclusive.

At that point, the runtime expands the search, retrieving decisions related to both compliance and infrastructure stability, and presents the expanded context to the model again. Only then does the system determine that the new proposal actually intersects with two previous decisions that had different motivations.

This approach feels less rigid than the transformer model but far more controlled than the agentic one.

## And that is exactly where my current dilemma lives.

Every time I look at the problem through the lens of governance and auditability, the deterministic transformer pipeline seems like the responsible engineering choice. A system that manages organizational memory should be predictable, testable, and reproducible.

But every time I think about the potential intelligence of the system, the agentic architecture becomes incredibly tempting. The ability to explore context dynamically could uncover relationships in decision history that no deterministic retrieval rule would ever capture.

The hybrid model sits somewhere in the middle, but even that middle ground hides difficult trade-offs.

Which behaviors should be deterministic? Which behaviors should be adaptive? Where do we draw the line between exploration and control?

So this is the question I keep coming back to while building Git for Decisions.

If we want to create a system that remembers the reasoning behind software architecture, how much reasoning should we allow the system itself to perform?

Should it behave like an autonomous investigator, exploring the decision graph until it forms a hypothesis?

Should it behave like a disciplined compiler pipeline that processes inputs in a strictly controlled way?

Or should it attempt a careful compromise between curiosity and governance?

Right now I’m genuinely undecided.

And since many of the most interesting insights about software architecture come from collective discussion rather than solitary thinking, I’m curious how others would approach this.

If you were designing a system that becomes the long-term memory of engineering decisions, which architecture would you trust more?

