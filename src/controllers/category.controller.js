const mongoose = require('mongoose');
const Category = require('../models/category.model');
const cloudinary = require('../utils/cloudinary');

exports.createCategory = async (req, res) => {
    try {
        const { categoryName, description, publicId, pictureURL} = req.body;

        if(!categoryName || !description || !publicId || !pictureURL) {
            return res.status(400).json({
                message: 'categoryName, description, publicId, pictureURL are required'
              });
        };

        const newCategory = new Category({
            categoryName,
            description,
            publicId,
            pictureURL
        });
  
        const savedCategory = await newCategory.save();

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
        return res.status(400).json({ success: false, message: 'Invalid category ID' });
      }

      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      // Hapus gambar dari Cloudinary (jika ada publicId)
      if (category.publicId) {
        await cloudinary.uploader.destroy(category.publicId);
      }

      // Hapus data dari database
      await Category.findByIdAndDelete(id);

      res.status(200).json({ 
        success: true,
        message: 'Category deleted successfully',
        deletedCategory: category
      });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deleted categories',
      error: error.message,
    });
  }
}