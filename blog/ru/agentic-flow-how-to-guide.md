![Практическое руководство по Agentic Flow](/images/blog/agentic-flow-how-to-guide.png)


# Практическое руководство по Agentic Flow

**Author:** Yauheni Kurbayeu  
**Published:** Mar 22, 2026  

## TL;DR

В предыдущей статье, [Building an Automated Translation Pipeline for a Markdown Blog with GitHub Copilot Agents](/blog/building-an-automated-translation-pipeline-for-a-markdown-blog-with-github-copilot), мы спроектировали конвейер перевода на базе GitHub Copilot, построенный вокруг оркестратора, языковых субагентов, переиспользуемых skills и hooks.

Затем эта схема была сопоставлена с реальной реализацией репозитория в аналитическом отчёте [How the Current GitHub Copilot Article Translation Flow Works in This Repository](/blog/how-the-current-github-copilot-article-translation-flow-works-in-this-repository), который показывает, что текущая настройка действительно делает сегодня и как фактически распределены обязанности между инструкциями репозитория, агентами, skills и hooks.

В этой статье мы идём на шаг дальше и превращаем эти идеи в практическое руководство. Мы разбираем, как это рабочее пространство моделирует **агентное наследование**, как слоистые инструкции заменяют нативное наследование и как работают **три подхода к выполнению**:

- последовательный
- параллельный
- иерархический

Цель — дать вам переиспользуемый шаблон проектирования для потоков агентов GitHub Copilot с общими инструкциями, специализированными исполнителями и ясными правилами координации.

Hooks здесь намеренно остаются вне области рассмотрения. Их можно добавить позже, чтобы усилить валидацию, наблюдаемость и безопасность вокруг потока.

## Что уже демонстрирует это рабочее пространство

Текущее рабочее пространство использует структуру, похожую на наследование, построенную из слоистых инструкций, а не из настоящего классового наследования.

### Основные строительные блоки

- [.github/copilot-instructions.md](/blog/artifacts/agentic-flow-how-to-guide-copilot-instructions) определяет глобальные правила для всех агентов.
- [.github/skills/shared-agent-contract/SKILL.md](/blog/artifacts/agentic-flow-how-to-guide-shared-agent-contract-SKILL) определяет общую оболочку задачи и контракт возврата.
- [.github/skills/agents-orchestration/SKILL.md](/blog/artifacts/agentic-flow-how-to-guide-agents-orchestration-SKILL) определяет, как родительский агент делегирует работу.
- [.github/skills/worker/SKILL.md](/blog/artifacts/agentic-flow-how-to-guide-worker-SKILL) определяет поведение по умолчанию для рабочих агентов.
- [.github/agents/main-orchestrator.agent.md](/blog/artifacts/agentic-flow-how-to-guide-main-orchestrator.agent) выступает корневым координатором.
- [.github/agents/worker1.agent.md](/blog/artifacts/agentic-flow-how-to-guide-worker1.agent), [.github/agents/worker2.agent.md](/blog/artifacts/agentic-flow-how-to-guide-worker2.agent) и [.github/agents/worker3.agent.md](/blog/artifacts/agentic-flow-how-to-guide-worker3.agent) выступают специализированными исполнителями.

### Краткое резюме текущего обзора

- Модель наследования ясна и переиспользуема.
- Последовательный режим моделируется как цепочка, управляемая оркестратором.
- Параллельный режим моделируется как fan-out и fan-in, управляемые оркестратором.
- Иерархический режим моделируется как делегирование от worker к worker.
- Иерархический режим меняет роль `worker1` и `worker2`: в этом режиме они больше не являются чистыми leaf workers, хотя общий worker skill по умолчанию описывает работников как leaf nodes.

Последний пункт сам по себе не обязательно означает ошибку, но это важный архитектурный выбор. Если вы используете иерархическое выполнение, некоторые worker-агенты становятся промежуточными координаторами.

## Агентное наследование

### Ключевая идея

У GitHub Copilot Agents нет нативного наследования. Практическая замена ему — композиция инструкций:

1. Глобальные инструкции выступают как базовый класс.
2. Общие skills выступают как переиспользуемые ролевые слои.
3. Файлы агентов выступают как тонкие специализации.
4. Данные runtime-задачи завершают поведение.

Этот паттерн даёт вам большую часть преимуществ наследования:

- единый общий контракт
- меньше дублирующейся логики в prompts
- более ясные границы ответственности
- более простую поддержку по мере роста потока

### Приоритет инструкций

Текущее рабочее пространство следует такому порядку:

1. [.github/copilot-instructions.md](/blog/artifacts/agentic-flow-how-to-guide-copilot-instructions)
2. общие skills, на которые ссылается агент
3. локальные инструкции агента в файле `.agent.md`
4. runtime-оболочка задачи от пользователя или родительского агента

Это означает, что дочерний агент должен специализировать общие правила, а не противоречить им.

### Карта наследования для этого рабочего пространства

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


