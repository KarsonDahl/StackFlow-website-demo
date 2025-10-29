let postCount = 0;
const feed = document.getElementById("feed");
const loadingIndicator = document.getElementById("loading"); // Use the loading element
const MAX_FEED_POSTS = 2; // max posts in feed

// --- Function to create a single post from received data ---
function createPost(postData) {
    postCount++;
    const post = document.createElement("div");
    post.className = "post";

    post.textContent = `Post #${postCount}: ${postData.content}`;

    const link = document.createElement("a");
    link.href = postData.link;
    link.textContent = "Read more";
    post.appendChild(link);
    feed.appendChild(post);

    // Remove oldest posts if exceeding MAX_FEED_POSTS
    while (feed.children.length > MAX_FEED_POSTS) {
        feed.removeChild(feed.firstChild);
    }
}

// --- Function to fetch data from API ---
async function fetchPosts(numberOfPosts) {
    const apiUrl = `http://localhost:3000/api/posts?limit=${numberOfPosts}`;

    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch(apiUrl);
        const postsData = await response.json();

        postsData.forEach((numberOfPosts) => {
            createPost(numberOfPosts);
        });

    } catch (error) {
        console.error("Could not fetch posts:", error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// --- Initial load ---
fetchPosts(2);

// --- Infinite scroll only ---
feed.addEventListener("scroll", () => {
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 80) {
        if (loadingIndicator.style.display === "none") fetchPosts(1);
    }

});
feed.addEventListener("scroll", () => {
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight + 100) {
        if (loadingIndicator.style.display === "none") fetchPosts(1);
    }

});