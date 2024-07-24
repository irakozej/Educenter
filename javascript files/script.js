document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const profileForm = document.getElementById("profileForm");
  const resourceList = document.getElementById("resourceList");
  const assignmentList = document.getElementById("assignmentList");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simulate login process
      if (username === "user" && password === "pass") {
        alert("Login successful!");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid username or password.");
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
    const resources = [
      { id: 1, title: "Resource 1", link: "#" },
      { id: 2, title: "Resource 2", link: "#" },
      { id: 3, title: "Resource 3", link: "#" },
    ];

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

  if (assignmentList) {
    // Dummy data for assignments
    const assignments = [
      { id: 1, title: "Assignment 1", dueDate: "2024-08-01" },
      { id: 2, title: "Assignment 2", dueDate: "2024-08-15" },
      { id: 3, title: "Assignment 3", dueDate: "2024-09-01" },
    ];

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

  function editResource(id) {
    // Simulate resource editing
    alert(`Editing resource with id ${id}`);
    // Additional logic for editing can be added here
  }

  function deleteResource(id) {
    // Simulate resource deletion
    alert(`Deleting resource with id ${id}`);
    // Additional logic for deleting can be added here
  }

  function editAssignment(id) {
    // Simulate assignment editing
    alert(`Editing assignment with id ${id}`);
    // Additional logic for editing can be added here
  }

  function deleteAssignment(id) {
    // Simulate assignment deletion
    alert(`Deleting assignment with id ${id}`);
    // Additional logic for deleting can be added here
  }
});
