![Der Tag, an dem das Provenance Manifesto geboren wurde](/images/blog/the_day_the_provenance_manifesto_was_born.jpeg)

# Der Tag, an dem das Provenance Manifesto geboren wurde.

**Author:** Yauheni Kurbayeu  
**Published:** March 8, 2026  
**[LinkedIn](https://www.linkedin.com/posts/yauhenikurbayeu_over-the-past-months-i-have-been-exploring-activity-7436171607305318401-Vj3D?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAvr38Bav3RGiyv777cbZGFw7M1kSDr-dU)** 

In den vergangenen Monaten habe ich eine Frage untersucht, die zunächst
technisch erschien, sich aber nach und nach als deutlich umfassender
herausstellte.

**Warum hat Softwareentwicklung fast kein Gedächtnis für ihre eigenen
Entscheidungen?**

Diese Frage führte zu einer Reihe von Artikeln, in denen ich das Problem
aus verschiedenen Perspektiven betrachtet habe.

Zunächst untersuchte ich die Illusion, dass Menschen sich an alles über
die Systeme erinnern, die sie bauen. In der Realität wechseln Teams,
Architekten ziehen weiter, und die Begründungen hinter den Systemen
verschwinden leise, während die Systeme selbst bestehen bleiben.

Anschließend habe ich untersucht, ob moderne AI-Retrieval-Ansätze helfen
könnten, diese Begründungen zu bewahren. Vektorsuche und RAG wirkten
zunächst vielversprechend, doch je tiefer die Analyse ging, desto klarer
wurde, dass Ähnlichkeitssuche allein die Kette aus Annahmen, Risiken,
Randbedingungen und Abwägungen hinter realen Engineering-Entscheidungen
nicht rekonstruieren kann.

Diese Erkenntnis führte zur Idee eines **inkrementellen,
graphbasierten Provenance-Gedächtnisses**, eines Ansatzes, der nicht nur
Dokumente, sondern auch die Beziehungen zwischen Entscheidungen und dem
Kontext, der zu ihnen geführt hat, bewahrt.

An einem bestimmten Punkt hörte die Diskussion auf, rein technisch zu
sein.

Das eigentliche Problem erwies sich als etwas Grundlegenderes:
**Software Engineering hat Entscheidungen nie als Artefakte erster
Klasse behandelt.**

Wir versionieren Code, speichern Commits und reproduzieren Builds.  
Doch die Begründungen, die Systeme formen, verschwinden fast sofort.

Während AI die Geschwindigkeit, mit der Software produziert werden
kann, massiv erhöht, wird diese Lücke noch gefährlicher.

Deshalb veröffentliche ich heute das **Provenance Manifesto**.

-   AI kann die Ausführung drastisch beschleunigen.
-   Provenance bewahrt Verantwortlichkeit.

## Einige zusätzliche Gedanken hinter dem Manifest

Während dieser Recherche wurde deutlich, dass die eigentliche
Herausforderung nicht Dokumentation oder Wissensabruf ist. Die
Herausforderung besteht darin, dass Software Engineering niemals ein
**System of Record für Entscheidungen** etabliert hat.

Jede Architektur, jedes Produktverhalten, jeder operative Prozess und
jede Incident-Response entstehen aus Entscheidungen. Dennoch überleben
diese Entscheidungen selten länger als die Teams, die sie getroffen
haben.

Organisationen erben Systeme, aber nicht die Begründungen dahinter.

Das **Provenance Manifesto** schlägt eine einfache Verschiebung vor:

-   Entscheidungen sollten Kontext tragen.
-   Sie sollten sich weiterentwickeln, aber niemals verschwinden.
-   Sie sollten abfragbar sein.
-   Sie sollten klare Verantwortung haben.

Und während AI zu einem aktiven Teilnehmer der Entwicklung wird, sollte
sie innerhalb eines **transparenten Rahmens für Entscheidungs-Governance**
arbeiten.

Die Veröffentlichung des Manifests ist **nicht der Abschluss der
Forschung**.

In vielerlei Hinsicht **ist sie erst der Anfang**.

Wenn dieses Thema bei dir Anklang findet, egal ob du an Architektur,
Wissenssystemen, AI-Werkzeugen oder Engineering-Leadership arbeitest,
würde ich deine Perspektive wirklich sehr schätzen.

------------------------------------------------------------------------

### Contribute

Dein Beitrag ist sehr willkommen:

https://github.com/yauhenikurbayeu/ProvenanceManifesto/blob/main/README.md
