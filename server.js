const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const apiRoutes = require('./api-routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
const processedDir = './uploads/processed';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(processedDir)) {
    fs.mkdirSync(processedDir);
}

// Use API routes
app.use('/api', apiRoutes);

// Serve frontend files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route to handle SPA routing
app.get('*', (req, res, next) => {
    // Check if the request is for an API route
    if (!req.path.startsWith('/api')) {
        // Check if the file exists in the public directory
        const filePath = path.join(__dirname, 'public', req.path);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            return res.sendFile(filePath);
        }
        // If not a file, serve the index.html (for SPA routing)
        return res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    next();
});

// Register error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Virtual Try-On Backend: http://localhost:${PORT}`);
}); 