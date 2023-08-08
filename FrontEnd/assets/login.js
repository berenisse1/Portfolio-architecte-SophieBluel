

// On récupère les deux champs et on affiche leur valeur

let form = document.querySelector("form");
console.log(form);
let baliseEmail = document.querySelector("#email");
console.log(email);
let balisePassword = document.querySelector("#password");
console.log(password);
let messageError = document.querySelector("p");



//Définition des règles de validation

// verifie si les champs de saisi sont vides
function verifierChamp(balise){
    if (balise.value === ""){
        balise.classList.add("error")
        messageError.innerText = "Veuillez renseigner tous les champs de saisie!" // affiche message d'erreur dans la balise p
    } else {
        balise.classList.remove("error")
    }
}

// verifie si email corespond au format definit par reg exp 
function verifierEmail(balise) {
    let emailRegExp = new RegExp("[a-z0-9._-]+[a-z0-9._-]+\\.[a-z0-9._-]")
    if(emailRegExp.test(balise.value)) {
        balise.classList.remove("error")
    } else {
        balise.classList.add("error")
    }
}

//verifie si password respect le format reg exp définit 
function verifierPassword(balise) { 
    let passwordRegExp = new RegExp("/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/")
    if(passwordRegExp.test(balise.value)) {
        balise.classList.remove("error")
    } else {
        balise.classList.add("error")
    }
}

//Contrôle si les règles de validation sont verifiées lors de l'évenement

form.addEventListener("submit", (event) => { // On verifie les input a l'envoi du formilaire
    event.preventDefault() // On empêche le comportement par défaut
    verifierChamp(baliseEmail)
    verifierChamp(balisePassword)
})


baliseEmail.addEventListener("change", () => { //On verifie l'email au changement de champ
    verifierEmail(baliseEmail)

})

balisePassword.addEventListener("change", () => { //On verifie le password au changement de champ
    verifierPassword(balisePassword)

})


// Soumettre les données avec la méthode POST

let urlUsersLogin = `http://localhost:5678/api/users/login`
let user = {
    email: "baliseEmail.value",
    password: "balisePassword.value"
};
  
let apiCallUsersLogin = async () => { 

    let response = await fetch(urlUsersLogin,{ 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'// en tête
    },
    body: JSON.stringify(user)  // charge utile transforme user en json
    });
      
    let result = await response.json();
    console.log(result);

   
}
apiCallUsersLogin();


// fonction de stockage du token
function stockToken(){ 
    if(result === "200") {
        window.localStorage.setItem("token, token"); // Stockage token dans le localStorage
    }if(result === "404") {
        messageError.innerTexte = "utilisateur inconnu" 
    }
    else{
        messageError.innerTexte = "accés non autorisé"
    }
     
}


