import React from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import NewsLtterCard from '../../Molecules/NewsLetterCard';
import UpdateAnnouncementCard from '../../Molecules/UpdateAnnouncementCard';
import UpdatesCard from '../../Molecules/UpdatesCard';
import { TrendingUp, BadgeDollarSign } from 'lucide-react';

const NewsletterPage: React.FC = () => {
  const handleSubscribeScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* What you'll get updates about */}
        <div className="mt-16">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            What You'll Get Updates About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UpdatesCard
              title="WhatsApp Updates"
              description="Stay informed about the latest developments and changes in whatsapp updates."
              icon={<TrendingUp className="w-7 h-7 text-green-500" />}
            />
            <UpdatesCard
              title="Instagram Features"
              description="Stay informed about the latest developments and changes in instagram features."
              icon={<TrendingUp className="w-7 h-7 text-pink-500" />}
            />
            <UpdatesCard
              title="Messenger Changes"
              description="Stay informed about the latest developments and changes in messenger changes."
              icon={<TrendingUp className="w-7 h-7 text-blue-500" />}
            />
            <UpdatesCard
              title="Ads Manager Updates"
              description="Stay informed about the latest developments and changes in ads manager updates."
              icon={<TrendingUp className="w-7 h-7 text-purple-500" />}
            />
            <UpdatesCard
              title="Pricing Changes"
              description="Stay informed about the latest developments and changes in pricing changes."
              icon={<BadgeDollarSign className="w-7 h-7 text-orange-500" />}
            />
            <UpdatesCard
              title="Compliance Updates"
              description="Stay informed about the latest developments and changes in compliance updates."
              icon={<CheckCircle className="w-7 h-7 text-green-600" />}
            />
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Stay in the Loop</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-6">
            Don't miss critical updates that could affect your Meta integration or business operations. Subscribe to our
            newsletter and get timely notifications about policy changes, new features, and compliance requirements.
          </p>
          <button onClick={handleSubscribeScroll} className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;


