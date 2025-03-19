document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("table-body");
    const addCandidatureForm = document.getElementById("add-candidature-form");

    // Fonction pour afficher les candidatures dans le tableau
    function afficherCandidatures(candidatures) {
        tableBody.innerHTML = ""; // Effacer les anciennes lignes
        candidatures.forEach(candidature => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${new Date(candidature.dateEnvoie).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</td>
                <td>${candidature.entreprise}</td>
                <td>${candidature.lieu}</td>
                <td>${candidature.nomContact}</td>
                <td>${candidature.mailContact}</td>
                <td>${candidature.fonctionContact}</td>
                <td>${candidature.retour}</td>
                <td>${candidature.commentaires}</td>
                <td>${candidature.origineContact}</td>
                <td>${candidature.relance ? "Oui" : "Non"}</td>
                <td>${candidature.entretien}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Charger les candidatures depuis le serveur
    fetch("http://localhost:3000/candidatures")
        .then(response => response.json())
        .then(candidatures => {
            afficherCandidatures(candidatures);
        })
        .catch(error => {
            console.error("Erreur lors du chargement des candidatures :", error);
        });

    // Ajouter une nouvelle candidature
    addCandidatureForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Empêche l'envoi du formulaire par défaut

        const nouvelleCandidature = {
            entreprise: document.getElementById("entreprise").value,
            lieu: document.getElementById("lieu").value,
            nomContact: document.getElementById("nomContact").value,
            mailContact: document.getElementById("mailContact").value,
            commentaires: document.getElementById("commentaires").value,
            origineContact: document.getElementById("origineContact").value,
            relance: document.getElementById("relance").checked,
            retour: "en attente", // Valeur par défaut
            entretien: "à planifier", // Valeur par défaut
            dateEnvoie: new Date().toISOString() // Date actuelle
        };

        // Envoyer la nouvelle candidature au serveur
        fetch("http://localhost:3000/candidatures", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nouvelleCandidature)
        })
        .then(response => response.json())
        .then(candidature => {
            // Ajouter la nouvelle candidature dans le tableau sans recharger la page
            afficherCandidatures([...tableBody.children, candidature]);
        })
        .catch(error => {
            console.error("Erreur lors de l'ajout de la candidature :", error);
        });
    });
});
