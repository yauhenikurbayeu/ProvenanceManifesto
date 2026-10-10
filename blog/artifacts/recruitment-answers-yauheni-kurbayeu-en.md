# Recruitment Answers — Yauheni Kurbayeu

## 1. Ownership of end-to-end solution architecture

### Original question

Describe a commercial project where you were personally responsible for the architecture of an end-to-end solution.

We want to understand whether you owned the overall design and the relationships between components, rather than just one component or an individual change.

Briefly explain:

- What problem did the solution address, and what did it include?
- Which architectural decisions and trade-offs were within your responsibility?
- How did you take the solution from design to implementation?

### Answer

One of the clearest examples is the launch of a dedicated European instance of PandaDoc: a six-month cross-functional program for customers with EU data-residency requirements.

As Delivery Director / Technical Program Manager, I was responsible for the coherence of the overall solution and its delivery. My scope covered regional infrastructure, application changes for multi-region operation, third-party integrations and subprocessors, the release process, and customer migration. I maintained the overall solution design, dependencies across workstreams, and alignment with business requirements. We developed the detailed technical architecture together with engineering and infrastructure leads.

My responsibilities included assessing integrations against data-residency requirements, comparing solution options by implementation effort and infrastructure cost, and prioritizing regional capabilities and feature parity. The key trade-offs involved data requirements, feature completeness at launch, operating costs, and time to market. Establishing the EU release process and defining customer migration protocols were also part of my scope.

I took the initiative from requirements and option assessment through roadmap development, implementation coordination, infrastructure deployment, and launch. I managed cross-team dependencies, risks, migration preparation, and readiness across technical and business teams. The result was the launch of a dedicated EU instance. My ownership meant accountability for the solution as a whole and taking it through to launch in partnership with technical leads.

**Additional architectural experience in my own projects — SDLC Memory / Git for Decisions.** I designed the architecture of a system that preserves the rationale behind engineering decisions and the relationships between decisions, risks, actions, and systems. The outputs of this work are described in a series of articles: a model of canonical entities and directed relationships, a Postgres storage schema, semantic search through pgvector combined with graph traversal in Neo4j, and processes for data ingestion and assembling evidence-based context for an LLM. In this architecture, vector search identifies starting points, while the graph reconstructs dependencies, sources, and the history of decision revisions. Context retrieval is constrained by traversal depth, relationship types, and tenant boundaries.

I also designed incremental updates to shared memory: extracting artifacts from text, staging a graph of changes, matching against existing entities, deciding whether to merge or create a node, detecting conflicts, conducting human review, and atomically applying approved changes. The key trade-offs are eliminating duplicates without losing distinctions between decisions, preserving history through supersession relationships, and balancing AI autonomy with process verifiability. For the runtime, I compared three options: agent-controlled execution, a fixed Python process with the LLM acting as a data transformer, and a hybrid with controlled search expansion under uncertainty. The result was a detailed data and process architecture with explicit alternatives and control points; the final runtime choice remains open in these articles. This personal architectural project complements my commercial experience, while the implemented DecisionLog agent prototype separately tests the mechanisms for capturing and reusing decisions.

**In my personal DecisionLog R&D project, I took the decision-memory architecture through to a tested agent prototype.** The problem was that a single agent was reasoning, executing the task, and maintaining the log simultaneously: even a substantive answer could omit individual decisions or required record fields. After a series of experiments, I split the system into the `main-provenance` coordinator, the `user-task-executor` worker, and the `provenance-log` logger. The coordinator evaluates the applicability of past decisions through `gut-feeling`, the worker handles the current task, and the logger preserves each significant decision separately and checks the schema. Between decision-making and persistence, `decision-logging-threshold` filters decisions by impact, reversibility, uncertainty, trade-off intensity, and the longevity of their consequences.

My architectural trade-offs here were memory completeness versus excessive logging, experience reuse versus reinforcing outdated assumptions, and agent specialization versus the complexity of auditing delegation. I conducted four research iterations, progressing from comparisons of individual models and runs without and with history to testing the separation of roles. In the fourth iteration, all nine significant decisions were saved as separate records with the complete required schema, while the control text-editing task produced no record. However, the saved artifacts still lack decision-author and logger fields and a delegation manifest: output quality is supported by the evidence, but each subagent's contribution cannot be independently reconstructed. This is a personal R&D result that complements the commercial example above.

