# Warum Entscheidungen zu einem First-Class-Artefakt werden müssen

![Why Decisions Must Become a First-Class Artifact](/images/blog/why_decisions_first_class_artifact.png)

**Author:** Yauheni Kurbayeu  
**Published:** Mar 14, 2026  

------------------------------------------------------------------------

Während des größten Teils der Geschichte der Softwareentwicklung **befanden sich Entscheidungen an einem seltsamen Ort.** Sie beeinflussen alles, was wir bauen, existieren jedoch selten als Artefakte des Systems selbst. Sie entstehen in Gesprächen, Design-Reviews, Slack-Threads und Architekturmeetings. Manchmal erscheint eine Zusammenfassung in einem Dokument, doch häufiger löst sich die zugrunde liegende Begründung still im täglichen Ablauf der Lieferung auf.


> **Was bleibt, ist nicht die Entscheidung selbst, sondern das Ergebnis dieser Entscheidung.**


Wir bewahren den **Code**, die **Architektur**, die **Infrastruktur**, die **APIs** und die **Dokumentation**. Diese Artefakte beschreiben *was das System geworden ist*, erklären jedoch selten *warum es so geworden ist*. Viele Jahre lang schien dies kein ernsthaftes Problem zu sein, vor allem weil sich technologische Umgebungen in einem relativ beherrschbaren Tempo entwickelten. Systeme konnten über lange Zeiträume stabil bleiben, und die ursprünglichen Überlegungen hinter ihrem Design mussten selten erneut betrachtet werden.


## Die Annahme, die gerade zerbricht

**Diese Annahme beginnt nun zu zerbrechen.**


Im **KI-augmentierten Zeitalter** verändert sich die Umgebung unserer Systeme weit schneller als früher. Frameworks entwickeln sich schneller, Infrastrukturmöglichkeiten verschieben sich, regulatorische Einschränkungen entstehen und verschwinden wieder, und neue KI-getriebene Werkzeuge verändern ständig die Ökonomie der Softwareentwicklung. Während sich dieses Tempo beschleunigt, beginnen die Artefakte, die wir einst für dauerhaft hielten, deutlich schneller zu altern.


Architekturen, die vor zwei Jahren optimal waren, wirken plötzlich unnötig komplex. Einschränkungen, die einst bestimmte Designentscheidungen erzwangen, verschwinden still. Plattformbegrenzungen, die die ursprüngliche Implementierung geprägt haben, sind nicht mehr relevant. Wenn Organisationen auf solche Momente des Wandels stoßen, stellen sie oft fest, dass sie zwar noch das Artefakt besitzen, jedoch nicht mehr die Begründung, die es hervorgebracht hat.


> **Sie erinnern sich daran, was sie gebaut haben, können jedoch nicht mehr klar erklären, warum sie es genau so gebaut haben.**


Ohne diese Begründung wird Weiterentwicklung unsicher. Teams zögern, Systeme zu verändern, weil sie vermuten, dass unsichtbare Einschränkungen weiterhin existieren könnten. Ingenieure erben Architekturentscheidungen, deren Trade-offs nicht mehr verstanden werden. Mit der Zeit verwandelt sich das System langsam in etwas, das jedem erfahrenen Entwickler bekannt ist: eine technologische Struktur, die noch funktioniert, deren Ursprung jedoch weitgehend vergessen ist.


> **In vielen Fällen ist das eigentliche intellektuelle Kapital der Organisation bereits verschwunden.**


Der wahre Wert war nie das Artefakt selbst. Es war die **Kette der Überlegungen, die es hervorgebracht hat**: die Annahmen, die zu diesem Zeitpunkt als gültig betrachtet wurden, die Einschränkungen, die die Architektur formten, die Alternativen, die verworfen wurden, und die Risiken, die die endgültige Entscheidung beeinflussten. Wenn diese Begründung verschwindet, wird das Artefakt zu **einer eingefrorenen Momentaufnahme früheren Denkens**.


## Eine einfache historische Analogie

Die Menschheitsgeschichte bietet eine einfache Analogie, die diese Unterscheidung leichter verständlich macht.

