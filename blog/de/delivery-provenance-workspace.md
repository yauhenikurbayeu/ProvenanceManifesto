# Decision Provenance Assistant für Delivery Provenance Workspace

**Author:** Yauheni Kurbayeu  
**Published:** May 13, 2026

*Delivery-Gedächtnis in einen Management-Vermögenswert verwandeln.*

---

## TL;DR

> Delivery Manager verbringen zu viel Zeit damit, über Jira, GitHub, Slack, Teams, Besprechungsnotizen, E-Mails und menschliche Erinnerung hinweg zu rekonstruieren, warum Entscheidungen getroffen wurden. Delivery Provenance Workspace kann diese verborgenen Kosten in eine strategische Fähigkeit verwandeln, indem es einen Decision Provenance Assistant schafft: einen agentischen Management-Workflow, der Delivery-Entscheidungen mit Evidenz erfasst, abruft, validiert und erklärt.

Der Wert liegt nicht nur in schnellerer Suche. Der Wert liegt in **besserer Governance, schnellerem Onboarding, weniger wiederholten Debatten, klarerer Kundenkommunikation und sichererer KI-gestützter Delivery**.

## Der Moment, den jede Delivery-Führungskraft kennt

Das Steering-Meeting beginnt mit einer einfachen Frage.

> "Warum haben wir den EU-Release verschoben?"

Niemand ist von der Frage überrascht. Alle wissen, dass die Antwort irgendwo existiert. Sie könnte in einem Jira-Kommentar, einem Slack-Thread, einer Risikonotiz, einem Pull-Request-Review, einer Besprechungszusammenfassung oder in der Erinnerung eines Technical Leads liegen, der bereits auf einem anderen Projekt ist.

Der Delivery Manager öffnet die übliche Werkzeugkette. Zuerst Jira. Dann den Chatverlauf. Dann die Besprechungsnotizen. Dann GitHub. Dann vielleicht Confluence. Jemand prüft eine E-Mail-Kette. Jemand anderes erinnert sich daran, dass die Entscheidung mit einer Compliance-Sorge zusammenhing, kann sich aber nicht erinnern, ob diese Sorge validiert oder nur angenommen wurde.

Nach zwanzig oder dreißig Minuten hat das Team etwas, das wie eine Antwort aussieht.

Aber es ist nicht wirklich eine Antwort. Es ist eine Rekonstruktion.

Das ist die stille Steuer, die moderne Delivery-Organisationen zahlen. Die Arbeit ist nicht strategisch, aber das Ergebnis ist es. Der Delivery Manager sucht nicht einfach nur nach einem Dokument. Er versucht, die Logik hinter einer Entscheidung wiederherzustellen, die Scope, Kosten, Risiko, Kundenvertrauen und künftige Delivery-Entscheidungen beeinflussen kann.

Hier hat **Delivery Provenance Workspace** eine echte Chance.

Nicht, um ein weiterer Chatbot zu werden. Nicht, um noch mehr Dokumente zusammenzufassen. Nicht, um noch ein Dashboard hinzuzufügen.

> Die Chance besteht darin, der Ort zu werden, an dem Delivery-Entscheidungen zu Erinnerung werden.

## Das Managementproblem hinter „Decision Archaeology“

Die meisten IT-Organisationen verfolgen die Ausführung bereits mit beeindruckender Disziplin. Tickets werden verfolgt. Commits werden verfolgt. Stunden werden verfolgt. Kosten werden verfolgt. Releases, Incidents und Defects hinterlassen alle Spuren.

Doch die Begründung hinter diesen Spuren verschwindet oft.

| Was Organisationen gut verfolgen | Was oft verschwindet |
| --- | --- |
| Tickets, Commits, Stunden, Kosten | Absicht, Begründung, Annahmen, Verpflichtungen |
| Releases, Incidents, Defects | Warum ein Weg statt eines anderen gewählt wurde |
| Status, Verantwortlichkeit, Delivery-Fortschritt | Ob die ursprüngliche Entscheidung noch gültig ist |

Warum wurde eine Option gewählt und eine andere verworfen? Wer hat das Risiko akzeptiert? Welche Annahme ließ den Plan sicher erscheinen? Welche Kundenverpflichtung hat den Scope geprägt? Wurde die Entscheidung später validiert, ersetzt oder stillschweigend durch eine neuere Entscheidung widersprochen?

