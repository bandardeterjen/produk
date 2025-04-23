document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Check if we're on a post page
    if (window.location.pathname.includes('post.html')) {
        loadSinglePost();
    } else {
        loadBlogPosts();
    }
});

// Create URL slug from title
function createSlug(title) {
    return title.toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special chars
        .replace(/\s+/g, '-')    // Replace spaces with -
        .substring(0, 50);       // Limit length
}

// Load all blog posts with pagination
async function loadBlogPosts() {
    try {
        const response = await fetch('blog_data.json');
        const allPosts = await response.json();
        
        // Pagination variables
        const postsPerPage = 3;
        const currentPage = getPageNumber();
        const totalPages = Math.ceil(allPosts.length / postsPerPage);
        const paginatedPosts = allPosts.slice(
            (currentPage - 1) * postsPerPage,
            currentPage * postsPerPage
        );
        
        // Display posts
        const grid = document.getElementById('blog-grid');
        if (grid) {
            grid.innerHTML = paginatedPosts.map(post => {
                const postDate = new Date(post.date);
                const year = postDate.getFullYear();
                const month = String(postDate.getMonth() + 1).padStart(2, '0');
                const day = String(postDate.getDate()).padStart(2, '0');
                const slug = createSlug(post.title);
                const postUrl = `${year}/${month}/${day}/${slug}.html`;
                
                return `
                    <article class="blog-card">
                        <div class="card-image">
                            <a href="${postUrl}">
                                <img src="${post.image}" alt="${post.title}">
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="post-meta">
                                <span>By ${post.author}</span>
                                <span>•</span>
                                <span>${postDate.toLocaleDateString()}</span>
                            </div>
                            <h2><a href="${postUrl}">${post.title}</a></h2>
                            <p>${post.excerpt}</p>
                            <a href="${postUrl}" class="read-more">Read More →</a>
                        </div>
                    </article>
                `;
            }).join('');
        }
        
        // Display pagination if needed
        const pagination = document.getElementById('pagination');
        if (pagination && totalPages > 1) {
            let paginationHTML = '';
            
            // Previous button
            if (currentPage > 1) {
                paginationHTML += `<a href="index.html?page=${currentPage - 1}">← Previous</a>`;
            }
            
            // Page numbers (max 3)
            const startPage = Math.max(1, currentPage - 1);
            const endPage = Math.min(totalPages, currentPage + 1);
            
            for (let i = startPage; i <= endPage; i++) {
                paginationHTML += `<a href="index.html?page=${i}" ${i === currentPage ? 'class="active"' : ''}>${i}</a>`;
            }
            
            // Next button
            if (currentPage < totalPages) {
                paginationHTML += `<a href="index.html?page=${currentPage + 1}">Next →</a>`;
            }
            
            pagination.innerHTML = paginationHTML;
        }
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Get current page number from URL
function getPageNumber() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    return Math.max(1, page);
}

// Load single post
async function loadSinglePost() {
    // Extract slug from URL (format: /2025/04/20/slug.html)
    const pathParts = window.location.pathname.split('/');
    const slug = pathParts[pathParts.length - 1].replace('.html', '');
    
    try {
        const response = await fetch('blog_data.json');
        const posts = await response.json();
        
        // Find post by matching slug
        const post = posts.find(p => createSlug(p.title) === slug);
        
        if (post) {
            const postDate = new Date(post.date);
            const year = postDate.getFullYear();
            const month = String(postDate.getMonth() + 1).padStart(2, '0');
            const day = String(postDate.getDate()).padStart(2, '0');
            
            // Verify URL matches expected format
            const expectedPath = `/${year}/${month}/${day}/${slug}.html`;
            if (!window.location.pathname.endsWith(expectedPath)) {
                // Redirect to correct URL if needed
                window.history.replaceState(null, null, expectedPath);
            }
            
            // Display post
            document.title = `${post.title} | My Blog`;
            document.getElementById('post-content').innerHTML = `
                <h1>${post.title}</h1>
                <div class="post-meta">
                    <span>By ${post.author}</span>
                    <span>•</span>
                    <span>${postDate.toLocaleDateString()}</span>
                </div>
                <div class="featured-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-body">
                    ${post.description}
                </div>
                <a href="index.html" class="back-link">← Back to Blog</a>
            `;
        } else {
            // Post not found, redirect to home
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error loading post:', error);
    }
}

// Handle GitHub Pages 404 redirect for pretty URLs
function handlePageRedirect() {
    // Only needed if using pretty URLs on GitHub Pages
    const segmentCount = window.location.pathname.split('/').filter(Boolean).length;
    
    // If path looks like a post URL but we got redirected to 404.html
    if (segmentCount === 4 && window.location.pathname.includes('.html')) {
        // Try to load the post directly
        loadSinglePost();
    }
}

// Initialize
handlePageRedirect();
