// cart.js
document.addEventListener('DOMContentLoaded', function() {
    // ===== CART STATE =====
    const CART_STORAGE_KEY = 'novellaCartItems';
    let cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartIcon = document.querySelector('.cart');
    const cartItemsContainer = document.querySelector('#cartModal .cart-items');
    const cartTotalElement = document.getElementById('cartTotal');

    // ===== INITIALIZATION =====
    initializeCart();

    function initializeCart() {
        updateCartCount(); // Load and display persisted count
        setupCartClosing();
        if (cartItemsContainer) renderCartItems();
        
        // Add centered styling to cart count elements
        cartCountElements.forEach(el => {
            el.style.display = 'flex';
            el.style.justifyContent = 'center';
            el.style.alignItems = 'center';
        });
    }

    // ===== CART CLOSING FUNCTIONALITY =====
    function setupCartClosing() {
        if (!cartModal || !closeCartBtn || !cartIcon) return;

        // Clean up existing listeners
        closeCartBtn.removeEventListener('click', closeCartModal);
        cartModal.removeEventListener('click', outsideClickHandler);
        document.removeEventListener('keydown', escapeKeyHandler);
        cartIcon.removeEventListener('click', openCartModal);

        // Add fresh listeners
        closeCartBtn.addEventListener('click', closeCartModal);
        cartModal.addEventListener('click', outsideClickHandler);
        document.addEventListener('keydown', escapeKeyHandler);
        cartIcon.addEventListener('click', openCartModal);
    }

    function openCartModal(e) {
        if (e) e.stopPropagation();
        renderCartItems();
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCartModal() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function outsideClickHandler(e) {
        if (e.target === cartModal) closeCartModal();
    }

    function escapeKeyHandler(e) {
        if (e.key === 'Escape' && cartModal.style.display === 'block') {
            closeCartModal();
        }
    }

    // ===== CART FUNCTIONALITY =====
    function updateCartCount() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'flex' : 'none';
            // Ensure centered styling
            el.style.justifyContent = 'center';
            el.style.alignItems = 'center';
        });
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }

    function renderCartItems() {
        if (!cartItemsContainer || !cartTotalElement) return;

        cartItemsContainer.innerHTML = cartItems.length === 0 ? emptyCartHTML() : generateCartItemsHTML();
        addCartItemEventListeners();
    }

    function emptyCartHTML() {
        cartTotalElement.textContent = '0.00';
        return `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Browse our collection to find your next favorite book</p>
                <a href="books.html" class="btn">Browse Books</a>
            </div>`;
    }

    function generateCartItemsHTML() {
        let total = 0;
        const itemsHTML = cartItems.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="cart-item" data-id="${item.id}">
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
                </div>`;
        }).join('');

        cartTotalElement.textContent = total.toFixed(2);
        return itemsHTML;
    }

    function addCartItemEventListeners() {
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
        });
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
        });
        document.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
        });
    }

    function updateQuantity(id, change) {
        const item = cartItems.find(i => i.id == id);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            cartItems = cartItems.filter(i => i.id != id);
        }

        updateCart();
    }

    function removeFromCart(id) {
        cartItems = cartItems.filter(i => i.id != id);
        updateCart();
        showFeedback('Item removed', 'success');
    }

    function updateCart() {
        saveCart();
        updateCartCount();
        renderCartItems();
    }

    function saveCart() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }

    // ===== EXPOSED FUNCTIONS =====
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
        updateCart();
        showFeedback('Added to cart!', 'success');
    };

    // ===== UTILITIES =====
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

    document.head.appendChild(style);
});