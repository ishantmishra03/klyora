import { Hero, Stats, Featured, NewArrivals, Proposition, Testimonials, Newsletter } from '../components/Home';
import Footer from '../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-soft-white">
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Stats Section */}
      <Stats />
      {/* Featured Products */}
      <Featured />
      {/* New Arrivals */}
      <NewArrivals />
      {/* Value Proposition */}
      <Proposition />
      {/* Testimonials */}
      <Testimonials />
      {/* Newsletter CTA */}
      <Newsletter />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
