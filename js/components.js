// js/components.js
document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadComponent = (componentPath, placeholderId) => {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            fetch(componentPath)
                .then(response => response.text())
                .then(data => {
                    placeholder.innerHTML = data;
                    
                    // --- PASTE THE ANIMATION LOGIC HERE ---
                    // We only run this code if we've just loaded the navbar
                    if (placeholderId === 'navbar-placeholder') {
                        const mainNav = document.getElementById('mainNav');
                        if (mainNav) {
                            let scrollPos = 0;
                            const headerHeight = mainNav.clientHeight;
                            window.addEventListener('scroll', function() {
                                const currentTop = document.body.getBoundingClientRect().top * -1;
                                if (currentTop < scrollPos) {
                                    // Scrolling Up
                                    if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                                        mainNav.classList.add('is-visible');
                                    } else {
                                        mainNav.classList.remove('is-visible', 'is-fixed');
                                    }
                                } else {
                                    // Scrolling Down
                                    mainNav.classList.remove('is-visible');
                                    if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                                        mainNav.classList.add('is-fixed');
                                    }
                                }
                                scrollPos = currentTop;
                            });
                        }
                    }
                })
                .catch(error => console.error(`Error loading component from ${componentPath}:`, error));
        }
    };

    // Load the navigation and footer
    loadComponent("_nav.html", "navbar-placeholder");
    loadComponent("_footer.html", "footer-placeholder");
});