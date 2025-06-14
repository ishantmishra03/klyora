import express from 'express';
const productRouter = express.Router();
import { addProduct, deleteProduct, getAllProducts, getLatestProducts, getProductById } from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

productRouter.post('/', protect, addProduct);
productRouter.delete('/:id', protect, deleteProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/latest', getLatestProducts);
productRouter.get('/by-id', getProductById);

export default productRouter;