### Общий контракт

Общий агентный контракт — самый важный слой наследования, потому что он стандартизирует:

- оболочку задачи
- ожидаемые входные поля
- схему вывода
- обработку отказов

В этом рабочем пространстве общая оболочка задачи содержит:

- `task_id`
- `objective`
- `mode`
- `input_artifact`
- `constraints`
- `expected_output`
- `parent_agent`

Общий контракт возврата содержит:

- `status`
- `agent`
- `summary`
- `result`
- `notes`

Именно это позволяет нескольким агентам взаимодействовать друг с другом без необходимости каждый раз придумывать новый мини-протокол.

## Режимы выполнения

### 1. Последовательный режим

#### Что это значит

Последовательный режим — это пошаговый конвейер, управляемый оркестратором.

Оркестратор остаётся ответственным за каждую передачу:

```text
main-orchestrator -> worker1 -> main-orchestrator -> worker2 -> main-orchestrator -> worker3
```

#### Когда его использовать

- когда каждый шаг зависит от предыдущего результата
- когда вам нужны централизованный контроль и видимость
- когда отказ должен немедленно остановить поток

#### Преимущества

- самый простой для понимания режим
- самый сильный контроль со стороны оркестратора
- прямолинейные логирование и повторы

#### Компромиссы

- медленнее, чем параллельный режим
- оркестратор находится на критическом пути между всеми шагами

#### Пример

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

#### Как это реализовать

1. Оркестратор получает исходный ввод.
2. Оркестратор отправляет ввод в `worker1`.
3. `worker1` возвращает структурированный результат.
4. Оркестратор берёт `worker1.result` и отправляет его в `worker2`.
5. Оркестратор берёт `worker2.result` и отправляет его в `worker3`.
6. Оркестратор возвращает финальный вывод worker-а вместе с историей шагов.

### 2. Параллельный режим

#### Что это значит

Параллельный режим — это паттерн fan-out, при котором оркестратор отправляет один и тот же ввод нескольким worker-ам одновременно.

```text
main-orchestrator -> worker1
main-orchestrator -> worker2
main-orchestrator -> worker3
```

Затем оркестратор агрегирует результаты.

#### Когда его использовать

- когда workers независимы друг от друга
- когда вам нужны сравнительные результаты
- когда скорость важнее пошаговой зависимости

#### Преимущества

- более быстрое выполнение, когда задачи независимы
- хорошо подходит для экспериментов и сравнений
- простая модель агрегации

#### Компромиссы

- workers не могут строить результат друг на друге
- прежде чем результаты можно будет напрямую сравнивать, может потребоваться постобработка

#### Пример

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

#### Как это реализовать

1. Оркестратор получает исходный ввод.
2. Оркестратор отправляет один и тот же `input_artifact` всем worker-ам.
3. Каждый worker независимо возвращает свой структурированный результат.
4. Оркестратор объединяет результаты в объект, ключами которого служат workers.

### 3. Иерархический режим

#### Что это значит

Иерархический режим — это делегированная цепочка, где оркестратор запускает поток, но workers передают управление дальше по линии:

```text
main-orchestrator -> worker1 -> worker2 -> worker3
```

Это отличается от последовательного режима, потому что оркестратор не является точкой передачи между каждым этапом.

#### Когда его использовать

- когда подпотоком должны владеть сами workers
- когда вам нужна вложенная ответственность
- когда более поздние workers концептуально являются дочерними по отношению к более ранним

#### Преимущества

- поддерживает древовидные или вложенные паттерны делегирования
- может сократить orchestration chatter
- естественно моделирует цепочки обработки родитель-потомок

#### Компромиссы

- его сложнее трассировать, чем управляемый оркестратором последовательный режим
- worker-агенты перестают быть чистыми leaf nodes
- обработка отказов и наблюдаемость становятся сложнее

#### Важное замечание по архитектуре

В этом рабочем пространстве иерархический режим реализован так, что workers могут делегировать другим workers.

Это означает следующее:

- `worker1` становится родителем для `worker2`
- `worker2` становится родителем для `worker3`
- только `worker3` остаётся настоящим leaf в иерархическом пути

Это главное концептуальное отличие от worker skill по умолчанию, который описывает workers как leaf agents, если явно не задано иное.

#### Пример

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

#### Как это реализовать

1. Оркестратор запускает поток, вызывая `worker1`.
2. `worker1` преобразует ввод и пересылает результат в `worker2`.
3. `worker2` преобразует ввод и пересылает результат в `worker3`.
4. `worker3` возвращает терминальный вывод.
5. Поток возвращает финальный результат вместе с происхождением этапов.

## Последовательный vs Параллельный vs Иерархический

