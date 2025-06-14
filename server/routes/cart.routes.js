import express from 'express';
const cartRouter = express.Router();
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

cartRouter.get('/', protect, getCart);
cartRouter.post('/add', protect, addToCart);
cartRouter.post('/remove', protect, removeFromCart);
cartRouter.delete('/clear', protect, clearCart);

export default cartRouter;