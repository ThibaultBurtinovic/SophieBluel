// Récupérez le token depuis le stockage de session
const token = sessionStorage.getItem("token");

fetch("index.html", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
.then(response => {
    if (token) {
        hideFilters();
        logOut()
        enableEditMode()
    } else {
        sessionStorage.removeItem("token");
    }
})
.catch(error => {
    console.error("Erreur lors de la récupération de la ressource protégée:", error);
});


//Fonction LogOut
    // hide les filtres
function logOut() {
    const hideLogElements = document.querySelectorAll(".log");
    hideLogElements.forEach(element => {
        element.classList.remove("log");
        element.classList.add("hide");
    });

    //Changement de "login" en "logout"
    const logElements = document.querySelectorAll(".hideLog");
    logElements.forEach(element => {
        element.classList.remove("hideLog");
        element.classList.add("logOut");
    });

    // Sup le token d'identification si click sur "logout"
    const logOutElement = document.getElementById("logOut");
    logOutElement.addEventListener("click", function() {
        sessionStorage.removeItem("token");
        window.location.href = "index.html";
    });
}


// Fonction changement visuel de la page d'accueil
function hideFilters() {
    const hideFiltres = document.querySelectorAll(".classiqueButton");

    hideFiltres.forEach(element => {
        element.classList.remove("classiqueButton");
        element.classList.add("hide");
    });
}



function enableEditMode() {
    const elementsToChange = document.querySelectorAll('[id="hideEdit"]');

    elementsToChange.forEach(element => {
        element.id = 'enableEdit';
    });
}

 