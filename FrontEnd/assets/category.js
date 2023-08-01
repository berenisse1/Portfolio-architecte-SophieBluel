

let urlWorks = `http://localhost:5678/api/works`; // on recupere l'api work


const apiCallFiltre = async () => {

    await fetch(urlWorks)
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api


    function filtreWork(apiData){
        const btnFiltre = document.querySelector('button[data-id]')
        btnFiltre.forEach(button => { // boucle crée 1 par boutton


            button.addEventListener('click')  //event au click
            const dataId = button.dataset.id  // variable pr chercher data_id des btn
            apiData.filter(function(element) { // variable pr filtrer les données api
                return element.categoryId === dataId
               
            });
   
           
            document.querySelector('.gallery').innerHTML = ''; // vide la gallery pr afficher uniquement categorie filtrée
   
       
        });




    }


    filtreWork(apiData);




}
apiCallFiltre();









