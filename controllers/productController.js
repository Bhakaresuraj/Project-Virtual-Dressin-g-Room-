/**
 * Product Controller
 * Handles all product-related routes
 */

const Product = require('../models/Product');

// Get all products
exports.getAllProducts = (req, res) => {
    const category = req.query.category;
    let products;
    
    if (category) {
        products = Product.filterByCategory(category);
    } else {
        products = Product.getAll();
    }
    
    res.json(products);
};

// Get a single product by ID
exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = Product.findById(productId);
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
};

// Get product recommendations (similar products)
exports.getProductRecommendations = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = Product.findById(productId);
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    // Get products in the same category (excluding the current product)
    const category = product.category.split('•')[1].trim();
    const similarProducts = Product.getAll()
        .filter(p => p.id !== productId && p.category.includes(category))
        .slice(0, 3); // Limit to 3 recommendations
    
    res.json(similarProducts);
}; 