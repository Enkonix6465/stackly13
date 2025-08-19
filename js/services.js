
    const cards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));

    
  const promoContent = document.querySelector('.promo-content');
  const promoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('animate');
        promoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if(promoContent){
    promoObserver.observe(promoContent);
  }
  

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