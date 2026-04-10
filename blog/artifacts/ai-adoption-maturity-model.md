# AI Adoption Maturity Model (SDLC-Oriented)

## Overview
This model defines AI adoption across four dimensions:
- Coverage (SDLC stages touched)
- Autonomy (AI vs human execution)
- Trust (quality and predictability)
- Governance (traceability and control)

---

## Stage 0 — Baseline (Pre-AI)

### Purpose
Establish a control group for comparison.

### Metrics
- Lead Time = Time from ticket creation → production
- Cycle Time = Time from work start → completion
- Defect Rate = Defects / tickets
- MTTR = Mean time to resolve incidents

### Example
- Lead Time: 24 days
- Cycle Time: 10 days
- Defect Rate: 0.3 per ticket

---

## Stage 1 — Non-Degrading Augmentation

### Goal
Increase AI usage without degrading delivery quality.

### Metrics

#### AI Code Contribution %
AI_Code_% = (AI-generated LOC / Total LOC) * 100

#### Quality Parity Index
QPI = (Defect rate AI code) / (Defect rate human code)

Target: ~1.0 or lower

#### Review Rejection Rate
Rejection Rate = Rejected PRs / Total PRs (AI vs Human)

### Example
- AI Code: 45%
- QPI: 0.95 (AI slightly better)
- Rejection Rate: 12% AI vs 10% human

---

## Stage 2 — Assisted Execution

### Goal
AI contributes to execution tasks with human oversight.

### Metrics

#### AI-Assisted Ticket %
AI_Ticket_% = (Tickets with AI assistance / Total tickets) * 100

#### Human Touchpoints per Ticket
Touches = Number of manual interventions per ticket

#### Time-to-Merge Reduction
TTM Reduction = (Baseline TTM - Current TTM) / Baseline TTM

### Example
- 60% tickets AI-assisted
- Avg touches: 3 per ticket
- TTM reduced by 20%

---

## Stage 3 — Multi-Step Agentic Workflows

### Goal
AI executes chained workflows across SDLC steps.

### Metrics

#### Workflow Automation Depth
Depth = Number of SDLC steps executed by AI per ticket

#### Failure Rate
Failure Rate = Failed workflows / Total workflows

#### Override Frequency
Overrides = Human interventions / workflows

### Example
- Avg depth: 4 steps (code + test + PR + deploy draft)
- Failure rate: 8%
- Override: 25%

---

## Stage 4 — Full SDLC Coverage

### Goal
AI is present across all SDLC stages.

### Coverage Areas
- Business Analysis
- Requirements
- Architecture
- Development
- Testing
- Release
- Support artifacts

### Metrics

#### Artifact Coverage %
Coverage = (AI-assisted artifacts / Total artifacts) * 100

#### Consistency Score
Consistency = Alignment between requirements, code, and tests (manual or automated scoring)

### Example
- Coverage: 70%
- Consistency: High (traceable links between artifacts)

---

## Stage 5 — Autonomous Delivery

### Goal
AI executes end-to-end delivery with human oversight.

### Metrics

#### Fully AI-Executed Tickets %
AI_E2E_% = (Tickets completed end-to-end by AI / Total tickets) * 100

#### Exception Rate
Exception Rate = Tickets requiring human intervention / AI tickets

#### Rollback Rate
Rollback Rate = Rollbacks / deployments

### Example
- 30% fully AI-executed
- Exception rate: 15%
- Rollback rate: 3%

---

## Stage 6 — Governed Intelligence (Provenance-Aware)

### Goal
All decisions are traceable and explainable.

### Metrics

#### Decision Coverage %
Decision Coverage = Decisions with full metadata / Total decisions

#### Decision Reuse Rate
Reuse Rate = Reused decisions / Total decisions

#### Conflict Detection Rate
Conflict Rate = Conflicting decisions detected / Total decisions

### Example
- 80% decisions tracked
- 25% reused
- Conflicts detected early in 10% cases

---

## Stage 7 — Self-Optimizing System

### Goal
System improves itself using feedback loops.

### Metrics

#### Decision Success Rate
Success Rate = Successful decisions / Total decisions

#### Skill Efficiency Score
Efficiency = Outcome quality / Cost (tokens + time)

#### Drift Detection
Measure deviation in model outputs over time

### Example
- Success rate improves from 70% → 85%
- Efficiency increases 30% over quarter

---

## Summary

Stages:
0. Baseline
1. Safe Augmentation
2. Assisted Execution
3. Agentic Workflows
4. Full SDLC Coverage
5. Autonomous Delivery
6. Governed Intelligence
7. Self-Optimizing System
