![El día en que nació el Provenance Manifesto](/images/blog/the_day_the_provenance_manifesto_was_born.jpeg)

# El día en que nació el Provenance Manifesto.

**Author:** Yauheni Kurbayeu  
**Published:** March 8, 2026  
**[LinkedIn](https://www.linkedin.com/posts/yauhenikurbayeu_over-the-past-months-i-have-been-exploring-activity-7436171607305318401-Vj3D?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAvr38Bav3RGiyv777cbZGFw7M1kSDr-dU)** 


Durante los últimos meses he estado explorando una pregunta que al
principio parecía técnica, pero que gradualmente resultó ser mucho más
amplia.

**¿Por qué el desarrollo de software casi no tiene memoria de sus
propias decisiones?**

Esta pregunta condujo a una serie de artículos en los que examiné el
problema desde varios ángulos.

Primero analicé la ilusión de que los humanos recuerdan todo acerca de
los sistemas que construyen. En realidad, los equipos cambian, los
arquitectos siguen adelante y el razonamiento detrás de los sistemas
desaparece silenciosamente mientras los propios sistemas permanecen.

Luego exploré si los enfoques modernos de recuperación mediante IA
podrían ayudar a preservar ese razonamiento. La búsqueda vectorial y
RAG parecían prometedores al principio, pero cuanto más profunda se
volvía el análisis, más claro resultaba que la búsqueda por similitud
por sí sola no puede reconstruir la cadena de suposiciones, riesgos,
restricciones y compensaciones que existen detrás de las decisiones
reales de ingeniería.

Esa constatación llevó a la idea de una **memoria de procedencia basada
en grafos incrementales**, una forma de preservar no solo documentos,
sino también las relaciones entre las decisiones y el contexto que las
produjo.

En cierto momento, la discusión dejó de ser puramente técnica.

El verdadero problema resultó ser algo más profundo: **la ingeniería de
software nunca ha tratado las decisiones como artefactos de primera
clase.**

Versionamos el código, almacenamos commits y reproducimos builds.  
Pero el razonamiento que da forma a los sistemas desaparece casi
inmediatamente.

A medida que la IA acelera la velocidad con la que se puede producir
software, esta brecha se vuelve aún más peligrosa.

Por eso hoy estoy publicando el **Provenance Manifesto**.

-   La IA puede acelerar la ejecución de forma dramática.
-   La procedencia preserva la responsabilidad.

## Algunas reflexiones adicionales detrás del manifiesto

Durante esta investigación quedó claro que el verdadero desafío no es la
documentación ni la recuperación del conocimiento. El desafío es que la
ingeniería de software nunca ha establecido un **sistema de registro de
decisiones**.

Toda arquitectura, comportamiento de producto, proceso operativo y
respuesta a incidentes se origina en decisiones. Sin embargo, esas
decisiones rara vez sobreviven más tiempo que los equipos que las
tomaron.

Las organizaciones heredan sistemas, pero no el razonamiento que hay
detrás de ellos.

El **Provenance Manifesto** propone un cambio simple:

-   Las decisiones deben llevar contexto.
-   Deben evolucionar, pero nunca desaparecer.
-   Deben ser consultables.
-   Deben tener responsables.

Y a medida que la IA se convierte en un participante activo en el
desarrollo, debería operar dentro de un **marco transparente de
gobernanza de decisiones**.

Publicar el manifiesto **no es la conclusión de la investigación**.

En muchos sentidos, **es el comienzo**.

Si este tema resuena contigo, ya sea que trabajes en arquitectura,
sistemas de conocimiento, herramientas de IA o liderazgo de ingeniería,
valoraría sinceramente tu perspectiva.

------------------------------------------------------------------------

### Contribute

Tu contribución es muy apreciada:

https://github.com/yauhenikurbayeu/ProvenanceManifesto/blob/main/README.md
