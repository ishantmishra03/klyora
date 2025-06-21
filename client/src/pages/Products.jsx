import { useState, useEffect } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeCartItem, fetchCart } from "../redux/slices/cartSlice";
import {
  Star,
  ShoppingBag,
  Search,
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];
  const isInCart = (productId) => {
    return cartItems.some((item) => item.product._id === productId);
  }
    

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    dispatch(fetchCart());
  }, [dispatch]);

  const categories = [
    "all",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports & Fitness",
    "Beauty & Care",
    "Books & Media",
    "Accessories",
    "Furniture",
  ];

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b._id - a._id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, sortBy, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleCartToggle =  async (productId) => {
    if (isInCart(productId)) {
       await dispatch(removeCartItem(productId));
       dispatch(fetchCart());
    } else {
       await dispatch(addToCart(productId));
       dispatch(fetchCart()); 
    }
  };


  //Pagination
  const Pagination = () => {
    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-12">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-cool-gray hover:bg-lavender-tint disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft size={20} className="text-midnight-blue" />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              page === currentPage
                ? "bg-midnight-blue text-soft-white"
                : page === "..."
                ? "cursor-default text-silver-mist"
                : "border border-cool-gray hover:bg-lavender-tint text-midnight-blue"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-cool-gray hover:bg-lavender-tint disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight size={20} className="text-midnight-blue" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="bg-soft-white/95 backdrop-blur-md border-b border-cool-gray/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4">
            {/* Title and Cart */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-midnight-blue">
                  Premium Collection
                </h1>
                <p className="text-silver-mist mt-1">
                  Discover {filteredProducts.length} curated products
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="bg-midnight-blue text-soft-white px-4 py-2 rounded-full hover:bg-royal-indigo transition-all duration-300 flex items-center space-x-2 font-medium">
                  <ShoppingBag size={16} />
                  <span className="hidden sm:inline">Cart</span>
                  <span>({cartItems.length})</span>
                </Link>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-silver-mist"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-lavender-tint/50 border border-cool-gray rounded-full focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 focus:border-royal-indigo text-midnight-blue placeholder-silver-mist"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-lavender-tint border border-cool-gray px-4 py-3 rounded-full flex items-center justify-center space-x-2 text-midnight-blue hover:bg-royal-indigo hover:text-soft-white transition-all duration-300"
              >
                <SlidersHorizontal size={20} />
                <span>Filters</span>
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-lavender-tint border border-cool-gray px-4 py-3 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 text-midnight-blue cursor-pointer"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-mist pointer-events-none"
                  />
                </div>

                {/* Sort Filter */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-lavender-tint border border-cool-gray px-4 py-3 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 text-midnight-blue cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-mist pointer-events-none"
                  />
                </div>

                {/* View Mode */}
                <div className="flex bg-lavender-tint border border-cool-gray rounded-full p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-midnight-blue text-soft-white"
                        : "text-midnight-blue hover:bg-cool-gray/50"
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-midnight-blue text-soft-white"
                        : "text-midnight-blue hover:bg-cool-gray/50"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-lavender-tint/30 border border-cool-gray rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-midnight-blue">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-silver-mist hover:text-midnight-blue"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-midnight-blue mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-soft-white border border-cool-gray px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 text-midnight-blue"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight-blue mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-soft-white border border-cool-gray px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 text-midnight-blue"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>

                <div className="flex bg-soft-white border border-cool-gray rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-midnight-blue text-soft-white"
                        : "text-midnight-blue"
                    }`}
                  >
                    <Grid size={16} />
                    <span className="text-sm">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-midnight-blue text-soft-white"
                        : "text-midnight-blue"
                    }`}
                  >
                    <List size={16} />
                    <span className="text-sm">List</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-midnight-blue mb-2">
              No products found
            </h3>
            <p className="text-silver-mist">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="bg-soft-white rounded-2xl shadow-sm border border-cool-gray/30 overflow-hidden group hover:shadow-xl hover:border-royal-indigo/30 transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Link to={`/product/${product._id}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-midnight-blue text-soft-white px-2 py-1 rounded-full text-xs font-medium">
                            {product.badge}
                          </span>
                        </div>
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-midnight-blue/50 flex items-center justify-center">
                            <span className="bg-soft-white text-midnight-blue px-3 py-1 rounded-full text-sm font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-royal-indigo bg-royal-indigo/10 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <div className="flex items-center">
                          <div className="flex text-yellow-400 mr-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                fill={
                                  i < Math.floor(product.rating)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-xs text-silver-mist">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h3 className="font-medium text-midnight-blue mb-3 group-hover:text-royal-indigo transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-midnight-blue">
                            ${product.price}
                          </span>
                          <span className="text-sm text-silver-mist line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCartToggle(product._id)}
                          disabled={!product.inStock}
                          className={`${
                           isInCart(product._id)
                              ? "bg-red-100 hover:bg-red-500 text-red-600 hover:text-white"
                              : "bg-lavender-tint hover:bg-royal-indigo text-midnight-blue hover:text-soft-white"
                          } px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                           {isInCart(product._id) ? "Remove from Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {currentProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="bg-soft-white rounded-2xl shadow-sm border border-cool-gray/30 overflow-hidden group hover:shadow-lg hover:border-royal-indigo/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <Link to={`/product/${product._id}`}>
                        <div className="relative sm:w-48 h-48 sm:h-32 overflow-hidden">
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-midnight-blue text-soft-white px-2 py-1 rounded-full text-xs font-medium">
                              {product.badge}
                            </span>
                          </div>
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-midnight-blue/50 flex items-center justify-center">
                              <span className="bg-soft-white text-midnight-blue px-2 py-1 rounded-full text-xs font-medium">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-royal-indigo bg-royal-indigo/10 px-2 py-1 rounded-full">
                              {product.category}
                            </span>
                            <div className="flex items-center">
                              <div className="flex text-yellow-400 mr-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    fill={
                                      i < Math.floor(product.rating)
                                        ? "currentColor"
                                        : "none"
                                    }
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-silver-mist">
                                ({product.reviews})
                              </span>
                            </div>
                          </div>

                          <h3 className="font-semibold text-midnight-blue mb-2 group-hover:text-royal-indigo transition-colors">
                            {product.name}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-midnight-blue">
                              ${product.price}
                            </span>
                            <span className="text-sm text-silver-mist line-through">
                              ${product.originalPrice}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                          onClick={() => handleCartToggle(product._id)}
                          disabled={!product.inStock}
                          className={`${
                           isInCart(product._id)
                              ? "bg-red-100 hover:bg-red-500 text-red-600 hover:text-white"
                              : "bg-lavender-tint hover:bg-royal-indigo text-midnight-blue hover:text-soft-white"
                          } px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                           {isInCart(product._id) ? "Remove from Cart" : "Add to Cart"}
                        </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination />

            {/* Results Info */}
            <div className="text-center mt-8 text-silver-mist">
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, products.length)} of{" "}
              {products.length} products
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
