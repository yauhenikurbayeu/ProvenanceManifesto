# 2030 Une entreprise native de la provenance.

**Author:** Yauheni Kurbayeu  
**Published:** March 13, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/2030-provenance-native-company-yauheni-kurbayeu-h9p8f/)** 

*Imaginons une « entreprise native de la provenance » en 2030 — une organisation conçue dès le départ autour de la traçabilité des décisions, de la mémoire du SDLC et de la traçabilité de l’exécution des IA, plutôt que d’essayer de les ajouter après coup.*

![A Provenance-Native Company (2030)](/images/blog/provenance_native_company_2030.png)

## 1. La mémoire organisationnelle est une infrastructure fondamentale.

Dans une entreprise native de la provenance, **la mémoire organisationnelle est traitée comme une infrastructure**, et non comme de la documentation.

Au lieu que les connaissances soient dispersées dans des outils comme Jira, Slack, GitHub et Notion, tous les événements de travail produisent automatiquement des **enregistrements de provenance structurés**.

Chaque action significative génère des nœuds dans un **graphe de décisions** :

```
-   Decision
-   Assumption
-   Constraint
-   Risk
-   Experiment
-   Artifact
-   Agent execution
```

Ces nœuds sont automatiquement liés.

Le résultat est un **graphe causal vivant de l’organisation**.

Il ne s’agit pas d’une documentation écrite après coup, mais d’une **mémoire produite comme effet secondaire du travail**.



## 2. Les agents IA doivent produire de la provenance.

En 2030, la plupart du travail implique des agents IA.

Dans une entreprise native de la provenance, **les agents IA ne peuvent pas s’exécuter sans produire des enregistrements de traçabilité**.

Chaque exécution capture :

```
-   Agent identity
-   Model version
-   Inputs
-   Reasoning chain
-   Tools used
-   Decision references
-   Output artifacts
-   Confidence / risk notes
```

Cela devient une **télémétrie opérationnelle standard**, similaire à l’observabilité aujourd’hui.

Mais au lieu d’observer les systèmes, l’entreprise observe **les flux de décisions**.



## 3. L’architecture devient un graphe vivant de décisions.

Les diagrammes d’architecture deviennent secondaires.

À la place, l’architecture est représentée comme un **graphe de décisions au fil du temps**.

Exemple :

```yaml
Decision: Split EU infrastructure
  ├── Assumption: GDPR enforcement risk
  ├── Constraint: Data residency
  ├── Risk: Deployment complexity
  └── Resulting artifacts:
          - AWS EU cluster
          - Separate pipelines
```

Six mois plus tard, un autre nœud apparaît :

```yaml
Decision: Merge EU & US services
Reason: Regulatory change
Supersedes: Decision #231
```

L’architecture devient **un raisonnement évolutif dans le temps**, et non des diagrammes statiques.



## 4. Les réunions deviennent des systèmes de capture des décisions.

Les réunions existent toujours, mais leur objectif change.

Au lieu que les discussions disparaissent dans des notes, les systèmes extraient :

```
-   Proposed decisions
-   Risks
-   Assumptions
-   Disagreements
-   Action items
```

Ces éléments sont stockés comme des nœuds structurés.

Le système les relie automatiquement à :

-   changements de code
-   fonctionnalités produit
-   incidents
-   expériences

Avec le temps, l’entreprise accumule **une histoire causale expliquant pourquoi les choses se sont produites**.



## 5. Les incidents sont analysés à travers la lignée des décisions.

Aujourd’hui, l’analyse des incidents se concentre généralement sur :

-   les logs
-   les métriques
-   le code

Dans une entreprise native de la provenance, l’enquête commence différemment :

>Quelle **chaîne de décisions** a produit la défaillance ?

Exemple :

```yaml
Incident: Payment outage

Trace:
    Code change
    ↓
    Decision: switch payment provider
    ↓
    Assumption: fallback system ready
    ↓
    Assumption invalid
```

La cause racine devient **une hypothèse invalide**, et pas seulement du code défectueux.



## 6. La connaissance institutionnelle devient interrogeable.

Les employés peuvent demander :

-   Pourquoi utilisons-nous cette architecture ?
-   Quelles hypothèses justifient cette contrainte ?
-   Quelles décisions dépendent de ce composant ?

Le système reconstruit les réponses à l’aide du graphe de décisions.

C’est fondamentalement différent d’un RAG appliqué à la documentation.

Les réponses sont construites à partir de **la lignée causale**, et non de la similarité textuelle.



## 7. La stratégie est suivie comme une évolution des décisions.

Même les décisions exécutives sont enregistrées dans le graphe de provenance.

Exemple :

```yaml
Strategic Decision: Enter EU market
Assumptions: 
    - EU demand growing 
    - compliance manageable

Constraints: 
    - data residency 
    - local legal frameworks
```

Deux ans plus tard :

```yaml
Decision: Expand EU infrastructure
Supersedes: initial EU strategy
Reason: adoption exceeded forecast
```

La stratégie devient **un raisonnement traçable dans le temps**.



## 8. L’entreprise développe un « capital décisionnel ».

C’est le résultat le plus intéressant.

Aujourd’hui, les entreprises accumulent :

-   du code
-   des données
-   des documents

Une entreprise native de la provenance accumule **du capital décisionnel**.

Cela signifie qu’elle possède un graphe historique de :

-   compromis
-   idées abandonnées
-   hypothèses validées
-   évolution de l’architecture
-   raisonnement stratégique

Les nouveaux employés et les systèmes IA peuvent immédiatement **comprendre le raisonnement de l’organisation**.

Cela accélère considérablement l’intégration et l’alignement stratégique.



## 9. L’IA devient plus sûre à utiliser.

L’un des plus grands problèmes des systèmes d’IA aujourd’hui est **la responsabilité**.

Dans une entreprise native de la provenance, chaque action de l’IA peut être retracée jusqu’à :

-   qui a approuvé l’objectif
-   quelles hypothèses ont été utilisées
-   quel modèle a produit le résultat
-   quelle chaîne de décisions a autorisé l’exécution

Cela rend l’IA **auditable et gouvernable**.



## 10. La culture évolue vers la pensée décisionnelle.

Les ingénieurs cessent de demander :

> « Quel code devons-nous écrire ? »

Ils commencent à demander :

> « Quelle décision prenons-nous ? »

Les artefacts comme le code, les documents et les expériences deviennent **les conséquences des décisions**.



## L’ironie

L’aspect le plus intéressant de cet avenir est qu’il **ne nécessite aucune technologie révolutionnaire**.

Tout ce qui est nécessaire existe déjà :

-   bases de données graphes
-   embeddings vectoriels
-   agents IA
-   pipelines d’événements
-   stacks d’observabilité

Ce qui manque, c’est le **modèle mental**.

C’est précisément ce que le **[Provenance Manifesto](https://provenancemanifesto.org/)** introduit.
