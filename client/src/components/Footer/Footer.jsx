import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cool-gray py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <h3 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif text-3xl font-bold text-midnight-blue cursor-pointer">
              <Link to="/">Klyora</Link>
            </h3>
            <p className="text-midnight-blue leading-relaxed">
              Curating premium lifestyle products that elevate your everyday
              experiences with uncompromising quality and design.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-lavender-tint p-3 rounded-full text-midnight-blue hover:bg-royal-indigo hover:text-soft-white transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-lavender-tint p-3 rounded-full text-midnight-blue hover:bg-royal-indigo hover:text-soft-white transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-lavender-tint p-3 rounded-full text-midnight-blue hover:bg-royal-indigo hover:text-soft-white transition-all duration-300"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-midnight-blue mb-6 text-lg">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-midnight-blue hover:text-royal-indigo transition-colors"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-midnight-blue hover:text-royal-indigo transition-colors"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-midnight-blue hover:text-royal-indigo transition-colors"
                >
                  Sale Items
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-midnight-blue hover:text-royal-indigo transition-colors"
                >
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-midnight-blue mb-6 text-lg">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-midnight-blue hover:text-royal-indigo transition-colors"
                >
                  Customer Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-midnight-blue hover:text-royal-indigo transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-midnight-blue hover:text-royal-indigo transition-colors"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-midnight-blue hover:text-royal-indigo transition-colors"
                >
                  Care Instructions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-midnight-blue mb-6 text-lg">
              Contact
            </h4>
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
            © 2025 Klyora. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-midnight-blue hover:text-royal-indigo transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-midnight-blue hover:text-royal-indigo transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-midnight-blue hover:text-royal-indigo transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
