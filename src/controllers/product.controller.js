const mongoose = require('mongoose');
const Product = require('../models/product.model');
const cloudinary = require('../utils/cloudinary');

exports.createProduct = async (req, res) => {
    try {
        const {categoryId, productName, description, quantity, buyPrice, sellPrice, publicId, pictureURL} = req.body;

        if(!categoryId || !productName || !description || !quantity || !buyPrice|| !sellPrice || !publicId  || !pictureURL) {
            return res.status(400).json({
                message: 'categoryId, productName, description, quantity, buyPrice, sellPrice, publicId, pictureURL are required'
              });
        };

        const newProduct = new Product({
            categoryId,
            productName,
            description,
            buyPrice, 
            sellPrice,
            quantity,
            publicId,
            pictureURL
        });
  
        const savedProduct = await newProduct.save();

        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to create product',
          error: error.message
        });
    };
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort('-createdAt');

    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Products not found',
      });
    }

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    };
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, productName, description, quantity, buyPrice, sellPrice, publicId, pictureURL } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    
    const product = await Product.findById(id);

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        categoryId,
        productName,
        description,
        buyPrice, 
        sellPrice,
        quantity,
        publicId,
        pictureURL
      },
      { new: true }
    );

    // Hapus gambar lama dari Cloudinary jika publicId berubah
    if (updatedProduct.publicId !== product.publicId) {
      await cloudinary.uploader.destroy(product.publicId);
    }

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
      const { id } = req.params;

      // Validasi ID format MongoDB
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
      }

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      // Hapus gambar dari Cloudinary (jika ada publicId)
      if (product.publicId) {
        await cloudinary.uploader.destroy(product.publicId);
      }

      // Hapus data dari database
      await Product.findByIdAndDelete(id);

      res.status(200).json({ 
        success: true,
        message: 'Product deleted successfully',
        deletedProduct: Product
      });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deleted product',
      error: error.message,
    });
  };
};