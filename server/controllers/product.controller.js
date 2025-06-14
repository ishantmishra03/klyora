import Product from '../models/product.models.js';

// API to create a new product
export const addProduct = async (req, res) => {
    try {
        //Get all from frontend
        const { productName, description, price, images, category, subCategory } = req.body;

        //Checks if all present
        if (!productName || !price || !images || !category || !description || !subCategory) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        //Creating new product in DB
        const newProduct = await Product.create({
            productName,
            description,
            price,
            images,
            category,
            subCategory,
        });

        return res.status(201).json({ success: true, message: "Product Added" });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}


//API to delete existing product
export const deleteProduct = async (req, res) => {
    try {
        //Get id from params
        const { id } = req.params;

        //Find product to chekc if exist or not and delete
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, error: 'Product not found' });

        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}


//API to get all Products from DB
export const getAllProducts = async (req, res) => {
    try {
        //Get all products from DB
        const products = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, products });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}


//API to get latest products
export const getLatestProducts = async (req, res) => {
    try {
        //Get latest added Products with limit
        const latestProducts = await Product.find()
            .sort({ createdAt: -1 })
            .limit(count);

        return res.status(200).json({ success: true, latestProducts });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}


//API to get specific product By ID
export const getProductById = async (req, res) => {
    try {
        //Get id fo product frm frontend
        const { id } = req.body;
        //Find product based on id from DB
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({success: true, product});
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}