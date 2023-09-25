import { apiBase } from "./config.js";

function login(email, password) {
  fetch(apiBase + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur côté serveur : " + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        // Stocker le token
        sessionStorage.setItem("token", data.token);
        // Rediriger vers la page d'accueil
        window.location.href = "index.html";
      } else {
        // Afficher un message d'erreur si l'authentification a échoué
        failLogin();
      }
    })
    .catch(error => {
      failLogin();
    });
  }
  
  // Sélectionner le bouton SE CONNECTER
  const loginButton = document.getElementById("loginButton");
  
  loginButton.addEventListener("click", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Appeler la fonction login avec les informations de l'utilisateur
    login(email, password);
  });
  
  // Fonction pour afficher le message d'erreur en cas d'échec de l'authentification
  function failLogin() {
    const failLoginElements = document.querySelectorAll(".hide");
  
    failLoginElements.forEach(element => {
      element.classList.remove("hide");
      element.classList.add("visible");
    });
  }