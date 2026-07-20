import React from 'react';
import { LABS } from '../data';
import { MapPin, Mail, User, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const LAB_IMAGES: { [key: string]: string } = {
  'materials-prototyping-lab': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
  'ai-research-hub': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop',
  'heritage-digitalization-lab': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop'
};

export default function ResearchLabsPage() {
  return (
    <div className="w-full font-sans text-[#202124]">
      {/* 1:1 Google Research Replica Editorial Title Header */}
      <PageHeader 
        category="ADVANCED INFRASTRUCTURE"
        title="Research Labs"
        description="RÉ houses specialized materials production and digital experimentation hubs. Explore physical spaces engineered for regional technology translations."
        accentColor="green"
        gradientTheme="yellow"
        images={[
          "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop"
        ]}
      />

      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-20">

      {/* Grid listing of labs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {LABS.map((lab) => (
          <div
            key={lab.id}
            className="flex flex-col justify-between border border-[#DADCE0] bg-white rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all text-[15px] overflow-hidden"
            id={`lab-card-${lab.id}`}
          >
            <div className="space-y-4">
              {/* Lab Visual Image Card */}
              <div className="h-[180px] w-full overflow-hidden rounded-xl border border-gray-100 select-none">
                <img 
                  src={LAB_IMAGES[lab.id] || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop"} 
                  alt={lab.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Header */}
              <div className="space-y-1">
                <span className="inline-flex items-center space-x-1.5 text-[#4285F4] text-xs font-bold uppercase tracking-wider">
                  <Shield className="h-3 w-3" />
                  <span>Certified Facility</span>
                </span>
                
                <h2 className="font-display text-[20px] md:text-[22px] font-bold text-[#202124] leading-tight">
                  {lab.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-[#5F6368] leading-relaxed">
                {lab.description}
              </p>

              {/* Facilities Bullet Points */}
              <div className="space-y-2 pt-4 border-t border-[#DADCE0]">
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">Core Machinery & Systems</span>
                <ul className="space-y-1.5">
                  {lab.facilities.map((fac, idx) => (
                    <li key={idx} className="flex items-start text-[14px] text-gray-800">
                      <span className="text-[#4285F4] mr-2">•</span>
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Coordinates / Footer card details */}
            <div className="mt-8 pt-4 border-t border-[#DADCE0] space-y-2 text-[14px]">
              
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-4 w-4 shrink-0 text-[#5F6368]" />
                <span className="font-medium">Coordinator: {lab.coordinator}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <Mail className="h-4 w-4 shrink-0 text-[#202124]" />
                <a href={`mailto:${lab.contactEmail}`} className="text-[#4285F4] hover:underline font-mono text-xs">
                  {lab.contactEmail}
                </a>
              </div>

              <div className="flex items-start space-x-2 text-gray-700 pt-1">
                <MapPin className="h-4 w-4 shrink-0 text-[#EA4335] mt-0.5" />
                <span className="text-xs text-[#5F6368]">{lab.location}</span>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
    </div>
  );
}
