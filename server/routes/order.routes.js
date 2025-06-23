import express from 'express';
const orderRouter = express.Router();
import { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from "../controllers/order.controller.js";
import { protect } from "../middlewares/admin.middleware.js";

orderRouter.post('/create', protect, createOrder);
orderRouter.get('/my-orders', protect, getMyOrders);
orderRouter.get('/all', protect, getAllOrders);
orderRouter.get('/get-order-byId', protect, getOrderById);
orderRouter.put('/status', protect, updateOrderStatus);
orderRouter.delete('/delete', protect, deleteOrder);

export default orderRouter;