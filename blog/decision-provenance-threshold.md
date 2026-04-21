![From Prototype to Precision: A Decision Logging Threshold](/images/blog/decision-provenance-threshold.png)

# From Prototype to Precision: A Decision Logging Threshold (Decision Provenance, Part 2)

**Author:** Yauheni Kurbayeu  
**Published:** Apr 21, 2026

In [Part 1](https://provenancemanifesto.org/en/blog/decision-provenance-proof), I validated a simple but important claim: agents can self-identify meaningful decisions, log them with context, and later reuse those logs as soft priors.

That prototype became convincing by the end of the split-agent scenario, but it still left one unsolved question:

> How does the system decide what is *meaningful enough* to persist, without turning the decision log into noise?

This article is the continuation of that exploration: the **Decision Logging Threshold Policy**.

It is a deterministic gate that sits between “an agent made a choice” and “we persist it as provenance.” It turns the fuzzy phrase *“meaningful-ish”* into an explicit, testable contract.

In the [W3C PROV Data Model (PROV-DM)](https://www.w3.org/TR/prov-dm/), *provenance* is described as information about what produced something (entities, activities, and responsible parties), and it is explicitly framed as a way to assess trustworthiness.

The work described here is implemented and evidenced in [this repository](https://github.com/yauhenikurbayeu/DecisionLog) via:

- Canonical runtime contract: [`.github/skills/decision-logging-threshold/SKILL.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/.github/skills/decision-logging-threshold/SKILL.md)
- Narrative rationale: [`threshold/decision-logging-threshold-policy.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/threshold/decision-logging-threshold-policy.md)
- Validation scenario: [`threshold/DECISION-LOGGING-THRESHOLD-TEST-SCENARIO.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/threshold/DECISION-LOGGING-THRESHOLD-TEST-SCENARIO.md)
- Test results report: [`threshold/DECISION-LOGGING-THRESHOLD-TEST-RESULT.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/threshold/DECISION-LOGGING-THRESHOLD-TEST-RESULT.md)
- Saved run artifacts (Mode A/B/C): [`decisions-logs-mode-a/`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/decisions-logs-mode-a/), [`decisions-logs-mode-b/`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/decisions-logs-mode-b/), [`decisions-logs-mode-c/`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/decisions-logs-mode-c/)

## Why a threshold gate was necessary

Decision provenance is only valuable if it preserves **signal**.

If everything becomes provenance, nothing is provenance. A log full of “I chose this wording” and “I ran that command” is not memory, it’s noise.

But the opposite failure is just as real:

- decisions get bundled (“two real choices” becomes “one vague entry”)
- decisions get skipped (“the output looks right, but the log is missing the why”)
- reruns produce inconsistent behavior (“sometimes we re-log, sometimes we don’t”)

In [Part 1](https://provenancemanifesto.org/en/blog/decision-provenance-proof), I treated *meaningful decisions* as a concept defined by the [`decision-log` skill](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/.github/skills/decision-log/SKILL.md). That was sufficient to prove the idea works.

However, the moment you want to make provenance **auditable**, you need a narrower and more operational question:

> Is this candidate decision major enough that it should be persisted as durable memory?

That is exactly what the threshold policy answers.

## Where the threshold sits in the agentic flow

The threshold is not a new logger format. It is a **gate before persistence**.

At a high level, the updated provenance flow is:

1. `main-provenance` reviews context and prior decisions (soft priors).
2. `user-task-executor` produces the task artifact and an execution summary.
3. `main-provenance` **normalizes** explicit candidate decisions (split first).
4. `main-provenance` scores each candidate with `decision-logging-threshold`.
5. Only threshold-qualified candidates are forwarded to `provenance-log`.
6. `provenance-log` appends strict entries using the `decision-log` schema (and defensively re-checks the threshold if needed).

In other words:

- the logger is strict about **how** we persist decisions
- the threshold gate is strict about **whether** we persist them

## The policy itself (as a deterministic contract)

The threshold policy is intentionally simple and deterministic.

It does not try to compute “importance” from scratch. It uses a lightweight scoring model to approximate a more practical concept:

> **How valuable will it be to remember this decision later?**

The contract in [`.github/skills/decision-logging-threshold/SKILL.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/.github/skills/decision-logging-threshold/SKILL.md) applies the same steps to every candidate:

### 1) Normalize the candidate (split first)

The threshold is applied to **one candidate decision at a time**.

If a task contains multiple explicit choices, they must be split before scoring. This inherits one of the clearest lessons from [Part 1](https://provenancemanifesto.org/en/blog/decision-provenance-proof): multi-decision provenance fails when boundaries collapse.

### 2) Mandatory overrides (always log)

Some decisions must be logged regardless of score:

- policy / compliance boundaries (security, privacy, legal, financial)
- human interaction boundaries (override, escalation, explicit approval/rejection)

This is the “accountability first” rule: these are not optional memory.

### 3) Explicit non-decision suppression (never log)

If no override applies, the policy suppresses clear non-decisions:

- deterministic transforms (formatting, parsing, mapping)
- retrieval-only steps with no reasoning
- mechanical execution steps
- repeated micro-decisions inside an already-chosen strategy

This is the core anti-noise defense.

### 4) Usefulness gate (memory value filter)

Even if a candidate was discussed at length, it should not be logged if it is not useful later.

The `usefulness_gate` asks whether at least one of these is true:

- it influences future reasoning or later workflow steps
- it encodes a non-trivial trade-off worth auditing later
- it cannot be reconstructed from the final output alone

### 5) Score five dimensions (0–2 each)

If a candidate is not suppressed and is useful, it is scored across five dimensions:

- `impact_radius`
- `reversibility`
- `uncertainty`
- `tradeoff_intensity`
- `longevity`

The final score is the sum (0–10), and the persistence threshold is **`>= 5`**.

The scoring rubric is intentionally coarse:

| Dimension | `0` | `1` | `2` |
|---|---|---|---|
| `impact_radius` | Local to one step or narrow fragment | Affects multiple steps/files/modules/sections | Affects architecture, workflow/release posture, safety/compliance posture, or broad downstream outcomes |
| `reversibility` | Easy to undo with negligible cost | Reversible with noticeable rework/coordination | Hard to undo or externally consequential |
| `uncertainty` | Deterministic or clearly prescribed | Bounded judgment required | High ambiguity, incomplete info, or conflicting evidence |
| `tradeoff_intensity` | No real viable alternative | Alternatives exist, limited consequences | Competing options with materially different consequences |
| `longevity` | Ephemeral | Matters for the rest of the task / near-term | Persistent, reusable, or policy-shaping |

### Final gate (the only rule that decides persistence)

In the skill, the final decision is explicitly defined as:

```text
override_applied = len(mandatory_overrides) > 0

should_log =
  override_applied
  OR (
    usefulness_gate
    AND decision_score >= 5
  )
```

This is the whole point of the policy: when the log/no-log rule is explicit like this, it becomes testable.

## Why these five metrics?

The threshold model is not meant to be a perfect theory of decision value. It is meant to be a **good-enough proxy** for the kinds of decisions that become valuable provenance:

- decisions with broad consequences
- decisions that are hard to undo
- decisions made under uncertainty
- decisions that encode real trade-offs
- decisions with long-lived effects

The five dimensions were chosen because they approximate those properties in a way that is:

- simple enough to apply in real-time
- expressive enough to separate “inflection point” from “execution chatter”
- stable enough to be validated by a deterministic test suite

Below is the theoretical intuition behind each dimension, and why it matters for provenance memory.

### 1) `impact_radius`: how far the consequences propagate

Impact radius is the simplest “scope of consequence” signal.

It answers questions like:

- Is this local to one step, or does it shape the whole deliverable?
- Does it affect one file, multiple files, or the system’s architecture / posture?

This dimension is closely related to the engineering concept of **blast radius**: how far a change or failure spreads.

In the AWS Well-Architected Framework, one design principle recommends “frequent, small, reversible changes,” explicitly linking smaller changes to reduced blast radius and faster reversal. That is the same intuition: broader impact deserves more care, and should be easier to audit later.  
Reference: [AWS Well-Architected Framework – Operational Excellence design principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html) (see “Make frequent, small, reversible changes”).

In provenance terms:

- low impact radius decisions rarely justify durable memory
- high impact radius decisions are exactly the ones teams revisit and relitigate

### 2) `reversibility`: whether the decision is a one-way door

Reversibility is one of the strongest predictors of “decision importance” in practice.

It is also one of the most widely shared organizational heuristics:

- reversible decisions should be made quickly and iterated
- irreversible (or nearly irreversible) decisions should be made slowly and carefully

Jeff Bezos popularized this as the “one-way door / two-way door” framing in an Amazon shareholder letter, distinguishing consequential irreversible decisions from reversible ones.  
Reference: [Jeff Bezos, Letter to Shareholders (Amazon), Exhibit 99.1 (SEC)](https://www.sec.gov/Archives/edgar/data/1018724/000119312516530910/d168744dex991.htm).

In provenance terms, reversibility matters because irreversible decisions carry higher future audit value:

- if you can’t easily undo it, you’ll want to know *why you did it*
- if you can undo it cheaply, you can often treat it as an experiment rather than history

### 3) `uncertainty`: how much ambiguity the decision must absorb

Uncertainty is where “memory” becomes particularly valuable.

If a decision is deterministic (there is a clear correct answer), provenance adds less value. You can usually reconstruct the choice from the output and the rules.

But if the decision was made under:

- incomplete information
- conflicting constraints
- ambiguous signals

then a future reader needs the stored context to understand why the chosen trade-off was reasonable at the time.

One way to frame this theoretically is via **value of information**: information has value because it can reduce uncertainty before a decision is made. When uncertainty is high, the “price” of missing context tends to be higher later.  
Background reference: [Value of information (overview)](https://en.wikipedia.org/wiki/Value_of_information).

In threshold terms, uncertainty is not “how hard the task is.” It is “how much judgment was required because the evidence was incomplete or in tension.”

### 4) `tradeoff_intensity`: whether alternatives are genuinely competing

Tradeoff intensity is meant to separate:

- decisions with *real* competing alternatives (each with consequences)
- from pseudo-choices where there is effectively only one viable path

This is aligned with the logic behind multi-criteria decision analysis (MCDA): complex decisions often involve multiple conflicting criteria, where no option dominates on every axis, and the point of the decision is the trade-off itself.  
Reference: [TÜV Rheinland Risktec – “Multi-Criteria Decision Analysis (MCDA)”](https://risktec.tuv.com/knowledge-bank/multi-criteria-decision-analysis/).

In provenance terms, high tradeoff intensity is valuable to remember because:

- it captures *what was sacrificed*
- it provides reusable precedent when the same trade-off reappears

### 5) `longevity`: how long the decision’s effects persist

Longevity is the “future reuse” proxy.

Some decisions matter only for a moment (presentation order, a local rewrite). Others shape a system for months or years.

This is why engineering teams have created practices like Architecture Decision Records (ADRs): small, durable records for decisions with lasting consequences.

Thoughtworks explicitly recommends lightweight ADRs to capture important decisions with context and consequences, and to store them in source control so they stay in sync with the system.  
Reference: [Thoughtworks Technology Radar – “Lightweight Architecture Decision Records”](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records).

The threshold’s longevity metric is intentionally broader than architecture. Any decision that is likely to shape future reasoning: scope, policy posture, workflow shape and risk posture, should have higher longevity.

## Why the threshold is `>= 5`

The five dimensions are each scored 0–2, so the maximum is 10.

Setting the gate at 5 forces a candidate to have **multiple meaningful signals**, not just one.

Examples:

- A single “big” factor (like high uncertainty) is not always enough by itself.
- A decision with moderate signals across several dimensions is often exactly the kind of decision that becomes valuable provenance.

The threshold is therefore a pragmatic calibration: high enough to block noise, low enough that real inflection points still pass.

The policy is also explicit about tie-break behavior:

- if unsure between adjacent scores, choose the lower number unless explicitly supported
- do not inflate one dimension to compensate for another
- do not retune thresholds dynamically during a live run

This matters because the threshold gate is trying to be **stable enough to audit**.

## How I tested the threshold gate

The threshold suite is documented in [`threshold/DECISION-LOGGING-THRESHOLD-TEST-SCENARIO.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/threshold/DECISION-LOGGING-THRESHOLD-TEST-SCENARIO.md).

It is focused on a narrow question:

> Not “can the system reason well?”, but “does it correctly decide when to log?”

The suite adds ten prompts (7–16) and validates:

- score-based positives (including boundary behavior)
- mandatory overrides (policy and human)
- explicit non-decision suppression
- split-before-score behavior
- robustness when a prior log exists (controls must stay suppressed)

It defines three modes:

- **Mode A:** clean-room run  
  Evidence: [`decisions-logs-mode-a/`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/decisions-logs-mode-a/)
- **Mode B:** rerun only the control prompts in a prior-rich environment  
  Evidence: [`decisions-logs-mode-b/`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/decisions-logs-mode-b/)
- **Mode C:** rerun the full suite in a mixed order (resilience test)  
  Evidence: [`decisions-logs-mode-c/`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/decisions-logs-mode-c/)

Prompt set: threshold suite prompts `7–16` in [`test-prompts/`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/test-prompts/) (for example: [`test-prompts/DECISION_LOGGING_TEST_PROMPT7-threshold-high-score.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/test-prompts/DECISION_LOGGING_TEST_PROMPT7-threshold-high-score.md), [`test-prompts/DECISION_LOGGING_TEST_PROMPT16-micro-decisions-control.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/test-prompts/DECISION_LOGGING_TEST_PROMPT16-micro-decisions-control.md)).

## What the results show (and what they don’t)

The results report is captured in [`threshold/DECISION-LOGGING-THRESHOLD-TEST-RESULT.md`](https://github.com/yauhenikurbayeu/DecisionLog/blob/main/threshold/DECISION-LOGGING-THRESHOLD-TEST-RESULT.md).

Top-line:

- Mode A: pass
- Mode B: pass
- Mode C: partial pass

The most important proven behavior is that the threshold gate works as a **precision filter**:

- controls stayed suppressed (no fake provenance)
- override prompts logged correctly
- split prompt logged only the substantive decision

The biggest weakness exposed is not the scoring rule itself, but rerun semantics:

- Mode C re-logged two positives (14 and 15) as reconfirmations
- similar positives did not re-log
- that makes the “duplicate suppression / reconfirmation policy” look inconsistent rather than deterministic

This is an important distinction:

- the threshold gate can make “log/no-log” deterministic per candidate
- but the *workflow* still needs deterministic rules for “do we log again on rerun?”

## What this adds to the overall decision provenance story

The first phase of the prototype proved that agents can log decisions and reuse those logs.

The threshold phase strengthens the story in a more operational way:

- decision provenance becomes **selective by explicit contract**
- the persistence gate becomes **testable**
- the workflow becomes closer to “auditable memory,” not just “helpful notes”

It does not solve everything (actor attribution and rerun semantics are still the big gaps), but it makes the system’s behavior more governable.

## Next refinements suggested by the suite

The artifacts in the threshold folder converge on four practical next steps:

1. Make duplicate / reconfirmation policy explicit and deterministic across reruns.
2. Enforce clean-room boundaries so results cannot act as priors in Mode A-style validation.
3. Persist `threshold_check` uniformly (or explicitly decide not to persist it) so audits can validate scoring behavior from saved artifacts.
4. Normalize decision-log formatting and schema drift across runs.

Those are not “nice to have.” They are the gap between *a working prototype* and *audit-grade decision memory*.
