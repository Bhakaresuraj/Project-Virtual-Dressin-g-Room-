/**
 * Upload Controller
 * Handles all file upload functionality
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        // Generate unique filename with timestamp
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function(req, file, cb) {
    // Accept only image files
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files (jpg, jpeg, png) are allowed!'), false);
    }
    cb(null, true);
};

exports.upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: fileFilter
});

// Handle the upload request
exports.handleFileUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Return information about the uploaded file
    const uploadedFile = {
        id: path.basename(req.file.filename),
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: `/uploads/${req.file.filename}`
    };
    
    res.json({
        success: true,
        message: 'File uploaded successfully',
        file: uploadedFile
    });
};

// Delete uploaded file
exports.deleteFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
    }
    
    try {
        fs.unlinkSync(filePath);
        res.json({ 
            success: true, 
            message: 'File deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting file', 
            error: error.message
        });
    }
}; 