import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("Welcome to Klyora! Thank you for subscribing.");
      setEmail("");
    }
  };
  return (
    <section className="py-20 bg-gradient-to-r from-midnight-blue via-royal-indigo to-midnight-blue">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-soft-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-soft-white mb-4">
            Join the Klyora Community
          </h2>
          <p className="text-silver-mist mb-8 text-lg leading-relaxed">
            Be the first to discover new arrivals, exclusive offers, and insider
            tips from our curated lifestyle collection
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
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
  );
};

export default Newsletter;
