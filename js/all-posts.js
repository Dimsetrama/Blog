// js/all-posts.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the HTML elements we'll be working with
    const postContainer = document.getElementById('post-list-container');
    const searchInput = document.getElementById('searchInput');

    // --- Function to Render Posts ---
    // This function takes an array of posts and displays them on the page.
    // We'll use it to show all posts initially, and then to show filtered results.
    const renderPosts = (postsToRender) => {
        // If there are no posts to render, show a message
        if (postsToRender.length === 0) {
            postContainer.innerHTML = '<p>No posts found.</p>';
            return;
        }

        let allPostsHTML = '';
        postsToRender.forEach(post => {
            let tagsHTML = '';
            if (post.tags && post.tags.length > 0) {
                post.tags.forEach(tag => {
                    tagsHTML += `<span class="badge bg-secondary me-1">${tag}</span>`;
                });
            }

            allPostsHTML += `
                <div class="post-preview">
                    <a href="${post.link}">
                        <h2 class="post-title">${post.title}</h2>
                        <h3 class="post-subtitle">${post.subtitle}</h3>
                    </a>
                    <p class="post-meta">
                        Posted by <a href="#!">${post.author}</a> on ${post.date}
                    </p>
                    <div class="tags-container mt-2">${tagsHTML}</div>
                </div>
                <hr class="my-4" />
            `;
        });
        postContainer.innerHTML = allPostsHTML;
    };

    // --- Search Logic ---
    // Listen for any keypress in the search input field
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        // Filter the main 'posts' array (from posts.js)
        const filteredPosts = posts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(searchTerm);
            const subtitleMatch = post.subtitle.toLowerCase().includes(searchTerm);
            // Check if any tag in the post's tags array matches the search term
            const tagsMatch = post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            return titleMatch || subtitleMatch || tagsMatch;
        });

        // Re-render the page with only the filtered posts
        renderPosts(filteredPosts);
    });

    // --- Initial Render ---
    // When the page first loads, render all the posts from posts.js
    renderPosts(posts);
});