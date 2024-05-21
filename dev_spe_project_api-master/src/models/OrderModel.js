const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: String,
    items:[{
        product_id: String,
        quantity: Number,
        price: Number,
    }],
    total_price: Number,
    order_date: String,

});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;