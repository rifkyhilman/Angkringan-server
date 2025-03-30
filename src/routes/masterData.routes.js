const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/category.controller');
const router = express.Router();

router.post('/category', createCategory);
router.get('/category', getAllCategories);

module.exports = router;