Diese Fragen sind für das Management wichtig, weil sie direkt unter der Delivery-Performance liegen. Wenn Entscheidungskontext verschwindet, wiederholen Teams Debatten. Neue Manager übernehmen Arbeit ohne die eigentliche Geschichte. Engineers öffnen bereits geklärte Trade-offs erneut. Account-Teams tun sich schwer zu erklären, warum sich die Richtung geändert hat. Führungskräfte erhalten Status, aber keine Lineage.

Das Ergebnis ist nicht nur verschwendete Zeit. Es ist **schwächere Kontrolle**.

Eine Organisation kann gut geführt wirken und trotzdem die kausale Geschichte ihrer eigenen Entscheidungen verlieren. Das ist das tiefere Risiko, das in [Warum SDLC kein Gedächtnis hat](/blog/why-sdlc-has-no-memory-and-why-delivery-teams-keep-paying-for-it) beschrieben wird: Delivery-Systeme bewahren Artefakte, aber nicht die Absicht, Verpflichtungen und Begründungen, die diese Artefakte geformt haben.

In stabilen Umgebungen war das schmerzhaft, aber tolerierbar. In KI-augmentierter Delivery wird es deutlich ernster. Die Ausführungsgeschwindigkeit steigt. Die Kosten für die Erstellung von Artefakten sinken. Der Engpass verschiebt sich von „können wir es bauen?“ zu „können wir noch erklären, warum dies das Richtige ist, das gebaut werden sollte?“

## Warum Suche allein das nicht löst

Viele Organisationen versuchen, dieses Problem mit besserer Suche oder Retrieval-Augmented Generation zu lösen. Das hilft, löst aber das Managementproblem nicht vollständig.

| Fähigkeit | Welche Frage sie beantwortet | Wo sie zu kurz greift |
| --- | --- | --- |
| Suche | „Wo wird dieses Thema erwähnt?“ | Sie findet Artefakte, nicht Begründungen. |
| Vektor-Retrieval | „Welche Fragmente wirken semantisch relevant?“ | Es findet Ähnlichkeit, nicht Kausalität. |
| Provenance | „Welche Entscheidung hat uns hierher geführt?“ | Es rekonstruiert Lineage, wenn Entscheidungen strukturiert sind. |

Aber Delivery-Führungskräfte stellen meist eine schwierigere Frage:

> „Welche Entscheidung hat uns hierher geführt, von welchen Annahmen hing sie ab, und ist sie noch gültig?“

Das ist kein Ähnlichkeitsproblem. Es ist ein Provenance-Problem.

Wie in [Von RAG zu Provenance](/blog/from-rag-to-provenance-how-we-realized-vector-alone-is-not-memory) untersucht, ist Relevanz nicht dasselbe wie Kausalität. Ein Dokument kann Billing, Release-Scope oder Datenresidenz erwähnen, aber das bedeutet nicht, dass es erklärt, was eine Entscheidung verursacht hat, was sie ersetzt hat, welches Risiko sie akzeptiert hat oder welche nachgelagerten Verpflichtungen betroffen waren.

Der Decision Provenance Assistant sollte Retrieval verwenden, aber nicht dort aufhören. Retrieval sollte den Einstiegspunkt finden. Provenance sollte die Geschichte rekonstruieren.

## Die vorgeschlagene Lösung

Der Decision Provenance Assistant für Delivery Provenance Workspace würde normale Delivery-Arbeit kontinuierlich in wiederverwendbares organisatorisches Gedächtnis verwandeln.

Er würde Delivery-Artefakte aus den Systemen beobachten oder aufnehmen, in denen Arbeit bereits stattfindet: Jira, GitHub, Slack oder Teams, Besprechungsnotizen, Projekt-Entscheidungsnotizen, Release-Records, Incident-Reports und kundenbezogene Verpflichtungen. Er würde Kandidatenentscheidungen extrahieren, sie mit Evidenz verknüpfen und nur Entscheidungen bewahren, die bedeutsam genug sind, um später relevant zu sein.

Die Kern-User-Experience kann sehr einfach bleiben.

Ein Delivery Manager fragt:

> "Warum wurde Offline-Unterstützung aus Meilenstein 1 ausgeschlossen, und ist diese Entscheidung noch sicher?"

