import React from 'react';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Megaphone, Instagram } from 'lucide-react';

// Zod schemas
const FooterPropsSchema = z.object({
  // No props needed for Footer component
});

type FooterProps = z.infer<typeof FooterPropsSchema>;

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="relative bg-gray-50 overflow-hidden">
      {/* Background decorative icons */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <MessageCircle className="w-8 h-8 text-green-400" />
        </div>
        <div className="absolute top-20 right-20">
          <Megaphone className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <Instagram className="w-7 h-7 text-purple-400" />
        </div>
        <div className="absolute top-1/2 right-1/3">
          <MessageCircle className="w-5 h-5 text-green-300" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Megaphone className="w-8 h-8 text-blue-300" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: UpFounders Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 font-sans">
                UpFounders
              </h3>
              <p className="text-gray-600 font-sans mt-3 leading-relaxed">
                We help founders find the perfect Meta partners to accelerate their growth.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">consultancy@upfounders.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-medium">+1 (234) 000-0000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 font-sans">
              Quick Links
            </h3>
            
            <nav className="space-y-3">
              <Link 
                to="/" 
                className="block text-gray-600 hover:text-blue-600 font-sans transition-colors"
              >
                Directory
              </Link>
              <Link 
                to="/compare" 
                className="block text-blue-600 hover:text-blue-700 font-sans font-medium transition-colors"
              >
                Compare Partners
              </Link>
              <Link 
                to="/resources" 
                className="block text-gray-600 hover:text-blue-600 font-sans transition-colors"
              >
                Resources
              </Link>
              <Link 
                to="/newsletter" 
                className="block text-gray-600 hover:text-blue-600 font-sans transition-colors"
              >
                Newsletter
              </Link>
            </nav>
          </div>

          {/* Right Column: Consultancy Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold font-sans text-center mb-3">
                Consultancy
              </h3>
              <p className="text-white/90 font-sans text-center mb-6 leading-relaxed">
                Not sure which partner is the right fit? Get tailored guidance from our partnership experts.
              </p>
              <div className="text-center">
                <Link
                  to="/?contact=open"
                  className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-gray-500 font-sans">
              © 2025 UpFounders. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="text-sm text-gray-500 hover:text-gray-700 font-sans transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-gray-500 hover:text-gray-700 font-sans transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
