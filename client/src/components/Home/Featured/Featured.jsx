import { Heart, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Featured = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299",
      originalPrice: "$399",
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      category: "Audio",
    },
    {
      id: 2,
      name: "Smart Watch Collection",
      price: "$249",
      originalPrice: "$329",
      image:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.9,
      reviews: 89,
      badge: "New",
      category: "Wearables",
    },
    {
      id: 3,
      name: "Minimalist Backpack",
      price: "$129",
      originalPrice: "$159",
      image:
        "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.7,
      reviews: 156,
      badge: "Limited",
      category: "Accessories",
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: "$399",
      originalPrice: "$499",
      image:
        "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.6,
      reviews: 203,
      badge: "Sale",
      category: "Furniture",
    },
  ];
  return (
    <section className="py-20 bg-gradient-to-b from-soft-white to-lavender-tint/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-midnight-blue mb-4">
            Featured Products
          </h2>
          <p className="text-midnight-blue/70 text-lg max-w-2xl mx-auto">
            Handpicked premium products that represent the pinnacle of quality
            and design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-soft-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
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

                <h3 className="font-semibold text-midnight-blue mb-3 group-hover:text-royal-indigo transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-midnight-blue">
                      {product.price}
                    </span>
                    <span className="text-sm text-silver-mist line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  <button className="bg-lavender-tint hover:bg-royal-indigo text-midnight-blue hover:text-soft-white px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-midnight-blue text-soft-white px-8 py-4 rounded-full hover:bg-royal-indigo transition-all duration-300 transform hover:scale-105 font-medium flex items-center space-x-2 mx-auto">
            <Link to="/products">View All Products</Link>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
