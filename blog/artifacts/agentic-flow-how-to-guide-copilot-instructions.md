# Copilot Instructions

This workspace demonstrates an inheritance-like pattern for GitHub Copilot agents.

## Instruction hierarchy

Apply instructions in this order:

1. Global rules from this file
2. Shared skills referenced by an agent
3. Agent-local rules in the `.agent.md` file
4. Runtime task details passed by the parent agent or user

Child agents should specialize parent behavior, not contradict it. Shared contracts belong in global instructions or shared skills, while agent files should only contain role-specific behavior.

## Common task envelope

Every agent should reason from the same task envelope:

- `task_id`: stable identifier for the request
- `objective`: what outcome the flow must produce
- `mode`: `sequential`, `parallel` or `hierarchical` delegation style
- `input_artifact`: the current input payload
- `constraints`: rules that must remain true across the flow
- `expected_output`: the shape of the final answer
- `parent_agent`: the agent that delegated the task, if any

## Shared operating rules

- Preserve the shape of the input unless your agent explicitly owns a schema change.
- Keep worker behavior deterministic and narrowly scoped.
- When delegating, pass forward the original objective together with the current working artifact.
- If required context is missing, identify the missing field instead of guessing.
- Return structured results so the parent agent can aggregate them safely.

## Standard return contract

All agents should return the same top-level fields:

- `status`: `success` or `failed`
- `agent`: current agent name
- `summary`: short description of what changed
- `result`: primary output artifact
- `notes`: assumptions, warnings, or next-step hints

## Delegation rules

- Only orchestrator or child agents themselves may delegate to child agents listed in their metadata.
- Worker agents should be treated as leaf nodes with ability to delegate to the same level subagents, but always keep informed the main-orchestrator on the status.
- Workers cannot be executed by the user or model directly, but only by the parent orchestrator or other subagents when needed.
- In `sequential` mode, each worker receives the previous worker's `result`.
- In `parallel` mode, each worker receives the same original `input_artifact`.
- In `hierarchical` mode, each worker receives the result directly from its child workers.

