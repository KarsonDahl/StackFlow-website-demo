// --- 1. Dependencies and Setup ---
const http = require('http');
const url = require('url');
const PORT = 3000; // The port your frontend will connect to

// --- Topic arrays ---
const TOPIC1_VIDEO_DATA = [
    { vidID: 1, vidLink: "https://mock.com/post-01", content: "Topic 1 - Post One" },
    { vidID: 2, vidLink: "https://mock.com/post-02", content: "Topic 1 - Post Two" },
    { vidID: 3, vidLink: "https://mock.com/post-03", content: "Topic 1 - Post Three" },
    { vidID: 4, vidLink: "https://mock.com/post-04", content: "Topic 1 - Post Four" },
    { vidID: 5, vidLink: "https://mock.com/post-05", content: "Topic 1 - Post Five" },
    { vidID: 6, vidLink: "https://mock.com/post-06", content: "Topic 1 - Post Six" },
];

const TOPIC2_VIDEO_DATA = [
    { vidID: 7, vidLink: "https://mock.com/post-07", content: "Topic 2 - Post One" },
    { vidID: 8, vidLink: "https://mock.com/post-08", content: "Topic 2 - Post Two" },
    { vidID: 9, vidLink: "https://mock.com/post-09", content: "Topic 2 - Post Three" },
    { vidID: 10, vidLink: "https://mock.com/post-10", content: "Topic 2 - Post Four" },
    { vidID: 11, vidLink: "https://mock.com/post-11", content: "Topic 2 - Post Five" },
    { vidID: 12, vidLink: "https://mock.com/post-12", content: "Topic 2 - Post Six" },
];

const TOPIC3_VIDEO_DATA = [
    { vidID: 13, vidLink: "https://mock.com/post-13", content: "Topic 3 - Post One" },
    { vidID: 14, vidLink: "https://mock.com/post-14", content: "Topic 3 - Post Two" },
    { vidID: 15, vidLink: "https://mock.com/post-15", content: "Topic 3 - Post Three" },
    { vidID: 16, vidLink: "https://mock.com/post-16", content: "Topic 3 - Post Four" },
    { vidID: 17, vidLink: "https://mock.com/post-17", content: "Topic 3 - Post Five" },
    { vidID: 18, vidLink: "https://mock.com/post-18", content: "Topic 3 - Post Six" },
];

const TOPIC4_VIDEO_DATA = [
    { vidID: 19, vidLink: "https://mock.com/post-19", content: "Topic 4 - Post One" },
    { vidID: 20, vidLink: "https://mock.com/post-20", content: "Topic 4 - Post Two" },
    { vidID: 21, vidLink: "https://mock.com/post-21", content: "Topic 4 - Post Three" },
    { vidID: 22, vidLink: "https://mock.com/post-22", content: "Topic 4 - Post Four" },
    { vidID: 23, vidLink: "https://mock.com/post-23", content: "Topic 4 - Post Five" },
    { vidID: 24, vidLink: "https://mock.com/post-24", content: "Topic 4 - Post Six" },
];

const TOPIC5_VIDEO_DATA = [
    { vidID: 25, vidLink: "https://mock.com/post-25", content: "Topic 5 - Post One" },
    { vidID: 26, vidLink: "https://mock.com/post-26", content: "Topic 5 - Post Two" },
    { vidID: 27, vidLink: "https://mock.com/post-27", content: "Topic 5 - Post Three" },
    { vidID: 28, vidLink: "https://mock.com/post-28", content: "Topic 5 - Post Four" },
    { vidID: 29, vidLink: "https://mock.com/post-29", content: "Topic 5 - Post Five" },
    { vidID: 30, vidLink: "https://mock.com/post-30", content: "Topic 5 - Post Six" },
];

const TOPIC6_VIDEO_DATA = [
    { vidID: 31, vidLink: "https://mock.com/post-31", content: "Topic 6 - Post One" },
    { vidID: 32, vidLink: "https://mock.com/post-32", content: "Topic 6 - Post Two" },
    { vidID: 33, vidLink: "https://mock.com/post-33", content: "Topic 6 - Post Three" },
    { vidID: 34, vidLink: "https://mock.com/post-34", content: "Topic 6 - Post Four" },
    { vidID: 35, vidLink: "https://mock.com/post-35", content: "Topic 6 - Post Five" },
    { vidID: 36, vidLink: "https://mock.com/post-36", content: "Topic 6 - Post Six" },
];

const topics = {
    books: TOPIC1_VIDEO_DATA,
    technology: TOPIC2_VIDEO_DATA,
    videoGames: TOPIC3_VIDEO_DATA,
    art: TOPIC4_VIDEO_DATA,
    cars: TOPIC5_VIDEO_DATA,
    travel: TOPIC6_VIDEO_DATA
};

// --- 3. Server Logic (Request Listener) ---
const server = http.createServer((req, res) => {
    // a. Set CORS Headers (Crucial for frontend running on different port/domain)
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all origins
    res.setHeader('Content-Type', 'application/json');

    // b. Parse the request URL to get the path and query parameters
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    // c. Route the request
    if (path === '/api/posts' && req.method === 'GET') {
        // Parse parameters from the query string
        const topic = query.topic || 'technology'; // default topic
        const data = topics[topic] || [];
        const limit = parseInt(query.limit) || 5;
        const offset = parseInt(query.offset) || 0;

        // Simulate a network/database query delay
        setTimeout(() => {

            // Calculate the mock pagination (Simulating SQL OFFSET/FETCH NEXT)
            const startIndex = offset;
            const endIndex = offset + limit;

            // Slice the mock array to get the requested data
            const data = topics[topic] || [];

            const mockResults = data.slice(startIndex, endIndex);

            // Format the data for the frontend
            const posts = mockResults.map(row => ({
                link: row.vidLink,
                content: row.content
            }));

            // Send the JSON response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(posts));

        }, 500); // 500ms delay

    } else {
        // Handle 404 Not Found for other paths
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

// --- 4. Start the Server ---
server.listen(PORT, () => {
    console.log(`\n🎉 Mock API server running at http://localhost:${PORT}`);
    console.log(`Ready to handle requests from your frontend 'logic.js' file.`);
});
