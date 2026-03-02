const gradePoints = {
  "A+": 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0,
  Ab: 0,
};

const subjectsContainer = document.getElementById("subjectsContainer");
const result = document.getElementById("result");
const addSubjectBtn = document.getElementById("addSubjectBtn");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

function addSubject() {
  const div = document.createElement("div");
  div.classList.add("subject-row");

  div.innerHTML = `
  <select>
    <option value="">Select Grade</option>
    <option value="A+">A+ (Outstanding)</option>
    <option value="A">A (Excellent)</option>
    <option value="B">B (Very Good)</option>
    <option value="C">C (Good)</option>
    <option value="D">D (Fair)</option>
    <option value="E">E (Satisfactory)</option>
    <option value="F">F (Fail)</option>
    <option value="Ab">Ab (Absent)</option>
  </select>
  <input type="number" placeholder="Credits" min="0">
  <button class="remove-btn">X</button>
`;

  div.querySelector(".remove-btn").addEventListener("click", () => {
    div.remove();
  });

  subjectsContainer.appendChild(div);
}

addSubject();
addSubject();

addSubjectBtn.addEventListener("click", addSubject);

calculateBtn.addEventListener("click", () => {
  let totalCredits = 0;
  let totalPoints = 0;

  const rows = document.querySelectorAll(".subject-row");

  rows.forEach((row) => {
    const grade = row.querySelector("select").value;
    const credits = parseFloat(row.querySelector("input").value);

    if (grade && !isNaN(credits) && credits > 0) {
      totalCredits += credits;
      totalPoints += credits * gradePoints[grade];
    }
  });

  if (totalCredits === 0) {
    result.style.display = "block";
    result.textContent = "Please enter valid grades and credits.";
    return;
  }

  const sgpa = totalPoints / totalCredits;

  result.style.display = "block";
  result.textContent = "Your Semester SGPA: " + sgpa.toFixed(2);
});

resetBtn.addEventListener("click", () => {
  subjectsContainer.innerHTML = "";
  result.style.display = "none";
  addSubject();
  addSubject();
});
