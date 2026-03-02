const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

convertBtn.addEventListener("click", function () {
  const cgpa = parseFloat(document.getElementById("cgpaInput").value);

  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    result.style.display = "block";
    result.textContent = "Please enter valid CGPA (0 – 10).";
    return;
  }

  const percentage = (cgpa - 0.5) * 10;

  result.style.display = "block";
  result.textContent = "Equivalent Percentage: " + percentage.toFixed(2) + "%";
});
