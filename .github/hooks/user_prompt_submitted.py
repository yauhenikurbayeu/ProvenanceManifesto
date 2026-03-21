
import json, sys, pathlib, datetime

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
    return datetime.datetime.now(datetime.UTC).isoformat().replace("+00:00", "Z")

data = read_input()
append_jsonl(LOG_DIR / "user-prompt-submitted.jsonl", {
    "hook": "userPromptSubmitted",
    "ts": now_iso(),
    "data": {
        "timestamp": data.get("timestamp"),
        "cwd": data.get("cwd"),
        "prompt": data.get("prompt")
    }
})
print("copilot hooks: user prompt recorded", file=sys.stderr)
