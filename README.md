# Hackathon Angular 2023

Bienvenue dans ce hackathon autour du framework Angular pour votre année 2023 en Licence Pro !
Voici le boilerplate de votre projet.

## ⛵ Thematique

Vous êtes une jeune équipe d'entrepreneurs qui cherche des investissements. Et vous êtes au bon endroit, notre incubateur vous offre 2 jours pour faire vos preuves !

Fort de son implémentation cotière, La Rochelle offre un cadre idéal aux disciplines nautiques, notamment la voile. Imaginez et concevez une application sur ce thème, qu'il soit vraisemblable ou non ! Laissez parler votre imagination.

### 📝 Consignes

L'événement débutera du jeudi 30 mars à 9h, jusqu'au vendredi 31 mars 12h pour la partie projet.

Le vendredi à 14h débutera la présentation des dits-projets.

Vous devez rendre votre projet fait avec Angular pour le vendredi 12h, heure du dernier commit sur **gitlab de l'université** faisant foi.
Vous présenterez votre projet et son concept lors d'une présentation commerciale à partir de vendredi 14h.

### 👨‍✈️ Les capitaines

Pour vous épauler, chaque équipe aura un capitaine tiré au sort le matin-même de l'épreuve. Ils seront là pour vous aiguiller dans vos choix techniques et fonctionnels. Ces capitaines sont des développeurs expérimentés qui viennent vous donner de leurs temps, alors n'hésitez pas à les solliciter et échanger avec eux sur le métier en général ! 😉

## ⚙️ Stack

### Client

Dans le dossier `client`, vous placerez votre application frontend.
C'est votre dossier principal de travail pour cet événement. Libre à vous d'y faire toutes les modifications que vous souhaitez.

### Server

Dans le dossier `server`, vous trouverez un projet minimal d'API construit avec [Strapi](https://strapi.io/). Il vous permettra d'avoir un peu de liberté quant aux entités et informations disponibles dans l'API.

Vous n'avez pas spécialement à coder dans cette partie là. Strapi a été choisi car, vous le verrez plus bas, il vous permet de créer des routes, entités et champs facilement au travers d'une interface d'administration. Le but reste de développer votre application Angular ! Si vous n'avez pas optimisé, protégé ou gérer vos profils de privilèges/routes/entités, ce n'est pas grave !

L'API est en NodeJS avec une base SQLite contenue dans le fichier `./tmp/data.db`. Ne le modifiez pas à la main !
Lorsque vous ajouterez des entités, champs, etc... il vous sera nécessaire de commit et push vos modifications sur votre repository de projet afin de le partager aux autres développeurs de votre équipe.

- Lien de l'administration: http://localhost:1337/admin
- Lien de la documentation OpenAPI: http://localhost:1337/documentation/v1.0.0
- Endpoint de base: http://localhost:1337/api

### ℹ️ L'utilisation de **Strapi pour votre API n'est pas obligatoire** ! Vous pouvez utiliser n'importe quelle solution technique.

Seules 2 conditions s'appliquent:

- Votre application Angular doit obligatoirement communiquer avec une API
- L'API doit fonctionner en local (CRUD possible)

À noter, que la partie API ne sera pas prise en compte dans la note. N'y investissez pas trop de temps.

## 🚀 Getting Started

Clonez ce projet :

```
git clone https://gitlab.univ-lr.fr/vkraus/hackathon-angular-2023
cd hackathon-angular/
```

Créer un projet sur le gitlab de l'université, puis ajouter la remote au projet.

```
git remote set-url --push origin <adresse-gitlab>
```

Lancez le serveur:

```
cd server
npm install
npm run develop
```

Et vous connectez à l'interface d'admin du serveur sur l'url : http://localhost:1337/admin/

- Email: john@doe.com
- Mot de passe: JohnDoe1

Lancez votre webapp :

```
Vous savez faire 😉
```

## Utiliser Strapi

Dans l'interface d'administration de Strapi, il faut distinguer 2 parties différentes: le Contenu et le Content-Type Builder.

Le **contenu** est simplement la donnée présente dans votre API: un patient, un utilisateur, une visite, etc... qui est administrable. Création, modification, suppresion, vous pouvez faire tout ce qu'un CMS classique peut faire.

Le **Content-Type Builder** est la partie où vous configurez vos entités, ces champs, ses relations, etc...
Exemple, je peux créer un type de contenu Patient, qui a plusieurs champs: nom, prénom, date de naissance, ... N'hésitez pas à parcours tous les choix de champs proposés par Strapi et notamment les Relations.

Les **Relations** sont un type de champs qui lie de différentes manières 2 entités entre-elles. Ex: Un patient a plusieurs traitements. Une tournée a plusieurs patients.

Les **Singles Types** sont un type de contenu dont vous n'aurez pas spécialement besoin. Il s'agit d'élément à caractère unique, homepage, footer par exemple, très utile dans le cas où Strapi vous sert de templating CMS complet (comme WordPress).

Les **Components** sont des groupes de champs répétables qui ne sont pas lié à des entités.

Vous avez également accès à une **médiathèque** pour gérer les assets de vos entités.

### Gérer les droits

Strapi s'accompagne d'une gestion des profils de profils de privilèges simplifié afin de sécuriser (ou non) votre API rapidement.

Dans Paramètres > Users Permissions, vous trouverez par défaut 2 profils: Authenticated et Public.
Pour chaque profil, vous pouvez choisir quelles sont les actions possibles pour chaque entité de votre API.

Vous pouvez donc gérer de l'inscription et de l'authenfication de nouvel utilisateur sur votre futur app ;)

## Disclaimer

Vous pouvez à tout moment demander de l'aide que ce soit pour débugger votre app Angular ou votre API.

# ENJOY 🎉
