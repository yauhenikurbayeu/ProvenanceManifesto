![Dzień, w którym narodził się Provenance Manifesto](/images/blog/the_day_the_provenance_manifesto_was_born.jpeg)

# Dzień, w którym narodził się Provenance Manifesto.

**Author:** Yauheni Kurbayeu  
**Published:** March 8, 2026  
**[LinkedIn](https://www.linkedin.com/posts/yauhenikurbayeu_over-the-past-months-i-have-been-exploring-activity-7436171607305318401-Vj3D?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAvr38Bav3RGiyv777cbZGFw7M1kSDr-dU)** 


W ciągu ostatnich miesięcy badałem pytanie, które początkowo wydawało się
czysto techniczne, lecz z czasem okazało się znacznie szersze.

**Dlaczego rozwój oprogramowania prawie nie posiada pamięci o własnych
decyzjach?**

To pytanie doprowadziło do serii artykułów, w których analizowałem ten
problem z różnych perspektyw.

Najpierw przyjrzałem się iluzji, że ludzie pamiętają wszystko o
systemach, które budują. W rzeczywistości zespoły się zmieniają,
architekci odchodzą, a uzasadnienie stojące za systemami cicho znika,
podczas gdy same systemy nadal istnieją.

Następnie sprawdziłem, czy nowoczesne podejścia AI do wyszukiwania
informacji mogłyby pomóc zachować to uzasadnienie. Wyszukiwanie
wektorowe i RAG początkowo wyglądały obiecująco, lecz im głębiej
prowadziła analiza, tym bardziej oczywiste stawało się, że sama
wyszukiwarka podobieństw nie jest w stanie odtworzyć łańcucha założeń,
ryzyk, ograniczeń i kompromisów stojących za rzeczywistymi decyzjami
inżynieryjnymi.

To odkrycie doprowadziło do pomysłu **inkrementalnej pamięci
proweniencji opartej na grafie**, sposobu przechowywania nie tylko
dokumentów, lecz także relacji między decyzjami oraz kontekstu, który
je wytworzył.

W pewnym momencie dyskusja przestała być wyłącznie techniczna.

Prawdziwy problem okazał się głębszy: **inżynieria oprogramowania nigdy
nie traktowała decyzji jako artefaktów pierwszej klasy.**

Wersjonujemy kod, przechowujemy commity i odtwarzamy buildy.  
Jednak rozumowanie, które kształtuje systemy, znika niemal natychmiast.

Gdy AI przyspiesza tempo, w jakim można tworzyć oprogramowanie, ta luka
staje się jeszcze bardziej niebezpieczna.

Dlatego dziś publikuję **Provenance Manifesto**.

-   AI może dramatycznie przyspieszyć wykonanie.
-   Provenance zachowuje odpowiedzialność.

## Kilka dodatkowych refleksji stojących za manifestem

Podczas tych badań stało się jasne, że prawdziwym wyzwaniem nie jest
dokumentacja ani wyszukiwanie wiedzy. Problem polega na tym, że
inżynieria oprogramowania nigdy nie ustanowiła **systemu rejestru
decyzji**.

Każda architektura, zachowanie produktu, proces operacyjny czy reakcja
na incydent powstaje w wyniku decyzji. Jednak te decyzje rzadko
przetrwają dłużej niż zespoły, które je podjęły.

Organizacje dziedziczą systemy, ale nie uzasadnienie, które za nimi
stoi.

**Provenance Manifesto** proponuje prostą zmianę:

-   Decyzje powinny zawierać kontekst.
-   Powinny ewoluować, ale nigdy nie znikać.
-   Powinny być możliwe do zapytania.
-   Powinny mieć właściciela.

A gdy AI staje się aktywnym uczestnikiem procesu wytwarzania
oprogramowania, powinna działać w ramach **przejrzystych zasad
zarządzania decyzjami**.

Publikacja manifestu **nie jest zakończeniem badań**.

Pod wieloma względami **to dopiero początek**.

Jeśli ten temat jest Ci bliski — niezależnie od tego, czy zajmujesz się
architekturą, systemami wiedzy, narzędziami AI czy przywództwem
inżynieryjnym — z przyjemnością poznam Twoją perspektywę.

------------------------------------------------------------------------

### Contribute

Twój wkład jest bardzo mile widziany:

https://github.com/yauhenikurbayeu/ProvenanceManifesto/blob/main/README.md
