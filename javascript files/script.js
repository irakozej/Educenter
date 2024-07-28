document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const profileForm = document.getElementById("profileForm");
  const resourceList = document.getElementById("resourceList");
  const assignmentList = document.getElementById("assignmentList");
  const studentAssignmentList = document.getElementById(
    "studentAssignmentList"
  );
  const readingsList = document.getElementById("readingsList");
  const addResourceBtn = document.getElementById("addResourceBtn");
  const addAssignmentBtn = document.getElementById("addAssignmentBtn");

  // Load assignments from local storage
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  let resources = JSON.parse(localStorage.getItem("resources")) || [];

  function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }

  function saveResources() {
    localStorage.setItem("resources", JSON.stringify(resources));
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simulate login process
      if (username === "admin@educenter.com" && password === "Admin@123") {
        alert("Welcome Admin!");
        window.location.href =
          "../html files/admin pannel/admin-dashboard.html";
      } else {
        alert("welcome " + username);
        window.location.href = "../html files/student pannel/index.html";
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simulate signup process
      alert(`User ${username} signed up successfully!`);
      window.location.href = "login.html";
    });
  }

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;

      // Simulate profile update
      alert(`Profile updated for ${username} with email ${email}`);
    });
  }

  if (resourceList) {
    function renderResources() {
      resourceList.innerHTML = "";
      resources.forEach((resource) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = resource.link;
        a.textContent = resource.title;
        li.appendChild(a);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editResource(resource.id);
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteResource(resource.id);
        li.appendChild(deleteBtn);

        resourceList.appendChild(li);
      });
    }

    renderResources();

    function addResource() {
      const title = prompt("Enter resource title:");
      const link = prompt("Enter resource link:");
      if (title && link) {
        const id = resources.length
          ? resources[resources.length - 1].id + 1
          : 1;
        resources.push({ id, title, link });
        saveResources();
        renderResources();
        renderReadings();
      }
    }

    addResourceBtn.addEventListener("click", addResource);

    function editResource(id) {
      const resource = resources.find((r) => r.id === id);
      if (resource) {
        const newTitle = prompt("Enter new title:", resource.title);
        const newLink = prompt("Enter new link:", resource.link);
        if (newTitle && newLink) {
          resource.title = newTitle;
          resource.link = newLink;
          saveResources();
          renderResources();
          renderReadings();
        }
      }
    }

    function deleteResource(id) {
      resources = resources.filter((r) => r.id !== id);
      saveResources();
      renderResources();
      renderReadings();
    }
  }

  if (readingsList) {
    function renderReadings() {
      readingsList.innerHTML = "";
      resources.forEach((resource) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = resource.link;
        a.textContent = resource.title;
        li.appendChild(a);

        readingsList.appendChild(li);
      });
    }

    renderReadings();
  }

  if (assignmentList) {
    function renderAssignments() {
      assignmentList.innerHTML = "";
      assignments.forEach((assignment) => {
        const li = document.createElement("li");
        li.textContent = `${assignment.title} - Due: ${assignment.dueDate}`;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editAssignment(assignment.id);
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteAssignment(assignment.id);
        li.appendChild(deleteBtn);

        assignmentList.appendChild(li);
      });
    }

    renderAssignments();

    function addAssignment() {
      const title = prompt("Enter assignment title:");
      const dueDate = prompt("Enter due date (YYYY-MM-DD):");
      const questions = [];

      let addMoreQuestions = true;
      while (addMoreQuestions) {
        const questionText = prompt("Enter the question:");
        const correctAnswer = prompt("Enter the correct answer:");
        const wrongAnswer1 = prompt("Enter the first wrong answer:");
        const wrongAnswer2 = prompt("Enter the second wrong answer:");
        const wrongAnswer3 = prompt("Enter the third wrong answer:");

        questions.push({
          questionText,
          correctAnswer,
          wrongAnswers: [wrongAnswer1, wrongAnswer2, wrongAnswer3],
        });

        addMoreQuestions = confirm("Do you want to add another question?");
      }

      if (title && dueDate) {
        const id = assignments.length
          ? assignments[assignments.length - 1].id + 1
          : 1;
        assignments.push({ id, title, dueDate, questions });
        saveAssignments();
        renderAssignments();
      }
    }

    addAssignmentBtn.addEventListener("click", addAssignment);

    function editAssignment(id) {
      const assignment = assignments.find((a) => a.id === id);
      if (assignment) {
        const newTitle = prompt("Enter new title:", assignment.title);
        const newDueDate = prompt(
          "Enter new due date (YYYY-MM-DD):",
          assignment.dueDate
        );
        if (newTitle && newDueDate) {
          assignment.title = newTitle;
          assignment.dueDate = newDueDate;
          saveAssignments();
          renderAssignments();
        }
      }
    }

    function deleteAssignment(id) {
      assignments = assignments.filter((a) => a.id !== id);
      saveAssignments();
      renderAssignments();
    }
  }

  if (studentAssignmentList) {
    function renderStudentAssignments() {
      studentAssignmentList.innerHTML = "";
      assignments.forEach((assignment) => {
        const assignmentItem = document.createElement("li");
        assignmentItem.innerHTML = `<h3>${assignment.title} - Due: ${assignment.dueDate}</h3>`;

        assignment.questions.forEach((question, questionIndex) => {
          const questionElement = document.createElement("div");
          questionElement.innerHTML = `<p>${question.questionText}</p>`;

          const answers = [...question.wrongAnswers, question.correctAnswer];
          answers.sort(() => Math.random() - 0.5);

          answers.forEach((answer, answerIndex) => {
            const answerButton = document.createElement("button");
            answerButton.textContent = answer;
            answerButton.onclick = () => {
              if (answer === question.correctAnswer) {
                answerButton.style.backgroundColor = "green";
              } else {
                answerButton.style.backgroundColor = "red";
              }
            };
            questionElement.appendChild(answerButton);
          });

          assignmentItem.appendChild(questionElement);
        });

        studentAssignmentList.appendChild(assignmentItem);
      });
    }

    renderStudentAssignments();
  }
});