The Decision Provenance roadmap identifies adding run and session identifiers, decision and record authors, and an agent handoff manifest as the next architectural priority. A shared `run_id` should link the entire chain, from task intake and consultation of past decisions through execution and result persistence. This sequence was chosen because identifying participants and runs provides the foundation for subsequent activity observation, validation checks, and stakeholder reporting. This is the next design stage; its implementation in the current prototype has not yet been confirmed.

**Another implemented personal project is an automated translation and publishing pipeline for a Markdown blog.** I defined the target process: one English article as input, metadata extraction, TL;DR generation, translation into five languages, updates to the main and localized READMEs, verification, and a final report. I designed the division of responsibilities between the orchestrator, language agents, a reusable skill, and Python hooks. With GPT's help, I prepared agent configurations, skills, and hooks and turned them into a working repository process. The concrete outputs are version-controlled configurations and scripts, translated materials, and execution reports; the article describing the pipeline architecture was itself translated using this pipeline. The architectural priorities were reproducibility, change traceability, and the ability to add languages without redesigning the entire process.

## 2. An integrated AI workflow across the SDLC

### Original question

Have you designed and implemented an AI-enabled or spec-driven workflow that covered multiple SDLC stages?

For example, specification, development, review, testing, documentation, and release.

If so, briefly explain:

- Which stages, tools, agents, and workflows did you connect?
- How did you introduce the workflow into teams or projects?
- How did you track adoption and effectiveness? Which metrics did you use?

### Answer

Yes. My most concrete implemented examples are my own Provenance Manifesto and DecisionLog projects. In them, I connected several stages of work into reproducible AI-enabled processes. The scope of this experience is project-level implementation; I am not claiming an enterprise rollout of an end-to-end AI SDLC across multiple teams.

**In Provenance Manifesto**, I built a GitHub Copilot workflow connecting written requirements and agent contracts, content preparation and localization, output verification, documentation updates, and website builds. An orchestrator coordinates five language agents; skills define the repeatable procedure, while structured inputs and JSON results govern task handoffs. Only the orchestrator modifies the shared manifest, allowing translations to run in parallel without competing updates to shared metadata. Hooks provide logging and restrictions on editing operations, while the orchestrator verifies artifact consistency and a successful Astro build. Once changes reach the main branch, GitHub Actions builds and deploys the website.

**In DecisionLog**, I connected analysis of a product or release task, retrieval of previous decisions, evaluation of alternatives, execution, output verification, and preservation of the rationale for use in the next task. A past decision serves as context that can be reused, refined, or overturned when constraints change. An important detail of the experiment is that the user request asked for a final answer, but not for a separate log entry: the system had to recognize and record a significant decision on its own.

Implementation in my own projects relied on version-controlled instructions, reusable skills, agent contracts, and repeatable test scenarios. For publishing, I tracked task completion, errors, validation results, and build success. For DecisionLog, I conducted four research iterations. The first three compared Claude Opus 4.6, Claude Sonnet 4.6, Gemini 3.1 Pro, and GPT-5.4, including runs without and with decision history. The fourth tested a configuration with separate roles: Opus as coordinator, Sonnet as worker, and GPT as logger. This evaluates the system as a whole; the saved records do not establish each model's individual contribution.

**Measured results from the fourth iteration:** six scenarios covered prioritization, stale history, conflicting prior decisions, multiple decisions within one task, a release involving escalation, and a control text-editing task. The log captured 9 out of 9 significant decisions, each as a separate record with the complete required schema; the control scenario produced 0 unnecessary records. In all six result files, the timestamp was consistent with the date. Checks also examined whether changed constraints caused prior choices to be revised and whether conflicting precedents were assessed for applicability. These are results from a specific scenario suite, not an estimate of production reliability. Earlier iterations exposed history leakage into a supposedly cold run, unequal available context, and schema violations; further testing requires history isolation and a recorded run order.

