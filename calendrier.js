document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'fr',
      selectable: true,
      select: function(info) {
          var selectedDate = info.startStr;
          $('#selected-date').text(selectedDate);
          $('#modal').modal('show');
      }
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

  const favoritesModalBody = document.getElementById('favoritesModalBody');

  // Afficher chaque favori dans la modal
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favoritesModalBody.innerHTML = ''; // Effacer le contenu précédent
  favorites.forEach(recipe => {
      const recipeBtn = document.createElement('button');
      recipeBtn.textContent = recipe.nom;
      recipeBtn.className = 'btn btn-primary';
      recipeBtn.onclick = function() {
          // Ajouter la recette au calendrier
          // Remplacez cette fonction par votre propre logique pour ajouter la recette au calendrier
          alert('Ajout de la recette "' + recipe.nom + '" au calendrier.');
          
          // Supprimer la recette du local storage
          favorites = favorites.filter(fav => fav.nom !== recipe.nom);
          localStorage.setItem('favorites', JSON.stringify(favorites));

          // Mettre à jour la modal des favoris
          favoritesModalBody.removeChild(recipeBtn);
      };
      favoritesModalBody.appendChild(recipeBtn);
  });

  // Afficher les éléments du local storage dans la balise <div class="modal-body" id="modaltxt">
  const modalBody = document.getElementById('favoritesdisplay');
  modalBody.innerHTML = ''; // Effacer le contenu précédent
  const localStorageData = JSON.parse(localStorage.getItem('favorites')); 
  if (localStorageData) {
      Object.keys(localStorageData).forEach(key => {
          const p = document.createElement('p');
          p.textContent = localStorageData[key];
          modalBody.appendChild(p);
      });
  }
});
