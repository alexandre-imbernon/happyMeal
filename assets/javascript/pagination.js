// Fonction pour récupérer les données JSON
function getRecettes(page, pageSize) {
    fetch('../../assets/javascript/json/data.json')
    .then(response => response.json())
      .then(data => {
        displayRecettes(data.recettes, page, pageSize);
      })
      .catch(error => console.error('Error fetching data:', error));
}

// Fonction pour afficher les recettes avec pagination
function displayRecettes(recettes, page, pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const recettesToShow = recettes.slice(startIndex, endIndex);

    const recettesContainer = document.getElementById('recettes-container');
    const recettesContainerBottom = document.getElementById('recettes-container-bottom');
    recettesContainer.innerHTML = '';
    recettesContainerBottom.innerHTML = '';

    recettesToShow.forEach((recette, index) => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="images/${recette.image}" class="card-img-top" alt="${recette.nom}">
                    <div class="card-body">
                        <h5 class="card-title">${recette.nom}</h5>
                        <p class="card-text"><strong>Catégorie:</strong> ${recette.categorie}</p>
                        <p class="card-text"><strong>Temps de préparation:</strong> ${recette.temps_preparation}</p>
                        <h6>Ingrédients:</h6>
                        <ul>
                            ${recette.ingredients.map(ingredient => `<li>${ingredient.nom} - ${ingredient.quantite}</li>`).join('')}
                        </ul>
                        <h6>Étapes de préparation:</h6>
                        <ol>
                            ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        `;
        if (index < Math.ceil(recettesToShow.length / 2)) {
            recettesContainer.innerHTML += card;
        } else {
            recettesContainerBottom.innerHTML += card;
        }
    });

    // Affichage de la pagination
    
    displayPagination(recettes.length, page, pageSize, 'pagination-bottom');
}

// Fonction pour afficher la pagination
function displayPagination(totalItems, currentPage, pageSize, paginationId) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginationElement = document.getElementById(paginationId);
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.classList.add('page-item');
      if (i === currentPage) {
        li.classList.add('active');
      }

      const link = document.createElement('a');
      link.classList.add('page-link');
      link.href = '#';
      link.textContent = i;
      link.addEventListener('click', function() {
        getRecettes(i, pageSize);
      });

      li.appendChild(link);
      paginationElement.appendChild(li);
    }
}

// Affichage de la première page au chargement
getRecettes(1, 6);