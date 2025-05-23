document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters to get product info
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productSize = params.get('size') || 'L';
    
    // DOM Elements
    const uploadArea = document.getElementById('upload-area');
    const uploadInstructions = document.getElementById('upload-instructions');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const tryOnBtn = document.getElementById('try-on-btn');
    const changePhotoBtn = document.getElementById('change-photo-btn');
    const selectedClothingImg = document.getElementById('selected-clothing');
    const selectedItemTitle = document.getElementById('selected-item-title');
    const selectedItemCategory = document.getElementById('selected-item-category');
    const selectedItemSize = document.getElementById('selected-item-size');
    
    // Sample product data (in a real app, you'd fetch this from a server)
    const products = [
        {
            id: 1,
            title: "Classic White Shirt",
            category: "Men • Formal • Shirt",
            image: "images/minimalist white shirt.jpeg"
        },
        {
            id: 2,
            title: "Blue Denim Jeans",
            category: "Men • Casual • Pants",
            image: "images/modern blue jense.jpeg"
        },
        {
            id: 3,
            title: "Red Cocktail Dress",
            category: "Women • Formal • Dress",
            image: "images/read vinttage derss.jpeg"
        },
        {
            id: 4,
            title: "Black Blazer",
            category: "Men • Formal • Jacket",
            image: "images/classic black suit.jpeg"
        },
        {
            id: 5,
            title: "Floral Summer Dress",
            category: "Women • Casual • Dress",
            image: "images/Summer_dress.webp"
        },
        {
            id: 6,
            title: "Green T-Shirt",
            category: "Unisex • Casual • Shirt",
            image: "images/green athelatic shirt.jpeg"
        },
        {
            id: 7,
            title: "Blue Formal Blezar",
            category: "Women • Formal • Jacket",
            image: "images/classic blue blazer.jpeg"
        },
        {
            id: 8,
            title: "Blue Sport Joggers",
            category: "Unisex • Sports • Pants",
            image: "images/blue_jogger.jpeg"
        },
        {
            id: 9,
            title: "Casual T-shirt",
            category: "Unisex • Casual • Shirt",
            image: "images/T_shirt.webp"
        },
        {
            id: 10,
            title: "Stylish Casual Shirt",
            category: "Men • Casual • Shirt",
            image: "images/Shirt.webp"
        }
    ];
    
    // Set selected item information if product ID is provided
    if (productId) {
        const product = products.find(p => p.id == productId);
        if (product) {
            selectedClothingImg.src = product.image;
            selectedItemTitle.textContent = product.title;
            selectedItemCategory.textContent = product.category;
            selectedItemSize.innerHTML = `Selected Size: <span>${productSize}</span>`;
        }
    } else {
        // If no product is selected, redirect back to catalog
        window.location.href = 'catalog.html';
    }
    
    // Click event for browse button
    browseBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    // File input change event
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    // Drag and drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        uploadInstructions.classList.add('drag-over');
    }
    
    function unhighlight() {
        uploadInstructions.classList.remove('drag-over');
    }
    
    uploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    // Handle the selected files
    function handleFiles(files) {
        if (files.length === 0) return;
        
        const file = files[0];
        
        // Check if the file is an image
        if (!file.type.match('image.*')) {
            alert('Please select an image file (JPEG or PNG).');
            return;
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size exceeds 10MB. Please select a smaller file.');
            return;
        }
        
        // Preview the image
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadInstructions.style.display = 'none';
            previewContainer.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
    
    // Change photo button click
    changePhotoBtn.addEventListener('click', function() {
        previewContainer.style.display = 'none';
        uploadInstructions.style.display = 'flex';
        fileInput.value = ''; // Clear the file input
    });
    
    // Try it on button click
    tryOnBtn.addEventListener('click', function() {
        // Show loading message while "processing"
        alert('Processing your image with AI... (This would take a few seconds in a real application)');
        
        // Redirect to the result page with product info
        setTimeout(() => {
            window.location.href = `result.html?id=${productId}&size=${productSize}`;
        }, 1000);
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
}); 