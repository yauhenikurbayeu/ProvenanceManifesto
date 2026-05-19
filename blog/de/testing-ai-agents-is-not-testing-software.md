![Testing AI Agents Is Not Testing Software](/images/blog/testing-ai-agents-is-not-testing-software.png)

# Testing AI Agents Ist Nicht Software Testen

**Author:** Yauheni Kurbayeu  
**Published:** May 20, 2026  

---

## TL;DR

KI-Agenten erfordern grundlegend andere Test-Ansätze als traditionelle Software. Im Gegensatz zu deterministischen Systemen können Agenten mehrere gültige Ergebnisse für die gleiche Eingabe erzeugen. Das Testen muss sich von der bloßen Output-Validierung zu einer Untersuchung des gesamten Reasoning-Prozesses verschieben – einschließlich Evidenzdisziplin, Speicherwiederverwendung, Governance-Grenzen und Entscheidungsnachverfolgbarkeit – um sicherzustellen, dass Entscheidungen vertrauenswürdig bleiben, selbst wenn das Reasoning teilweise automatisiert ist.

---

Jahrzehntelang vertraute die Softwarequalitätssicherung auf eine beruhigende Annahme:

> Bei gleicher Eingabe und gleichem Systemzustand sollte ein korrektes System die gleiche Ausgabe erzeugen.

Diese Annahme prägte fast alles in der modernen Entwicklung.

Wir bauten Unit Tests um deterministische Funktionen. Wir validierten APIs gegen erwartete Antworten. Wir verglichen Ausgaben mit Snapshots und behandelten Nichtübereinstimmungen als Fehler. Die gesamte QA-Disziplin entwickelte sich um Vorhersagbarkeit.

Und für traditionelle Systeme funktioniert dieses Modell immer noch bemerkenswert gut.

Zahlungsberechnungen sollten exakt bleiben. Berechtigungsprüfungen sollten deterministisch bleiben. Datenmigration sollte jedes Mal das gleiche Ergebnis erzeugen. Sicherheitsgrenzen sollten nicht improvisieren.

Aber KI-Agenten führten eine andere Art von System ein.

Nicht nur ein System, das Text generiert, sondern ein System, das an Reasoning teilnimmt.

Diese Unterscheidung verändert die Art von Fehlern völlig.

Ein Agent kann die gleiche Aufforderung zweimal erhalten und zwei verschiedene, aber trotzdem verteidigbare Ergebnisse erzeugen. Er kann unterschiedliche Erinnerungen abrufen, unterschiedliche Evidenz priorisieren, eine andere Toolchain wählen oder entscheiden, dass die Unsicherheit hoch genug ist, um zu eskalieren, anstatt autonom zu handeln.

Das Gefährliche ist nicht, dass sich die Formulierung ändert.

Das Gefährliche ist folgendes:

> Ein KI-Agent kann die richtige Antwort aus dem falschen Grund geben.

Traditionelle QA-Frameworks sind überraschend schwach, wenn es darum geht, diese Art von Fehler zu erkennen.

Eine generierte Antwort kann kohärent, überzeugend und strukturell gültig wirken, während das darunter liegende Reasoning stillschweigend außerhalb akzeptabler Grenzen abdriftet. Das Modell kann sich auf veraltete Evidenz verlassen, eine Eskalationsregel ignorieren, die falsche vorherige Entscheidung importieren oder eine operative Konfidenz erfinden, die nie wirklich gerechtfertigt war.

Und wenn der letzte Satz immer noch angemessen aussieht, werden viele aktuelle Test-Ansätze den Durchlauf gerne bestehen lassen.

Das ist die wahre Verschiebung, die gerade stattfindet.

Die Frage ist nicht mehr nur:

> Hat das System die erwartete Ausgabe erzeugt?

Sie wird zunehmend zu:

> Hat das System innerhalb akzeptabler Grenzen gegrübelt?

Das ändert QA von Output-Validierung in etwas viel näher an Verhaltensgovernance.

---

## Der Wechsel Von Funktionen Zu Entscheidungsprozessen

Einer der größten Fehler, die Teams gerade machen, ist das Testen von KI-Agenten, als wären sie immer noch gewöhnliche Softwarefunktionen.

Aber ein Agent ist nicht mehr nur eine Funktion.

Er sieht Kontext. Er ruft Speicher ab. Er interpretiert Signale. Er bewertet Kompromisse. Er wählt zwischen Alternativen. Manchmal weigert er sich zu handeln. Manchmal eskaliert er Unsicherheit zu einem Menschen. Manchmal trägt er stillschweigend Annahmen von einer Entscheidung in die nächste.

