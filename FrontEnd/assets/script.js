const urlWorks = `http://localhost:5678/api/works`; // on recupere l'api works
const section = document.querySelector('.gallery');// on va chercher la class gallery pour aficher les travaux
const modalGallery = document.querySelector('.modal-gallery');


const apiCall = async() => {
    await fetch(urlWorks) // pour faire attendre pendant le traitement
    .then((response) => response.json ()) // réponse requête transformer au format Json
    .then((data) => (apiData = data)) // cherche les donnés de l'api

    //Génerer les travaux depuis l'API

    function showWork(apiData){

        apiData.forEach(element => { //boucle crée 1 par élement

            newFigure = document.createElement('figure');
            newFigure.id = element.id;

            newImg = document.createElement('img');
            newImg.src = element.imageUrl;
            newImg.alt = element.title;
            newImg.crossOrigin = "anonymous";
            
            newFigcaption = document.createElement ('figcaption');
            newFigcaption.innerText = element.title;

            section.appendChild(newFigure);
            newFigure.appendChild(newImg);
            newFigure.appendChild(newFigcaption);


        });
            
    }
    showWork(apiData);


    //Générer la galerie de la fenêtre modale depuis l'API

    function editWork(apiData){

        apiData.forEach(element => { //boucle crée 1 par élement

            newFigure = document.createElement('figure');
            newFigure.id = element.id;
            
            newImg = document.createElement('img');
            newImg.src = element.imageUrl;
            newImg.alt = element.title;
            newImg.crossOrigin = "anonymous";

            newFigcaption = document.createElement ('figcaption');
            newFigcaption.innerText = "éditer";

            btnDelete = document.createElement('button');
            btnDelete.classList.add("js-btn-delete");
            btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            btnDelete.setAttribute('data-id', element.id);
            console.log(btnDelete)

            btnMove = document.createElement('button');
            btnMove.classList.add("js-btn-move");
            btnMove.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
       
            modalGallery.appendChild(newFigure);
            newFigure.appendChild(newImg);
            newFigure.appendChild(newFigcaption);
            newFigure.appendChild(btnDelete);
            newFigure.appendChild(btnMove);

            btnDelete.addEventListener('click', () => {
                deleteWork(element.id) 
               
               
            });
          
        });
            
    }
    editWork(apiData);

    //Traitement des filtres

    const btnFiltre = document.querySelectorAll('.btn-filter[data-id]');// Cherche les boutons de filtrages
    console.log(btnFiltre);
    
    btnFiltre.forEach(button => { // boucle crée 1 par boutton

        button.addEventListener('click', () => {  
            const dataId = button.dataset.id //Crée une constante pour chercher le data-id du bouton
            let filtre = apiData.filter(function(element){ //Crée variable pour filtrer les données API 
            return element.categoryId == dataId; // Retourne element dont la categorie coresspond à celle du buton sélectionné 
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

// Elements de connexion et de déconnexion

const token = localStorage.getItem("token");
const editModal = document.querySelector(".modal-edit");
const btnModal = document.querySelectorAll(".btn-modal");
const filtering = document.querySelector(".filters");
 
if (token) {
    filtering.style.display = "none"
    editModal.style.display = "flex";
    btnModal.forEach((button) => {
        button.style.display = "flex";   
    });
    let log = document.querySelector(".js-log")
    log.innerHTML = "logout"
    log.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.href = "login.html"
    });
}else{
    editModal.style.display = "none";
    btnModal.forEach((button) => {
        button.style.display = "none";
    });
}

// Fonction d'ouverture de la fenetre modal

const modal = document.querySelector('.modal')
const modalWorkContent = document.querySelector(".modal-work-content");
const modalAddWorkContent = document.querySelector(".modal-add-work-content");
const btnReturnModalWork = document.querySelector(".btn-return-modalWork");

const openModal = function (event){
    event.preventDefault() // empêche rechargement de la page au clic 
    modal.style.display = 'flex';
    modalWorkContent.style.display = 'flex'; 
    btnReturnModalWork.style.display = "none";
    modalAddWorkContent.style.display = 'none'; 
    modal.removeAttribute('aria-hidden') // retire attribut pour garantir accesibilité de la fenêtre modal aux technologie d'assistance
    modal.setAttribute('aria-modal', 'true') // ajoute attribut pour que les technologies d'asistance puissent identifier le type de contenue
    modal.addEventListener("click", closeModal) // apl fonction de fermeture de la modal au clic
    modal.querySelector('.js-modal-close').addEventListener('click',closeModal) 
    modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation) 
}

// Fonction de fermeture de la fenêtre modal 

const closeModal = function (event){
    event.preventDefault() 
    resetModal()
    modalAddWorkContent.style.display = 'null';
    btnReturnModalWork.style.display = "null";
    modal.style.display = 'none'
    modal.setAttribute('aria-hiden', 'true')
    modal.removeAttribute("aria-modal")
    modal.removeEventListener('clisck', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal) 
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)   
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

// Traitement de la fenêtre modale

document.querySelectorAll('.js-modal').forEach(a => { 
    a.addEventListener('click', openModal)   
    
})

//Accés au contenu d'ajout de travaux de la fenêtre modal 

const btnModalAddImg = document.querySelector(".btn-add-img");
console.log(btnModalAddImg);


btnModalAddImg.addEventListener('click', () => {
    modalWorkContent.style.display = "none";
    btnReturnModalWork.style.display = "block";
    modalAddWorkContent.style.display = "block"; 
    msgRespDelete.innerHTML = ''
});


// Retour sur la gallerie de la fenêtre modale

btnReturnModalWork.addEventListener('click', () => {
    modalWorkContent.style.display = "flex";
    modalAddWorkContent.style.display = "none";
    btnReturnModalWork.style.display = "none";
    msgRespAdd.innerHTML = ''
    modalAddWorkContent.removeEventListener('click', btnReturnModalWork );
    image.removeEventListener('click', btnModalAddImg)
     
});


// fonction pour prévisualiser la photo avant ajout 

const image = document.getElementById("image");
     
const previewPhoto  = function (event) {

    const [photo] = event.files // evenement qui contient un objet fileList

    if (photo) {
        document.querySelector('.js-ampty-preview-container').style.display = "none"
        image.src = URL.createObjectURL(photo) // On génère l'URL de l'image
        image.style.width = "100%"
        image.style.height ="100%"
        resetModal()
    }
}

//fonction de réinitialisation de la modale
function resetModal(){
    image.addEventListener('click', () =>{
        document.querySelector('.js-ampty-preview-container').style.display = "flex"
        document.getElementById('form-add-file').reset()
        msgRespAdd.innerHTML = ''
        msgRespDelete = ''
        image.src = ''
        image.style.width = null
        image.style.height = null
       
    })

}   

// Supression des travaux avec la méthode DELETE

let msgRespDelete = document.querySelector(".msg-resp-delete")

function deleteWork (idWork){
    
    //Appel fetch avec méthode DELETE pour suprimer projet selon son id
    fetch(`http://localhost:5678/api/works/${idWork}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }  
    })
     // Réponse de l'API
    .then (response =>{
        if(response.ok){ 
            msgRespDelete.innerText = "Projet suprimé!"
            btnDelete.parentElement.remove() 
            removeWork()
            document.querySelector('.gallery').innerHTML = '';
            document.querySelector('.modal-gallery').innerHTML = '';
            return apiCall()
            
        } 
    })
   
    // Interception des erreurs 
    .catch(error => 
    console.log("error" + error)
    );
   
}

function removeWork(){
    let idWork =document.querySelector(`button.js-btn-delete[data-id]`);
    let idFigure = document.querySelector('figure[data-id]')
    let figureToDelete  = idFigure = idWork
    figureToDelete.remove  
}


// Soumettre les données du projet à ajouter avec la méthode POST

const form = document.getElementById("form-add-file");
let msgRespAdd = document.querySelector(".msg-resp-add")

function addWork() {
    
   
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const inputTitle = document.getElementById("title");
        const inputPhoto = document.getElementById("photo");
        const selectCategory = document.getElementById("category");

        // Récupération de la valeur des champs de formulaire avec  objet formData
        let formData = new FormData();
        formData.append("image", inputPhoto.files[0]);
        formData.append("title", inputTitle.value);
        formData.append("category", selectCategory.options[selectCategory.selectedIndex].value);

        if (inputTitle.value === '' || inputPhoto.value === '' || selectCategory.value === '') {
            msgRespAdd.innerText = "Veuillez renseigner tous les champs de saisie!";
            return;
        }

        // Méthode POST
        let postAdd = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            }, 
            body: formData

        }   

        fetch('http://localhost:5678/api/works', postAdd)
        // Réponse de l'API
        .then(function(response){
            if(!response.ok){ 
                msgRespAdd.innerText = "Erreur ajout de projet impossible"
            } else { 
                msgRespAdd.innerText = "Projet ajouter avec succés"
                response.json().then(function(data){
                    
        
                    document.querySelector('.gallery').innerHTML = '';
                    document.querySelector('.modal-gallery').innerHTML = '';
                    return apiCall();
                    
                })
            
            }   
            
            
        })
        // Interception des erreurs 
        .catch(error => 
            console.log("error" + error) 
        );
          
     
    });
  

}
addWork() 





