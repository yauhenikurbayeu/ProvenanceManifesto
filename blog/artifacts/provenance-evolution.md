# Decision Provenance System — Evolution Roadmap

**Author:** main-provenance (Claude Sonnet 4.6)  
**Date:** 2026-05-19  
**Status:** Active — reviewed and logged to `decision-log.md`  
**Decision trace IDs:** cd-1 · cd-2  
**Source session:** Strategic review of GitHub Copilot decision provenance AI agenting flow

---

## Purpose

This document captures all conclusions and strategic recommendations produced by the decision provenance review session of 2026-05-19. It is the human-readable companion to the two Critical decisions logged in `decision-log.md`.

It is intended for:

- **Platform / AI engineering teams** building on or extending this GitHub Copilot workspace
- **Governance / compliance leads** evaluating the system's auditability posture
- **Process excellence teams** designing AI-assisted workflows
- **CTOs / CDOs** making build-vs-extend decisions on internal AI tooling

---

## Current State Assessment

### What the system already does well

The current decision provenance stack in this workspace is architecturally sound in several important ways:

| Strength | Where it lives |
|---|---|
| Distinguishes meaningful decisions from execution noise | `decision-logging-threshold` skill — 5-dimension scoring gate |
| Supports reuse / refine / override of prior decisions | `gut-feeling` skill |
| Separates execution from strict logging | `main-provenance` → `user-task-executor` → `provenance-log` agent split |
| Preserves a no-decision path | Threshold returns `should_log: false` for noise |
| Detects post-decision drift | `drift-detection` skill — 13 detector types |
| Storage-agnostic memory layer | `decision-provenance` abstract interface + Obsidian and Neo4j backends |
| Escalation and compliance overrides | Mandatory override rules in threshold skill |
| Multi-agent orchestration foundation | `main-orchestrator` + `worker` + `critical-tradeoff-advisor` agents |
| Atlassian integration capability | `confluence-agent`, `jira-agent`, Atlassian API skill |

### Known gaps (from prior analysis)

These gaps were identified in `DECISION_LOGGING_IMPROVEMENTS.md` and validated by the `DESISION_LOGGING_RESULTS_ANANLYSIS.md` experiment results:

1. **Isolated decision records** — no visible decision pipeline (who handled what at each stage)
2. **No actor/run provenance** — `decision_made_by`, `logged_by`, `run_id`, `session_id` are absent
3. **No reuse-expiry or applicability conditions** — priors can be reused without staleness checks
4. **Only disclosed provenance** — agents self-report what they reviewed; no observed capture layer
5. **Drift is advisory-only** — `red` severity events alert but do not block execution
6. **Weak downstream tracking** — decisions don't capture what they caused after execution
7. **No trust/integrity metadata** — no hashes, schema versioning, or completeness scoring
8. **Single audience representation** — no operator / audit / user-facing view variants

---

## The Strategic Question

> **How should this system evolve to become meaningful and useful for organisations transforming their processes according to the current AI market shift?**

The AI market context driving this question:

- Rapid proliferation of AI agents embedded in real business workflows (autonomous actions, not just chat)
- Regulatory pressure: EU AI Act Articles 9, 12, 14, and 17 require documented, auditable decision trails
- Organisational anxiety: *"who decided what, under which context, and when?"*
- Multi-agent orchestration becoming the dominant architecture
- Growing gap between AI capability and organisational readiness and trust
- Need to preserve institutional knowledge as AI takes over more reasoning

---

## The 6 Critical Evolution Directions

Ordered **foundation-first**: each direction partially unlocks the next.

---

### Direction 1 — Auditable Governance Pipelines (Actor + Run Provenance)

**Urgency driver:** EU AI Act Articles 9 / 12 / 17; enterprise audit requirements  
**Effort to unlock:** Low — 5 additive YAML fields + handoff manifest write  
**Current traction:** High — coordinator already collects this data during execution

#### What's there
The coordinator already collects agent identity and session context. The schema has `decision_links` and `bounded_context`. Agent boundaries are architecturally clean.

#### What's missing
No `decision_made_by`, `logged_by`, `run_id`, `session_id`, or per-run handoff manifest. Agent boundaries are implied in the code but invisible in logged entries.

#### What needs to change

Add these 5 fields to the canonical decision record schema:

```yaml
run_id: run-<YYYY-MM-DDThh:mm>
session_id: session-<YYYY-MM-DD>-<slug>
decision_made_by: main-provenance
decision_reviewed_by: main-provenance
logged_by: provenance-log
```

Emit one **handoff manifest** per run:

```yaml
run_id: run-2026-05-19T14:27
task_received_by: main-provenance
priors_reviewed_by: main-provenance
task_executed_by: user-task-executor
decision_logged_by: provenance-log
result_artifact: <path>
decision_log_artifact: decision-log.md
```

Propagate `run_id` through all `agent` tool delegation calls.

#### Organisational value
Every decision entry becomes attributable, replayable, and cross-session comparable. Satisfies the first audit question in most AI governance frameworks. Enables blame-free debugging across multi-agent runs.

#### Risks
Field alignment across agents (especially `session_id` semantics). Low technical risk, moderate coordination effort.

---

### Direction 2 — Observed vs. Disclosed Provenance

**Urgency driver:** Trust in self-reporting; cold-start contamination risk; external audit credibility  
**Effort to unlock:** Medium — coordinator-side instrumentation additions  
**Current traction:** Medium — coordinator already verifies log writes

#### What's there
The coordinator verifies the log write. Drift detection flags bypass events when required gates are skipped. The three-agent split provides some structural separation.

#### What's missing
No automatic capture of which files were actually read, which prior decision timestamps were retrieved, whether delegation actually occurred, which artifacts were actually written. Everything relies on agent self-reporting.

#### What needs to change

Add a lightweight **observed-capture layer** in the coordinator. Record as structured metadata alongside each decision entry:

```yaml
observed_provenance:
  files_read:
    - .github/agents/main-provenance.agent.md
    - .github/skills/decision-logging-threshold/SKILL.md
  prior_decisions_retrieved:
    - dec-2026-05-19-main-provenance-evolution-directions
  delegation_occurred: true
  delegated_to: user-task-executor
  artifacts_written:
    - decision-log.md
    - provenance-evolution.md
  log_verification_passed: true
```

#### Organisational value
Transforms "trust the agent" into "verify the agent." Closes the cold-start contamination risk. Makes provenance trustworthy enough for external audit without replacing narrative reasoning.

#### Risks
Requires coordinator-side changes. Medium implementation complexity. Depends on Direction 1 (identity fields) for full traceability.

---

### Direction 3 — Active Governance Gates (Not Just Advisory Drift)

**Urgency driver:** EU AI Act Article 14 human oversight; scalable compliance at volume  
**Effort to unlock:** Medium — hooks wiring + blocking logic  
**Current traction:** Medium — mandatory overrides and drift detection exist

#### What's there
Drift detection emits typed events with severity levels (`green` / `yellow` / `red`). Mandatory overrides already force logging at compliance and escalation boundaries. The threshold gate already blocks low-signal decisions.

#### What's missing
No blocking hooks — a `red` severity drift event is surfaced to the user but does not stop execution. No policy-trigger hooks for cold-start contamination, merged decisions, or missing critical fields on high-importance entries.

#### What needs to change

Wire `severity: red` → execution block or escalation path. Add these fields to the schema:

```yaml
triggered_policies: []
validation_status: pending|passed|failed|escalated
intervention_taken: none|blocked|escalated|reviewed
escalation_required: false
escalation_reason: Not explicit
```

Implement these 4 policy checks as blocking hooks:

| Policy | Trigger condition | Action |
|---|---|---|
| `one-record-per-decision` | Multiple material decisions bundled | Block final logging, require split |
| `cold-start-contamination` | Prior log read in cold-start isolated prompt | Raise contamination flag, require override |
| `critical-decision-completeness` | `Importance: Critical` + missing alternatives or trade-offs | Fail validation, require completion |
| `escalation-review` | `drift_check.max_severity: red` | Block execution, require human review |

#### Organisational value
Shifts provenance from passive memory to active governance. Directly addresses EU AI Act Article 14 (human oversight) at scale without requiring a human to read every alert. Makes the system self-enforcing rather than self-reporting.

#### Risks
Blocking logic can create false positives. Needs careful tuning and clear override paths with justification requirements.

---

### Direction 4 — Cross-Agent Decision Accountability

**Urgency driver:** Multi-agent orchestration accountability gap; scaling beyond single-agent deployment  
**Effort to unlock:** Medium — run_id propagation contract + chain link fields  
**Current traction:** Medium — multi-agent architecture already exists

#### What's there
The three-agent split (`main-provenance` / `user-task-executor` / `provenance-log`) is clean with well-defined separation of concerns. The worker architecture supports parallel, sequential, and hierarchical execution. `decision_links` fields exist in the schema.

#### What's missing
No `run_id` propagated through the delegation chain. No `handoff_from` / `handoff_to` fields on execution summaries. No cross-agent decision chain linking when one agent's output becomes another agent's input decision.

#### What needs to change

Propagate `run_id` through all `agent` tool calls. Add to the execution summary contract:

```yaml
delegated_to: user-task-executor
handoff_from: main-provenance
handoff_to: provenance-log
```

Link cross-agent decisions via `decision_links.parent` when a downstream agent's decision is causally downstream of an upstream agent's choice.

#### Organisational value
Makes the split-agent design auditable rather than merely architectural. Enables blame-free debugging when a multi-agent run produces a wrong outcome. Critical for teams scaling from single-agent to multi-agent deployment.

#### Dependencies
Depends on Direction 1 (identity fields) being in place first — `run_id` must exist before it can be propagated.

---

### Direction 5 — Enterprise Knowledge Delivery (Atlassian Integration)

**Urgency driver:** Stakeholder visibility gap; institutional knowledge preservation  
**Effort to unlock:** Low-Medium — view generators + post-logging trigger  
**Current traction:** High — Atlassian agents and API skill already exist in this workspace

#### What's there
`confluence-agent` and `jira-agent` already exist in `.github/agents/`. The Atlassian API skill and Confluence operations skill are implemented. The decision schema has enough structured fields to drive templated output.

#### What's missing
No post-logging trigger to push decision summaries to Confluence. No Jira ticket creation from escalation-flagged decisions. No audience-specific view generators (operator / audit / user-facing). The institutional knowledge being captured is invisible to business stakeholders.

#### What needs to change

Add a **post-logging step** in the coordinator flow:

```
For decisions with Importance: Critical
  → trigger confluence-agent → write to designated Confluence space

For decisions with escalation_required: true
  → trigger jira-agent → create Jira ticket with decision context

For decisions with validation_status: pending
  → schedule review reminder (Jira or Confluence task)
```

Implement 3 audience-specific view templates:

| View | Audience | Content |
|---|---|---|
| `operator` | Daily use, process teams | Decision title, outcome, 2-line rationale, next steps |
| `audit` | Compliance, legal, external review | Full schema, boundary trace, validation metadata, drift events |
| `stakeholder` | Product, business, leadership | Natural-language explanation of what was decided and why |

#### Organisational value
Bridges the gap between AI agent memory and organisational knowledge management. Decision rationale becomes searchable in Confluence. Escalation decisions create actionable Jira tickets. Provenance becomes a business tool, not just an engineering artifact. Preserves institutional knowledge as AI takes over more reasoning.

#### Risks
Lowest technical risk (agents already exist). Main risk is content quality — generated summaries must be good enough for stakeholders to trust and act on.

---

### Direction 6 — Living Decision Intelligence (Applicability Conditions + Expiry)

**Urgency driver:** Stale priors risk; rapid organisational change; warm-start recency bias  
**Effort to unlock:** Medium — schema extension + applicability evaluation logic  
**Current traction:** Medium — gut-feeling framework and refresh fields already exist

#### What's there
The `gut-feeling` skill supports reuse / refine / override. The schema has `refresh.status` and `refresh.triggers`. `UPDATE_DECISION` exists for post-execution evolution. The warm-start experiment results demonstrated that prior reuse improves consistency.

#### What's missing
No `applicability_conditions`, no `do_not_reuse_when`, no `staleness_risk`, no `confidence_before_prior_review` vs. `confidence_after_prior_review` delta. No automated staleness check during RETRIEVE_DECISIONS. Priors can be silently reused even when context has changed materially.

#### What needs to change

Add these fields to the decision record schema:

```yaml
applicability_conditions:
  - same option set still valid
  - similar trust and risk constraints
  - no new compliance blocker introduced
do_not_reuse_when:
  - enterprise risk profile changed materially
  - regulatory requirements tightened since decision date
  - model safety requirements updated
  - team structure or ownership changed
review_by: "2026-08-19"
staleness_risk: low|medium|high
confidence_before_prior_review: low|medium|high
confidence_after_prior_review: low|medium|high
```

During `RETRIEVE_DECISIONS`, surface `do_not_reuse_when` condition matches as `yellow` warnings before the gut-feeling review step.

#### Organisational value
Transforms the decision memory from a static archive into a living knowledge base that degrades gracefully and signals when it needs updating. Essential for organisations in rapid change. Prevents the most dangerous failure mode: confidently reusing a prior that no longer applies.

#### Risks
Medium. Schema additions are additive. Main risk is adoption discipline — teams must populate `applicability_conditions` meaningfully, not as boilerplate. Needs clear guidance on staleness thresholds per decision type.

---

## Synthesis: The Single Highest-Leverage First Move

> **Add `run_id`, `session_id`, `decision_made_by`, and `logged_by` to the canonical schema and propagate `run_id` through all agent delegation calls.**

**Why this first:**

