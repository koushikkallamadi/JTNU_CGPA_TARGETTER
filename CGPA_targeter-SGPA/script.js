const credits = {
  1: 19.5,
  2: 20.5,
  3: 19,
  4: 22,
  5: 23,
  6: 23,
  7: 21,
  8: 12,
};

const semesterNames = {
  1: "1-1",
  2: "1-2",
  3: "2-1",
  4: "2-2",
  5: "3-1",
  6: "3-2",
  7: "4-1",
  8: "4-2",
};

const currentSemSelect = document.getElementById("currentSem");
const targetSemSelect = document.getElementById("targetSem");
const resultBox = document.getElementById("result");

function initializeSemesters() {
  for (let i = 1; i <= 7; i++) {
    let option = new Option(semesterNames[i], i);
    currentSemSelect.add(option);
  }
  updateTargetOptions();
}

function updateTargetOptions() {
  targetSemSelect.innerHTML = "";
  let currentSem = parseInt(currentSemSelect.value);

  for (let i = currentSem + 1; i <= 8; i++) {
    let option = new Option(semesterNames[i], i);
    targetSemSelect.add(option);
  }
}
function calculateRequiredSGPA() {
  const currentSem = parseInt(currentSemSelect.value);
  const targetSem = parseInt(targetSemSelect.value);
  const currentCGPA = parseFloat(document.getElementById("currentCGPA").value);
  const targetCGPA = parseFloat(document.getElementById("targetCGPA").value);

  // ✅ Validation
  if (
    isNaN(currentCGPA) ||
    isNaN(targetCGPA) ||
    currentCGPA < 0 ||
    targetCGPA < 0 ||
    currentCGPA > 10 ||
    targetCGPA > 10
  ) {
    showResult("CGPA must be between 0 and 10.", true);
    return;
  }

  let completedCredits = 0;
  let totalCredits = 0;

  for (let i = 1; i <= currentSem; i++) completedCredits += credits[i];

  for (let i = 1; i <= targetSem; i++) totalCredits += credits[i];

  const remainingCredits = totalCredits - completedCredits;

  if (remainingCredits <= 0) {
    showResult("Invalid semester selection.", true);
    return;
  }

  const currentPoints = currentCGPA * completedCredits;
  const targetPoints = targetCGPA * totalCredits;

  const requiredSGPA = (targetPoints - currentPoints) / remainingCredits;

  if (requiredSGPA > 10) {
    showResult("❌ Impossible Target", "Above 10", "hard");
  } else if (requiredSGPA <= 8) {
    showResult("🟢 Easily Achievable", requiredSGPA.toFixed(2), "easy");
  } else if (requiredSGPA <= 9.5) {
    showResult("🟡 Hard but Possible", requiredSGPA.toFixed(2), "medium");
  } else {
    showResult("🔴 Extremely Difficult", requiredSGPA.toFixed(2), "hard");
  }
}

function showResult(title, value, level) {
  resultBox.style.display = "block";

  resultBox.innerHTML = `
    <div class="result-title">${title}</div>
    <div class="result-value">Required SGPA: ${value}</div>
  `;

  resultBox.classList.remove("easy", "medium", "hard");
  resultBox.classList.add(level);
}

document
  .getElementById("calculateBtn")
  .addEventListener("click", calculateRequiredSGPA);

currentSemSelect.addEventListener("change", updateTargetOptions);

initializeSemesters();
