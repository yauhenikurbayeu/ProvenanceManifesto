# Aufbau einer automatisierten mehrsprachigen Übersetzungs-Pipeline für einen Markdown-Blog mit GitHub Copilot Agents

**Author:** Yauheni Kurbayeu  
**Published:** 20.03.2026

![Building an Automated Multi-Language Translation Pipeline for a Markdown Blog with GitHub Copilot Agents](/images/blog/how-to-copilot-translation-pipeline.png)

---

## TL;DR

Dieser Leitfaden zeigt, wie man einen einfachen Markdown-basierten Blog mit GitHub Copilot Agents, Skills und Hooks in eine automatisierte, mehrsprachige Publishing-Pipeline verwandelt. Ein zentraler Orchestrator-Agent koordiniert sprachspezifische Subagents, um Inhalte zu übersetzen, lokalisierte README-Zusammenfassungen zu aktualisieren und konsistente Ergebnisse zu erzeugen. Hooks erzwingen Guardrails und Logging, während ein Skill den Workflow kapselt. Das Ergebnis ist ein reproduzierbares, skalierbares und governance-freundliches System, das Git-Commits in eine provenance-bewusste Content-Pipeline verwandelt.

---

## Warum dieser Ansatz

Ich wollte einen Workflow, bei dem:
- ich **einen englischen Markdown-Artikel** schreibe.
- das System automatisch:
  - Metadaten extrahiert,
  - ein TL;DR erzeugt,
  - ein globales README aktualisiert,
  - den Artikel in mehrere Sprachen übersetzt,
  - lokalisierte READMEs aktualisiert,
  - Ergebnisse verifiziert,
  - und eine Zusammenfassung erzeugt.

Gleichzeitig wollte ich:
- Reproduzierbarkeit (alles lebt in Git),
- Auditierbarkeit (was ist passiert, wann und warum),
- und Erweiterbarkeit (später leicht mehr Sprachen oder Schritte hinzufügen).

GitHub Copilot Agents boten die richtige Abstraktion:
- **Agents** für Rollen,
- **Subagents** für parallele Spezialisierung,
- **Skills** für wiederverwendbare Workflows,
- **Hooks** für Guardrails und Lifecycle-Steuerung.

---

## Endgültige Architektur

```
root/
├─ README.md
├─ my-article.md
├─ de/
│  └─ README.md
├─ fr/
│  └─ README.md
├─ es/
│  └─ README.md
├─ pl/
│  └─ README.md
├─ ru/
│  └─ README.md
└─ .github/
   ├─ copilot-instructions.md
   ├─ agents/
   │  ├─ article-orchestrator.agent.md
   │  ├─ translate-de.agent.md
   │  ├─ translate-fr.agent.md
   │  ├─ translate-es.agent.md
   │  ├─ translate-pl.agent.md
   │  └─ translate-ru.agent.md
   ├─ skills/
   │  └─ article-translation/
   │     └─ SKILL.md
   └─ hooks/
      ├─ hooks.json
      ├─ session_start.py
      ├─ pre_tool_guard.py
      ├─ post_tool_validate.py
      ├─ session_end.py
      └─ error_occurred.py
```

---

## Schritt 1 — Repository-weite Anweisungen

Erstelle `.github/copilot-instructions.md`.

Dies definiert globale Regeln für das System.

### Beispiel

```md
# Copilot Instructions

This repository processes English Markdown articles and produces:

- Root README summary
- Localized README summaries (de, fr, es, pl, ru)
- Translated article files

## Source rules

- Source article is a root-level `.md` file
- Ignore README.md and language folders

## Metadata extraction

Extract:
- title
- author
- date

Normalize date to dd.mm.yyy

## Output format

# Title
Author: Name
Date: dd.mm.yyy
**TL;DR summary**

## Translation rules

- Preserve markdown structure
- Preserve meaning
- Do not translate title/author/date in localized README
- Translate only TL;DR in localized README
```

---

## Schritt 2 — Der Skill (Workflow-Gehirn)

Erstelle:

```
.github/skills/article-translation/SKILL.md
```

Das ist die wiederverwendbare Pipeline-Logik.

### Beispiel

```md
---
name: article-translation
description: Process markdown article and generate translations
---

1. Find source article
2. Extract metadata
3. Generate TL;DR
4. Update root README
5. Trigger subagents
6. Validate outputs
```

---

## Schritt 3 — Haupt-Orchestrator-Agent

Erstelle:

```
.github/agents/article-orchestrator.agent.md
```

### Beispiel

