import { useState } from "react";
import { ShoppingBag, Menu, X, Search, LogInIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items) || [];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <nav className="bg-soft-white/95 backdrop-blur-md border-b border-cool-gray/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="font-serif text-2xl font-bold text-midnight-blue cursor-pointer">
              <Link to="/">Klyora</Link>
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
            <Link
              to="/products"
              className="text-midnight-blue hover:text-royal-indigo transition-colors font-medium"
            >
              Products
            </Link>
            {!isAuthenticated && (
              <Link
                to="/auth"
                className="flex items-center gap-1 bg-midnight-blue rounded-full text-soft-white hover:text-royal-indigo transition-colors px-4 py-2 hover:bg-royal-indigo cursor-pointer"
              >
                <LogInIcon size={20} /> Login
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/logout"
                className="flex items-center gap-1 bg-midnight-blue rounded-full text-soft-white hover:text-royal-indigo transition-colors px-4 py-2 hover:bg-royal-indigo cursor-pointer"
              >
                <LogOutIcon size={20} /> Logout
              </Link>
            )}
            {isAuthenticated && (
              <Link
              to="/cart"
                className="bg-midnight-blue text-soft-white px-4 py-2 rounded-full hover:bg-royal-indigo transition-all duration-300 flex items-center space-x-2 font-medium cursor-pointer"
              >
                <ShoppingBag size={16} />
                <span>Cart ({cartItems.length})</span>
              </Link>
            )}
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
            <Link
              to="/products"
              onClick={closeMenu}
              className="block px-3 py-2 text-midnight-blue hover:text-royal-indigo transition-colors font-medium"
            >
              Products
            </Link>
            {!isAuthenticated && (
              <Link
                to="/auth"
                className="flex items-center gap-1 bg-midnight-blue rounded-full text-soft-white hover:text-royal-indigo transition-colors px-4 py-2 hover:bg-royal-indigo cursor-pointer max-w-fit"
              >
                <LogInIcon size={20} /> Login
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/logout"
                className="flex items-center gap-1 bg-midnight-blue rounded-full text-soft-white hover:text-royal-indigo transition-colors px-4 py-2 hover:bg-royal-indigo cursor-pointer max-w-fit"
              >
                <LogOutIcon size={20} /> Logout
              </Link>
            )}
            {isAuthenticated && (
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link
                to="/cart"
                onClick={closeMenu}
                  className="bg-midnight-blue text-soft-white px-4 py-2 rounded-full hover:bg-royal-indigo transition-all duration-300 flex items-center space-x-2 font-medium"
                >
                  <ShoppingBag size={16} />
                  <span>Cart ({cartItems.length})</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
