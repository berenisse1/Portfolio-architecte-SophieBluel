// Afficher les boutons filtres

let urlCategories = `http://localhost:5678/api/categories`; // on recupere l'api work
let filters = document.querySelector('.filters');

let apiCallCategories = async () => {

    await fetch(urlCategories)
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api


    //Bouton qui affiche tous les projets

    filterAll = document.createElement('button');
    filterAll.classList.add('all-filter');
    filterAll.innerText = 'Tous';

    filters.appendChild(filterAll);


    //Boucle qui permet d'afficher tous les boutons de filtres selon ID

    function filterWork(apiData){
        apiData.forEach(category => {

            newFilter = document.createElement('button');

            newFilter.innerText = category.name;
            newFilter.classList.add('btn-filter');
            newFilter.setAttribute('data-id', category.id);

            filters.appendChild(newFilter);
            
        });


    }
    filterWork(apiData);
 
}
apiCallCategories();









