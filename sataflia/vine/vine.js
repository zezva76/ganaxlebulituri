const likeButtons = document.querySelectorAll('.like-button');
const dislikeButtons = document.querySelectorAll('.dislike-button');
const likeCounts = document.querySelectorAll('.like-count');
const dislikeCounts = document.querySelectorAll('.dislike-count');   


likeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        likeCounts[index].textContent = `Likes: ${parseInt(likeCounts[index].textContent.split(': ')[1]) + 1}`;
    });
});

dislikeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        dislikeCounts[index].textContent = `Dislikes: ${parseInt(dislikeCounts[index].textContent.split(': ')[1]) + 1}`;
    });
});



