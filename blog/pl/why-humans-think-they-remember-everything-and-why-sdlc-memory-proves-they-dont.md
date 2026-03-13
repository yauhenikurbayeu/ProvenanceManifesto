![Dlaczego ludzie myślą, że pamiętają wszystko, i dlaczego SDLC Memory dowodzi, że tak nie jest](/images/blog/why_humans_think_they_remember_everything_and_why_sdlc_memory_proves_they_dont.png)

# Dlaczego ludzie myślą, że pamiętają wszystko, i dlaczego SDLC Memory dowodzi, że tak nie jest

**Author:** Yauheni Kurbayeu  
**Published:** Feb 22, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/why-humans-think-remember-everything-sdlc-memory-proves-kurbayeu-6oumf/?trackingId=MtyXax6DUkl3k%2B9DhPt%2Bpg%3D%3D)** 

W każdej organizacji inżynierskiej istnieje cicha iluzja. Wierzymy, że pamiętamy.

- Wierzymy, że pamiętamy, dlaczego wybraliśmy tę architekturę.
- Dlaczego istnieje to ograniczenie.
- Dlaczego ten incydent naprawdę się wydarzył.
- Dlaczego rozdzieliliśmy logikę UE od logiki USA.
- Dlaczego odłożyliśmy tę migrację.

Ale nauki kognitywne mówią coś bardzo niewygodnego.

Zgodnie z badaniami psychologii poznawczej nad pojemnością pamięci roboczej, nasza aktywna **pamięć robocza zazwyczaj może** utrzymać około **czterech znaczących porcji informacji w danym momencie**. Nie czterdzieści. Nie czterysta. Cztery. Wszystko inne jest rekonstruowane z fragmentów, nawyków i narracyjnego spoiwa. A jeśli nie powtarzamy informacji albo ich nie eksternalizujemy, szybko zanikają. To nie jest wada przywódcza. To biologia.

Porównajmy to teraz z nowoczesnymi agentami AI. Claude może działać z 200K tokenów, czasem nawet 1M. Codex obsługuje 400K. To brzmi ogromnie w porównaniu z ludzkim mózgiem żonglującym czterema aktywnymi ograniczeniami.

Ale tu pojawia się zwrot.

Nawet to nie wystarcza dla żyjącego SDLC.

## Skala rzeczywistej pamięci delivery

Weźmy bardzo zwyczajny układ: trzy zespoły, piętnastu inżynierów, dwutygodniowe sprinty. Nic ekstremalnego. Żadnej złożoności hyperscale. Po prostu zdrowy produkt SaaS rozwijający się na produkcji.

Jeśli skompresujesz pracę do podsumowań na poziomie decyzji, takich jak tickety sprowadzone do intencji, PR-y streszczone przez wpływ, ADR-y uchwycone wraz z alternatywami, incydenty uporządkowane według przyczyn i mitigacji — nadal generujesz zaskakująco dużą ilość ustrukturyzowanego materiału rozumowania.

W praktyce oznacza to około 150 ticketów miesięcznie w skali zespołów. Około 200–250 pull requestów. Garść ADR-ów i rozmów architektonicznych. Kilka incydentów produkcyjnych. Wyniki planowania sprintu. Decyzje review. Akceptacje ryzyka.

Gdy skondensujesz to wszystko do kanonicznych, ustrukturyzowanych artefaktów — nie surowego szumu ze Slacka, nie logów, lecz pamięci gotowej do rozumowania — otrzymujesz około **200 000 tokenów miesięcznie**.

Nie tokenów teoretycznych. Prawdziwej pamięci delivery.

W skali enterprise, przy 80 inżynierach i ciągłym międzyzespołowym churnie architektonicznym, liczba ta rośnie do **od jednego do półtora miliona tokenów miesięcznie**.

Porównajmy to teraz z oknami kontekstu.

Dwieście tysięcy tokenów ledwo mieści się w niektórych nowoczesnych modelach. Czterysta tysięcy daje więcej oddechu. Milion wygląda hojnie.

Ale oto strukturalna rzeczywistość: pojedynczy kwartał pamięci delivery już przekracza to, co wygodnie mieści się w jednym oknie sesji. A sesje się resetują.

Okno 400K kupuje ci czas. Nie kupuje ciągłości.

To to samo ograniczenie, z którym mierzą się ludzie, tylko w innej skali.

## Prawdziwym problemem nie jest storage

Co ciekawe, storage jest trywialny.

W twojej obecnej skali pełny rok kuratorowanej pamięci SDLC, wraz z embeddingami i relacjami grafowymi, może zajmować mniej niż 70 MB. Nawet w skali enterprise wciąż pozostajesz wygodnie poniżej pół gigabajta dla pamięci ustrukturyzowanej.

Koszt infrastruktury jest pomijalny.

Kosztowna jest ciągłość poznawcza.

