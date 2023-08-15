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
    console.log(btnFiltre);
    
    btnFiltre.forEach(button => { // boucle crée 1 par boutton

        button.addEventListener('click', () => {  // crée un évenement au clic
        const dataId = button.dataset.id //Crée une constante pour chercher le data-id du bouton
        let filtre = apiData.filter(function(element){ //Crée variable pour filtrer les données API 
            return element.categoryId == dataId; // Retourne id de la catégorie en fonction de id du button
        });
        document.querySelector('.gallery').innerHTML = '';
        showWork(filtre);
        })     
   
    })

    // Traitement du bouton Tous

    const btnAll = document.querySelector('.all-filter');
    console.log(btnAll);

    btnAll.addEventListener('click', () => {
        document.querySelector('.gallery').innerHTML = '';
        return showWork(apiData);
    });



}
apiCall();


// Fonction d'ouverture de la fenetre modal

let modal = document.querySelector('.modal')

const openModal = function (event){
    event.preventDefault() // empêche rechargement de la page au clic pour rediriger vers url
    modal.style.display = "flex"; 
    modal.removeAttribute("aria-hidden") // retire attribut pour garantir accesibilité de la fenêtre modal aux technologie d'assistance
    modal.setAttribute("aria-modal", "true") // ajoute attribut pour que les technologies d'asistance puisse identifier le type de contenue
    modal.addEventListener("click", closeModal) // apl fonction de fermeture de la modal au clic
}

// Fonction de fermeture de la fenêtre modal 

const closeModal = function (event){
    event.preventDefault() 
    modal.style.display = "none"
    modal.setAttribute("aria-hiden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("clisck", closeModal)  
}


// Traitement de la fenêtre modale

document.querySelectorAll('.js-modal').forEach(a => { // ajout EventListener sur chaque lien qui ont la class js-modal
    a.addEventListener('click', openModal)   // apl fonction d'ouverture de la fenetre modal au clic sur ces liens
    
})

