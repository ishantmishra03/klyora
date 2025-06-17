'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    router.push('/logout');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur border-b transition-all duration-300 ${
        isScrolled ? 'border-[#DCE0E6] shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A1F44] via-[#3C4A9A] to-[#0A1F44] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold text-[#0A1F44] hover:text-[#3C4A9A] transition-colors">Klyora</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-[#0A1F44] border-b-2 border-[#3C4A9A]'
                    : 'text-[#7A8290] hover:text-[#0A1F44]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 relative">
            {isAuthenticated ? (
              <>
                <Link href="/cart" className="relative group">
                  <ShoppingCart className="text-[#3C4A9A] hover:text-[#0A1F44] w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs bg-[#3C4A9A] text-white rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-[#3C4A9A] hover:text-[#0A1F44] transition-colors"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-12 w-40 bg-white border border-[#DCE0E6] rounded-lg shadow-lg z-50 animate-fade-in"
                  >
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-[#0A1F44] hover:bg-[#F4F6FA]"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[#0A1F44] hover:bg-[#F4F6FA]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/auth"
                className="px-4 py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#3C4A9A] transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-[#3C4A9A] hover:text-[#0A1F44] p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base px-4 py-2 rounded-md font-medium ${
                  isActive(link.href)
                    ? 'text-[#0A1F44] bg-[#E5E9F7]'
                    : 'text-[#7A8290] hover:bg-[#E5E9F7] hover:text-[#0A1F44]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <hr className="mx-4 border-[#DCE0E6]" />

            {isAuthenticated ? (
              <>
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2 text-[#3C4A9A] hover:text-[#0A1F44]"
                >
                  <span>Cart</span>
                  <span className="bg-[#3C4A9A] text-white text-xs rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-[#3C4A9A] hover:text-[#0A1F44]"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-[#3C4A9A] hover:text-[#0A1F44]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 bg-[#0A1F44] text-white rounded-md mx-4 text-center hover:bg-[#3C4A9A]"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
