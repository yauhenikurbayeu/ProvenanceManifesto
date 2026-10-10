# Recruitment Answers — Yauheni Kurbayeu

## 1. Ownership of end-to-end solution architecture

A strong example is the launch of PandaDoc’s dedicated EU product instance, a six-month cross-functional program supporting customers with EU data-residency requirements.

As Delivery Director / Technical Program Manager, my responsibility covered the overall solution and its delivery: regional infrastructure, application changes for multi-region operation, third-party integrations and subprocessors, release management, and customer migration. I worked with engineering and infrastructure leads on detailed technical design while owning the alignment between the solution, business requirements, cost, dependencies, and launch readiness.

My scope included assessing integrations against EU-residency requirements, evaluating solution options and their engineering and infrastructure costs, and prioritizing regional capabilities and feature parity. The main trade-offs involved compliance requirements, implementation effort, operating cost, and time to market. Establishing a separate EU release process and defining migration protocols were also part of my responsibility.

I carried the initiative from requirements and solution assessment into a delivery roadmap, coordinated implementation and infrastructure deployment, and managed dependencies, risks, migration preparation, and launch activities across technical and business teams.

This was end-to-end solution leadership in partnership with technical leads, rather than sole authorship of every component’s detailed architecture.

## 2. An integrated AI-enabled workflow across SDLC stages

Yes—my clearest implemented examples are in my own Provenance Manifesto and DecisionLog projects. They demonstrate working multi-stage AI workflows, although I would distinguish their scope from an enterprise-wide SDLC rollout.

For provenancemanifesto.org, I built a GitHub Copilot workflow connecting written requirements and agent contracts, content generation, localization, validation, documentation updates, and website delivery. An orchestrator coordinates five language-specific agents. Reusable skills define the process, structured output contracts govern handoffs, and hooks provide guardrails and logging. The orchestrator verifies generated files and publication metadata and requires a successful Astro build. GitHub Actions handles deployment after changes reach the main branch.

In DecisionLog, I implemented a complementary workflow with separate coordination, execution, and decision-logging agents. It retrieves prior decisions, evaluates whether they remain relevant, executes the task, and preserves significant decisions with their rationale and trade-offs.

I introduced these workflows through version-controlled instructions, reusable skills, documented entry points, and repeatable test scenarios. Evaluation covered completion, validation failures, schema compliance, decision-capture completeness, false-positive logging, and behavior with stale or conflicting prior decisions. One ten-scenario threshold run produced the six expected positive cases and no control false positives; reruns also exposed inconsistent duplicate handling.

I have not yet established team-wide adoption or productivity baselines. For a commercial rollout, I would measure eligible-workflow usage, cycle time, review effort, rework, escaped defects, and cost per accepted output.

## 3. Spec-Driven Development experience and current AI focus

My commercial experience includes translating business and compliance requirements into solution designs, implementation scope, and release and migration criteria. I would describe that as specification-led engineering and delivery; I would not retrospectively claim a formal AI-native Spec-Driven Development rollout.

My most concrete application of spec-driven practices to AI is in my own projects. I define version-controlled agent responsibilities, input/output contracts, constraints, validation rules, and test scenarios before evaluating execution. For example, the publishing workflow specifies exactly what each agent must return, who can modify shared metadata, how partial failures are handled, and which checks must pass. DecisionLog similarly defines decision-record schemas, persistence rules, and expected behavior for positive and negative test cases.

My current focus is governed agentic delivery: GitHub Copilot agents, reusable skills and hooks, role-specific use of Claude and GPT models, evaluation of agent behavior, and persistent decision memory. I am exploring hybrid vector and graph retrieval to extend the current file-based provenance prototype.

I am also developing an AI Factory orchestration concept linking SDLC phases, roles, agents, skills, artifacts, and human approval points through Jira and Git-based workflows. This remains a design direction rather than a completed enterprise platform.

As the author of the Provenance Manifesto, my central interest is making specifications and decisions evolve together, so AI-assisted implementation remains traceable to human intent, constraints, and accepted trade-offs.

## Supporting links

- [The Provenance Manifesto](https://provenancemanifesto.org/)
- [ProvenanceManifesto repository](https://github.com/yauhenikurbayeu/ProvenanceManifesto)
- [Building an Automated Translation Pipeline for a Markdown Blog with GitHub Copilot Agents](https://provenancemanifesto.org/blog/building-an-automated-translation-pipeline-for-a-markdown-blog-with-github-copilot/)
- [Article orchestrator implementation](https://github.com/yauhenikurbayeu/ProvenanceManifesto/blob/main/.github/agents/article-orchestrator.agent.md)
- [DecisionLog repository](https://github.com/yauhenikurbayeu/DecisionLog)
- [DecisionLog evaluation report](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/threshold/DECISION-LOGGING-THRESHOLD-TEST-RESULT.md)

## Preparation note — remove before submitting

Question 1 explicitly tests architectural authority. The experience described establishes broad solution and delivery ownership, but does not establish final architectural approval authority. If you held that authority, state it explicitly and support it with one specific design decision you personally approved.
