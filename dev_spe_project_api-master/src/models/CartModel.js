const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: String,
    items:[{
        product_id: String,
        quantity: Number,
        price: Number,
    }],

});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;