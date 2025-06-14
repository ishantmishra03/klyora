import express from 'express';
const orderRouter = express.Router();
import { } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js"

export default orderRouter;