Über Jahrhunderte hinweg hat die Menschheit eine ganze Abfolge von Transporttechnologien geschaffen:

-   das Rad
-   die Kutsche
-   das Automobil
-   das Flugzeug
-   die Rakete

Auf den ersten Blick scheinen dies getrennte Erfindungen aus völlig unterschiedlichen technologischen Epochen zu sein. Wenn wir jedoch genauer hinschauen, stellen wir fest, dass sie alle Variationen derselben grundlegenden Entscheidung darstellen.


> **Menschen wollten sich schneller und effizienter von einem Ort zum anderen bewegen.**


Die Entscheidung blieb konstant, während sich die Implementierungen mit dem technologischen Fortschritt weiterentwickelten. Die Kutsche verschwand nicht, weil die zugrunde liegende Idee falsch war; sie verschwand, weil bessere Wege entstanden, dieselbe Absicht umzusetzen. Hätten Historiker nur das physische Design der Kutsche bewahrt und die dahinterliegende Begründung verloren, wäre dieses Artefakt irgendwann nichts weiter als ein Museumsstück.



> **Die zugrunde liegende Begründung jedoch erzeugt weiterhin neue Lösungen.**



Diese Unterscheidung wird im Zeitalter der künstlichen Intelligenz noch wichtiger. KI-Systeme reduzieren die Kosten für die Produktion von Artefakten drastisch. Code kann in Minuten generiert werden. Architekturen können automatisch vorgeschlagen werden. Infrastrukturkonfigurationen können mit zunehmendem Automatisierungsgrad zusammengestellt werden. Während die Kosten für die Erzeugung des **Was** weiter sinken, steigt der relative Wert des **Warum**.



Und dennoch behandeln die meisten Organisationen die zugrunde liegende Begründung weiterhin als etwas Vorübergehendes, etwas, das nur im Moment der Diskussion existiert.



Wenn KI die Produktion von Systemen beschleunigt, benötigen Organisationen eine neue Fähigkeit: die Fähigkeit, die Begründung hinter diesen Systemen zu bewahren. Anstatt nur die finalen Artefakte zu speichern, werden wir Systeme benötigen, die Entscheidungen selbst als strukturierte Entitäten erfassen. Diese Systeme würden die Annahmen, Einschränkungen, Trade-offs, Risiken und alternativen Wege festhalten, die das Ergebnis geprägt haben.



> **Mit anderen Worten: Die Softwareentwicklung wird eine Gedächtnisschicht für Entscheidungen benötigen.**



Sobald Entscheidungen zu First-Class-Artefakten werden, verändert sich etwas Grundlegendes. Wenn sich die Umgebung weiterentwickelt, sind wir nicht mehr gezwungen, die Begründung hinter dem System durch Archäologie und Spekulation neu zu entdecken. Stattdessen können wir zur ursprünglichen Entscheidung zurückkehren, die Annahmen aktualisieren, die nicht mehr gültig sind, und die Implementierung so neu generieren, dass sie den neuen Kontext widerspiegelt.



Dieser Ansatz verwandelt Systeme von statischen Strukturen in etwas, das eher **lebenden Designs** ähnelt. Das Artefakt kann sich wiederholt verändern, während sich Technologien weiterentwickeln, doch die Begründung, die diese Veränderungen antreibt, bleibt sichtbar und nachvollziehbar.



In einer KI-augmentierten Welt werden die widerstandsfähigsten Organisationen nicht unbedingt diejenigen sein, die heute die elegantesten Architekturen besitzen. Es werden diejenigen sein, die die intellektuelle Herkunft dieser Architekturen bewahren und ihnen erlauben, sich kontinuierlich weiterzuentwickeln, während sich die Umgebung verändert.



Architekturen können altern, Frameworks können verschwinden, und Infrastruktur kann ersetzt werden – doch Entscheidungen können sich weiterentwickeln, solange ihre Begründung sichtbar bleibt.



> **Und sobald das Warum bewahrt ist, kann das Was jederzeit neu aufgebaut werden.**