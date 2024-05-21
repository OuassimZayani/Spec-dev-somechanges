const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    address:{
        street: String,
        city: String,
        postal_code: String,
        country: String
    },
    is_admin: Boolean,
    firstname: String,  
    lastname: String,
    phone_number: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;