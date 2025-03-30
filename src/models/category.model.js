 const mongoose = require('mongoose');
 
 const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pictureURL: {
        type: String,
        required: true
    },
 }, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);