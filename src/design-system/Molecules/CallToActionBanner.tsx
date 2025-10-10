import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionBanner: React.FC = () => {
  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-10 md:py-14 text-center shadow-sm">
      <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Find Your Meta Partner?</h3>
      <p className="text-white/90 max-w-3xl mx-auto mb-6 md:mb-8">
        Use our comprehensive directory to discover, compare, and choose the perfect Meta partner for your business needs.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center bg-white text-blue-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
      >
        Browse Partner Directory
      </Link>
    </div>
  );
};

export default CallToActionBanner;


