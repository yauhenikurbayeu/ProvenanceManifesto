![Guía práctica de Agentic Flow](/images/blog/agentic-flow-how-to-guide.png)


# Guía práctica de Agentic Flow

**Author:** Yauheni Kurbayeu  
**Published:** Mar 22, 2026  

## TL;DR

En el artículo anterior, [Creación de una canalización automatizada de traducción para un blog en Markdown con GitHub Copilot Agents](/blog/building-an-automated-translation-pipeline-for-a-markdown-blog-with-github-copilot), diseñamos una canalización de traducción basada en GitHub Copilot construida alrededor de un orquestador, subagentes específicos por idioma, skills reutilizables y hooks.

Ese diseño se evaluó después frente a la implementación real del repositorio en el informe de evaluación, [Cómo funciona actualmente en este repositorio el flujo de traducción de artículos con GitHub Copilot](/blog/how-the-current-github-copilot-article-translation-flow-works-in-this-repository), que muestra lo que la configuración actual hace realmente hoy y dónde se reparten de verdad las responsabilidades entre instrucciones del repositorio, agentes, skills y hooks.

En este artículo vamos un paso más allá y convertimos esas ideas en una guía práctica. Recorremos cómo este workspace modela la **herencia agéntica**, cómo el apilado de instrucciones reemplaza la herencia nativa y cómo funcionan los **tres enfoques de ejecución**:

- secuencial
- paralelo
- jerárquico

El objetivo es ofrecerte un patrón de diseño reutilizable para flujos de agentes de GitHub Copilot con instrucciones compartidas, workers especializados y reglas claras de coordinación.

Los hooks quedan intencionalmente fuera del alcance aquí. Se pueden añadir más adelante para mejorar la validación, la observabilidad y la seguridad alrededor del flujo.

## Lo que este workspace ya demuestra

El workspace actual utiliza una estructura similar a la herencia construida a partir de instrucciones en capas, en lugar de una herencia de clases real.

### Bloques de construcción principales

- [.github/copilot-instructions.md](/blog/artifacts/agentic-flow-how-to-guide-copilot-instructions) define las reglas globales para todos los agentes.
- [.github/skills/shared-agent-contract/SKILL.md](/blog/artifacts/agentic-flow-how-to-guide-shared-agent-contract-SKILL) define el sobre común de tarea y el contrato de retorno.
- [.github/skills/agents-orchestration/SKILL.md](/blog/artifacts/agentic-flow-how-to-guide-agents-orchestration-SKILL) define cómo un agente padre delega trabajo.
- [.github/skills/worker/SKILL.md](/blog/artifacts/agentic-flow-how-to-guide-worker-SKILL) define el comportamiento predeterminado de los agentes worker.
- [.github/agents/main-orchestrator.agent.md](/blog/artifacts/agentic-flow-how-to-guide-main-orchestrator.agent) actúa como coordinador raíz.
- [.github/agents/worker1.agent.md](/blog/artifacts/agentic-flow-how-to-guide-worker1.agent), [.github/agents/worker2.agent.md](/blog/artifacts/agentic-flow-how-to-guide-worker2.agent) y [.github/agents/worker3.agent.md](/blog/artifacts/agentic-flow-how-to-guide-worker3.agent) actúan como workers especializados.

### Resumen de la revisión actual

- El modelo de herencia es claro y reutilizable.
- El modo secuencial se modela como un encadenamiento gestionado por el orquestador.
- El modo paralelo se modela como una distribución y agregación gestionadas por el orquestador.
- El modo jerárquico se modela como delegación de worker a worker.
- El modo jerárquico cambia el papel de `worker1` y `worker2`: en ese modo ya no son workers hoja puros, aunque la skill compartida de worker describa a los workers como nodos hoja por defecto.

Ese último punto no es necesariamente incorrecto, pero sí es una decisión de diseño importante. Si utilizas ejecución jerárquica, algunos workers se convierten en coordinadores intermedios.

## Herencia agéntica

### La idea central

Los agentes de GitHub Copilot no tienen herencia nativa. El reemplazo práctico es la composición de instrucciones:

1. Las instrucciones globales actúan como la clase base.
2. Las skills compartidas actúan como capas de rol reutilizables.
3. Los archivos de agente actúan como especializaciones ligeras.
4. Los datos de tarea en tiempo de ejecución completan el comportamiento.

Este patrón te da la mayoría de los beneficios de la herencia:

