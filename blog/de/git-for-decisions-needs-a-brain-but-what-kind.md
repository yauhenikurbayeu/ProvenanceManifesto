![Git for Decisions Needs a Brain, But What Kind?](/images/blog/git_for_decisions_needs_a_brain_but_what_kind.png)

# Git für Entscheidungen braucht ein Gehirn – aber welches?

**Author:** Yauheni Kurbayeu  
**Published:** Mar 4, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/git-decisions-needs-brain-what-kind-yauheni-kurbayeu-pzc9c/?trackingId=8QfsKWcXmBSVGbckPOYlOA%3D%3D)**

In den letzten Monaten habe ich an etwas gearbeitet, das als Gedankenexperiment begann und sich langsam zu einem echten System entwickelt hat. Ich nenne es **SDLC Memory**. Die Idee dahinter ist einfach, fast schon peinlich offensichtlich, sobald man sie laut ausspricht: Softwareorganisationen haben kein Gedächtnis.

Wir haben Git für Code. Wir haben Jira für Aufgaben. Wir haben Dokumentationssysteme voller Erklärungen, die im Nachhinein geschrieben werden.  
Aber die eigentliche Begründung hinter technischen Entscheidungen verschwindet fast immer.

Ein paar Monate später kommt jemand Neues ins Team, öffnet ein Repository, schaut sich ein seltsames Stück Architektur an und stellt die unvermeidliche Frage:

> „Warum haben wir das so gebaut?“

Die übliche Antwort ist eine Mischung aus Vermutungen und vagen Erinnerungen. Jemand erinnert sich an einen Produktionsvorfall. Jemand anderes glaubt, es habe etwas mit Skalierung zu tun gehabt. Eine dritte Person erinnert sich vage an eine Diskussion über Compliance. Keine dieser Erklärungen ist falsch, aber keine ist wirklich zuverlässig.

Genau hier wurde die Idee von **Git for Decisions** geboren.

Stellen Sie sich vor, jede wichtige Diskussion, jede Meeting-Notiz und jedes Architekturgespräch könnte in strukturierte Artefakte übersetzt werden. Ein Entscheidungs-Knoten, der erklärt, was beschlossen wurde. Ein Risiko-Knoten, der beschreibt, was schiefgehen könnte. Ein Annahmen-Knoten, der festhält, was alle zu diesem Zeitpunkt glaubten. Fragen, die noch ungelöst waren. Action Items, die daraus entstanden.

Anstatt in Slack-Threads und Meeting-Aufzeichnungen zu verschwinden, würden diese Artefakte einen Graphen bilden. Mit der Zeit würde das System eine lebendige Karte des technischen Denkens aufbauen. Wenn eine neue Entscheidung erscheint, könnte das System sie mit historischen vergleichen und etwa Folgendes sagen:

> „Vor zwei Monaten hat das Team beschlossen, den EU-Rollout zu verschieben, weil Instabilität der Infrastruktur ein operatives Risiko darstellte. Heute schlägt eine neue Entscheidung erneut eine Verschiebung vor, diesmal aufgrund neuer GDPR-Interpretationen. Diese Entscheidungen könnten zusammenhängen.“

Je tiefer ich diese Idee erforschte, desto realistischer erschien sie technisch. Moderne LLMs sind überraschend gut darin, strukturierte Bedeutung aus chaotischen Gesprächen zu extrahieren. Graphdatenbanken sind hervorragend darin, Entitäten und Beziehungen zu verbinden. Vektorsuche funktioniert gut, um semantisch ähnliche Entscheidungen über die Zeit hinweg zu identifizieren.

Die Architektur begann sich fast von selbst zu formen: Text aufnehmen, Artefakte extrahieren, Identitäten auflösen, sie mit dem bestehenden Graphen verknüpfen, Widersprüche erkennen und das Update als neue Transaktion committen.

Doch dann stieß ich auf ein Problem, das ich nicht erwartet hatte.

Die eigentliche Herausforderung bestand nicht darin, Wissen zu extrahieren.

Die eigentliche Herausforderung war zu entscheiden, **wie das System selbst denken sollte**.

Es gibt mindestens drei grundlegend unterschiedliche Möglichkeiten, das Laufzeitverhalten eines solchen Systems zu gestalten, und jede führt zu einer völlig anderen Philosophie darüber, wie KI innerhalb von Softwareentwicklungs-Workflows arbeiten sollte.

