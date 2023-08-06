

// On récupère les deux champs et on affiche leur valeur

let form = document.querySelector("form");
console.log(form);
let baliseEmail = document.querySelector("email");
console.log(email);
let balisePassword = document.querySelector("password");
console.log(password);



//Définition des régles de validation

function verifierChamp(balise){
    if (balise.value === ""){
        balise.classList.add("error")
    } else {
        balise.classList.remove("error")
    }
}

function verifierEmail(balise) {
    let emailRegExp = new RagExp("[a-z0-9._-]+[a-z0-9._-]+\\.[a-z0-9._-]")
    if(emailRegExp.test(balise.value)) {
        balise.classList.remove("error")
    } else {
        balise.classList.add("error")
    }
}

function verifierPassword(balise) {
    let passwordRegExp = new RagExp("/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/")
    if(passwordRegExp.test(balise.value)) {
        balise.classList.remove("error")
    } else {
        balise.classList.add("error")
    }
}

//Controle si régle de validation verifier 

form.addEventListener("submit", (event) => { // On verifie les input a l'envoi du formilaire
    event.preventDefault() // On empêche le comportement par défaut
    verifierChamp(balisePassword)
})

baliseEmail.addEventListener("change", () => { //On verifie l'email au changement de champ
    verifierChamp(baliseEmail)

})

baliseEmail.addEventListener("change", () => { //On verifie le password au changement de champ
    verifierChamp(balisePassword)

})