**For delivery and project management, I prepared a separate R&D proposal** extending this approach across several SDLC stages: identifying requirements ambiguities, controlling scope changes, forecasting cross-team dependencies, assessing release readiness, and subsequently validating decisions against actual outcomes. For example, a release-readiness agent should combine independent assessments of quality, plan execution, operational risks, and customer impact, then recommend release, phased rollout, or postponement with explicit approval conditions. These specialized automations are described as a development plan for the existing agent foundation; team-level implementation is still ahead.

The roadmap also includes delivering results into teams' working tools: publishing summaries of critical decisions in Confluence, creating Jira tasks when escalation is required, and issuing reminders to review decisions against actual outcomes. Three views are planned for each record: a brief operational view, a complete audit view, and a view accessible to business stakeholders. This should make decision rationale available to participants and connect it to subsequent actions; the automated triggers and these views are still planned.

For the first pilot, I propose **Scope Decision Governor**: a 4–6-week trial in one product area to test whether explicitly recording assumptions helps prevent late requirements revisions. The agent should identify specification gaps, compare options, and state risks, an owner, and a deadline for the PM's decision review. Phase-one criteria are at least 10 significant decisions with schema completeness above 90%, at least 3 decisions validated or revised based on outcomes, faster reconstruction of decision rationale, and no material increase in meeting overhead.

Team-level adoption and productivity baselines have not yet been established. To assess adoption, I have included the proportion of eligible tasks using the workflow and the coverage of SDLC stages. To assess impact, I would track completion and blocked time, PR age, forecast accuracy, work carried over, escaped defects, rollbacks, rework effort, and effort spent reconstructing decision context. The comparison model uses comparable periods before and after implementation: 6–8 sprints, a quarter, or 10 releases, with a control team where possible. Numerical targets in the proposal, such as a 25–40% reduction in late scope changes, are hypotheses to test, not savings already achieved.

## 3. SDD experience and current AI focus

### Original question

Which Spec-Driven Development approaches have you used on real projects, and which AI technologies or agents are you currently exploring?

### Answer

In commercial projects, I translated business and compliance requirements into solution designs, implementation scope, and release and migration criteria. For example, during the PandaDoc EU instance launch, data-residency requirements shaped the infrastructure, permitted integrations, and launch preparation. I describe this experience as specification-led engineering and delivery; I am not claiming a formal AI-native SDD implementation in that project.

My most concrete application of spec-driven practices to AI is in my own projects. Before execution, I define version-controlled agent roles, input and output contracts, constraints, acceptance criteria, and test scenarios. In the publishing process, the specification defines what each agent returns, who modifies shared metadata, how partial failures are handled, and which checks are mandatory. DecisionLog similarly defines the decision-record schema, persistence rules, and expected behavior in positive and negative scenarios. The specification becomes the basis for both execution and output verification.

In DecisionLog, I test not only the substance of an answer but also compliance with the specification: one significant decision per record, required context, alternatives, and risk fields, explicit revision of an outdated precedent, and no record when the task contains no decision. The experiments showed that a good answer can still violate the logging contract, so I assess reasoning quality and schema compliance separately. The next step is to align the schema across skills and validators, persist the `threshold_check` result, and add run and session identifiers, decision and record authorship, and a delegation manifest.

Further research includes three concrete tasks. The first is to distinguish what an agent reports about its work from what tools actually record: files read, decisions retrieved, subagent calls, and artifacts created. This will make it possible to verify compliance with experimental conditions, including the absence of history access during a cold run. The second is to move from warnings about deviations to enforceable checks: blocking multiple decisions from being bundled into one record, requiring mandatory fields, and routing critical deviations to human review. This requires measuring false positives and providing a justified override mechanism. The third is to formalize the conditions and time limits for reusing past decisions through `applicability_conditions`, `do_not_reuse_when`, and `review_by`, so an agent checks whether a precedent is still applicable before using it. These mechanisms are included in the roadmap and require implementation and validation.

My current focus is governed agentic workflows: GitHub Copilot agents, reusable skills and hooks, assigning roles to Claude and GPT models, context management, and agent behavior evaluation. A separate direction is persistent decision memory. In the SDLC Memory article series, I have already developed a hybrid retrieval architecture using pgvector and Neo4j, together with an incremental graph-update process involving entity identity resolution, source attribution, and human review of conflicts. I am exploring further development of these approaches and their application to the file-based DecisionLog prototype. I am interested in how an agent determines whether a past decision applies, recognizes changed constraints, and revises its choice with a clear rationale, as well as which parts of the process should be controlled by code and where adaptive context retrieval adds value.

