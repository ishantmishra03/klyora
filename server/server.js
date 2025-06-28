import express from 'express';
const app = express();
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { stripeWebhook } from "./controllers/webhook.controller.js";

import authRouter from './routes/auth.routes.js'
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';
import paymentRouter from './routes/payment.routes.js';
import adminRouter from './routes/admin.routes.js';

import connectDB from './config/db.config.js';
await connectDB();

// CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ⚠️ Stripe Webhook BEFORE any body parser
app.use("/api/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Standard Middleware AFTER webhook
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/admin', adminRouter);

// Root route
app.get('/', (req, res) => { res.send("Klyora API Working...") });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log(`Server is listening on http://localhost:${PORT}`) });
