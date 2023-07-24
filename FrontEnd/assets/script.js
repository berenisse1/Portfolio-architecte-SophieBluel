//API: recuperer les projet sur route/works en get
//apel Api pour les travaux avec méthode GET

let url = `http://localhost:5678/api/works`; // on recupere l'api work
let section = document.querySelector('.gallery');// on va chercher la class gallery pour aficher les travaux

const apiCall = async() => {
    await fetch(url) // pour faire attendre pendant le traitement
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api

    function showWork(apiData){

        apiData.forEach(element => { //boucle crée 1 part élement

            newFigure = document.createElement('figure');
            newFigure.id = element.id;

            newImg = document.createElement('img');
            newImg.src = element.imageUrl;
            newImg.alt = element.title;

            newFigcaption = document.createElement ('figcaption');
            newFigcaption.innerText = element.title;

            section.appendChild(newFigure);
            newFigure.appendChild(newImg);
            newFigure.appendChild(newFigcaption);

        });
    }

    showWork (apiData);

}

apiCall();


let urlCategories = `http://localhost:5678/api/categories`; 
let filters = document.querySelector('.filters');
console.log(filters)

let apiCallCategories = async() => {
    await fetch(urlCategories) // pour faire attendre pendant le traitement
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api

    function filterWork(apiData){

        apiData.forEach(category => { 

            newFilter = document.createElement('button');
            newFilter.id = category.id;
            newFilter.innerText = category.name;

            filters.appendChild(newFilter);
            console.log(newFilter)
          

        });
    }

    filterWork (apiData);
    console.log(filterWork);
}

apiCallCategories();



// ajout eventListener sur les btn filters

let button = document.querySelector('button')

button[0].addEventListener("click",() => {
    console.log("objects");
    showObjects();     
})

button[1].addEventListener("click",() => {
    console.log("appartements");
    showFlats();
})

button[2].addEventListener("click",() => {
    console.log("hotels restaurants");
    showBuldings();
})