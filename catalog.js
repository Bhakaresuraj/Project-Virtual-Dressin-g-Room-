document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            title: "Classic White Shirt",
            category: "Men • Formal • Shirt",
            price: "$49.99",
            image: "https://placehold.co/400x500",
            rating: 4.5,
            reviewCount: 120,
            description: "A timeless classic white shirt perfect for formal occasions. Made with premium cotton for ultimate comfort and durability.",
            gender: "men",
            type: "shirt",
            occasion: "formal",
            colors: ["white"],
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 2,
            title: "Blue Denim Jeans",
            category: "Men • Casual • Pants",
            price: "$59.99",
            image: "https://placehold.co/400x500",
            rating: 4.2,
            reviewCount: 95,
            description: "Comfortable denim jeans with a modern fit. Perfect for everyday casual wear.",
            gender: "men",
            type: "pants",
            occasion: "casual",
            colors: ["blue"],
            sizes: ["S", "M", "L", "XL", "XXL"]
        },
        {
            id: 3,
            title: "Red Cocktail Dress",
            category: "Women • Formal • Dress",
            price: "$79.99",
            image: "https://placehold.co/400x500",
            rating: 4.8,
            reviewCount: 156,
            description: "Elegant red cocktail dress perfect for formal events and evening parties.",
            gender: "women",
            type: "dress",
            occasion: "formal",
            colors: ["red"],
            sizes: ["XS", "S", "M", "L"]
        },
        {
            id: 4,
            title: "Black Blazer",
            category: "Men • Formal • Jacket",
            price: "$89.99",
            image: "https://placehold.co/400x500",
            rating: 4.6,
            reviewCount: 78,
            description: "Sharp black blazer for a professional look. Made with high-quality materials for a comfortable fit.",
            gender: "men",
            type: "jacket",
            occasion: "formal",
            colors: ["black"],
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 5,
            title: "Floral Summer Dress",
            category: "Women • Casual • Dress",
            price: "$54.99",
            image: "https://placehold.co/400x500",
            rating: 4.3,
            reviewCount: 112,
            description: "Light and breezy floral dress perfect for summer outings and casual events.",
            gender: "women",
            type: "dress",
            occasion: "casual",
            colors: ["yellow", "green"],
            sizes: ["XS", "S", "M", "L"]
        },
        {
            id: 6,
            title: "Green T-Shirt",
            category: "Unisex • Casual • Shirt",
            price: "$24.99",
            image: "https://placehold.co/400x500",
            rating: 4.1,
            reviewCount: 87,
            description: "Comfortable cotton t-shirt in a vibrant green shade. Perfect for casual everyday wear.",
            gender: "unisex",
            type: "shirt",
            occasion: "casual",
            colors: ["green"],
            sizes: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        {
            id: 7,
            title: "Blue Formal Skirt",
            category: "Women • Formal • Skirt",
            price: "$49.99",
            image: "https://placehold.co/400x500",
            rating: 4.4,
            reviewCount: 65,
            description: "Elegant blue skirt for formal settings and professional environments.",
            gender: "women",
            type: "skirt",
            occasion: "formal",
            colors: ["blue"],
            sizes: ["XS", "S", "M", "L"]
        },
        {
            id: 8,
            title: "Black Sport Joggers",
            category: "Unisex • Sports • Pants",
            price: "$39.99",
            image: "https://placehold.co/400x500",
            rating: 4.7,
            reviewCount: 134,
            description: "Comfortable joggers perfect for workouts or casual athleisure style.",
            gender: "unisex",
            type: "pants",
            occasion: "sports",
            colors: ["black"],
            sizes: ["XS", "S", "M", "L", "XL"]
        }
    ];

    // More products to fill the grid (duplicated with different IDs)
    let allProducts = [...products];
    for (let i = 9; i <= 10; i++) {
        const original = products[(i - 9) % products.length];
        allProducts.push({
            ...original,
            id: i
        });
    }

    // DOM Elements
    const productsContainer = document.getElementById('products-container');
    const resultCount = document.getElementById('result-count');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const previewModal = document.getElementById('preview-modal');
    const closeModal = document.querySelector('.close-modal');
    const headerCatalogBtn = document.getElementById('header-catalog-btn');
    const filterToggles = document.querySelectorAll('.filter-toggle');

    // Initialize filter toggles
    filterToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Toggle active class on the button
            this.classList.toggle('active');
            
            // Toggle the display of filter options
            const options = this.nextElementSibling;
            if (options.style.display === 'none' || !options.style.display) {
                options.style.display = 'block';
            } else {
                options.style.display = 'none';
            }
            
            // Close other open filter groups
            filterToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.classList.remove('active');
                    const otherOptions = otherToggle.nextElementSibling;
                    otherOptions.style.display = 'none';
                }
            });
        });
    });

    // Initialize the page
    displayProducts(allProducts);
    updateResultCount(allProducts.length);

    // Apply filters button event listener
    applyFiltersBtn.addEventListener('click', function() {
        const filteredProducts = filterProducts();
        displayProducts(filteredProducts);
        updateResultCount(filteredProducts.length);
    });

    // Clear filters button event listener
    clearFiltersBtn.addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        displayProducts(allProducts);
        updateResultCount(allProducts.length);
    });

    // Close modal when clicking on X
    closeModal.addEventListener('click', function() {
        previewModal.classList.remove('show');
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === previewModal) {
            previewModal.classList.remove('show');
        }
    });

    // Disable default behavior of header catalog button since we're already on the catalog page
    if (headerCatalogBtn) {
        headerCatalogBtn.addEventListener('click', function(e) {
            e.preventDefault();
        });
    }

    // Footer link functionality (copied from main script)
    const links = {
        'about-link': 'About Us page coming soon!',
        'contact-link': 'Contact page coming soon!',
        'privacy-link': 'Privacy Policy page coming soon!',
        'terms-link': 'Terms of Service page coming soon!'
    };

    Object.keys(links).forEach(id => {
        const link = document.getElementById(id);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert(links[id]);
            });
        }
    });

    // Filter products based on selected checkboxes
    function filterProducts() {
        const selectedFilters = {
            gender: getSelectedValues('gender'),
            occasion: getSelectedValues('occasion'),
            type: getSelectedValues('type'),
            color: getSelectedValues('color'),
            size: getSelectedValues('size')
        };

        return allProducts.filter(product => {
            // Check gender filter
            if (selectedFilters.gender.length > 0 && !selectedFilters.gender.includes(product.gender)) {
                return false;
            }
            
            // Check occasion filter
            if (selectedFilters.occasion.length > 0 && !selectedFilters.occasion.includes(product.occasion)) {
                return false;
            }
            
            // Check type filter
            if (selectedFilters.type.length > 0 && !selectedFilters.type.includes(product.type)) {
                return false;
            }
            
            // Check color filter
            if (selectedFilters.color.length > 0 && !product.colors.some(color => selectedFilters.color.includes(color))) {
                return false;
            }
            
            // Check size filter (assuming sizes are stored in lowercase for comparison)
            if (selectedFilters.size.length > 0 && !product.sizes.some(size => selectedFilters.size.includes(size.toLowerCase()))) {
                return false;
            }
            
            return true;
        });
    }

    // Get selected values from checkboxes by name
    function getSelectedValues(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value);
    }

    // Update the result count display
    function updateResultCount(count) {
        resultCount.textContent = `(${count} items)`;
    }

    // Display products in the grid
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            // Create product card
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-product-id', product.id);
            
            // Create product image container
            const productImage = document.createElement('div');
            productImage.className = 'product-image';
            
            // Product image
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.title;
            productImage.appendChild(img);
            
            // Create hover overlay with buttons
            const productHover = document.createElement('div');
            productHover.className = 'product-hover';
            
            // Quick view button
            const quickViewBtn = document.createElement('button');
            quickViewBtn.className = 'product-hover-btn quick-view-btn';
            quickViewBtn.textContent = 'Quick View';
            quickViewBtn.addEventListener('click', () => openProductPreview(product));
            productHover.appendChild(quickViewBtn);
            
            productImage.appendChild(productHover);
            productCard.appendChild(productImage);
            
            // Create product info section
            const productInfo = document.createElement('div');
            productInfo.className = 'product-info';
            
            // Product title
            const productTitle = document.createElement('h3');
            productTitle.className = 'product-title';
            productTitle.textContent = product.title;
            productInfo.appendChild(productTitle);
            
            // Product category
            const productCategory = document.createElement('div');
            productCategory.className = 'product-category';
            productCategory.textContent = product.category;
            productInfo.appendChild(productCategory);
            
            // Product price
            const productPrice = document.createElement('div');
            productPrice.className = 'product-price';
            productPrice.textContent = product.price;
            productInfo.appendChild(productPrice);
            
            // Product rating
            const productRating = document.createElement('div');
            productRating.className = 'product-rating';
            
            const ratingStars = document.createElement('div');
            ratingStars.className = 'rating-stars';
            
            // Create star rating display
            const fullStars = Math.floor(product.rating);
            const hasHalfStar = product.rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) {
                ratingStars.innerHTML += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                ratingStars.innerHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                ratingStars.innerHTML += '<i class="far fa-star"></i>';
            }
            
            productRating.appendChild(ratingStars);
            
            const ratingCount = document.createElement('span');
            ratingCount.className = 'rating-count';
            ratingCount.textContent = `(${product.reviewCount})`;
            productRating.appendChild(ratingCount);
            
            productInfo.appendChild(productRating);
            productCard.appendChild(productInfo);
            
            // Add the complete product card to the container
            productsContainer.appendChild(productCard);
        });
    }

    // Open product preview modal
    function openProductPreview(product) {
        // Set modal content
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-title').textContent = product.title;
        document.getElementById('modal-product-description').textContent = product.description;
        document.getElementById('modal-product-price').textContent = product.price;
        
        // Create star rating for modal
        const ratingElement = document.getElementById('modal-product-rating');
        ratingElement.innerHTML = '';
        
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        starsHtml += ` <span>(${product.reviewCount} reviews)</span>`;
        ratingElement.innerHTML = starsHtml;
        
        // Show the modal
        previewModal.classList.add('show');
        
        // Size buttons functionality
        const sizeButtons = document.querySelectorAll('.size-btn');
        let selectedSize = 'L'; // Default selected size
        
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                selectedSize = this.textContent.trim();
            });
        });
        
        // "Try on your image" button (previously "Add to Try-On")
        const tryOnButton = document.querySelector('.modal-content .try-on-btn');
        tryOnButton.textContent = 'Try on your image';
        tryOnButton.addEventListener('click', function() {
            // Redirect to upload page with product info
            window.location.href = `upload.html?id=${product.id}&size=${selectedSize}`;
            previewModal.classList.remove('show');
        });
        
        // Wishlist button
        const wishlistButton = document.querySelector('.wishlist-btn');
        wishlistButton.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
            this.style.color = '#6c63ff';
        });
    }
}); 