
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('newsletter-form');
    const successMsg = document.getElementById('newsletter-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();              // stop page reload
      form.style.display = 'none';     // hide form
      successMsg.style.display = 'block'; // show thank you message
    });
  });
