import Order from '../models/order.models.js';
import User from '../models/user.models.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, address, paymentMethod, products, totalPrice } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !address || !paymentMethod || !products || !totalPrice) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newOrder = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      address,
      paymentMethod,
      products,
      totalPrice,
    });

    // Add order to user's order history
    const user = await User.findById(req.userId);
    if (user) {
      user.orders.push(newOrder._id);
      await user.save();
    }

    return res.status(201).json({ success: true, message : "Order Placed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate('products.product');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get orders for logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'orders',
      populate: { path: 'products.product' },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, orders: user.orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.body;
    const { status } = req.body;

    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    await Order.findByIdAndDelete(orderId);

    return res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
