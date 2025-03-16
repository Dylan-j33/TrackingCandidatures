document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/candidatures")
        .then(response => response.json())
        .then(candidatures => {
            const tableBody = document.getElementById("table-body");

            candidatures.forEach(candidature => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${candidature.id}</td>
                    <td>${candidature.dateEnvoie}</td>
                    <td>${candidature.entreprise}</td>
                    <td>${candidature.lieu}</td>
                    <td>${candidature.nomContact}</td>
                    <td>${candidature.mailContact}</td>
                    <td>${candidature.fonctionContact || "N/A"}</td>
                    <td class="retour ${getRetourClass(candidature.retour)}">${candidature.retour}</td>
                    <td>${candidature.commentaires}</td>
                    <td>${candidature.origineContact}</td>
                    <td>${candidature.relance ? "Oui" : "Non"}</td>
                    <td class="entretien ${getEntretienClass(candidature.entretien)}">${candidature.entretien}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des candidatures :", error);
            alert("Impossible de charger les candidatures. Veuillez réessayer plus tard.");
        });
});

// Fonction pour retourner une classe CSS en fonction du statut de retour
function getRetourClass(retour) {
    switch (retour.toLowerCase()) {
        case "accepté":
            return "retour-accepte";
        case "refusé":
            return "retour-refuse";
        case "entretien prévu":
            return "retour-entretien";
        case "en attente":
        default:
            return "retour-attente";
    }
}

// Fonction pour retourner une classe CSS en fonction du statut d'entretien
function getEntretienClass(entretien) {
    switch (entretien.toLowerCase()) {
        case "prévu":
            return "entretien-prevu";
        case "passé":
            return "entretien-passe";
        case "à planifier":
        default:
            return "entretien-planifier";
    }
}