Statt eines Stapels von Links gibt Delivery Provenance Workspace eine Entscheidungserklärung zurück.

| Zurückgegebener Kontext | Warum er wichtig ist |
| --- | --- |
| Entscheidung, Verantwortlicher und Datum | Stellt Verantwortlichkeit her. |
| Betrachtete Alternativen | Zeigt, was bewusst verworfen wurde. |
| Annahmen und akzeptierte Risiken | Macht verborgene Delivery-Logik sichtbar. |
| Evidenz-Links | Verankert die Antwort in Quellartefakten. |
| Validierungs- oder Ersetzungsstatus | Zeigt, ob die Entscheidung noch sicher wiederverwendet werden kann. |

Diese Antwort kann in einem Planungsmeeting, Steuerungsgremium, Kundengespräch, Eskalationsreview oder Onboarding-Termin verwendet werden. Der DM verbringt den ersten Teil des Gesprächs nicht mehr damit, die Historie wieder aufzubauen. Er kann mit einer strukturierten Erklärung starten und sich auf Urteilsvermögen konzentrieren.

Diese Unterscheidung ist wichtig. Der Assistent ersetzt den Delivery Manager nicht. Er nimmt die Last repetitiver Rekonstruktion weg, damit der Manager mehr Zeit dafür hat, Risiken zu steuern, Stakeholder auszurichten und bessere Entscheidungen zu treffen.

## Was das von einem generischen KI-Assistenten unterscheidet

| Generischer KI-Assistent | Decision Provenance Assistant |
| --- | --- |
| Fasst Inhalte zusammen | Bewahrt Entscheidungs-Lineage |
| Liefert relevante Fragmente | Rekonstruiert kausalen Kontext |
| Hilft bei einem Gespräch | Baut wiederverwendbares organisatorisches Gedächtnis auf |
| Optimiert für Antwortqualität | Optimiert für Evidenz, Verantwortlichkeit und Gültigkeit |

Das bedeutet, dass das System Entscheidungen als Delivery-Artefakte erster Klasse behandelt. Eine Entscheidung ist nicht nur ein Satz innerhalb einer Besprechungsnotiz. Sie ist ein Objekt mit einem Verantwortlichen, einer Begründung, Alternativen, Risiken, Annahmen, Evidenz, betroffenen Systemen, Lifecycle-Status und Review-Triggern.

Der Datensatz sollte die Fragen beantworten, die Manager später tatsächlich stellen. Warum haben wir diesen Weg gewählt? Was haben wir verworfen? Wovor hatten wir Sorge? Wer hat es freigegeben? Was hat sich seitdem verändert? Können wir es jetzt sicher rückgängig machen?

Dadurch wird der Assistent über ein einzelnes Gespräch hinaus nützlich. Jede validierte Entscheidung wird Teil des Gedächtnisses der Organisation. Künftige Menschen und künftige Agenten können sie als vorherigen Kontext abrufen. Sie können sie wiederverwenden, wenn die aktuelle Situation ähnlich ist, sie verfeinern, wenn sich Constraints geändert haben, oder sie überschreiben, wenn neue Evidenz stärker ist.

Das ist die praktische Bedeutung von „agentischem Bauchgefühl“. Wie in [Ihr Bauchgefühl ist keine Magie](/blog/gut-feeling-decision-provenance) diskutiert, ist das, was erfahrene Menschen Intuition nennen, oft komprimierte Entscheidungshistorie. Delivery Provenance Workspace kann diese Historie sichtbar, teilbar und auditierbar machen.

## Der Wert für Führungskräfte: weniger Reibung, mehr Kontrolle

Für IT-Führungskräfte liegt der Wert nicht nur in Produktivität. Produktivität ist der sichtbare Nutzen, aber Kontrolle ist der strategische.

Jede Stunde, die ein Delivery Manager mit der Rekonstruktion alter Entscheidungen verbringt, ist eine Stunde, die nicht mit dem Kunden verbracht wird, nicht in die Risikoprävention fließt und nicht zur Verbesserung der Delivery-Ergebnisse dient. In einer Delivery-Gruppe kann selbst eine konservative Rückgewinnung von zwei Stunden pro Woche und DM Hunderte Stunden jährlicher Kapazität schaffen. Das ist für sich genommen bereits ein nützlicher Business Case.

