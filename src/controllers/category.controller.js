const Category = require('../models/category.model');
const mongoose = require('mongoose');

exports.createCategory = async (req, res) => {
    try {
        const { categoryName, description, pictureURL} = req.body;

        if(!categoryName || !description || !pictureURL) {
            return res.status(400).json({
                message: 'categoryName, description, pictureURL are required'
              });
        };

        const newCategory = new Category({
            categoryName,
            description,
            pictureURL
        });
  
        const savedCategory = await newCategory.create();

        res.status(200).json({
            success: true,
            message: 'Category created successfully',
            data: savedCategory
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to create category',
          error: error.message
        });
    };
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort('-createdAt');

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories',
      error: error.message
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
      const { id } = req.params;

      // Validasi ID format MongoDB
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }

      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json({ 
        message: 'Category deleted successfully',
        deletedCategory 
      });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories',
      error: error.message
    });
  }
}