// მობილური მენიუს ღილაკი
const menuBar = document.getElementById('menu-bar');
const navbar = document.querySelector('header .navbar');

menuBar.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// ლაიქ და დისლაიქ ღილაკების ფუნქციონალობა
const vineElements = document.querySelectorAll('.vine');

vineElements.forEach(vine => {
  const likeBtn = vine.querySelector('.like-button');
  const dislikeBtn = vine.querySelector('.dislike-button');
  const likeCount = vine.querySelector('.like-count');
  const dislikeCount = vine.querySelector('.dislike-count');

  likeBtn.addEventListener('click', () => {
    // თუ დისლაიქზე არ არის დაწკაპუნებული
    if (!likeBtn.disabled && !dislikeBtn.disabled) {
      let count = parseInt(likeCount.textContent) || 0;
      likeCount.textContent = count + 1;

      // პარალიზება ორივე ღილაკის
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
    }
  });

  dislikeBtn.addEventListener('click', () => {
    if (!dislikeBtn.disabled && !likeBtn.disabled) {
      let count = parseInt(dislikeCount.textContent) || 0;
      dislikeCount.textContent = count + 1;

      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
    }
  });
});
