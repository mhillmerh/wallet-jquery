$(document).ready(function() {
    const isLogged = localStorage.getItem("isLogged");

    if (isLogged !== "true") {
        window.location.href = "index.html";
    }
})