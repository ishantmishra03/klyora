import express from 'express';
const paymentRouter = express.Router();
import { } from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js"

export default paymentRouter;