import React from 'react';
import { z } from 'zod';
import { Info } from 'lucide-react';

const ConsiderationPartnerCardPropsSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.custom<React.ReactNode>(),
  bullets: z.array(z.string()),
});

export type ConsiderationPartnerCardProps = z.infer<typeof ConsiderationPartnerCardPropsSchema>;

const ConsiderationPartnerCard: React.FC<ConsiderationPartnerCardProps> = ({ title, description, icon, bullets }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700 mb-5">{description}</p>

      <ul className="space-y-2">
        {bullets.map((item) => (
          <li key={item} className="flex items-start gap-2 text-gray-700">
            <Info className="w-4 h-4 text-blue-500 mt-1" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsiderationPartnerCard;


