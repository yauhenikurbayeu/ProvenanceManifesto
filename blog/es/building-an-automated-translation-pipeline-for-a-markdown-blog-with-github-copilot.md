# Construir una canalización automatizada de traducción multilingüe para un blog en Markdown con GitHub Copilot Agents

**Author:** Yauheni Kurbayeu  
**Published:** Mar 20, 2026

![Building an Automated Multi-Language Translation Pipeline for a Markdown Blog with GitHub Copilot Agents](/images/blog/how-to-copilot-translation-pipeline.png)

---

## TL;DR

Esta guía muestra cómo convertir un blog simple basado en Markdown en una canalización de publicación multilingüe automatizada usando GitHub Copilot Agents, Skills y Hooks. Un agente orquestador principal coordina subagentes específicos por idioma para traducir contenido, actualizar resúmenes de README localizados y generar salidas consistentes. Los hooks aplican barandillas de control y registro, mientras que una skill encapsula el flujo de trabajo. El resultado es un sistema reproducible, escalable y amigable para la gobernanza que convierte commits de Git en una canalización de contenido consciente de la procedencia.

---

## Por qué este enfoque

Quería un flujo de trabajo donde:
- yo escribo **un artículo en Markdown en inglés**.
- el sistema automáticamente:
  - extrae metadatos,
  - genera un TL;DR,
  - actualiza un README global,
  - traduce el artículo a varios idiomas,
  - actualiza READMEs localizados,
  - verifica resultados,
  - y produce un resumen.

Al mismo tiempo, quería:
- reproducibilidad (todo vive en Git),
- auditabilidad (qué ocurrió, cuándo y por qué),
- y extensibilidad (fácil agregar más idiomas o pasos después).

GitHub Copilot Agents ofreció la abstracción correcta:
- **Agents** para roles,
- **Subagents** para especialización en paralelo,
- **Skills** para flujos de trabajo reutilizables,
- **Hooks** para barandillas de control y control del ciclo de vida.

---

## Arquitectura final

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

## Paso 1 — Instrucciones a nivel de repositorio

Crea `.github/copilot-instructions.md`.

Esto define reglas globales para el sistema.

### Ejemplo

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

## Paso 2 — La Skill (cerebro del flujo)

Crea:

```
.github/skills/article-translation/SKILL.md
```

Esta es la lógica reutilizable de la canalización.

### Ejemplo

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

## Paso 3 — Agente orquestador principal

Crea:

```
.github/agents/article-orchestrator.agent.md
```

### Ejemplo

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

Esta es tu **torre de control**.

---

## Paso 4 — Subagentes por idioma

Cada idioma tiene su propio agente.

Ejemplo: `translate-de.agent.md`

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

Repite para FR, ES, PL, RU.

---

## Paso 5 — Hooks (barandillas de control y ciclo de vida)

Crea:

```
.github/hooks/hooks.json
```

### Ejemplo

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

### Propósito

- **preToolUse** → prevenir ediciones inseguras  
- **postToolUse** → validar salidas  
- **sessionEnd** → notificar finalización  
- **errorOccurred** → registrar fallos  

---

## Paso 6 — Ejecutar la canalización

### Opción 1 — Manual

```
copilot
```

Luego:

```
Use article-orchestrator to process my-article.md
```

---

### Opción 2 — Disparador por commit de Git

Agrega un `pre-commit` o una GitHub Action:

```
on push:
  - "*.md"
```

Dispara:

```
copilot -p "Run article-orchestrator on new article"
```

---

## Paso 7 — Ejemplo de salida

Después de la ejecución:

### README raíz

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Short summary**
```

### README en alemán

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Kurze Zusammenfassung**
```

### Archivo traducido

```
/de/my-article.md
```

---

## Paso 8 — En qué me ayudó GPT

Este sistema no fue construido manualmente desde cero.

GPT me ayudó con:

- diseñar la **arquitectura**
- definir **roles de agentes**
- escribir **todas las configuraciones de agentes**
- diseñar **skills y hooks**
- crear **barandillas de control**
- generar **paquete de repositorio listo para usar**
- refinar **mejores prácticas basadas en la documentación de Copilot**

El cambio clave que GPT habilitó:

> De “scripts que traducen archivos”  
> → a “agentes que coordinan transformación de conocimiento”

---

## Paso 9 — Ideas clave

### 1. Git se convierte en un sistema de eventos

```
commit → agent → transformation → commit
```

### 2. Los agentes son mejores que los scripts

- más fáciles de extender
- más fáciles de razonar
- más cercanos a cómo piensan los humanos

### 3. La procedencia está integrada

En cada paso:
- quién disparó
- qué cambió
- qué salida produjo

---

## Paso 10 — Próximos pasos

Puedes extender esto hacia:

- traducción basada en diffs
- puntuación de calidad con IA
- optimización SEO por idioma
- canalizaciones de publicación
- ingesta en grafo de procedencia

---

## Reflexiones finales

Esto es más que traducción.

Es un **sistema operativo de contenido**:
- determinista
- explicable
- extensible

Y escala de forma natural hacia:
- sistemas de conocimiento
- procedencia de decisiones
- flujos de trabajo nativos de IA

---

## ¿Quieres mejorarlo?

Si quieres, puedo ayudarte a:

- agregar traducción incremental (solo párrafos cambiados)
- integrar con tu motor de blog (Astro, Jekyll)
- agregar notificaciones por Slack/correo
- convertir esto en una arquitectura lista para SaaS