Another output of my research is the model for balancing a deterministic core with agentic orchestration described in Modern Software Architecture in the Age of Agents. I compared three options: a thin core with strong orchestration, a balanced architecture, and a strong core with a limited role for agents. The selection criteria are task ambiguity, the cost of error, reversibility, and audit requirements. In this model, I distinguish decision-making, permissions and approvals, tool contracts, execution, and memory. This helps define explicitly where an agent may interpret a task and where business rules and state transitions must be controlled by code, while avoiding duplicated logic across prompts and services. This is an architectural model for analysis and design; I am not claiming production implementations of all three options.

A separate current focus is agentic automation for Delivery / Project Managers. The proposal describes eight areas: managing requirements ambiguity, release-readiness recommendations, forecasting dependencies and blockers, detecting divergence between implementation and acceptance criteria, a stakeholder decision log, early identification of sprint and milestone risks, validating decisions through retrospectives, and portfolio reprioritization. The development sequence starts with scope and release decisions and preservation of their rationale, followed by delivery forecasting, and then retrospectives and strategic planning once sufficient history has accumulated.

For these automations, I have designed a shared task-handoff contract, normalization of data from issues, PRs, CI, and incidents, metric calculation rules, and conditions for handing a decision over to the accountable person. Hooks should validate inputs and record failures and source references, while PM/DM authority and approval rules remain an explicit part of the process. For example, the absence of an offline requirement in a specification should become a testable assumption with alternatives and a deadline for a PM decision. After release, the actual outcome should validate or revise that decision in shared memory. This is personal R&D at the proposal and pilot-design stage.

I am also developing an AI Factory concept linking SDLC stages, roles, agents, skills, artifacts, and human approval points through Jira and Git workflows. This is a design direction, not a completed enterprise platform.

As the author of the Provenance Manifesto, I pay particular attention to the joint evolution of specifications and decisions: AI-assisted implementation should remain traceable to human intent, constraints, and accepted trade-offs.

---

## Reference materials

- [Decision Provenance development roadmap](/blog/artifacts/provenance-evolution) — for questions 1–3: run and participant traceability, activity observation, enforceable checks, Jira/Confluence, and decision applicability conditions; status: development plan.
- [DecisionLog experiment analysis](/blog/artifacts/DESISION_LOGGING_RESULTS_ANANLYSIS) — for questions 1–3: architectural iterations, validation results, use of decision history, and audit limitations.
- [Delivery / Project Management agentic automation proposal](/blog/artifacts/DELIVERY_PROJECT_MANAGER_AGENTIC_AUTOMATIONS_PROPOSAL) — for questions 2–3: SDLC scenarios, pilot plan, metrics, and further R&D directions.

- [From RAG to Provenance: hybrid memory architecture, data model, and retrieval](/blog/from-rag-to-provenance-how-we-realized-vector-alone-is-not-memory).
- [From RAG to Provenance, Part 2: incremental graph updates and change review](/blog/from-rag-to-provenance-part-2-how-Incremental-graph-memory-actually-learns).
- [Git for Decisions: comparison of agentic, deterministic, and hybrid runtimes](/blog/git-for-decisions-needs-a-brain-but-what-kind).
- [Modern Software Architecture in the Age of Agents: architecture selection criteria and agent autonomy boundaries](/blog/modern-agentic-architecture).
- [Designing and implementing an automated translation pipeline with GitHub Copilot](/blog/building-an-automated-translation-pipeline-for-a-markdown-blog-with-github-copilot).
- [Analysis of the implemented publishing workflow](/blog/how-the-current-github-copilot-article-translation-flow-works-in-this-repository).
- [Protocol for exchanging context and results between agents](/blog/agent-context-and-exchange-protocol-how-to).
- [DecisionLog: prototype, role separation, and evaluation scenarios](/blog/decision-provenance-proof).
- [Decision persistence criteria and validation results](/blog/decision-provenance-threshold).
- [AI adoption assessment model for the SDLC](/blog/artifacts/ai-adoption-maturity-model).
- [The Provenance Manifesto](https://provenancemanifesto.org/).
