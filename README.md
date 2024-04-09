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

Ensuite lors de vos développements :

```bash
npm run develop
```

Et vous connectez à l'interface d'admin du serveur sur l'url : http://localhost:1337/admin/

Lancez le frontend :

```
npm run dev
```

