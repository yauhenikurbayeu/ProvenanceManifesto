# Budowanie zautomatyzowanego, wielojęzycznego pipeline’u tłumaczeń dla bloga Markdown z użyciem GitHub Copilot Agents

**Author:** Yauheni Kurbayeu  
**Published:** 20.03.2026

![Building an Automated Multi-Language Translation Pipeline for a Markdown Blog with GitHub Copilot Agents](/images/blog/how-to-copilot-translation-pipeline.png)

---

## TL;DR

Ten przewodnik pokazuje, jak przekształcić prosty blog oparty na Markdown w zautomatyzowany, wielojęzyczny pipeline publikacyjny z użyciem GitHub Copilot Agents, Skills i Hooks. Główny agent orkiestrujący koordynuje podagentów dla poszczególnych języków, aby tłumaczyć treść, aktualizować lokalne podsumowania README i generować spójne wyniki. Hooki wymuszają mechanizmy ochronne i logowanie, a skill enkapsuluje cały przepływ pracy. Efektem jest powtarzalny, skalowalny i przyjazny dla ładu organizacyjnego system, który zamienia commity Git w pipeline treści świadomy pochodzenia decyzji.

---

## Dlaczego to podejście

Chciałem mieć workflow, w którym:
- piszę **jeden artykuł po angielsku w Markdown**.
- System automatycznie:
  - wyodrębnia metadane,
  - generuje TL;DR,
  - aktualizuje globalny README,
  - tłumaczy artykuł na wiele języków,
  - aktualizuje lokalne README,
  - weryfikuje rezultaty,
  - i tworzy podsumowanie.

Jednocześnie zależało mi na:
- powtarzalności (wszystko jest w Git),
- audytowalności (co się wydarzyło, kiedy i dlaczego),
- oraz rozszerzalności (łatwe dodawanie kolejnych języków lub kroków później).

GitHub Copilot Agents zapewnił właściwą abstrakcję:
- **Agents** dla ról,
- **Subagents** dla równoległej specjalizacji,
- **Skills** dla wielokrotnego użycia workflow,
- **Hooks** dla mechanizmów ochronnych i kontroli cyklu życia.

---

## Docelowa architektura

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

## Krok 1 — Instrukcje na poziomie repozytorium

Utwórz `.github/copilot-instructions.md`.

To definiuje globalne reguły dla systemu.

### Przykład

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

## Krok 2 — Skill (mózg workflow)

Utwórz:

```
.github/skills/article-translation/SKILL.md
```

To jest logika wielokrotnego użytku dla pipeline’u.

### Przykład

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

## Krok 3 — Główny agent orkiestrujący

Utwórz:

```
.github/agents/article-orchestrator.agent.md
```

### Przykład

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

To twoja **wieża kontroli**.

---

## Krok 4 — Podagenci językowi

Każdy język ma własnego agenta.

Przykład: `translate-de.agent.md`

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

Powtórz dla FR, ES, PL, RU.

---

## Krok 5 — Hooki (mechanizmy ochronne i cykl życia)

Utwórz:

```
.github/hooks/hooks.json
```

### Przykład

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

### Cel

- **preToolUse** → zapobieganie niebezpiecznym edycjom  
- **postToolUse** → walidacja wyników  
- **sessionEnd** → powiadomienie o zakończeniu  
- **errorOccurred** → logowanie błędów  

---

## Krok 6 — Uruchamianie pipeline’u

### Opcja 1 — Ręcznie

```
copilot
```

Następnie:

```
Use article-orchestrator to process my-article.md
```

---

### Opcja 2 — Trigger przez commit Git

Dodaj `pre-commit` albo GitHub Action:

```
on push:
  - "*.md"
```

Trigger:

```
copilot -p "Run article-orchestrator on new article"
```

---

## Krok 7 — Przykład wyniku

Po wykonaniu:

### Root README

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Short summary**
```

### German README

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Kurze Zusammenfassung**
```

### Przetłumaczony plik

```
/de/my-article.md
```

---

## Krok 8 — W czym pomógł mi GPT

Ten system nie został zbudowany ręcznie od zera.

GPT pomógł w:

- zaprojektowaniu **architektury**
- zdefiniowaniu **ról agentów**
- napisaniu **wszystkich konfiguracji agentów**
- zaprojektowaniu **skills i hooks**
- stworzeniu **mechanizmów ochronnych**
- wygenerowaniu **gotowego pakietu repozytorium**
- dopracowaniu **dobrych praktyk na bazie dokumentacji Copilot**

Kluczowa zmiana, którą umożliwił GPT:

> Od „skryptów, które tłumaczą pliki”  
> → do „agentów, którzy koordynują transformację wiedzy”

---

## Krok 9 — Kluczowe wnioski

### 1. Git staje się systemem zdarzeń

```
commit → agent → transformation → commit
```

### 2. Agenci są lepsi niż skrypty

- łatwiej je rozszerzać
- łatwiej o nich myśleć
- są bliższe temu, jak myślą ludzie

### 3. Provenance jest wbudowane

Każdy krok:
- kto wyzwolił
- co się zmieniło
- jaki wynik powstał

---

## Krok 10 — Następne kroki

Możesz to rozszerzyć o:

- tłumaczenie oparte o różnice (diff-based translation)
- ocenę jakości AI
- optymalizację SEO per język
- pipeline publikacyjny
- ingest do grafu provenance

---

## Końcowe przemyślenia

To coś więcej niż tłumaczenie.

To **system operacyjny treści**:
- deterministyczny
- wyjaśnialny
- rozszerzalny

I naturalnie skaluje się do:
- systemów wiedzy
- provenance decyzji
- workflow AI-native

---

## Chcesz to ulepszyć?

Jeśli chcesz, mogę pomóc Ci:

- dodać tłumaczenie przyrostowe (tylko zmienione akapity)
- zintegrować to z Twoim silnikiem bloga (Astro, Jekyll)
- dodać powiadomienia Slack/e-mail
- przekształcić to w architekturę gotową pod SaaS
