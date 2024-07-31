document.addEventListener("DOMContentLoaded", () => {
  let assignments = [];
  let selectedAnswers = {};

  const assignmentList = document.getElementById("assignmentList");
  const submitAssignmentButton = document.getElementById("submitAssignment");
  const scoreDisplay = document.getElementById("scoreDisplay");

  // Fetch assignments from ass.html
  function fetchAssignments() {
    fetch("../html files/admin pannel/assignments.html")
      .then((response) => response.text())
      .then((data) => {
        // Assuming the assignments are provided in a script tag within ass.html
        // with JSON data or another appropriate format
        const assignmentData = extractAssignmentsFromHTML(data);
        assignments = assignmentData;
        loadAssignments();
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }

  function extractAssignmentsFromHTML(htmlData) {
    // Extract assignments JSON from HTML data (example method)
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlData, "text/html");
    const scriptContent = doc.querySelector("#assignmentsData").textContent;
    return JSON.parse(scriptContent);
  }

  // Load assignments
  function loadAssignments() {
    assignments.forEach((assignment) => {
      const assignmentDiv = document.createElement("div");
      assignmentDiv.classList.add("assignment");

      const questionText = document.createElement("p");
      questionText.classList.add("question");
      questionText.textContent = assignment.question;
      assignmentDiv.appendChild(questionText);

      const optionsDiv = document.createElement("div");
      optionsDiv.classList.add("options");
      assignment.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.classList.add("option");
        label.innerHTML = `
          <input type="radio" name="question${assignment.id}" value="${index}" class="option-input">
          ${option}
        `;
        optionsDiv.appendChild(label);
      });

      assignmentDiv.appendChild(optionsDiv);
      assignmentList.appendChild(assignmentDiv);
    });
  }

  // Handle option selection
  function handleOptionSelection(event) {
    const questionId = event.target.name.replace("question", "");
    const selectedOption = parseInt(event.target.value);
    selectedAnswers[questionId] = selectedOption;

    // Reset option backgrounds
    const options = document.querySelectorAll(
      `input[name="question${questionId}"]`
    );
    options.forEach((option) => {
      option.parentElement.classList.remove("selected-answer");
    });

    // Highlight selected option
    event.target.parentElement.classList.add("selected-answer");
  }

  // Calculate and display score
  function calculateScore() {
    let score = 0;
    assignments.forEach((assignment) => {
      const selectedOption = selectedAnswers[assignment.id];
      if (selectedOption === assignment.correctAnswer) {
        score++;
        document
          .querySelector(
            `input[name="question${assignment.id}"][value="${selectedOption}"]`
          )
          .parentElement.classList.add("correct-answer");
      } else if (selectedOption !== undefined) {
        document
          .querySelector(
            `input[name="question${assignment.id}"][value="${selectedOption}"]`
          )
          .parentElement.classList.add("incorrect-answer");
        document
          .querySelector(
            `input[name="question${assignment.id}"][value="${assignment.correctAnswer}"]`
          )
          .parentElement.classList.add("correct-answer");
      }
    });
    const percentage = ((score / assignments.length) * 100).toFixed(2);
    scoreDisplay.innerHTML = `Your score: ${score} / ${assignments.length} (${percentage}%)`;
  }

  // Event listener for radio buttons
  document.addEventListener("change", (event) => {
    if (event.target.classList.contains("option-input")) {
      handleOptionSelection(event);
    }
  });

  // Event listener for submit button
  submitAssignmentButton.addEventListener("click", calculateScore);

  // Initial load
  fetchAssignments();
});

// Footer behavior on scroll
let lastScrollTop = 0;
const footer = document.querySelector("footer");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    footer.style.transform = "translateY(100%)"; // Hide footer on scroll down
  } else {
    footer.style.transform = "translateY(0)"; // Show footer on scroll up
  }
  lastScrollTop = scrollTop;
});
