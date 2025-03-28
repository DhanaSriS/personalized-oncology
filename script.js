document.getElementById("patientForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form data
  const formData = {
    diet: document.getElementById("diet").value,
    exercise: document.getElementById("exercise").value,
    smoking: document.getElementById("smoking").value,
    alcohol: document.getElementById("alcohol").value,
    weight: parseFloat(document.getElementById("weight").value),
    cancerType: document.getElementById("cancerType").value,
    stage: document.getElementById("stage").value,
    severity: document.getElementById("severity").value,
  };

  // Send data to backend
  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display results
      const treatmentsList = document.getElementById("treatments");
      const drugsList = document.getElementById("drugs");

      // Clear previous results
      treatmentsList.innerHTML = "";
      drugsList.innerHTML = "";

      // Display predicted treatments
      data.treatments.forEach((treatment) => {
        const li = document.createElement("li");
        li.textContent = treatment;
        treatmentsList.appendChild(li);
      });

      // Display recommended drugs and dosages
      data.drugs.forEach((drug) => {
        const li = document.createElement("li");
        li.textContent = `${drug.name}: ${drug.dosage.toFixed(2)} mg`;
        drugsList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
