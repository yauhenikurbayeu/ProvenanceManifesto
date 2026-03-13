# Uczymy AI podejmować decyzje. Ale zapominamy, jak pamiętać.

**Author:** Yauheni Kurbayeu  
**Published:** Jan 3, 2026  
**[LinkedIn](https://www.linkedin.com/posts/yauhenikurbayeu_we-are-teaching-ai-to-decide-but-we-are-activity-7420737202747461632-G91x?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAvr38Bav3RGiyv777cbZGFw7M1kSDr-dU)**

![We are teaching AI to decide. But we are forgetting how to remember.](/images/blog/we_are_teaching_ai_to_decide_but_we_are_forgetting_how_to_remember.jpeg)

Jakiś czas temu napisałem, że **„SDLC nie ma pamięci”**.

Nie pamiętamy, dlaczego podjęto określone decyzje, jakie kompromisy zostały zaakceptowane ani które ograniczenia były jawnie określone. Sześć miesięcy później ktoś pyta: „Dlaczego robimy to w ten sposób?”  
A szczera odpowiedź często brzmi: „Tak naprawdę już nie wiemy. Ale działa.”  
Do niedawna był to „tylko” problem delivery.

Teraz zaczyna się to stawać problemem bezpieczeństwa AI.

Zaczynamy pozwalać AI:

- proponować architektury  
- optymalizować plany  
- eksplorować przestrzenie rozwiązań, których ludzie nie są w stanie w pełni przeanalizować

I powoli przesuwamy się:

- z: „Rozumiemy, dlaczego to jest właściwe rozwiązanie.”
- do: „System to znalazł. Metryki wyglądają dobrze.”

To tworzy **lukę zrozumienia**: widzimy wyniki, ale nie rozumiemy już stojącego za nimi rozumowania.

Prawdziwym ryzykiem nie jest zła AI.  
Prawdziwe ryzyko polega na tym, że **„zbudujemy systemy, które perfekcyjnie optymalizują rzeczy, których wyboru już nawet nie pamiętamy.”**

Nie potrzeba świadomości. Wystarczy optymalizacja, pętle sprzężenia zwrotnego i zapomniana intencja.

## Brakuje nowej warstwy infrastruktury: Provenance.

**Provenance** = zdolność odpowiedzi na pytanie: „Skąd pochodzi ta decyzja i jakiej ludzkiej intencji służyła?”

To nie wiki.  
To nie Jira.  
To nie Confluence.

To raczej:

- Rejestr ludzkiej intencji  
- Graf decyzji, dowodów i kompromisów  
- Ślad prowadzący od wykonania z powrotem do celu

W świecie, w którym maszyny proponują coraz więcej decyzji:  
AI nie powinna być sędzią.  
**Provenance powinna być zapisem sądowym.**

Zanim zaczniemy mówić o „alignment AI”, musimy być w stanie udowodnić:

- Co właściwie próbujemy optymalizować?
- Jakie są cele negatywne (non-goals)?
- Które ograniczenia są nienaruszalne?
- Jakie kompromisy zostały świadomie zaakceptowane?

W przeciwnym razie otrzymamy perfekcyjnie zoptymalizowany absurd.

Zaczęliśmy od problemu delivery.  
Kończymy na problemie ładu zarządczego i bezpieczeństwa w skali cywilizacji:

**Jak upewnić się, że nadal pamiętamy, co próbujemy zbudować, kiedy maszyny zaczną budować to razem z nami?**
