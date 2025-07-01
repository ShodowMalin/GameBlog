document.addEventListener('DOMContentLoaded', () => {
    // ... (Il resto del tuo codice per il cambio colore del titolo e il bottone App Mobile) ...

    // --- 2. Funzionalità: Gestione delle Notifiche Desktop ---
    function askNotificationPermissionAndSend() {
        // Controlla se il browser supporta le notifiche desktop.
        if (!("Notification" in window)) {
            console.log("Questo browser non supporta le notifiche desktop.");
            return;
        }

        // Recupera lo stato del permesso di notifica dal localStorage.
        // Utilizziamo una chiave specifica, ad esempio 'notificationPermissionStatus'.
        const permissionStatus = localStorage.getItem('notificationPermissionStatus');

        // Se l'utente ha già accettato o negato in precedenza, non chiedere di nuovo.
        if (permissionStatus === "granted" || permissionStatus === "denied") {
            console.log(`Permesso notifica già ${permissionStatus}. Non richiedo.`);
            // Se il permesso era "granted", puoi comunque inviare la notifica di benvenuto
            // (o altre notifiche) senza chiedere di nuovo.
            if (permissionStatus === "granted") {
                setTimeout(() => {
                    new Notification("Bentornato su GameBlog!", {
                        body: "Rimani aggiornato sulle ultime novità!",
                        icon: "https://via.placeholder.com/128/e94560/ffffff?text=GB"
                    });
                }, 1000);
            }
            return; // Esci dalla funzione, non c'è bisogno di chiedere.
        }

        // Se non abbiamo uno stato memorizzato, chiedi il permesso.
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Permesso notifica concesso.");
                // Salva lo stato "granted" nel localStorage.
                localStorage.setItem('notificationPermissionStatus', 'granted');
                setTimeout(() => {
                    new Notification("Benvenuto su GameBlog!", {
                        body: "Rimani aggiornato su videogiochi moderni e retrò!",
                        icon: "https://via.placeholder.com/128/e94560/ffffff?text=GB"
                    });
                }, 1000);
            } else if (permission === "denied") {
                console.warn("Permesso notifica negato dall'utente.");
                // Salva lo stato "denied" nel localStorage.
                localStorage.setItem('notificationPermissionStatus', 'denied');
            } else { // "default" (l'utente ha chiuso la richiesta senza scegliere)
                console.log("L'utente ha chiuso la richiesta di permesso notifica.");
                // Non salviamo nulla in questo caso, la richiesta riapparirà alla prossima visita.
            }
        });
    }

    // Chiamiamo la funzione per chiedere il permesso delle notifiche
    // quando la pagina è completamente caricata, ma solo se non ha già deciso.
    askNotificationPermissionAndSend();

    // ... (Il resto del tuo codice per il bottone App Mobile) ...
    const mobileAppButton = document.getElementById('mobileAppButton');

    if (mobileAppButton) {
        mobileAppButton.addEventListener('click', () => {
            // Qui inserisci il link reale alla tua app o alla pagina di download.
            // Sostituisci "https://www.tuosito.com/scarica-app" con l'URL effettivo.
            window.location.href = "https://shodowmalindev.itch.io/gameblog"; // Questo è il link da modificare!

            // Se preferisci che la pagina di Itch.io si apra in una NUOVA scheda,
            // decommenta la riga seguente e commenta quella sopra:
            // window.open("https://tuonomeutente.itch.io/nome-della-tua-app", "_blank");
        });
    } else {
        console.error("Errore: Elemento con ID 'mobileAppButton' non trovato.");
    }

    console.log("Il blog è pronto e le funzionalità aggiuntive caricate!");
});