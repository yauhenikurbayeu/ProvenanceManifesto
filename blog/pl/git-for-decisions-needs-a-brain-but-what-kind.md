![Git for Decisions Needs a Brain, But What Kind?](/images/blog/git_for_decisions_needs_a_brain_but_what_kind.png)

# Git for Decisions potrzebuje mózgu. Ale jakiego?

**Author:** Yauheni Kurbayeu  
**Published:** Mar 4, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/git-decisions-needs-brain-what-kind-yauheni-kurbayeu-pzc9c/?trackingId=8QfsKWcXmBSVGbckPOYlOA%3D%3D)**

Przez ostatnie kilka miesięcy budowałem coś, co zaczęło się jako eksperyment myślowy, a powoli zmieniło się w realny system. Nazywam to **SDLC Memory**. Idea stojąca za tym jest prosta, wręcz zawstydzająco oczywista, kiedy wypowie się ją na głos: organizacje tworzące oprogramowanie nie mają pamięci.

Mamy Git do kodu. Mamy Jira do zadań. Mamy systemy dokumentacji pełne wyjaśnień pisanych po fakcie.  
Ale rzeczywiste uzasadnienie stojące za decyzjami inżynieryjnymi prawie zawsze znika.

Kilka miesięcy później ktoś nowy dołącza do zespołu, otwiera repozytorium, patrzy na dziwny fragment architektury i zadaje nieuniknione pytanie:

> „Dlaczego zbudowaliśmy to właśnie w ten sposób?”

Typowa odpowiedź to mieszanka domysłów i mglistych wspomnień. Ktoś pamięta incydent produkcyjny. Ktoś inny uważa, że chodziło o skalowanie. Trzecia osoba mgliście przypomina sobie rozmowę o compliance. Żadne z tych wyjaśnień nie jest błędne, ale żadne też nie jest naprawdę wiarygodne.

Właśnie w tym miejscu narodził się pomysł **Git for Decisions**.

Wyobraźmy sobie, że każda ważna dyskusja, notatka ze spotkania i rozmowa architektoniczna mogłaby zostać przetłumaczona na ustrukturyzowane artefakty. Węzeł decyzji wyjaśniający, co zostało wybrane. Węzeł ryzyka wyjaśniający, co może pójść nie tak. Węzeł założeń zapisujący, w co wszyscy wtedy wierzyli. Pytania, które nadal pozostawały bez odpowiedzi. Action items, które z tego wyniknęły.

Zamiast żyć w wątkach Slacka i nagraniach spotkań, te artefakty tworzyłyby graf. Z czasem system gromadziłby żywą mapę inżynieryjnego rozumowania. Gdy pojawia się nowa decyzja, system mógłby porównać ją z historycznymi i powiedzieć coś takiego:

> „Dwa miesiące temu zespół zdecydował o opóźnieniu rolloutu w UE, ponieważ niestabilność infrastruktury tworzyła ryzyko operacyjne. Dziś nowa decyzja proponuje ponowne odłożenie rolloutu z powodu zmian w interpretacji GDPR. Te decyzje mogą być ze sobą powiązane.”

Im głębiej eksplorowałem ten pomysł, tym bardziej zaczynał on wyglądać na technicznie wykonalny. Nowoczesne LLM-y są zaskakująco dobre w wydobywaniu ustrukturyzowanego znaczenia z chaotycznych rozmów. Bazy grafowe świetnie radzą sobie z łączeniem encji i relacji. Wyszukiwanie wektorowe dobrze działa przy identyfikowaniu semantycznie podobnych decyzji na przestrzeni czasu.

Architektura zaczęła układać się naturalnie: wczytać tekst, wyekstrahować artefakty, rozwiązać tożsamości, połączyć je z istniejącym grafem, wykryć sprzeczności i zatwierdzić aktualizację jako nową transakcję.

Ale wtedy natrafiłem na problem, którego się nie spodziewałem.

Prawdziwym wyzwaniem nie było wydobycie wiedzy.

Prawdziwym wyzwaniem było zdecydowanie, **jak sam system powinien myśleć**.

