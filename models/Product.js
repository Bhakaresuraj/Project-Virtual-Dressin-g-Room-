/**
 * Product model
 * In a real application, this would be a database model
 */

class Product {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.category = data.category;
        this.price = data.price;
        this.image = data.image;
        this.hasSleeveOption = data.hasSleeveOption || false;
        this.hasLengthOption = data.hasLengthOption || false;
        this.colors = data.colors || [];
        this.sizes = data.sizes || [];
    }

    // Static method to get all products
    static getAll() {
        return products;
    }

    // Static method to find a product by ID
    static findById(id) {
        return products.find(p => p.id === id);
    }

    // Static method to filter products by category
    static filterByCategory(category) {
        if (!category) return products;
        return products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
}

// Sample product data (in a real app, this would be in a database)
const products = [
    new Product({
        id: 1,
        title: "Classic White Shirt",
        category: "Men • Formal • Shirt",
        price: "$49.99",
        image: "/images/products/white-shirt.jpg",
        hasSleeveOption: true,
        hasLengthOption: true,
        colors: ["#FFFFFF", "#87CEEB", "#FFB6C1", "#98FB98"],
        sizes: ["S", "M", "L", "XL"]
    }),
    new Product({
        id: 2,
        title: "Blue Denim Jeans",
        category: "Men • Casual • Pants",
        price: "$59.99",
        image: "/images/products/blue-jeans.jpg",
        hasSleeveOption: false,
        hasLengthOption: true,
        colors: ["#1E90FF", "#000000", "#808080"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    }),
    new Product({
        id: 3,
        title: "Red Cocktail Dress",
        category: "Women • Formal • Dress",
        price: "$79.99",
        image: "/images/products/red-dress.jpg",
        hasSleeveOption: false,
        hasLengthOption: true,
        colors: ["#FF0000", "#000000", "#8A2BE2"],
        sizes: ["XS", "S", "M", "L"]
    }),
    new Product({
        id: 4,
        title: "Black Blazer",
        category: "Men • Formal • Jacket",
        price: "$89.99",
        image: "/images/products/black-blazer.jpg",
        hasSleeveOption: true,
        hasLengthOption: true,
        colors: ["#000000", "#808080", "#4B0082"],
        sizes: ["S", "M", "L", "XL"]
    })
];

module.exports = Product; 