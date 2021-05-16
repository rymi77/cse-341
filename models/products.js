const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    featured: String,
    category: String,
    title: String,
    imageUrl: String,
    price: Number,
    summary: String,
    description: String
});

module.exports = mongoose.model('Product', productSchema);