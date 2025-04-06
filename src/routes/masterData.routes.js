const express = require('express');
const { createCategory, getAllCategories, deleteCategory } = require('../controllers/category.controller');
const router = express.Router();

router.post('/category', createCategory);
router.get('/category', getAllCategories);
router.delete('/category/:id', deleteCategory);

module.exports = router;