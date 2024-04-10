document.addEventListener('DOMContentLoaded', function() {
    const recipeContainer = document.getElementById('recipe-container');
    const shoppingListContainer = document.getElementById('shopping-list');
    const modalRecipe = document.getElementById('modal-recipe');
    const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
    const favoritesBtn = document.getElementById('show-favorites-btn');
    const searchInput = document.getElementById('search-input');
    const searchResultsList = document.getElementById('search-results'); 

    let allRecipes = [];

    fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        allRecipes = data.recettes;
        generateRandomRecipe(allRecipes); // Appel de la fonction pour afficher des recettes aléatoires
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });


    function generateRandomRecipe(recipes) {
        const randomRecipes = [];
        for (let i = 0; i < 3; i++) {
            const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
            randomRecipes.push(randomRecipe);
        }
        displayRecipes(randomRecipes);
    }

    function displayRecipes(recipes) {
        recipeContainer.innerHTML = '';

        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h2 class="card-title">${recipe.nom}</h2>
                    <p class="card-text"><strong>${recipe.categorie}</strong</p>
                    <p class="card-text"><strong>${recipe.temps_preparation}</strong></p>
                    <a class="btn btn-primary view-recipe-btn">Voir la recette</a>
                </div>
            </div>
            `;
            const viewRecipeBtn = recipeElement.querySelector('.view-recipe-btn');
            viewRecipeBtn.addEventListener('click', function() {
                showModal(recipe);
            });
            recipeContainer.appendChild(recipeElement);
        });
    }

    function showModal(recipe) {
        modalRecipe.innerHTML = `
            <h2>${recipe.nom}</h2>
            <p><strong>Catégorie:</strong> ${recipe.categorie}</p>
            <p><strong>Temps de préparation:</strong> ${recipe.temps_preparation}</p>
            <h3>Ingrédients :</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient.nom} - ${ingredient.quantite}</li>`).join('')}
            </ul>
            <h3>Étapes :</h3>
            <ol>
                ${recipe.etapes.map(etape => `<li>${etape}</li>`).join('')}
            </ol>
            <button class="btn btn-primary add-to-favorites-btn">Ajouter au favoris</button>
        `;
    
        const addToFavoritesBtn = modalRecipe.querySelector('.add-to-favorites-btn');
        addToFavoritesBtn.addEventListener('click', function() {
            addToFavorites(recipe);
        });
    
        modal.show();
    }
    

    // Fonction pour ajouter une recette aux favoris
    function addToFavorites(recipe) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(recipe);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Recette ajoutée aux favoris !');
    }

    // Fonction pour afficher les favoris
    favoritesBtn.addEventListener('click', function() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.length > 0) {
            alert('Recettes favorites :\n\n' + favorites.map(recipe => recipe.nom).join('\n'));
        } else {
            alert('Aucune recette favorite.');
        }
    });

    // Fonction de recherche de recette
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        if (searchTerm === '') {
            recipeContainer.innerHTML = '';
            searchResultsList.innerHTML = '';
            generateRandomRecipe(allRecipes);
        } else {
            const filteredRecipes = allRecipes.filter(recipe =>
                recipe.nom.toLowerCase().includes(searchTerm) ||
                recipe.ingredients.some(ingredient => ingredient.nom.toLowerCase().includes(searchTerm))
            );
            displaySearchResults(filteredRecipes);
        }
    });

    // Fonction pour afficher les résultats de la recherche
    function displaySearchResults(recipes) {
        searchResultsList.innerHTML = '';
        if (recipes.length > 0) {
            recipes.forEach(recipe => {
                const listItem = document.createElement('li');
                listItem.textContent = recipe.nom;
                listItem.addEventListener('click', function() {
                    showModal(recipe);
                });
                searchResultsList.appendChild(listItem);
            });
        } else {
            const noResultsItem = document.createElement('li');
            noResultsItem.textContent = 'Aucune recette trouvée';
            searchResultsList.appendChild(noResultsItem);
        }
    }
});
