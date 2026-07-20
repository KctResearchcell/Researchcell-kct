import React, { useState } from 'react';
import { RESEARCH_CIRCLES, ResearchCircleDetail } from '../dataResearchCircles';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Layers, Users, MapPin, Sparkles, Send, GraduationCap } from 'lucide-react';

interface ResearchCircleDetailPageProps {
  circleId: string;
  onBack: () => void;
  onNavigate: (hash: string) => void;
}

export default function ResearchCircleDetailPage({ circleId, onBack, onNavigate }: ResearchCircleDetailPageProps) {
  const circle = RESEARCH_CIRCLES.find(c => c.id === circleId);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  if (!circle) {
    return (
      <div className="mx-auto max-w-4xl text-center py-20 px-6 font-sans">
        <h2 className="text-2xl font-bold text-gray-900">Research Circle Not Found</h2>
        <p className="mt-2 text-gray-500">The circle you are looking for does not exist or has been moved.</p>
        <button
          onClick={onBack}
          className="mt-6 inline-flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-black transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Circles</span>
        </button>
      </div>
    );
  }

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Image mappings for the right-side collage in top banner to reflect beautiful Google Research editorial style
  const collageImages: Record<string, string[]> = {
    "environmental-science": [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=400&auto=format&fit=crop",
    ],
    "bioscience": [
      "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=400&auto=format&fit=crop",
    ],
    "renewable-energy": [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=400&auto=format&fit=crop",
    ],
    "automotive": [
      "https://images.unsplash.com/photo-1516594798947-e6f55041993c?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&auto=format&fit=crop",
    ],
    "educational": [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop",
    ],
    "design-society": [
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=400&auto=format&fit=crop",
    ]
  };

  const images = collageImages[circle.id] || collageImages["environmental-science"];

  return (
    <div className="w-full bg-white font-sans text-gray-900 selection:bg-[#4285F4]/10 pb-24">
      
      {/* Back button and tiny breadcrumbs */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 pt-10 pb-6 text-left">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-[14px] font-semibold text-gray-500 hover:text-black transition-colors group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Circles</span>
        </button>
      </div>

      {/* ================= EDITORIAL TOP BANNER SECTION ================= */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-20 py-2 md:py-6 border-b border-[#E5E7EB]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main heading detail */}
          <div className="lg:col-span-12 space-y-5 text-left max-w-4xl">
            <div className="inline-flex items-center space-x-2 text-[#4285F4] text-xs font-bold tracking-wider uppercase">
              <span className="h-2 w-2 rounded-full bg-[#4285F4] animate-pulse" />
              <span>Ré Research Circle</span>
            </div>
            
            <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[54px] font-bold tracking-tight text-gray-900 leading-[1.05] max-w-3xl">
              {circle.title}
            </h1>
            
            <p className="text-[18px] sm:text-[20px] text-gray-500 font-light leading-relaxed max-w-2xl">
              {circle.tagline}
            </p>
          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT MODULE: 12-COL GRID ================= */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 py-16">
        <div className="space-y-16">

          {/* SECTION: About the Team */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            <div className="lg:col-span-3 text-left">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">
                About the Circle
              </h3>
            </div>
            <div className="lg:col-span-9 text-left">
              <p className="text-[17px] sm:text-[19px] text-[#4A4D50] leading-relaxed font-light max-w-4xl">
                {circle.description} Our collaborative community brings together dedicated domain mentors and curious student researchers in long-term structured cohorts. We aim to translate theoretical models and advanced laboratory physics into scalable regional economic systems, publishing our scientific milestones and safeguarding regional heritage.
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* SECTION: Focus Summaries (with expandable accordions) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 text-left">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono pt-1">
                Circle focus summaries
              </h3>
            </div>
            <div className="lg:col-span-9 space-y-3">
              {circle.areasOfInvestigation.map((item, index) => {
                const isOpen = openAccordion === index;
                return (
                  <div 
                    key={index}
                    className="border-b border-gray-200 py-3 text-left"
                    id={`focus-group-${index}`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center py-2 text-left focus:outline-none cursor-pointer group"
                    >
                      <span className="font-display text-[17px] sm:text-[19px] font-semibold text-gray-900 group-hover:text-[#4285F4] transition-colors">
                        {item.title}
                      </span>
                      <div className="p-1.5 rounded-full border border-gray-200 group-hover:border-[#4285F4] group-hover:bg-[#4285F4]/5 transition-colors">
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-[#4285F4]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-[#4285F4]" />
                        )}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 pt-2 text-[15px] sm:text-[16px] text-[#5F6368] font-light leading-relaxed max-w-3xl">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* SECTION: Highlighted Work (Active projects bento-grid cards) */}
          <div className="text-left space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">
                  Highlighted work
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">
                  Active Projects & Contributions
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {circle.featuredResearch.map((work, idx) => (
                <div 
                  key={idx}
                  className="group bg-white border border-[#E5E7EB] hover:border-[#4285F4]/55 hover:shadow-xl hover:shadow-[#4285F4]/[0.02] rounded-[28px] overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {/* Visual box */}
                    <div className="h-[210px] relative overflow-hidden bg-gray-50 border-b border-gray-100">
                      <img 
                        src={work.image} 
                        alt={work.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white uppercase tracking-wider bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                        {work.subtitle}
                      </span>
                    </div>

                    <div className="p-7 space-y-3">
                      <h3 className="font-display font-bold text-[19px] sm:text-[21px] text-gray-900 group-hover:text-[#4285F4] transition-colors leading-tight">
                        {work.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-[#5F6368] leading-relaxed font-light line-clamp-3">
                        {work.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-7 pt-0 space-y-4">
                    {work.outcome && (
                      <div className="p-3.5 bg-gray-50 border border-gray-200/60 rounded-xl">
                        <span className="block text-[11px] font-bold text-[#34A853] uppercase tracking-wider mb-0.5">Realized Milestone</span>
                        <p className="text-[12px] sm:text-[13px] text-gray-700 italic leading-snug">"{work.outcome}"</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-3 text-[#5F6368]">
                      <div>
                        <span className="font-semibold block text-gray-900">Lead Advisor</span>
                        <span className="block">{work.leader}</span>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-[#4285F4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* SECTION: Featured Publications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">
                Featured publications
              </h3>
            </div>
            <div className="lg:col-span-9 space-y-8">
              {circle.publications.map((pub, idx) => (
                <div key={idx} className="space-y-3 pb-8 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono tracking-wider uppercase">
                    <span>{pub.journal}</span>
                    <span>•</span>
                    <span>{pub.year}</span>
                  </div>
                  
                  <h4 className="font-display font-medium text-[18px] sm:text-[20px] text-gray-900 leading-snug hover:text-[#4285F4] transition-colors cursor-pointer">
                    {pub.title}
                  </h4>
                  
                  <p className="text-sm font-semibold text-gray-500">
                    {pub.authors.join(', ')}
                  </p>
                  
                  <p className="text-sm text-gray-500 leading-relaxed font-light">
                    {pub.abstract}
                  </p>

                  <div className="pt-2 flex items-center space-x-3 text-xs text-[#4285F4] font-semibold">
                    <span className="font-mono text-gray-400 select-all">DOI: {pub.doi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* SECTION: Locations & Facilities */}
          <div className="text-left space-y-8">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">
                Some of our locations
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">
                Infrastructure & Prototyping Facilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {circle.locations.map((loc, idx) => (
                <div key={idx} className="group overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-xs">
                  <div className="h-[200px] w-full overflow-hidden select-none relative">
                    <img 
                      src={loc.image} 
                      alt={loc.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-xs font-semibold text-white px-3 py-1.5 rounded-lg flex items-center space-x-1.5 border border-white/10 shadow-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Kumaraguru Campus</span>
                    </div>
                  </div>
                  <div className="p-6 text-left space-y-2">
                    <h3 className="font-display font-bold text-[18px] text-gray-900">{loc.name}</h3>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">{loc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* SECTION: Team Members / Some of our people */}
          <div className="text-left space-y-8">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono animate-pulse">
                Some of our people
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-2">
                Active Cohort Leaders & Scholars
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {circle.people.map((person, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-[24px] border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-xs transition-all duration-200">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-sm select-none"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="font-display font-bold text-[16px] text-gray-900 mt-4 leading-tight">
                    {person.name}
                  </h4>
                  <p className="text-[11px] font-bold text-[#4285F4] uppercase tracking-wider mt-1 block">
                    {person.role}
                  </p>
                  <p className="text-[12px] text-gray-500 mt-2 font-light leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SECTION: JOIN US CTA BANNER ================= */}
          <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black rounded-[36px] p-8 sm:p-14 text-center text-white relative overflow-hidden select-none shadow-xl border border-white/5 mt-12">
            
            {/* Elegant glowing blurs */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#4285F4]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 tracking-widest uppercase bg-emerald-500/[0.08] px-3.5 py-1.5 rounded-full border border-emerald-500/20 shadow-xs">
                <GraduationCap className="h-4 w-4" />
                <span>Join us</span>
              </span>
              
              <h2 className="font-display text-[26px] sm:text-[34px] font-semibold tracking-tight text-white leading-tight">
                Be part of the inquiry.
              </h2>
              
              <p className="text-[15px] sm:text-[16px] text-gray-400 font-light leading-relaxed">
                Every Research Circle is more than a study group. It is a living community of inquiry where discoveries are documented and carried forward by future generations of student researchers. Connect with our mentors to explore.
              </p>

              <div className="pt-4 flex flex-wrap gap-4 justify-center items-center">
                <button
                  onClick={() => onNavigate('#/careers')}
                  className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-[1.01] shadow-sm cursor-pointer h-[38px]"
                >
                  Apply to Fellowships
                </button>
                <button
                  onClick={() => onNavigate('#/about')}
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-[1.01] cursor-pointer h-[38px]"
                >
                  Contact Dean's Board
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
