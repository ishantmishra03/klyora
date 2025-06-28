import { useSelector, useDispatch } from "react-redux";
import {
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
  fetchCart,
} from "../../redux/slices/cartSlice";
import { Star, Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items ?? []);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const fetchCart1 = () => {
    dispatch(fetchCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft-white p-6">
        <h2 className="text-3xl font-serif font-bold text-midnight-blue mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-silver-mist mb-6">
          Looks like you haven't added any products yet.
        </p>
        <Link
          to="/"
          className="bg-midnight-blue text-soft-white px-6 py-3 rounded-full hover:bg-royal-indigo transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-serif font-bold text-midnight-blue mb-8">
        Your Cart ({cartItems.length}{" "}
        {cartItems.length === 1 ? "item" : "items"})
      </h1>

      <div className="space-y-6">
        {cartItems.map(({ product, quantity }) => {
          if (!product || !product._id) return null;
          return (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row bg-soft-white border border-cool-gray rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Product Image */}
              <Link
                to={`/product/${product._id}`}
                className="sm:w-40 h-40 sm:h-auto flex-shrink-0 overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Details */}
              <div className="flex flex-col justify-between flex-1 p-4">
                {/* Product Name & Category */}
                <div>
                  <Link
                    to={`/product/${product._id}`}
                    className="font-semibold text-midnight-blue text-lg hover:text-royal-indigo transition"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-1 text-xs font-medium text-royal-indigo bg-royal-indigo/10 inline-block px-2 py-1 rounded-full">
                    {product.category}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={
                          i < Math.floor(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                    <span className="text-xs text-silver-mist ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Quantity Controls and Price */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={async () => {
                        await dispatch(decrementCartItem(product._id));
                        await fetchCart1();
                      }}
                      disabled={quantity <= 1}
                      className="p-2 rounded-full border border-cool-gray hover:bg-lavender-tint disabled:opacity-50 disabled:cursor-not-allowed transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} className="text-midnight-blue" />
                    </button>
                    <span className="text-lg font-semibold text-midnight-blue">
                      {quantity}
                    </span>
                    <button
                      onClick={async () => {
                        await dispatch(incrementCartItem(product._id));
                        await fetchCart1();
                      }}
                      className="p-2 rounded-full border border-cool-gray hover:bg-lavender-tint transition"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} className="text-midnight-blue" />
                    </button>
                  </div>

                  <div className="text-lg font-bold text-midnight-blue">
                    ${(product.price * quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={async () => {
                      await dispatch(removeCartItem(product._id));
                      fetchCart1();
                    }}
                    className="p-2 rounded-full text-red-600 hover:bg-red-100 transition"
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-12 border-t border-cool-gray pt-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-xl font-semibold text-midnight-blue">
          Total: ${totalPrice.toFixed(2)}
        </div>
        <button
          className="mt-4 sm:mt-0 bg-midnight-blue text-soft-white px-8 py-3 rounded-full hover:bg-royal-indigo font-medium cursor-pointer hover:scale-105 transition-all"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
