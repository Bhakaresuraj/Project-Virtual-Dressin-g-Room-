# VirtualFit Backend

This is the backend server for the VirtualFit virtual try-on platform, which allows users to virtually try on clothing items using AI technology.

## Features

- RESTful API for product catalog
- Image upload handling
- Virtual try-on processing (simulated)
- User saved try-ons
- Error handling and logging

## Technology Stack

- Node.js
- Express.js
- Multer for file uploads
- MVC architecture

## Installation

1. Clone the repository:
```
git clone <repository-url>
cd virtualfit-backend
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product by ID
- `GET /api/products/:id/recommendations` - Get product recommendations

### File Upload

- `POST /api/upload` - Upload a photo (multipart/form-data with field name 'photo')
- `DELETE /api/upload/:filename` - Delete an uploaded file

### Virtual Try-On

- `POST /api/tryon` - Process a virtual try-on
- `POST /api/tryon/save` - Save a try-on result to a user's account
- `GET /api/users/:userId/tryons` - Get all saved try-ons for a user
- `DELETE /api/users/:userId/tryons/:tryOnId` - Delete a saved try-on

## Environment Variables

- `PORT` - Port number (default: 3000)
- `NODE_ENV` - Environment (development, production)

## Project Structure

```
virtualfit-backend/
├── controllers/         # Request handlers
│   ├── productController.js
│   ├── tryonController.js
│   └── uploadController.js
├── middleware/          # Custom middleware
│   └── errorHandler.js
├── models/              # Data models
│   ├── Product.js
│   └── User.js
├── uploads/             # Uploaded files
│   └── processed/       # Processed try-on images
├── public/              # Static frontend files
├── api-routes.js        # API route definitions
├── server.js            # Main server file
└── package.json         # Project metadata
```

## Integration with Frontend

The backend serves the frontend files from the `public` directory and provides API endpoints for all frontend functionality.

## Future Enhancements

- Database integration (MongoDB, PostgreSQL)
- Authentication with JWT
- Actual AI image processing for try-on
- Cloud storage for images
- Performance optimizations

## License

MIT
