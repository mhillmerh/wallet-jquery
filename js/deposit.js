$(document).ready(function () {
    if (!localStorage.getItem("balance")) {
        localStorage.setItem("balance", "0");
    }

    if (!localStorage.getItem("transactions")) {
        localStorage.setItem("transactions", JSON.stringify([]));
    }

    const $form = $("#depositForm");
    const $amountInput = $("#depositAmount");
    const $modalEl = $("#depositSuccessModal");
    const $modalMsg = $("#depositSuccessMsg");
    
    const successModal = new bootstrap.Modal($modalEl[0]);

    $form.on ("submit", function (e) {
        e.preventDefault();

        const amount = Number($amountInput.val());

        if (amount <= 0 || isNaN(amount)){
            alert("ingrese un monto válido");
            return;
        }

        let balance = Number(localStorage.getItem("balance"));
        balance += amount;

        localStorage.setItem("balance", balance.toString());

        saveTransaction(
            "Depósito",
            "Depósito en cuenta",
            amount

        );

        $modalMsg.text(`Depósito realizado con éxito. Monto: $${amount.toLocaleString("es-CL")}`);
        successModal.show();

        $modalEl.on("hidden.bs.modal", function () {
            window.location.href = "menu.html"
        });
    });

    const withdrawModal = new bootstrap.Modal($("#withdrawModal")[0]);

    $("#withdrawBtn").on("click", function () {
        $("#withdrawAmount").val("");
        withdrawModal.show();
    });

    $("#confirmWithdraw").on("click",function () {
        const amount = Number($("#withdrawAmount").val());

        if (amount <= 0 || isNaN(amount)) {
            alert("Ingrese un monto válido");
            return;
        }

        let balance = Number(localStorage.getItem("balance"));

        if (amount > balance) {
            alert("Saldo insuficiente");
            return;
        }

        balance -= amount;
        localStorage.setItem("balance", balance.toString());

        saveTransaction(
            "Retiro",
            "Retiro desde cuenta",
            -amount
        );
        withdrawModal.hide();

        $("#depositSuccessMsg").text(`Retiro realizado con éxito por un monto: $${amount.toLocaleString("es-CL")}`);
        successModal.show();

        $("#depositSuccesModal").on("hidden.bs.modal", function () {
            window.location.href = "menu.html";
        });
    });

    $("#btnMenu").on("click", function () {
        window.location.href = "menu.html";
    });
});