Der größere Wert zeigt sich jedoch, wenn Entscheidungs-Gedächtnis vermeidbares Managementversagen reduziert.

| Managementbereich | Erwartete Verbesserung |
| --- | --- |
| Wiederholte Debatten | Frühere Begründungen sind verfügbar. |
| Scope-Kontrolle | Verborgene Annahmen werden früher sichtbar. |
| Onboarding | Neue Personen übernehmen die echte Projekthistorie, nicht nur den Backlog. |
| Release-Sicherheit | Go/No-Go-Entscheidungen sind mit Evidenz, Risiken und Verpflichtungen verknüpft. |
| Kundenkommunikation | Manager können nicht nur erklären, was sich geändert hat, sondern warum. |

Deshalb gehört die Lösung in die Managementschicht. Sie ist keine technische Bequemlichkeit. Sie ist eine Verbesserung von Governance und Betriebsmodell.

Sie gibt Führungskräften eine Möglichkeit zu sehen, ob Delivery-Entscheidungen explizit, belegt, geprüft und weiterhin gültig sind.

## Agentische Delivery rechenschaftspflichtig machen

Es gibt noch einen weiteren Grund, warum das gerade jetzt wichtig ist.

Delivery Provenance Workspace wird nicht für eine Welt entworfen, in der KI nur bei Notizen hilft. Es wird für eine Welt entworfen, in der Agenten zunehmend an der Delivery-Ausführung teilnehmen. Sie fassen zusammen, analysieren, empfehlen, vergleichen, planen, klassifizieren und treffen manchmal bedeutende Workflow-Entscheidungen.

Das schafft eine neue Governance-Frage:

> Wenn ein KI-Agent Scope, Risikohaltung, Release-Empfehlung, Eskalationspriorität oder Delivery-Strategie beeinflusst, wohin geht diese Entscheidung dann?

Wenn die Antwort **„nirgendwo“** lautet, schaffen Organisationen stille KI-Entscheidungsfindung. Das Ergebnis mag poliert aussehen, aber der Begründungspfad bleibt unsichtbar.

Der Decision Provenance Assistant sollte deshalb bedeutende, von Agenten getroffene Entscheidungen als Kandidatenentscheidungen erfassen. Jeder Agent sollte offenlegen, was er entschieden hat, warum er es entschieden hat, welche Evidenz er verwendet hat, welche Alternativen er verworfen hat und welche früheren Entscheidungen ihn beeinflusst haben. Ein deterministischer Schwellenwert entscheidet dann, ob der Kandidat dauerhafte Provenance verdient.

Dadurch werden zwei schlechte Extreme vermieden. Das System protokolliert nicht jede Mikroaktion und ertränkt Manager nicht in Rauschen. Es erlaubt aber auch nicht, dass Entscheidungen von Agenten mit hoher Wirkung in flüssigen Zusammenfassungen verschwinden.

Der in [Von Prototyp zu Präzision](/blog/decision-provenance-threshold) untersuchte Entscheidungsschwellenwert ist der zentrale Kontrollmechanismus. Er fragt, ob die Entscheidung genügend Wirkung, Unsicherheit, Trade-off-Intensität, Reversibilitätskosten oder Langlebigkeit hat, um erinnerungswürdig zu sein. Compliance-, Datenschutz-, Sicherheits-, Finanz-, Rechts-, Eskalations- und explizite Freigabegrenzen sollten selbst dann protokolliert werden, wenn die numerische Bewertung moderat ist.

Für Führungskräfte schafft das eine Rechenschaftsschicht rund um agentische Arbeit. Es wird möglich zu fragen, welcher Agent welche bedeutende Entscheidung unter welchem Kontext, auf Basis welcher Evidenz getroffen hat und ob ein Mensch sie validiert hat.

> Das ist keine Bürokratie. Das ist operative Nachvollziehbarkeit für das KI-Zeitalter.

## Ein praktisches Beispiel: Scope, bevor er zu Nacharbeit wird

Betrachten wir ein mobiles Dokumentenprüfungs-Feature, das für den ersten Meilenstein geplant ist. Die Spezifikation schweigt zur Offline-Unterstützung. Das Team muss die Planung diese Woche abschließen.

