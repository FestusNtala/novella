// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cartItems = [];
    const cartCountElement = document.querySelector('.cart-count');
    
    // Initialize cart
    function initializeCart() {
        try {
            const storedItems = localStorage.getItem('cartItems');
            cartItems = storedItems ? JSON.parse(storedItems) : [];
            updateCartCount();
        } catch (e) {
            console.error('Error loading cart:', e);
            cartItems = [];
        }
    }

    // Update cart count display
    function updateCartCount() {
        if (cartCountElement) {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
            try {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            } catch (e) {
                console.error('Error saving cart:', e);
            }
        }
    }

    // Enhanced add to cart function
    function addToCart(book) {
        const existingItem = cartItems.find(item => item.id === book.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({...book, quantity: 1});
        }
        updateCartCount();
        return true;
    }

    // Cart Modal functionality
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.querySelector('.cart');

    function openCart() {
        cartModal.style.display = 'block';
        renderCartItems();
    }

    function closeCart() {
        cartModal.style.display = 'none';
    }

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        
        cartItemsContainer.innerHTML = cartItems.length === 0 
            ? '<p class="empty-cart">Your cart is empty</p>'
            : cartItems.map((item, index) => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">
                            $${item.price.toFixed(2)} × ${item.quantity}
                        </div>
                    </div>
                    <button class="remove-item" data-index="${index}">&times;</button>
                </div>
            `).join('');

        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = total.toFixed(2);
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                cartItems.splice(parseInt(this.dataset.index), 1);
                updateCartCount();
                renderCartItems();
            });
        });
    }

    // Checkout Page Enhancements
    function setupCheckoutPage() {
        const checkoutTotal = document.getElementById('checkoutTotal');
        if (checkoutTotal) {
            const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            checkoutTotal.textContent = total.toFixed(2);
        }

        // Payment method toggle
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function() {
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
                this.classList.add('active');
                document.querySelectorAll('.payment-details').forEach(d => d.style.display = 'none');
                document.getElementById(this.dataset.target).style.display = 'block';
            });
        });
    }

        
    // Generate random book particles (same as before)
    document.addEventListener('DOMContentLoaded', function() {
        const heroBg = document.querySelector('.hero-background');
        const bookTitles = ['book1.png', 'book2.png', 'book3.png', 'book4.png', 'book5.png'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'book-particle';
            
            const size = Math.random() * 30 + 30;
            const posX = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            const book = bookTitles[Math.floor(Math.random() * bookTitles.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size * 1.3}px`;
            particle.style.left = `${posX}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.backgroundImage = `url(images/books/${book})`;
            
            heroBg.appendChild(particle);
        }
    });

    // Initialize all functionality
    initializeCart();
    setupCheckoutPage();
    
    // Event listeners
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }
    if (document.querySelector('.close-cart')) {
        document.querySelector('.close-cart').addEventListener('click', closeCart);
    }
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCart();
    });

    console.log('Script loaded successfully');


});