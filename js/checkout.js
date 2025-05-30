document.addEventListener('DOMContentLoaded', function () {
    const CART_STORAGE_KEY = 'novellaCartItems'; // ← use the same key
    const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const cartCountElements = document.querySelectorAll('.cart-count');

    function updateCartCount() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(el => el.textContent = totalItems);
    }

    function renderOrderItems() {
        if (cartItems.length === 0) {
            orderItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            checkoutTotal.textContent = '0.00';
            return;
        }

        let total = 0;

        orderItemsContainer.innerHTML = cartItems.map(item => `
            <div class="order-item">
                <img src="images/books/${item.image}" alt="${item.title}" 
                     onerror="this.src='images/books/default-book.png'">
                <div class="item-details">
                    <div class="item-title">${item.title}</div>
                    <div class="item-meta">
                        <span>${item.quantity} × $${item.price.toFixed(2)}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');

        total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        checkoutTotal.textContent = total.toFixed(2);
    }

    // Payment method switcher
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function () {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.payment-details').forEach(d => d.style.display = 'none');
            document.getElementById(this.dataset.target).style.display = 'block';
        });
    });

    // Order form submission
    document.getElementById('checkoutForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = document.querySelector('.confirm-payment');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;
        }

        setTimeout(() => {
            alert('Thank you for your purchase!');
            localStorage.removeItem(CART_STORAGE_KEY);
            window.location.href = 'index.html';
        }, 2000);
    });

    renderOrderItems();
    updateCartCount();
});
