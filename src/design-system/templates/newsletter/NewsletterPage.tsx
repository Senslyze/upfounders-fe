import React from 'react';
import { Bell } from 'lucide-react';
import NewsLtterCard from '../../Molecules/NewsLetterCard';

const NewsletterPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Stay Updated with Meta
          </h1>
          <p className="max-w-3xl text-gray-600 text-lg">
            Get the latest updates on Meta's policies, new features, pricing changes, and
            compliance requirements delivered directly to your inbox.
          </p>
        </div>

        <NewsLtterCard />
      </div>
    </div>
  );
};

export default NewsletterPage;


