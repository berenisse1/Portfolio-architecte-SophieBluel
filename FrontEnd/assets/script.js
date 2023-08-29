let urlWorks = `http://localhost:5678/api/works`; // on recupere l'api work
let section = document.querySelector('.gallery');// on va chercher la class gallery pour aficher les travaux
let modalGallery = document.querySelector('.modal-gallery') 


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
                deleteWork()
            
            });
          
        });
            
    }
    editWork(apiData);

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

// Elements de connexion et de déconnexion

const token = localStorage.getItem("token");
const editModal = document.querySelector(".modal-edit");
const btnModal = document.querySelectorAll(".btn-modal");
 
if (token) {
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
    event.preventDefault() // empêche rechargement de la page au clic pour rediriger vers url
    modal.style.display = 'flex';
    modalWorkContent.style.display = 'flex'; 
    btnReturnModalWork.style.display = "none";
    modalAddWorkContent.style.display = 'none'; 
    modal.removeAttribute('aria-hidden') // retire attribut pour garantir accesibilité de la fenêtre modal aux technologie d'assistance
    modal.setAttribute('aria-modal', 'true') // ajoute attribut pour que les technologies d'asistance puisse identifier le type de contenue
    modal.addEventListener("click", closeModal) // apl fonction de fermeture de la modal au clic
    modal.querySelector('.js-modal-close').addEventListener('click',closeModal) 
    modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation) 
}

// Fonction de fermeture de la fenêtre modal 

const closeModal = function (event){
    event.preventDefault() 
    modal.style.display = 'none'
    modalAddWorkContent.style.display = 'null';
    btnReturnModalWork.style.display = "null";
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

document.querySelectorAll('.js-modal').forEach(a => { // ajout EventListener sur chaque lien qui ont la class js-modal
    a.addEventListener('click', openModal)   // apl fonction d'ouverture de la fenetre modal au clic sur ces liens
    
})

//Accés au contenu d'ajout de travaux de la fenêtre modal 

const btnModalAddImg = document.querySelector(".btn-add-img");
console.log(btnModalAddImg);


btnModalAddImg.addEventListener('click', () => {
    modalWorkContent.style.display = "none";
    btnReturnModalWork.style.display = "block";
    modalAddWorkContent.style.display = "block";    
});

///

// Retour sur la gallerie de la fenêtre modale

btnReturnModalWork.addEventListener('click', () => {
    modalWorkContent.style.display = "flex";
    modalAddWorkContent.style.display = "none";
    btnReturnModalWork.style.display = "none";
    modalAddWorkContent.removeEventListener('click', btnReturnModalWork )

});


// Suprimer les travaux avec méthode DELETE

function deleteWork (){

    const btnDelete = document.querySelector('.js-btn-delete') // récupere element bouton de supression
    const idWork =document.querySelector(`button.js-btn-delete[data-id]`); // on récupere la data-id de l'élement buton de supression
    console.log(idWork)
    
    //appel fetch avec méthode POST
    fetch(`http://localhost:5678/api/works/${idWork}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${token}'
        }  
    })
     // Réponse de l'API
    .then (response =>{
        if(response.ok){ 
            console.log("le projet à bien été suprimer")
            btnDelete.ParentElement.remove 
            removeWork()
        } 
    })
    // Interception des erreurs 
    .catch(error => 
    connsole.log("error" + error)
    );

}

function removeWork(){
    const idWork =document.querySelector(`button.js-btn-delete[data-id]`);
    const idFigure = document.querySelector('figure[data-id]')
    const figureToDelete  = idFigure = idWork
    figureToDelete.remove

    console.log(figureToDelete)   
}


// fonction pour prévisualiser la photo avant ajout 

let image = document.getElementById("image");
     
let previewPhoto  = function (event) {

    const [photo] = event.files // evenement qui contient un objet fileList

    if (photo) {
        // On génère l'URL de l'image
        image.src = URL.createObjectURL(photo)
        document.querySelector('.js-ampty-preview-container').style.display = "none"
    }
}

// Soumettre les données du projet ajouté méthode POST

function addWork() {

    const form = document.getElementById("form-add-file");
    const inputTitle = document.getElementById("title").file;
    const inputPicture = document.getElementById("picture").value;
    const SelectCategory = document.getElementById("category").value;
    let messageError = document.querySelector(".msg-error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let urlUsersLogin = `http://localhost:5678/api/works`;


        // Récupération de la valeur des champ de formulaire avec  objet formData
        let formData = new FormData();
        formData.append("image", inputPicture.files[0]);
        formData.append("title", inputTitle.value);
        formData.append("category", SelectCategory.value);
        console.log(formData)
    
        if (inputPicture.value === "" || inputTitle.value === "" || SelectCategory.value === "") {
            messageError.innerText = "Veuillez renseigner tous les champs de saisie!";
            formData.balise.classList.add("error")
        }
    
        // Méthode POST
        fetch(urlUsersLogin, {
    
            method: "POST",
            body: JSON.stringify(formData) //charge utile transforme formData en json
        })
    
        // Réponse de l'API
        .then(function(response){
            if(!response.ok){ 
                messageError.innerTexte = '<p> erreur impossible d ajouter le fichier <p>'
            } else { 
                response.json().then(function(data){
                    console.log(result.message);
                })
            }
            
        })
        // Interception des erreurs 
        .catch(error => 
            connsole.log("error" + error) 
        );
            
    });
    
};
addWork();

