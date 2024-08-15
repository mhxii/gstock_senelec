const express = require('express');
const fs = require('fs');  // Module pour travailler avec le système de fichiers
const app = express();
const path = require('path');

function readTicketsFromFile() {
    const data = fs.readFileSync(path.join(__dirname, '../bd/tickets.json'));  // Utiliser un chemin absolu basé sur le répertoire actuel
    return JSON.parse(data);
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
})

// Route pour valider un ticket par son code
app.post('/tickets/:code/validate', (req, res) => {
    const tickets = readTicketsFromFile();  // Lire les tickets à partir du fichier
    const ticketIndex = tickets.findIndex(t => t.code === parseInt(req.params.code));  // Rechercher le ticket par son code

    if (ticketIndex !== -1) {
        tickets[ticketIndex].status = 'Validé';  // Mettre à jour le statut du ticket

        // Écrire les tickets mis à jour dans le fichier
        fs.writeFileSync(`${__dirname}/../bd/tickets.json`, JSON.stringify(tickets, null, 2));

        res.json({ message: 'Ticket validé avec succès' });  // Retourner un message de succès
    } else {
        res.status(404).json({ message: 'Ticket non trouvé' });  // Retourner un message d'erreur si le ticket n'est pas trouvé
    }
});
// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
