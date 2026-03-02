const semesterInputs = document.getElementById("semesterInputs");
const finalResult = document.getElementById("finalResult");
const addSemesterBtn = document.getElementById("addSemesterBtn");

let semesterCount = 0;
const MAX_SEMESTERS = 8;

// Add Semester Function
function addSemester() {
  if (semesterCount >= MAX_SEMESTERS) {
    addSemesterBtn.disabled = true;
    addSemesterBtn.textContent = "Maximum 8 Semesters Added";
    return;
  }

  semesterCount++;

  const div = document.createElement("div");
  div.classList.add("semester");

  div.innerHTML = `
    <span>Semester ${semesterCount}</span>
    <input type="number" step="0.01" min="0" max="10"
      placeholder="SGPA" id="sgpa${semesterCount}">
    <input type="number" step="0.1" min="0"
      placeholder="Credits" id="credit${semesterCount}">
  `;

  semesterInputs.appendChild(div);
}

addSemesterBtn.addEventListener("click", addSemester);

// Add 2 semesters initially
addSemester();
addSemester();

document.getElementById("calculateBtn").addEventListener("click", function () {
  let totalCredits = 0;
  let totalPoints = 0;

  for (let i = 1; i <= semesterCount; i++) {
    const sgpa = parseFloat(document.getElementById("sgpa" + i).value);
    const credit = parseFloat(document.getElementById("credit" + i).value);

    if (!isNaN(sgpa) && !isNaN(credit) && credit > 0) {
      totalCredits += credit;
      totalPoints += sgpa * credit;
    }
  }

  if (totalCredits === 0) {
    finalResult.style.display = "block";
    finalResult.textContent = "Please enter valid SGPA and credits.";
    return;
  }

  const cgpa = totalPoints / totalCredits;

  finalResult.style.display = "block";
  finalResult.textContent = "Your Overall CGPA: " + cgpa.toFixed(2);
});
