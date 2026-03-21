# The Fluency Paradox: When AI Sounds Right but Stops Being Reliable

**Author:** Yauheni Kurbayeu
**Published:** Mar 21, 2026 

**TL;DR Cet article montre que la fluidité de l’IA peut masquer des violations subtiles de contraintes et de frontières : les sorties paraissent correctes, mais ne sont pas totalement fiables. Pour détecter et expliquer ces dérives, nous avons besoin de Provenance — une mémoire traçable des décisions et du contexte — et pas seulement d’une validation des résultats.**

# Building an Automated Translation Pipeline for a Markdown Blog with GitHub Copilot

**Author:** Yauheni Kurbayeu
**Published:** Mar 20, 2026 

**TL;DR Ce guide explique comment automatiser un blog Markdown en pipeline de publication multilingue à l’aide des agents GitHub Copilot, où un orchestrateur coordonne des sous-agents par langue, met à jour les résumés README, applique des hooks et des skills comme garde-fous, et produit des résultats reproductibles et scalables.**

# Provenance Is Not About Tools. It Is About Mindset

**Author:** Yauheni Kurbayeu  
**Published:** Mar 15, 2026  

**TL;DR Les humains résistent naturellement à partager le raisonnement derrière leurs décisions, car le contexte et la mémoire ont historiquement été une source d’influence et d’avantage professionnel. En conséquence, de nombreuses décisions critiques restent non documentées et n’existent que dans des conversations ou dans la mémoire individuelle. À l’ère augmentée par l’IA, cela devient un sérieux problème de gouvernance, car les systèmes évoluent plus rapidement et le raisonnement derrière les changements disparaît encore plus vite. Sans préserver le contexte des décisions, les organisations perdent la capacité d’expliquer, d’auditer ou de faire évoluer leurs systèmes en toute sécurité. Le basculement provoqué par l’IA transforme donc la provenance des décisions d’une préférence culturelle en une exigence structurelle de gouvernance organisationnelle.**


# Why Decisions Must Become a First-Class Artifact

**Author:** Yauheni Kurbayeu  
**Published:** Mar 14, 2026  

**TL;DR Une fois que les décisions deviennent des artefacts de première classe, quelque chose change fondamentalement. Lorsque l’environnement évolue, nous ne sommes plus contraints de redécouvrir le raisonnement derrière le système par une forme d’archéologie et de spéculation. Nous pouvons plutôt revisiter la décision originale, mettre à jour les hypothèses qui ne sont plus valides et régénérer l’implémentation d’une manière qui reflète le nouveau contexte.**


# 2030 A Provenance-Native Company

**Author:** Yauheni Kurbayeu  
**Published:** Mar 13, 2026 

**TL;DR Imaginons une « entreprise native de la provenance » en 2030 — une organisation construite dès le départ autour de la lignée des décisions, de la mémoire du SDLC et de la traçabilité de l’exécution de l’IA, plutôt que d’essayer de l’ajouter après coup.**


# Why Organizational Memory Is Not Just an AI Knowledge System.

**Author:** Yauheni Kurbayeu  
**Published:** Mar 11, 2026 

**TL;DR Suite à la publication de la version initiale du Provenance Manifesto, j’ai commencé à examiner si les solutions existantes sur le marché s’alignent réellement avec les principes qui y sont décrits.**


# The Day the Provenance Manifesto was Born

**Author:** Yauheni Kurbayeu  
**Published:** March 8, 2026  

**TL;DR Cet article explore un problème simple mais souvent négligé : les organisations logicielles préservent rarement le raisonnement derrière leurs décisions, alors même que ces décisions façonnent tout ce qu’elles construisent. Il soutient que la simple récupération par IA et la documentation ne suffisent pas à résoudre ce problème, car ce qui manque est un système structuré enregistrant les relations entre décisions, hypothèses et résultats. Le Provenance Manifesto propose de traiter les décisions comme des artefacts de première classe afin que les organisations puissent préserver l’intention, la responsabilité et la lignée des décisions à mesure que l’IA accélère le développement logiciel.** 
 

