// Utilisation de la fonction fetch pour récupérer des données
fetch(apiUrl)
  .then((response) => {
    // Vérification de la réponse HTTP
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
    // Conversion de la réponse en JSON
    return response.json();
  })
  //appel functions
  .then((data) => {
    addImg(data);
    createFiltres(data);
    styleButton(data);
  });

//Function add data (img et texte)
function addImg(data) {
  for (let i = 0; i < data.length; i++) {
    const imageUrl = data[i].imageUrl;
    const title = data[i].title;
    const categoryId = data[i].category.id;

    const figureElement = document.createElement("figure");
    figureElement.classList.add("visible");
    figureElement.dataset.categoryId = categoryId;
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
function createFiltres(data) {
  // Récupérez les boutons de filtre et les éléments de figure
  const filtres = document.querySelectorAll(".classiqueButton button");
  const figures = document.querySelectorAll(".visible");

  // événement click
  filtres.forEach((filtre) => {
    filtre.addEventListener("click", () => {
      const filtreId = filtre.getAttribute("id");
      // Affichez éléments des filtres sélectionnés et masquer les autres
      figures.forEach((figure) => {
        const figureId = figure.getAttribute("data-category-id");
        if (figureId === filtreId) {
          figure.classList.replace("visible", "visible");
          figure.classList.replace("hide", "visible");
        } else if (filtreId === "0") {
          figure.classList.replace("hide", "visible");
        } else {
          figure.classList.replace("visible", "hide");
        }
      });
    });
  });
}

function styleButton(data) {
  const buttons = document.querySelectorAll(".classiqueButton button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const buttonId = button.getAttribute("class");


      // Réinitialiser tous les boutons actifs
      buttons.forEach((btn) => {
        const btnClass = btn.getAttribute("class");
        if (btnClass && btnClass.includes("Green")) { // Vérifiez que btnClass n'est pas null 
          btn.classList.replace(btnClass, btnClass.replace("Green", ""));
        }
      });

      // Ajouter la classe "Green" 
      if (buttonId && !buttonId.includes("Green")) { // Vérifiez que buttonId n'est pas null 
        button.classList.replace(buttonId, buttonId + "Green");
      }
    });
  });
} 
