document.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.getElementById("profile-pic");
  const profileInitials = document.getElementById("profile-initials");
  const profileToggle = document.getElementById("profile-dropdown-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");
  const logoutBtn = document.getElementById("logout-btn");
  const mobileMenuBtn = document.getElementById("mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const darkModeBtn = document.getElementById("dark-mode-toggle");

  // ----- CHECK LOGGED-IN USER -----
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (!user) {
    // Redirect if not logged in
    window.location.href = "login.html";
    return;
  }

  // ----- PROFILE DISPLAY -----
  if (!user.profilePic || user.profilePic === "") {
    profilePic.style.display = "none";

    const initials = `${(user.firstName || user.username[0]).charAt(0).toUpperCase()}${(user.lastName || "").charAt(0).toUpperCase()}`;
    profileInitials.textContent = initials;
    profileInitials.style.display = "flex";
    profileInitials.style.alignItems = "center";
    profileInitials.style.justifyContent = "center";
    profileInitials.style.width = "40px";
    profileInitials.style.height = "40px";
    profileInitials.style.background = "#007bff";
    profileInitials.style.color = "#fff";
    profileInitials.style.borderRadius = "50%";
    profileInitials.style.fontWeight = "bold";
  } else {
    profilePic.src = user.profilePic;
    profilePic.style.display = "block";
    profileInitials.style.display = "none";
  }

  // ----- PROFILE DROPDOWN -----
  profileToggle.addEventListener('click', () => {
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.style.display = 'none';
    }
  });

  // ----- LOGOUT -----
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('loggedInUser');
    window.location.href = '../login.html';
  });

  // ----- MOBILE MENU -----
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("mobile-active");
  });

  // ----- DARK MODE -----
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️";
  }

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      darkModeBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      darkModeBtn.textContent = "🌙";
    }
  });
});
