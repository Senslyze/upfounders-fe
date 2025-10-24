"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageCircle, Megaphone, Instagram } from 'lucide-react';
import ConsultationDialog from '../Molecules/ConsultationDialog';

const Footer: React.FC = () => {
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);

  const handleConsultationClick = () => {
    console.log('Footer consultation button clicked');
    setIsConsultationDialogOpen(true);
  };

  console.log('Footer component rendered, dialog state:', isConsultationDialogOpen);

  return (
    <footer className="relative bg-gray-50 z-10 border-t border-gray-200">
      {/* Background decorative icons */}
      <div className="absolute inset-0 opacity-5 ">
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

      <div className="pt-8 md:pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            {/* Company */}
            <div className="space-y-5 pr-0 md:pr-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">UpFounders</h3>
                <p className="text-gray-700 leading-relaxed max-w-sm">
                  We help founders find the perfect Meta partners to accelerate their growth.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 group">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-gray-900 font-semibold">consultancy@upfounders.com</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700 group">
                  <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <p className="text-gray-900 font-semibold">+1 (234) 000-0000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-5 px-0 md:px-4">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h4>
              <div className="space-y-4">
                <Link href="/" className="group flex items-center text-gray-700 hover:text-blue-600 transition-all duration-200">
                  <span className="font-medium group-hover:translate-x-1 transition-transform">Directory</span>
                </Link>
                <Link href="/compare" className="group flex items-center text-gray-700 hover:text-blue-600 transition-all duration-200">
                  <span className="font-medium group-hover:translate-x-1 transition-transform">Compare Partners</span>
                </Link>
                <Link href="/resources" className="group flex items-center text-gray-700 hover:text-blue-600 transition-all duration-200">
                  <span className="font-medium group-hover:translate-x-1 transition-transform">Resources</span>
                </Link>
                <Link href="/newsletter" className="group flex items-center text-gray-700 hover:text-blue-600 transition-all duration-200">
                  <span className="font-medium group-hover:translate-x-1 transition-transform">Newsletter</span>
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-5 pl-0 md:pl-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-5 shadow-lg ml-auto max-w-sm">
                <h4 className="text-xl font-bold mb-2">Consultancy</h4>
                <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                  Not sure which partner is the right fit? Get tailored guidance from our partnership experts.
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Button clicked directly');
                    handleConsultationClick();
                  }}
                  onMouseDown={() => console.log('Button mouse down')}
                  onMouseUp={() => console.log('Button mouse up')}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer relative z-20"
                  style={{ pointerEvents: 'auto' }}
                >
                  <Mail size={16} className="mr-2" />
                  Get Consultation
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-200/50 mt-10 sm:mt-12 pt-6 sm:pt-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-600 text-sm text-center md:text-left">
                © {new Date().getFullYear()} UpFounders. All rights reserved.
              </div>
              <div className="flex items-center gap-6 sm:gap-8 text-sm mt-3 md:mt-0">
                <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Privacy Policy</a>
                <a href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Dialog */}
      <ConsultationDialog 
        isOpen={isConsultationDialogOpen} 
        onClose={() => setIsConsultationDialogOpen(false)} 
      />
    </footer>
  );
};

export default Footer;
