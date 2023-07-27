let urlWorks = `http://localhost:5678/api/works`; // on recupere l'api work
let section = document.querySelector('.gallery');// on va chercher la class gallery pour aficher les travaux
const btnFiltre = document.querySelector(btnFiltre[data-id])


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

    showWork (apiData);


    

}

apiCall();


