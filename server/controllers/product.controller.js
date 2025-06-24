import Product from '../models/product.models.js';
import imagekit from '../config/imagekit.config.js';

// Add New Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, subCategory, badge, inStock, isNew, onSale } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Ensure images are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload at least one image" });
    }

    // Upload images to ImageKit
    const uploadPromises = req.files.map(file =>
      imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
      })
    );

    const uploadResults = await Promise.all(uploadPromises);
    const images = uploadResults.map(img => img.url);

    // Generate additional fields
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1); 
    const reviews = Math.floor(Math.random() * 200) + 20;

    // Create product
    const newProduct = await Product.create({
      name,
      description,
      price,
      originalPrice: originalPrice || Math.floor(Number(price) + Math.random() * 200),
      images,
      category,
      subCategory,
      rating,
      reviews,
      badge,
      inStock,
      isNew,
      onSale
    });

    return res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Add Product Error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ success: false, error: 'Product not found' });

    return res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Get All Products Error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get Latest Products
export const getLatestProducts = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 4;
    const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(count);

    return res.status(200).json({ success: true, latestProducts });
  } catch (error) {
    console.error('Get Latest Products Error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Get Product By ID Error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
