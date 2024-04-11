document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'fr',
        selectable: true,
        select: function(info) {
            var selectedDate = info.startStr;
            $('#selected-date').text(selectedDate);

            // Récupérer les favoris depuis le local storage
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (favorites.length > 0) {
                // Créer une liste des favoris à afficher
                let favoritesList = '<h2>Recettes favorites :</h2><ul>';
                favorites.forEach(recipe => {
                    favoritesList += `<li><button class="recipe-btn" data-recipe="${recipe.nom}">${recipe.nom}</button></li>`;
                });
                favoritesList += '</ul>';

                // Afficher les favoris dans la modal
                const favoritesModalBody = document.getElementById('favoritesModalBody');
                favoritesModalBody.innerHTML = favoritesList;

                // Ajouter un événement de clic à chaque bouton de recette
                document.querySelectorAll('.recipe-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        // Ajouter la recette au calendrier
                        calendar.addEvent({
                            title: this.dataset.recipe,
                            start: selectedDate,
                            allDay: true
                        });

                        // Ajouter la recette au localStorage pour qu'elle reste visible après le rafraîchissement de la page
                        let storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
                        storedEvents.push({
                            title: this.dataset.recipe,
                            start: selectedDate,
                            allDay: true
                        });
                        localStorage.setItem('calendarEvents', JSON.stringify(storedEvents));
                    });
                });

                // Ouvrir la modal
                $('#favoritesModal').modal('show');
            } else {
                // Aucun favori trouvé
                alert('Aucune recette favorite.');
            }
        }
    });

    // Charger les événements du calendrier depuis le localStorage lors du chargement de la page
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    storedEvents.forEach(event => {
        calendar.addEvent(event);
    });

    calendar.render();

    const favoritesBtn = document.getElementById('show-favorites-btn');

    // Événement de clic sur le bouton pour afficher les favoris
    favoritesBtn.addEventListener('click', function() {
        // Récupérer les favoris depuis le local storage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.length > 0) {
            // Créer une liste des favoris à afficher
            let favoritesList = '<h2>Recettes favorites :</h2><ul>';
            favorites.forEach(recipe => {
                favoritesList += `<li>${recipe.nom}</li>`;
            });
            favoritesList += '</ul>';

            // Afficher les favoris dans la modal
            const favoritesModalBody = document.getElementById('favoritesModalBody');
            favoritesModalBody.innerHTML = favoritesList;

            // Ouvrir la modal
            $('#favoritesModal').modal('show');
        } else {
            // Aucun favori trouvé
            alert('Aucune recette favorite.');
        }
    });
});