Kiedy pamięć żyje tylko w głowach ludzi, każda zmiana dyrektora resetuje kontekst. Każdy incydent powtarza wcześniejsze błędy. Każda debata architektoniczna odtwarza argumenty, które zostały już rozstrzygnięte sześć miesięcy temu. Zespoły odkrywają ograniczenia na nowo, jakby były nowymi insightami.

Nie masz problemu z pamięcią dlatego, że brakuje ci dokumentacji.

**Masz problem z pamięcią dlatego, że brakuje ci ustrukturyzowanej, odpytywalnej i przyczynowo powiązanej pamięci.**

## Dlaczego większe okna kontekstu nas nie uratują

Zwiększanie okien kontekstu wydaje się postępem. I jest postępem. Ale to poziome skalowanie niewłaściwej warstwy.

Duże okno kontekstu nadal jest związane z sesją. Nadal jest nietrwałe. Nadal się resetuje.

Bez trwałej struktury agent zapomina po zakończeniu sesji. Bez trwałej struktury ludzie rekonstruują wszystko z fragmentów.

Wciąż próbujemy rozwiązać problem ciągłości większymi promptami.

Tym, czego naprawdę potrzebujemy, jest pamięć warstwowa.

## Mózg SDLC: Hot / Warm / Cold

Jeśli potraktujemy SDLC jak żywy system, pamięć musi zachowywać się jak układ nerwowy.

**Hot memory** to to, co dzieje się teraz.

- Bieżący sprint.
- Otwarte incydenty.
- Aktywne ryzyka.
- Nierozwiązane pytania.
- Jest płynna, aktualizowana codziennie i na tyle mała, by wstrzyknąć ją do sesji agenta.
- To twój operacyjny working set.

**Warm memory** to ewoluujący mózg produktu.

- Decyzje architektoniczne.
- Trade-offy. Postmortemy.
- Ograniczenia compliance.
- Granice ownership.
- Kanoniczne artefakty takie jak Decisions, Questions, Risks, Actions, ADRs oraz relacje między nimi.

Ta warstwa obejmuje miesiące. Ewoluuje, ale nie znika. Nie jest wstrzykiwana w całości; jest selektywnie odtwarzana.

**Cold memory** to dowody.

- Surowe wątki Jira.
- Transkrypcje Slacka.
- Diffy PR-ów.
- Nagrania.
- Logi.
- Niezmienny dowód tego, co się wydarzyło i dlaczego.
- Rzadko wstrzykiwana bezpośrednio, ale zawsze połączona linkami.

Kluczowy insight jest prosty.

Hot się porusza. Warm stabilizuje. Cold zachowuje.

Agenci odpytują wszystkie warstwy. Ludzie rozumują przez wszystkie warstwy. Żadna ze stron nie powinna polegać wyłącznie na przypominaniu sobie.

## Brakująca warstwa: Provenance

Prawdziwa siła nie wynika wyłącznie z vector search.

Wynika z relacji.

Wiele zespołów zakłada, że RAG rozwiązuje problem ciągłości. Pomaga, ale podobieństwo nie jest wyjaśnieniem. Znalezienie „podobnego ticketu” to nie to samo co zrozumienie, dlaczego dane ograniczenie istnieje.

Każda znacząca decyzja musi wiedzieć:

- Kto ją podjął.
- Kiedy.
- Na podstawie jakich dowodów.
- Jakie alternatywy zostały odrzucone.
- Na co wpływa.
- Jakie ryzyka mitiguje.
- Do jakich incydentów później się przyczyniła.
- Czy zastąpiła wcześniejszą decyzję.

To właśnie tutaj struktura grafu staje się niezbędna.

- Wektorowa baza danych pomaga znaleźć „podobne idee”.
- Grafowa baza danych pomaga odpowiedzieć na pytanie „dlaczego to istnieje?”

Vector search odzyskuje relewantność. Traversowanie grafu rekonstruuje przyczynowość.

Kiedy połączysz oba podejścia, **przestajesz szukać tekstu, a zaczynasz traversować rozumowanie.**

Wtedy SDLC staje się śledzalne.

## Co się dzieje, gdy zespoły przesuwają się w stronę agentów AI?

Wyobraźmy sobie teraz przyszłość, która nie jest hipotetyczna — bliską przyszłość, którą wielu liderów już wyczuwa. Ponieważ agenci AI stają się coraz bardziej zdolni, badania pokazują, że duża część deweloperów i zespołów inżynierskich już dziś polega na AI w codziennych workflowach, a niektóre szacunki wskazują, że ponad 80% inżynierów regularnie używa narzędzi AI do wspierania zadań związanych z programowaniem i rozwojem.

Pojawiają się nawet głosy, że za kilka lat wiele tradycyjnych zadań software engineering będzie w dużej mierze zautomatyzowanych przez agentów, pozostawiając ludzi skupionych bardziej na planowaniu, projektowaniu i nadzorze niż na samym pisaniu kodu.

