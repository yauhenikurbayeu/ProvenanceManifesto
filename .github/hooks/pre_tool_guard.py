
import json, os, sys, pathlib, datetime

ROOT = pathlib.Path.cwd()
HOOK_DIR = ROOT / ".github" / "hooks"
LOG_DIR = HOOK_DIR / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)

def read_input():
    raw = sys.stdin.read()
    if not raw.strip():
        return {}
    try:
        return json.loads(raw)
    except Exception:
        return {"_raw": raw, "_parse_error": True}

def append_jsonl(path, payload):
    with open(path, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(payload, ensure_ascii=False) + "\n")

def now_iso():
    return datetime.datetime.utcnow().isoformat() + "Z"

LANG_DIRS = {"de", "fr", "es", "pl", "ru"}

def parse_tool_args(obj):
    tool_args = obj.get("toolArgs")
    if isinstance(tool_args, dict):
        return tool_args
    if isinstance(tool_args, str):
        try:
            return json.loads(tool_args)
        except Exception:
            return {"_raw": tool_args}
    return {}

def is_root_markdown(path_str):
    p = pathlib.PurePosixPath(path_str.replace("\\", "/"))
    return len(p.parts) == 1 and p.suffix.lower() == ".md"

def allowed_write_path(path_str):
    if not path_str:
        return True
    p = pathlib.PurePosixPath(path_str.replace("\\", "/"))
    parts = p.parts
    if not parts:
        return True
    # root-level allowed files
    if len(parts) == 1:
        name = parts[0]
        if name in {"README.md", "translation-summary.md"}:
            return True
        if name.endswith(".md"):
            return True
        return False
    # language folders
    if parts[0] in LANG_DIRS:
        return True
    return False

data = read_input()
tool_name = data.get("toolName")
tool_args = parse_tool_args(data)

targets = []
for key in ("path", "filePath", "targetPath"):
    if isinstance(tool_args.get(key), str):
        targets.append(tool_args[key])
if isinstance(tool_args.get("paths"), list):
    targets.extend([p for p in tool_args["paths"] if isinstance(p, str)])

decision = None
reason = None

if tool_name in {"edit", "create"}:
    bad = [p for p in targets if not allowed_write_path(p)]
    if bad:
        decision = {
            "permissionDecision": "deny",
            "permissionDecisionReason": "Article translation workflow may only write root Markdown files, translation-summary.md, README.md, or files inside de/fr/es/pl/ru."
        }

append_jsonl(LOG_DIR / "pre-tool-use.jsonl", {
    "hook": "preToolUse",
    "ts": now_iso(),
    "toolName": tool_name,
    "targets": targets,
    "decision": decision
})

if decision:
    print(json.dumps(decision))
