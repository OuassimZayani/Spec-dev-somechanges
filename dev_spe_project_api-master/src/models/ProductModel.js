const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    stock_quantity: Number,
    producer_id: String,
    image: String,
    cities_available: [String],
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;