# Twitter-feed
Application NodeJs permettant de voir en temps réel le nombre de Tweets à propos de personnes célèbres.

Concept : 
L'application demande à l'utilisateur de renseigner sa célébrité préféré et classe cette personne au milieu d'autres personnes célèbres en fonction du nombre de Tweet qui parle d'elle

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

Dans un dernier temps, l'ajout de l'interaction de l'utilisateur à été réalisé. Pour ce faire, il a suffit de transmettre la valeur entrée par l'utilisateur au serveur lors de sa validation. A ce moment la, je reset mes règles pour remettre les compteur à zéro et j'ajoute la nouvelle règle de mon utilisateur. 


## Problèmes rencontrés au cours du projet






