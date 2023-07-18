//apel Api pour les travaux avec méthode GET

fetch("http://localhost:5678/api");

fetch(`http://localhost:8081/pieces/${id}/travaux`);

//ajouter galerie de travaux récuperés avec creat Element
const article = travaux[0];
const imageElement = document.createElement("img");
travauxElement.src = article.travaux;