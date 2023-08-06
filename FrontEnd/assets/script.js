let urlWorks = `http://localhost:5678/api/works`; // on recupere l'api work
let section = document.querySelector('.gallery');// on va chercher la class gallery pour aficher les travaux



const apiCall = async() => {
    await fetch(urlWorks) // pour faire attendre pendant le traitement
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api

    function showWork(apiData){

        apiData.forEach(element => { //boucle crée 1 par élement

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
    showWork(apiData);


    //Traitement des filtres

    const btnFiltre = document.querySelectorAll('.btn-filter[data-id]');// Cherche les boutons de filtrages
    
    btnFiltre.forEach(button => { // boucle crée 1 par boutton

        button.addEventListener('click', () => {  // crée un évenement au clic
        const dataId = button.dataset.id 
        let filtre = apiData.filter(function(element){
            return element.categoryId == dataId;
        });
        document.querySelector('.gallery').innerHTML = '';
        showWork(filtre);
        })     
   
    });

    // Traitement du bouton Tous

    const btnAll = document.getElementsByClassName('all-filter');

    btnAll.addEventListener('click', () => {
        document.querySelector('.gallery').innerHTML = '';
        return showWork(apiData);
    })

  

}
apiCall();


