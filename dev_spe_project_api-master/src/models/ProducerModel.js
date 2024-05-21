const mongoose = require('mongoose');

const ProducerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone_number: String,
    address:{
        street: String,
        city: String,
        postal_code: String,
        country: String
    },
});

const Producer = mongoose.model('Producer', ProducerSchema);

module.exports = Producer;