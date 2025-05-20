// Books Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample book data (24 books)
    const books = [
        
 {
        id: 1,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 12.99,
        category: "fiction",
        rating: 4.5,
        image: "book1.png",
        description: "A psychological thriller about a woman who shoots her husband and then stops speaking.",
        pages: 336,
        isbn: "978-1250301697",
        featured: true
    },
    {
        id: 2,
        title: "Educated",
        author: "Tara Westover",
        price: 14.99,
        category: "non-fiction",
        rating: 4.7,
        image: "book2.png",
        description: "A memoir about a woman who leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
        pages: 352,
        isbn: "978-0399590504",
        featured: true
    },
    {
        id: 3,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        price: 13.49,
        category: "fiction",
        rating: 4.8,
        image: "book3.png",
        description: "A murder mystery and coming-of-age story set in the marshes of North Carolina.",
        pages: 384,
        isbn: "978-0735219090",
        featured: true
    },
    {
        id: 4,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 10.99,
        category: "fiction",
        rating: 4.6,
        image: "book4.jpg",
        description: "A philosophical novel about a young Andalusian shepherd named Santiago.",
        pages: 208,
        isbn: "978-0062315007",
        featured: false
    },
    {
        id: 5,
        title: "Becoming",
        author: "Michelle Obama",
        price: 16.99,
        category: "biography",
        rating: 4.9,
        image: "book5.jpg",
        description: "The memoir of former First Lady Michelle Obama.",
        pages: 448,
        isbn: "978-1524763138",
        featured: false
    },
    {
        id: 6,
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        price: 19.99,
        category: "fantasy",
        rating: 4.8,
        image: "book6.jpg",
        description: "The first book in the Kingkiller Chronicle series about a notorious wizard.",
        pages: 662,
        isbn: "978-0756404741",
        featured: false
    },
    {
        id: 7,
        title: "Gone Girl",
        author: "Gillian Flynn",
        price: 11.49,
        category: "mystery",
        rating: 4.2,
        image: "book7.jpg",
        description: "A psychological thriller about a woman's disappearance on her fifth wedding anniversary.",
        pages: 432,
        isbn: "978-0307588371",
        featured: false
    },
    {
        id: 8,
        title: "The Notebook",
        author: "Nicholas Sparks",
        price: 9.99,
        category: "romance",
        rating: 4.1,
        image: "book8.jpg",
        description: "A love story about a poor young man who falls in love with a rich young woman.",
        pages: 214,
        isbn: "978-0446605236",
        featured: false
    },
    {
        id: 9,
        title: "Dune",
        author: "Frank Herbert",
        price: 15.99,
        category: "sci-fi",
        rating: 4.7,
        image: "book9.jpg",
        description: "A science fiction novel set in the distant future amidst a feudal interstellar society.",
        pages: 688,
        isbn: "978-0441172719",
        featured: false
    },
    {
        id: 10,
        title: "Atomic Habits",
        author: "James Clear",
        price: 14.99,
        category: "non-fiction",
        rating: 4.8,
        image: "book10.jpg",
        description: "A guide to building good habits and breaking bad ones.",
        pages: 320,
        isbn: "978-0735211292",
        featured: false
    },
    {
        id: 11,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 12.99,
        category: "fantasy",
        rating: 4.9,
        image: "book11.jpg",
        description: "A fantasy novel about the quest of home-loving Bilbo Baggins.",
        pages: 310,
        isbn: "978-0547928227",
        featured: false
    },
    {
        id: 12,
        title: "The Girl on the Train",
        author: "Paula Hawkins",
        price: 10.99,
        category: "mystery",
        rating: 4.1,
        image: "book12.jpg",
        description: "A psychological thriller about a woman who becomes entangled in a missing persons investigation.",
        pages: 336,
        isbn: "978-1594634024",
        featured: false
    },
    {
        id: 13,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 7.99,
        category: "romance",
        rating: 4.7,
        image: "book13.jpg",
        description: "A romantic novel about the emotional development of Elizabeth Bennet.",
        pages: 279,
        isbn: "978-1503290563",
        featured: false
    },
    {
        id: 14,
        title: "The Martian",
        author: "Andy Weir",
        price: 13.99,
        category: "sci-fi",
        rating: 4.6,
        image: "book14.jpg",
        description: "A science fiction novel about an astronaut stranded on Mars.",
        pages: 369,
        isbn: "978-0553418026",
        featured: false
    },
    {
        id: 15,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 17.99,
        category: "non-fiction",
        rating: 4.8,
        image: "book15.jpg",
        description: "A brief history of humankind exploring the evolution of our species.",
        pages: 464,
        isbn: "978-0062316097",
        featured: false
    },
    {
        id: 16,
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        price: 24.99,
        category: "fantasy",
        rating: 4.9,
        image: "book16.jpg",
        description: "An epic high-fantasy novel about the quest to destroy the One Ring.",
        pages: 1178,
        isbn: "978-0544003415",
        featured: false
    },
    {
        id: 17,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        price: 9.99,
        category: "mystery",
        rating: 4.2,
        image: "book17.jpg",
        description: "A mystery thriller about a symbologist who uncovers clues in Leonardo da Vinci's works.",
        pages: 489,
        isbn: "978-0307474278",
        featured: false
    },
    {
        id: 18,
        title: "Normal People",
        author: "Sally Rooney",
        price: 11.99,
        category: "romance",
        rating: 4.3,
        image: "book18.jpg",
        description: "A story of mutual fascination between two very different people.",
        pages: 273,
        isbn: "978-1984822178",
        featured: false
    },
    {
        id: 19,
        title: "1984",
        author: "George Orwell",
        price: 8.99,
        category: "sci-fi",
        rating: 4.7,
        image: "book19.jpg",
        description: "A dystopian novel about totalitarianism, mass surveillance, and repressive regimentation.",
        pages: 328,
        isbn: "978-0451524935",
        featured: false
    },
    {
        id: 20,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        price: 15.99,
        category: "non-fiction",
        rating: 4.6,
        image: "book20.jpg",
        description: "A book about the two systems that drive the way we think.",
        pages: 499,
        isbn: "978-0374533557",
        featured: false
    },
    {
        id: 21,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 7.49,
        category: "fiction",
        rating: 4.5,
        image: "book21.jpg",
        description: "A novel about the mysterious millionaire Jay Gatsby and his love for Daisy Buchanan.",
        pages: 180,
        isbn: "978-0743273565",
        featured: false
    },
    {
        id: 22,
        title: "The Hunger Games",
        author: "Suzanne Collins",
        price: 10.99,
        category: "sci-fi",
        rating: 4.7,
        image: "book22.jpg",
        description: "A dystopian novel about a televised fight to the death between children.",
        pages: 374,
        isbn: "978-0439023481",
        featured: false
    },
    {
        id: 23,
        title: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        price: 12.99,
        category: "non-fiction",
        rating: 4.3,
        image: "book23.jpg",
        description: "A self-help book that advises people to accept their limitations.",
        pages: 224,
        isbn: "978-0062457714",
        featured: false
    },
    {
        id: 24,
        title: "The Night Circus",
        author: "Erin Morgenstern",
        price: 13.99,
        category: "fantasy",
        rating: 4.4,
        image: "book24.jpg",
        description: "A fantasy novel about a magical competition between two young illusionists.",
        pages: 387,
        isbn: "978-0307744432",
        featured: false
    }
    ];

    // DOM Elements
    const booksContainer = document.getElementById('booksContainer');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const priceRange = document.getElementById('priceRange');
    const currentPrice = document.getElementById('currentPrice');
    const sortBy = document.getElementById('sortBy');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const bookModal = document.getElementById('bookModal');
    const closeModal = document.querySelector('.close-modal');
    const cartCount = document.querySelector('.cart-count');
    const pageBtns = document.querySelectorAll('.page-btn');
    const pageNums = document.querySelectorAll('.page-num');
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');

    // State variables
    let currentPage = 1;
    const booksPerPage = 12;
    let filteredBooks = [...books];
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Initialize page
    renderBooks(getPaginatedBooks(filteredBooks));
    setupPagination();
    updateCartCount();

    // Event Listeners
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            currentPage = 1;
            filterBooks();
        });
    });

    priceRange.addEventListener('input', function() {
        const value = this.value;
        currentPrice.textContent = value === "50" ? "$50+" : `$${value}`;
        currentPage = 1;
        filterBooks();
    });

    sortBy.addEventListener('change', () => {
        currentPage = 1;
        filterBooks();
    });

    searchBtn.addEventListener('click', () => {
        currentPage = 1;
        filterBooks();
    });

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            currentPage = 1;
            filterBooks();
        }
    });

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            booksContainer.classList.toggle('list-view', this.dataset.view === 'list');
        });
    });

    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', outsideModalClickHandler);

    // Cart functionality
    cartIcon.addEventListener('click', openCart);
    document.querySelector('.close-cart').addEventListener('click', closeCart);
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCart();
    });

    // Pagination event listeners
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('prev')) {
                if (currentPage > 1) currentPage--;
            } else {
                if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) currentPage++;
            }
            renderBooks(getPaginatedBooks(filteredBooks));
            updatePaginationUI();
        });
    });

    pageNums.forEach(num => {
        num.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                currentPage = parseInt(this.textContent);
                renderBooks(getPaginatedBooks(filteredBooks));
                updatePaginationUI();
            }
        });
    });

    // Functions
    function renderBooks(booksToRender) {
        if (booksToRender.length === 0) {
            booksContainer.innerHTML = '<div class="no-results">No books found matching your criteria.</div>';
            document.getElementById('resultsCount').textContent = '0';
            return;
        }

        booksContainer.innerHTML = booksToRender.map(book => `
            <div class="book-card" data-id="${book.id}" data-category="${book.category}" data-price="${book.price}">
                <img src="images/books/${book.image}" alt="${book.title}" loading="lazy">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p class="author">${book.author}</p>
                    <div class="rating">
                        ${renderRatingStars(book.rating)}
                        <span>(${book.rating})</span>
                    </div>
                    <p class="price">$${book.price.toFixed(2)}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to book cards
        document.querySelectorAll('.book-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('add-to-cart')) {
                    const bookId = parseInt(this.dataset.id);
                    const book = books.find(b => b.id === bookId);
                    openBookModal(book);
                }
            });
        });
        
        // Add event listeners to add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const bookId = parseInt(this.closest('.book-card').dataset.id);
                addToCart(bookId);
            });
        });
        
        // Update results count
        document.getElementById('resultsCount').textContent = filteredBooks.length;
    }

    function renderRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    function filterBooks() {
        const activeCategory = document.querySelector('.category-list a.active').dataset.category;
        const maxPrice = parseFloat(priceRange.value);
        const searchTerm = searchInput.value.toLowerCase().trim();
        const sortOption = sortBy.value;
        
        filteredBooks = books.filter(book => {
            const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
            const matchesPrice = book.price <= maxPrice;
            const matchesSearch = searchTerm === '' || 
                                book.title.toLowerCase().includes(searchTerm) || 
                                book.author.toLowerCase().includes(searchTerm);
            
            return matchesCategory && matchesPrice && matchesSearch;
        });
        
        // Sort books
        switch(sortOption) {
            case 'price-low':
                filteredBooks.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredBooks.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredBooks.sort((a, b) => b.id - a.id);
                break;
            case 'rating':
                filteredBooks.sort((a, b) => b.rating - a.rating);
                break;
            default:
                filteredBooks.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }
        
        renderBooks(getPaginatedBooks(filteredBooks));
        setupPagination();
        updatePaginationUI();
    }

    function getPaginatedBooks(booksArray) {
        const startIndex = (currentPage - 1) * booksPerPage;
        return booksArray.slice(startIndex, startIndex + booksPerPage);
    }

    function setupPagination() {
        const pageNumbers = document.querySelector('.page-numbers');
        const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
        
        if (totalPages <= 1) {
            pageNumbers.innerHTML = '';
            return;
        }
        
        let pagesHtml = '';
        const maxVisiblePages = 5;
        let startPage, endPage;
        
        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
            const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
            
            if (currentPage <= maxPagesBeforeCurrent) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrent;
                endPage = currentPage + maxPagesAfterCurrent;
            }
        }
        
        if (startPage > 1) {
            pagesHtml += '<button class="page-num">1</button>';
            if (startPage > 2) {
                pagesHtml += '<span>...</span>';
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pagesHtml += `<button class="page-num ${i === currentPage ? 'active' : ''}">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pagesHtml += '<span>...</span>';
            }
            pagesHtml += `<button class="page-num">${totalPages}</button>`;
        }
        
        pageNumbers.innerHTML = pagesHtml;
        
        document.querySelectorAll('.page-num').forEach(num => {
            num.addEventListener('click', function() {
                if (!this.classList.contains('active')) {
                    currentPage = parseInt(this.textContent);
                    renderBooks(getPaginatedBooks(filteredBooks));
                    updatePaginationUI();
                }
            });
        });
    }

    function updatePaginationUI() {
        const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
        const prevBtn = document.querySelector('.page-btn.prev');
        const nextBtn = document.querySelector('.page-btn.next');
        
        document.querySelectorAll('.page-num').forEach(num => {
            num.classList.toggle('active', parseInt(num.textContent) === currentPage);
        });
        
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        document.querySelector('.current-page').textContent = currentPage;
    }

    function openBookModal(book) {
        document.getElementById('modalBookImage').src = `images/books/${book.image}`;
        document.getElementById('modalBookImage').alt = book.title;
        document.getElementById('modalBookTitle').textContent = book.title;
        document.getElementById('modalBookAuthor').textContent = `by ${book.author}`;
        document.getElementById('modalBookRating').innerHTML = `
            ${renderRatingStars(book.rating)}
            <span>(${book.rating})</span>
        `;
        document.getElementById('modalBookPrice').textContent = `$${book.price.toFixed(2)}`;
        document.getElementById('modalBookDescription').textContent = book.description;
        document.getElementById('modalBookCategory').textContent = book.category;
        document.getElementById('modalBookPages').textContent = book.pages;
        document.getElementById('modalBookISBN').textContent = book.isbn;
        
        const modalAddToCart = document.querySelector('.modal-content .add-to-cart');
        modalAddToCart.onclick = function() {
            addToCart(book.id);
        };
        
        bookModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModalHandler() {
        bookModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function outsideModalClickHandler(e) {
        if (e.target === bookModal) {
            closeModalHandler();
        }
    }

    // Cart Functions
    function addToCart(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) return;

        const existingItem = cartItems.find(item => item.id === bookId);
        if (!existingItem) {
            cartItems.push({
                id: book.id,
                title: book.title,
                price: book.price,
                quantity: 1
            });
        } else {
            existingItem.quantity++;
        }
        
        updateCartCount();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        showFeedbackMessage(existingItem ? 'Quantity updated!' : 'Added to cart!');
    }

    function removeFromCart(index) {
        cartItems.splice(index, 1);
        updateCartCount();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }

    function updateCartCount() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

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
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
                    </div>
                    <button class="remove-item" data-index="${index}">&times;</button>
                </div>
            `).join('');

        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = total.toFixed(2);
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                removeFromCart(parseInt(this.dataset.index));
            });
        });
    }

    function showFeedbackMessage(message) {
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) existingFeedback.remove();
        
        const feedback = document.createElement('div');
        feedback.className = 'feedback-message';
        feedback.textContent = message;
        
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.backgroundColor = '#4a6fa5';
        feedback.style.color = 'white';
        feedback.style.padding = '12px 24px';
        feedback.style.borderRadius = '5px';
        feedback.style.zIndex = '1000';
        feedback.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        feedback.style.animation = 'slideIn 0.3s ease-out';
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => feedback.remove(), 500);
        }, 2000);
    }

    // Add CSS for feedback animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

});