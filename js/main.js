document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("dark-mode-toggle");
  const mobileMenuBtn = document.getElementById("mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const profileToggle = document.getElementById('profile-dropdown-toggle');
  const profileDropdown = document.getElementById('profile-dropdown');
  const logoutBtn = document.getElementById('logout-btn');
  const profilePic = document.getElementById("profile-pic");
  const profileInitials = document.getElementById("profile-initials");

  // ----- DARK MODE -----
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    }
  });

  // ----- MOBILE MENU -----
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("mobile-active");
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("mobile-active");
      navMenu.style.display = "flex"; // ensure flex in desktop
    } else {
      navMenu.style.display = ""; // let CSS handle mobile
    }
  });

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
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('loggedInUser'); // clear login
    window.location.href = 'login.html'; // redirect to login
  });

  // ----- LOAD LOGGED-IN USER PROFILE -----
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (!user) {
    // If not logged in, redirect
    window.location.href = "login.html";
    return;
  }

  if (!user.profilePic || user.profilePic === "") {
    profilePic.style.display = "none";

    // Show initials
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
});