## Ansatz 1: Agentischer Laufzeit-Flow (LLM als Controller)

Der erste Ansatz ist das, was viele **agentische Architektur** nennen.

In diesem Modell verhält sich das System fast wie ein Ermittler. Der Prozess beginnt, wenn neue Meeting-Notizen oder Architekturgespräche in die Pipeline gelangen. Ein Agent liest den Text und extrahiert mögliche Entscheidungen und Fragen. Danach betrachtet er den bestehenden Graphen und entscheidet, welche Teile relevant sein könnten.

Angenommen, das System liest eine Notiz wie:

> „Wir sollten die Veröffentlichung der EU-Instanz verschieben, weil neue GDPR-Klarstellungen Compliance-Risiken einführen.“

Ein agentisches System könnte darauf reagieren, indem es den Graphen untersucht. Es könnte nach früheren Entscheidungen zur EU-Infrastruktur suchen, die Entscheidung über die Verschiebung des Rollouts aufgrund instabiler Infrastruktur abrufen, verbundene Risiken analysieren und die zeitliche Abfolge der Entscheidungen rund um diese Veröffentlichung untersuchen.

Irgendwann könnte das System entscheiden, dass genügend Beweise vorliegen, und ein Update vorschlagen:

> „Eine neue Entscheidung scheint mit einer früheren Verpflichtung zu kollidieren, dass die EU-Instanz vor Q2 live gehen muss.“

Das Schöne an diesem Ansatz ist, dass sich das System fast wie ein neugieriger Ingenieur verhält. Es folgt Spuren, erkundet Kontext und entdeckt manchmal Beziehungen, die Entwickler selbst nie explizit im Workflow kodiert haben.

Doch diese Flexibilität bringt eine unangenehme Erkenntnis mit sich. In einem agentischen System entscheidet die KI selbst, **was sie untersucht und wann sie mit der Untersuchung aufhört**. Für einen Assistenten oder ein Recherche-Tool ist das vielleicht akzeptabel. Wenn das System jedoch die autoritative Erinnerung technischer Entscheidungen verwalten soll, wird Unvorhersehbarkeit plötzlich zu einem ernsthaften Problem.

Deshalb geht die zweite Architekturphilosophie in die entgegengesetzte Richtung.

## Ansatz 2: Python kontrolliert den Flow, LLM und Embedding-Modelle sind nur Transformer

Anstatt das Modell als autonomen Agenten zu behandeln, betrachten wir es lediglich als Datentransformer. Die eigentliche Intelligenz des Systems liegt dann in den deterministischen Teilen des Codes.

In dieser Variante orchestriert Python die gesamte Pipeline unter strenger Kontrolle. Wenn ein neuer Text eingeht, führt das Runtime-System eine feste Abfolge von Operationen aus. Zuerst werden mögliche Kandidatenknoten aus dem Graphen mithilfe von Vektorsimilarität abgerufen. Danach wird ihr Kontext aus Neo4j geladen. Erst wenn die relevanten Beweise zusammengestellt sind, wird das Sprachmodell aufgerufen.

Zu diesem Zeitpunkt erhält das Modell ein sorgfältig vorbereitetes Informationspaket und eine sehr präzise Frage: Basierend auf diesen Artefakten und diesen Kandidaten — handelt es sich um dieselbe Entscheidung, eine verwandte oder einen komplett neuen Knoten?

Das Modell liefert strukturierte Ausgabe – und nichts weiter. Es kann den Graphen nicht selbst durchsuchen. Es kann keine zusätzlichen Informationen abrufen. Es kann nicht entscheiden, eine weitere Suche auszuführen. Es transformiert lediglich die gegebenen Eingaben in eine strukturierte Schlussfolgerung.

Aus Sicht der Softwareentwicklung fühlt sich dieser Ansatz äußerst komfortabel an. Jeder Schritt ist deterministisch. Jede Graphabfrage ist kontrolliert. Das System verhält sich eher wie eine Compiler-Pipeline als wie ein KI-Agent.

Doch auch hier entsteht eine unbequeme Frage. Wenn wir das Modell auf einen reinen Transformer reduzieren, nutzen wir dann nicht zu wenig von den eigentlichen Fähigkeiten dieser Modelle? Schließlich besteht ein Teil des Versprechens von KI darin, Verbindungen zu erkennen, die unsere handgeschriebenen Regeln möglicherweise übersehen.

