import { Star, Zap, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-lavender-tint via-soft-white to-cool-gray/30 py-20 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/5 to-royal-indigo/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center bg-midnight-blue/20 rounded-full px-4 py-2 text-sm font-medium text-midnight-blue">
              <Zap size={16} className="mr-2" />
              New Collection Available
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-midnight-blue leading-tight">
              Elevate Your
              <span className="block text-royal-indigo">Lifestyle</span>
            </h1>
            <p className="text-xl text-midnight-blue/80 leading-relaxed max-w-lg">
              Discover curated premium products that blend innovation, elegance,
              and functionality for the modern connoisseur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-midnight-blue text-soft-white px-8 py-4 rounded-full hover:bg-royal-indigo transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center space-x-2 cursor-pointer">
                <Link to="/products">Explore Collection</Link>
                <ArrowRight size={18} />
              </button>
              <button className="border-2 border-midnight-blue text-midnight-blue px-8 py-4 rounded-full hover:bg-midnight-blue hover:text-soft-white transition-all duration-300 font-medium flex items-center justify-center space-x-2 cursor-pointer">
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
  );
};

export default Hero;
