---
name: shared-agent-contract
description: Base protocol inherited by all agents in this workspace.
---

# Shared Agent Contract

Use this skill in every agent to simulate inheritance through shared instruction composition.

## Required input

Expect a task envelope containing:

- `task_id`
- `objective`
- `mode`
- `input_artifact`
- `constraints`
- `expected_output`
- `parent_agent`

## Execution rules

- Operate only on the current `input_artifact`.
- Preserve the artifact shape unless your role explicitly owns schema changes.
- Keep outputs deterministic so downstream agents can chain safely.
- Propagate important assumptions in `notes`.
- Fail fast when required input is missing or malformed.

## Return template

```yaml
status: success
agent: <agent-name>
summary: <one-sentence summary>
result: <updated artifact>
notes:
  - <optional warning or assumption>
```

## Failure template

```yaml
status: failed
agent: <agent-name>
summary: Unable to complete the assigned step
result: null
notes:
  - <reason for failure>
```
