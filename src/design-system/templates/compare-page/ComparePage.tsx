import React from 'react';
import { Link } from 'react-router-dom';
import { Users2, ArrowLeft } from 'lucide-react';

const ComparePage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="flex items-start gap-3 mb-4">
          <div className="mt-1">
            <Users2 className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Comparison</h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 max-w-3xl">
          Compare up to 3 Meta partners side-by-side to find the best fit for your business needs. Analyze pricing,
          features, onboarding requirements, and Meta compliance support.
        </p>

        {/* Empty state card */}
        <div className="mt-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Users2 className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">No Partners Selected</h2>
              <p className="text-gray-600 max-w-2xl mb-6">
                Select partners from the directory to compare their features, pricing, and onboarding requirements.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Browse Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;


