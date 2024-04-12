document.getElementById('downloadpdf').addEventListener('click', function() {
    window.print();
});

document.getElementById('downloadpdf').addEventListener('click', function() {
    // Récupérer le contenu de la modal de la liste de courses
    const shoppingListModalBody = document.getElementById('shopping-list-modal-body');
    const shoppingListContent = shoppingListModalBody.innerText;
    
    // Créer un objet Blob contenant le contenu
    const blob = new Blob([shoppingListContent], { type: 'text/plain' });

    // Créer un objet URL pour le Blob
    const url = URL.createObjectURL(blob);

    // Créer un lien pour le téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = 'liste_de_courses.pdf'; // Nom du fichier à télécharger
    document.body.appendChild(a);
    
    // Cliquer sur le lien pour démarrer le téléchargement
    a.click();

    // Supprimer le lien après le téléchargement
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
});

