import React from 'react';
import { Calendar, ArrowUpRight, Tag, AlertTriangle, TrendingUp } from 'lucide-react';

export type UpdateAnnouncementCardProps = {
  title: string;
  description: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  tags?: string[];
  learnMoreUrl?: string;
};

const priorityStyles: Record<UpdateAnnouncementCardProps['priority'], { label: string; className: string; icon: React.ReactNode }> = {
  high: {
    label: 'High Priority',
    className: 'bg-red-100 text-red-700',
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  medium: {
    label: 'Medium Priority',
    className: 'bg-yellow-100 text-yellow-800',
    icon: <TrendingUp className="w-4 h-4" />,
  },
  low: {
    label: 'Low Priority',
    className: 'bg-green-100 text-green-700',
    icon: <TrendingUp className="w-4 h-4" />,
  },
};

const UpdateAnnouncementCard: React.FC<UpdateAnnouncementCardProps> = ({ title, description, date, priority, tags = [], learnMoreUrl }) => {
  const p = priorityStyles[priority];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${p.className}`}>
          {p.icon}
          {p.label}
        </span>
        <span className="inline-flex items-center gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" /> {date}
        </span>
      </div>

      <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">
              <Tag className="w-3 h-3" /> {t}
            </span>
          ))}
        </div>
      )}

      {learnMoreUrl && (
        <div className="mt-auto flex justify-end">
          <a href={learnMoreUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            Learn More <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default UpdateAnnouncementCard;


