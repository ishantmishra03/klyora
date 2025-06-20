import { useState, useEffect } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Truck, 
  Shield, 
  RefreshCw, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  User,
  Heart,
  Search,
  Filter,
  Grid,
  List,
  Award,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Clock,
  Package,
  CreditCard,
  ArrowRight,
  Play
} from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: '$299',
    originalPrice: '$399',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    category: 'Audio'
  },
  {
    id: 2,
    name: 'Smart Watch Collection',
    price: '$249',
    originalPrice: '$329',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.9,
    reviews: 89,
    badge: 'New',
    category: 'Wearables'
  },
  {
    id: 3,
    name: 'Minimalist Backpack',
    price: '$129',
    originalPrice: '$159',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.7,
    reviews: 156,
    badge: 'Limited',
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    price: '$399',
    originalPrice: '$499',
    image: 'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.6,
    reviews: 203,
    badge: 'Sale',
    category: 'Furniture'
  }
];

const newArrivals = [
  {
    id: 5,
    name: 'Luxury Leather Wallet',
    price: '$89',
    originalPrice: '$119',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.9,
    reviews: 67,
    badge: 'New',
    category: 'Accessories'
  },
  {
    id: 6,
    name: 'Wireless Charging Pad',
    price: '$59',
    originalPrice: '$79',
    image: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.5,
    reviews: 43,
    badge: 'Tech',
    category: 'Electronics'
  },
  {
    id: 7,
    name: 'Premium Coffee Maker',
    price: '$199',
    originalPrice: '$249',
    image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.8,
    reviews: 91,
    badge: 'Popular',
    category: 'Home'
  },
  {
    id: 8,
    name: 'Designer Sunglasses',
    price: '$149',
    originalPrice: '$199',
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.7,
    reviews: 128,
    badge: 'Trending',
    category: 'Fashion'
  }
];


const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    content: 'Klyora has completely transformed my shopping experience. The quality is unmatched and the customer service is exceptional.',
    avatar: 'https://images.pexels.com/photos/3760044/pexels-photo-3760044.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    content: 'Fast shipping, excellent customer support, and products that actually exceed expectations. Highly recommended!',
    avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Designer',
    content: 'Love the attention to detail and the sustainable packaging. The curation is perfect for my lifestyle.',
    avatar: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5
  }
];

const stats = [
  { number: '50K+', label: 'Happy Customers', icon: Users },
  { number: '500+', label: 'Premium Products', icon: Package },
  { number: '99.9%', label: 'Satisfaction Rate', icon: Award },
  { number: '24/7', label: 'Customer Support', icon: Clock }
];

