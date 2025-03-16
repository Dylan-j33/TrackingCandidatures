// Importation de la bibliothèque Express et du module fs pour la gestion des fichiers
const express = require('express');
const fs = require('fs');

// Création de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.static('public'));

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

// Fonction pour sauvegarder les candidatures dans un fichier JSON
function sauvegarderCandidatures() {
  fs.writeFileSync('candidatures.json', JSON.stringify(candidatures, null, 2));
}

// Lire le fichier JSON pour charger les données des candidatures au démarrage
let candidatures = [];
try {
  const data = fs.readFileSync('candidatures.json', 'utf8');
  candidatures = JSON.parse(data);
} catch (err) {
  console.log("Aucun fichier existant, création d'un fichier vide.");
}

// Routes

app.get('/candidatures', (req, res) => {
  res.json(candidatures);
});

app.get('/candidatures/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const candidature = candidatures.find(c => c.id === id);

  if (!candidature) {
    return res.status(404).json({ message: "Candidature non trouvée" });
  }

  res.json(candidature);
});

app.post('/candidatures', (req, res) => {
  const nouvelleCandidature = req.body;

  // Générer un nouvel ID
  const dernierId = candidatures.length > 0 ? candidatures[candidatures.length - 1].id : 0;
  const nouvelId = dernierId + 1;

  // Ajouter l'ID à la nouvelle candidature
  nouvelleCandidature.id = nouvelId;

  // Ajouter la nouvelle candidature au tableau
  candidatures.push(nouvelleCandidature);

  // Sauvegarder les données dans le fichier
  sauvegarderCandidatures();

  // Répondre avec la nouvelle candidature
  res.status(201).json(nouvelleCandidature);
});

app.put('/candidatures/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = candidatures.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Candidature non trouvée" });
  }

  // Mettre à jour la candidature
  candidatures[index] = { ...candidatures[index], ...req.body };

  // Sauvegarder les données dans le fichier
  sauvegarderCandidatures();

  res.json(candidatures[index]);
});

app.delete('/candidatures/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const candidatureExiste = candidatures.some(c => c.id === id);

  if (!candidatureExiste) {
    return res.status(404).json({ message: "Candidature non trouvée" });
  }

  // Supprimer la candidature
  candidatures = candidatures.filter(c => c.id !== id);

  // Sauvegarder les données dans le fichier
  sauvegarderCandidatures();

  res.json({ message: "Candidature supprimée" });
});