Istnieją co najmniej trzy fundamentalnie różne sposoby zaprojektowania zachowania takiego systemu w runtime, a każdy z nich prowadzi do zupełnie innej filozofii tego, jak AI powinno działać wewnątrz workflowów inżynierii oprogramowania.

## Podejście 1: agentyczny przepływ w runtime (LLM jako kontroler)

Pierwsze podejście to to, co ludzie zwykle nazywają **architekturą agentyczną**.

W tym modelu system zachowuje się niemal jak śledczy. Proces zaczyna się wtedy, gdy do pipeline trafiają nowe notatki ze spotkań lub dyskusje architektoniczne. Agent czyta tekst i wydobywa potencjalne decyzje oraz pytania. Następnie patrzy na istniejący graf i decyduje, które jego części mogą być istotne.

Załóżmy, że system czyta notatkę mówiącą:

> „Powinniśmy opóźnić wydanie instancji UE, ponieważ nowe wyjaśnienia GDPR wprowadzają ryzyka compliance.”

System agentyczny mógłby odpowiedzieć, eksplorując graf. Mógłby wyszukać wcześniejsze decyzje związane z infrastrukturą UE, pobrać tę o opóźnieniu rolloutu z powodu niestabilności infrastruktury, przeanalizować powiązane ryzyka i zbadać oś czasu decyzji dotyczących tego wydania.

W pewnym momencie system może uznać, że ma wystarczająco dużo dowodów, i zaproponować aktualizację:

> „Nowa decyzja wydaje się kolidować z wcześniejszym zobowiązaniem, że instancja UE musi zostać uruchomiona przed Q2.”

Piękno tego podejścia polega na tym, że system zachowuje się niemal jak ciekawski inżynier. Podąża za tropami, eksploruje kontekst i czasem odkrywa zależności, których sami deweloperzy nigdy jawnie nie zakodowali w workflowie.

Ale ta elastyczność wiąże się z niewygodnym odkryciem. W systemie agentycznym to AI decyduje, **co badać i kiedy przestać badać**. Może to być całkowicie akceptowalne w przypadku asystenta lub narzędzia badawczego, ale gdy zadaniem systemu jest utrzymywanie autorytatywnej pamięci decyzji inżynieryjnych, nieprzewidywalność nagle staje się poważnym problemem.

Dlatego druga filozofia architektoniczna idzie w przeciwnym kierunku.

## Podejście 2: Python kontroluje przepływ, a LLM i modele embeddingowe są tylko transformatorami

Zamiast traktować model jako autonomicznego agenta, traktujemy go jedynie jako transformator danych. Inteligencja systemu zostaje przeniesiona do deterministycznych części kodu.

W tej wersji Python orkiestruje cały pipeline pod ścisłą kontrolą. Kiedy pojawia się nowy fragment tekstu, runtime wykonuje ustaloną sekwencję operacji. Najpierw pobiera z grafu potencjalne węzły kandydackie za pomocą podobieństwa wektorowego. Następnie pobiera ich otaczający kontekst z Neo4j. Dopiero po zebraniu odpowiednich dowodów system wywołuje model językowy.

W tym momencie model otrzymuje starannie przygotowany pakiet informacji i bardzo konkretne pytanie: biorąc pod uwagę te artefakty i te dopasowania kandydackie, zdecyduj, czy reprezentują one tę samą decyzję, decyzję powiązaną, czy całkowicie nowy węzeł.

Model produkuje ustrukturyzowany wynik i nic więcej. Nie może eksplorować grafu. Nie może pobierać dodatkowych informacji. Nie może zdecydować o uruchomieniu kolejnego wyszukiwania. Po prostu transformuje dane wejściowe w ustrukturyzowany wniosek.

Z perspektywy inżynierii oprogramowania to podejście wydaje się niezwykle komfortowe. Każdy krok jest deterministyczny. Każde zapytanie do grafu jest kontrolowane. System zachowuje się bardziej jak pipeline kompilatora niż agent AI.

Ale pojawia się też niewygodne pytanie. Jeśli sprowadzimy model do czystego transformatora, czy nie wykorzystujemy zbyt słabo zdolności rozumowania, które czynią te modele potężnymi? W końcu część obietnicy AI polega na tym, że potrafi dostrzegać powiązania, które nasze ręcznie pisane reguły mogą przeoczyć.

