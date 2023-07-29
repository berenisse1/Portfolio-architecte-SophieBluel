let urlWorks = `http://localhost:5678/api/works`; // on recupere l'api work
const btnFiltre = document.querySelector('btnFiltre[data-id]')


const apiCall = async() => {
    await fetch(urlWorks) // pour faire attendre pendant le traitement
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api

    function showWork(apiData){


        btnFiltre.forEach(button => { // boucle crée 1 par boutton

            button.addEventListener('click')  //event au click
            const dataId = button.dataset.id  // variable pr chercher data_id des btn
            let filtre = apiData.filter(function(element) { // variable pr filtrer les données api
                return element.categoryId = dataId = document.querySelector('.gallery').innerHtml = ''; // vide la gallery pr afficher uniquement categorie filtrée
               
            })
        
        });

       
    
            
    }

    showWork (apiData);


    

}

apiCall();


