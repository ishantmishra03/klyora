import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeSession = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // map your cartItems to Stripe line items
    const lineItems = cartItems.map(({ product, quantity }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.images?.[0]],
        },
        unit_amount: Math.round(product.price * 100), // in cents
      },
      quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return res.status(200).json({ session });  // <-- Important: send session object here
  } catch (error) {
    console.error('Stripe session error:', error);
    return res.status(500).json({ error: error.message });
  }
};
