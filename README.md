## 📎 Projet 7 - Créez un réseau social d’entreprise

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.


### 🔨 &nbsp; Installation

* Cloner ce projet depuis GitHub.

#### 💡 &nbsp; Faire tourner Mysql
 * Installer Mysql en local 
 * Importer les tables du fichier P7_groupo.sql dans le dossier utils

#### 💡 &nbsp; Faire tourner le Frontend

* Ouvrir le terminal sur ce dossier et exécuter  `npm install` pour installer les dépendances.
* Exécuter `npm install node-sass@4.14.1` pour installer sass.
* Le projet a été généré avec @vue/cli 4.5.10.
* Démarrer ng serve (ou `npm run serve`) pour avoir accès au serveur de développement.
* Rendez-vous sur `http://localhost:4200`.


#### 💡 &nbsp; Faire tourner le Backend

* Ouvrir le terminal sur ce dossier.
* Pour utiliser le serveur, chargez le package nodemon : `npm install -g nodemon`.
* Puis lancez le serveur: `nodemon server`.
* Crée un fichier .env(veuillez demander les identifiant lors de l'entretien).
* L'application va se recharger automatiquement si vous modifiez un fichier source.
#### Pour faire court

Si les packages sont déja installés, ces commandes suffisent à démarrer les serveurs.

* `npm run serve` via le terminal sur le frontend
* `nodemon server` via le terminal sur le backend
* Se connecter à l'url : `http://localhost:8080`

##### 🖥 &nbsp; Connexion

* Ouvrir [localhost:8080](http://localhost:8080/) dans votre navigateur.
* Pour s'inscrire sur l'application, l'utilisateur doit fournir un email et un mot de passe contenant 08 caractères minimum (dont 1 majuscule, 1 minuscule, 1 chiffre, pas de symbole, espaces autorisés).

***

#### 📦  &nbsp; Utilisé dans ce projet


* Hébergement sur Mysql (en local)