Damit kommen wir zum dritten Ansatz, der versucht, beide Welten zu verbinden.

## Ansatz 3: Hybridmuster – KI als Transformer nutzen, aber Python-gesteuerte Verzweigungen basierend auf Confidence-Signalen erlauben

Das hybride Modell beginnt mit einer deterministischen Pipeline, erlaubt dem System jedoch, neugieriger zu werden, wenn Unsicherheit entsteht. Die Runtime kontrolliert weiterhin den Hauptworkflow. Sie ruft Kandidatenknoten ab und konstruiert Evidenzpakete, bevor sie das Modell um eine Analyse bittet.

Wenn das Modell jedoch niedrige Sicherheit oder mehrdeutige Übereinstimmungen meldet, erweitert die Pipeline ihren Suchraum. Das System könnte eine größere Menge potenzieller Entscheidungen abrufen, die Nachbarschaft eines möglichen Knotens im Graphen untersuchen oder das Zeitfenster erweitern, um ältere Architekturgespräche einzubeziehen.

Mit anderen Worten: Das System bleibt vom Code gesteuert, darf aber tiefer graben, wenn die Situation es erfordert.

Ein praktisches Beispiel könnte so aussehen. Das System liest eine Diskussion, in der vorgeschlagen wird, ein EU-Deployment zu verschieben, weil sich rechtliche Anforderungen geändert haben. Die deterministische Pipeline ruft die ähnlichsten historischen Entscheidungen ab. Das Modell analysiert sie, meldet jedoch geringe Sicherheit, weil die Beweise nicht eindeutig sind.

Daraufhin erweitert die Runtime die Suche und ruft Entscheidungen ab, die sowohl mit Compliance als auch mit Infrastrukturstabilität zusammenhängen. Erst danach erkennt das System, dass der neue Vorschlag tatsächlich mit zwei früheren Entscheidungen verbunden ist, die unterschiedliche Motivationen hatten.

Dieser Ansatz wirkt weniger starr als das Transformer-Modell, aber deutlich kontrollierter als der agentische.

## Und genau hier liegt mein aktuelles Dilemma.

Jedes Mal, wenn ich das Problem durch die Brille von Governance und Auditierbarkeit betrachte, scheint die deterministische Transformer-Pipeline die verantwortungsvolle technische Wahl zu sein. Ein System, das organisatorisches Gedächtnis verwaltet, sollte vorhersehbar, testbar und reproduzierbar sein.

Doch jedes Mal, wenn ich über die mögliche Intelligenz des Systems nachdenke, wird die agentische Architektur unglaublich verlockend. Die Fähigkeit, Kontext dynamisch zu erkunden, könnte Beziehungen in der Entscheidungsgeschichte aufdecken, die keine deterministische Retrieval-Regel jemals finden würde.

Das Hybridmodell liegt irgendwo dazwischen, aber selbst dieser Mittelweg verbirgt schwierige Trade-offs.

Welche Verhaltensweisen sollten deterministisch sein? Welche adaptiv? Wo ziehen wir die Grenze zwischen Exploration und Kontrolle?

Genau diese Frage begleitet mich derzeit beim Bau von Git for Decisions.

Wenn wir ein System schaffen wollen, das die Begründungen hinter Softwarearchitektur speichert – **wie viel eigenes Denken sollten wir diesem System erlauben?**

Sollte es sich wie ein autonomer Ermittler verhalten, der den Entscheidungsgraphen erkundet, bis er eine Hypothese bildet?

Sollte es sich wie eine disziplinierte Compiler-Pipeline verhalten, die Eingaben streng kontrolliert verarbeitet?

Oder sollte es einen vorsichtigen Kompromiss zwischen Neugier und Governance versuchen?

Im Moment bin ich ehrlich gesagt noch unentschlossen.

Und da viele der interessantesten Einsichten über Softwarearchitektur eher aus kollektiver Diskussion als aus einsamem Nachdenken entstehen, bin ich neugierig, wie andere dieses Problem angehen würden.

Wenn Sie ein System entwerfen würden, das zum langfristigen Gedächtnis technischer Entscheidungen wird – welcher Architektur würden Sie mehr vertrauen?
