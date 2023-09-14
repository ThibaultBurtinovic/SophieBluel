
    if (token) {
      enableModal();
      removeModal();
      openModal2();
      returnAndCloseModal2();
      openNewPic();
      BtnValider()
    } else {
      sessionStorage.removeItem("token");
    }
 
function enableModal() {
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

  const backgroundCloseElements = document.querySelectorAll(".backgroundClose");

  backgroundCloseElements.forEach((backgroundClose) => {
    backgroundClose.addEventListener("click", () => {
      const modalElement = backgroundClose.closest(".modal, .modal2");

      if (modalElement) {
        if (modalElement.classList.contains("modal")) {
          modalElement.classList.remove("modal");
          modalElement.classList.add("hideModal");
        } else if (modalElement.classList.contains("modal2")) {
          modalElement.classList.remove("modal2");
          modalElement.classList.add("hideModal2");
        }

        modalElement.removeAttribute("aria-modal");
        modalElement.setAttribute("aria-hidden", "true");
      }
    });
  });
}

// Vérifier le token avant de continuer
fetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
  })
  .then((data) => {
    modalDelete(data);
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la vérification du token ou de la récupération des données :",
      error
    );
  });

function modalDelete(data) {
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

    trashImgElement.addEventListener("click", (event) => {
      event.preventDefault(); 
      event.stopPropagation();
      const clickedId = trashImgElement.getAttribute("data-id");

      // Envoyer une requête pour retirer la figure
      fetch(`http://localhost:5678/api/works/${clickedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          // Supprimer la figure de l'interface
          figureElement.remove();
          removeFigureByClass(visible)
        } else {
          console.error("Erreur lors de la suppression de la figure.");
        }
      });
    });
  }
}

function openModal2() {
  const boutons = document.querySelectorAll(".btnAdd");

  boutons.forEach((bouton, index) => {
    bouton.addEventListener("click", () => {
      // Prevent the default behavior of the button click, which may submit a form
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
  const addPic = document.querySelector(".addPic");
  const formPic = document.getElementById("form-image");
  const pAdd = document.querySelector(".pAdd");
  const iconeAdd = document.querySelector(".iconeAdd");

  // Ajoutez un gestionnaire d'événement change au sélecteur de fichiers
  fileInput.addEventListener("change", (event) => {
    event.preventDefault();
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        uploadedImage.src = imageDataURL;
        imageContainer.style.display = "block";

        pAdd.style.display = "none";

        addPic.style.display = "none";

        formPic.style.display = "none";

        iconeAdd.style.display = "none";
      };

      reader.readAsDataURL(file);
    }
  });
}

function addFigureToApi() {
  var title = document.getElementById("titrePhoto").value;
  var category = document.getElementById("choix").value;
  var imageFileInput = document.getElementById("fileInput"); 
  var imageFile = imageFileInput.files[0]; 

  console.log(title);
  console.log(category);
  console.log(imageFile);

  if (!imageFile) {
    alert("Veuillez sélectionner une image.");
    return;
  }

  var formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", imageFile); 

  var token = sessionStorage.getItem("token");

  if (!token) {
    alert("Le jeton d'authentification est introuvable. Veuillez vous connecter.");
    return;
  }

  var headers = new Headers({
    "Authorization": `Bearer ${token}`,
  });

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData, 
    headers: headers,
  })
    .then(function (data) {
      addImg([data]);
      if (!response.ok) {
        throw new Error("Réponse du serveur non valide");
      }
      console.log(response);
      return response.json();
    })
    .catch(function (error) {
      console.error("Erreur côté client : " + error.message);
    });
}

function BtnValider() {
  const validerButton = document.querySelector(".btnVal");
  const form = document.getElementById("formAdd");
  const titreInput = document.getElementById("titrePhoto");
  const failTextHide = document.querySelector(".failTextHide");
  const failText = document.querySelector(".failText");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    // Vérifier si l'input a une valeur
    if (titreInput.value.trim() !== "") {
      // Changer la classe de modal2 en hideModal2
      var modal2 = document.querySelector(".modal2");
      modal2.classList.remove("modal2");
      modal2.classList.add("hideModal2");

      // Changer la classe de hideModal en modal
      var hideModal = document.querySelector(".hideModal");
      hideModal.classList.remove("hideModal");
      hideModal.classList.add("modal");

      // Appeler la fonction addFigureToApi uniquement si titreInput n'est pas vide
      addFigureToApi();
      
      failText.classList.remove("failText");
      failText.classList.add("failTextHide");
    } else {
      failTextHide.classList.remove("failTextHide");
      failTextHide.classList.add("failText");
    }
  });
}


