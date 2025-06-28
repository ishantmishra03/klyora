import Stripe from "stripe";
import Order from "../models/order.models.js";
import User from "../models/user.models.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const customerEmail = session.customer_email;

      // Find user by email
      const user = await User.findOne({ email: customerEmail });

      // Parse metadata (sent when creating session)
      const products = JSON.parse(session.metadata.products);
      const totalPrice = Number(session.metadata.totalPrice);
      const address = session.customer_details.address;

      // Create new order with isPaid = true
      const newOrder = await Order.create({
        customerName: session.customer_details.name,
        customerEmail,
        customerPhone: session.customer_details.phone || "",
        address,
        paymentMethod: "Stripe",
        products,
        totalPrice,
        isPaid: true,
      });

      // Add order to user and clear their cart
      if (user) {
        user.orders.push(newOrder._id);
        user.cart = [];          // <-- Clear user's cart here
        await user.save();
      }
    } catch (error) {
      console.error("Order creation failed after payment:", error.message);
      return res.status(500).send("Webhook processing error");
    }
  }

  res.status(200).send("Webhook received");
};
