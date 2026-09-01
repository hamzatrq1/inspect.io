

Il y a 2 collecteurs : le collecteur java (inspect-core) et le collecteur angular (inspect-ng-collector)

## INSPECT-Core

Le module `inspect-core` est la bibliothèque Java de collecte de traces côté applicatif.

Il est conçu pour instrumenter des applications Java ou Spring. Il capture :

- des sessions logiques,
- des requêtes HTTP, JDBC, LDAP, FTP, SMTP et locales,
- des contextes de thread pour conserver la corrélation entre tâches asynchrones,
- des métriques de ressource,
- des erreurs et exceptions,
- une corrélation entre les opérations.

Il est donc la pièce technique qui permet d'enregistrer les événements au niveau applicatif et de les transmettre au serveur INSPECT.


`inspect-core` est un moteur de collecte technique et fonctionnelle pour applications Java. Il est pensé pour :

- ouvrir une session logique,
- enregistrer les requêtes associées,
- associer les informations de contexte par thread,
- gérer des tâches asynchrones de manière corrélée,
- envoyer les traces à distance ou les enregistrer localement.

Les concepts clés sont :

- Session : unité logique d'exécution,
- Request : opération sous-jacente ou appel système,
- TraceSignal / TraceUpdate : capture au début et à la fin d'une opération,
- Thread-local context : logique de propagation du contexte à travers les threads.

Cela permet de reconstituer le parcours d'un traitement, même en environnement distribué ou asynchrone.

---

## INSPECT-NG-Collector

Le module `inspect-ng-collector` est la bibliothèque Angular front-end de collecte de traces.

Son rôle est de surveiller ce qui se passe dans le navigateur ou dans une application Angular :

- navigation et changement de route,
- interactions utilisateur,
- requêtes HTTP,
- erreurs globales,
- performances de l'application,
- événements applicatifs personnalisés.

Il automate la collecte de traces utiles à la compréhension du comportement utilisateur et de l'expérience fonctionnelle.



`inspect-ng-collector` est conçu comme un module Angular qui s'active à la racine d'une application. Il peut :

- collecter automatiquement les actions utilisateur,
- tracer les appels HTTP sortants,
- enregistrer les changements de page,
- détecter les exceptions globales,
- exporter les événements à intervalle régulier vers le backend,
- fournir des mécanismes de personnalisation via des décorateurs ou services.

Exemples de données capturées :

- clics,
- changements de formulaire,
- navigation,
- durée de requête,
- statut HTTP,
- erreurs réseau,
- activité utilisateur et contexte applicatif.

Cette bibliothèque rend la couche front beaucoup plus “observée” et permet d'aligner le vécu utilisateur avec les traces backend.