- un contrato compartido
- menos lógica de prompt duplicada
- límites de responsabilidad más claros
- mantenimiento más sencillo cuando el flujo crece

### Precedencia de instrucciones

El workspace actual sigue este orden:

1. [.github/copilot-instructions.md](/blog/artifacts/agentic-flow-how-to-guide-copilot-instructions)
2. skills compartidas referenciadas por un agente
3. instrucciones locales del agente en el archivo `.agent.md`
4. sobre de tarea en tiempo de ejecución del usuario o del agente padre

Esto significa que un agente hijo debe especializar las reglas compartidas, no contradecirlas.

### Mapa de herencia para este workspace

```text
Global base
  .github/copilot-instructions.md

Shared contract
  .github/skills/shared-agent-contract/SKILL.md

Role-specific behavior
  .github/skills/agents-orchestration/SKILL.md
  .github/skills/worker/SKILL.md

Agent specializations
  .github/agents/main-orchestrator.agent.md
  .github/agents/worker1.agent.md
  .github/agents/worker2.agent.md
  .github/agents/worker3.agent.md
```


### Contrato compartido

El contrato compartido de agente es la capa de herencia más importante porque estandariza:

- el sobre de tarea
- los campos de entrada esperados
- el esquema de salida
- el manejo de fallos

En este workspace, el sobre común de tarea contiene:

- `task_id`
- `objective`
- `mode`
- `input_artifact`
- `constraints`
- `expected_output`
- `parent_agent`

El contrato común de retorno contiene:

- `status`
- `agent`
- `summary`
- `result`
- `notes`

Esto es lo que permite que varios agentes cooperen sin inventar un nuevo mini-protocolo cada vez.

## Modos de ejecución

### 1. Modo secuencial

#### Qué significa

El modo secuencial es una canalización paso a paso controlada por el orquestador.

El orquestador sigue siendo responsable de cada traspaso:

```text
main-orchestrator -> worker1 -> main-orchestrator -> worker2 -> main-orchestrator -> worker3
```

#### Cuándo usarlo

- cuando cada paso depende del resultado anterior
- cuando quieres control y visibilidad centralizados
- cuando un fallo debe detener el flujo inmediatamente

#### Beneficios

- es el modo más fácil de razonar
- ofrece el control más fuerte del orquestador
- simplifica el registro y los reintentos

#### Compensaciones

- es más lento que el modo paralelo
- el orquestador queda en la ruta crítica entre cada paso

#### Ejemplo

```yaml
status: success
agent: main-orchestrator
summary: Ran workers 1→2→3 sequentially on the input text and returned the final transformed output.
result:
  mode: sequential
  steps:
    - worker: worker1
      input: "text to transform"
      output: "text to transform_worker1"
    - worker: worker2
      input: "text to transform_worker1"
      output: "text to transform_worker1_worker2"
    - worker: worker3
      input: "text to transform_worker1_worker2"
      output: "text to transform_worker1_worker2_worker3"
  final_output: "text to transform_worker1_worker2_worker3"
notes: Each worker appended its marker in turn, with the orchestrator coordinating the handoffs and preserving the step history.
```

#### Cómo implementarlo

1. El orquestador recibe la entrada original.
2. El orquestador envía la entrada a `worker1`.
3. `worker1` devuelve un resultado estructurado.
4. El orquestador toma `worker1.result` y lo envía a `worker2`.
5. El orquestador toma `worker2.result` y lo envía a `worker3`.
6. El orquestador devuelve la salida final del worker junto con el historial de pasos.

### 2. Modo paralelo

#### Qué significa

El modo paralelo es un patrón de distribución en el que el orquestador envía la misma entrada a varios workers al mismo tiempo.

```text
main-orchestrator -> worker1
main-orchestrator -> worker2
main-orchestrator -> worker3
```

Luego, el orquestador agrega los resultados.

#### Cuándo usarlo

- cuando los workers son independientes
- cuando quieres salidas para comparar
- cuando la velocidad importa más que la dependencia paso a paso

#### Beneficios

- ejecución más rápida cuando las tareas son independientes
- útil para experimentación y comparación
- modelo de agregación simple

#### Compensaciones

- los workers no pueden construirse unos sobre otros
- los resultados pueden requerir posprocesamiento antes de ser comparables directamente

#### Ejemplo

```yaml
status: success
agent: main-orchestrator
summary: Ran three workers in parallel on the same input text and collected their outputs.
result:
  mode: parallel
  outputs:
    worker1: "text Parallel_worker1"
    worker2: "text Parallel_worker2"
    worker3: "text Parallel_worker3"
notes: Each worker independently appended its own marker to the shared input, with the orchestrator coordinating the aggregation of results.
```

