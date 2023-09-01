const apiUrl = "http://localhost:5678/api/works";

// Utilisation de la fonction fetch pour récupérer des données
fetch(apiUrl)
  .then(response => {
    // Vérification de la réponse HTTP
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
    // Conversion de la réponse en JSON
    return response.json();
  })
  //appel functions 
  .then(data => {
    addImg(data); 
    Filtres(data); 
  })



//Function add data (img et texte)
function addImg(data){

  for (let i = 0; i < data.length; i++) {

  const imageUrl = data[i].imageUrl;
  const title = data[i].title;
  

  const figureElement = document.createElement("figure");
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerText = title;


  const galleryArticle = document.querySelector(".gallery");
    galleryArticle.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
  }
}

// Création des filtres
function Filtres(data){
  let btnFinal = 0
  let tag = 0


  let listButton = document.querySelectorAll("button");

  for (let i = 0; i < listButton.length; i++){
      let btnFocus = listButton[i]
  
      btnFocus.addEventListener("click", (event) => {
          btnFinal = event.target

          let figures = document.querySelectorAll("figure");
          for(let figure of figures){
            
            for (let i = 0; i < data.length; i++){
              tag = data[i].categoryId;
            
             if(tag === btnFinal.id)
             figure.style.display = "block";
             console.log(btnFinal)
             console.log(tag)
              }
            }
      })



  // Visuel Boutons
      let Actif = false
      btnFocus.addEventListener("click", function() {
          if (!Actif) {
              btnFocus.style.backgroundColor = "#1D6154";
              btnFocus.style.color = "#FFFF";
              Actif = true;
          } else {
              btnFocus.style.backgroundColor = "";
              btnFocus.style.color = "#1D6154";
              Actif = false;
          }
      });
  }
  
 



}



  

