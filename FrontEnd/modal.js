
fetch("index.html", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
.then(response => {
    if (token) {
        enableModal()
        removeModal()
        openModal2()
        returnAndCloseModal2()
        openNewPic()
        addFigureToApi()
    } else {
        sessionStorage.removeItem("token");
    }
})
.catch(error => {
    console.error("Erreur lors de la récupération de la ressource protégée:", error);
});



function enableModal(){
    const boutons = document.querySelectorAll(".btnModif");
    const elements = document.querySelectorAll(".hideModal");
  
    boutons.forEach((bouton, index) => {
      bouton.addEventListener("click", () => {
        elements[index].classList.remove("hideModal");
        elements[index].classList.add("modal"); 
        elements[index].removeAttribute("aria-hidden");
        elements[index].setAttribute("aria-modal", "true");
      });
    });
  }


  function removeModal() {
    const croixElements = document.querySelectorAll(".croix");
  
    croixElements.forEach((croix) => {
      croix.addEventListener("click", () => { 
        const modalElement = croix.closest(".modal");
  
        if (modalElement) {
          modalElement.classList.remove("modal");
          modalElement.classList.add("hideModal");
          modalElement.removeAttribute("aria-modal");
          modalElement.setAttribute("aria-hidden", "true");
        }
      });
    });
  
    // const modalElements = document.querySelectorAll(".modal");

    // modalElements.forEach((modal) => {
    //   modal.addEventListener("click", () => { 
    //     modal.classList.remove("modal");
    //     modal.classList.add("hideModal");
    //     modal.removeAttribute("aria-modal");
    //     modal.setAttribute("aria-hidden", "true");
    //   });
    // });
  
    
    }

// Vérifier le token avant de continuer
fetch(apiUrl, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(response => {
    if (response.ok) {
      return response.json(); 
    } else {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
  })
  .then(data => {
    // Appeler la fonction addImgModal avec les données récupérées
    addImgModal(data);
  })
  .catch(error => {
    console.error("Erreur lors de la vérification du token ou de la récupération des données :", error);
  });

function addImgModal(data) {
  for (let i = 0; i < data.length; i++) {
    const imageUrl = data[i].imageUrl;
    const title = data[i].title;
    const categoryId = data[i].category.id;
    const id = data[i].id;

    const figureElement = document.createElement("figure");
    figureElement.classList.add("figuresModal");
    figureElement.dataset.categoryId = categoryId;

    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.classList.add("figuresModalImg");

    const trashImgElement = document.createElement("img");
    trashImgElement.classList.add("trash");
    trashImgElement.src = "./assets/icons/trash-can-solid.svg";
    trashImgElement.alt = "trash";

    // Ajouter l'attribut data-id à trashImgElement
    trashImgElement.setAttribute("data-id", id);

    const galleryArticle = document.querySelector(".galleryModal");
    galleryArticle.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(trashImgElement);

    // écouteur d'événements au clic sur l'icône de la poubelle
    trashImgElement.addEventListener("click", (event) => {

      event.preventDefault();
      const clickedId = trashImgElement.getAttribute("data-id");

      // Envoyer une requête pour retirer la figure correspondante
      fetch(`http://localhost:5678/api/works/${clickedId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
        .then(response => {
          if (response.ok) {
            // Supprimer la figure de l'interface 
            figureElement.remove();
          } else {
            // Gérer les erreurs si nécessaire
            console.error("Erreur lors de la suppression de la figure.");
          }
        })
    });
  }
}

function openModal2() {
  const boutons = document.querySelectorAll(".btnAdd");

  boutons.forEach((bouton, index) => {
    bouton.addEventListener("click", () => {
      const modal2 = document.querySelector(".hideModal2");
      const modal = document.querySelector(".modal");

      if (modal2 && modal) {
        modal2.classList.remove("hideModal2");
        modal2.classList.add("modal2");
        modal2.removeAttribute("aria-hidden");
        modal2.setAttribute("aria-modal", "true");

        modal.classList.remove("modal");
        modal.classList.add("hideModal");
      }
    });
  });
}

function returnAndCloseModal2() {
  const croixElements = document.querySelectorAll(".croix2");
  const flecheElements = document.querySelectorAll(".fleche");
  
  croixElements.forEach((croix) => {
    croix.addEventListener("click", () => { 
      const modalElement = croix.closest(".modal2");

      if (modalElement) {
        modalElement.classList.remove("modal2");
        modalElement.classList.add("hideModal2");
        modalElement.removeAttribute("aria-modal");
        modalElement.setAttribute("aria-hidden", "true");
      }
    });
  });

  flecheElements.forEach((croix) => {
    croix.addEventListener("click", () => { 
      const modalElement = croix.closest(".modal2");
      const modal = document.querySelector(".hideModal");
  
      if (modalElement) {
        modalElement.classList.remove("modal2");
        modalElement.classList.add("hideModal2");
        modalElement.removeAttribute("aria-modal");
        modalElement.setAttribute("aria-hidden", "true");
        
        modal.classList.remove("hideModal");
        modal.classList.add("modal");
      }
    });
  });
}

function openNewPic() {
  const fileInput = document.getElementById("fileInput");
  const addNewPicButton = document.getElementById("addNewPic");
  const uploadedImage = document.getElementById("uploadedImage");
  const imageContainer = document.getElementById("imageContainer");
  const iconeAdd = document.querySelector(".iconeAdd");
  const pAdd = document.querySelector(".pAdd");

  // Ajoutez un gestionnaire d'événement click au bouton pour ouvrir le sélecteur de fichiers
  addNewPicButton.addEventListener("click", () => {
    fileInput.click();
  });

  // Ajoutez un gestionnaire d'événement change au sélecteur de fichiers
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        uploadedImage.src = imageDataURL;
        imageContainer.style.display = "block";

        // Changer la classe des éléments
        iconeAdd.classList.add("hideElementsModal2");
        pAdd.classList.add("hideElementsModal2");
        addNewPicButton.classList.remove("NewPic");
        addNewPicButton.classList.add("hideElementsModal2");
      };

      reader.readAsDataURL(file);
    }
  });
}





function addFigureToApi() {

}