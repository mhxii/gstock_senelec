export function setupTicketValidation() {
    const form = document.getElementById('search-form');
    const ticketInfoDiv = document.getElementById('ticket-info');
    const validateButton = document.getElementById('validate-button');
    let currentTicket = null;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const ticketCode = parseInt(document.getElementById('ticket-code').value, 10);

        // Appeler l'API pour récupérer les informations du ticket
        try {
            const response = await fetch(`http://localhost:3000/tickets/${ticketCode}`);
            if (response.ok) {
                currentTicket = await response.json();
                // Afficher les informations du ticket
                ticketInfoDiv.innerHTML = `
                    <h3>Informations du E-ticket</h3>
                    <p>Code: ${currentTicket.code}</p>
                    <p>Détenteur: ${currentTicket.owner}</p>
                    <p>Événement: ${currentTicket.event}</p>
                    <p>Date: ${currentTicket.date}</p>
                    <p>Status: ${currentTicket.status}</p>
                `;
                validateButton.style.display = 'block';
            } else {
                ticketInfoDiv.innerHTML = `<p>Ticket non trouvé.</p>`;
                validateButton.style.display = 'none';
            }
        } catch (error) {
            console.error('Erreur:', error);
            ticketInfoDiv.innerHTML = `<p>Erreur lors de la récupération du ticket.</p>`;
            validateButton.style.display = 'none';
        }
    });

    validateButton.addEventListener('click', async function() {
        if (currentTicket && currentTicket.status === 'Non validé') {
            // Appeler l'API pour valider le ticket
            try {
                const response = await fetch(`http://localhost:3000/tickets/${currentTicket.code}/validate`, {
                    method: 'POST',
                });
                if (response.ok) {
                    const result = await response.json();
                    alert(result.message);
                    ticketInfoDiv.innerHTML = '';
                    validateButton.style.display = 'none';
                } else {
                    alert('Erreur lors de la validation du ticket.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la validation du ticket.');
            }
        }
    });
}
