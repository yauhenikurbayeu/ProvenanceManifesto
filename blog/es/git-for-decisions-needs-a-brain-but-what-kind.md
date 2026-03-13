![Git for Decisions Needs a Brain, But What Kind?](/images/blog/git_for_decisions_needs_a_brain_but_what_kind.png)

# Git para decisiones necesita un cerebro… pero ¿de qué tipo?

**Author:** Yauheni Kurbayeu  
**Published:** Mar 4, 2026  
**[LinkedIn](https://www.linkedin.com/pulse/git-decisions-needs-brain-what-kind-yauheni-kurbayeu-pzc9c/?trackingId=8QfsKWcXmBSVGbckPOYlOA%3D%3D)**

Durante los últimos meses he estado construyendo algo que empezó como un experimento mental y poco a poco se convirtió en un sistema real. Lo llamo **SDLC Memory**. La idea detrás es simple, casi vergonzosamente obvia una vez que se dice en voz alta: las organizaciones de software no tienen memoria.

Tenemos Git para el código. Tenemos Jira para las tareas. Tenemos sistemas de documentación llenos de explicaciones escritas después de los hechos.  
Pero el razonamiento real detrás de las decisiones de ingeniería casi siempre desaparece.

Unos meses después, alguien nuevo se une al equipo, abre un repositorio, observa una pieza extraña de arquitectura y hace la pregunta inevitable:

> “¿Por qué construimos esto así?”

La respuesta habitual es una mezcla de suposiciones y recuerdos vagos. Alguien recuerda un incidente en producción. Otra persona cree que tenía algo que ver con el escalado. Una tercera persona recuerda vagamente una conversación sobre cumplimiento. Ninguna de estas explicaciones es incorrecta, pero tampoco es realmente confiable.

Ahí es donde nació la idea de **Git for Decisions**.

Imagina si cada discusión importante, cada nota de reunión y cada conversación arquitectónica pudiera traducirse en artefactos estructurados. Un nodo de decisión que explique qué se eligió. Un nodo de riesgo que describa qué podría salir mal. Un nodo de suposición que capture lo que todos creían en ese momento. Preguntas que todavía no estaban resueltas. Acciones que surgieron después.

En lugar de vivir dentro de hilos de Slack y grabaciones de reuniones, esos artefactos formarían un grafo. Con el tiempo, el sistema acumularía un mapa vivo del razonamiento de ingeniería. Cuando aparece una nueva decisión, el sistema podría compararla con decisiones históricas y decir algo como:

> “Hace dos meses el equipo decidió retrasar el despliegue en la UE porque la inestabilidad de la infraestructura generaba riesgo operativo. Hoy una nueva decisión propone posponer el despliegue nuevamente debido a cambios en la interpretación del GDPR. Estas decisiones podrían estar relacionadas.”

Cuanto más exploraba esta idea, más parecía técnicamente viable. Los LLM modernos son sorprendentemente buenos extrayendo significado estructurado de conversaciones desordenadas. Las bases de datos de grafos son excelentes conectando entidades y relaciones. La búsqueda vectorial funciona bien para identificar decisiones semánticamente similares a lo largo del tiempo.

La arquitectura empezó a formarse de manera natural: ingerir texto, extraer artefactos, resolver identidades, enlazarlos con el grafo existente, detectar contradicciones y confirmar la actualización como una nueva transacción.

Pero entonces me encontré con un problema que no esperaba.

El verdadero desafío no era extraer conocimiento.

El verdadero desafío era decidir **cómo debería pensar el propio sistema**.

Existen al menos tres maneras fundamentalmente diferentes de diseñar el comportamiento en tiempo de ejecución de un sistema así, y cada una conduce a una filosofía completamente distinta sobre cómo debería operar la IA dentro de los flujos de trabajo de ingeniería de software.

## Enfoque 1: flujo agentivo en tiempo de ejecución (LLM como controlador)

El primer enfoque es lo que la gente suele llamar **arquitectura agentiva**.

En este modelo, el sistema se comporta casi como un investigador. El proceso comienza cuando nuevas notas de reuniones o discusiones arquitectónicas entran en la tubería. Un agente lee el texto y extrae posibles decisiones y preguntas. Luego observa el grafo existente y decide qué partes podrían ser relevantes.

Supongamos que el sistema lee una nota que dice:

> “Deberíamos posponer el lanzamiento de la instancia de la UE porque nuevas aclaraciones del GDPR introducen riesgos de cumplimiento.”

Un sistema agentivo podría responder explorando el grafo. Podría buscar decisiones anteriores relacionadas con la infraestructura de la UE, recuperar la que retrasó el despliegue por inestabilidad de infraestructura, inspeccionar riesgos relacionados y examinar la línea temporal de decisiones alrededor de ese lanzamiento.

En algún momento, el sistema podría decidir que tiene suficiente evidencia y proponer una actualización:

> “Una nueva decisión parece entrar en conflicto con un compromiso anterior de que la instancia de la UE debía estar en producción antes del segundo trimestre.”

La belleza de este enfoque es que el sistema se comporta casi como un ingeniero curioso. Sigue pistas, explora el contexto y a veces descubre relaciones que los propios desarrolladores nunca codificaron explícitamente en el flujo de trabajo.

Pero esta flexibilidad trae una realización incómoda. En un sistema agentivo, la IA decide **qué investigar y cuándo dejar de investigar**. Eso puede ser perfectamente aceptable para un asistente o una herramienta de investigación, pero cuando el trabajo del sistema es mantener la memoria autoritativa de las decisiones de ingeniería, la imprevisibilidad se convierte de repente en una preocupación seria.

Por eso la segunda filosofía arquitectónica va en la dirección opuesta.

## Enfoque 2: Python controla el flujo, los LLM y los modelos de embeddings son solo transformadores

En lugar de tratar al modelo como un agente autónomo, lo tratamos simplemente como un transformador de datos. La inteligencia del sistema se mueve hacia las partes deterministas del código.

En esta versión, Python orquesta toda la tubería con control estricto. Cuando llega un nuevo texto, el runtime ejecuta una secuencia fija de operaciones. Primero recupera posibles nodos candidatos del grafo utilizando similitud vectorial. Luego obtiene su contexto circundante desde Neo4j. Solo después de reunir la evidencia relevante el sistema llama al modelo de lenguaje.

En ese momento, el modelo recibe un paquete de información cuidadosamente preparado y se le hace una pregunta muy específica: dados estos artefactos y estos candidatos, determine si representan la misma decisión, una relacionada o un nodo completamente nuevo.

El modelo produce una salida estructurada y nada más. No puede explorar el grafo. No puede recuperar información adicional. No puede decidir ejecutar otra búsqueda. Simplemente transforma la entrada dada en una conclusión estructurada.

Desde la perspectiva de la ingeniería de software, este enfoque resulta extremadamente cómodo. Cada paso es determinista. Cada consulta al grafo está controlada. El sistema se comporta más como una tubería de compilación que como un agente de IA.

Pero también plantea una pregunta incómoda. Si reducimos el modelo a un simple transformador, ¿estamos infrautilizando las capacidades de razonamiento que hacen poderosos a estos modelos? Después de todo, parte de la promesa de la IA es que puede detectar conexiones que nuestras reglas escritas a mano podrían pasar por alto.

Esto nos lleva al tercer enfoque, que intenta equilibrar ambos mundos.

## Enfoque 3: patrón híbrido — usar IA como transformadores pero permitir ramificación controlada por Python basada en señales de confianza

El modelo híbrido comienza con una tubería determinista pero permite que el sistema se vuelva más curioso cuando aparece la incertidumbre. El runtime sigue controlando el flujo principal. Sigue recuperando nodos candidatos y construyendo paquetes de evidencia antes de pedir al modelo que los analice.

Sin embargo, cuando el modelo reporta baja confianza o coincidencias ambiguas, la tubería expande su espacio de búsqueda. El sistema podría recuperar un conjunto mayor de decisiones candidatas, explorar el vecindario del grafo alrededor de un nodo potencialmente relacionado o ampliar la ventana temporal para incluir discusiones arquitectónicas más antiguas.

En otras palabras, el sistema sigue gobernado por código, pero se le permite profundizar más cuando la situación lo exige.

Un ejemplo práctico podría verse así. El sistema lee una discusión que propone posponer un despliegue en la UE porque han cambiado los requisitos legales. La tubería determinista recupera las decisiones históricas más similares. El modelo las analiza pero devuelve baja confianza porque la evidencia no es concluyente.

En ese momento, el runtime amplía la búsqueda, recuperando decisiones relacionadas tanto con cumplimiento como con estabilidad de infraestructura, y presenta el contexto ampliado al modelo nuevamente. Solo entonces el sistema determina que la nueva propuesta en realidad se cruza con dos decisiones anteriores que tenían motivaciones distintas.

Este enfoque se siente menos rígido que el modelo transformador pero mucho más controlado que el agentivo.

## Y ahí es exactamente donde vive mi dilema actual.

Cada vez que observo el problema desde la perspectiva de la gobernanza y la auditabilidad, la tubería determinista basada en transformadores parece la elección de ingeniería responsable. Un sistema que gestiona la memoria organizacional debería ser predecible, comprobable y reproducible.

Pero cada vez que pienso en la inteligencia potencial del sistema, la arquitectura agentiva se vuelve increíblemente tentadora. La capacidad de explorar el contexto dinámicamente podría descubrir relaciones en la historia de decisiones que ninguna regla determinista de recuperación podría encontrar jamás.

El modelo híbrido se sitúa en algún punto intermedio, pero incluso ese punto medio oculta compromisos difíciles.

¿Qué comportamientos deberían ser deterministas? ¿Cuáles deberían ser adaptativos? ¿Dónde trazamos la línea entre exploración y control?

Esta es la pregunta a la que sigo volviendo mientras construyo Git for Decisions.

Si queremos crear un sistema que recuerde el razonamiento detrás de la arquitectura de software, ¿cuánto razonamiento deberíamos permitir que realice el propio sistema?

¿Debería comportarse como un investigador autónomo, explorando el grafo de decisiones hasta formar una hipótesis?

¿Debería comportarse como una tubería de compilación disciplinada que procesa entradas de manera estrictamente controlada?

¿O debería intentar un compromiso cuidadoso entre curiosidad y gobernanza?

En este momento, sinceramente, todavía no estoy decidido.

Y dado que muchas de las ideas más interesantes sobre arquitectura de software surgen de la discusión colectiva más que del pensamiento solitario, tengo curiosidad por saber cómo otros abordarían esto.

Si estuvieras diseñando un sistema que se convierta en la memoria a largo plazo de las decisiones de ingeniería, ¿en qué arquitectura confiarías más?