| Подход | Точка контроля | Модель зависимостей | Лучше всего подходит для |
| --- | --- | --- | --- |
| Последовательный | Оркестратор между каждым шагом | Сильная пошаговая зависимость | Конвейеров с централизованным контролем |
| Параллельный | Оркестратор делает fan-out и агрегирует | Независимые workers | Скорости, сравнения, мультивариантных результатов |
| Иерархический | Workers делегируют вниз по цепочке | Вложенная зависимость родитель-потомок | Древовидных подпотоков и делегированной ответственности |

## Как спроектировать похожий agentic flow

### Шаг 1. Один раз определите базовый контракт

Поместите общие правила в `.github/copilot-instructions.md` и держите их достаточно общими:

- оболочка задачи
- схема результата
- схема отказа
- ограничения делегирования

### Шаг 2. Вынесите переиспользуемое поведение в skills

Используйте один skill общего контракта, а затем создайте skills для конкретных ролей, например:

- orchestration
- worker execution
- validation
- domain-specific transformation

Именно так вы избегаете копирования одной и той же prompt-логики в каждого агента.

### Шаг 3. Держите файлы агентов тонкими

Каждый файл агента должен отвечать только на такие вопросы:

- за что отвечает этот агент
- какие skills он использует
- каких дочерних агентов он может вызывать
- что отличает его от соседних агентов

Если правило относится ко многим агентам, его обычно стоит поднять выше — в общий skill или глобальную инструкцию.

### Шаг 4. Выберите правильный режим выполнения

Используйте:

- последовательный режим для конвейеров, управляемых оркестратором
- параллельный режим для независимых ветвей
- иерархический режим для делегированных поддеревьев или вложенных цепочек

Не выбирайте иерархический режим только потому, что он выглядит более продвинутым. Его стоит использовать тогда, когда делегирование, которым владеют workers, действительно является лучшей моделью.

### Шаг 5. Делайте выводы трассируемыми

Всегда возвращайте достаточно структуры, чтобы родитель понимал:

- кто выполнял шаг
- какой ввод был получен
- какой вывод был произведён
- был ли шаг успешным

Примеры вывода в этом рабочем пространстве — хороший паттерн, потому что они сохраняют и финальный результат, и путь, по которому он был получен.

## Рекомендуемые улучшения

1. Определитесь, должны ли workers по умолчанию действительно быть leaf agents, или же иерархическое делегирование — это requirement первого класса.
2. Если иерархический режим является первым классом, обновите формулировки worker skill так, чтобы они явнее описывали workers как внутренние узлы.
3. Сохраняйте стабильность общего контракта, чтобы все режимы выполнения возвращали совместимые структуры результата.
4. Позже рассмотрите семантические имена workers, такие как `normalize`, `transform` и `finalize`, когда паттерн стабилизируется.

## Главный вывод

Самый чистый способ построить агентное наследование в GitHub Copilot — рассматривать наследование как слоистую prompt-архитектуру:

- базовые инструкции для универсальной политики
- общие skills для переиспользуемого поведения
- тонкие агенты для специализации
- явные режимы выполнения для управления потоком

Все три режима выполнения — ценные инструменты в вашем наборе проектирования:

- последовательный — самый понятный конвейер под управлением оркестратора
- параллельный — самая ясная модель fan-out
- иерархический — самый мощный, но и самый структурно директивный

Если вы внедряете agentic flow в новую команду, начните с последовательного режима, добавьте параллельный, когда задачи независимы, и вводите иерархический только тогда, когда вам действительно нужны цепочки делегирования, которыми владеют workers.

## Полезные спецификации и документация GitHub Copilot

- [About customizing GitHub Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization) - Обзор инструкций на уровне репозитория, path-specific instructions и связанных механизмов настройки.
- [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) - Практическое руководство по созданию `.github/copilot-instructions.md` и `.github/instructions/*.instructions.md`.
- [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support) - Справочная матрица о том, где поддерживаются инструкции на уровне репозитория, path-specific, личные и организационные инструкции.
- [About custom agents](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents) - Концептуальный обзор того, что такое custom agents, где они хранятся и как вписываются в workflow Copilot.
- [Creating custom agents for Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents) - Пошаговое руководство по созданию профилей `.github/agents/*.agent.md`.
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration) - Справочная документация по frontmatter агентов, наборам инструментов, настройкам модели и поведению вызова.
- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) - Объясняет, что такое skills и как они дополняют инструкции и custom agents.
- [Creating agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-skills) - Практическое руководство по структурированию `.github/skills/<skill>/SKILL.md` и связанных ресурсов.
- [About hooks](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks) - Концептуальное объяснение триггеров hooks, событий жизненного цикла и сценариев governance.
- [Using hooks with GitHub Copilot agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks) - Руководство по реализации `.github/hooks/hooks.json` и shell-based hook actions.
- [Hooks configuration](https://docs.github.com/en/copilot/reference/hooks-configuration) - Справочник по структуре манифеста hooks, событиям и деталям конфигурации.
- [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) - Компактная шпаргалка, которая сопоставляет инструкции, агентов, skills, hooks и другие механизмы настройки в одном месте.
