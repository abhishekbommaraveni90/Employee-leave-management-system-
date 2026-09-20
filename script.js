let leaveRequests = [];

const leaveForm = document.getElementById("leaveForm");
const leaveTableBody = document.getElementById("leaveTableBody");

leaveForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const employeeName =
        document.getElementById("employeeName").value.trim();

    const employeeId =
        document.getElementById("employeeId").value.trim();

    const leaveType =
        document.getElementById("leaveType").value;

    const fromDate =
        document.getElementById("fromDate").value;

    const toDate =
        document.getElementById("toDate").value;

    const reason =
        document.getElementById("reason").value.trim();

    if (new Date(toDate) < new Date(fromDate)) {
        alert("To Date cannot be earlier than From Date.");
        return;
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);

    const timeDifference = end - start;

    const days =
        Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;

    const request = {
        employeeName,
        employeeId,
        leaveType,
        fromDate,
        toDate,
        days,
        reason,
        status: "Pending"
    };

    leaveRequests.push(request);

    leaveForm.reset();

    displayRequests();
    updateDashboard();

    alert("Leave request submitted successfully!");
});

function displayRequests() {

    leaveTableBody.innerHTML = "";

    leaveRequests.forEach((request, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${request.employeeName}</td>

            <td>${request.employeeId}</td>

            <td>${request.leaveType}</td>

            <td>${formatDate(request.fromDate)}</td>

            <td>${formatDate(request.toDate)}</td>

            <td>${request.days}</td>

            <td>${request.reason}</td>

            <td>
                <span class="status ${request.status.toLowerCase()}">
                    ${request.status}
                </span>
            </td>

            <td>
                ${
                    request.status === "Pending"
                    ?
                    `
                    <button class="action-btn approve-btn"
                        onclick="approveLeave(${index})">
                        Approve
                    </button>

                    <button class="action-btn reject-btn"
                        onclick="rejectLeave(${index})">
                        Reject
                    </button>
                    `
                    :
                    "-"
                }
            </td>
        `;

        leaveTableBody.appendChild(row);
    });
}

function approveLeave(index) {

    leaveRequests[index].status = "Approved";

    displayRequests();
    updateDashboard();
}

function rejectLeave(index) {

    leaveRequests[index].status = "Rejected";

    displayRequests();
    updateDashboard();
}

function updateDashboard() {

    const employees =
        new Set(leaveRequests.map(request => request.employeeId));

    const pending =
        leaveRequests.filter(request =>
            request.status === "Pending").length;

    const approved =
        leaveRequests.filter(request =>
            request.status === "Approved").length;

    const rejected =
        leaveRequests.filter(request =>
            request.status === "Rejected").length;

    document.getElementById("totalEmployees").textContent =
        employees.size;

    document.getElementById("pendingRequests").textContent =
        pending;

    document.getElementById("approvedLeaves").textContent =
        approved;

    document.getElementById("rejectedLeaves").textContent =
        rejected;
}

function formatDate(date) {

    const dateObject = new Date(date);

    return dateObject.toLocaleDateString("en-IN");
}