To prowadzi do trzeciego podejścia, które próbuje zrównoważyć oba światy.

## Podejście 3: wzorzec hybrydowy — używać AI jako transformatorów, ale pozwolić na rozgałęzienia kontrolowane przez Pythona na podstawie sygnałów pewności

Model hybrydowy zaczyna się od deterministycznego pipeline’u, ale pozwala systemowi stać się bardziej ciekawskim, gdy pojawia się niepewność. Runtime nadal kontroluje główny workflow. Nadal pobiera węzły kandydackie i konstruuje pakiety dowodów, zanim poprosi model o ich analizę.

Jednak gdy model raportuje niską pewność albo niejednoznaczne dopasowania, pipeline rozszerza przestrzeń wyszukiwania. System może pobrać większy zestaw kandydackich decyzji, zbadać sąsiedztwo grafu wokół potencjalnie powiązanego węzła albo poszerzyć okno czasowe tak, aby objąć starsze dyskusje architektoniczne.

Innymi słowy, system nadal pozostaje zarządzany przez kod, ale wolno mu kopać głębiej, gdy sytuacja tego wymaga.

Praktyczny przykład może wyglądać tak. System czyta dyskusję proponującą opóźnienie wdrożenia w UE, ponieważ zmieniły się wymagania prawne. Deterministyczny pipeline pobiera najbardziej podobne historyczne decyzje. Model je analizuje, ale zwraca niską pewność, ponieważ dowody są niejednoznaczne.

W tym momencie runtime rozszerza wyszukiwanie, pobierając decyzje związane zarówno z compliance, jak i stabilnością infrastruktury, po czym ponownie przedstawia modelowi rozszerzony kontekst. Dopiero wtedy system ustala, że nowa propozycja faktycznie przecina się z dwiema wcześniejszymi decyzjami, które miały różne motywacje.

To podejście wydaje się mniej sztywne niż model transformatorowy, ale znacznie bardziej kontrolowane niż agentyczne.

## I właśnie tutaj leży mój obecny dylemat.

Za każdym razem, gdy patrzę na ten problem przez pryzmat governance i audytowalności, deterministyczny pipeline transformatorowy wydaje się odpowiedzialnym wyborem inżynieryjnym. System zarządzający pamięcią organizacyjną powinien być przewidywalny, testowalny i reprodukowalny.

Ale za każdym razem, gdy myślę o potencjalnej inteligencji tego systemu, architektura agentyczna staje się niezwykle kusząca. Zdolność do dynamicznej eksploracji kontekstu mogłaby ujawnić zależności w historii decyzji, których żadna deterministyczna reguła retrieval nigdy by nie uchwyciła.

Model hybrydowy znajduje się gdzieś pośrodku, ale nawet ten środek ukrywa trudne trade-offy.

Które zachowania powinny być deterministyczne? Które powinny być adaptacyjne? Gdzie wyznaczamy granicę między eksploracją a kontrolą?

To właśnie pytanie ciągle do mnie wraca, gdy buduję Git for Decisions.

Jeśli chcemy stworzyć system, który pamięta rozumowanie stojące za architekturą oprogramowania, to **ile własnego rozumowania powinniśmy pozwolić wykonywać samemu systemowi?**

Czy powinien zachowywać się jak autonomiczny śledczy, eksplorujący graf decyzji aż do momentu utworzenia hipotezy?

Czy powinien zachowywać się jak zdyscyplinowany pipeline kompilatora, który przetwarza wejścia w ściśle kontrolowany sposób?

A może powinien próbować ostrożnego kompromisu między ciekawością a governance?

Na ten moment szczerze mówiąc nadal nie mam jednoznacznej odpowiedzi.

A ponieważ wiele z najciekawszych spostrzeżeń dotyczących architektury oprogramowania rodzi się raczej z dyskusji zbiorowej niż z samotnego myślenia, jestem ciekaw, jak inni podeszliby do tego problemu.

Gdybyś projektował system, który staje się długoterminową pamięcią decyzji inżynieryjnych, której architekturze ufałbyś bardziej?
