document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const profileForm = document.getElementById("profileForm");
  const resourceList = document.getElementById("resourceList");
  const assignmentList = document.getElementById("assignmentList");
  const studentAssignmentList = document.getElementById(
    "studentAssignmentList"
  );
  const addResourceBtn = document.getElementById("addResourceBtn");
  const addAssignmentBtn = document.getElementById("addAssignmentBtn");

  // Load assignments from local storage
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simulate login process
      if (username === "admin@educenter.com" && password === "Admin@123") {
        alert("Welcome admin! Login successfully!");
        window.location.href = "../html files/admin-dashboard.html";
      } else {
        alert(username + " welcome to the student dashboard");
        window.location.href = "../html files/index.html";
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
    // Dummy data for resources
    let resources = [
      { id: 1, title: "Resource 1", link: "#" },
      { id: 2, title: "Resource 2", link: "#" },
      { id: 3, title: "Resource 3", link: "#" },
    ];

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
        renderResources();
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
          renderResources();
        }
      }
    }

    function deleteResource(id) {
      resources = resources.filter((r) => r.id !== id);
      renderResources();
    }
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
      if (title && dueDate) {
        const id = assignments.length
          ? assignments[assignments.length - 1].id + 1
          : 1;
        assignments.push({ id, title, dueDate });
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
        const li = document.createElement("li");
        li.textContent = `${assignment.title} - Due: ${assignment.dueDate}`;
        studentAssignmentList.appendChild(li);
      });
    }

    renderStudentAssignments();
  }
});
