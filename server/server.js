import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import appRouter from './routes/auth.routes.js'

//Configurations
import connectDB from './config/db.config.js';
await connectDB();

//CORS
app.use(cors());

//Middlewares
app.use(express.json());

//Routes
app.use('/api/auth', appRouter);

//CheckUP API
app.get('/', (req, res) => { res.send("Klyora API Working...") });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log(`Server is listening on http://localhost:${PORT}`) });

