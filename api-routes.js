const express = require('express');
const router = express.Router();

// Import controllers
const productController = require('./controllers/productController');
const uploadController = require('./controllers/uploadController');
const tryonController = require('./controllers/tryonController');

// Product routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/:id/recommendations', productController.getProductRecommendations);

// Upload routes
router.post('/upload', uploadController.upload.single('photo'), uploadController.handleFileUpload);
router.delete('/upload/:filename', uploadController.deleteFile);

// Try-on routes
router.post('/tryon', tryonController.processTryOn);
router.post('/tryon/save', tryonController.saveTryOnResult);
router.get('/users/:userId/tryons', tryonController.getUserTryOns);
router.delete('/users/:userId/tryons/:tryOnId', tryonController.deleteTryOn);

// Serve uploaded files
router.use('/uploads', express.static('uploads'));

module.exports = router; 