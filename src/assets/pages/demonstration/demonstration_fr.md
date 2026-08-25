## Démonstration rapide

Vous pouvez récupérer les répertoires inspect-app et inspect-server pour les lancer en local et voir le fonctionnement de l'application.

```shell
git clone https://github.com/oneteme/inspect-app.git
git clone https://github.com/oneteme/inspect-server.git
```
Dans le répertoire inspect-app, lancer une installation :
```shell
npm install
```
Puis lancer l'application :
```shell
npm run start
``` 
L'IHM est disponible sur le port 4200. Vous pouvez y accéder via http://localhost:4200.

Dans le répertoire inspect-server, lancer une installation maven :
```shell
mvn clean install
```

Préparer un fichier de configuration `application.yml` dans le répertoire `src/main/resources` avec le contenu suivant :

//TODO