#### Cómo implementarlo

1. El orquestador recibe la entrada original.
2. El orquestador envía el mismo `input_artifact` a todos los workers.
3. Cada worker devuelve su propio resultado estructurado de manera independiente.
4. El orquestador combina las salidas en un objeto de resultados indexado por worker.

### 3. Modo jerárquico

#### Qué significa

El modo jerárquico es una cadena delegada en la que el orquestador inicia el flujo, pero los workers pasan el control hacia abajo en la línea:

```text
main-orchestrator -> worker1 -> worker2 -> worker3
```

Esto es diferente del modo secuencial porque el orquestador no es el punto de traspaso entre cada etapa.

#### Cuándo usarlo

- cuando un subflujo debe ser propiedad de los propios workers
- cuando quieres responsabilidad anidada
- cuando los workers posteriores son conceptualmente hijos de workers anteriores

#### Beneficios

- admite patrones de delegación en árbol o anidados
- puede reducir el ruido de orquestación
- modela de forma natural cadenas de procesamiento padre-hijo

#### Compensaciones

- es más difícil de trazar que el modo secuencial gestionado por el orquestador
- los agentes worker dejan de ser nodos hoja puros
- el manejo de fallos y la observabilidad se vuelven más complejos

#### Nota de diseño importante

En este workspace, el modo jerárquico se implementa permitiendo que los workers deleguen en otros workers.

Eso significa que:

- `worker1` se convierte en padre de `worker2`
- `worker2` se convierte en padre de `worker3`
- solo `worker3` sigue siendo una hoja real en la ruta jerárquica

Esta es la principal diferencia conceptual respecto de la skill de worker predeterminada, que describe a los workers como agentes hoja salvo que se configuren explícitamente de otra manera.

#### Ejemplo

```yaml
status: success
agent: main-orchestrator
summary: Ran workers hierarchically (worker1 → worker2 → worker3) on the input textTree and collected each stage’s output.
result:
  mode: hierarchical
  hierarchy:
    worker1:
      input: "textTree"
      output: "textTree>worker1"
    worker2:
      parent: "worker1"
      input: "textTree>worker1"
      output: "textTree>worker1>worker2"
    worker3:
      parent: "worker2"
      input: "textTree>worker1>worker2"
      output: "textTree>worker1>worker2>worker3"
  root_output: "textTree>worker1>worker2>worker3"
notes: Hierarchical mode mirrors a delegated chain (each worker builds on its parent’s output); the orchestrator initiates the flow but does not manage each handoff, allowing workers to take ownership of the subflow and pass results directly to their child workers.
```

#### Cómo implementarlo

1. El orquestador inicia el flujo llamando a `worker1`.
2. `worker1` transforma la entrada y reenvía el resultado a `worker2`.
3. `worker2` transforma la entrada y reenvía el resultado a `worker3`.
4. `worker3` devuelve la salida terminal.
5. El flujo devuelve el resultado final junto con la trazabilidad de etapas.

## Secuencial vs paralelo vs jerárquico

| Enfoque | Punto de control | Modelo de dependencia | Mejor para |
| --- | --- | --- | --- |
| Secuencial | Orquestador entre cada paso | Fuerte dependencia entre pasos | Canalizaciones con control centralizado |
| Paralelo | El orquestador distribuye y agrega | Workers independientes | Velocidad, comparación, salidas multivariante |
| Jerárquico | Los workers delegan cuesta abajo en la cadena | Dependencia anidada padre-hijo | Subflujos en árbol y propiedad delegada |

## Cómo diseñar un flujo agéntico similar

### Paso 1. Define el contrato base una sola vez

Coloca las reglas compartidas en `.github/copilot-instructions.md` y mantenlas genéricas:

- sobre de tarea
- esquema de resultado
- esquema de fallo
- restricciones de delegación

### Paso 2. Mueve el comportamiento reutilizable a skills

Usa una skill de contrato compartido y luego crea skills específicas por rol, tales como:

- orquestación
- ejecución de workers
- validación
- transformación específica del dominio

Así es como evitas copiar la misma lógica de prompt en cada agente.

### Paso 3. Mantén ligeros los archivos de agente

Cada archivo de agente debería responder solo a estas preguntas:

- de qué es responsable este agente
- qué skills utiliza
- a qué agentes hijo puede llamar
- qué lo diferencia de agentes hermanos