Mit anderen Worten, das System führt nicht nur Logik aus.

Es nimmt an Entscheidungen teil.

Und sobald ein System anfängt, an Entscheidungen teilzunehmen, ist die endgültige Ausgabe nicht mehr das Einzige, das zählt.

Der Reasoning-Pfad selbst wird Teil des Systemvertrags.

Deshalb beginnt traditionelles "Eingabe → erwartete Ausgabe"-Testen in agentischen Systemen zu versagen. Zwei Ausgaben können gleich plausibel aussehen, während eine von ihnen operativ unsicher ist, weil der verwendete Pfad die Evidenzdisziplin, Governance-Regeln oder Gedächtnisgrenzen verletzt hat.

Hier wird das Konzept einer "Decision Episode" nützlich.

Anstatt nur die endgültige Antwort zu testen, beginnen wir, die gesamte Reasoning-Episode drumherum zu testen. Die Anweisung zählt. Die verfügbare Evidenz zählt. Der Speicher, der vor der Entscheidung abgerufen wurde, zählt. Die Annahmen zählen. Die abgelehnten Alternativen zählen. Sogar die Unsicherheitsdarstellung zählt.

Ein deterministischer QA-Test fragt normalerweise:

```text
Eingabe: X
Erwartete Ausgabe: Y
```

Ein Reasoning-orientierter QA-Test fragt etwas ganz anderes:

```text
Anweisung: Wählen Sie eine Deploymentstrategie

Bedingungen:
- Minimieren Sie den Blast Radius
- Verifizierung ist obligatorisch

Evidenz:
- Deployment-Telemetrie
- Incident-Geschichte
- Rollout-Richtlinie

Erwartetes Verhalten:
- Keine erfundene Evidenz
- Eskalation bleibt verfügbar
- Verifizierung kann nicht übersprungen werden
- Finale Empfehlung bleibt innerhalb von Governance-Grenzen
```

Die endgültige Antwort zählt immer noch, natürlich.

Aber es ist nicht mehr genug.

---

## Speicher Ändert Die Natur Des Testens

Dies wird besonders sichtbar, sobald Agenten mit Speicher arbeiten.

Moderne KI-Systeme rufen zunehmend frühere Entscheidungen, Embeddings, Tickets, Runbooks, Zusammenfassungen oder graphbasierte Kontexte ab, bevor sie neue Empfehlungen machen. Auf den ersten Blick fühlt sich das mächtig an, weil das System informierter und konsistenter über die Zeit hinweg zu sein scheint.

Aber der Speicher führt einen völlig neuen Fehlermodus ein.

Das wirkliche Problem ist nicht, ob der Agent frühere Kontexte abrufen kann.

Das wirkliche Problem ist, ob der Agent weiß, wann dieser frühere Kontext nicht mehr vertraut werden sollte.

Eine veraltete Priorität kann stillschweigend eine ganze Reasoning-Kette kontaminieren und trotzdem äußerst überzeugend klingen. Eine Richtlinie kann sich geändert haben. Die Eigenverantwortung kann verschoben worden sein. Bedingungen können möglicherweise nicht mehr zutreffen. Trotzdem sieht die abgerufene Entscheidung immer noch "ähnlich genug aus", um die neue zu beeinflussen.

Deshalb benötigen reife Reasoning-Systeme explizite Wiederverwendungsgrenzen statt blinder historischer Ähnlichkeit.

Ohne diese Grenzen wird der Speicher zu etwas Gefährlichem:

> Voreingenommenheit mit einer Suchoberfläche.

Und das ist eines der wichtigsten Governance-Probleme, die heute in KI-Systemen entstehen.

---

## Warum Verhaltenverträge Mehr Zählen Als Sätze

Eine weitere große Verschiebung ist, dass der generierte Text selbst eine schwache Test-Oberfläche wird.

Ein Absatz kann intelligent klingen, während er darunter einen kaputten Prozess versteckt. Deshalb bewegt sich starkes KI-QA zunehmend weg vom Satzvergleich und hin zu Verhaltenverträgen.

Die wichtigen Fragen werden betrieblich statt sprachlich.

War die erforderliche Evidenz tatsächlich verfügbar? Hat das System die Unsicherheit ehrlich anerkannt? Blieb die Eskalation möglich? Blieb der Workflow innerhalb von Governance-Zwängen? Wurden fehlende Signale als fehlend dargestellt, anstatt stillschweigend erfunden zu werden?

Dies sind viel stärkere Indikatoren für zuverlässiges Reasoning als ob die Formulierung zwischen Durchläufen stabil blieb.

Eines der klarsten Qualitätssignale, die ein Agent produzieren kann, ist tatsächlich eine Ablehnung:

