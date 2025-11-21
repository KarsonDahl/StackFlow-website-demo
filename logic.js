let postCount = 0;
let offset = 0;
const params = new URLSearchParams(window.location.search);
const topic = params.get("topic") || "travel"; // default topic

const feed = document.getElementById("feed");
const loadingIndicator = document.getElementById("loading"); // Use the loading element
const MAX_FEED_POSTS = 2; // max posts in feed

// --- Function to create a single post from received data ---
function setTopicBackground(topicName) {
    const imageUrl = `images/${topicName}.jpg`; // topic-named image
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100vh";               // ensure full viewport height

    document.body.style.backgroundPosition = "center";
}
setTopicBackground(topic);

function createPost(postData) {
    postCount++;
    const post = document.createElement("div");
    post.className = "post";

    post.textContent = ` ${postData.content}`;
    // if backend changes, this will need to be updated to match the new structure of the data

    const link = document.createElement("a");
    link.href = postData.link;
    link.textContent = "Read more"; // this too
    post.appendChild(link);
    feed.appendChild(post);

    // Remove oldest posts if exceeding MAX_FEED_POSTS
    while (feed.children.length > MAX_FEED_POSTS) {
        feed.removeChild(feed.firstChild);
    }
}
// --- Function to fetch data from API ---
async function fetchPosts(numberOfPosts) {
    const likeBtn = document.querySelector('.likebutton');
    const commentBtn = document.querySelector('.commentbutton');

    likeBtn.classList.remove('active');       // reset red state
    likeBtn.classList.remove('hide-on-scroll'); // make sure it’s visible

    commentBtn.classList.remove('hide-on-scroll');
    const apiUrl = `http://localhost:3000/api/posts?topic=${topic}&limit=${numberOfPosts}&offset=${offset}`;
    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch(apiUrl);
        const { posts, total } = await response.json();

        posts.forEach((post) => createPost(post));
        offset += numberOfPosts;

        if (offset >= total) {  // loop reset
            offset = 0;      // reset for loop
        }

    } catch (error) {
        console.error("Could not fetch posts:", error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}
// --- Initial load ---
fetchPosts(1);

// --- Infinite scroll only ---
feed.addEventListener("scroll", () => {
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 80) {
        if (loadingIndicator.style.display === "none") fetchPosts(1);
    }

});
// Note: Adjusted scroll threshold to 80px for better UX