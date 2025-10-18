import React, { useState } from 'react';
import { Mail } from 'lucide-react';

type Category = {
  id: string;
  label: string;
};

const CATEGORIES: Category[] = [
  { id: 'whatsapp', label: 'WhatsApp Updates' },
  { id: 'instagram', label: 'Instagram Features' },
  { id: 'messenger', label: 'Messenger Changes' },
  { id: 'ads', label: 'Ads Manager Updates' },
  { id: 'pricing', label: 'Pricing Changes' },
  { id: 'compliance', label: 'Compliance Updates' },
];

const NewsLtterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-10 shadow-sm">
      <h3 className="text-center text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-center text-white/90 max-w-3xl mx-auto mb-8">
        Never miss important updates about Meta's partner programs, API changes, and new features.
      </p>

      {/* Email input */}
      <div className="max-w-3xl mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Categories */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-white">
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="inline-flex items-center gap-3 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={!!selected[cat.id]}
                onChange={() => toggle(cat.id)}
                className="h-4 w-4 rounded border-white/40 bg-transparent text-white focus:ring-white/70"
              />
              <span className="text-white/95">{cat.label}</span>
            </label>
          ))}
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:bg-gray-50"
            type="button"
            disabled={!Object.values(selected).some(Boolean)}
          >
            <Mail className="w-5 h-5" /> Subscribe to Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLtterCard;


