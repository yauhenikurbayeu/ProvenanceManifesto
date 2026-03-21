
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

LANG_DIRS = {"de", "fr", "es", "pl", "ru"}
BLOG_DIR = "blog"

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

data = read_input()
tool_name = data.get("toolName")
tool_args = parse_tool_args(data)
tool_result = data.get("toolResult") or {}
result_type = tool_result.get("resultType")

targets = []
for key in ("path", "filePath", "targetPath"):
    if isinstance(tool_args.get(key), str):
        targets.append(tool_args[key])
if isinstance(tool_args.get("paths"), list):
    targets.extend([p for p in tool_args["paths"] if isinstance(p, str)])

checks = []

def read_text(path):
    try:
        return (ROOT / path).read_text(encoding="utf-8")
    except Exception:
        return None

def read_json(path):
    try:
        return json.loads((ROOT / path).read_text(encoding="utf-8"))
    except Exception:
        return None

def validate_manifest(path):
    payload = read_json(path)
    if not isinstance(payload, dict):
        return {
            "path": path,
            "exists": False,
            "validJson": False,
            "hasArticles": False,
            "missingPublishedFiles": [],
            "missingPublishedTldrs": []
        }

    articles = payload.get("articles")
    missing_files = []
    missing_tldrs = []

    if isinstance(articles, list):
        for article in articles:
            if not isinstance(article, dict):
                continue
            canonical_slug = article.get("canonicalSlug")
            languages = article.get("languages")
            if not isinstance(languages, dict):
                continue
            for lang, lang_rule in languages.items():
                if not isinstance(lang_rule, dict):
                    continue
                if not lang_rule.get("published"):
                    continue
                file_path = lang_rule.get("file")
                tldr = lang_rule.get("tldr")
                resolved_path = None
                if isinstance(file_path, str):
                    resolved_path = ROOT / BLOG_DIR / file_path
                if not isinstance(file_path, str) or resolved_path is None or not resolved_path.exists():
                    missing_files.append({"canonicalSlug": canonical_slug, "language": lang, "file": file_path})
                if not isinstance(tldr, str) or not tldr.strip():
                    missing_tldrs.append({"canonicalSlug": canonical_slug, "language": lang})

    return {
        "path": path,
        "exists": True,
        "validJson": True,
        "hasArticles": isinstance(articles, list),
        "missingPublishedFiles": missing_files,
        "missingPublishedTldrs": missing_tldrs
    }

if result_type == "success" and tool_name in {"edit", "create"}:
    for target in targets:
        norm = target.replace("\\", "/")
        parts = pathlib.PurePosixPath(norm).parts
        if norm == "blog/manifest.json":
            checks.append(validate_manifest(norm))
        elif norm == "blog/README.md":
            text = read_text(norm)
            checks.append({
                "path": norm,
                "exists": text is not None,
                "looksLikeReadme": text is not None and ("Author:" in text or "**TL;DR" in text)
            })
        elif norm == "blog/translation-summary.md":
            text = read_text(norm)
            checks.append({
                "path": norm,
                "exists": text is not None,
                "hasFinalStatus": text is not None and ("Final Status" in text or "final status" in text.lower())
            })
        elif len(parts) >= 3 and parts[0] == BLOG_DIR and parts[1] in LANG_DIRS:
            text = read_text(norm)
            if norm.endswith("/README.md"):
                checks.append({
                    "path": norm,
                    "exists": text is not None,
                    "hasAuthorLine": text is not None and "Author:" in text,
                    "hasDateLine": text is not None and "Published:" in text,
                    "hasTldr": text is not None and "**TL;DR" in text
                })
            elif norm.endswith(".md"):
                checks.append({
                    "path": norm,
                    "exists": text is not None,
                    "nonEmpty": text is not None and len(text.strip()) > 0
                })

append_jsonl(LOG_DIR / "post-tool-use.jsonl", {
    "hook": "postToolUse",
    "ts": now_iso(),
    "toolName": tool_name,
    "resultType": result_type,
    "targets": targets,
    "checks": checks
})
