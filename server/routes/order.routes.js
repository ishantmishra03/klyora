import express from 'express';
const orderRouter = express.Router();
import { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

orderRouter.post('/create', protect, isAdmin, createOrder);
orderRouter.get('/my-orders', protect, getMyOrders);
orderRouter.get('/all', protect, isAdmin, getAllOrders); 
orderRouter.get('/get-order-byId', protect, getOrderById);
orderRouter.put('/status', protect, isAdmin, updateOrderStatus);
orderRouter.delete('/delete', protect, isAdmin, deleteOrder);

export default orderRouter;