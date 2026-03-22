---
name: worker
description: Shared execution rules for leaf worker agents.
---

# Worker Skill

Use this skill for worker agents that perform one narrow step in a parent-controlled flow.

## Responsibilities

- Receive a task envelope from the parent orchestrator.
- Execute only the worker-specific transformation defined in the agent file.
- Preserve prior worker changes unless your role explicitly replaces them.
- Return the updated artifact using the shared return contract.

## Worker rules

- Treat worker agents as leaf nodes unless the agent file explicitly says otherwise.
- Do not reinterpret the whole workflow; focus on your single responsibility.
- Keep the output shape stable so the next worker can consume it without extra parsing.
- Put edge cases or assumptions in `notes` instead of burying them in the main result.


