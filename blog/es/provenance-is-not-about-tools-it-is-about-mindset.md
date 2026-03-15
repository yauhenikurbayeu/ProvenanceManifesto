
# Provenance no trata de herramientas. Trata de mentalidad.

![Provenance Is Not About Tools. It Is About Mindset](/images/blog/provenance-is-not-about-tools-it-is-about-mindset.png)

**Author:** Yauheni Kurbayeu  
**Published:** Mar 15, 2026  

Durante los últimos meses, mientras exploraba la idea de la **proveniencia de decisiones en el desarrollo de software**, noté algo interesante. La mayoría de las personas interpretan inicialmente el **Provenance Manifesto** como una propuesta sobre **nuevas herramientas**, **nuevos estándares de documentación** o **nuevos procesos**.

Pero esa interpretación **pierde el punto central**.

> El manifiesto **no trata principalmente de cambiar herramientas.**  
> Se trata de **cambiar la forma en que pensamos sobre el conocimiento, las decisiones y la responsabilidad dentro de las organizaciones de ingeniería.**

Y ese cambio es **mucho más difícil que introducir un nuevo sistema.**


## La suposición oculta de la ingeniería moderna.

Durante décadas, el desarrollo de software ha operado bajo una suposición silenciosa:

> **El razonamiento detrás de los sistemas vive dentro de las personas.**

Guardamos muy bien los **artefactos de implementación**:

- **Código** en repositorios
- **Tareas** en gestores de incidencias
- **Documentación** en bases de conocimiento
- **Infraestructura** en sistemas de configuración

Pero **la parte más importante del sistema** — *por qué las cosas se decidieron de esa manera* — normalmente vive en otro lugar.

Vive en:

- reuniones de diseño
- hilos de Slack
- discusiones de arquitectura
- memoria personal

Con el tiempo, ese razonamiento **desaparece lentamente**.

- Los arquitectos cambian de rol
- Los ingenieros cambian de equipo
- Los managers dejan la organización

El **sistema permanece**, pero el **contexto que lo creó se disuelve**.

Durante muchos años esta limitación fue tolerable. Los sistemas evolucionaban lo suficientemente despacio como para que los equipos pudieran **reconstruir el razonamiento cuando era necesario**.

La **era aumentada por IA** cambia esta dinámica de forma dramática.


## Por qué el Provenance Manifesto trata de mentalidad.

Cuando las personas escuchan la idea de capturar decisiones como artefactos estructurados, la primera reacción suele ser técnica:

- “¿Esto será otro sistema de documentación?”
- “¿Es simplemente ADR?”
- “¿Es otra herramienta que tendremos que mantener?”

Pero **la proveniencia no es un problema de documentación.**

> Es un **cambio de mentalidad**.

La idea es simple pero poderosa:

**Las decisiones deben convertirse en artefactos de primera clase del sistema**, igual que:

- el código
- la infraestructura
- las APIs

En lugar de existir solo en conversaciones o en la memoria personal,
**las decisiones deberían preservarse junto con su contexto**:

- las **suposiciones** detrás de ellas
- los **riesgos** considerados
- las **restricciones** involucradas
- las **alternativas descartadas**
- los **resultados** que produjeron

Esto representa un **cambio fundamental** en cómo las organizaciones tratan el conocimiento.

Nos mueve de:

**Memoria individual a memoria institucional**

Y ese cambio desafía **hábitos profundamente arraigados en la cultura de ingeniería**.


## Por qué las personas resisten compartir sus decisiones.

La resistencia a esta idea rara vez tiene que ver con herramientas o con la carga de proceso.

Normalmente tiene que ver con algo más profundo.

En muchas **profesiones basadas en conocimiento**, se aplica una regla simple:

> **El contexto es poder.**

La persona que recuerda **por qué un sistema funciona como funciona** tiene influencia. Se convierte en la intérprete de decisiones pasadas. Se convierte en la fuente de explicaciones cuando algo se rompe.

En la práctica, esto crea una **jerarquía invisible basada en conocimiento privado**.

Cuando las decisiones permanecen sin documentar, la organización depende de **las personas que las recuerdan**.

