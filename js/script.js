function addTicket() {
    Swal.fire({
        title: 'Add New Ticket',
        html: `
            <div class="edit-swal" style="display:flex; flex-direction:column; gap:6px;">
                <label for="swal-ticketId">Ticket ID</label>
                <input id="swal-ticketId" class="swal2-input" value="SS-" style="font-size: 0.85em; padding: 5px;" placeholder="Ticket ID">
                <label for="swal-description">Description</label>
                <input id="swal-description" class="swal2-input" style="font-size: 0.85em; padding: 5px;" placeholder="Description">
                <label for="swal-assignee">Assignee</label>
                <select id="swal-assignee" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                    <option value="sir Jay">Sir Jay</option>
                    <option value="ma'am Kerima">Ma'am Kerima</option>
                    <option value="ma'am Arlene">Ma'am Arlene</option>
                </select>
                <label for="swal-status">Status</label>
                <select id="swal-status" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="in progress">In Progress</option>
                    <option value="urgent">Urgent</option>
                </select>

                <label for="swal-dateCreated">Date Created</label>
                <input id="swal-dateCreated" type="date" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                <label for="swal-dateFinished">Date Finished (Optional)</label>
                <input id="swal-dateFinished" type="date" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                <label for="swal-url">URL</label>
                <input id="swal-url" class="swal2-input" style="font-size: 0.85em; padding: 5px;" placeholder="URL">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Add Ticket',
        focusConfirm: false,
        preConfirm: () => {
            return {
                ticketId: document.getElementById('swal-ticketId').value,
                description: document.getElementById('swal-description').value,
                assignee: document.getElementById('swal-assignee').value,
                status: document.getElementById('swal-status').value,
                dateCreated: document.getElementById('swal-dateCreated').value,
                dateFinished: document.getElementById('swal-dateFinished').value,
                url: document.getElementById('swal-url').value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const newTicket = result.value;

            fetch('./endpoints/add_ticket.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTicket)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const msg = document.querySelector('.success-message');
                    msg.innerHTML = `<i class="fas fa-check-circle checkmark"></i> Ticket <strong>${newTicket.ticketId}</strong> successfully added!`;
                    msg.style.display = 'block';
                    setTimeout(() => {
                        msg.style.display = 'none';
                        location.reload();
                    }, 6000);
                } else {
                    Swal.fire('Error', 'Add failed.', 'error');
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Request failed.', 'error');
            });
        }
    });
}

function editTicket(element) {
    const row = element.closest('tr');
    const rowId = row.id;
    const ticketId = row.querySelector('td:nth-child(2)').textContent.trim();
    const description = row.querySelector('td:nth-child(3)').textContent.trim();
    const assignee = row.querySelector('td:nth-child(4)').textContent.trim();
    const status = row.querySelector('td:nth-child(5)').textContent.trim().toLowerCase();
    const dateCreatedRaw = row.querySelector('td:nth-child(6)').textContent.trim();
    const dateFinishedRaw = row.querySelector('td:nth-child(7)').textContent.trim();
    const url = row.querySelector('td:nth-child(8) a').getAttribute('href');

    function formatDateForInput(dateStr) {
        if (dateStr === '-' || !dateStr) return '';
        const parts = new Date(dateStr);
        const yyyy = parts.getFullYear();
        const mm = String(parts.getMonth() + 1).padStart(2, '0');
        const dd = String(parts.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    const dateCreated = formatDateForInput(dateCreatedRaw);
    const dateFinished = formatDateForInput(dateFinishedRaw);

    Swal.fire({
        title: 'Edit Ticket',
        html: `
            <div class="edit-swal" style="display:flex; flex-direction:column; gap:6px;">
                <input id="swal-rowId" type="hidden" value="${rowId}">
                <label for="swal-ticketId">Ticket ID</label>
                <input id="swal-ticketId" class="swal2-input" style="font-size: 0.85em; padding: 5px;" placeholder="Ticket ID" value="${ticketId}">
                <label for="swal-description">Description</label>
                <input id="swal-description" class="swal2-input" style="font-size: 0.85em; padding: 5px;" placeholder="Description" value="${description}">
                <label for="swal-assignee">Assignee</label>
                <select id="swal-assignee" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                    <option value="sir Jay" ${assignee === 'sir Jay' ? 'selected' : ''}>Sir Jay</option>
                    <option value="ma'am Kerima" ${assignee === 'ma\'am Kerima' ? 'selected' : ''}>Ma'am Kerima</option>
                    <option value="ma'am Arlene" ${assignee === 'ma\'am Arlene' ? 'selected' : ''}>Ma'am Arlene</option>
                </select>
                <label for="swal-status">Status</label>
                <select id="swal-status" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                    <option value="pending" ${status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="in progress" ${status === 'in progress' ? 'selected' : ''}>In Progress</option>
                    <option value="urgent" ${status === 'urgent' ? 'selected' : ''}>Urgent</option>
                </select>

                <label for="swal-dateCreated">Date Created</label>
                <input id="swal-dateCreated" type="date" class="swal2-input" style="font-size: 0.85em; padding: 5px;" value="${dateCreated}">
                <label for="swal-dateFinished">Date Finished</label>
                <input id="swal-dateFinished" type="date" class="swal2-input" style="font-size: 0.85em; padding: 5px;" value="${dateFinished}">
                <label for="swal-url">URL</label>
                <input id="swal-url" class="swal2-input" style="font-size: 0.85em; padding: 5px;" placeholder="URL" value="${url}">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        focusConfirm: false,
        preConfirm: () => {
            return {
                id: document.getElementById('swal-rowId').value,
                ticketId: document.getElementById('swal-ticketId').value,
                description: document.getElementById('swal-description').value,
                assignee: document.getElementById('swal-assignee').value,
                status: document.getElementById('swal-status').value,
                dateCreated: document.getElementById('swal-dateCreated').value,
                dateFinished: document.getElementById('swal-dateFinished').value,
                url: document.getElementById('swal-url').value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const ticketNum = result.value.ticketId;

            fetch('./endpoints/edit_ticket.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result.value)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const msg = document.querySelector('.success-message');
                    msg.innerHTML = `<i class="fas fa-check-circle checkmark"></i> Ticket <strong>${ticketNum}</strong> successfully updated!`;
                    msg.style.display = 'block';
                    setTimeout(() => {
                        msg.style.display = 'none';
                        location.reload();
                    }, 6000);
                } else {
                    Swal.fire('Error', 'Update failed.', 'error');
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Request failed.', 'error');
            });
        }
    });
}

function pullRequest(element) {
    const row = element.closest('tr');
    const rowId = row.id;
    const ticketNum = row.querySelector('td:nth-child(2)').textContent.trim();
    const status = row.querySelector('td:nth-child(5) span').textContent.trim().toLowerCase(); // Get the status from the table

    if (status !== 'completed') {
        Swal.fire({
            icon: 'info',
            title: 'Invalid Status',
            text: `Pull request cannot be created because the status of Ticket ${ticketNum} is not yet sCompleted.`,
            confirmButtonColor: '#6c757d'
        });
        return; 
    }

    fetch('./endpoints/check_pull_request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jira_ticket_id: rowId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            // Pull request already exists
            Swal.fire({
                icon: 'info',
                title: 'Pull Request Exists',
                text: `A pull request already exists for ticket ${ticketNum}.`,
                confirmButtonColor: '#6c757d'
            });
        } else {
            Swal.fire({
                title: 'Create Pull Request?',
                html: `
                    <div class="edit-swal" style="display:flex; flex-direction:column; gap:6px;">
                        <label for="swal-url">A pull request for ticket ${ticketNum} will be created.</label>
                        <input id="swal-url" class="swal2-input" style="font-size: 0.85em; padding: 5px;" placeholder="Pull Request URL">
                    </div>
                `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#38c172',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, create it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = document.getElementById('swal-url').value.trim(); 

                    if (!url) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'URL is required',
                            text: 'Please provide a URL for the pull request.',
                            confirmButtonColor: '#6c757d'
                        });
                        return;
                    }
                    fetch('./endpoints/add_pull_request.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jira_ticket_id: rowId,
                            reviewer_1: '0',
                            reviewer_2: '0',
                            reviewer_3: '0',
                            status: 'Under Review',
                            url: url
                        })
                    })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            const msg = document.querySelector('.success-message');
                            msg.innerHTML = `<i class="fas fa-check-circle checkmark"></i> Pull Request for ticket <strong>${ticketNum}</strong> created!`;
                            msg.style.display = 'block';
                            setTimeout(() => {
                                msg.style.display = 'none';
                            }, 6000);
                        } else {
                            Swal.fire('Error', 'Failed to create pull request.', 'error');
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Request failed.', 'error');
                    });
                }
            });
        }
    })
    .catch(() => {
        Swal.fire('Error', 'Could not check for existing pull request.', 'error');
    });
}

