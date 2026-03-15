# 2030 Una empresa nativa de Provenance.

**Author:** Yauheni Kurbayeu  
**Published:** March 13, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/2030-provenance-native-company-yauheni-kurbayeu-h9p8f/)** 

*Imaginemos una “empresa nativa de Provenance” en 2030: una organización construida desde el principio alrededor del linaje de decisiones, la memoria del SDLC y la trazabilidad de la ejecución de IA, en lugar de intentar incorporarlo posteriormente.*

![A Provenance-Native Company (2030)](/images/blog/provenance_native_company_2030.png)

## 1. La memoria organizacional es infraestructura central.

En una empresa nativa de provenance, **la memoria organizacional se trata como infraestructura**, no como documentación.

En lugar de que el conocimiento esté disperso entre herramientas como Jira, Slack, GitHub y Notion, todos los eventos de trabajo producen automáticamente **registros estructurados de provenance**.

Cada acción significativa genera nodos en un **grafo de decisiones**:

```
-   Decision
-   Assumption
-   Constraint
-   Risk
-   Experiment
-   Artifact
-   Agent execution
```

Estos nodos se enlazan automáticamente.

El resultado es un **grafo causal vivo de la organización**.

No es documentación escrita después, sino **memoria producida como efecto secundario del trabajo**.



## 2. Los agentes de IA deben producir provenance.

En 2030, gran parte del trabajo involucra agentes de IA.

En una empresa nativa de provenance, **los agentes de IA no pueden ejecutarse sin producir registros de trazabilidad**.

Cada ejecución captura:

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

Esto se convierte en **telemetría operativa estándar**, similar a la observabilidad actual.

Pero en lugar de observar sistemas, la empresa observa **flujos de decisiones**.



## 3. La arquitectura se convierte en un grafo vivo de decisiones.

Los diagramas de arquitectura pasan a ser secundarios.

En su lugar, la arquitectura se representa como un **grafo de decisiones a lo largo del tiempo**.

Ejemplo:

```yaml
Decision: Split EU infrastructure
  ├── Assumption: GDPR enforcement risk
  ├── Constraint: Data residency
  ├── Risk: Deployment complexity
  └── Resulting artifacts:
          - AWS EU cluster
          - Separate pipelines
```

Seis meses después aparece otro nodo:

```yaml
Decision: Merge EU & US services
Reason: Regulatory change
Supersedes: Decision #231
```

La arquitectura se convierte en **razonamiento consciente del tiempo**, no en diagramas estáticos.



## 4. Las reuniones se convierten en sistemas de captura de decisiones.

Las reuniones siguen existiendo, pero su propósito cambia.

En lugar de que las discusiones desaparezcan en notas, los sistemas extraen:

```
-   Proposed decisions
-   Risks
-   Assumptions
-   Disagreements
-   Action items
```

Estos elementos se almacenan como nodos estructurados.

El sistema los conecta automáticamente con:

-   cambios de código
-   funcionalidades del producto
-   incidentes
-   experimentos

Con el tiempo, la empresa acumula **una historia causal de por qué ocurrieron las cosas**.



## 5. Los incidentes se investigan a través del linaje de decisiones.

Hoy en día, el análisis de incidentes suele centrarse en:

-   logs
-   métricas
-   código

En una empresa nativa de provenance la investigación comienza de forma diferente:

>¿Qué **cadena de decisiones** produjo la falla?

Ejemplo:

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

La causa raíz pasa a ser **suposiciones inválidas**, no solo código defectuoso.



## 6. El conocimiento institucional se vuelve consultable.

Los empleados pueden preguntar:

-   ¿Por qué usamos esta arquitectura?
-   ¿Qué suposiciones justifican esta restricción?
-   ¿De qué decisiones depende este componente?

El sistema reconstruye las respuestas utilizando el grafo de decisiones.

Esto es fundamentalmente diferente de RAG sobre documentación.

Responde usando **linaje causal**, no similitud textual.



## 7. La estrategia se rastrea como evolución de decisiones.

Incluso las decisiones ejecutivas se registran en el grafo de provenance.

Ejemplo:

```yaml
Strategic Decision: Enter EU market
Assumptions: 
    - EU demand growing 
    - compliance manageable

Constraints: 
    - data residency 
    - local legal frameworks
```

Dos años después:

```yaml
Decision: Expand EU infrastructure
Supersedes: initial EU strategy
Reason: adoption exceeded forecast
```

La estrategia se convierte en **razonamiento rastreable a lo largo del tiempo**.



## 8. La empresa desarrolla “capital de decisiones”.

Este es el resultado más interesante.

Hoy las empresas acumulan:

-   código
-   datos
-   documentos

Una empresa nativa de provenance acumula **capital de decisiones**.

Es decir, posee un grafo histórico de:

-   trade-offs
-   ideas fallidas
-   suposiciones validadas
-   evolución de la arquitectura
-   razonamiento estratégico

Los nuevos empleados y los sistemas de IA pueden **comprender instantáneamente el razonamiento de la organización**.

Esto acelera enormemente el onboarding y la alineación estratégica.



## 9. La IA se vuelve más segura de usar.

Uno de los mayores problemas de los sistemas de IA actuales es la **responsabilidad**.

En una empresa nativa de provenance cada acción de IA puede rastrearse hasta:

-   quién aprobó el objetivo
-   qué suposiciones se utilizaron
-   qué modelo produjo el resultado
-   qué cadena de decisiones autorizó la ejecución

Esto hace que la IA sea **auditable y gobernable**.



## 10. La cultura cambia hacia el pensamiento basado en decisiones.

Los ingenieros dejan de preguntar:

> "¿Qué código deberíamos escribir?"

Empiezan a preguntar:

> "¿Qué decisión estamos tomando?"

Artefactos como el código, los documentos y los experimentos se convierten en **consecuencias de las decisiones**.



## La ironía

El aspecto más interesante de este futuro es que **no requiere tecnología revolucionaria**.

Todo lo necesario ya existe:

-   bases de datos de grafos
-   embeddings vectoriales
-   agentes de IA
-   pipelines de eventos
-   stacks de observabilidad

Lo que falta es el **modelo mental**.

Eso es exactamente lo que introduce el **[Provenance Manifesto](https://provenancemanifesto.org/)**.
