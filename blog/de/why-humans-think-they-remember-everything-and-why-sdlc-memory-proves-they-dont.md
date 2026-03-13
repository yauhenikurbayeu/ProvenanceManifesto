![Warum Menschen glauben, sie erinnern sich an alles – und warum SDLC Memory das Gegenteil beweist](/images/blog/why_humans_think_they_remember_everything_and_why_sdlc_memory_proves_they_dont.png)

# Warum Menschen glauben, sie erinnern sich an alles – und warum SDLC Memory das Gegenteil beweist

**Author:** Yauheni Kurbayeu  
**Published:** Feb 22, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/why-humans-think-remember-everything-sdlc-memory-proves-kurbayeu-6oumf/?trackingId=MtyXax6DUkl3k%2B9DhPt%2Bpg%3D%3D)** 

In jeder Engineering-Organisation existiert eine stille Illusion. Wir glauben, wir erinnern uns.

- Wir glauben, wir erinnern uns, warum wir diese Architektur gewählt haben.
- Warum diese Einschränkung existiert.
- Warum dieser Incident wirklich passiert ist.
- Warum wir die EU-Logik von der US-Logik getrennt haben.
- Warum wir diese Migration verschoben haben.

Doch die Kognitionswissenschaft sagt etwas sehr Unangenehmes.

Laut Forschung aus der kognitiven Psychologie zur Kapazität des Arbeitsgedächtnisses kann unser aktives **Arbeitsgedächtnis typischerweise** ungefähr **vier bedeutungsvolle Informationseinheiten gleichzeitig** halten. Nicht vierzig. Nicht vierhundert. Vier. Alles andere wird aus Fragmenten, Gewohnheiten und narrativem Klebstoff rekonstruiert. Und wenn wir Informationen nicht wiederholen oder externalisieren, zerfallen sie schnell. Das ist kein Führungsproblem. Das ist Biologie.

Vergleichen wir das nun mit modernen AI-Agenten. Claude kann mit 200K Tokens arbeiten, manchmal sogar mit 1M. Codex unterstützt 400K. Das klingt enorm im Vergleich zu einem menschlichen Gehirn, das vier aktive Einschränkungen gleichzeitig jongliert.

Aber hier ist die Wendung.

Selbst das reicht nicht für einen lebenden SDLC.

## Die Größenordnung realer Delivery-Memory

Nehmen wir ein sehr gewöhnliches Setup: drei Teams, fünfzehn Engineers, zweiwöchige Sprints. Nichts Extremes. Keine Hyperscale-Komplexität. Einfach ein gesundes SaaS-Produkt, das sich in Produktion weiterentwickelt.

Wenn man Arbeit in entscheidungsreife Zusammenfassungen komprimiert, zum Beispiel Tickets auf ihre Intention reduziert, PRs nach ihrem Impact zusammenfasst, ADRs mit Alternativen erfasst, Incidents mit Ursachen und Gegenmaßnahmen strukturiert – erzeugt man trotzdem überraschend viel strukturiertes Entscheidungs-Material.

In der Praxis bedeutet das ungefähr 150 Tickets pro Monat über alle Teams hinweg. Etwa 200–250 Pull Requests. Einige ADRs und Architektur-Diskussionen. Ein paar Produktions-Incidents. Sprint-Planungsergebnisse. Review-Entscheidungen. Akzeptierte Risiken.

Wenn man all das in kanonische, strukturierte Artefakte verdichtet – nicht rohes Slack-Rauschen, keine Logs, sondern reasoning-fähige Erinnerung – landet man bei ungefähr **200.000 Tokens pro Monat**.

Keine theoretischen Tokens. Echte Delivery-Memory.

Im Enterprise-Maßstab, mit 80 Engineers und ständigem architektonischem Cross-Team-Churn, steigt diese Zahl auf **eine bis eineinhalb Millionen Tokens pro Monat**.

Vergleichen wir das nun mit Context Windows.

