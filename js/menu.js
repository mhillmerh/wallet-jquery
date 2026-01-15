$(document).ready(function () {

    if (!localStorage.getItem("balance")) {
        localStorage.setItem("balance", "0");
    }

    let balance = Number(localStorage.getItem("balance"));
    let visible = true;

    const $balanceValue = $("#balance-value");
    const $toggleIcon = $("#toggleBalance");

    function renderBalance() {
        if (visible) {
            $balanceValue.text(`$${balance.toLocaleString("es-CL")}`);
            $toggleIcon.removeClass("bi-eye-slash").addClass("bi-eye");
        } else {
            $balanceValue.text("$******");
            $toggleIcon.removeClass("bi-eye").addClass("bi-eye-slash");
        }
    }

    renderBalance();

    $toggleIcon.on("click", function () {
        visible = !visible;
        renderBalance();
    });

    $("#btnDeposit").on("click", function () {
        window.location.href = "deposit.html";
    });

    $("#btnSend").on("click", function () {
        window.location.href = "sendmoney.html";
    });

    $("#btnTransactions").on("click", function () {
        window.location.href = "transactions.html";
    });
});