In einem traditionellen Workflow könnte das Team eine implizite Annahme treffen. Vielleicht wird Offline-Unterstützung ausgeschlossen. Vielleicht wird schreibgeschützte Offline-Unterstützung informell hinzugefügt. Vielleicht wird vollständiges Offline-Editing erwogen, aber im Gespräch verworfen. Wenn der Kunde später Offline-Unterstützung vom ersten Tag an erwartet hat, absorbiert das Team Nacharbeit und der Delivery Manager muss erklären, warum das Missverständnis passiert ist.

Mit dem Decision Provenance Assistant erkennt Delivery Provenance Workspace dies als eine Scope-prägende Entscheidung. Die Spezifikation ist unvollständig. Es gibt mehrere Optionen. Die Auswirkungen auf nachgelagerte Architektur und Tests können erheblich sein. Eine späte Korrektur wäre teuer.

Der Assistent ruft ähnliche frühere Entscheidungen ab, prüft die aktuellen Artefakte, vergleicht Alternativen und schlägt einen Entscheidungsdatensatz vor. Er kann empfehlen, Offline-Unterstützung aus Meilenstein 1 auszuschließen, sofern der PM nicht vor Implementierungsbeginn etwas anderes bestätigt. Er fügt die Begründung, die verworfenen Alternativen, das akzeptierte Risiko und den Review-Trigger bei.

Wichtig ist nicht, dass KI den Scope wählt.

> Wichtig ist, dass die verborgene Annahme sichtbar wird, bevor sie sich in Nacharbeit verwandelt.

Der PM oder Delivery Manager besitzt die Entscheidung weiterhin. Der Assistent schafft Erinnerung, Evidenz und den Review-Moment.

Genau das ist die Art von Managementhebel, die IT-Organisationen brauchen. Nicht mehr Automatisierung um ihrer selbst willen, sondern ein früheres Sichtbarwerden von Entscheidungen, die sonst implizit geblieben wären.

## Warum Delivery Provenance Workspace die richtige Arbeitsoberfläche ist

Delivery Manager brauchen kein weiteres entkoppeltes Enterprise-Portal. Ihre Arbeit überschreitet bereits zu viele Systeme. Der Wert von Delivery Provenance Workspace besteht darin, dass es zu einer fokussierten Arbeitsoberfläche über fragmentierten Delivery-Kontext hinweg werden kann.

Ein Workspace-Assistent kann den Manager im Arbeitsfluss unterstützen.

| Manager-Moment | Workspace-Aktion |
| --- | --- |
| Während eines Meetings | Beantworten, warum eine Entscheidung getroffen wurde. |
| Vor einem Steering-Call | Eine Kurzfassung zu Entscheidungen, Risiken und veralteten Annahmen vorbereiten. |
| Wenn eine Scope-Änderung auftaucht | Sie mit früheren Verpflichtungen und aktiven Risiken vergleichen. |
| Wenn ein Agent eine Empfehlung mit hoher Wirkung ausspricht | Die Entscheidung zur menschlichen Prüfung weiterleiten. |

Es geht nicht darum, jedes Tool in einer Oberfläche zu zentralisieren. Es geht darum, dem Delivery Manager eine entscheidungsbewusste Schicht oberhalb der Werkzeuge zu geben.

Die zugrunde liegenden Quellsysteme bleiben weiterhin wichtig. Jira bleibt Jira. GitHub bleibt GitHub. Besprechungsnotizen bleiben Besprechungsnotizen. Delivery Provenance Workspace fügt die fehlende Schicht hinzu: strukturiertes Gedächtnis darüber, warum sich Delivery so entwickelt hat, wie sie es tat.

## Das Pilotprojekt sollte eng gefasst und messbar sein

Die erste Version sollte nicht versuchen, jeden Management-Workflow zu modellieren. Sie sollte sich auf eine Frage konzentrieren, die jede Delivery-Organisation versteht:

> „Warum haben wir X entschieden, und ist diese Entscheidung noch gültig?“

Diese Frage ist eng genug für ein MVP und wertvoll genug für ein echtes Pilotprojekt.

Ein sechs- bis achtwöchiges Pilotprojekt auf einem Delivery-Stream würde ausreichen, um zu messen, ob der Assistent den Arbeitsrhythmus verändert.