function deleteTicket(element) {
    const row = element.closest('tr');
    const rowId = row.id;
    const ticketId = row.querySelector('td:nth-child(2)').textContent.trim();

    Swal.fire({
        title: 'Are you sure?',
        text: 'This ticket will be permanently deleted.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e3342f',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            fetch('./endpoints/delete_ticket.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: rowId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const msg = document.querySelector('.success-message');
                    msg.innerHTML = `<i class="fas fa-check-circle checkmark"></i> Ticket <strong>${ticketId}</strong> successfully deleted!`;
                    msg.style.display = 'block';
                    setTimeout(() => {
                        msg.style.display = 'none';
                        location.reload();
                    }, 6000);
                } else {
                    Swal.fire('Error', 'Failed to delete the ticket.', 'error');
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Request failed.', 'error');
            });
        }
    });
}

function editPullRequest(element) {
    const row = element.closest('tr');
    const rowId = row.id;
    const ticketId = row.querySelector('td:nth-child(2)').textContent.trim();
    const status = row.querySelector('td:nth-child(6)').textContent.trim().toLowerCase();
    const dateCreatedRaw = row.querySelector('td:nth-child(7)').textContent.trim();
    const url = row.querySelector('td:nth-child(8) a').getAttribute('href');

    const reviewer1Status = row.querySelector('td:nth-child(3) .reviewer-status').classList.contains('approved') ? '1' : '0';
    const reviewer2Status = row.querySelector('td:nth-child(4) .reviewer-status').classList.contains('approved') ? '1' : '0';
    const reviewer3Status = row.querySelector('td:nth-child(5) .reviewer-status').classList.contains('approved') ? '1' : '0';

    function formatDateForInput(dateStr) {
        if (dateStr === '-' || !dateStr) return '';
        const parts = new Date(dateStr);
        const yyyy = parts.getFullYear();
        const mm = String(parts.getMonth() + 1).padStart(2, '0');
        const dd = String(parts.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    const dateCreated = formatDateForInput(dateCreatedRaw);

    let newStatus = status;
    if (reviewer1Status === '1' && reviewer2Status === '1' && reviewer3Status === '1') {
        newStatus = 'For Merging';
    } else {
        newStatus = 'Under Review';
    }

    Swal.fire({
        title: 'Edit Pull Request',
        html: `
            <div class="edit-swal" style="display:flex; flex-direction:column; gap:6px;">
                <input id="swal-rowId" type="hidden" value="${rowId}">
                <label for="swal-ticketId">Ticket ID</label>
                <input id="swal-ticketId" class="swal2-input" style="font-size: 0.85em; padding: 5px;" placeholder="Ticket ID" value="${ticketId}">
                <label for="swal-reviewer1">Sir Jay</label>
                <select id="swal-reviewer1" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                    <option value="1" ${reviewer1Status === '1' ? 'selected' : ''}>Approved</option>
                    <option value="0" ${reviewer1Status === '0' ? 'selected' : ''}>Not Approved</option>
                </select>
                <label for="swal-reviewer2">Ma'am Kerima</label>
                <select id="swal-reviewer2" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                    <option value="1" ${reviewer2Status === '1' ? 'selected' : ''}>Approved</option>
                    <option value="0" ${reviewer2Status === '0' ? 'selected' : ''}>Not Approved</option>
                </select>
                <label for="swal-reviewer3">Ma'am Arlene</label>
                <select id="swal-reviewer3" class="swal2-input" style="font-size: 0.85em; padding: 5px;">
                    <option value="1" ${reviewer3Status === '1' ? 'selected' : ''}>Approved</option>
                    <option value="0" ${reviewer3Status === '0' ? 'selected' : ''}>Not Approved</option>
                </select>
                <label for="swal-url">URL</label>
                <input id="swal-url" class="swal2-input" style="font-size: 0.85em; padding: 5px;" placeholder="URL" value="${url}">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        focusConfirm: false,
        preConfirm: () => {
            return {
                id: document.getElementById('swal-rowId').value,
                ticketId: document.getElementById('swal-ticketId').value,
                reviewer1: document.getElementById('swal-reviewer1').value,
                reviewer2: document.getElementById('swal-reviewer2').value,
                reviewer3: document.getElementById('swal-reviewer3').value,
                status: newStatus, // Use the updated status
                url: document.getElementById('swal-url').value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const ticketNum = result.value.ticketId;

            fetch('./endpoints/edit_pull_request.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result.value)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const msg = document.querySelector('.success-message');
                    msg.innerHTML = `<i class="fas fa-check-circle checkmark"></i> Pull Request for ticket <strong>${ticketNum}</strong> successfully updated!`;
                    msg.style.display = 'block';
                    setTimeout(() => {
                        msg.style.display = 'none';
                        location.reload();
                    }, 6000);
                } else {
                    Swal.fire('Error', 'Update failed.', 'error');
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Request failed.', 'error');
            });
        }
    });
}

function deletePullRequest(element) {
    const row = element.closest('tr');
    const rowId = row.id;
    const ticketId = row.querySelector('td:nth-child(2)').textContent.trim();

    Swal.fire({
        title: 'Are you sure?',
        text: 'This PR will be permanently deleted.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e3342f',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            fetch('./endpoints/delete_pr.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: rowId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const msg = document.querySelector('.success-message');
                    msg.innerHTML = `<i class="fas fa-check-circle checkmark"></i> Ticket <strong>${ticketId}</strong> successfully deleted!`;
                    msg.style.display = 'block';
                    setTimeout(() => {
                        msg.style.display = 'none';
                        location.reload();
                    }, 6000);
                } else {
                    Swal.fire('Error', 'Failed to delete the ticket.', 'error');
                }
            })
            .catch(() => {
                Swal.fire('Error', 'Request failed.', 'error');
            });
        }
    });
}
