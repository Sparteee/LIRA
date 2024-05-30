# L.I.R.A. - Hackathon Vue 2024 - LP MIAW
## 🚀 Thème

En l'an 2198, vous avez embarqué à bord de l'Arcadie, le vaisseau spatiale abritant le reste de l'Humanité vers Keppler-438b. Le commandant vous a réunis pour l'aider à outiller la navette pour ce long périple. Voici le message du commandant :

> Chers voyageurs,
>
> Je me tiens devant vous, Bill Adama, commandant de l'invincible vaisseau Arcadie.
>
> En cette année de notre ère 2198, nous avons été contraints de quitter notre chère Terre, désormais un désert stérile, inhospitalier.
>
> Notre destination, Kepler-438b, se dresse devant nous, à des années-lumière de notre patrie perdue. Cette exoplanète, cet éden lointain, représente notre dernier > espoir, le dernier bastion où l'humanité peut renaître de ses cendres.
>
> Les flammes dévastatrices de cataclysmes naturels ont précipité notre départ. Dans cette urgence, l'Arcadie et son équipage se sont lancés dans les abysses de > l'immensité cosmique, sans toutes les ressources nécessaires à notre survie.
>
> Et c'est à vous, vous, les meilleurs des meilleurs des meilleurs, que nous faisons appel aujourd'hui !
>
> Voici les grands défis qui se dressent devant nous, des défis qui réclament votre bravoure, votre ingéniosité, votre dévotion :
>
> - En premier lieu, le secteur médical, gardien de nos vies précieuses,
> - La gestion judicieuse des ressources naturelles, pierre angulaire de notre survie,
> - Les ressources humaines, la force et la volonté qui font battre le cœur de notre communauté,
> - Les archives, gardiennes de notre passé, guides de notre futur,
> - Les divertissements et loisirs, sources de lumière dans l'obscurité de l'espace infini,
> - La gestion technique et la maintenance du vaisseau, garantes de notre progression sûre,
> - Enfin, les innovations, phares éclairant notre chemin vers un avenir prometteur.
>
> Rejoignez-nous, valeureux compagnons, et ensemble, écrivons le prologue d'une nouvelle ère pour l'humanité !

## Objectif

Le hackathon débutera le jeudi 4 avril à 9h30 et se poursuivra jusqu'au vendredi 5 avril à 12h, sans interruption pour la phase de projet. La présentation du projet et de son concept se déroulera lors d'une séance commerciale à partir de vendredi à 14h.

L'objectif de LIRA (Logiciel Intelligent de Réparation Avancée) est d'améliorer la gestion technique et la maintenance du vaisseau Arcadie par les mécaniciens. Chaque zone du vaisseau est équipée de capteurs surveillant des éléments critiques tels que la température, l'oxygène, la gravité, l'énergie et Stelaris.

Chaque zone est dotée de ses propres indicateurs avec des niveaux spécifiques. En permanence, l'application est connectée à un système d'alerte qui surveille en temps réel si l'un des indicateurs dépasse les seuils critiques. En cas d'anomalie, une alerte est émise, indiquant la zone et l'indicateur concernés. Un bouton sur cette alerte permet d'accéder à un espace où l'on peut signaler la résolution du problème, ainsi que consulter une documentation sur la résolution de chaque type de panne.

### Les capitaines

Pour nous assister, chaque équipe s'est vu attribuer un capitaine désigné au hasard le matin même de l'épreuve. Ces capitaines étaient là pour nous guider dans nos choix techniques et fonctionnels, nous aider à nous organiser et à participer à la réflexion. Ils étaient des professionnels expérimentés de la Tech de l'entreprise Sellsy.

Pour L.I.R.A., nous avons été accompagnés par Axel BARATEAU, Product Owner chez Sellsy, qui nous a grandement aidés dans notre organisation durant ces deux jours intenses. Cela nous a permis de présenter L.I.R.A dans une version aboutie avec une présentation exemplaire. Nous lui sommes reconnaissants d'avoir joué le jeu et de s'être investi dans notre projet.

## 📂 Stack

### Le frontend

- Vue

### Le backend

Dans le dossier `strapi-server`, vous trouverez un projet minimal d'API construit avec [Strapi](https://strapi.io/). Il vous permettra d'avoir un peu de liberté quant aux entités et informations disponibles dans l'API.

- Lien de l'administration: http://localhost:1337/admin
- Lien de la documentation OpenAPI: http://localhost:1337/documentation/v1.0.0
- Endpoint de base: http://localhost:1337/api

## ☕ Installation du projet

Clonez ce projet :

```bash
git clone git@github.com:Sparteee/LIRA.git lira
cd lira
```


Lancez le serveur pour la première fois:

```bash
cd strapi-server
cp .env.example .env
npm install
npm run build
npm run develop
```

Et vous connectez à l'interface d'admin du serveur sur l'url : http://localhost:1337/admin/

Lancez le frontend :

```
cd front
npm run dev
```

## Auteurs

 - Axel BARATEAU - Chef de Projet
 - [Johan MORGA](https://github.com/JohanMorga) - Développement
 - [Sean REYBOZ](https://github.com/SeanReyboz/) - Développement
 - [Raphaël VICTOR](https://github.com/Sparteee) - Développement
 - Arthur JARRIAU - Développement
 - Bastien Joly - Développement
 - Margot BODIER - Design - Communication
 - [Valentin TOUZINAUD](https://github.com/ValentinTouzinaud) - Design - Communication
 - William CAMILLERI - Design - Communication