Si una regla aplica a muchos agentes, normalmente debería moverse hacia arriba, a una skill compartida o a una instrucción global.

### Paso 4. Elige el modo de ejecución correcto

Usa:

- secuencial para canalizaciones controladas por el orquestador
- paralelo para ramas independientes
- jerárquico para subárboles delegados o cadenas anidadas

No elijas el modo jerárquico solo porque parezca más avanzado. Debe usarse cuando la delegación en manos de los workers sea realmente un mejor modelo.

### Paso 5. Mantén las salidas trazables

Devuelve siempre suficiente estructura para que el padre entienda:

- quién se ejecutó
- qué entrada recibió
- qué salida produjo
- si el paso tuvo éxito

Las salidas de ejemplo de este workspace son un buen patrón porque conservan tanto el resultado final como la ruta seguida para llegar a él.

## Mejoras recomendadas

1. Decide si los workers deberían ser realmente agentes hoja por defecto o si la delegación jerárquica es un requisito de primera clase.
2. Si el modo jerárquico es de primera clase, actualiza el lenguaje de la skill de worker para describir con más claridad a los workers como nodos internos.
3. Mantén estable el contrato compartido para que todos los modos de ejecución devuelvan estructuras de resultado compatibles.
4. Considera más adelante nombres semánticos para los workers, como `normalize`, `transform` y `finalize`, una vez que el patrón sea estable.

## Conclusión final

La forma más limpia de construir herencia agéntica en GitHub Copilot es tratar la herencia como una arquitectura de prompts en capas:

- instrucciones base para la política universal
- skills compartidas para comportamiento reutilizable
- agentes ligeros para especialización
- modos de ejecución explícitos para controlar el flujo

Estos tres modos de ejecución son herramientas valiosas en tu caja de herramientas de diseño:

- secuencial es la canalización más clara dirigida por el orquestador
- paralelo es el modelo de distribución más claro
- jerárquico es el más potente, pero también el más opinativo estructuralmente

Si vas a introducir un flujo agéntico en un equipo nuevo, comienza con secuencial, añade paralelo cuando las tareas sean independientes e introduce jerárquico solo cuando realmente necesites cadenas de delegación en manos de los workers.

## Especificaciones y documentación útiles de GitHub Copilot

- [Acerca de la personalización de las respuestas de GitHub Copilot](https://docs.github.com/en/copilot/concepts/prompting/response-customization) - Visión general de las instrucciones a nivel de repositorio, las instrucciones por ruta y otros mecanismos relacionados de personalización.
- [Añadir instrucciones personalizadas de repositorio para GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) - Guía práctica para crear `.github/copilot-instructions.md` y `.github/instructions/*.instructions.md`.
- [Compatibilidad con distintos tipos de instrucciones personalizadas](https://docs.github.com/en/copilot/reference/custom-instructions-support) - Matriz de referencia sobre dónde se admiten instrucciones a nivel de repositorio, por ruta, personales y de organización.
- [Acerca de los agentes personalizados](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents) - Visión conceptual de qué son los agentes personalizados, dónde viven y cómo encajan en los flujos de trabajo de Copilot.
- [Creación de agentes personalizados para Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents) - Guía paso a paso para crear perfiles `.github/agents/*.agent.md`.
- [Configuración de agentes personalizados](https://docs.github.com/en/copilot/reference/custom-agents-configuration) - Documentación de referencia para frontmatter de agentes, herramientas, ajustes del modelo y comportamiento de invocación.
- [Acerca de las skills de agente](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) - Explica qué son las skills y cómo complementan a las instrucciones y a los agentes personalizados.
- [Creación de skills de agente para GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-skills) - Guía práctica para estructurar `.github/skills/<skill>/SKILL.md` y los recursos relacionados.
- [Acerca de los hooks](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks) - Explicación conceptual de los disparadores de hooks, eventos del ciclo de vida y casos de uso de gobernanza.
- [Uso de hooks con GitHub Copilot agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks) - Guía de implementación para `.github/hooks/hooks.json` y acciones de hook basadas en shell.
- [Configuración de hooks](https://docs.github.com/en/copilot/reference/hooks-configuration) - Referencia para la estructura del manifiesto de hooks, eventos y detalles de configuración.
- [Hoja de referencia de personalización de Copilot](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) - Referencia compacta que compara instrucciones, agentes, skills, hooks y otras opciones de personalización lado a lado.
