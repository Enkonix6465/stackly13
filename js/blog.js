// Example: Filter posts by category
const categoryButtons = document.querySelectorAll('.category-btn');
const posts = document.querySelectorAll('.post-card');

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.textContent.toLowerCase();
    posts.forEach(post => {
      if(post.querySelector('h3').textContent.toLowerCase().includes(category)) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  });
});
