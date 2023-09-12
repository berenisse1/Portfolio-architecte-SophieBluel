
// On récupère les deux champs et on affiche leur valeur

let form = document.querySelector("form");
let baliseEmail = document.querySelector("#email");
let balisePassword = document.querySelector("#password");
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
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]")
    if(emailRegExp.test(balise.value)) {
        balise.classList.remove("error")
    } else {
        balise.classList.add("error")
    }
}

//verifie si password respect le format reg exp définit 
function verifierPassword(balise) { 
    let passwordRegExp = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}")
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


// Soumettre les données de connexion avec la méthode POST

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let urlUsersLogin = `http://localhost:5678/api/users/login`;
    let email = document.getElementById("email").value; //on recupere la valeur de l'email
    let password = document.getElementById("password").value; // on récuoère la valeur du mot de pass

    if(!email || !password){
        messageError.innerText = "votre email ou votre mot de passe est incorectes";
    }

    // Méthode POST
    let user = ({ 
        "email": email,
        "password" : password
    })
    fetch(urlUsersLogin, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8" // en tête
        },
        body: JSON.stringify(user) //charge utile transforme user en json
    })
    // Réponse de l'API
    .then(function(response){
        if(!response.ok){ //si connexion refusée
            messageError.innerText = "Votre email ou votre mot de passe est incorrect"
        } else { //si connexion autorisée 
            response.json().then(function(data){ 
                localStorage.setItem("token", data.token); // Enregistre la réponse de l’API stock token dans le localStore
                window.location = "index.html"; //redirection homepage  
            })
        }
    })
    // Interception des erreurs 
    .catch(error => // interomp code en cas d'erreur et signale erreur dans la console
        console.log("error" + error) // sgnial chaine de caractère "erreur" + localisation de l'erreur
    );
    
});
