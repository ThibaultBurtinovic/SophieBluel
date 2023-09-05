// Sélectionner le bouton SE CONNECTER
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // authentifier l'utilisateur
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
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
        console.error("Erreur lors de l'authentification:", error);
    });
});


//Fonction afficher texte quand l'authentification a échoué
function failLogin() {
    const failLogin = document.querySelectorAll(".hide");
    
    failLogin.forEach(element => {
        element.classList.remove("hide");
        element.classList.add("visible");
    });
}

