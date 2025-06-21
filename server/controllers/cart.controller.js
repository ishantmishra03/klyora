import User from '../models/user.models.js';
import Product from '../models/product.models.js';

//Add Product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const exists = user.cart.find(item => item.product.toString() === productId);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Product already in cart' });
    }

    user.cart.push({ product: productId, quantity: 1 });
    await user.save();

    res.status(200).json({ success: true, message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 2. Increment Quantity
export const incrementCartItem = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const item = user.cart.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    item.quantity += 1;
    await user.save();

    res.status(200).json({ success: true, message: 'Quantity incremented', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 3. Decrement Quantity (and remove if 0)
export const decrementCartItem = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    if (user.cart[itemIndex].quantity <= 1) {
      user.cart.splice(itemIndex, 1); // remove item
    } else {
      user.cart[itemIndex].quantity -= 1;
    }

    await user.save();

    res.status(200).json({ success: true, message: 'Quantity updated', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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