Zweihunderttausend Tokens passen gerade so in einige moderne Modelle. Vierhunderttausend geben etwas mehr Luft. Eine Million wirkt großzügig.

Doch hier ist die strukturelle Realität: Ein einziges Quartal Delivery-Memory übersteigt bereits das, was bequem in ein einzelnes Session-Fenster passt. Und Sessions werden zurückgesetzt.

Ein 400K-Fenster verschafft Zeit. Es verschafft keine Kontinuität.

Das ist dieselbe Einschränkung, mit der Menschen konfrontiert sind – nur in einer anderen Größenordnung.

## Das eigentliche Problem ist nicht Speicherung

Interessanterweise ist Speicherung trivial.

In Ihrer aktuellen Größenordnung könnte ein ganzes Jahr kuratierter SDLC-Memory, einschließlich Embeddings und Graph-Beziehungen, weniger als 70 MB verbrauchen. Selbst im Enterprise-Maßstab bleibt man komfortabel unter einem halben Gigabyte für strukturierte Erinnerung.

Die Infrastrukturkosten sind vernachlässigbar.

Was teuer ist, ist kognitive Kontinuität.

Wenn Erinnerung nur in den Köpfen von Menschen lebt, setzt jeder Direktorenwechsel den Kontext zurück. Jeder Incident wiederholt frühere Fehler. Jede Architektur-Debatte spielt Argumente erneut ab, die bereits vor sechs Monaten geklärt wurden. Teams entdecken Einschränkungen neu, als wären es neue Erkenntnisse.

Sie haben kein Memory-Problem, weil Ihnen Dokumentation fehlt.

**Sie haben ein Memory-Problem, weil Ihnen strukturierte, abfragbare, kausal verknüpfte Erinnerung fehlt.**

## Warum größere Context Windows uns nicht retten werden

Größere Context Windows wirken wie Fortschritt. Und sie sind Fortschritt. Aber sie sind horizontale Skalierung der falschen Ebene.

Ein großes Context Window ist immer noch sessionsgebunden. Es ist immer noch transient. Es wird immer noch zurückgesetzt.

Ohne eine dauerhafte Struktur vergisst der Agent nach Ende der Session. Ohne eine dauerhafte Struktur rekonstruieren Menschen aus Fragmenten.

Wir versuchen weiterhin, Kontinuität mit größeren Prompts zu lösen.

Was wir tatsächlich brauchen, ist geschichtete Memory.

## Das Hot / Warm / Cold SDLC-Gehirn

Wenn wir SDLC wie ein lebendes System behandeln, muss Memory sich wie ein Nervensystem verhalten.

**Hot Memory** ist das, was gerade passiert.

- Der aktuelle Sprint.  
- Offene Incidents.  
- Aktive Risiken.  
- Ungelöste Fragen.  

Sie ist fließend, wird täglich aktualisiert und ist klein genug, um in eine Agent-Session injiziert zu werden. Das ist Ihr operativer Working Set.

**Warm Memory** ist das sich entwickelnde Gehirn des Produkts.

- Architekturentscheidungen.  
- Trade-offs. Postmortems.  
- Compliance-Constraints.  
- Ownership-Grenzen.  
- Kanonische Artefakte wie Decisions, Questions, Risks, Actions, ADRs und die Beziehungen zwischen ihnen.  

Diese Ebene erstreckt sich über Monate. Sie entwickelt sich weiter, verschwindet aber nicht. Sie wird nicht vollständig injiziert, sondern selektiv abgerufen.

**Cold Memory** ist Evidenz.

- Roh-Jira-Threads.  
- Slack-Transkripte.  
- PR-Diffs.  
- Aufzeichnungen.  
- Logs.  
- Unveränderlicher Beweis dafür, was passiert ist und warum.  

Selten direkt injiziert, aber immer verknüpft.

Die zentrale Erkenntnis ist einfach.

Hot bewegt sich. Warm stabilisiert. Cold bewahrt.

