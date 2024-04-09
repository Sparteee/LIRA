# LIRA - Hackathon Vue 2024 - LP MIAW
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

## 📅 L'événément

### Consignes

L'événement débute jeudi 04 avril à 9h30, jusqu'au vendredi 05 avril 12h sans interuption pour la partie projet. Le vendredi à 14h débutera la présentation des dits-projets.

Vous devez rendre votre projet fait avec Vue pour le vendredi 12h, heure du dernier commit sur **gitlab de l'université** faisant foi.
Vous présenterez votre projet et son concept lors d'une présentation commerciale à partir de vendredi 14h.

### Les capitaines

Pour vous épauler, chaque équipe aura un capitaine tiré au sort le matin-même de l'épreuve. Ils seront là pour vous aiguiller dans vos choix techniques et fonctionnels, vous aider à vous organiser et participer à la réflexion. Ces capitaines sont des personnes expérimentées de la Tech, qui viennent vous donner de leurs temps, alors n'hésitez pas à les solliciter et échanger avec eux sur le métier en général ! 😉

## 📂 Stack

### Le frontend

Créez un projet Vue à la racine du projet, au même niveau que celui du serveur.

Restrictions :

- framework JS : Vue only
- framework CSS ✅ (Tailwindcss, bootstrap, bulma, etc...)
- framework UI ✖️ (PrimeVue, Vuetify, Element, ...)

### Le backend

Dans le dossier `strapi-server`, vous trouverez un projet minimal d'API construit avec [Strapi](https://strapi.io/). Il vous permettra d'avoir un peu de liberté quant aux entités et informations disponibles dans l'API.

⚠️ Vous n'avez pas spécialement à coder dans cette partie là. Strapi a été choisi car, comme vu en cours, il vous permet de créer des routes, entités et champs facilement au travers d'une interface d'administration. Le but reste de développer votre application Vue ! Si vous n'avez pas optimisé, protégé ou gérer vos profils de privilèges/routes/entités, **ce n'est pas grave !**

- Lien de l'administration: http://localhost:1337/admin
- Lien de la documentation OpenAPI: http://localhost:1337/documentation/v1.0.0
- Endpoint de base: http://localhost:1337/api

## ☕ Getting Started

Clonez ce projet :

```bash
git clone git@gitlab.univ-lr.fr:vue-2024/hackathon.git
cd hackathon
```

Créer un projet sur le gitlab de l'université, puis ajouter la remote au projet.

Lancez le serveur pour la première fois:

```bash
cd strapi-server
cp .env.example .env
npm install
npm run build
npm run develop
```

Ensuite lors de vos développements :

```bash
npm run develop
```

Et vous connectez à l'interface d'admin du serveur sur l'url : http://localhost:1337/admin/

Lancez le frontend :

```
Vous savez faire 😉
```

## ⚙️ Utiliser Strapi

Dans l'interface d'administration de Strapi, il faut distinguer 2 parties différentes: le Contenu et le Content-Type Builder.

Le **contenu** est simplement la donnée présente dans votre API: un patient, un utilisateur, une visite, etc... qui est administrable. Création, modification, suppresion, vous pouvez faire tout ce qu'un CMS classique peut faire.

Le **Content-Type Builder** est la partie où vous configurez vos entités, ces champs, ses relations, etc...
Exemple, je peux créer un type de contenu Patient, qui a plusieurs champs: nom, prénom, date de naissance, ... N'hésitez pas à parcours tous les choix de champs proposés par Strapi et notamment les Relations.

Les **Relations** sont un type de champs qui lie de différentes manières 2 entités entre-elles. Ex: Un patient a plusieurs traitements. Une tournée a plusieurs patients.

Les **Singles Types** sont un type de contenu dont vous n'aurez pas spécialement besoin. Il s'agit d'élément à caractère unique, homepage, footer par exemple, très utile dans le cas où Strapi vous sert de templating CMS complet (comme WordPress).

Les **Components** sont des groupes de champs répétables qui ne sont pas lié à des entités.

Vous avez également accès à une **médiathèque** pour gérer les assets de vos entités.

### Travailler à plusieurs sur Strapi

Votre base de donnée est situé dans le fichier `./.tmp/data.db`. ⚠️ Ne le commitez surtout pas, ne le modifiez pas à la main ⚠️

**La base de donnée n'est pas partagée entre les développeurs, seuls les schémas le sont.**

Il est possible que vous ayez des conflits sur les schémas lorsque vous deux personnes ou plus ont travaillé sur la même entité. Les conflits restent gérables dans la mesure où il s'agit de fichier JavaScript.

C'est-à-dire que lorsque vous rajouterez un champs à une entité, la configuration de ce champs sera commité. Les autres développeurs pourront la récupérer par git.
Chacun de votre coté, vous travaillerez avec votre jeu de donnée.

### Gestion de la data

Il vous sera possible de partager votre donnée avec votre équipe par le biais de commande strapi.

**Exporter sa base**

[Documentation](https://docs.strapi.io/dev-docs/data-management/export)

Les comptes administrateurs ne sont pas exportés

```bash
npm run strapi export -- --file filename

```

**Importer une base**

[Documentation](https://docs.strapi.io/dev-docs/data-management/import)

⚠️ Cette manipulation efface et remplace toutes les données de la base destinataire ⚠️

```bash
npm run strapi import -- -f filename.tar.gz.enc

```

### Gérer les droits

Strapi s'accompagne d'une gestion des profils de profils de privilèges simplifié afin de sécuriser (ou non) votre API rapidement.

Dans Paramètres > Users Permissions, vous trouverez par défaut 2 profils: Authenticated et Public.
Pour chaque profil, vous pouvez choisir quelles sont les actions possibles pour chaque entité de votre API.

Vous pouvez donc gérer de l'inscription et de l'authenfication de nouvel utilisateur sur votre futur app ;)

## Disclaimer

Vous pouvez à tout moment demander de l'aide que ce soit pour débugger votre app Vue ou votre API.

# ENJOY 🎉
