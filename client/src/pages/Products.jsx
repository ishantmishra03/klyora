import { useState, useEffect } from 'react';
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
} from 'lucide-react';

// Generate 100 products with realistic data
const generateProducts = () => {
  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports & Fitness', 'Beauty & Care', 'Books & Media', 'Accessories', 'Furniture'];
  const badges = ['Best Seller', 'New', 'Limited', 'Sale', 'Popular', 'Trending', 'Premium', 'Exclusive'];
  const productNames = [
    'Premium Wireless Headphones', 'Smart Watch Collection', 'Minimalist Backpack', 'Ergonomic Office Chair',
    'Luxury Leather Wallet', 'Wireless Charging Pad', 'Premium Coffee Maker', 'Designer Sunglasses',
    'Bluetooth Speaker Pro', 'Fitness Tracker Elite', 'Ceramic Dinnerware Set', 'Memory Foam Pillow',
    'Stainless Steel Water Bottle', 'Organic Cotton Towels', 'LED Desk Lamp', 'Bamboo Cutting Board',
    'Silk Pillowcase Set', 'Essential Oil Diffuser', 'Yoga Mat Premium', 'Wireless Mouse Pad',
    'Artisan Coffee Beans', 'Handcrafted Jewelry Box', 'Smart Home Hub', 'Portable Phone Charger',
    'Luxury Candle Collection', 'Ergonomic Keyboard', 'Premium Skincare Set', 'Wooden Desk Organizer',
    'Bluetooth Earbuds Pro', 'Ceramic Plant Pots', 'Leather Journal', 'Smart Light Bulbs',
    'Organic Face Mask Set', 'Stainless Steel Cookware', 'Wireless Headphone Stand', 'Premium Tea Collection',
    'Bamboo Phone Case', 'Silk Sleep Mask', 'Smart Fitness Scale', 'Handwoven Throw Blanket',
    'Premium Olive Oil', 'Ceramic Coffee Mug', 'Wireless Car Charger', 'Luxury Bath Bombs',
    'Ergonomic Laptop Stand', 'Organic Cotton Sheets', 'Smart Water Bottle', 'Artisan Soap Set',
    'Premium Notebook Set', 'Wireless Gaming Mouse', 'Ceramic Vase Collection', 'Luxury Hand Cream'
  ];

  const images = [
    'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/3760044/pexels-photo-3760044.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/4041394/pexels-photo-4041394.jpeg?auto=compress&cs=tinysrgb&w=500'
  ];

  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: productNames[index % productNames.length] + (index > productNames.length - 1 ? ` ${Math.floor(index / productNames.length) + 1}` : ''),
    price: Math.floor(Math.random() * 400) + 50,
    originalPrice: Math.floor(Math.random() * 200) + 300,
    image: images[index % images.length],
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 200) + 20,
    badge: badges[index % badges.length],
    category: categories[index % categories.length],
    inStock: Math.random() > 0.1,
    isNew: Math.random() > 0.7,
    onSale: Math.random() > 0.6
  }));
};

const allProducts = generateProducts();

function App() {
  const [products, setProducts] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const categories = ['all', 'Electronics', 'Fashion', 'Home & Living', 'Sports & Fitness', 'Beauty & Care', 'Books & Media', 'Accessories', 'Furniture'];

  // Filter and sort products
  useEffect(() => {
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);


  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  //Pagination
  const Pagination = () => {
    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-12">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-cool-gray hover:bg-lavender-tint disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft size={20} className="text-midnight-blue" />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              page === currentPage
                ? 'bg-midnight-blue text-soft-white'
                : page === '...'
                ? 'cursor-default text-silver-mist'
                : 'border border-cool-gray hover:bg-lavender-tint text-midnight-blue'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
                <p className="text-silver-mist mt-1">Discover {products.length} curated products</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-midnight-blue text-soft-white px-4 py-2 rounded-full hover:bg-royal-indigo transition-all duration-300 flex items-center space-x-2 font-medium">
                  <ShoppingBag size={16} />
                  <span className="hidden sm:inline">Cart</span>
                  <span>({cartCount})</span>
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-silver-mist" />
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
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-mist pointer-events-none" />
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
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-mist pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex bg-lavender-tint border border-cool-gray rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      viewMode === 'grid' ? 'bg-midnight-blue text-soft-white' : 'text-midnight-blue hover:bg-cool-gray/50'
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      viewMode === 'list' ? 'bg-midnight-blue text-soft-white' : 'text-midnight-blue hover:bg-cool-gray/50'
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
                    <label className="block text-sm font-medium text-midnight-blue mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-soft-white border border-cool-gray px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 text-midnight-blue"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight-blue mb-2">Sort By</label>
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
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid' ? 'bg-midnight-blue text-soft-white' : 'text-midnight-blue'
                    }`}
                  >
                    <Grid size={16} />
                    <span className="text-sm">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all duration-200 ${
                      viewMode === 'list' ? 'bg-midnight-blue text-soft-white' : 'text-midnight-blue'
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
            <h3 className="text-2xl font-semibold text-midnight-blue mb-2">No products found</h3>
            <p className="text-silver-mist">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="bg-soft-white rounded-2xl shadow-sm border border-cool-gray/30 overflow-hidden group hover:shadow-xl hover:border-royal-indigo/30 transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
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
                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-silver-mist">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-midnight-blue mb-3 group-hover:text-royal-indigo transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-midnight-blue">${product.price}</span>
                          <span className="text-sm text-silver-mist line-through">${product.originalPrice}</span>
                        </div>
                        <button 
                          onClick={addToCart}
                          disabled={!product.inStock}
                          className="bg-lavender-tint hover:bg-royal-indigo text-midnight-blue hover:text-soft-white px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add to Cart
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
                    key={product.id} 
                    className="bg-soft-white rounded-2xl shadow-sm border border-cool-gray/30 overflow-hidden group hover:shadow-lg hover:border-royal-indigo/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-48 h-48 sm:h-32 overflow-hidden">
                        <img 
                          src={product.image} 
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
                                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-silver-mist">({product.reviews})</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-midnight-blue mb-2 group-hover:text-royal-indigo transition-colors">
                            {product.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-midnight-blue">${product.price}</span>
                            <span className="text-sm text-silver-mist line-through">${product.originalPrice}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={addToCart}
                              disabled={!product.inStock}
                              className="bg-lavender-tint hover:bg-royal-indigo text-midnight-blue hover:text-soft-white px-4 py-2 rounded-full transition-all duration-300 font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Add to Cart
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
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;