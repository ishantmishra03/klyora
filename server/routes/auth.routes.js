import express from 'express';
const authRouter = express.Router();
import { register, login, logout, isAuthenticated } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js"

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', protect, logout);
authRouter.get('/isAuth', protect, isAuthenticated);


export default authRouter;