Preservar la proveniencia de decisiones **cambia esta dinámica**.

Cuando el razonamiento se convierte en parte del propio sistema:

- el conocimiento se vuelve **accesible para todos**
- el contexto se vuelve **buscable**
- la autoridad se vuelve **trazable**

Para algunas personas esto resulta incómodo, porque elimina la ventaja de **poseer el contexto de forma privada**.

Esta es una de las razones por las que **la captura de decisiones históricamente ha sido inconsistente en muchas organizaciones**.

No es que los equipos **no puedan** documentar decisiones.

Es que **culturalmente a menudo no lo hacen**.


## Por qué el cambio de la IA hace urgente este problema.

**La inteligencia artificial está acelerando la creación de software.**

Los agentes de IA pueden generar código **más rápido de lo que los equipos pueden razonar sobre sus consecuencias**.

Como resultado, el verdadero cuello de botella en el desarrollo de software está cambiando.

> Ya **no es escribir código.**  
> Es **entender las decisiones detrás del sistema.**

Sin el contexto de decisiones preservado:

- los sistemas se vuelven **más difíciles de evolucionar**
- los **trade‑offs arquitectónicos** desaparecen
- los nuevos ingenieros no pueden **reconstruir el pasado**
- los agentes de IA carecen del **contexto de razonamiento necesario para actuar con seguridad**

Cuanto más rápido evolucionan los sistemas, más peligroso se vuelve **perder el contexto**.

Por eso la proveniencia **no es solo un ejercicio intelectual**.

Se está convirtiendo en un **requisito estructural para el desarrollo aumentado por IA.**


## Qué deberíamos empezar a hacer ahora mismo.

La buena noticia es que adoptar la **mentalidad de provenance** no requiere esperar nuevas plataformas ni infraestructura compleja.

Las organizaciones pueden empezar hoy enfocándose en un principio simple:

> **Preservar las decisiones en cualquier lugar donde la IA participe en el proceso de desarrollo.**

En la práctica esto significa capturar el razonamiento detrás del trabajo que involucra:

- **asistencia de IA**
- **automatización**
- **ejecución impulsada por agentes**

Ejemplos:

- Cuando la IA genera un plan de implementación → **preservar el plan de ejecución**
- Cuando se evalúan alternativas arquitectónicas → **preservar la discusión de trade‑offs**
- Cuando las suposiciones influyen en el diseño → **preservar suposiciones y restricciones**
- Cuando se toman decisiones → **registrar la decisión y el razonamiento detrás de ella**

Estos artefactos pueden provenir de muchas fuentes:

- transcripciones de reuniones
- revisiones de arquitectura
- planes de ejecución generados por IA
- resúmenes de seguimiento
- registros de decisiones arquitectónicas

El cambio importante **no es el formato**.

El cambio importante es la **intención de preservar el razonamiento como parte del sistema.**


## Mantener a los humanos en el bucle.

La captura de decisiones **no debería ser un proceso completamente automatizado**.

La IA puede ayudar a extraer estructura de conversaciones, documentos y discusiones.
Pero **los humanos siguen siendo esenciales** para validar el significado.

Un flujo de trabajo práctico podría verse así:

1. Las conversaciones y reuniones se **capturan**
2. La IA extrae **decisiones, suposiciones y riesgos candidatos**
3. Una persona responsable **revisa y confirma la estructura**
4. La decisión validada se convierte en parte de la **memoria del sistema**

Esto mantiene **la comprensión humana en el bucle**, mientras permite que la IA **escale el proceso de captura**.


## El comienzo de la memoria organizacional.

El **Provenance Manifesto** propone finalmente algo simple pero poderoso.

> Las organizaciones deberían tratar el **razonamiento de la misma manera que tratan el código.**

- El **código** describe *qué hace el sistema.*
- La **proveniencia de decisiones** explica *por qué el sistema llegó a ser lo que es.*

En el **mundo aumentado por IA**, ambos son esenciales.

Porque cuando los sistemas evolucionan **más rápido de lo que los humanos pueden recordarlos**, las organizaciones que sobrevivirán serán aquellas que **construyan memoria dentro del propio sistema**.
