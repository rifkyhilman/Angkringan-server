const express = require('express');
const router = express.Router();
const { 
    createCategory, 
    getAllCategories, 
    deleteCategory, 
    editCategory, 
    getCategoryById 
} = require('../controllers/category.controller');

const { 
    createProduct, 
    getAllProducts, 
    deleteProduct, 
    editProduct, 
    getProductById 
} = require('../controllers/product.controller');

router.post('/category', createCategory);
router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById);
router.put('/category/:id', editCategory);
router.delete('/category/:id', deleteCategory);

router.post('/product', createProduct);
router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', editProduct);
router.delete('/product/:id', deleteProduct);


module.exports = router;