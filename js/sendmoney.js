let selectedContactIndex = null;

$(document). ready(function () {

    const addContactModal = new bootstrap.Modal("#addContactModal");
    const messageModalEl = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageModalEl);

    function showMessage(title, message, success = false, callback = null) {
        $("#messafeModalTitle").text(title).toggleClass("text-success", success).toggleClass("text-danger", !success);

        $("#messageModalBody").text(message);
        messageModal.show();

        if (callback) {
            messageModalEl.addEventListener("hidden.bs.modal", callback, { once: true});
        }
    }

    function getContacts() {
        return JSON.parse(localStorage.getItem("contacts")) || [];
    }

    function saveContacts(contacts) {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    function loadContacts(filter = "") {
        const contacts = getContacts();
        $("#contactList").empty();

        let list = contacts;

        if (filter.trim() !== "") {
            const search = filter.toLowerCase();
            list = contacts.filter(c => c.name.toLowerCase().includes(search));
        } else {
            list = [...contacts].sort((a, b) => (b.lastUsed || 0) - (a.lastUsed || 0)).slice(0, 3);
        }

        list.forEach((c, index) => {
            const li = $(`
                <li class="list-group-item">
                    <strong>${c.name}</strong><br>
                    <small>${c.cbu} ° ${c.bank} ° ${c.alias}</small>
                </li>`
            );
            li.on("click", function() {
                $(".list-group-item").removeClass("active");
                $(this).addClass("active");
                selectedContactIndex = contacts.findIndex(ct => ct.cbu === c.cbu);
            });

            $("#contactList").append(li);
        });
    }

    $("#searchContact").on("keyup", function () {
        loadContacts($(this).val());
    });

    $("#btnAddContact").on("click", function () {
        addContactModal.show();
    });

    $("#addContactForm").on("submit", function (e) {
        e.preventDefault();

        const contacts = getContacts();

        contacts.push({
            name: $("#contactName").val(),
            cbu: $("#contactCBU").val(),
            alias: $("#contactAlias").val(),
            bank: $("#contactBank").val(),
            lastUsed: 0
        });

        saveContacts(contacts);
        this.reset();
        addContactModal.hide();
        loadContacts();
    });

    $("#btnSendMoney").on("click", function () {

        if (selectedContactIndex === null) {
            showMessage("Error", "Seleccione a un contacto");
            return;
        }

        const amount = Number(prompt("Ingrese monto a enviar"));

        if (isNaN(amount) || amount <= 0) {
            showMessage("Monto inválido", "Ingrese un monto válido");
            return;
        }

        let balance = Number(localStorage.getItem("balance")) || 0;

        if (amount > balance) {
            showMessage("Saldo insuficiente", "No cuenta con saldo suficiente para realizar la operación");
            return;
        }

        balance -= amount;
        localStorage.setItem("balance", balance);

        const contacts =getContacts();
        const contact = contacts[selectedContactIndex];
        contact.lastUsed = Date.now();
        saveContacts(contacts);

        saveTransaction(
            "Transferencia",
            `transferencia a ${contact.name} - ${contact.bank}`,
            -amount
        );

        showMessage(
            "Tranferencia exitosa",
            `Se enviaron $${amount.toLocaleString("es-CL")} a ${contact.name}`,
            true,
            () => window.location.href = "menu.html"
        );
    });

    loadContacts();

})