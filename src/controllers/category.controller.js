const Category = require('../models/category.model');

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