document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCountElement = document.querySelector('.cart-count');
    const subtotalElement = document.querySelector('.subtotal');
    const shippingElement = document.querySelector('.shipping');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total-amount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModalBtn = document.querySelector('.checkout-modal .close-modal');
    const cancelCheckoutBtn = document.getElementById('cancelCheckout');
    const checkoutForm = document.getElementById('checkoutForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const creditCardForm = document.getElementById('creditCardForm');
    const paypalInstructions = document.getElementById('paypalInstructions');
    const mobilePaymentInstructions = document.getElementById('mobilePaymentInstructions');
    
    // Cart state
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Initialize page
    renderCart();
    updateCartSummary();
    
    // Event Listeners
    checkoutBtn.addEventListener('click', openCheckoutModal);
    closeModalBtn.addEventListener('click', closeCheckoutModal);
    cancelCheckoutBtn.addEventListener('click', closeCheckoutModal);
    checkoutForm.addEventListener('submit', processCheckout);
    
    // Payment method change
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            updatePaymentMethodDisplay(this.value);
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
    
    // Functions
    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Browse our collection to find your next favorite book</p>
                    <a href="books.html" class="btn">Browse Books</a>
                </div>
            `;
            checkoutBtn.disabled = true;
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="images/books/${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p class="author">${item.author}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease-qty"><i class="fas fa-minus"></i></button>
                        <span>${item.quantity}</span>
                        <button class="increase-qty"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="cart-item-remove">
                        <i class="fas fa-trash-alt"></i> Remove
                    </button>
                </div>
                <div class="cart-item-total">
                    <p class="price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                updateQuantity(itemId, -1);
            });
        });
        
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                updateQuantity(itemId, 1);
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                removeFromCart(itemId);
            });
        });
        
        checkoutBtn.disabled = false;
    }
    
    function updateQuantity(itemId, change) {
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            
            // Remove item if quantity reaches 0
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            saveCart();
            renderCart();
            updateCartSummary();
            updateCartCount();
        }
    }
    
     // Remove item
    function removeFromCart(bookId) {
        cartItems = cartItems.filter(item => item.id !== bookId);
        saveCart();
        updateCartUI();
    }
                    
    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 5.00; // Flat rate shipping
        const tax = subtotal * 0.07; // 7% tax rate
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
        
        // Update checkout modal summary if open
        if (checkoutModal.style.display === 'block') {
            updateCheckoutOrderSummary();
        }
    }
    
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        
        // Update cart count in other pages if needed
        if (typeof updateHeaderCartCount === 'function') {
            updateHeaderCartCount(totalItems);
        }
    }
    
    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

    
    function openCheckoutModal() {
        updateCheckoutOrderSummary();
        checkoutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeCheckoutModal() {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function updateCheckoutOrderSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 5.00;
        const tax = subtotal * 0.07;
        const total = subtotal + shipping + tax;
        
        const orderSummaryHTML = `
            ${cart.map(item => `
                <div class="checkout-item">
                    <span class="title">${item.title}</span>
                    <span class="quantity">${item.quantity}</span>
                    <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('')}
            <div class="checkout-total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
        
        document.getElementById('checkoutOrderSummary').innerHTML = orderSummaryHTML;
    }
    
    function updatePaymentMethodDisplay(method) {
        creditCardForm.style.display = method === 'creditCard' ? 'block' : 'none';
        paypalInstructions.style.display = method === 'paypal' ? 'block' : 'none';
        mobilePaymentInstructions.style.display = method === 'mobilePayment' ? 'block' : 'none';
    }
    
    function processCheckout(e) {
        e.preventDefault();
        
        // In a real application, you would process payment here
        // For this demo, we'll just show the confirmation
        
        // Generate random order ID
        const orderId = 'BH' + Math.floor(100000 + Math.random() * 900000);
        
        // Get customer email from form
        const customerEmail = document.getElementById('email').value || 'your@email.com';
        
        // Update confirmation modal
        document.getElementById('orderId').textContent = orderId;
        document.getElementById('customerEmail').textContent = customerEmail;
        
        // Close checkout modal and show confirmation
        closeCheckoutModal();
        confirmationModal.style.display = 'block';
        
        // Clear cart
        cart = [];
        saveCart();
        renderCart();
        updateCartSummary();
        updateCartCount();
    }
    
    // Expose functions to global scope for other pages to use
    window.addToCart = function(book) {
        const existingItem = cart.find(item => item.id === book.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: book.id,
                title: book.title,
                author: book.author,
                price: book.price,
                image: book.image,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartCount();
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.textContent = 'Added to cart!';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.backgroundColor = '#4a6fa5';
        feedback.style.color = 'white';
        feedback.style.padding = '10px 20px';
        feedback.style.borderRadius = '5px';
        feedback.style.zIndex = '1000';
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transition = 'opacity 0.5s';
            setTimeout(() => feedback.remove(), 500);
        }, 2000);
    };
    
    window.updateHeaderCartCount = function(count) {
        cartCountElement.textContent = count;
    };
    
    window.getCartCount = function() {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };
});







