# Créer un pipeline automatisé de traduction multilingue pour un blog Markdown avec les agents GitHub Copilot

**Author:** Yauheni Kurbayeu  
**Published:** 20.03.2026

![Créer un pipeline automatisé de traduction multilingue pour un blog Markdown avec les agents GitHub Copilot](/images/blog/how-to-copilot-translation-pipeline.png)

---

## TL;DR

Ce guide montre comment transformer un blog simple basé sur Markdown en un pipeline de publication multilingue automatisé avec les agents GitHub Copilot, les Skills et les Hooks. Un agent orchestrateur principal coordonne des sous-agents spécifiques à chaque langue pour traduire le contenu, mettre à jour les résumés README localisés et générer des sorties cohérentes. Les Hooks imposent des garde-fous et de la journalisation, tandis qu’une Skill encapsule le workflow. Le résultat est un système reproductible, scalable et compatible avec la gouvernance, qui transforme les commits Git en pipeline de contenu orienté provenance.

---

## Pourquoi cette approche

Je voulais un workflow où :
- j’écris **un seul article Markdown en anglais**.
- le système automatiquement :
  - extrait les métadonnées,
  - génère un TL;DR,
  - met à jour un README global,
  - traduit l’article en plusieurs langues,
  - met à jour les README localisés,
  - vérifie les résultats,
  - et produit un résumé.

En même temps, je voulais :
- la reproductibilité (tout vit dans Git),
- l’auditabilité (ce qui s’est passé, quand, et pourquoi),
- et l’extensibilité (facile d’ajouter d’autres langues ou étapes plus tard).

Les agents GitHub Copilot ont fourni la bonne abstraction :
- des **Agents** pour les rôles,
- des **Subagents** pour la spécialisation en parallèle,
- des **Skills** pour les workflows réutilisables,
- des **Hooks** pour les garde-fous et le contrôle du cycle de vie.

---

## Architecture finale

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

## Étape 1 — Instructions au niveau du dépôt

Créez `.github/copilot-instructions.md`.

Ce fichier définit les règles globales du système.

### Exemple

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

## Étape 2 — La Skill (le cerveau du workflow)

Créez :

```
.github/skills/article-translation/SKILL.md
```

C’est la logique de pipeline réutilisable.

### Exemple

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

## Étape 3 — Agent orchestrateur principal

Créez :

```
.github/agents/article-orchestrator.agent.md
```

### Exemple

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

C’est votre **tour de contrôle**.

---

## Étape 4 — Sous-agents de langue

Chaque langue a son propre agent.

Exemple : `translate-de.agent.md`

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

Répétez pour FR, ES, PL, RU.

---

## Étape 5 — Hooks (garde-fous et cycle de vie)

Créez :

```
.github/hooks/hooks.json
```

### Exemple

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

### Objectif

- **preToolUse** → empêcher les modifications non sûres  
- **postToolUse** → valider les sorties  
- **sessionEnd** → notifier la fin  
- **errorOccurred** → journaliser les échecs  

---

## Étape 6 — Exécuter le pipeline

### Option 1 — Manuel

```
copilot
```

Puis :

```
Use article-orchestrator to process my-article.md
```

---

### Option 2 — Déclenchement sur commit Git

Ajoutez un `pre-commit` ou une GitHub Action :

```
on push:
  - "*.md"
```

Déclenchez :

```
copilot -p "Run article-orchestrator on new article"
```

---

## Étape 7 — Exemple de sortie

Après exécution :

### README racine

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Short summary**
```

### README allemand

```md
# My Article
Author: John Doe
Date: 10.03.2026
**TL;DR Kurze Zusammenfassung**
```

### Fichier traduit

```
/de/my-article.md
```

---

## Étape 8 — Ce que GPT m’a aidé à faire

Ce système n’a pas été construit manuellement depuis zéro.

GPT m’a aidé pour :

- concevoir **l’architecture**
- définir les **rôles des agents**
- écrire **toutes les configurations d’agents**
- concevoir **skills et hooks**
- créer des **garde-fous**
- générer un **bundle de dépôt prêt à l’emploi**
- affiner les **bonnes pratiques basées sur la documentation Copilot**

Le changement clé permis par GPT :

> D’« scripts qui traduisent des fichiers »  
> à « des agents qui coordonnent la transformation des connaissances »

---

## Étape 9 — Enseignements clés

### 1. Git devient un système d’événements

```
commit → agent → transformation → commit
```

### 2. Les agents sont meilleurs que les scripts

- plus faciles à étendre
- plus faciles à raisonner
- plus proches de la façon dont les humains pensent

### 3. La provenance est intégrée

À chaque étape :
- qui a déclenché
- ce qui a changé
- quelle sortie a été produite

---

## Étape 10 — Prochaines étapes

Vous pouvez étendre cela vers :

- traduction basée sur les diffs
- scoring qualité IA
- optimisation SEO par langue
- pipelines de publication
- ingestion dans un graphe de provenance

---

## Réflexions finales

C’est plus que de la traduction.

C’est un **système d’exploitation du contenu** :
- déterministe
- explicable
- extensible

Et cela s’étend naturellement vers :
- les systèmes de connaissance
- la provenance des décisions
- des workflows natifs IA

---

## Vous voulez l’améliorer ?

Si vous voulez, je peux vous aider à :

- ajouter une traduction incrémentale (uniquement les paragraphes modifiés)
- intégrer votre moteur de blog (Astro, Jekyll)
- ajouter des notifications Slack/e-mail
- transformer cela en architecture prête pour un SaaS