| Criterion | Result |
|---|---|
| Architecture disruption | Zero — purely additive YAML fields |
| Implementation effort | One sprint |
| Cross-direction leverage | Maximum — unlocks or unblocks 5 of the 6 directions |
| Immediate tangibility | Handoff manifest is a visible, per-run artifact |
| Dependency risk | None — no other direction must complete first |

**Cross-direction unlock map:**

```
run_id + session_id + decision_made_by + logged_by
  ↓ directly enables Direction 1 (auditable pipelines)
  ↓ provides identity anchor for Direction 2 (observed provenance)
  ↓ provides identity anchor for Direction 3 (governance gates)
  ↓ required by Direction 4 (cross-agent chain propagation)
  ↓ makes Direction 5 output attributable to specific runs
  ↓ seeds vault so Direction 6 has real prior art to evaluate staleness against
```

**The alternative first moves considered and why they are second:**

| Alternative | Why not first |
|---|---|
| Active governance gates (Dir 3) | Highest risk-reduction but requires identity fields as its own dependency |
| Confluence/Jira wiring (Dir 5) | Most immediate stakeholder visibility but built on a weak traceability foundation |
| Observed provenance capture (Dir 2) | Highest trust improvement but more complex and benefits from identity fields |
| Applicability conditions (Dir 6) | Addresses warm-start bias but naturally follows identity fields |

---

## Implementation Roadmap

### Sprint 1 — Foundation (Highest leverage, lowest risk)

1. Add `run_id`, `session_id`, `decision_made_by`, `logged_by` to canonical schema
2. Add normalised `prior_decisions_reviewed` and `prior_corpus_reviewed` fields
3. Emit one handoff manifest per run from `main-provenance`
4. Add `applicability_conditions`, `do_not_reuse_when`, and `review_by` to schema
5. Add `validation_status` and `completeness_score` fields

### Sprint 2 — Governance and observability

1. Add observed-capture layer in coordinator (files read, priors retrieved, artifacts written)
2. Add `expected_follow_on_actions` and `linked_future_decisions` fields
3. Wire `drift_check.max_severity: red` → execution block / escalation path
4. Implement 4 policy-trigger hooks (merged decisions, contamination, completeness, escalation)
5. Add `schema_version` and stable `decision_id` with slug convention

### Sprint 3 — Stakeholder delivery

1. Add post-logging trigger: Critical decisions → Confluence summary via `confluence-agent`
2. Add post-logging trigger: Escalation decisions → Jira ticket via `jira-agent`
3. Build 3 audience-specific view templates (operator / audit / stakeholder)
4. Add `triggered_policies`, `intervention_taken`, `escalation_required` fields

### Later — Intelligence and graph

1. Build a graph view of linked decisions (Neo4j backend already spec'd)
2. Add retention and summarisation rules for long-term logs
3. Add cross-run aggregation of recurring patterns and known override conditions
4. Integrate DeepSigma as a governance-grade runtime complement (post-threshold adapter layer)

---

## Expected Organisational Impact

| Known gap | Direction that addresses it | Impact |
|---|---|---|
| Cold-start contamination | Direction 2 (observed provenance) | Closes the gap directly |
| Merged multi-decision entries | Direction 3 (active gates) | Blocking hook prevents it |
| Weak architecture traceability | Direction 1 + 4 (actor + run + cross-agent) | Full audit trail |
| Warm-start recency bias | Direction 6 (applicability + expiry) | Bounded, reviewable precedent |
| Schema compliance without trust | Direction 2 + Sprint 2 (observed + integrity) | Trustworthy provenance |
| Good rationale, weak flow visibility | Direction 1 + 4 (pipeline records) | Full pipeline visible |
| Provenance invisible to stakeholders | Direction 5 (Atlassian delivery) | Business-accessible knowledge |

---

## Provenance Trace

This document was produced from two Critical decisions logged to `decision-log.md` in the same session:

| Decision | Score | Importance | Logged at |
|---|---|---|---|
| Selection and prioritisation of 6 critical evolution directions | 9/10 | Critical | 2026-05-19T14:35:00+02:00 |
| First-move sequencing — actor/run identity fields | 8/10 | Critical | 2026-05-19T14:35:00+02:00 |

Both decisions scored above the threshold of 5 (usefulness gate: true, no mandatory overrides needed).

**Indicative drift summary (advisory only):** Both decisions: `max_severity: yellow` · `drift_events_count: 1` · Event: `process_gap` (cold-start — no prior decisions existed at time of analysis). These drift metrics did not affect the threshold logging gate.

---

*Review by: 2026-08-19 — re-evaluate direction priorities after Sprint 1 completion.*
