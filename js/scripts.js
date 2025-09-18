// js/scripts.js
window.addEventListener('DOMContentLoaded', () => {
    
    // This script now ONLY handles dynamic post generation for the homepage.
    const postContainer = document.getElementById('post-list-container');
    
    if (postContainer && typeof posts !== 'undefined') {
        const latestPosts = posts.slice(0, 3);
        
        let allPostsHTML = '';
        
        latestPosts.forEach(post => {
            let tagsHTML = '';
            if (post.tags && post.tags.length > 0) {
                post.tags.forEach(tag => {
                    tagsHTML += `<span class="badge bg-secondary me-1">${tag}</span>`;
                });
            }

            const postHTML = `
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
            allPostsHTML += postHTML;
        });

        postContainer.innerHTML = allPostsHTML;
    }
});