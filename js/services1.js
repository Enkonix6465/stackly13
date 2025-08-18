// Animate sections on scroll
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .slide-in-up");

  function checkPosition() {
    const triggerBottom = window.innerHeight * 0.85;
    elements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", checkPosition);
  checkPosition();
});