function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Welcome to Klyora! Thank you for subscribing.');
      setEmail('');
    }
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Navigation */}
      <nav className="bg-soft-white/95 backdrop-blur-md border-b border-cool-gray/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="font-serif text-2xl font-bold text-midnight-blue">
                Klyora
              </h1>
              
              {/* Desktop Search */}
              <div className="hidden lg:flex items-center bg-lavender-tint/50 rounded-full px-4 py-2 w-96">
                <Search size={18} className="text-silver-mist mr-3" />
                <input 
                  type="text" 
                  placeholder="Search premium products..." 
                  className="bg-transparent flex-1 outline-none text-midnight-blue placeholder-silver-mist"
                />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors font-medium">Products</a>
              <a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors font-medium">Categories</a>
              <button className="text-midnight-blue hover:text-royal-indigo transition-colors p-2">
                <Heart size={20} />
              </button>
              <button className="text-midnight-blue hover:text-royal-indigo transition-colors p-2">
                <User size={20} />
              </button>
              <button 
                onClick={addToCart}
                className="bg-midnight-blue text-soft-white px-4 py-2 rounded-full hover:bg-royal-indigo transition-all duration-300 flex items-center space-x-2 font-medium"
              >
                <ShoppingBag size={16} />
                <span>Cart ({cartCount})</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-midnight-blue hover:text-royal-indigo transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-soft-white border-t border-cool-gray/50">
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center bg-lavender-tint/50 rounded-full px-4 py-2">
                <Search size={18} className="text-silver-mist mr-3" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent flex-1 outline-none text-midnight-blue placeholder-silver-mist"
                />
              </div>
              <a href="#" className="block px-3 py-2 text-midnight-blue hover:text-royal-indigo transition-colors font-medium">Products</a>
              <a href="#" className="block px-3 py-2 text-midnight-blue hover:text-royal-indigo transition-colors font-medium">Categories</a>
              <div className="flex items-center space-x-4 px-3 py-2">
                <button className="text-midnight-blue hover:text-royal-indigo transition-colors">
                  <Heart size={20} />
                </button>
                <button className="text-midnight-blue hover:text-royal-indigo transition-colors">
                  <User size={20} />
                </button>
                <button 
                  onClick={addToCart}
                  className="bg-midnight-blue text-soft-white px-4 py-2 rounded-full hover:bg-royal-indigo transition-all duration-300 flex items-center space-x-2 font-medium"
                >
                  <ShoppingBag size={16} />
                  <span>Cart ({cartCount})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lavender-tint via-soft-white to-cool-gray/30 py-20 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/5 to-royal-indigo/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center bg-midnight-blue/10 rounded-full px-4 py-2 text-sm font-medium text-midnight-blue">
                <Zap size={16} className="mr-2" />
                New Collection Available
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-midnight-blue leading-tight">
                Elevate Your
                <span className="block text-royal-indigo">Lifestyle</span>
              </h1>
              <p className="text-xl text-midnight-blue/80 leading-relaxed max-w-lg">
                Discover curated premium products that blend innovation, elegance, and functionality for the modern connoisseur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-midnight-blue text-soft-white px-8 py-4 rounded-full hover:bg-royal-indigo transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center space-x-2">
                  <span>Explore Collection</span>
                  <ArrowRight size={18} />
                </button>
                <button className="border-2 border-midnight-blue text-midnight-blue px-8 py-4 rounded-full hover:bg-midnight-blue hover:text-soft-white transition-all duration-300 font-medium flex items-center justify-center space-x-2">
                  <Play size={16} />
                  <span>Watch Story</span>
                </button>
              </div>
            </div>
            <div className="relative animate-slide-in">
              <div className="aspect-square bg-gradient-to-br from-lavender-tint to-cool-gray/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
                <img 
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Premium Product"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-midnight-blue to-royal-indigo text-soft-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
                Free Shipping Worldwide
              </div>
              <div className="absolute -bottom-6 -left-6 bg-soft-white border border-cool-gray px-6 py-3 rounded-2xl font-semibold shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-midnight-blue">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-midnight-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-royal-indigo/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-royal-indigo group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-8 h-8 mx-auto text-soft-white" />
                </div>
                <div className="text-3xl font-bold text-soft-white mb-2">{stat.number}</div>
                <div className="text-silver-mist">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-soft-white to-lavender-tint/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-midnight-blue mb-4">
              Featured Products
            </h2>
            <p className="text-midnight-blue/70 text-lg max-w-2xl mx-auto">
              Handpicked premium products that represent the pinnacle of quality and design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-soft-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-midnight-blue text-soft-white px-3 py-1 rounded-full text-xs font-medium">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-soft-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-soft-white shadow-lg">
                      <Heart size={16} className="text-midnight-blue" />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                
                <div className="p-6">
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
                  
                  <h3 className="font-semibold text-midnight-blue mb-3 group-hover:text-royal-indigo transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-midnight-blue">{product.price}</span>
                      <span className="text-sm text-silver-mist line-through">{product.originalPrice}</span>
                    </div>
                    <button 
                      onClick={addToCart}
                      className="bg-lavender-tint hover:bg-royal-indigo text-midnight-blue hover:text-soft-white px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-midnight-blue text-soft-white px-8 py-4 rounded-full hover:bg-royal-indigo transition-all duration-300 transform hover:scale-105 font-medium flex items-center space-x-2 mx-auto">
              <span>View All Products</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-soft-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-midnight-blue mb-4">
                New Arrivals
              </h2>
              <p className="text-midnight-blue text-lg">
                Fresh additions to our premium collection
              </p>
            </div>
            <button className="hidden md:flex items-center space-x-2 text-royal-indigo hover:text-midnight-blue font-medium">
              <span>View All</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <div 
                key={index} 
                className="bg-soft-white border border-cool-gray rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl hover:border-royal-indigo transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-royal-indigo text-soft-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
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
                  
                  <h3 className="font-medium text-midnight-blue mb-3 group-hover:text-royal-indigo transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-midnight-blue">{product.price}</span>
                      <span className="text-sm text-silver-mist line-through">{product.originalPrice}</span>
                    </div>
                    <button 
                      onClick={addToCart}
                      className="text-royal-indigo hover:bg-royal-indigo hover:text-soft-white p-2 rounded-full transition-all duration-300"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gradient-to-r from-midnight-blue to-royal-indigo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-soft-white mb-4">
              The Klyora Promise
            </h2>
            <p className="text-silver-mist text-lg max-w-2xl mx-auto">
              We're committed to delivering excellence in every aspect of your shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-soft-white backdrop-blur-sm p-6 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:bg-soft-white group-hover:text-midnight-blue transition-all duration-300 transform group-hover:scale-110">
                <Truck className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-soft-white mb-3 text-xl">Express Delivery</h3>
              <p className="text-silver-mist">Free express shipping on orders over $100. Get your premium products delivered within 24-48 hours.</p>
            </div>
            <div className="text-center group">
              <div className="bg-soft-white backdrop-blur-sm p-6 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:bg-soft-white group-hover:text-midnight-blue transition-all duration-300 transform group-hover:scale-110">
                <Shield className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-soft-white mb-3 text-xl">Secure & Safe</h3>
              <p className="text-silver-mist">Bank-level security with encrypted transactions. Your personal and payment information is always protected.</p>
            </div>
            <div className="text-center group">
              <div className="bg-soft-white backdrop-blur-sm p-6 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:bg-soft-white group-hover:text-midnight-blue transition-all duration-300 transform group-hover:scale-110">
                <RefreshCw className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-soft-white mb-3 text-xl">Easy Returns</h3>
              <p className="text-silver-mist">Not satisfied? Return any item within 30 days for a full refund. No questions asked, hassle-free process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-soft-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-midnight-blue mb-4">
              What Our Customers Say
            </h2>
            <p className="text-midnight-blue/70 text-lg">
              Real experiences from our valued community
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-lavender-tint to-cool-gray/30 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-midnight-blue mb-8 font-medium italic leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full border-3 border-soft-white shadow-lg"
                />
                <div className="text-left">
                  <div className="font-semibold text-midnight-blue text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-silver-mist">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={() => setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-soft-white border border-cool-gray p-4 rounded-full hover:bg-lavender-tint hover:border-royal-indigo transition-all duration-300 shadow-lg"
            >
              <ChevronLeft size={24} className="text-midnight-blue" />
            </button>
            
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-soft-white border border-cool-gray p-4 rounded-full hover:bg-lavender-tint hover:border-royal-indigo transition-all duration-300 shadow-lg"
            >
              <ChevronRight size={24} className="text-midnight-blue" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-midnight-blue w-8' : 'bg-cool-gray hover:bg-silver-mist'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-midnight-blue via-royal-indigo to-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-soft-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-soft-white mb-4">
              Join the Klyora Community
            </h2>
            <p className="text-silver-mist mb-8 text-lg leading-relaxed">
              Be the first to discover new arrivals, exclusive offers, and insider tips from our curated lifestyle collection
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-soft-white/50 text-midnight-blue placeholder-silver-mist bg-soft-white"
                required
              />
              <button
                type="submit"
                className="bg-soft-white text-midnight-blue px-8 py-4 rounded-full hover:bg-lavender-tint transition-all duration-300 font-medium whitespace-nowrap transform hover:scale-105"
              >
                Subscribe Now
              </button>
            </form>
            
            <p className="text-silver-mist text-sm mt-4">
              Join 50,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cool-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-6">
              <h3 className="font-serif text-3xl font-bold text-midnight-blue">Klyora</h3>
              <p className="text-midnight-blue leading-relaxed">
                Curating premium lifestyle products that elevate your everyday experiences with uncompromising quality and design.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-lavender-tint p-3 rounded-full text-midnight-blue hover:bg-royal-indigo hover:text-soft-white transition-all duration-300">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-lavender-tint p-3 rounded-full text-midnight-blue hover:bg-royal-indigo hover:text-soft-white transition-all duration-300">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-lavender-tint p-3 rounded-full text-midnight-blue hover:bg-royal-indigo hover:text-soft-white transition-all duration-300">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-midnight-blue mb-6 text-lg">Shop</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Sale Items</a></li>
                <li><a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-midnight-blue mb-6 text-lg">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Customer Service</a></li>
                <li><a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Size Guide</a></li>
                <li><a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Care Instructions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-midnight-blue mb-6 text-lg">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-midnight-blue">
                  <Mail size={18} className="text-royal-indigo" />
                  <span>hello@klyora.com</span>
                </div>
                <div className="flex items-center space-x-3 text-midnight-blue">
                  <Phone size={18} className="text-royal-indigo" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-midnight-blue">
                  <MapPin size={18} className="text-royal-indigo" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-silver-mist/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-midnight-blue mb-4 md:mb-0">
              © 2024 Klyora. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Privacy Policy</a>
              <a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Terms of Service</a>
              <a href="#" className="text-midnight-blue hover:text-royal-indigo transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;