$(document).ready(function () {
    const $list = $("#transactionList");
    const $filter = $("#filterType");
    const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function renderTransactions(filter = "All") {
        $list.empty();

        let filtered = allTransactions;

        if (filter !== "All") {
            filtered = allTransactions.filter(tx => tx.type === filter);
        }

        const lastFive = filtered.slice(-5).reverse();

        if (lastFive.length === 0) {
            $list.append(`
                <li class="list-group-item text-center text-muted">
                    No hay movimientos
                </li>`);
            return;    
        }

        lastFive.forEach(tx => {
            const isIncome = tx.amount > 0;
            const badgeClass = isIncome ? "bg-success" : "bg-danger";
            const sing = isIncome ? "+" : "";

            const item = `
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                        <strong>${tx.type}</strong>
                        <div class="small text-muted">${tx.detail}</div>
                        <div class="small text-muted">${tx.date}</div>
                    </div>
                    <span class="badge ${badgeClass} fs-6">
                        ${sing}$${Math.abs(tx.amount).toLocaleString("es-CL")}
                    </span>
                </li>`;
            $list.append(item);    
        });
    }

    renderTransactions();

    $filter.on("change", function () {
        renderTransactions($(this).val());
    });
});