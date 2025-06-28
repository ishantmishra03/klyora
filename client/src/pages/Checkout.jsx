import { useState } from "react";
import { useSelector } from "react-redux";
import { CreditCard, MapPin, ShoppingBag } from "lucide-react";
import {toast} from "react-hot-toast";
import axios from "../config/axios";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items ?? []);

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStripePayment = async () => {
    const fullAddress = `${form.address}, ${form.city}, ${form.country} - ${form.zip}`.trim();

    if (
      !form.customerName ||
      !form.customerEmail ||
      !form.customerPhone ||
      !form.address ||
      !form.city ||
      !form.country ||
      !form.zip
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    const products = cartItems.map(({ product, quantity }) => ({
      productId: product._id,
      quantity,
    }));

    try {
      setLoading(true);
      const {data} = await axios.post(
        "/api/order/create",
        {
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          address: fullAddress,
          paymentMethod: "Stripe",
          products,
          totalPrice: totalPrice + 5,
        }
      );

      toast.success(data.message);
      // Optional: clear cart or navigate to order summary
    } catch (err) {
      toast.error(err.message || "Order failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-white text-midnight-blue">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Order Summary */}
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
                      {quantity} × ${product.price}
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
            <div className="flex justify-between text-silver-mist">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-silver-mist">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(totalPrice + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-10">
          {/* Shipping Form */}
          <div className="bg-lavender-tint/50 p-6 rounded-3xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <MapPin size={18} />
              <span>Shipping Address</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
  name="customerName"
  value={form.customerName}
  onChange={handleChange}
  type="text"
  placeholder="Full Name"
  className="w-full px-4 py-3 rounded-xl border border-cool-gray bg-soft-white text-midnight-blue placeholder-silver-mist focus:outline-none focus:ring-2 focus:ring-royal-indigo"
/>

<input
  name="customerPhone"
  value={form.customerPhone}
  onChange={handleChange}
  type="text"
  placeholder="Phone Number"
  className="w-full px-4 py-3 rounded-xl border border-cool-gray bg-soft-white text-midnight-blue placeholder-silver-mist focus:outline-none focus:ring-2 focus:ring-royal-indigo"
/>

<input
  name="customerEmail"
  value={form.customerEmail}
  onChange={handleChange}
  type="email"
  placeholder="Email Address"
  className="w-full px-4 py-3 rounded-xl border border-cool-gray bg-soft-white text-midnight-blue placeholder-silver-mist focus:outline-none focus:ring-2 focus:ring-royal-indigo"
/>

<input
  name="zip"
  value={form.zip}
  onChange={handleChange}
  type="text"
  placeholder="Zip / Postal Code"
  className="w-full px-4 py-3 rounded-xl border border-cool-gray bg-soft-white text-midnight-blue placeholder-silver-mist focus:outline-none focus:ring-2 focus:ring-royal-indigo"
/>

<input
  name="address"
  value={form.address}
  onChange={handleChange}
  type="text"
  placeholder="Street Address"
  className="w-full px-4 py-3 rounded-xl border border-cool-gray bg-soft-white text-midnight-blue placeholder-silver-mist focus:outline-none focus:ring-2 focus:ring-royal-indigo"
/>

<input
  name="city"
  value={form.city}
  onChange={handleChange}
  type="text"
  placeholder="City"
  className="w-full px-4 py-3 rounded-xl border border-cool-gray bg-soft-white text-midnight-blue placeholder-silver-mist focus:outline-none focus:ring-2 focus:ring-royal-indigo"
/>

<input
  name="country"
  value={form.country}
  onChange={handleChange}
  type="text"
  placeholder="Country"
  className="w-full px-4 py-3 rounded-xl border border-cool-gray bg-soft-white text-midnight-blue placeholder-silver-mist focus:outline-none focus:ring-2 focus:ring-royal-indigo"
/>

            </div>
          </div>

          {/* Stripe Payment */}
          <div className="bg-lavender-tint/50 p-6 rounded-3xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <CreditCard size={18} />
              <span>Pay with Stripe</span>
            </h3>
            <p className="text-silver-mist mb-4">
              You'll be redirected to Stripe to complete your secure payment.
            </p>
            <button
              disabled={loading}
              onClick={handleStripePayment}
              className="bg-midnight-blue hover:bg-royal-indigo text-soft-white px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 transition-transform hover:scale-105 disabled:opacity-50"
            >
              <ShoppingBag size={20} />
              <span>{loading ? "Placing Order..." : "Place Order with Stripe"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
