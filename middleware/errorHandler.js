/**
 * Global Error Handler Middleware
 * Used to handle errors consistently throughout the application
 */

exports.errorHandler = (err, req, res, next) => {
    console.error('ERROR:', err.stack);
    
    // Set default error status and message
    const status = err.status || 500;
    const message = err.message || 'Something went wrong on the server';
    
    // Multer specific errors
    if (err.name === 'MulterError') {
        let customMessage = '';
        
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                customMessage = 'File too large. Maximum size is 10MB.';
                break;
            case 'LIMIT_UNEXPECTED_FILE':
                customMessage = 'Unexpected field name in form data.';
                break;
            default:
                customMessage = 'Error uploading file.';
        }
        
        return res.status(400).json({
            success: false,
            error: {
                message: customMessage,
                code: err.code
            }
        });
    }
    
    // Generic file validation errors
    if (err.message.includes('Only image files')) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Please upload a valid image file (jpg, jpeg, or png)',
                code: 'INVALID_FILE_TYPE'
            }
        });
    }
    
    // Handle generic errors
    res.status(status).json({
        success: false,
        error: {
            message: message,
            status: status,
            // Include stack trace in development, not in production
            ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
        }
    });
}; 