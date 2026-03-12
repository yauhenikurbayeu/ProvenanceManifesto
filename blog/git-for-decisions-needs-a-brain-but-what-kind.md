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

That is where the idea of Git for Decisions was born.
Imagine if every important discussion, meeting note, and architectural conversation could be translated into structured artifacts. A decision node explaining what was chosen. A risk node explaining what might go wrong. An assumption node capturing what everyone believed at the time. Questions that were still unresolved. Action items that followed.

Instead of living inside Slack threads and meeting recordings, those artifacts would form a graph. Over time, the system would accumulate a living map of engineering reasoning.

## Approach 1: Runtime agentic flow (LLM-as-controller)

The first approach is what people usually call agentic architecture.

In this model, the system behaves almost like an investigator. It follows leads, explores context, and sometimes discovers relationships that the developers themselves did not explicitly encode into the workflow.

But this flexibility comes with an uncomfortable realization. In an agentic system, the AI decides what to investigate and when to stop investigating. That may be perfectly acceptable for an assistant or a research tool, but when the system’s job is to maintain the authoritative memory of engineering decisions, unpredictability suddenly becomes a serious concern.

## Approach 2: Python controls the flow, LLM and embedding models are just transformers

Instead of treating the model as an autonomous agent, we treat it as nothing more than a data transformer. The intelligence of the system moves into the deterministic parts of the code.

In this version, Python orchestrates the entire pipeline with strict control. When a new piece of text arrives, the runtime performs a fixed sequence of operations. First, it retrieves potential candidate nodes from the graph using vector similarity. Then it fetches their surrounding context from Neo4j. Only after the relevant evidence is assembled does the system call the language model.

At that point, the model receives a carefully prepared bundle of information and is asked a very specific question: given these artifacts and these candidate matches, decide whether they represent the same decision, a related one, or a completely new node.

The model produces structured output and nothing more. It cannot explore the graph. It cannot fetch additional information. It cannot decide to run another search. It simply transforms the given input into a structured conclusion.

## Approach 3: Hybrid pattern

The hybrid model sits somewhere in the middle, balancing controlled flow with selective expansion when uncertainty appears.

Every time I look at the problem through the lens of governance and auditability, the deterministic transformer pipeline seems like the responsible engineering choice.
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


