document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    // Save user data to localStorage (or send to backend)
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful!");
    window.location.href = "../html files/student pannel/index.html";
  });

