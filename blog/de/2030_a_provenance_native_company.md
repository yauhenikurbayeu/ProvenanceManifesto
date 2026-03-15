# 2030 Ein Provenance‑Native Unternehmen.

**Author:** Yauheni Kurbayeu  
**Published:** March 13, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/2030-provenance-native-company-yauheni-kurbayeu-h9p8f/)** 

*Stellen wir uns ein „Provenance‑Native Unternehmen“ im Jahr 2030 vor – eine Organisation, die von Anfang an rund um Entscheidungs‑Lineage, SDLC‑Memory und Nachvollziehbarkeit von AI‑Ausführungen aufgebaut ist, statt dies später nachträglich einzubauen.*

![A Provenance-Native Company (2030)](/images/blog/provenance_native_company_2030.png)

## 1. Organisatorisches Gedächtnis ist Kern‑Infrastruktur.

In einem provenance‑nativen Unternehmen wird **organisatorisches Gedächtnis als Infrastruktur behandelt**, nicht als Dokumentation.

Anstatt dass Wissen über Tools wie Jira, Slack, GitHub und Notion verteilt ist, erzeugen alle Arbeitsereignisse automatisch **strukturierte Provenance‑Records**.

Jede bedeutende Handlung erzeugt Knoten in einem **Entscheidungs‑Graphen**:

```
-   Decision
-   Assumption
-   Constraint
-   Risk
-   Experiment
-   Artifact
-   Agent execution
```

Diese Knoten werden automatisch miteinander verknüpft.

Das Ergebnis ist ein **lebender kausaler Graph der Organisation**.

Keine im Nachhinein geschriebene Dokumentation, sondern **Gedächtnis, das als Nebenprodukt der Arbeit entsteht**.



## 2. AI‑Agenten müssen Provenance erzeugen.

Im Jahr 2030 wird der Großteil der Arbeit von AI‑Agenten unterstützt.

In einem provenance‑nativen Unternehmen **dürfen AI‑Agenten nicht arbeiten, ohne Traceability‑Records zu erzeugen**.

Jede Ausführung erfasst:

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

Das wird zu **standardisierter operativer Telemetrie**, ähnlich wie Observability heute.

Aber statt Systeme zu beobachten, beobachtet das Unternehmen **Entscheidungsflüsse**.



## 3. Architektur wird zu einem lebenden Entscheidungs‑Graphen.

Architekturdiagramme werden zweitrangig.

Stattdessen wird Architektur als **Graph von Entscheidungen über die Zeit** dargestellt.

Beispiel:
```yaml
Decision: Split EU infrastructure
  ├── Assumption: GDPR enforcement risk
  ├── Constraint: Data residency
  ├── Risk: Deployment complexity
  └── Resulting artifacts:
          - AWS EU cluster
          - Separate pipelines

```

Sechs Monate später erscheint ein weiterer Knoten:

```yaml
Decision: Merge EU & US services
Reason: Regulatory change
Supersedes: Decision #231
```

Architektur wird zu **zeitbewusstem Denken**, nicht zu statischen Diagrammen.



## 4. Meetings werden zu Entscheidungs‑Erfassungssystemen.

Meetings existieren weiterhin, aber ihr Zweck verändert sich.

Anstatt dass Diskussionen in Notizen verschwinden, extrahieren Systeme:

```
-   Proposed decisions
-   Risks
-   Assumptions
-   Disagreements
-   Action items
```

Diese werden als strukturierte Knoten gespeichert.

Das System verknüpft sie automatisch mit:

-   Codeänderungen
-   Produktfeatures
-   Incidents
-   Experimenten

Im Laufe der Zeit sammelt das Unternehmen eine **kausale Historie darüber, warum Dinge passiert sind**.



## 5. Incidents werden über Entscheidungs‑Lineage untersucht.

Heute konzentriert sich Incident‑Analyse meist auf:

-   Logs
-   Metriken
-   Code

In einem provenance‑nativen Unternehmen beginnt die Untersuchung anders:

>Welche **Entscheidungskette** hat den Fehler verursacht?

Beispiel:
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

Die Root Cause wird zu **invaliden Annahmen**, nicht nur zu fehlerhaftem Code.



## 6. Institutionelles Wissen wird abfragbar.

Mitarbeiter können fragen:

-   Warum nutzen wir diese Architektur?
-   Welche Annahmen rechtfertigen diese Einschränkung?
-   Von welchen Entscheidungen hängt diese Komponente ab?

Das System rekonstruiert Antworten mithilfe des Entscheidungs‑Graphen.

Das ist grundlegend anders als RAG über Dokumentation.

Es antwortet mit **kausaler Lineage**, nicht mit Textähnlichkeit.



## 7. Strategie wird als Entscheidungs‑Evolution verfolgt.

Auch Entscheidungen der Unternehmensführung werden im Provenance‑Graphen aufgezeichnet.

Beispiel:

```yaml
Strategic Decision: Enter EU market
Assumptions: 
    - EU demand growing 
    - compliance manageable

Constraints: 
    - data residency 
    - local legal frameworks
```

Zwei Jahre später:

```yaml
Decision: Expand EU infrastructure
Supersedes: initial EU strategy
Reason: adoption exceeded forecast
```

Strategie wird zu **nachvollziehbarem Denken über die Zeit**.



## 8. Das Unternehmen entwickelt „Decision Capital“.

Das ist das interessanteste Ergebnis.

Heute sammeln Unternehmen:

-   Code
-   Daten
-   Dokumente

Ein provenance‑natives Unternehmen sammelt **Decision Capital**.

Das bedeutet, es besitzt einen historischen Graphen von:

-   Trade‑offs
-   gescheiterten Ideen
-   validierten Annahmen
-   Architektur‑Evolution
-   strategischem Denken

Neue Mitarbeiter und AI‑Systeme können sofort **die Denkweise der Organisation verstehen**.

Das beschleunigt Onboarding und strategische Ausrichtung erheblich.



## 9. AI wird sicherer einsetzbar.

Eines der größten Probleme heutiger AI‑Systeme ist **Accountability**.

In einem provenance‑nativen Unternehmen kann jede AI‑Aktion zurückverfolgt werden zu:

-   wer das Ziel genehmigt hat
-   welche Annahmen verwendet wurden
-   welches Modell das Ergebnis erzeugt hat
-   welche Entscheidungskette die Ausführung autorisiert hat

Dadurch wird AI **auditierbar und governierbar**.



## 10. Die Kultur verschiebt sich hin zu Entscheidungsdenken.

Ingenieure hören auf zu fragen:

> „Welchen Code sollten wir schreiben?“

Stattdessen fragen sie:

> „Welche Entscheidung treffen wir?“

Artefakte wie Code, Dokumente und Experimente werden zu **Konsequenzen von Entscheidungen**.



## Die Ironie

Der interessanteste Aspekt dieser Zukunft ist, dass sie **keine revolutionäre Technologie erfordert**.

Alles, was benötigt wird, existiert bereits:

-   Graphdatenbanken
-   Vector Embeddings
-   AI‑Agenten
-   Event‑Pipelines
-   Observability‑Stacks

Was fehlt, ist das **mentale Modell**.

Genau dieses führt das **[Provenance Manifesto](https://provenancemanifesto.org/)** ein.
