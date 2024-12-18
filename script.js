const questionPaperData = {
    "cse": {
        "1st": [
            { sno: 1, subject: "Mathematics-I", code: "MTH101", link: "#" },
            { sno: 2, subject: "Programming", code: "CSE101", link: "#" }
        ],
        "2nd": [
            { sno: 1, subject: "Data Structures", code: "CSE201", link: "#" }
        ]
    },
    "ece": {
        "1st": [
            { sno: 1, subject: "Basic Electronics", code: "ECE101", link: "#" }
        ]
    }
};

// Update year dropdown based on branch
function updateYearOptions() {
    const branch = document.getElementById("branch-select").value;
    const yearSelect = document.getElementById("year-select");
    yearSelect.innerHTML = '<option value="">--Choose Year--</option>';

    if (branch && questionPaperData[branch]) {
        Object.keys(questionPaperData[branch]).forEach(year => {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year + " Year";
            yearSelect.appendChild(option);
        });
    }
    document.getElementById("question-table-container").style.display = "none";
}

// Show the table of question papers
function showQuestionTable() {
    const branch = document.getElementById("branch-select").value;
    const year = document.getElementById("year-select").value;
    const tableBody = document.getElementById("table-body");

    tableBody.innerHTML = "";

    if (branch && year && questionPaperData[branch][year]) {
        questionPaperData[branch][year].forEach((item, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.subject}</td>
                    <td>${item.code}</td>
                    <td><a href="${item.link}" target="_blank">Download</a></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
        document.getElementById("question-table-container").style.display = "block";
    } else {
        document.getElementById("question-table-container").style.display = "none";
    }
}
