![Git for Decisions Needs a Brain, But What
Kind?](/images/blog/git_for_decisions_needs_a_brain_but_what_kind.png)

# Git pour les décisions a besoin d'un cerveau. Mais lequel ?

**Author:** Yauheni Kurbayeu\
**Published:** Mar 4, 2026\
**[LinkedIn](https://www.linkedin.com/pulse/git-decisions-needs-brain-what-kind-yauheni-kurbayeu-pzc9c/?trackingId=8QfsKWcXmBSVGbckPOYlOA%3D%3D)**

Au cours des derniers mois, j'ai commencé à construire quelque chose qui
a débuté comme une simple expérience de pensée et qui s'est
progressivement transformé en un véritable système. Je l'appelle **SDLC
Memory**. L'idée derrière ce concept est simple, presque embarrassante
de simplicité une fois qu'on l'énonce : les organisations logicielles
n'ont pas de mémoire.

Nous avons Git pour le code. Nous avons Jira pour les tâches. Nous avons
des systèmes de documentation remplis d'explications écrites après
coup.\
Mais le raisonnement réel derrière les décisions d'ingénierie disparaît
presque toujours.

Quelques mois plus tard, quelqu'un de nouveau rejoint l'équipe, ouvre un
dépôt, observe une architecture étrange et pose la question inévitable :

> « Pourquoi avons-nous construit cela de cette manière ? »

La réponse habituelle est un mélange de suppositions et de souvenirs
vagues. Quelqu'un se souvient d'un incident en production. Quelqu'un
d'autre pense que cela avait quelque chose à voir avec la scalabilité.
Une troisième personne se rappelle vaguement une discussion sur la
conformité. Aucune de ces explications n'est fausse, mais aucune n'est
vraiment fiable non plus.

C'est à ce moment que l'idée de **Git for Decisions** est née.

Imaginez si chaque discussion importante, chaque note de réunion et
chaque conversation architecturale pouvaient être traduites en artefacts
structurés. Un nœud de décision expliquant ce qui a été choisi. Un nœud
de risque expliquant ce qui pourrait mal se passer. Un nœud d'hypothèse
capturant ce que tout le monde croyait à ce moment-là. Des questions
encore non résolues. Des actions à entreprendre qui en ont découlé.

Au lieu de vivre dans des fils Slack et des enregistrements de réunions,
ces artefacts formeraient un graphe. Avec le temps, le système
accumulerait une carte vivante du raisonnement d'ingénierie. Lorsqu'une
nouvelle décision apparaît, le système pourrait la comparer avec les
décisions historiques et dire quelque chose comme :

> « Il y a deux mois, l'équipe a décidé de retarder le déploiement de
> l'instance EU parce que l'instabilité de l'infrastructure créait un
> risque opérationnel. Aujourd'hui, une nouvelle décision propose de
> reporter à nouveau ce déploiement en raison de changements dans
> l'interprétation du GDPR. Ces décisions pourraient être liées. »

Plus j'explorais cette idée, plus elle semblait techniquement
réalisable. Les LLM modernes sont étonnamment efficaces pour extraire un
sens structuré à partir de conversations désordonnées. Les bases de
données graphe sont excellentes pour connecter des entités et des
relations. La recherche vectorielle fonctionne bien pour identifier des
décisions sémantiquement similaires au fil du temps.

L'architecture a commencé à se former naturellement : ingérer du texte,
extraire des artefacts, résoudre les identités, les relier au graphe
existant, détecter les contradictions, puis valider la mise à jour comme
une nouvelle transaction.

Mais c'est à ce moment que je me suis heurté à un problème inattendu.

Le véritable défi n'était pas d'extraire la connaissance.

Le véritable défi était de décider **comment le système lui-même devait
réfléchir**.

Il existe au moins trois façons fondamentalement différentes de
concevoir le comportement d'exécution d'un tel système, et chacune mène
à une philosophie complètement différente sur la manière dont l'IA
devrait fonctionner dans les workflows d'ingénierie logicielle.

## Approche 1 : flux agentique à l'exécution (LLM comme contrôleur)

La première approche est ce que l'on appelle généralement
**l'architecture agentique**.

Dans ce modèle, le système se comporte presque comme un enquêteur. Le
processus commence lorsque de nouvelles notes de réunion ou discussions
architecturales entrent dans le pipeline. Un agent lit le texte et
extrait des décisions et des questions potentielles. Ensuite, il examine
le graphe existant et décide quelles parties pourraient être
pertinentes.

Supposons que le système lise une note disant :

> « Nous devrions reporter la mise en production de l'instance EU parce
> que de nouvelles clarifications GDPR introduisent des risques de
> conformité. »

Un système agentique pourrait alors explorer le graphe. Il pourrait
rechercher des décisions précédentes liées à l'infrastructure EU,
récupérer celle concernant le report du déploiement en raison d'une
instabilité de l'infrastructure, examiner les risques associés et
analyser la chronologie des décisions autour de cette version.

À un moment donné, le système pourrait estimer avoir suffisamment de
preuves et proposer une mise à jour :

> « Une nouvelle décision semble entrer en conflit avec un engagement
> précédent selon lequel l'instance EU devait être mise en production
> avant le deuxième trimestre. »

La beauté de cette approche est que le système se comporte presque comme
un ingénieur curieux. Il suit des pistes, explore le contexte et
découvre parfois des relations que les développeurs eux-mêmes n'ont pas
explicitement intégrées dans le workflow.

Mais cette flexibilité s'accompagne d'une prise de conscience
inconfortable. Dans un système agentique, l'IA décide **quoi**
investiguer et **quand** arrêter d'investiguer. Cela peut être
acceptable pour un assistant ou un outil de recherche, mais lorsque le
système doit maintenir la mémoire autoritative des décisions
d'ingénierie, l'imprévisibilité devient soudain un problème sérieux.

C'est pourquoi la deuxième philosophie architecturale va dans la
direction opposée.

## Approche 2 : Python contrôle le flux, les LLM et modèles d'embedding ne sont que des transformateurs

Au lieu de traiter le modèle comme un agent autonome, nous le traitons
comme un simple transformateur de données. L'intelligence du système se
déplace vers les parties déterministes du code.

Dans cette version, Python orchestre l'ensemble du pipeline avec un
contrôle strict. Lorsqu'un nouveau texte arrive, l'exécution suit une
séquence fixe d'opérations. D'abord, elle récupère des nœuds candidats
potentiels dans le graphe à l'aide de la similarité vectorielle.
Ensuite, elle récupère leur contexte dans Neo4j. Ce n'est qu'après avoir
assemblé les preuves pertinentes que le système appelle le modèle de
langage.

À ce moment-là, le modèle reçoit un ensemble d'informations
soigneusement préparé et on lui pose une question très précise : étant
donné ces artefacts et ces correspondances potentielles, déterminer s'il
s'agit de la même décision, d'une décision liée, ou d'un nouveau nœud.

Le modèle produit une sortie structurée --- et rien de plus. Il ne peut
pas explorer le graphe. Il ne peut pas récupérer d'informations
supplémentaires. Il ne peut pas décider d'effectuer une nouvelle
recherche. Il transforme simplement l'entrée fournie en une conclusion
structurée.

Du point de vue de l'ingénierie logicielle, cette approche est
extrêmement confortable. Chaque étape est déterministe. Chaque requête
du graphe est contrôlée. Le système se comporte davantage comme un
pipeline de compilation que comme un agent IA.

Mais cela soulève aussi une question inconfortable. Si nous réduisons le
modèle à un simple transformateur, **sous‑exploitons‑nous les capacités
de raisonnement** qui rendent ces modèles si puissants ? Après tout,
l'une des promesses de l'IA est sa capacité à remarquer des connexions
que nos règles artisanales pourraient manquer.

C'est ce qui conduit à la troisième approche, qui tente d'équilibrer les
deux mondes.

## Approche 3 : modèle hybride --- utiliser l'IA comme transformateur, mais permettre des branches contrôlées par Python selon des signaux de confiance

Le modèle hybride commence avec le pipeline déterministe mais permet au
système de devenir plus curieux lorsque l'incertitude apparaît.
L'exécution contrôle toujours le workflow principal. Elle récupère
toujours les nœuds candidats et construit des ensembles de preuves avant
de demander au modèle de les analyser.

Cependant, lorsque le modèle signale une faible confiance ou des
correspondances ambiguës, le pipeline élargit son espace de recherche.
Le système peut récupérer un ensemble plus large de décisions
candidates, explorer le voisinage du graphe autour d'un nœud
potentiellement lié, ou élargir la fenêtre temporelle pour inclure des
discussions architecturales plus anciennes.

Autrement dit, le système reste gouverné par du code, mais il est
autorisé à creuser plus profondément lorsque la situation l'exige.

Un exemple pratique pourrait ressembler à ceci. Le système lit une
discussion proposant de reporter un déploiement EU parce que les
exigences juridiques ont changé. Le pipeline déterministe récupère les
décisions historiques les plus similaires. Le modèle les analyse mais
renvoie une faible confiance parce que les preuves sont insuffisantes.

À ce moment‑là, l'exécution élargit la recherche, récupérant des
décisions liées à la fois à la conformité et à la stabilité de
l'infrastructure, et présente à nouveau ce contexte élargi au modèle. Ce
n'est qu'alors que le système détermine que la nouvelle proposition
intersecte en réalité avec deux décisions précédentes ayant des
motivations différentes.

Cette approche paraît moins rigide que le modèle transformateur mais
bien plus contrôlée que le modèle agentique.

## Et c'est précisément là que se situe mon dilemme actuel.

Chaque fois que j'examine le problème sous l'angle de la gouvernance et
de l'auditabilité, le pipeline transformateur déterministe semble être
le choix d'ingénierie responsable. Un système qui gère la mémoire
organisationnelle doit être prévisible, testable et reproductible.

Mais chaque fois que je pense au potentiel d'intelligence du système,
l'architecture agentique devient incroyablement tentante. La capacité
d'explorer dynamiquement le contexte pourrait révéler des relations dans
l'historique des décisions que **aucune règle de récupération
déterministe** ne pourrait jamais capturer.

Le modèle hybride se situe quelque part entre les deux, mais même ce
terrain intermédiaire cache des compromis difficiles.

Quels comportements devraient être déterministes ? Lesquels devraient
être adaptatifs ? Où tracer la frontière entre exploration et contrôle ?

C'est la question à laquelle je reviens constamment en construisant Git
for Decisions.

Si nous voulons créer un système qui se souvient du raisonnement
derrière l'architecture logicielle, **jusqu'à quel point devons‑nous
autoriser le système lui‑même à raisonner ?**

Doit‑il se comporter comme un enquêteur autonome, explorant le graphe
des décisions jusqu'à former une hypothèse ?

Doit‑il se comporter comme un pipeline de compilation discipliné qui
traite les entrées de manière strictement contrôlée ?

Ou doit‑il tenter un compromis prudent entre curiosité et gouvernance ?

Pour l'instant, je suis honnêtement indécis.

Et puisque de nombreuses idées les plus intéressantes sur l'architecture
logicielle émergent des discussions collectives plutôt que de la
réflexion solitaire, je suis curieux de savoir comment d'autres
aborderaient ce problème.

Si vous conceviez un système destiné à devenir la mémoire à long terme
des décisions d'ingénierie, **quelle architecture vous semblerait la
plus digne de confiance ?**