W tym scenariuszu, w którym **50–80% codziennej pracy związanej z kodowaniem i egzekucją wykonują agenci AI**, problem provenance staje się dramatycznie bardziej dotkliwy. Gdy ludzcy inżynierowie piszą mniej linii kodu i spędzają więcej czasu na kierowaniu autonomicznymi agentami, **kontekst decyzji i jej uzasadnienie stają się jeszcze bardziej kluczowe**:

- Sam produkt pracy przestaje być głównym artefaktem.
- Znaczenie ma to, dlaczego i jak agent wybrał konkretną implementację, a nie tylko to, co wytworzył.

Nawet badania pokazujące, że narzędzia AI zwiększają produktywność jednostek lub zespołów (często w zakresie mniej więcej 20–60% lub więcej), podkreślają też, że deweloperzy kończą, spędzając więcej czasu na **nadzorowaniu pracy, walidacji wyników i naprawianiu problemów wygenerowanych przez agentów** — czyli na takim wyższym poziomie rozumowania, którego nie da się zautomatyzować bez pamięci wcześniejszego kontekstu.

Agenci AI potrafią rozpoznawać wzorce i pisać kod, ale nie niosą w sobie automatycznie celów organizacyjnych, strategii produktu ani trade-offów wcześniejszych decyzji, chyba że zostaną one explicite zakodowane w ustrukturyzowanej warstwie provenance.

Ta zmiana wzmacnia konieczność istnienia **warstwy Warm Provenance**:

- Gdy agenci tworzą kod autonomicznie, musisz wiedzieć, co doprowadziło do tej decyzji, równie dobrze jak to, co ten kod robi.
- Gdy agenci zastępują powtarzalne zadania, ludziom pozostają obsługa wyjątków, strategia i orkiestracja — czyli aspekty, które najtrudniej sobie przypomnieć bez ustrukturyzowanej pamięci.
- Gdy produkt musi udowodnić compliance, wyjaśnić mitigację ryzyka albo odtworzyć intencję po wielu miesiącach, graf provenance staje się jedynym wiarygodnym zapisem.

Bez tego organizacje ryzykują budowanie nieprzejrzystych systemów, których nawet ich twórcy nie są w stanie w pełni uzasadnić.

## Dlaczego ma to jeszcze większe znaczenie w erze AI?

Wraz z tym, jak AI obniża koszt egzekucji, prędkość delivery między organizacjami zaczyna się zbiegać. Generowanie kodu poprawia się wszędzie. Tworzenie testów przyspiesza wszędzie. Dokumentacja pisze się sama.

To, co się nie zbiega, to dyscyplina pamięci.

- Zespoły bez ustrukturyzowanej pamięci SDLC ponownie debatują nad dawnymi decyzjami.
- Ponownie wprowadzają zmitigowane ryzyka.
- Powtarzają błędy architektoniczne.
- Tracą kontekst za każdym razem, gdy rotuje leadership albo odchodzi kluczowy inżynier.

Zespoły z warstwową provenance potrafią wyjaśniać decyzje pod presją. Onboardują inżynierów i agentów AI do rozumowania zamiast do folkloru. Pozwalają agentom AI działać w oparciu o rzeczywiste historyczne osadzenie. Utrzymują ciągłość governance nawet wtedy, gdy ludzie się zmieniają.

Różnica nie leży w tooling.

Leży w pamięci strukturalnej.

## Dlaczego to ma znaczenie dla liderów

Jeśli zarządzasz wieloma zespołami, szczególnie w środowisku SaaS mocno obciążonym compliance, już teraz symulujesz ten system w swojej głowie.

Pamiętasz, która zależność jest krucha. Pamiętasz, który workflow agenta wyprodukował problematyczny release. Pamiętasz, dlaczego logika UE zachowała się inaczej podczas ostatniego rolloutu.

Ale twój mózg nie jest trwałym magazynem. To silnik rozumowania z maleńkim aktywnym oknem.

Obciążenie poznawcze, które odczuwasz, nie jest słabością.

To strukturalne przeciążenie.

Utrzymujesz około 200 000 tokenów miesięcznie w czterochunkowym procesorze.

W przyszłości, w której agenci AI wykonują połowę lub więcej pracy egzekucyjnej, to obciążenie pamięciowe nie znika. Ono się przesuwa — z pamiętania kodu na pamiętanie intencji, przyczynowości i uzasadnienia.

## Końcowa myśl

Ludzie nie mogą pamiętać wszystkiego. Agenci nie mogą pamiętać wszystkiego. Nawet milionowe okna tokenów nie są ciągłością.

Ale organizacje mogą pamiętać wszystko, jeśli potraktują **pamięć jako infrastrukturę, a nie dokumentację**.

Egzekucja staje się tańsza. Pamięć staje się wyróżnikiem.

W świecie przyspieszonym przez AI zespoły z najsilniejszą pamięcią strukturalną nie będą po prostu poruszać się szybciej.

Będą działać **spójnie i odpowiedzialnie**. To będą zespoły, które potrafią wyjaśnić nie tylko, co zostało zrobione, ale także dlaczego to zostało zrobione, długo po tym, jak kod został napisany.
