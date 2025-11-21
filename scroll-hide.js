const likeBtn = document.querySelector('.likebutton');
const commentBtn = document.querySelector('.commentbutton');
const container = document.querySelector('.container');
const commentSection = document.querySelector('.commentsection');
const commentCloseBtn = document.querySelector('.comment-close');
const commentPostBtn = document.querySelector('.comment-post');
const commentTextarea = commentSection.querySelector('.textarea');


feed.addEventListener('scroll', () => {
    likeBtn.classList.add('hide-on-scroll');
    commentBtn.classList.add('hide-on-scroll');

    likeBtn.classList.remove('active'); // reset color
    commentSection.classList.remove('active');

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        likeBtn.classList.remove('hide-on-scroll');
        commentBtn.classList.remove('hide-on-scroll');
    }, 50);
});

let scrollTimeout;

// turn like button red on click
likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('active');
});

commentBtn.addEventListener('click', () => {
    commentSection.classList.toggle('active');
});


commentCloseBtn.addEventListener('click', () => {
    commentSection.classList.remove('active');
});

commentPostBtn.addEventListener('click', () => {
    // You can also handle posting logic here (like sending comment to API)
    commentTextarea.value = '';

    commentSection.classList.remove
        ('active'); // close the comment box

});