 const mongoose = require('mongoose');
 
 const productSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number, 
        required: true
    },
    sellPrice: {
        type: Number, 
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    pictureURL: {
        type: String,
        required: true
    },
 }, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);