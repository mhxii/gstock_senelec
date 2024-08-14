const express = require('express');
const fs = require('fs');  // Module pour travailler avec le système de fichiers
const app = express();

// Fonction pour lire les tickets depuis le fichier JSON
function readTicketsFromFile() {
    const data = fs.readFileSync('tickets.json');  // Lire le contenu du fichier
    return JSON.parse(data);  // Convertir le contenu en un tableau d'objets JavaScript
}

// Route pour récupérer un ticket par son code
app.get('/tickets/:code', (req, res) => {
    const tickets = readTicketsFromFile();  // Lire les tickets à partir du fichier
    const ticket = tickets.find(t => t.code === parseInt(req.params.code));  // Rechercher le ticket

    if (ticket) {
        res.json(ticket);  // Retourner le ticket trouvé
    } else {
        res.status(404).json({ message: 'Ticket non trouvé' });  // Retourner un message d'erreur si le ticket n'est pas trouvé
    }
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
