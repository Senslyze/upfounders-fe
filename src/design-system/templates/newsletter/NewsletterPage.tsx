import React from 'react';
import { Bell } from 'lucide-react';
import NewsLtterCard from '../../Molecules/NewsLetterCard';
import UpdateAnnouncementCard from '../../Molecules/UpdateAnnouncementCard';

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

        {/* Recent Updates */}
        <div className="mt-14">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Recent Updates & Announcements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UpdateAnnouncementCard
              title="WhatsApp Business API v2.0 Released"
              description="Meta has released a new version of the WhatsApp Business API with enhanced features including improved message delivery, better error handling, and new message types."
              date="1/15/2024"
              priority="high"
              tags={["API", "New Features", "Business"]}
              learnMoreUrl="#"
            />
            <UpdateAnnouncementCard
              title="Instagram Messaging API Now Available"
              description="Instagram has opened up its messaging API to all Meta-approved partners, enabling businesses to integrate Instagram messaging into their customer service workflows."
              date="1/10/2024"
              priority="high"
              tags={["API", "Instagram", "Messaging"]}
              learnMoreUrl="#"
            />
            <UpdateAnnouncementCard
              title="New WhatsApp Conversation Fees Structure"
              description="Meta has updated the conversation fee structure for WhatsApp Business API, with new rates effective from February 1st, 2024."
              date="1/8/2024"
              priority="high"
              tags={["Pricing", "WhatsApp", "Fees"]}
              learnMoreUrl="#"
            />
            <UpdateAnnouncementCard
              title="Enhanced Message Templates for Business"
              description="New message template categories have been added to support business use cases including appointment scheduling and order updates."
              date="1/5/2024"
              priority="medium"
              tags={["Templates", "Business", "WhatsApp"]}
              learnMoreUrl="#"
            />
            <UpdateAnnouncementCard
              title="Updated Compliance Requirements for EU"
              description="New compliance requirements for businesses operating in the European Union, including enhanced data protection and user consent mechanisms."
              date="1/3/2024"
              priority="high"
              tags={["Compliance", "EU", "GDPR"]}
              learnMoreUrl="#"
            />
            <UpdateAnnouncementCard
              title="Messenger Platform Enhancements"
              description="The Messenger platform has received updates including improved chatbot capabilities and enhanced integration options for business applications."
              date="1/1/2024"
              priority="medium"
              tags={["Messenger", "Chatbots", "Integration"]}
              learnMoreUrl="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;


