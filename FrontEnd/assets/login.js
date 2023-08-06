

// On récupère les deux champs et on affiche leur valeur

let form = document.querySelector("form")
console.log(form)
let baliseEmail = document.querySelector("email")
console.log(email);
let balisePassword = document.querySelector("password")
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
    let passwordRegExp = new RagExp("/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/")
    if(passwordRegExp.test(balise.value)) {
        balise.classList.remove("error")
    } else {
        balise.classList.add("error")
    }
}


