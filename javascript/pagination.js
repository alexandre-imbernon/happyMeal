document.addEventListener("DOMContentLoaded", function() {
    var carousel = new bootstrap.Carousel(document.getElementById('carouselExampleCaptions'), {
        wrap: true,
    });

    var carouselItems = document.querySelectorAll('.carousel-item');
    
    carouselItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            document.addEventListener('keydown', function(e) {
                switch (e.key) {
                    case 'ArrowLeft':  
                        carousel.prev();  
                        break;
                    case 'ArrowRight':  
                        carousel.next();  
                        break;
                }
            });

            fetch('data.json')
            .then(response => response.json())
            .then(data => {

                var jsonData = data.recettes[index];
                
                fillModal(jsonData);
                
                var myModal = new bootstrap.Modal(document.getElementById('recipeModal'));
                myModal.show();
            })
            .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
        });
    });
    function fillModal(jsonData) {
        document.getElementById('modalTitle').textContent = jsonData.nom;
        var modalBody = document.getElementById('modalDescription');
        modalBody.innerHTML = "<p>Catégorie: " + jsonData.categorie + "</p>";
        modalBody.innerHTML += "<p>Temps de préparation: " + jsonData.temps_preparation + "</p>";
        modalBody.innerHTML += "<h6>Ingrédients:</h6>";
        modalBody.innerHTML += "<ul>";
        jsonData.ingredients.forEach(function(ingredient) {
            modalBody.innerHTML += "<li>" + ingredient.nom + " - " + ingredient.quantite + "</li>";
        });
        modalBody.innerHTML += "</ul>";
        modalBody.innerHTML += "<h6>Étapes:</h6>";
        modalBody.innerHTML += "<ol>";
        jsonData.etapes.forEach(function(etape) {
            modalBody.innerHTML += "<li>" + etape + "</li>";
        });
        modalBody.innerHTML += "</ol>";
    }
});        

///////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    var carousel1 = new bootstrap.Carousel(document.getElementById('carouselExampleCaptions1'), {
        wrap: true,
    });

    var carouselItems1 = document.querySelectorAll('.carousel-item[data-recipe-index]');
    
    carouselItems1.forEach(function(item, index) {
        item.addEventListener('click', function() {
            document.addEventListener('keydown', function(e) {
                switch (e.key) {
                    case 'ArrowLeft':  
                        carousel1.prev();  
                        break;
                    case 'ArrowRight':  
                        carousel1.next();  
                        break;
                }
            });

            fetch('data.json')
            .then(response => response.json())
            .then(data => {

                var jsonData = data.recettes[index];
                
                fillModal(jsonData);
                
                var myModal = new bootstrap.Modal(document.getElementById('recipeModal'));
                myModal.show();
            })
            .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
        });
    });

    // Same logic for carousel 2, just change the variables accordingly
    // var carousel2 = new bootstrap.Carousel(document.getElementById('carouselExampleCaptions2'), {
    //     wrap: true,
    // });

    // var carouselItems2 = document.querySelectorAll('.carousel-item[data-recipe-index]');
    
    // carouselItems2.forEach(function(item, index) {
    //     item.addEventListener('click', function() {
    //         document.addEventListener('keydown', function(e) {
    //             switch (e.key) {
    //                 case 'ArrowLeft':  
    //                     carousel2.prev();  
    //                     break;
    //                 case 'ArrowRight':  
    //                     carousel2.next();  
    //                     break;
    //             }
    //         });

    //         fetch('data.json')
    //         .then(response => response.json())
    //         .then(data => {

    //             var jsonData = data.recettes[index];
                
    //             fillModal(jsonData);
                
    //             var myModal = new bootstrap.Modal(document.getElementById('recipeModal'));
    //             myModal.show();
    //         })
    //         .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
    //     });
    // });

    function fillModal(jsonData) {
        document.getElementById('modalTitle').textContent = jsonData.nom;
        var modalBody = document.getElementById('modalDescription');
        modalBody.innerHTML = "<p>Catégorie: " + jsonData.categorie + "</p>";
        modalBody.innerHTML += "<p>Temps de préparation: " + jsonData.temps_preparation + "</p>";
        modalBody.innerHTML += "<h6>Ingrédients:</h6>";
        modalBody.innerHTML += "<ul>";
        jsonData.ingredients.forEach(function(ingredient) {
            modalBody.innerHTML += "<li>" + ingredient.nom + " - " + ingredient.quantite + "</li>";
        });
        modalBody.innerHTML += "</ul>";
        modalBody.innerHTML += "<h6>Étapes:</h6>";
        modalBody.innerHTML += "<ol>";
        jsonData.etapes.forEach(function(etape) {
            modalBody.innerHTML += "<li>" + etape + "</li>";
        });
        modalBody.innerHTML += "</ol>";
    }
});
