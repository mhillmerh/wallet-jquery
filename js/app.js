function saveTransaction(type, detail, amount){
        const transactions = JSON.parse(localStorage.getItem("transactions"));
        transactions.unshift({
            type,
            detail,
            amount,
            date: new Date().toLocaleString("es-CL")
        });
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

$(document).ready(function() {

    const errorModalEL = document.getElementById("loginErrorModal");
    const errorModal = new bootstrap.Modal(errorModalEL);

    $("form").on("submit", function (e) {
        e.preventDefault();
        
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        let userFound = false;

        $.each(USERS, function (index, user) {
            if (user.email === email && user.password === password) {
                userFound = true;
                return false;
            }
        });

        if (userFound) {
            localStorage.setItem("isLogged", "true");
            window.location.href = "menu.html";
        } else {
            $("#modalErrosMsg").text("Correo o contraseña no son validos");
            errorModal.show();
        }
    });
});

$(document).ready(function () {
    $("#togglePassword").on("click", function () {
        const passwordInput = $("#password");
        const icon = $(this);

        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            icon.removeClass("bi bi-eye-slash").addClass("bi-eye");
        } else {
            passwordInput.attr("type", "password");
            icon.removeClass("bi-eye").addClass("bi-eye-slash");
        }
    })
})

$(document).ready(function () {
    $("#btnLogout").on("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("isLogged");
        window.location.href = "index.html";
    });
});