# Twitter-feed
Application NodeJs permettant de voir en temps réel le nombre de Tweets à propos de personnes célèbres.

Concept : 
L'application demande à l'utilisateur de renseigner sa célébrité préféré et classe cette personne au milieu d'autres personnes célèbres en fonction du nombre de Tweet qui parle d'elle

## Setup

Use npm to install my project

```bash
npm install
```

To start the project 

```bash
npm start
```

### environement variables  

process.env.TWT_BEARER_TOKEN correspond to Twitter BEARER_TOKEN 

## Processus de développement

### Récupération des données pour chaque célébrités

Dans un premier temps, j'ai créé plusieurs objets Transform afin de traiter mes données et récupérer uniquement les données que je souhaitait.

