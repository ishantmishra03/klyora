import {useState, useEffect} from 'react';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import axios from '../../../config/axios';
import {Link} from 'react-router-dom';

const NewArrivals = () => {
   const [latestProducts, setLatestProducts] = useState([]);
  
   const fetchLatest = async () => {
      try {
        const { data } = await axios.get('/api/product/latest');
        if(data.success){
          setLatestProducts(data.latestProducts);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  
    useEffect(() => {
      fetchLatest();
    }, [])
  // const newArrivals = [
  //   {
  //     id: 5,
  //     name: "Luxury Leather Wallet",
  //     price: "$89",
  //     originalPrice: "$119",
  //     image:
  //       "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500",
  //     rating: 4.9,
  //     reviews: 67,
  //     badge: "New",
  //     category: "Accessories",
  //   },
  //   {
  //     id: 6,
  //     name: "Wireless Charging Pad",
  //     price: "$59",
  //     originalPrice: "$79",
  //     image:
  //       "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=500",
  //     rating: 4.5,
  //     reviews: 43,
  //     badge: "Tech",
  //     category: "Electronics",
  //   },
  //   {
  //     id: 7,
  //     name: "Premium Coffee Maker",
  //     price: "$199",
  //     originalPrice: "$249",
  //     image:
  //       "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500",
  //     rating: 4.8,
  //     reviews: 91,
  //     badge: "Popular",
  //     category: "Home",
  //   },
  //   {
  //     id: 8,
  //     name: "Designer Sunglasses",
  //     price: "$149",
  //     originalPrice: "$199",
  //     image:
  //       "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=500",
  //     rating: 4.7,
  //     reviews: 128,
  //     badge: "Trending",
  //     category: "Fashion",
  //   },
  // ];
  return (
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
          {latestProducts.map((product) => (
            <div
              key={product._id}
              className="bg-soft-white border border-cool-gray rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl hover:border-royal-indigo transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <Link to={`/product/${product._id}`}>
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-royal-indigo text-soft-white px-2 py-1 rounded-full text-xs font-medium">
                    {product.badge}
                  </span>
                </div>
              </div>
              </Link>

              <div className="p-5">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
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

                <h3 className="font-medium text-midnight-blue mb-3 group-hover:text-royal-indigo transition-colors">
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
                  <button className="text-royal-indigo hover:bg-royal-indigo hover:text-soft-white p-2 rounded-full transition-all duration-300">
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
