document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productSize = params.get('size') || 'L';
    
    // DOM Elements
    // Image controls
    const resultImage = document.getElementById('result-image');
    const resultImageContainer = document.getElementById('result-image-container');
    const rotateLeftBtn = document.getElementById('rotate-left-btn');
    const rotateRightBtn = document.getElementById('rotate-right-btn');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const resetViewBtn = document.getElementById('reset-view-btn');
    const compareToggle = document.getElementById('compare-toggle');
    
    // Adjustment controls
    const fitSlider = document.getElementById('fit-slider');
    const lengthSlider = document.getElementById('length-slider');
    const sleeveSlider = document.getElementById('sleeve-slider');
    const colorOptions = document.getElementById('color-options');
    const lengthControl = document.getElementById('length-control');
    const sleeveControl = document.getElementById('sleeve-control');
    
    // Item details
    const itemTitle = document.getElementById('item-title');
    const itemCategory = document.getElementById('item-category');
    const itemPrice = document.getElementById('item-price');
    const sizeDisplay = document.getElementById('size-display');
    const changeSizeBtn = document.getElementById('change-size-btn');
    
    // Modal
    const sizeModal = document.getElementById('size-modal');
    const closeModal = document.querySelector('.close-modal');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const applySizeBtn = document.getElementById('apply-size-btn');
    const sizeChartLink = document.getElementById('size-chart-link');
    
    // Action buttons
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const saveImageBtn = document.getElementById('save-image-btn');
    const tryAnotherBtn = document.getElementById('try-another-btn');
    
    // Sample product data (in a real app, you'd fetch this from a server)
    const products = [
        {
            id: 1,
            title: "Classic White Shirt",
            category: "Men • Formal • Shirt",
            price: "$49.99",
            image: "https://placehold.co/400x500",
            hasSleeveOption: true,
            hasLengthOption: true,
            colors: ["#FFFFFF", "#87CEEB", "#FFB6C1", "#98FB98"],
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 2,
            title: "Blue Denim Jeans",
            category: "Men • Casual • Pants",
            price: "$59.99",
            image: "https://placehold.co/400x500",
            hasSleeveOption: false,
            hasLengthOption: true,
            colors: ["#1E90FF", "#000000", "#808080"],
            sizes: ["S", "M", "L", "XL", "XXL"]
        },
        {
            id: 3,
            title: "Red Cocktail Dress",
            category: "Women • Formal • Dress",
            price: "$79.99",
            image: "https://placehold.co/400x500",
            hasSleeveOption: false,
            hasLengthOption: true,
            colors: ["#FF0000", "#000000", "#8A2BE2"],
            sizes: ["XS", "S", "M", "L"]
        },
        {
            id: 4,
            title: "Black Blazer",
            category: "Men • Formal • Jacket",
            price: "$89.99",
            image: "https://placehold.co/400x500",
            hasSleeveOption: true,
            hasLengthOption: true,
            colors: ["#000000", "#808080", "#4B0082"],
            sizes: ["S", "M", "L", "XL"]
        }
    ];
    
    // Variables for image manipulation
    let scale = 1;
    let rotation = 0;
    let currentProduct = null;
    let originalImageSrc = "";
    let virtualTryOnSrc = "";
    
    // Initialize the page
    function init() {
        // Find the product
        if (productId) {
            currentProduct = products.find(p => p.id == productId);
            if (currentProduct) {
                // Set product details
                itemTitle.textContent = currentProduct.title;
                itemCategory.textContent = currentProduct.category;
                itemPrice.textContent = currentProduct.price;
                sizeDisplay.textContent = productSize;
                
                // Set the initial image
                // In a real app, this would be the AI-generated try-on image
                virtualTryOnSrc = `https://placehold.co/600x800/6c63ff/white?text=AI+Try-On:+${currentProduct.title}`;
                originalImageSrc = `https://placehold.co/600x800/333333/white?text=Original+Photo`;
                resultImage.src = virtualTryOnSrc;
                
                // Set available color options
                createColorSwatches(currentProduct.colors);
                
                // Set available adjustment options based on the product
                if (!currentProduct.hasSleeveOption) {
                    sleeveControl.style.display = 'none';
                }
                
                if (!currentProduct.hasLengthOption) {
                    lengthControl.style.display = 'none';
                }
                
                // Set the active size button in the modal
                sizeButtons.forEach(btn => {
                    if (btn.dataset.size === productSize) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        }
        
        // Set up event listeners
        setupEventListeners();
    }
    
    // Create color swatches based on product colors
    function createColorSwatches(colors) {
        colorOptions.innerHTML = '';
        
        colors.forEach((color, index) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            
            if (index === 0) {
                swatch.classList.add('active');
            }
            
            swatch.addEventListener('click', function() {
                // Remove active class from all swatches
                document.querySelectorAll('.color-swatch').forEach(s => {
                    s.classList.remove('active');
                });
                
                // Add active class to clicked swatch
                this.classList.add('active');
                
                // In a real app, this would update the image with the selected color
                // For demo, we'll add a slight hue to show something changed
                applyColorFilter(color);
            });
            
            colorOptions.appendChild(swatch);
        });
    }
    
    // Apply a color filter to simulate color change (in a real app, this would be AI-generated)
    function applyColorFilter(color) {
        // Convert hex to RGB
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        // Apply a slight filter to indicate color change
        resultImage.style.filter = `sepia(0.2) hue-rotate(${(r + g + b) % 360}deg) saturate(1.5)`;
        
        // Reset after a brief delay to avoid permanent changes to our placeholder
        setTimeout(() => {
            resultImage.style.filter = '';
        }, 300);
        
        // Show loading indicator for more realistic experience
        resultImage.style.opacity = 0.7;
        setTimeout(() => {
            resultImage.style.opacity = 1;
        }, 500);
    }
    
    // Set up all event listeners
    function setupEventListeners() {
        // Zoom in button
        zoomInBtn.addEventListener('click', function() {
            if (scale < 2) {
                scale += 0.1;
                applyTransform();
            }
        });
        
        // Zoom out button
        zoomOutBtn.addEventListener('click', function() {
            if (scale > 0.5) {
                scale -= 0.1;
                applyTransform();
            }
        });
        
        // Rotate left button
        rotateLeftBtn.addEventListener('click', function() {
            rotation -= 90;
            applyTransform();
        });
        
        // Rotate right button
        rotateRightBtn.addEventListener('click', function() {
            rotation += 90;
            applyTransform();
        });
        
        // Reset view button
        resetViewBtn.addEventListener('click', function() {
            scale = 1;
            rotation = 0;
            applyTransform();
        });
        
        // Compare toggle
        compareToggle.addEventListener('change', function() {
            if (this.checked) {
                resultImage.src = originalImageSrc;
            } else {
                resultImage.src = virtualTryOnSrc;
            }
        });
        
        // Fit slider
        fitSlider.addEventListener('input', function() {
            // In a real app, this would adjust the fit of the clothing
            // For demo, we'll simulate by slightly scaling the image horizontally
            const fitScale = 0.8 + (this.value * 0.05);
            resultImage.style.transform = `scaleX(${fitScale})`;
            
            // Reset after a brief delay
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                resultImage.style.transform = '';
                applyTransform();
            }, 500);
        });
        
        // Length slider and Sleeve slider would work similarly in a real app
        // For demo, we'll just show loading indicator
        lengthSlider.addEventListener('input', showAdjustmentFeedback);
        sleeveSlider.addEventListener('input', showAdjustmentFeedback);
        
        // Change size button
        changeSizeBtn.addEventListener('click', function() {
            sizeModal.style.display = 'block';
        });
        
        // Size modal close button
        closeModal.addEventListener('click', function() {
            sizeModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === sizeModal) {
                sizeModal.style.display = 'none';
            }
        });
        
        // Size buttons in modal
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Apply size button
        applySizeBtn.addEventListener('click', function() {
            const activeSize = document.querySelector('.size-btn.active').dataset.size;
            sizeDisplay.textContent = activeSize;
            sizeModal.style.display = 'none';
            
            // In a real app, this would regenerate the image with the new size
            // For demo, we'll just show a loading effect
            resultImage.style.opacity = 0.5;
            setTimeout(() => {
                resultImage.style.opacity = 1;
            }, 1000);
        });
        
        // Size chart link
        sizeChartLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Size chart would open in a modal or new window');
        });
        
        // Add to cart button
        addToCartBtn.addEventListener('click', function() {
            const size = sizeDisplay.textContent;
            alert(`Added ${currentProduct.title} (Size: ${size}) to cart!`);
        });
        
        // Save image button
        saveImageBtn.addEventListener('click', function() {
            alert('Image saved to your account/device');
        });
        
        // Try another item button
        tryAnotherBtn.addEventListener('click', function() {
            window.location.href = 'catalog.html';
        });
        
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
    }
    
    // Apply zoom and rotation transformations
    function applyTransform() {
        resultImage.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    }
    
    // Show feedback for adjustments
    function showAdjustmentFeedback() {
        // Simulate loading while "AI" processes the adjustment
        resultImage.style.opacity = 0.7;
        setTimeout(() => {
            resultImage.style.opacity = 1;
        }, 500);
    }
    
    // Initialize the page
    init();
}); 