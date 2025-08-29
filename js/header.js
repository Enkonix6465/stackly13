document.addEventListener("DOMContentLoaded", () => {
  const profileToggle = document.getElementById("profile-dropdown-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");
  const logoutBtn = document.getElementById("logout-btn");

  // Toggle dropdown
  profileToggle.addEventListener("click", () => {
    profileDropdown.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.remove("active");
    }
  });

  // Logout action
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "../login.html";
  });
});
