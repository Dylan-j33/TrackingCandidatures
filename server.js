// Importation de la bibliothèque Express
const express = require('express');

// Création de l'application Express
const app = express();

// Définition du port
const port = 3000;

// Création d'une route qui répond à une requête HTTP GET sur la racine ("/")
app.get('/', (req, res) => {
  res.send('Hello, world!'); // Texte renvoyé lorsqu'on va à l'adresse http://localhost:3000
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