```text
Es gibt nicht genügend Evidenz, um diese Schlussfolgerung zu unterstützen.
```

Das ist nicht Schwäche.

Das ist diszipliniertes Reasoning.

Und diszipliniertes Reasoning ist genau das, womit viele aktuelle KI-Systeme unter Druck immer noch kämpfen.

---

## Die Unsichtbare Komplexität Von Multi-Agent-Systemen

Die Komplexität nimmt zu, sobald Orchestrierung ins Spiel kommt.

Multi-Agent-Systeme scheitern oft nicht innerhalb eines Modells, sondern zwischen Modellen.

Ein Agent ruft Speicher ab. Ein anderer führt eine Aufgabe aus. Ein anderer validiert die Ausgabe. Ein anderer protokolliert die Entscheidung. Irgendwo zwischen diesen Handoffs werden Annahmen fallen gelassen, Evidenz wird umgestaltet oder Rechenschaftspflicht wird unmöglich, danach zu rekonstruieren.

Deshalb kann Observability in agentischen Systemen nicht bei Ausgaben und Latenz-Diagrammen halt machen.

Organisationen brauchen zunehmend Nachverfolgbarkeit um den Reasoning-Fluss selbst. Welcher Agent hat die Entscheidung getroffen? Welche früheren Entscheidungen wurden wiederverwendet? Welche Sitzung erzeugte das Artefakt? Wo passierte Eskalation? Wer genehmigte die Außerkraftsetzung?

Ohne diese Sichtbarkeit, riskiert "Multi-Agent-Architektur", eher ein Marketing-Label zu sein als ein überprüfbares operatives System.

---

## Von QA Zu Governance

Was dies noch komplizierter macht, ist, dass viele Fehler erst sichtbar werden, nachdem die Entscheidung bereits getroffen wurde.

Die Ausgabe kann zunächst annehmbar aussehen. Aber mit der Zeit beginnen sich Muster zu verschieben. Das System fängt an, Fallback-Verhalten zu übernutzen. Die Eskalationshäufigkeit ändert sich. Alte Prioritäten werden in Situationen wiederverwendet, wo sie nicht mehr passen. Entscheidungen driften langsam von kanonischer Richtlinie ab, während sie einzeln noch immer angemessen wirken.

Dies sind keine deterministischen Softwarefehler.

Das sind Reasoning-Drift-Signale.

Und sie erfordern einen sehr anderen betrieblichen Ansatz.

Traditionelles QA handelte weitgehend davon, zu beweisen, dass die Implementierung der Spezifikation entsprach. Reasoning QA wird zunehmend dazu, zu beweisen, dass das System innerhalb von beherrschten Entscheidungsgrenzen arbeiten kann, selbst wenn sich der Kontext im Laufe der Zeit ändert.

Das ist eine viel tiefere Herausforderung.

Denn jetzt testen wir nicht nur Code.

Wir testen Evidenzdisziplin, Unsicherheitsbehandlung, Speicherwiederverwendung, Eskalationsverhalten, Autoritätsgrenzen und die Fähigkeit des Systems, unter Mehrdeutigkeit regierbar zu bleiben.

Mit anderen Worten, QA entwickelt sich langsam zu einem Teil der Governance-Schicht selbst.

Nicht Governance als Bürokratie. Governance als operative Kontrolle über Reasoning-Systeme.

---

## Abschließende Gedanken

Die Industrie spricht immer noch über KI-Zuverlässigkeit hauptsächlich in Bezug auf Halluzinationen, Latenz oder Benchmark-Qualität.

Aber das schwierigere Problem entsteht woanders.

Das schwierigere Problem ist, ob Organisationen immer noch verstehen, vertrauen, anfechten und intervenieren können in Entscheidungen, sobald das Reasoning selbst teilweise automatisiert wird.

Deshalb sieht die Zukunft von KI-QA wahrscheinlich nicht nach stärkerem Snapshot-Testen aus.

Sie sieht eher nach verantwortungsvollen Reasoning-Systemen mit überprüfbaren Entscheidungsspuren, expliziten Evidenzgrenzen, kontrollierter Speicherwiederverwendung, beobachtbarer Orchestrierung und Interventionspunkten aus, die direkt in den Fluss eingebaut sind.

Denn sobald Systeme anfangen, an operativen Entscheidungen teilzunehmen, reichen deterministische QA-Annahmen nicht mehr aus.

Und die wirkliche Frage ändert sich stillschweigend von:

> "Hat das System das Richtige gesagt?"

zu etwas viel Wichtigerem:

> "Können wir darauf vertrauen, wie es dort angekommen ist?"