| Pilotmetrik | Was sie beweist |
| --- | --- |
| Zeit zur Beantwortung historischer Entscheidungsfragen | Ob Entscheidungsabruf schneller wird. |
| Wöchentliche DM-Zeit für Rekonstruktion | Ob Managementkapazität zurückgewonnen wird. |
| Anzahl wiederholter Debatten | Ob frühere Begründungen tatsächlich wiederverwendbar sind. |
| Bedeutende Entscheidungen mit erfassten Alternativen und Risiken | Ob die Entscheidungsqualität steigt. |
| Entscheidungen von Agenten mit hoher Wirkung und Trace-IDs samt Review-Status | Ob agentische Delivery auditierbar ist. |

Das erwartete Ergebnis sollte praktisch statt theatralisch sein. Der Assistent sollte die Zeit zur Entscheidungsrekonstruktion von mehreren Dutzend Minuten auf wenige Minuten reduzieren. Er sollte bedeutende Entscheidungen vollständiger machen. Er sollte veraltete oder widersprüchliche Annahmen früher sichtbar machen. Er sollte Managern besseres Material für Kunden- und Steering-Gespräche liefern.

Wenn diese Ergebnisse in einem Stream sichtbar werden, ist der Fall für eine Ausweitung naheliegend.

## Der Rollout-Pfad

1. **Entscheidungsabruf.** Delivery Provenance Workspace ruft bestehende Entscheidungshistorie mit Evidenz-Links ab und erklärt sie. Das schafft unmittelbaren Wert, ohne dass Teams sofort jeden Prozess ändern müssen.

2. **Provenance-Erfassung.** Der Assistent extrahiert Kandidatenentscheidungen aus neuer Arbeit, wendet einen Entscheidungsschwellenwert an und stellt bedeutende Datensätze zur menschlichen Prüfung bereit. An diesem Punkt beginnt Delivery-Gedächtnis als Nebeneffekt normaler Arbeit zu entstehen.

3. **Graphbasiertes Gedächtnis und Drift-Erkennung.** Entscheidungen, Risiken, Annahmen, Artefakte, Systeme, Verantwortliche, Releases und Incidents werden verknüpft. Der Assistent kann dann erkennen, wenn eine neue Entscheidung mit früherem Gedächtnis kollidiert, eine Freigabegrenze umgeht, veraltete Evidenz nutzt oder stillschweigend von ähnlichen früheren Entscheidungen abweicht.

4. **Teamübergreifendes Lernen.** Sobald genügend Entscheidungs-Gedächtnis vorhanden ist, kann die Organisation weitergehende Fähigkeiten aufbauen: Überwachung von Scope Drift, Hinweise zur Release-Bereitschaft, Prognosen für Abhängigkeiten, Kurzbriefings zum Meilensteinzustand, Lernschleifen für Retrospektiven und portfolioweite Entscheidungsanalysen.

Jeder Schritt baut auf demselben Fundament auf. Die Organisation kauft kein Feature. Sie baut eine Gedächtnisschicht.

## Der strategische Punkt

KI wird die Ausführung weiterhin beschleunigen. Sie wird mehr Code, mehr Zusammenfassungen, mehr Pläne, mehr Empfehlungen und mehr Delivery-Artefakte erzeugen. Das geschieht bereits.

Die Managementfrage lautet, ob Organisationen auch besser darin werden, die Begründung hinter diesem Output zu bewahren.

Wie in [KI wird das Was übernehmen, aber Menschen müssen das Warum verantworten](/blog/ai-will-take-the-what-but-humans-must-own-the-why) argumentiert, verschiebt sich die strategische Ebene der Delivery in Richtung Absicht, Urteilsvermögen und Rechenschaftspflicht. Wenn das „Was“ billiger wird, wird das „Warum“ wertvoller.

Der Decision Provenance Assistant ist ein praktischer Weg, dieses „Warum“ innerhalb der täglichen Delivery-Arbeit zu schützen.

Er hilft Delivery Managern, sich schneller zu bewegen, ohne die Kontrolle zu verlieren. Er hilft Führungskräften, KI-gestützte Delivery zu skalieren, ohne Rechenschaftspflicht unsichtbar zu machen. Er hilft Teams, Entscheidungskapital zu bewahren, statt Kontext immer wieder aus Fragmenten neu aufzubauen.

Das wichtigste Versprechen ist einfach:

> Wenn jemand fragt, warum eine Delivery-Entscheidung getroffen wurde, sollte die Organisation keine Archäologie benötigen.
>
> Sie sollte Gedächtnis haben.
