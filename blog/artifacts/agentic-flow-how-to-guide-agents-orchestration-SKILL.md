---
name: agents-orchestration
description: Shared orchestration behavior for parent agents.
---

# Agents Orchestration Skill

Use this skill whenever a parent agent needs to delegate work to child agents.

## Responsibilities

- Normalize the incoming request into the shared task envelope.
- Decide whether the flow should run in `sequential`, `parallel`, or `hierarchical` mode.
- Delegate only to the child agents declared in the current agent file.
- Preserve shared constraints as work moves between workers.
- Aggregate worker outputs into a single final response.

## Delegation protocol

- In `sequential` mode, send the original `input_artifact` to the first worker.
- For each next worker, pass the previous worker's `result` as the new `input_artifact`.
- In `parallel` mode, send the same original `input_artifact` to every worker.
- In `hierarchical` mode, send the previous worker's `result` directly to the next worker without returning to the orchestrator.
- Include `task_id`, `mode`, `objective`, `constraints`, `expected_output`, and `parent_agent` in every child request.

## Aggregation rules

- For sequential runs, return the last successful worker result as the final `result`.
- For parallel runs, return an object keyed by worker name so results remain traceable.
- For hierarchical runs, return the final worker's result as the final `result`, but preserve intermediate summaries in `notes` for traceability.
- Preserve worker summaries in `notes` when they help explain the final output.

## Failure handling

- Stop the flow immediately if a required sequential step fails.
- In parallel mode, report partial completion and identify failed workers explicitly.
- In hierarchical mode, stop the flow if any worker fails and report the failure point clearly.
- Return failures using the shared return contract.
