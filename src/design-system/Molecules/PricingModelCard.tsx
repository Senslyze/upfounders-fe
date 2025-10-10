import React from 'react';
import { z } from 'zod';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const PricingModelCardPropsSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.custom<React.ReactNode>(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  examples: z.array(z.string()).optional(),
});

export type PricingModelCardProps = z.infer<typeof PricingModelCardPropsSchema>;

const BulletItem: React.FC<{ text: string; color: 'green' | 'red' }> = ({ text, color }) => (
  <li className="flex items-start gap-2">
    {color === 'green' ? (
      <span className="mt-2 inline-flex"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /></span>
    ) : (
      <span className="mt-2 inline-flex"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /></span>
    )}
    <span className="text-gray-700">{text}</span>
  </li>
);

const PricingModelCard: React.FC<PricingModelCardProps> = ({ title, description, icon, pros, cons, examples }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700 mb-6">{description}</p>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="font-semibold text-gray-900">Pros</span>
          </div>
          <ul className="space-y-2">
            {pros.map((item) => (
              <BulletItem key={item} text={item} color="green" />
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="font-semibold text-gray-900">Cons</span>
          </div>
          <ul className="space-y-2">
            {cons.map((item) => (
              <BulletItem key={item} text={item} color="red" />
            ))}
          </ul>
        </div>
      </div>

      {examples && examples.length > 0 && (
        <>
          <div className="mt-6 border-t border-gray-200" />
          <div className="mt-4 text-gray-600">
          <span className="text-gray-500">Examples:</span>{' '}
          {examples.map((ex, idx) => (
            <span key={ex} className="font-medium text-gray-700">
              {ex}
              {idx < examples.length - 1 ? ', ' : ''}
            </span>
          ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PricingModelCard;


