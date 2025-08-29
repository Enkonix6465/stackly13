document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-dark");
  const mobileMenuBtn = document.getElementById("mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const profileToggle = document.getElementById('profile-dropdown-toggle');
  const profileDropdown = document.getElementById('profile-dropdown');
  const logoutBtn = document.getElementById('logout-btn');
  const profilePic = document.getElementById("profile-pic");
  const profileInitials = document.getElementById("profile-initials");

  

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
// js/header.js
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-toggle"); // hamburger
  const navMenu = document.querySelector(".nav-links"); // main nav UL
  const profileNameEl = document.getElementById("profileName");
  const profileDropdownToggle = document.getElementById("profile-dropdown-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");
  const profilePic = document.getElementById("profile-pic");
  const profileInitials = document.getElementById("profile-initials");
  const logoutBtn = document.getElementById("logout-btn");

  // Helpers
  const isMobile = () => window.innerWidth <= 768;
  const closeAllDropdowns = () => {
    document.querySelectorAll(".nav-links .dropdown").forEach(li => li.classList.remove("open"));
  };
  const closeMobileMenu = () => {
    if (!navMenu) return;
    navMenu.classList.remove("mobile-active");
    closeAllDropdowns();
  };

  // ----- MOBILE MENU TOGGLE -----
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const opened = navMenu.classList.toggle("mobile-active");
      if (!opened) closeAllDropdowns();
    });
  }

  // ----- DROPDOWN (mobile: click toggle; desktop: handled by CSS hover) -----
  document.querySelectorAll(".nav-links .dropdown > a").forEach(link => {
    link.addEventListener("click", (e) => {
      if (!isMobile()) return; // desktop uses hover
      e.preventDefault();
      e.stopPropagation();

      const li = link.parentElement;
      const willOpen = !li.classList.contains("open");
      // close others first
      closeAllDropdowns();
      // toggle this one
      if (willOpen) li.classList.add("open"); else li.classList.remove("open");
    });
  });

  // ----- CLOSE ON OUTSIDE TAP (mobile) -----
  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    const clickedInsideNav = navMenu && navMenu.contains(e.target);
    const clickedHamburger = mobileMenuBtn && mobileMenuBtn.contains(e.target);
    if (!clickedInsideNav && !clickedHamburger) {
      closeMobileMenu();
    }
  });

  // ----- CLOSE MENU AFTER ANY NAV LINK CLICK (mobile) -----
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      if (isMobile()) closeMobileMenu();
    });
  });

  // ----- RESET ON RESIZE TO DESKTOP -----
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      closeAllDropdowns();
      if (navMenu) navMenu.classList.remove("mobile-active");
    }
  });

  // ----- LOAD USER (unchanged) -----
  const user = JSON.parse(sessionStorage.getItem("loggedInUser")) 
            || JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    if (!user.profilePic || user.profilePic === "") {
      if (profilePic) profilePic.style.display = "none";
      const initials = `${(user.firstName || user.username?.[0] || "").charAt(0).toUpperCase()}${(user.lastName || "").charAt(0).toUpperCase()}`;
      if (profileInitials) {
        profileInitials.textContent = initials;
        Object.assign(profileInitials.style, {
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "40px", height: "40px", background: "#fff8dc", color: "#ff8c42",
          borderRadius: "50%", fontWeight: "bold"
        });
      }
    } else {
      if (profilePic) { profilePic.src = user.profilePic; profilePic.style.display = "block"; }
      if (profileInitials) profileInitials.style.display = "none";
    }
    if (profileNameEl) {
      profileNameEl.textContent = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || "User";
    }
  } else {
    if (profileNameEl) profileNameEl.textContent = "Guest";
  }



  // ----- LOGOUT -----
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});
