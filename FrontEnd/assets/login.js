

// On récupère les deux champs et on affiche leur valeur

let form = document.querySelector("form");
console.log(form);
let baliseEmail = document.querySelector("#email");
console.log(email);
let balisePassword = document.querySelector("#password");
console.log(password);



//Définition des régles de validation

// verifie si les champs de saisi sont vides
function verifierChamp(balise){
    if (balise.value === ""){
        balise.classList.add("error")
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

//Contrôle si les régles de validation sont verifiées lors de l'évenement

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
