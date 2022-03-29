# Hackathon Angular 2022

Bienvenue dans ce hackathon autour du framework Angular pour votre année 2022 en Licence Pro !
Voici le boilerplate de votre projet.

## Thematique
Fort de son implémentation cotière, La Rochelle offre un cadre idéal aux disciplines nautiques, notamment la voile. Avant d'atteindre le niveau professionnel, bons nombres d'associations et de projets bénévoles se développement dans le monde de la voile mais ne sont pas forcément équipés numériquement pour gérer et administrer l'ensemble des acteurs du nautisme Rochelais.

Par équipe mixtes DFS/WDI, vous devez développer un produit/une application/un site/un outils, autour du monde de la voile.

L'événement débutera du jeudi 31 mars à 9h, jusqu'au vendredi 01 avril 12h (heure du dernier commit) sans interuption pour la partie projet. Le vendredi à 14h débutera la présentation des dits-projets.

### Consignes
Vous devez rendre votre projet fait avec Angular pour le vendredi 12h, heure du dernier commit sur **gitlab de l'université** faisant foi.
Vous présenterez votre projet et son concept lors d'une présentation commerciale à partir de vendredi 14h.

### Les capitaines

Pour vous épauler, chaque équipe aura un capitaine tiré au sort le matin-même de l'épreuve. Ils seront là pour vous aiguiller dans vos choix techniques et fonctionnels. Ces capitaines sont des développeurs expérimentés qui viennent vous donner de leurs temps, alors n'hésitez pas à les solliciter et échanger avec eux sur le métier en général ! 😉

## Stack

### Client

Dans le dossier `client` vous trouverez un projet vierge d'application Angular avec l'AppRoutingModule déjà d'initialisé ainsi que le style par défaut en SCSS.
C'est votre dossier principal de travail pour cet événement. Libre à vous d'y faire toutes les modifications que vous souhaitez.

### Server

Dans le dossier `server`, vous trouverez un projet minimal d'API construit avec [Strapi](https://strapi.io/). Il vous permettra d'avoir un peu de liberté quant aux entités et informations disponibles dans l'API.

⚠️ Vous n'avez pas spécialement à coder dans cette partie là. Strapi a été choisi car, vous le verrez plus bas, il vous permet de créer des routes, entités et champs facilement au travers d'une interface d'administration. Le but reste de développer votre application Angular ! Si vous n'avez pas optimisé, protégé ou gérer vos profils de privilèges/routes/entités, ce n'est pas grave !

L'API est en NodeJS avec une base SQLite contenue dans le fichier `./tmp/data.db`. Ne le modifiez pas à la main !
Lorsque vous ajouterez des entités, champs, etc... il vous sera nécessaire de commit et push vos modifications sur votre repository de projet afin de le partager aux autres développeurs de votre équipe.

- Lien de l'administration: http://localhost:1337/admin
- Lien de la documentation OpenAPI: http://localhost:1337/documentation/v1.0.0
- Endpoint de base: http://localhost:1337/api

## Getting Started

Clonez ce projet : 
```
git clone https://gitlab.univ-lr.fr/vkraus/hackangular-2022
cd hackanhular-2022/
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

- Email: john@admin.com
- Mot de passe: Adminmiaw1

Lancez le client : 
```
Vous savez faire 😉
```

## Disclaimer

Vous pouvez à tout moment demander de l'aide que ce soit pour débugger votre app Angular ou votre API.

# HAVE FUN !


20h: tier list meilleure sauce avec des pâtes ?