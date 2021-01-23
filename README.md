# Twitter-feed
Application NodeJs permettant de voir en temps réel le nombre de Tweets à propos de personnes célèbres.

Concept : 
L'application demande à l'utilisateur de renseigner sa célébrité préféré et classe cette personne au milieu d'autres personnes célèbres en fonction du nombre de Tweet qui parle d'elle en temps réel.

Justification de la technologie:
NodeJs répond parfaitement à notre projet puisqu'il permet de répondre à nos besoin de monter en charge grâce à la conception asynchrone. De ce fait, plusieurs requête peuvent être traitées simultanément sans problèmes.

## Setup

Use npm to install my project

```
npm install
```

To start the project 

```
npm start
```

### environement variables  

--> .env.example

## Processus de développement

###
Dans un premier temps, nous avons établi un serveur web pour notre application. 

Afin de pouvoir faire du temps réel, nous avons créer un webSoket server et à chaque connection nous ouvrons un socket pour que le client puis recevoir et envoyer des données vers le serveur 

### Récupération des données pour chaque célébrités

Dans un premier temps, j'ai créé mes rules pour récupérer des données filtrées à propos de mes célébrités.

J'ai utilisé des streams `Transform` afin de traiter les données comme je le souhaitais :
    - les parser
    - les trier et le compter

### Passage des données au client

Ensuite le `socketStream` a permis d'échanger avec le client.
J'ai donc pu envoyé mes données traitées à mon client grâce aux méthodes 

```
client.send()
socket.send()
```

qui sont écoutées avec les écouteur d'évènements "message"

### Ajout du dynamisme avec le client

Dans un dernier temps, l'ajout de l'interaction de l'utilisateur à été réalisé. Pour ce faire, il a suffit de transmettre la valeur entrée par l'utilisateur au serveur lors de sa validation. A ce moment là, je reset mes règles pour remettre les compteurs à zéro et j'ajoute la nouvelle règle de mon utilisateur. 


## Difficultés rencontrées

J'ai eu un peu de mal à comprendre comment fonctionnait le WebSocketStream étant donné que je n'avais jamais manipulé les webSockets avant ce projet.

J'ai aussi compris tardivement comment se faisait les connections avec un nouveau client, mais après une explication j'ai compris pourquoi certains objects devaient être créés au moment de la connection plutot qu'une seule fois pour que tous les clients puisse avoir leur propre page web sans données d'un autre client qui aurait eu une connection auparavant.

## Autre

Lorsque vous écrivez un nom, il y a un gros temps de latence entre le moment de la confirmation et le moment de l'apparition des premiers Tweets qui, je pense, viens du fait que l'on doit faire différentes requêtes vers l'API TWitter, à savoir celle de l'ajout d'une règle et celle de récupération des données. 











