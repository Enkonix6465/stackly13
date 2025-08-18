document.addEventListener("DOMContentLoaded", () => {
  const forgotForm = document.getElementById("forgotForm");
  const forgotMsg = document.getElementById("forgotMsg");

  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("forgotUsername").value.trim().toLowerCase();
    const newPassword = document.getElementById("forgotPassword").value.trim();

    if (!username || !newPassword) {
      forgotMsg.style.display = "block";
      forgotMsg.style.color = "red";
      forgotMsg.textContent = "Please fill in both fields.";
      return;
    }

    // Load users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by username/email (case-insensitive)
    const userIndex = users.findIndex(u => u.username.trim().toLowerCase() === username);

    if (userIndex !== -1) {
      // Update password in localStorage
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      // Update session if this user is currently logged in
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (loggedInUser && loggedInUser.username.trim().toLowerCase() === username) {
        loggedInUser.password = newPassword;
        sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      }

      forgotMsg.style.display = "block";
      forgotMsg.style.color = "green";
      forgotMsg.textContent = "Password updated successfully! You can now login.";
      forgotForm.reset();
    } else {
      forgotMsg.style.display = "block";
      forgotMsg.style.color = "red";
      forgotMsg.textContent = "User not found!";
    }
  });
});
