document.addEventListener('DOMContentLoaded', function() {
    const CART_STORAGE_KEY = 'novellaCartItems';
    let cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cartModal = document.getElementById('cartModal');

    // ======== 1. CART FUNCTIONS ========

    function updateCartCount() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElements.forEach(el => el.textContent = totalItems);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }

    function renderCartItems() {
        const cartContainer = document.querySelector('#cartModal .cart-items');
        const cartTotalEl = document.getElementById('cartTotal');

        if (!cartContainer || !cartTotalEl) return;

        cartContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Browse our collection to find your next favorite book</p>
                    <a href="books.html" class="btn">Browse Books</a>
                </div>
            `;
            cartTotalEl.textContent = '0.00';
            return;
        }

        let total = 0;

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="images/books/${item.image}" alt="${item.title}">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <p>${item.author}</p>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="decrease" data-id="${item.id}">-</button>
                        <span class="qty">${item.quantity}</span>
                        <button class="increase" data-id="${item.id}">+</button>
                        <button class="remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                    <p><strong>Subtotal:</strong> $${itemTotal.toFixed(2)}</p>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotalEl.textContent = total.toFixed(2);

        // Quantity change and removal
        cartContainer.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const item = cartItems.find(i => i.id === id);
                if (item) item.quantity++;
                updateCartCount();
                renderCartItems();
            });
        });

        cartContainer.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const item = cartItems.find(i => i.id === id);
                if (item && item.quantity > 1) {
                    item.quantity--;
                } else {
                    cartItems = cartItems.filter(i => i.id !== id);
                }
                updateCartCount();
                renderCartItems();
            });
        });

        cartContainer.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                cartItems = cartItems.filter(i => i.id !== id);
                updateCartCount();
                renderCartItems();
                showFeedback('Item removed', 'success');
            });
        });
    }

    window.addToCart = function(book) {
        const existingItem = cartItems.find(item => item.id === book.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                id: book.id,
                title: book.title,
                price: book.price,
                author: book.author,
                image: book.image || 'default-book.png',
                quantity: 1
            });
        }
        updateCartCount();
        renderCartItems();
        showFeedback('Added to cart!', 'success');
    };

    // ======== 2. SEARCH FUNCTION ========

    function setupSearch() {
        const searchInput = document.querySelector('.hero-search input') || document.querySelector('.search-box input');
        const searchButton = document.querySelector('.hero-search button') || document.querySelector('.search-box button');

        if (searchInput && searchButton) {
            const performSearch = () => {
                const query = searchInput.value.trim();
                if (query) {
                    if (window.location.pathname.includes('books.html')) {
                        filterBooks(query);
                    } else {
                        window.location.href = `books.html?search=${encodeURIComponent(query)}`;
                    }
                } else {
                    showFeedback('Please enter a search term', 'error');
                }
            };

            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
    }

    function filterBooks(query) {
        const bookCards = document.querySelectorAll('.book-card');
        let foundResults = false;

        bookCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const author = card.querySelector('p').textContent.toLowerCase();
            const searchTerm = query.toLowerCase();

            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                card.style.display = 'block';
                foundResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        const noResultsMsg = document.getElementById('noResultsMessage') || createNoResultsMessage();

        if (!foundResults) {
            noResultsMsg.textContent = `No books found for "${query}". Please try another search.`;
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }
    }

    function createNoResultsMessage() {
        const msg = document.createElement('div');
        msg.id = 'noResultsMessage';
        msg.style.display = 'none';
        msg.style.padding = '20px';
        msg.style.textAlign = 'center';
        msg.style.color = '#555';
        document.querySelector('.book-grid').appendChild(msg);
        return msg;
    }

    // ======== 3. FEEDBACK ========

    function showFeedback(message, type) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-message ${type}`;
        feedback.textContent = message;
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 500);
        }, 3000);
    }

    // ======== 4. INIT =========

    function initialize() {
        updateCartCount();
        setupSearch();
        renderCartItems();

        // Pre-fill search if applicable
        if (window.location.pathname.includes('books.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if (searchQuery) {
                document.querySelector('.search-box input').value = searchQuery;
                filterBooks(searchQuery);
            }
        }

        // Add-to-cart buttons
        document.querySelectorAll('.book-card .add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const bookCard = this.closest('.book-card');
                const imgSrc = bookCard.querySelector('img').src;
                addToCart({
                    id: imgSrc.split('/').pop().split('.')[0],
                    title: bookCard.querySelector('h3').textContent,
                    price: parseFloat(bookCard.querySelector('.price').textContent.replace('$', '')),
                    author: bookCard.querySelector('p').textContent,
                    image: imgSrc.split('/').pop()
                });
            });
        });

        // Open cart modal
        const cartIcon = document.querySelector('.cart');
        if (cartIcon && cartModal) {
            cartIcon.addEventListener('click', () => {
                renderCartItems();
                cartModal.style.display = 'block';
            });
        }

        // Close cart modal
        const closeCartBtn = document.querySelector('.close-cart');
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => {
                cartModal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    initialize();
});

// ======== 5. STYLES ========

const style = document.createElement('style');
style.textContent = `
.feedback-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 5px;
    z-index: 1000;
    transition: opacity 0.5s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    opacity: 1;
}
.feedback-message.success {
    background-color: #4CAF50;
    color: white;
}
.feedback-message.error {
    background-color: #f44336;
    color: white;
}
#noResultsMessage {
    grid-column: 1 / -1;
    font-size: 1.2rem;
    margin-top: 20px;
}
.quantity-controls {
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 5px 0;
}
.quantity-controls button {
    padding: 2px 8px;
    font-size: 0.9rem;
    cursor: pointer;
    background-color: #eee;
    border: none;
    border-radius: 4px;
}
.quantity-controls .remove {
    background-color: #f44336;
    color: white;
}
.quantity-controls .qty {
    min-width: 20px;
    text-align: center;
}
.cart-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
}
.cart-item img {
    width: 60px;
    height: auto;
    border-radius: 4px;
}
.item-details h4 {
    margin: 0;
    font-size: 1rem;
}
.item-details p {
    margin: 0.2rem 0;
    font-size: 0.85rem;
}
`;
document.head.appendChild(style);
