let postCount = 0;
let currentPostOffset = 0;
const feed = document.getElementById("feed");
const loadingIndicator = document.getElementById("loading"); // Use the loading element

// --- New: Function to create a single post from received data ---
function createPost(postData) {
    postCount++;
    const post = document.createElement("div");
    post.className = "post";

    // Use the content and link from the fetched data
    post.textContent = `Post #${postCount}: ${postData.content}`;

    const link = document.createElement("a");
    link.href = postData.link; // <--- The Link from the Database!
    link.textContent = "Read more";
    post.appendChild(link);
    feed.appendChild(post);
}

// --- New: Function to fetch data from the API/Database ---
async function fetchPosts(numberOfPosts) {
    // 1. Construct the URL with the offset (where to start) and limit (how many to get)
    // NOTE: Replace '3000' with your backend server's PORT if different
    const apiUrl = `http://localhost:3000/api/posts?limit=${numberOfPosts}&offset=${currentPostOffset}`;

    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch(apiUrl);
        // ... (check for response.ok) ...
        const postsData = await response.json();

        postsData.forEach(post => {
            createPost(post);
        });

        // 2. IMPORTANT: Update the offset after successfully loading new posts
        currentPostOffset += postsData.length;

    } catch (error) {
        console.error("Could not fetch posts:", error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// --- Initial Load (5 posts) ---
fetchPosts(1);

// --- Infinite Scroll Logic Updated ---
window.addEventListener("scroll", () => {
    // Check if the user is 100 pixels from the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        // To prevent multiple rapid calls while data is loading:
        if (loadingIndicator.style.display === 'none') {
            fetchPosts(3);
        }
    }
});

// Update the initial call for the 'Create Post' button
document.querySelector('.start-button').onclick = () => {
    // Ideally, a post created here would also be sent to the database
    // For simplicity, we'll just fetch one new post
    fetchPosts(1);
};