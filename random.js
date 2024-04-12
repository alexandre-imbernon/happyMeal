// Déplacer la fonction displayShoppingList en dehors de la fonction DOMContentLoaded
function displayShoppingList() {
    let shoppingList = JSON.parse(localStorage.getItem('ListeCourse')) || [];
    const shoppingListModalBody = document.getElementById('shopping-list-modal-body');
    if (shoppingList.length > 0) {
        shoppingListModalBody.innerHTML = shoppingList.map((ingredient, index) => `
            <p>${ingredient.nom} - ${ingredient.quantite} 
                <button class="btnSupprFavorite" onclick="removeToShoppingList(${index})">X</button>
            </p>`).join('');
    } else {
        shoppingListModalBody.innerHTML = '<p>Aucun ingrédient dans la liste de courses.</p>';
    }
    const shoppingListModal = new bootstrap.Modal(document.getElementById('shoppingListModal'));
    shoppingListModal.show();
}

// Fonction pour ajouter un ingrédient à la liste de courses
function addToShoppingList(ingredient) {
    let shoppingList = JSON.parse(localStorage.getItem('ListeCourse')) || [];
    shoppingList.push(ingredient);
    localStorage.setItem('ListeCourse', JSON.stringify(shoppingList));
}

// Fonction pour supprimer un ingrédient à la liste de courses
function removeToShoppingList(ingredientIndex) {
    let shoppingList = JSON.parse(localStorage.getItem('ListeCourse')) || [];
    shoppingList.splice(ingredientIndex, 1); // Supprimer l'ingrédient à l'index donné
    localStorage.setItem('ListeCourse', JSON.stringify(shoppingList));
    displayShoppingList();
}

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
        index = 0;

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
                ${recipe.ingredients.map(ingredient => `<li>${ingredient.nom} - ${ingredient.quantite}</li> <button class="add-to-shopping-btn" data-index="${index}">+</button>`).join('')}
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

        const addToShoppingBtns = modalRecipe.querySelectorAll('.add-to-shopping-btn');
        addToShoppingBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
            const ingredientIndex = parseInt(btn.getAttribute('data-index'));
            addToShoppingList(recipe.ingredients[index]);
            });
        });
        modal.show();
    }

// Ajout d'un écouteur d'événement au bouton add-to-cart-btn pour afficher la liste de courses
const addToCartBtn = document.getElementById('add-to-cart-btn');
addToCartBtn.addEventListener('click', displayShoppingList);



 // Fonction pour ajouter une recette aux favoris
function addToFavorites(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showModalFavorites();
}

// Fonction pour afficher les favoris dans une modale
function showModalFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesModalBody = document.getElementById('favorites-modal-body');
    if (favorites.length > 0) {
        favoritesModalBody.innerHTML = favorites.map(recipe => `<p>${recipe.nom}</p>`).join('');
    } else {
        favoritesModalBody.innerHTML = '<p>Aucune recette favorite.</p>';
    }
    const favoritesModal = new bootstrap.Modal(document.getElementById('favoritesModal'));
    favoritesModal.show();
}


// Modification de l'événement pour afficher les favoris
favoritesBtn.addEventListener('click', showModalFavorites);

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

function downloadShoppingListPDF() {
    // Sélection du contenu du modal de la liste de course
    const shoppingListModalContent = document.getElementById('shopping-list-modal-body').innerHTML;

    // Création d'un nouveau document PDF
    const doc = new jsPDF();

    // Définition de la taille de police et de la marge
    const fontSize = 12;
    const margin = 10;

    // Position initiale du texte
    let y = margin;

    // Ajout du contenu du modal de la liste de course dans le PDF
    doc.setFontSize(fontSize);
    doc.text(shoppingListModalContent, margin, y);

    // Téléchargement du document PDF
    doc.save('liste_de_courses.pdf');
}


