const express = require('express');
const router = express.Router();
const { 
    createCategory, 
    getAllCategories, 
    deleteCategory, 
    editCategory, 
    getCategoryById 
} = require('../controllers/category.controller');

router.post('/category', createCategory);
router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById);
router.put('/category/:id', editCategory);
router.delete('/category/:id', deleteCategory);

module.exports = router;