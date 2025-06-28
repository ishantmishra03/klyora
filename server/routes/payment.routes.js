import express from "express";
import { createStripeSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", createStripeSession);

export default router;
