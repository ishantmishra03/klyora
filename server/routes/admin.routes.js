import express from 'express';
const adminRouter = express.Router();
import { protect } from '../middlewares/auth.middleware.js';
import { adminLogin, adminLogout, isAuthenticated } from '../controllers/admin.controller.js';

adminRouter.post('/login', adminLogin);
adminRouter.post('/logout', protect, adminLogout);
adminRouter.get('/isAuth', protect, isAuthenticated);

export default adminRouter;