import { useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import {
  Star,
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  X,
  Zap,
} from "lucide-react";
import Loader from "../components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeCartItem,
  fetchCart,
} from "../redux/slices/cartSlice";

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];
  //Check if in cart or not
  const isInCart = (productId) => {
    return cartItems.some((item) => item.product._id === productId);
  };
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const buyNow = () => {
    alert("Redirecting to checkout...");
  };

  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/product/by-id", { id });
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error.message);
    }
  },[id]);


  const handleCartToggle = async () => {
    if (isInCart(id)) {
      await dispatch(removeCartItem(id));
      dispatch(fetchCart());
    } else {
      await dispatch(addToCart(id));
      dispatch(fetchCart());
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (!product) return <Loader />;

  return (
    <div className="min-h-screen bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-lavender-tint to-cool-gray/30 rounded-3xl overflow-hidden group">
              <img
                src={product.images?.[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <div className="absolute top-6 left-6">
                  <span className="bg-midnight-blue text-soft-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-soft-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-soft-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={20} className="text-midnight-blue" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev + 1) % product.images.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-soft-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-soft-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={20} className="text-midnight-blue" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-royal-indigo shadow-lg"
                      : "border-cool-gray hover:border-silver-mist"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-medium text-royal-indigo bg-royal-indigo/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-sm text-silver-mist">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-midnight-blue mb-2">
                {product.name}
              </h1>

              <p className="text-silver-mist mb-4">by {product.brand}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={
                          i < Math.floor(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-medium text-midnight-blue">
                    {product.rating}
                  </span>
                </div>
                <span className="text-silver-mist">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-midnight-blue">
                ${product.price}
              </span>
              <span className="text-xl text-silver-mist line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Save ${product.originalPrice - product.price}
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <Check size={16} className="text-green-500" />
                  <span className="text-green-600 font-medium">In Stock</span>
                  <span className="text-silver-mist">
                    ({product.stockCount} available)
                  </span>
                </>
              ) : (
                <>
                  <X size={16} className="text-red-500" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCartToggle}
                  disabled={!product.inStock}
                  className={`flex-1 ${
                    isInCart(id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-midnight-blue hover:bg-royal-indigo"
                  } text-soft-white px-6 py-4 rounded-full  transition-all duration-300 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  <ShoppingBag size={18} />
                  {isInCart(id) ? (
                    <span>Remove From Cart</span>
                  ) : (
                    <span>Add To Cart</span>
                  )}
                </button>
                <button
                  onClick={buyNow}
                  disabled={!product.inStock}
                  className="flex-1 bg-royal-indigo text-soft-white px-6 py-4 rounded-full hover:bg-midnight-blue transition-all duration-300 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Zap size={18} />
                  <span>Buy Now</span>
                </button>
              </div>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-full border-2 border-cool-gray text-midnight-blue px-6 py-4 rounded-full hover:border-royal-indigo hover:bg-lavender-tint transition-all duration-300 font-medium flex items-center justify-center space-x-2"
              >
                <Heart
                  size={18}
                  className={isFavorite ? "fill-current text-red-500" : ""}
                />
                <span>
                  {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

export default Product;