# Git for Decisions Needs a Brain, But What Kind?

**Author:** Yauheni Kurbayeu  
**Published:** Mar 4, 2026  

**TL;DR En construisant SDLC Memory, je me suis retrouvé face à un dilemme architectural inattendu. Le système doit-il raisonner comme un agent autonome, se comporter comme un transformateur de données déterministe, ou se situer quelque part entre les deux ? Je suis encore en train de décider quelle direction est la bonne pour le MVP.**


# From RAG to Provenance (Part 2): How Incremental Graph Memory Actually Learns.

**Author:** Yauheni Kurbayeu  
**Published:** Feb 28, 2026  

**TL;DR Dans « Part 1 - From RAG to Provenance: How We Realized Vector Alone Is Not Memory », nous sommes passés de RAG à la provenance, de la similarité à la lignée. Mais si les agents d’IA génèrent 50 à 80 % du travail futur, la vraie question devient : comment la mémoire se met-elle à jour en toute sécurité ? Comment les nouvelles décisions sont-elles validées, reliées et gouvernées, au lieu d’être simplement intégrées sous forme d’embeddings ? Cet article montre étape par étape le processus incrémental de mise à jour du graphe de mémoire des décisions avec un exemple réel. Car à l’ère de l’IA, la mémoire doit évoluer, pas seulement récupérer.**


# From RAG to Provenance: How We Realized Vector Alone Is Not Memory.

**Author:** Yauheni Kurbayeu  
**Published:** Feb 22, 2026 

**TL;DR Et si votre SDLC ne se souvenait en réalité de rien et ne faisait que récupérer des fragments ? Nous avons construit de puissants systèmes RAG capables de faire apparaître un texte « pertinent » en quelques millisecondes. Mais la pertinence n’est pas la causalité. Et lorsqu’un incident survient en production, la similarité ne vous dira pas pourquoi cela s’est produit ni quelle décision, quel risque ou quelle dépendance y a conduit. Dans cet article, j’explique pourquoi la recherche vectorielle seule n’est pas une mémoire, comment la structure en graphe change la donne, et comment la combinaison des vecteurs avec un modèle strict de provenance transforme une documentation dispersée en quelque chose qui se rapproche davantage d’une cognition organisationnelle. Si l’explicabilité, la lignée des décisions et l’intelligence réelle de livraison vous intéressent, cet article est pour vous.**


# Why Humans Think They Remember Everything And Why SDLC Memory Proves They Don’t

**Author:** Yauheni Kurbayeu  
**Published:** Feb 22, 2026  

**TL;DR Chapitre suivant : SDLC Memory & Provenance. Dans les chapitres précédents, nous avons exploré pourquoi le SDLC n’a pas de véritable mémoire et pourquoi la provenance doit devenir structurelle et non optionnelle. Dans cette étape suivante, nous abordons une question plus inconfortable. Et si le véritable goulot d’étranglement de la livraison n’était pas la vélocité, les outils, ni même les capacités de l’IA… mais les limites biologiques du contexte humain ? Les humains peuvent maintenir activement environ quatre contraintes significatives à la fois. Les agents modernes peuvent traiter des centaines de milliers de tokens. Et pourtant, ni l’un ni l’autre ne peut se souvenir d’un produit vivant dans le temps sans structure. Ce chapitre relie la science cognitive, les fenêtres de contexte de l’IA et une architecture pratique de mémoire Hot/Warm/Cold pour montrer pourquoi une mémoire durable du SDLC n’est pas une surcharge documentaire ; c’est un avantage concurrentiel. Si l’exécution devient moins coûteuse, la mémoire devient le différenciateur. Parlons de la façon de la construire.**


# How Should Intellectual Capital Be Assessed In The Context Of Artificial Intelligence Increasingly Replacing Human Roles?

**Author:** Yauheni Kurbayeu  
**Published:** Feb 16, 2026  

