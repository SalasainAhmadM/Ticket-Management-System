 function resetIndex() {
        window.location.href = "index.php";
}

function resetPRPage() {
        window.location.href = "pull-request.php";
}
    

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const dateFilter = document.getElementById("date-filter");
    const tableRows = document.querySelectorAll("tbody tr");

    function parseCustomDate(dateStr) {
        const [day, monthAbbr, yearShort] = dateStr.split(" ");
        const monthMap = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04",
            May: "05", Jun: "06", Jul: "07", Aug: "08",
            Sep: "09", Oct: "10", Nov: "11", Dec: "12"
        };

        if (!day || !monthAbbr || !yearShort) return null;

        const fullYear = parseInt(yearShort) < 50
            ? "20" + yearShort
            : "19" + yearShort;

        return `${fullYear}-${monthMap[monthAbbr]}-${day.padStart(2, "0")}`;
    }

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDate = dateFilter.value;

        tableRows.forEach(row => {
            const cells = row.children;
            const dateCreatedCell = cells[5] || cells[6];
            const dateCreatedText = dateCreatedCell?.textContent.trim() ?? '';

            const ticketNum = cells[1]?.textContent.toLowerCase() ?? '';
            const description = cells[2]?.textContent.toLowerCase() ?? '';
            const assignee = cells[3]?.textContent.toLowerCase() ?? '';
            const status = cells[4]?.textContent.toLowerCase() ?? '';

            let showRow = true;

            const isTicketRow = !!description && !!assignee;
            if (searchTerm && isTicketRow && !(
                ticketNum.includes(searchTerm) ||
                description.includes(searchTerm) ||
                assignee.includes(searchTerm) ||
                status.includes(searchTerm)
            )) {
                showRow = false;
            }

            if (selectedDate && showRow) {
                const parsedDate = parseCustomDate(dateCreatedText);
                if (parsedDate !== selectedDate) {
                    showRow = false;
                }
            }

            row.style.display = showRow ? "" : "none";
        });
        showOrHideEmptyMessage();
    }

    searchInput.addEventListener("input", filterTable);
    dateFilter.addEventListener("change", filterTable);
});

function showOrHideEmptyMessage() {
    const tableBody = document.querySelector("tbody");
    const allRows = Array.from(tableBody.querySelectorAll("tr"));
    const visibleRows = allRows.filter(row => row.style.display !== "none");

    let emptyRow = tableBody.querySelector(".empty-filter-message");

    if (visibleRows.length === 0) {
        if (!emptyRow) {
            emptyRow = document.createElement("tr");
            emptyRow.className = "empty-filter-message";
            emptyRow.innerHTML = `<td colspan="9" class="empty-message">No matching records found</td>`;
            tableBody.appendChild(emptyRow);
        }
    } else {
        if (emptyRow) emptyRow.remove();
    }
}
