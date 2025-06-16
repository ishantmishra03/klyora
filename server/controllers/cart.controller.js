import User from '../models/user.models.js';
import Product from '../models/product.models.js';

//Add Product to cart
export const addToCart = async (req, res) => {
    try {
        //Get productId to add in cart from frontend
        //Actions like ( increment ) and ( decrement ) if already exists in cart
        const { productId, action = 'increment' } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        //Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        //Gets current loggeda\In user
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        //Checks if exist in cart or not
        const cartItem = user.cart.find((item) => item.product.toString() === productId);

        //Conditions if in cart
        if (cartItem) {
            if (action === 'increment') {
                cartItem.quantity += 1;
            } else if (action === 'decrement') {
                cartItem.quantity -= 1;
                //Remove from cart if quantity <= 0
                if (cartItem.quantity <= 0) {
                    user.cart = user.cart.filter((item) => item.product.toString() !== productId);
                }
            } else {
                return res.status(400).json({ success: false, message: 'Invalid action' });
            }
        } else {
            if (action === 'decrement') {
                return res.status(400).json({ success: false, message: 'Product not in cart to decrement' });
            }
            //Adds to cart
            user.cart.push({ product: productId, quantity: 1 });
        }

        await user.save();

        return res.status(200).json({ success: true, message: 'Cart updated', cart: user.cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


//Remove Product from Cart
export const removeFromCart = async (req, res) => {
    try {
        //Get pridctId to remove from frontend
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        //Get user who is loggedIn
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const initialLength = user.cart.length; //Length of cart

        //Filter products and remove one with ( productId )
        user.cart = user.cart.filter(
            (item) => item.product.toString() !== productId
        );

        //Checks if in cart or not
        if (user.cart.length === initialLength) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        await user.save();

        return res.status(200).json({ success: true, message: 'Removed from Cart' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


//Get Current User's cart 
export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('cart.product');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


//Clear Cart
export const clearCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        user.cart = [];
        await user.save();

        res.status(200).json({ success: true, message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};