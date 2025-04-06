/**
 * Try-On Controller
 * Handles all virtual try-on related functionality
 */

const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const User = require('../models/User');

// Process the virtual try-on
exports.processTryOn = (req, res) => {
    const { productId, photoId, size, adjustments } = req.body;
    
    // Validate input
    if (!productId || !photoId) {
        return res.status(400).json({ message: 'Product ID and photo ID are required' });
    }
    
    const product = Product.findById(parseInt(productId));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if the photo exists
    const photoPath = path.join(__dirname, '..', 'uploads', photoId);
    if (!fs.existsSync(photoPath)) {
        return res.status(404).json({ message: 'Photo not found' });
    }
    
    // In a real application, this would:
    // 1. Use ML models for image segmentation
    // 2. Apply pose estimation
    // 3. Use GANs to generate the try-on result
    
    // For this demo, we'll simulate processing time and return a mock result
    setTimeout(() => {
        // Create a unique result ID
        const resultId = `result-${productId}-${Date.now()}.jpg`;
        const resultPath = path.join('processed', resultId);
        const fullResultPath = path.join(__dirname, '..', 'uploads', 'processed', resultId);
        
        // In a real app, we'd create an actual image here
        // For demo, we'll just copy the original photo to simulate
        try {
            fs.copyFileSync(photoPath, fullResultPath);
        } catch (error) {
            console.error('Error creating result image:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Error processing image' 
            });
        }
        
        // Return either JSON response or redirection based on client preference
        const responseFormat = req.query.format || 'json';
        
        if (responseFormat === 'redirect') {
            // Redirect to the result page with the resultId and product info
            const redirectUrl = `/result.html?resultId=${resultId}&productId=${productId}`;
            if (size) redirectUrl += `&size=${size}`;
            
            return res.json({
                success: true,
                redirect: redirectUrl
            });
        } else {
            // Default JSON response for API clients
            const mockResult = {
                success: true,
                message: 'Virtual try-on processed successfully',
                resultId: resultId,
                resultImageUrl: `/uploads/${resultPath}`,
                resultPageUrl: `/result.html?resultId=${resultId}&productId=${productId}${size ? '&size='+size : ''}`,
                processingTime: '2.3 seconds',
                aiTechnologies: {
                    segmentation: true,
                    poseEstimation: true,
                    gan: true
                },
                // Include product details for convenience
                product: {
                    id: product.id,
                    title: product.title,
                    size: size || 'L'
                }
            };
            
            res.json(mockResult);
        }
    }, 3000); // Simulate 3 seconds of processing
};

// Save a try-on result to a user's account
exports.saveTryOnResult = (req, res) => {
    const { userId, productId, resultId, adjustments } = req.body;
    
    if (!userId || !productId || !resultId) {
        return res.status(400).json({ 
            message: 'User ID, product ID, and result ID are required' 
        });
    }
    
    const user = User.findById(parseInt(userId));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    // Save the try-on to the user's account
    const savedTryOn = user.saveTryOn({
        productId: parseInt(productId),
        resultImageUrl: `/uploads/processed/${resultId}`,
        adjustments: adjustments || {}
    });
    
    res.json({
        success: true,
        message: 'Try-on result saved to your account',
        savedTryOn: savedTryOn
    });
};

// Get all saved try-ons for a user
exports.getUserTryOns = (req, res) => {
    const userId = parseInt(req.params.userId);
    
    const user = User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    // Get all saved try-ons
    const savedTryOns = user.getSavedTryOns();
    
    // Enhance with product details
    const enhancedTryOns = savedTryOns.map(tryOn => {
        const product = Product.findById(tryOn.productId);
        return {
            ...tryOn,
            product: product ? { 
                title: product.title,
                category: product.category,
                price: product.price
            } : { title: 'Unknown Product' }
        };
    });
    
    res.json(enhancedTryOns);
};

// Delete a saved try-on
exports.deleteTryOn = (req, res) => {
    const userId = parseInt(req.params.userId);
    const tryOnId = parseInt(req.params.tryOnId);
    
    const user = User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    const deleted = user.deleteTryOn(tryOnId);
    
    if (deleted) {
        res.json({ 
            success: true, 
            message: 'Try-on deleted successfully' 
        });
    } else {
        res.status(404).json({ 
            success: false, 
            message: 'Try-on not found' 
        });
    }
}; 