Agenten fragen über alle Ebenen hinweg ab. Menschen denken über alle Ebenen hinweg. Keiner von beiden sollte sich ausschließlich auf Erinnerung verlassen.

## Die fehlende Ebene: Provenance

Die eigentliche Stärke entsteht nicht allein durch Vector Search.

Sie entsteht durch Beziehungen.

Viele Teams gehen davon aus, dass RAG Kontinuität löst. Es hilft, aber Ähnlichkeit ist keine Erklärung. Ein „ähnliches Ticket“ zu finden ist nicht dasselbe, wie zu verstehen, warum eine Einschränkung existiert.

Jede bedeutungsvolle Entscheidung muss wissen:

- Wer sie getroffen hat.  
- Wann.  
- Auf welcher Evidenzbasis.  
- Welche Alternativen verworfen wurden.  
- Was sie beeinflusst.  
- Welche Risiken sie mitigiert.  
- Zu welchen Incidents sie später beigetragen hat.  
- Ob sie eine frühere Entscheidung ersetzt hat.  

Hier wird Graph-Struktur essenziell.

- Eine Vector-Datenbank hilft Ihnen, „ähnliche Ideen“ zu finden.  
- Eine Graph-Datenbank hilft Ihnen zu beantworten, „warum existiert das?“

Vector Search findet Relevanz. Graph-Traversal rekonstruiert Kausalität.

Wenn man beides kombiniert, **hört man auf, nach Text zu suchen, und beginnt, Reasoning zu traversieren.**

Dann wird SDLC nachvollziehbar.

## Was passiert, wenn Teams sich Richtung AI-Agenten bewegen?

Stellen wir uns nun eine Zukunft vor, die nicht hypothetisch ist – eine nahe Zukunft, die viele Führungskräfte bereits spüren. Da AI-Agenten immer leistungsfähiger werden, zeigen Umfragen, dass große Teile von Entwicklern und Engineering-Teams bereits täglich auf AI-Tools zurückgreifen. Einige Schätzungen gehen davon aus, dass mehr als 80 % der Engineers regelmäßig AI-Tools nutzen, um Coding- und Entwicklungsaufgaben zu unterstützen.

Es gibt sogar Stimmen, die vorschlagen, dass in wenigen Jahren viele traditionelle Software-Engineering-Aufgaben weitgehend von Agenten automatisiert werden könnten, während sich Menschen stärker auf Planung, Design und Aufsicht konzentrieren, statt selbst Code zu schreiben.

In diesem Szenario, in dem **50–80 % der täglichen Coding- und Ausführungsarbeit von AI-Agenten erledigt werden**, wird das Provenance-Problem dramatisch akuter. Wenn menschliche Engineers weniger Code schreiben und mehr Zeit damit verbringen, autonome Agenten zu steuern, **werden Entscheidungs-Kontext und Begründung noch wichtiger**:

- Das Arbeitsergebnis selbst ist nicht mehr das primäre Artefakt.  
- Entscheidend wird, warum und wie ein Agent eine bestimmte Implementierung gewählt hat – nicht nur, was er produziert hat.  

Selbst Studien, die zeigen, dass AI-Tools die Produktivität von Einzelpersonen oder Teams steigern (oft um etwa 20–60 % oder mehr), betonen gleichzeitig, dass Entwickler mehr Zeit damit verbringen, **Arbeit zu überwachen, Outputs zu validieren und von Agenten erzeugte Probleme zu beheben** – also genau jene höherstufige Form von Reasoning, die ohne Erinnerung an vorherigen Kontext nicht automatisiert werden kann.

AI-Agenten können Muster erkennen und Code schreiben, aber sie tragen nicht automatisch organisatorische Ziele, Produktstrategie oder die Trade-offs vergangener Entscheidungen mit sich – es sei denn, diese sind explizit in eine strukturierte Provenance-Schicht kodiert.

