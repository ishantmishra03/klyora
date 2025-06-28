import { ShoppingBag, MapPin, CreditCard } from "lucide-react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../config/axios";
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items ?? []);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleStripeCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const response = await axios.post("/api/payment/create-checkout-session", {
        cartItems,
      });

      const session = response.data.session;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      toast.error("Failed to redirect to Stripe Checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-soft-white text-midnight-blue">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Your Order</h2>
          <div className="space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex items-center justify-between border rounded-2xl p-4 shadow-sm bg-lavender-tint/40"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.images?.[0]}
                    alt="Product"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-base">{product.name}</h4>
                    <p className="text-silver-mist text-sm">
                      {quantity} x ${product.price}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-midnight-blue">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-silver-mist">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-silver-mist">Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(totalPrice + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping + Payment */}
        <div className="lg:col-span-2 space-y-10">
          {/* Shipping Address */}
          <div className="bg-lavender-tint/50 p-6 rounded-3xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <MapPin size={18} />
              <span>Shipping Address</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="input" />
              <input type="text" placeholder="Phone Number" className="input" />
              <input type="email" placeholder="Email Address" className="input" />
              <input type="text" placeholder="Zip / Postal Code" className="input" />
              <input type="text" placeholder="Street Address" className="input sm:col-span-2" />
              <input type="text" placeholder="City" className="input" />
              <input type="text" placeholder="Country" className="input" />
            </div>
          </div>

          {/* Stripe Payment */}
          <div className="bg-lavender-tint/50 p-6 rounded-3xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <CreditCard size={18} />
              <span>Payment</span>
            </h3>
            <div className="text-right">
              <button
                onClick={handleStripeCheckout}
                className="bg-midnight-blue hover:bg-royal-indigo text-soft-white px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <ShoppingBag size={20} />
                <span>Pay with Stripe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
