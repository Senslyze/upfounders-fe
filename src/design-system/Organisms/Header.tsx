import React, { useState } from 'react';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConsultationDialog from '../Molecules/ConsultationDialog';

// Zod schemas
const NavItemSchema = z.object({
  to: z.string(),
  label: z.string(),
});

const HeaderPropsSchema = z.object({
  // No props needed for Header component
});

type NavItem = z.infer<typeof NavItemSchema>;
type HeaderProps = z.infer<typeof HeaderPropsSchema>;

const Header: React.FC<HeaderProps> = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);

  const navItems: NavItem[] = [
    { to: '/', label: 'Directory' },
    { to: '/compare', label: 'Compare' },
    { to: '/resources', label: 'Resources' },
    { to: '/newsletter', label: 'Updates' },
    { to: '/contact', label: 'Contact Us' }
  ];

  const handleConsultationClick = () => {
    setIsConsultationDialogOpen(true);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px- lg:px-8 mb-2">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">UpFounders</h1>
              <p className="text-sm text-gray-600">Find Your Perfect Partner</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Consultancy Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleConsultationClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <Mail size={18} />
              <span>Get Consultancy</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              className="text-gray-700 hover:text-blue-600"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[90%] bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <Link to="/" onClick={() => setIsMobileOpen(false)}>
                  <span className="text-xl font-bold text-gray-900">UpFounders</span>
                </Link>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setIsMobileOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="px-5 pb-6">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    handleConsultationClick();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:opacity-95"
                >
                  <Mail className="w-5 h-5" /> Get Consultation
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Consultation Dialog */}
      <ConsultationDialog 
        isOpen={isConsultationDialogOpen} 
        onClose={() => setIsConsultationDialogOpen(false)} 
      />
    </header>
  );
};

export default Header;
