# Как построить автоматизированный многоязычный конвейер перевода для Markdown-блога с GitHub Copilot Agents

**Author:** Yauheni Kurbayeu  
**Published:** Mar 20, 2026

![Building an Automated Multi-Language Translation Pipeline for a Markdown Blog with GitHub Copilot Agents](/images/blog/how-to-copilot-translation-pipeline.png)

---

## TL;DR

Это руководство показывает, как превратить простой блог на основе Markdown в автоматизированный многоязычный конвейер публикации с помощью GitHub Copilot Agents, Skills и Hooks. Главный агент-оркестратор координирует языковые субагенты для перевода контента, обновления локализованных сводок в README и генерации согласованных результатов. Hooks обеспечивают guardrails и журналирование, а skill инкапсулирует рабочий процесс. В результате получается воспроизводимая, масштабируемая и дружественная к governance система, которая превращает Git-коммиты в provenance-ориентированный контентный конвейер.

---

## Почему этот подход

Я хотел рабочий процесс, в котором:
- я пишу **одну статью на английском в Markdown**.
- система автоматически:
  - извлекает метаданные,
  - генерирует TL;DR,
  - обновляет глобальный README,
  - переводит статью на несколько языков,
  - обновляет локализованные README,
  - проверяет результаты,
  - и формирует сводку.

Одновременно мне были важны:
- воспроизводимость (всё живёт в Git),
- аудируемость (что произошло, когда и почему),
- и расширяемость (легко добавить больше языков или шагов позже).

GitHub Copilot Agents дали нужную абстракцию:
- **Agents** для ролей,
- **Subagents** для параллельной специализации,
- **Skills** для переиспользуемых workflow,
- **Hooks** для guardrails и управления жизненным циклом.

---

## Финальная архитектура

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

## Шаг 1 — Инструкции на уровне репозитория

Создайте `.github/copilot-instructions.md`.

Этот файл определяет глобальные правила системы.

### Пример

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

## Шаг 2 — Skill (мозг workflow)

Создайте:

```
.github/skills/article-translation/SKILL.md
```

Это переиспользуемая логика конвейера.

### Пример

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

## Шаг 3 — Главный агент-оркестратор

Создайте:

```
.github/agents/article-orchestrator.agent.md
```

### Пример

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

Это ваша **диспетчерская башня**.

---

## Шаг 4 — Языковые субагенты

У каждого языка есть свой агент.

Пример: `translate-de.agent.md`

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

Повторите для FR, ES, PL, RU.

---

## Шаг 5 — Hooks (guardrails и жизненный цикл)

Создайте:

```
.github/hooks/hooks.json
```

### Пример

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

### Назначение

- **preToolUse** → предотвращение небезопасных изменений  
- **postToolUse** → проверка результатов  
- **sessionEnd** → уведомление о завершении  
- **errorOccurred** → логирование ошибок  

---

## Шаг 6 — Запуск конвейера

### Вариант 1 — Вручную

```
copilot
```

Затем:

```
Use article-orchestrator to process my-article.md
```

---

### Вариант 2 — Триггер от Git-коммита

Добавьте `pre-commit` или GitHub Action:

```
on push:
  - "*.md"
```

Триггер:

```
copilot -p "Run article-orchestrator on new article"
```

---

## Шаг 7 — Пример результата

После выполнения:

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

### Переведённый файл

```
/de/my-article.md
```

---

## Шаг 8 — Чем мне помог GPT

Эта система не была полностью собрана вручную с нуля.

GPT помог с:

- проектированием **архитектуры**
- определением **ролей агентов**
- написанием **всех конфигураций агентов**
- проектированием **skills и hooks**
- созданием **guardrails**
- генерацией **готового репозиторного набора**
- уточнением **лучших практик на основе документации Copilot**

Ключевой сдвиг, который обеспечил GPT:

> От «скриптов, которые переводят файлы»  
> → к «агентам, которые координируют трансформацию знаний»

---

## Шаг 9 — Ключевые инсайты

### 1. Git становится событийной системой

```
commit → agent → transformation → commit
```

### 2. Агенты лучше скриптов

- проще расширять
- проще рассуждать о системе
- ближе к тому, как мыслят люди

### 3. Provenance встроен по умолчанию

На каждом шаге:
- кто инициировал
- что изменилось
- какой результат получен

---

## Шаг 10 — Следующие шаги

Вы можете расширить это до:

- перевода на основе diff
- AI-оценки качества
- SEO-оптимизации по языкам
- конвейеров публикации
- загрузки в граф provenance

---

## Финальные мысли

Это больше, чем перевод.

Это **операционная система для контента**:
- детерминированная
- объяснимая
- расширяемая

И она естественно масштабируется до:
- систем знаний
- происхождения решений
- AI-native workflow

---

## Хотите улучшить это?

Если хотите, я могу помочь вам:

- добавить инкрементальный перевод (только изменённые абзацы)
- интегрировать с вашим движком блога (Astro, Jekyll)
- добавить уведомления в Slack/email
- превратить это в SaaS-ready архитектуру
