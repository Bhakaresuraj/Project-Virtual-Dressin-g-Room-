/**
 * User model
 * In a real application, this would be a database model with authentication
 */

class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.savedTryOns = data.savedTryOns || [];
    }

    // Add a try-on to user's saved list
    saveTryOn(tryOnData) {
        const tryOn = {
            id: Date.now(), // Simple unique ID based on timestamp
            productId: tryOnData.productId,
            resultImageUrl: tryOnData.resultImageUrl,
            adjustments: tryOnData.adjustments || {},
            savedAt: new Date().toISOString()
        };
        
        this.savedTryOns.push(tryOn);
        return tryOn;
    }

    // Get all saved try-ons for the user
    getSavedTryOns() {
        return this.savedTryOns;
    }

    // Delete a saved try-on
    deleteTryOn(tryOnId) {
        const initialLength = this.savedTryOns.length;
        this.savedTryOns = this.savedTryOns.filter(t => t.id !== tryOnId);
        return this.savedTryOns.length < initialLength;
    }

    // Static helper method for demo (in a real app, users would be in a database)
    static findById(id) {
        return demoUsers.find(u => u.id === id);
    }
}

// Demo users (in a real app, this would be in a database)
const demoUsers = [
    new User({
        id: 1,
        username: "demo_user",
        email: "demo@example.com",
        savedTryOns: []
    })
];

module.exports = User; 