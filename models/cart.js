const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productId: String,
    title: String,
    price: Number,
    user: String
});

module.exports = mongoose.model('Cart', cartSchema);