**TL;DR Dans les chapitres précédents, nous avons parlé de SDLC Memory et de provenance comme d’un moyen de réduire le chaos, de protéger l’intégrité de la livraison et de rendre les décisions traçables au sein des organisations d’ingénierie. Maintenant, je souhaite élargir la perspective. Car si l’IA change la manière dont les logiciels sont construits, elle transforme aussi quelque chose de bien plus vaste : la manière dont le capital intellectuel lui-même est évalué. Cet article n’est pas une digression par rapport à la discussion sur la provenance. Il en est la prochaine étape logique. Si l’exécution devient abondante, alors la mémoire, la gouvernance et l’architecture des décisions deviennent les véritables actifs. Parlons de ce qui arrive au capital intellectuel lorsque l’IA remplace matériellement des rôles humains, et de ce que cela signifie pour les entreprises qui veulent survivre.**


# AI will take the “What”, but Humans must own the “Why”

**Author:** Yauheni Kurbayeu  
**Published:** Feb 10, 2026 

**TL;DR L’IA prend rapidement en charge la couche du « quoi » dans le développement logiciel — en générant des architectures, du code, des optimisations et des solutions alternatives plus rapidement que les humains ne pourraient le faire. En conséquence, l’implémentation et l’exploration de solutions deviennent bon marché, évolutives et de plus en plus automatisées. Mais la véritable couche stratégique de l’ingénierie n’a jamais été le « quoi ». Les questions critiques sont le « pourquoi » — pourquoi une solution existe, pourquoi un compromis a été accepté, pourquoi un risque est tolérable et pourquoi un résultat particulier compte pour l’entreprise. Ces questions définissent l’intention, pas l’implémentation.**


# We are teaching AI to decide. But we are forgetting how to remember.

**Author:** Yauheni Kurbayeu  
**Published:** Jan 3, 2026  

**TL;DR À mesure que l’IA devient capable de proposer des architectures, d’écrire du code et d’optimiser des systèmes, le véritable danger n’est pas une IA malveillante, mais la perte de l’intention humaine derrière les systèmes que nous construisons. Les organisations ont déjà du mal à se souvenir pourquoi certaines décisions ont été prises ; dans un environnement augmenté par l’IA, ce problème devient beaucoup plus sérieux, car les machines peuvent optimiser des solutions plus rapidement que les humains ne peuvent les comprendre. Pour éviter de construire des systèmes qui optimisent parfaitement de mauvais objectifs, nous avons besoin d’une nouvelle couche d’infrastructure appelée Provenance — un enregistrement structuré des décisions, des contraintes, des compromis et de l’intention qui relie le comportement du système à l’objectif humain. Sans cette couche de mémoire, les organisations risquent de devenir très efficaces mais stratégiquement désalignées, perdant progressivement la capacité d’expliquer ou de contrôler les systèmes qu’elles créent.** 


# Why SDLC has no memory (and why delivery teams keep paying for it)

**Author:** Yauheni Kurbayeu  
**Published:** Jan 1, 2026  

**TL;DR Les organisations de livraison logicielle perdent régulièrement le contexte derrière leurs décisions. Des mois après l’implémentation, les équipes sont souvent incapables d’expliquer pourquoi quelque chose a été construit, quels compromis ont été acceptés ou ce qui avait été initialement promis. Cela se produit parce que les outils du SDLC suivent des artefacts comme les tickets, les commits, les heures et les coûts — mais pas l’intention, les engagements et le raisonnement qui les sous-tendent. Le résultat est une « amnésie de contexte » : les équipes reconstruisent des solutions, répètent des décisions, se disputent sur le périmètre et subissent du retravail, une érosion des marges et de l’épuisement. Le problème central n’est pas des équipes négligentes, mais une lacune systémique : le SDLC n’a pas de mémoire intégrée du raisonnement des décisions. La question inconfortable posée par l’article est la suivante : pourquoi, dans le développement logiciel moderne, suivons-nous rigoureusement l’exécution mais pas le raisonnement qui l’a façonnée ?**