```md
---
name: article-orchestrator
tools: ['agent', 'read', 'search', 'edit']
agents: ['translate-de', 'translate-fr', 'translate-es', 'translate-pl', 'translate-ru']
---

Use article-translation skill.

1. Find article
2. Extract metadata
3. Generate TL;DR
4. Update README.md
5. Run subagents
6. Verify outputs
7. Write translation-summary.md
```

Das ist dein **Control Tower**.

---

## Schritt 4 — Sprach-Subagents

Jede Sprache hat ihren eigenen Agent.

Beispiel: `translate-de.agent.md`

```md
---
name: translate-de
user-invocable: false
---

Translate article into German.

Create:
- /de/README.md
- /de/<article>.md

Rules:
- keep title unchanged
- keep Author and Date unchanged
- translate TL;DR only in README
- preserve markdown
```

Wiederhole das für FR, ES, PL, RU.

---

## Schritt 5 — Hooks (Guardrails und Lifecycle)

Erstelle:

```
.github/hooks/hooks.json
```

### Beispiel

```json
{
  "version": 1,
  "hooks": {
    "sessionStart": [{ "bash": { "run": "python3 .github/hooks/session_start.py" } }],
    "preToolUse": [{ "bash": { "run": "python3 .github/hooks/pre_tool_guard.py" } }],
    "postToolUse": [{ "bash": { "run": "python3 .github/hooks/post_tool_validate.py" } }],
    "sessionEnd": [{ "bash": { "run": "python3 .github/hooks/session_end.py" } }],
    "errorOccurred": [{ "bash": { "run": "python3 .github/hooks/error_occurred.py" } }]
  }
}
```

### Zweck

- **preToolUse** → unsichere Änderungen verhindern  
- **postToolUse** → Ergebnisse validieren  
- **sessionEnd** → Abschluss melden  
- **errorOccurred** → Fehler protokollieren  

---

## Schritt 6 — Pipeline ausführen

### Option 1 — Manuell

```
copilot
```

Dann:

```
Use article-orchestrator to process my-article.md
```

---

### Option 2 — Git-Commit-Trigger

Füge einen `pre-commit` oder eine GitHub Action hinzu:

```
on push:
  - "*.md"
```

Trigger:

```
copilot -p "Run article-orchestrator on new article"
```

---

## Schritt 7 — Ausgabe-Beispiel

Nach der Ausführung:

### Root README

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Short summary**
```

### Deutsches README

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Kurze Zusammenfassung**
```

### Übersetzte Datei

```
/de/my-article.md
```

---

## Schritt 8 — Wobei mir GPT geholfen hat

Dieses System wurde nicht komplett manuell von Grund auf gebaut.

GPT hat geholfen bei:

- dem Entwurf der **Architektur**
- der Definition von **Agentenrollen**
- dem Schreiben **aller Agenten-Konfigurationen**
- dem Design von **Skills und Hooks**
- der Erstellung von **Guardrails**
- der Generierung eines **einsatzbereiten Repo-Bundles**
- der Verfeinerung von **Best Practices auf Basis der Copilot-Dokumentation**

Der zentrale Perspektivwechsel, den GPT ermöglicht hat:

> Von „Skripten, die Dateien übersetzen“  
> → zu „Agenten, die Wissenstransformation koordinieren“

---

## Schritt 9 — Zentrale Erkenntnisse

### 1. Git wird zu einem Event-System

```
commit → agent → transformation → commit
```

### 2. Agents sind besser als Skripte

- leichter zu erweitern
- leichter nachzuvollziehen
- näher daran, wie Menschen denken

### 3. Provenance ist eingebaut

Jeder Schritt:
- wer ausgelöst hat
- was sich geändert hat
- welches Ergebnis erzeugt wurde

---

## Schritt 10 — Nächste Schritte

Du kannst das weiter ausbauen zu:

- diff-basierter Übersetzung
- KI-Qualitätsscoring
- SEO-Optimierung pro Sprache
- Publishing-Pipelines
- Ingestion eines Provenance-Graphen

---

## Abschließende Gedanken

Das ist mehr als Übersetzung.

Es ist ein **Content-Betriebssystem**:
- deterministisch
- erklärbar
- erweiterbar

Und es skaliert auf natürliche Weise in:
- Wissenssysteme
- Entscheidungs-Provenienz
- KI-native Workflows

---

## Möchtest du es verbessern?

Wenn du möchtest, kann ich dir helfen:

- inkrementelle Übersetzung hinzuzufügen (nur geänderte Absätze)
- es in deine Blog-Engine zu integrieren (Astro, Jekyll)
- Slack-/E-Mail-Benachrichtigungen hinzuzufügen
- das in eine SaaS-fähige Architektur umzuwandeln
