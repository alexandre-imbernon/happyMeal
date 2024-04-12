document.addEventListener("DOMContentLoaded", function() {
    const carouselItems = document.querySelectorAll(".carousel-item");
    const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal1'));
    const carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleCaptions1')); 

    carouselItems.forEach((item, index) => {
        item.addEventListener("click", function() {
            fetch('../../assets/javascript/json/data.json')
            .then(response => response.json())
                .then(data => {
                    const recipe = data.recettes[index];
                    const modalTitle = document.getElementById('modalTitle1');
                    const modalDescription = document.getElementById('modalDescription1');

                    modalTitle.textContent = recipe.nom;
                    modalDescription.innerHTML = `
                        <p>Catégorie: ${recipe.categorie}</p>
                        <p>Temps de préparation: ${recipe.temps_preparation}</p>
                        <p>Ingrédients:</p>
                        <ul>
                            ${recipe.ingredients.map(ingredient => `<li>${ingredient.nom}: ${ingredient.quantite}</li>`).join('')}
                        </ul>
                        <p>Étapes:</p>
                        <ol>
                            ${recipe.etapes.map(etape => `<li>${etape}</li>`).join('')}
                        </ol>
                    `;

                    recipeModal.show();
                })
                .catch(error => console.error('Error fetching data:', error));
        });
    });
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowLeft':
                carousel.prev();
                break;
            case 'ArrowRight':
                carousel.next();
                break;
        }
    });
});
