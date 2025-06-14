import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js'
import productRouter from './routes/order.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';
import paymentRouter from './routes/payment.routes.js';

//Configurations
import connectDB from './config/db.config.js';
await connectDB();

//CORS
app.use(cors());

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);

//CheckUP API
app.get('/', (req, res) => { res.send("Klyora API Working...") });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log(`Server is listening on http://localhost:${PORT}`) });

