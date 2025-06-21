import { Truck, Shield, RefreshCw } from 'lucide-react';
const Proposition = () => {
  return (
   <section className="py-20 bg-gradient-to-r from-midnight-blue to-royal-indigo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-soft-white mb-4">
              The Klyora Promise
            </h2>
            <p className="text-silver-mist text-lg max-w-2xl mx-auto">
              We're committed to delivering excellence in every aspect of your
              shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-soft-white backdrop-blur-sm p-6 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:bg-soft-white group-hover:text-midnight-blue transition-all duration-300 transform group-hover:scale-110">
                <Truck className="w-8 h-8 mx-auto cursor-pointer" />
              </div>
              <h3 className="font-semibold text-soft-white mb-3 text-xl">
                Express Delivery
              </h3>
              <p className="text-silver-mist">
                Free express shipping on orders over $100. Get your premium
                products delivered within 24-48 hours.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-soft-white backdrop-blur-sm p-6 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:bg-soft-white group-hover:text-midnight-blue transition-all duration-300 transform group-hover:scale-110">
                <Shield className="w-8 h-8 mx-auto cursor-pointer" />
              </div>
              <h3 className="font-semibold text-soft-white mb-3 text-xl">
                Secure & Safe
              </h3>
              <p className="text-silver-mist">
                Bank-level security with encrypted transactions. Your personal
                and payment information is always protected.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-soft-white backdrop-blur-sm p-6 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:bg-soft-white group-hover:text-midnight-blue transition-all duration-300 transform group-hover:scale-110">
                <RefreshCw className="w-8 h-8 mx-auto cursor-pointer" />
              </div>
              <h3 className="font-semibold text-soft-white mb-3 text-xl">
                Easy Returns
              </h3>
              <p className="text-silver-mist">
                Not satisfied? Return any item within 30 days for a full refund.
                No questions asked, hassle-free process.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Proposition
