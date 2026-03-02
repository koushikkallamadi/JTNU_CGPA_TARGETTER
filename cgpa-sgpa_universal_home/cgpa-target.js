const continueBtn = document.getElementById("continueBtn");
const regulationSelect = document.getElementById("regulationSelect");

continueBtn.addEventListener("click", function () {
  const reg = regulationSelect.value;

  if (!reg) {
    alert("Please select a regulation");
    return;
  }

  // If R23 → open R23 optimized predictor page
  if (reg === "R23") {
    window.location.href = "../CGPA_targeter-SGPA/index.html";
  }

  // All other regulations → open universal predictor
  else {
    window.location.href = "universal-predictor.html?reg=" + reg;
  }
});
