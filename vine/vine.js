
/*
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


*/








const likeButtons = document.querySelectorAll('.like-button');
const dislikeButtons = document.querySelectorAll('.dislike-button');
const likeCounts = document.querySelectorAll('.like-count');
const dislikeCounts = document.querySelectorAll('.dislike-count');

likeButtons.forEach((likeBtn, index) => {
    const dislikeBtn = dislikeButtons[index];

    likeBtn.addEventListener('click', () => {
        // თუ უკვე დააჭირა რომელიმე ღილაკს, აღარ გააგრძელოს
        if (likeBtn.classList.contains('voted') || dislikeBtn.classList.contains('voted')) return;

        // გაზარდე ლაიქების რაოდენობა
        const currentLikes = parseInt(likeCounts[index].textContent.split(': ')[1]);
        likeCounts[index].textContent = `Likes: ${currentLikes + 1}`;

        // მონიშნე როგორც აქტიური
        likeBtn.classList.add('voted');
        dislikeBtn.classList.add('voted');

        // სურვილისამებრ შეგიძლია ღილაკებიც გათიშო:
        // likeBtn.disabled = true;
        // dislikeBtn.disabled = true;
    });
});

dislikeButtons.forEach((dislikeBtn, index) => {
    const likeBtn = likeButtons[index];

    dislikeBtn.addEventListener('click', () => {
        if (dislikeBtn.classList.contains('voted') || likeBtn.classList.contains('voted')) return;

        // გაზარდე დისლაიქების რაოდენობა
        const currentDislikes = parseInt(dislikeCounts[index].textContent.split(': ')[1]);
        dislikeCounts[index].textContent = `Dislikes: ${currentDislikes + 1}`;

        // მონიშნე როგორც აქტიური
        dislikeBtn.classList.add('voted');
        likeBtn.classList.add('voted');

        // სურვილისამებრ შეგიძლია ღილაკებიც გათიშო:
        // dislikeBtn.disabled = true;
        // likeBtn.disabled = true;
    });
});
