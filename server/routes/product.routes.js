import express from 'express';
const productRouter = express.Router();
import { } from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js"

export default productRouter;