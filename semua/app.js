document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const cartIcon = document.querySelector('.cart-icon');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartContent = document.querySelector('.cart-content');
    const cartTotal = document.querySelector('.cart-total');
    const cartCount = document.querySelector('.cart-count');
    const clearCartBtn = document.querySelector('.clear-cart');
    const checkoutBtn = document.querySelector('.checkout');
    const productsContainer = document.querySelector('.products');
    const productModal = document.querySelector('.product-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    const paginationContainer = document.querySelector('.pagination');
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.footer-link');
    const whatsappForm = document.getElementById('whatsappForm');
    const pages = document.querySelectorAll('.page');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Cart array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Pagination variables
    const productsPerPage = 9;
    let currentPage = 1;

    // Setup products
    const products = [
        {
            id: 1,
            title: 'Klenzo Deterjen Laundry Non Parfum Haji dan Umroh 5 Liter',
            price: 60000,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2025/4/12/1244efbe-e4e2-4cca-9bc0-a45982695d08.jpg',
            description: 'Klenzo Deterjen Laundry Non Parfum hadir sebagai sabun cair khusus yang dirancang untuk kebutuhan ibadah dengan formula yang sederhana, efektif dan sesuai dengan aturan syariat'
        },
        {
            id: 2,
            title: 'Alkholisi Plain Detergent Sabun Cair Haji dan Umroh 250 ml',
            price: 6000,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2025/3/16/795831af-4242-4603-a51f-568ce3a9a630.jpg',
            description: 'Salah satu produk yang dirancang khusus untuk mendukung kebutuhan ini adalah Alkholisi Plain Detergent sabun cair yang aman dan praktis untuk mencuci pakaian selama perjalanan ibadah.'
        },
        {
            id: 3,
            title: '250 gr Klenzo Eco Enzyme Pupuk Organik',
            price: 6000,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2025/1/13/01a93f21-4b07-4429-a496-151c9e3a76f0.jpg',
            description: 'Eco enzyme adalah cairan serbaguna yang dihasilkan dari fermentasi bahan-bahan organik seperti buah-buahan, sayuran, gula, dan air. Proses ini menghasilkan enzim-enzim alami yang bermanfaat untuk berbagai keperluan, mulai dari pembersihan rumah tangga hingga pengolahan limbah'
        },
        {
            id: 4,
            title: 'Pelembut Pakaian Softener Laundry Sokaraja 5 Liter',
            price: 75000,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2025/1/13/8c386fce-c048-4fb0-adc4-e4f00748e689.jpg',
            description: 'Dalam dunia pencucian pakaian softener atau pelembut pakaian memegang peranan penting untuk menghasilkan pakaian yang lembut wangi dan nyaman saat digunakan. Salah satu produk softener yang cukup populer di Indonesia adalah Softener Laundry Sokaraja.'
        },
        {
            id: 5,
            title: 'Alkholisi Deterjen Bubuk 500 gr untuk Haji dan Umroh',
            price: 8000,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2025/3/1/548efa4d-f839-4d58-b84d-cc4dd656dfa6.jpg',
            description: 'Deterjen ini dirancang khusus tanpa pewangi tambahan menjadikannya pilihan ideal bagi jemaah haji dan umroh yang membutuhkan kebersihan maksimal tanpa mengganggu kekhusyukan ibadah.'
        },
        {
            id: 6,
            title: 'Deterjen Bubuk Sabun Laundry Sokaraja 500 gr',
            price: 6000,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2025/1/10/aa110d74-8110-47db-888b-b3a56a43362f.jpg',
            description: 'Untuk mendapatkan hasil cucian yang bersih dan wangi, Anda membutuhkan sabun laundry yang berkualitas. Salah satu pilihan yang layak dipertimbangkan adalah sabun laundry Sokaraja deterjen bubuk 500 gr dengan busa sedang dan wangi.'
        },
        {
            id: 7,
            title: 'Bibit Parfum Jeruk Nipis Lime Sun*light untuk Sabun Cuci Piring 1 kg',
            price: 275000,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2025/1/7/870f1c38-edb9-4f4e-a906-33f62fae80af.jpg',
            description: 'Bibit parfum jeruk nipis /lime dapat menjadi salah satu alternatif untuk menambahkan aroma segar dan menyegarkan pada sabun cuci piring. Dengan manfaat antibakteri dan daya tarik aroma yang dimiliki, bibit parfum ini dapat menjadi nilai tambah bagi produk sabun cuci piring Anda.'
        },
        {
            id: 8,
            title: 'Parfum Body Sugar Daddy 30 ml',
            price: 14500,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/12/4/68219dcf-aa70-4e14-8584-b1463c861a47.jpg',
            description: 'Salah satu parfum yang sedang populer saat ini adalah Sugar Daddy. Parfum ini memiliki sensasi wangi manis yang cocok untuk digunakan dalam berbagai aktivitas, baik outdoor maupun indoor.'
        },
        {
            id: 9,
            title: 'Sokaraja Deterjen Laundry 1 liter',
            price: 145000,
            image: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/12/25/611842f8-6ad5-406b-8fcb-7de6ed8ac4a6.jpg.webp?ect=4g',
            description: 'Salah satu produk deterjen yang dapat menjadi solusi adalah Sokaraja Deterjen Laundry. Sokaraja Deterjen Laundry adalah sabun cair serbaguna yang dikhususkan untuk memenuhi kebutuhan mencuci pakaian.'
        },
        {
            id: 10,
            title: 'Klenzo Sabun Cair Serbaguna Eco Enzyme 1 Liter',
            price: 24500,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/12/25/9a1c90b6-13cc-436e-99b4-04d3736523f3.jpg',
            description: 'Klenzo Sabun Eco Enzyme adalah sabun cair serbaguna yang terbuat dari bahan-bahan alami dan eco enzyme. Eco enzyme sendiri merupakan hasil fermentasi dari buah-buahan dan gula yang memiliki banyak manfaat, seperti sebagai desinfektan alami dan pupuk organik.'
        },
        {
            id: 11,
            title: 'Klenzo Eco Enzyme Biang Pembersih Dan Penyubur Tanaman',
            price: 275000,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/12/25/a079c51a-6324-43bc-af62-26478e370b34.jpg',
            description: 'Klenzo Eco Enzyme adalah produk cairan biang yang terbuat dari bahan-bahan alami dan ramah lingkungan. Produk ini memiliki banyak kegunaan di rumah, mulai dari membersihkan hingga menjadi pupuk organik.'
        },
        {
            id: 12,
            title: 'Parfum  Body Chibi Enok Botol Kaca Spray 30 ml',
            price: 14500,
            image: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/12/7/95ae6ff1-a68c-44e3-ae97-e733cf5bff15.jpg',
            description: 'Parfum Chibi Enok adalah pilihan yang sempurna bagi Anda yang mencari wangi feminim dan manis yang cocok untuk berbagai aktivitas, baik indoor maupun outdoor. Dengan ukuran botol kaca spray 30 ml, parfum ini mudah dibawa dan diaplikasikan kapan saja.'
        }
    ];

    // Format price to Rupiah
    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.amount, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        cartContent.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="cart-item-info">
                        <h4>${product.title}</h4>
                        <p class="price">${formatRupiah(product.price)}</p>
                        <div class="cart-item-amount">
                            <i class="fas fa-minus decrease"></i>
                            <span>${item.amount}</span>
                            <i class="fas fa-plus increase"></i>
                        </div>
                    </div>
                    <i class="fas fa-trash cart-item-remove"></i>
                </div>
            `;
        }).join('');

        // Update cart total
        const total = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product.price * item.amount);
        }, 0);
        cartTotal.textContent = formatRupiah(total);

        // Save cart to localStorage
        saveCart();
    }

    // Add to cart
    function addToCart(id) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.amount += 1;
        } else {
            cart.push({ id, amount: 1 });
        }

        updateCart();
    }

    // Remove from cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    // Increase item amount
    function increaseAmount(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.amount += 1;
            updateCart();
        }
    }

    // Decrease item amount
    function decreaseAmount(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            if (item.amount > 1) {
                item.amount -= 1;
            } else {
                removeFromCart(id);
            }
            updateCart();
        }
    }

    // Clear cart
    function clearCart() {
        cart = [];
        updateCart();
    }

    // Show product details
    function showProductDetails(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            modalBody.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div>
                    <h2>${product.title}</h2>
                    <p class="price">${formatRupiah(product.price)}</p>
                    <p>${product.description}</p>
                    <button class="add-to-cart-modal" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productModal.style.display = 'flex';
        }
    }

    // Updated Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda kosong!');
        return;
    }

    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;

    if (!name || !phone || !address) {
        alert('Harap lengkapi semua informasi pelanggan!');
        return;
    }

    const phoneNumber = '6285773009666';
    let message = `Halo, saya ${name} ingin memesan:\n\n`;

    // Add customer info
    message += `*Informasi Pelanggan*\n`;
    message += `Nama: ${name}\n`;
    message += `WhatsApp: ${phone}\n`;
    message += `Alamat: ${address}\n\n`;

    // Add order items
    message += `*Pesanan*\n`;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        message += `➤ ${product.title}\n`;
        message += `   ${item.amount} x ${formatRupiah(product.price)}\n`;
    });

    // Add total
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product.price * item.amount);
    }, 0);
    
    message += `\n*Total Pesanan:* ${formatRupiah(total)}`;
    message += `\n\nTerima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    // Optional: Clear cart after checkout
    // clearCart();
}
    // Render products for current page
    function renderProducts() {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = products.slice(startIndex, endIndex);

        productsContainer.innerHTML = productsToShow.map(product => `
            <div class="product" data-id="${product.id}">
                <img src="${product.image}" alt="${product.title}">
                <h2 class="product-title">${product.title}</h2>
                <p class="price">${formatRupiah(product.price)}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `).join('');

        renderPagination();
    }

    // Render pagination buttons
    function renderPagination() {
        const totalPages = Math.ceil(products.length / productsPerPage);
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
            });
            paginationContainer.appendChild(button);
        }
    }

    // Search functionality
    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        const matchedProducts = products.filter(product => {
            return (
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        });
        
        displaySearchResults(matchedProducts);
    }

    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No products found</div>';
            searchResults.classList.add('active');
            return;
        }
        
        results.forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.dataset.id = product.id;
            resultItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="search-result-info">
                    <h4>${product.title}</h4>
                    <p class="price">${formatRupiah(product.price)}</p>
                </div>
            `;
            searchResults.appendChild(resultItem);
        });
        
        searchResults.classList.add('active');
    }

    // Switch between pages
    function switchPage(pageName) {
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.classList.contains(`${pageName}-page`)) {
                page.classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });

        // Close mobile menu when switching pages
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }

        window.scrollTo(0, 0);
    }

    // WhatsApp Form Submission
    function handleWhatsAppSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const whatsappNumber = '6285773009666';
        const text = `Halo, saya ${name}%0A%0A${message}%0A%0AEmail: ${email || 'Tidak diisi'}%0ANomor HP: ${phone}`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Optional: Reset form after submission
        whatsappForm.reset();
    }

    // Event Listeners
    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    cartIcon.addEventListener('click', () => {
        cartOverlay.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', checkout);

    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(link.dataset.page);
        });
    });

    // Footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(link.dataset.page);
        });
    });

    // WhatsApp form submission
    whatsappForm.addEventListener('submit', handleWhatsAppSubmit);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) {
            performSearch(searchInput.value);
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });

    searchResults.addEventListener('click', (e) => {
        const resultItem = e.target.closest('.search-result-item');
        if (resultItem) {
            const productId = parseInt(resultItem.dataset.id);
            showProductDetails(productId);
            searchInput.value = '';
            searchResults.classList.remove('active');
        }
    });

    // Product interactions
    productsContainer.addEventListener('click', (e) => {
        // Product title click
        if (e.target.classList.contains('product-title')) {
            const productId = parseInt(e.target.closest('.product').dataset.id);
            showProductDetails(productId);
        }

        // Add to cart button click
        if (e.target.classList.contains('add-to-cart')) {
           const productId = parseInt(e.target.closest('.product').dataset.id);
            addToCart(productId);
        }
    });

    // Cart interactions
    cartContent.addEventListener('click', (e) => {
        // Remove item
        if (e.target.classList.contains('cart-item-remove')) {
            const productId = parseInt(e.target.closest('.cart-item').dataset.id);
            removeFromCart(productId);
        }

        // Increase amount
        if (e.target.classList.contains('increase')) {
            const productId = parseInt(e.target.closest('.cart-item').dataset.id);
            increaseAmount(productId);
        }

        // Decrease amount
        if (e.target.classList.contains('decrease')) {
            const productId = parseInt(e.target.closest('.cart-item').dataset.id);
            decreaseAmount(productId);
        }
    });

    // Modal interactions
    modalBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-modal')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
            productModal.style.display = 'none';
        }
    });

    // Initialize
    switchPage('home');
    renderProducts();
    updateCart();
});
