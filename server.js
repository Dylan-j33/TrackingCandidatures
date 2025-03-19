const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json()); // Pour que Express parse les données JSON
app.use(express.static('public'));

let candidatures = [];
try {
    const data = fs.readFileSync('candidatures.json', 'utf8');
    candidatures = JSON.parse(data);
} catch (err) {
    console.log("Aucun fichier existant, création d'un fichier vide.");
}

// Sauvegarder les candidatures dans le fichier JSON
function sauvegarderCandidatures() {
    fs.writeFileSync('candidatures.json', JSON.stringify(candidatures, null, 2));
}

// Routes
app.get('/candidatures', (req, res) => {
    res.json(candidatures);
});

app.post('/candidatures', (req, res) => {
    const nouvelleCandidature = req.body;

    // Générer un nouvel ID
    const dernierId = candidatures.length > 0 ? candidatures[candidatures.length - 1].id : 0;
    const nouvelId = dernierId + 1;
    nouvelleCandidature.id = nouvelId;

    candidatures.push(nouvelleCandidature);
    sauvegarderCandidatures();

    res.status(201).json(nouvelleCandidature);
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
