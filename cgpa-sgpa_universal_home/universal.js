const urlParams = new URLSearchParams(window.location.search);
const regulation = urlParams.get("reg");

if (regulation) {
  document.getElementById("regulationText").textContent =
    "Regulation: " + regulation;
} else {
  document.getElementById("regulationText").style.display = "none";
}

document.getElementById("regulationText").textContent =
  "Regulation: " +
  regulation +
  " (Enter the semester credits up to the semester you are targeting.)";

const creditsContainer = document.getElementById("creditsContainer");
const currentSemSelect = document.getElementById("currentSem");
const targetSemSelect = document.getElementById("targetSem");
const resultDiv = document.getElementById("result");

// Create credit inputs
for (let i = 1; i <= 8; i++) {
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Semester " + i + " Credits";
  input.id = "credit" + i;
  input.step = "0.1";
  creditsContainer.appendChild(input);

  let option1 = new Option("Semester " + i, i);
  let option2 = new Option("Semester " + i, i);

  currentSemSelect.add(option1);
  targetSemSelect.add(option2);
}

document.getElementById("calculateBtn").addEventListener("click", calculate);

function calculate() {
  const currentSem = parseInt(currentSemSelect.value);
  const targetSem = parseInt(targetSemSelect.value);
  const currentCGPA = parseFloat(document.getElementById("currentCGPA").value);
  const targetCGPA = parseFloat(document.getElementById("targetCGPA").value);

  if (!currentSem || !targetSem || !currentCGPA || !targetCGPA) {
    showError("Please fill all required fields.");
    return;
  }

  if (targetSem <= currentSem) {
    showError("Target semester must be greater than current semester.");
    return;
  }

  let completedCredits = 0;
  let totalCredits = 0;

  for (let i = 1; i <= currentSem; i++) {
    completedCredits +=
      parseFloat(document.getElementById("credit" + i).value) || 0;
  }

  for (let i = 1; i <= targetSem; i++) {
    totalCredits +=
      parseFloat(document.getElementById("credit" + i).value) || 0;
  }

  const remainingCredits = totalCredits - completedCredits;

  if (remainingCredits <= 0) {
    showError("Invalid credit configuration.");
    return;
  }

  const currentPoints = currentCGPA * completedCredits;
  const targetPoints = targetCGPA * totalCredits;
  const requiredSGPA = (targetPoints - currentPoints) / remainingCredits;

  showSuccess("Required Average SGPA: " + requiredSGPA.toFixed(2));
}

function showError(message) {
  resultDiv.className = "result error";
  resultDiv.textContent = message;
}

function showSuccess(message) {
  resultDiv.className = "result success";
  resultDiv.textContent = message;
}
