


let urlCategories = `http://localhost:5678/api/categories`; // on recupere l'api work
let filters = document.querySelector('.filters');
const selectCategory = document.querySelector('.selectCategory');

let apiCallCategories = async () => {

    await fetch(urlCategories)
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api


    //Bouton qui affiche tous les projets

    filterAll = document.createElement('button');
    filterAll.classList.add('all-filter');
    filterAll.innerText = 'Tous';

    filters.appendChild(filterAll);
    console.log(filterAll);


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

    //créer contenu du formulaire d'ajout de la modal relatif aux champs de saisies
    newLabel = document.createElement('label'); 
    newLabel.innerText = 'Catégorie';
    newSelect = document.createElement('select');

    newLabel.setAttribute('for', "category");
    newSelect.setAttribute('name', "category");
    newSelect.setAttribute('id', "category");

    option = document.createElement ('option');
    option.setAttribute('value', 0);
    option.innerText = '';
    newSelect.appendChild(option);

    // Afficher les options de categorie dans le formulaire de la modal
    function CategoryAddWork(apiData){

        
        apiData.forEach(category => {
          
            newOption = document.createElement ('option');
            newOption.setAttribute('value', category.id);
            newOption.innerText = category.name;

            selectCategory.appendChild(newLabel);
            selectCategory.appendChild(newSelect);
            newSelect.appendChild(newOption);
          
        });  


    }
    CategoryAddWork(apiData);
 
}
apiCallCategories();









