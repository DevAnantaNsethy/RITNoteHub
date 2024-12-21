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
// Branch names
const branches = ["Computer Science", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Electronics", "Information Technology"];

// Year names
const years = ["Year 1", "Year 2", "Year 3"];

// Subject names (organized by branch, year, and semester)
const subjects = {
  "Computer Science": {
    "Year 1": {
      "Semester 1": ["Mathematics", "Physics", "Programming", "Data Structures", "English"],
      "Semester 2": ["Algorithms", "Database Systems", "Operating Systems", "Networks", "Discrete Math"]
    },
    "Year 2": {
      "Semester 3": ["Machine Learning", "Software Engineering", "Compiler Design", "Web Development", "Mobile Computing"],
      "Semester 4": ["Artificial Intelligence", "Cloud Computing", "Cybersecurity", "Big Data", "Blockchain"]
    },
    "Year 3": {
      "Semester 5": ["Advanced Algorithms", "Distributed Systems", "IoT", "Robotics", "Human-Computer Interaction"],
      "Semester 6": ["Final Year Project", "Research Methods", "Internship", "Electives", "Capstone Presentation"]
    }
  },
  "Mechanical Engineering": {
    "Year 1": {
      "Semester 1": ["Thermodynamics", "Engineering Drawing", "Material Science", "Mathematics", "English"],
      "Semester 2": ["Fluid Mechanics", "Mechanics of Materials", "Engineering Mechanics", "Physics", "Programming Basics"]
    }
  }
};

const searchBar = document.getElementById("searchBar");
const searchResults = document.getElementById("searchResults");

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase().trim();
  searchResults.innerHTML = ""; // Clear previous results

  // Hide search results if the query is empty
  if (!query) {
    searchResults.style.display = "none";
    return;
  }

  // Array to store the results
  const results = [];

  // Search in branches
  branches.forEach((branch) => {
    if (branch.toLowerCase().includes(query)) {
      results.push({ type: "Branch", name: branch, id: branch.toLowerCase().replace(/\s+/g, '-') });
    }
  });

  // Search in years
  years.forEach((year) => {
    if (year.toLowerCase().includes(query)) {
      results.push({ type: "Year", name: year, id: year.toLowerCase().replace(/\s+/g, '-') });
    }
  });

  // Search in subjects (nested search)
  for (const branch in subjects) {
    for (const year in subjects[branch]) {
      for (const semester in subjects[branch][year]) {
        subjects[branch][year][semester].forEach((subject) => {
          if (subject.toLowerCase().includes(query)) {
            results.push({
              type: "Subject",
              name: `${branch} > ${year} > ${semester} > ${subject}`,
              id: `${branch}-${year}-${semester}-${subject.toLowerCase().replace(/\s+/g, '-')}`,
            });
          }
        });
      }
    }
  }

  // Display the results
  if (results.length > 0) {
    results.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result-item";
      resultItem.textContent = `[${result.type}] ${result.name}`;
      
      // Make the result item clickable
      resultItem.onclick = () => {
        navigateToElement(result.id);
      };

      searchResults.appendChild(resultItem);
    });
  } else {
    // Show "No results" if no matches found
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = "No results found.";
    searchResults.appendChild(noResults);
  }

  // Show the search results container
  searchResults.style.display = "block";
});

// Function to navigate to the element
function navigateToElement(id) {
  const element = document.getElementById(id);

  if (element) {
    // Scroll to the corresponding element smoothly
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    alert("Element not found.");
  }
}
