// Afficher les boutons filtres

let urlWorks = `http://localhost:5678/api/categories`; // on recupere l'api work
let filters = document.querySelector('.filter');

const apiCallCtegories = async () => {

    await fetch(urlCategories)
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api


    //Bouton qui affiche tous les projets

    filterAll = document.createElement('button');
    filterAll .classList.add('all-filter');
    filterAll.innerText = 'Tous';

    filterAll.appendChild(filterAll);


    //Boucle qui permet d'afficher tous les boutons de filtres selon ID

    function filtreWork(apiData){
        apiData.forEach(category => {

            newFilter.innerText = category.name;
            newFilter.classList.add('btn-filter');
            newFilter.setAttribute('data-id', category.id);

            filters.appendChild(newFilter);
            
        });


    }
    filtreWork(apiData);
 
}
apiCallFiltre();