Diese Verschiebung verstärkt die Notwendigkeit der **Warm-Provenance-Ebene**:

- Wenn Agenten autonom Code erzeugen, müssen Sie genauso gut wissen, was zu dieser Entscheidung geführt hat, wie was der Code tut.  
- Wenn Agenten repetitive Aufgaben ersetzen, bleiben Menschen mit Ausnahmebehandlung, Strategie und Orchestrierung zurück – also genau jenen Aspekten, die ohne strukturierte Memory am schwersten zu erinnern sind.  
- Wenn ein Produkt Compliance nachweisen, Risiko-Mitigation erklären oder Monate später die ursprüngliche Intention rekonstruieren muss, wird der Provenance-Graph zur einzigen zuverlässigen Aufzeichnung.  

Ohne ihn riskieren Organisationen, undurchsichtige Systeme zu bauen, die selbst ihre Schöpfer nicht vollständig erklären können.

## Warum das im AI-Zeitalter noch wichtiger wird

Während AI die Kosten der Ausführung reduziert, konvergiert die Delivery-Geschwindigkeit zwischen Organisationen. Code-Generierung verbessert sich überall. Test-Erstellung beschleunigt sich überall. Dokumentation schreibt sich selbst.

Was nicht konvergiert, ist Memory-Disziplin.

- Teams ohne strukturierte SDLC-Memory diskutieren alte Entscheidungen erneut.  
- Sie führen bereits mitigierte Risiken wieder ein.  
- Sie wiederholen Architekturfehler.  
- Sie verlieren Kontext jedes Mal, wenn Führung rotiert oder ein Schlüssel-Engineer das Unternehmen verlässt.  

Teams mit geschichteter Provenance können Entscheidungen unter Druck erklären. Sie onboarden Engineers und AI-Agenten in Reasoning statt in Folklore. Sie ermöglichen AI-Agenten, innerhalb echter historischer Verankerung zu arbeiten. Sie bewahren Governance-Kontinuität, selbst wenn Menschen wechseln.

Der Unterschied liegt nicht im Tooling.

Er liegt in struktureller Memory.

## Warum das für Führungskräfte wichtig ist

Wenn Sie mehrere Teams führen, besonders in einer compliance-intensiven SaaS-Umgebung, simulieren Sie dieses System bereits in Ihrem Kopf.

Sie erinnern sich, welche Dependency fragil ist. Sie erinnern sich, welcher Agent-Workflow einen problematischen Release produziert hat. Sie erinnern sich, warum die EU-Logik beim letzten Rollout anders funktioniert hat.

Aber Ihr Gehirn ist kein dauerhafter Speicher. Es ist eine Reasoning-Engine mit einem winzigen aktiven Fenster.

Die kognitive Last, die Sie spüren, ist keine Schwäche.

Sie ist strukturelle Überlastung.

Sie halten ungefähr 200.000 Tokens pro Monat in einem Vier-Chunk-Prozessor.

In einer Zukunft, in der AI-Agenten die Hälfte oder mehr der Ausführungsarbeit übernehmen, verschwindet diese Memory-Last nicht. Sie verschiebt sich – vom Erinnern von Code zum Erinnern von Intention, Kausalität und Begründung.

## Abschließender Gedanke

Menschen können sich nicht alles merken. Agenten können sich nicht alles merken. Selbst Millionen-Token-Fenster sind keine Kontinuität.

Aber Organisationen können sich alles merken, wenn sie **Memory als Infrastruktur und nicht als Dokumentation** behandeln.

Ausführung wird immer günstiger. Memory wird zum Differenzierungsmerkmal.

In einer AI-beschleunigten Welt werden die Teams mit der stärksten strukturierten Memory nicht nur schneller arbeiten.

Sie werden **konsequent und verantwortungsvoll** arbeiten. Sie werden die Teams sein, die nicht nur erklären können, was getan wurde, sondern auch warum es getan wurde – lange nachdem der Code geschrieben wurde.
