// Importation de la bibliothèque Express
const express = require('express');

// Création de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Définition du port
const port = 3000;

// Création d'une route qui répond à une requête HTTP GET sur la racine ("/")
app.get('/', (req, res) => {
  res.send('Serveur lancé !'); // Texte renvoyé lorsqu'on va à l'adresse http://localhost:3000
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});

// Tableau de stockage candidature
let candidatures = [{ dateEnvoie: "2022-01-08", entreprise: 'TokyoCorp', lieu: 'Tokyo', nomContact: 'Toto', mailContact: 'tokyo@gmail.com', retour: 'en attente', commentaires: 'blablabla', origineContact: 'Linkedln', relance: true, entretien: 'à planifier'}];

app.get('/candidatures', (req, res) => {
    res.json(candidatures);
});

app.post('/candidatures', (req, res) => {

    const nouvelleCandidature = req.body; // Récupération des données
    candidatures.push(nouvelleCandidature); // Ajout nouvelle candidature
    res.status(201).json(nouvelleCandidature) // Réponse au client

});
