import React from 'react';
import { Play, Sparkles, ArrowRight, Tag, BookOpen, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface SpotlightItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  area: string;
  publications: string[];
  projects: string[];
  tags: string[];
  videoUrl: string; // YouTube embed code
}

interface SpotlightProps {
  onTagClick: (tag: string) => void;
  onNavigate: (hash: string) => void;
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: 'battery-innovation-lab',
    title: 'Battery Energy Storage System',
    subtitle: 'Battery Research Circle Initiative',
    description: 'An energy management solution that stores excess electrical energy generated from solar photovoltaic systems and supplies power during periods of low generation or high demand.',
    area: 'Sustainability',
    publications: ['Mechanical and Dynamic Mechanical Analysis of Treated Banana Cellulose'],
    projects: ['Battery Energy Storage System'],
    tags: ['Battery Storage', 'Renewable Energy', 'Grid Stability', 'Clean Tech'],
    videoUrl: 'https://www.youtube.com/embed/c1v8fN7I6Q8' // High quality science simulation/presentation
  },
  {
    id: 'assistive-hearing-spotlight',
    title: 'Assistive Communication Device',
    subtitle: 'Educational Research Circle Initiative',
    description: 'Converting live multilingual speech into accessible captions for Deaf and Hard-of-Hearing users in Indian classrooms and everyday communication.',
    area: 'Artificial Intelligence & Data Science',
    publications: ['Edge-Optimized CNNs for Diabetic Retinopathy Classification'],
    projects: ['Assistive Communication Device for Hard of Hearing Individuals'],
    tags: ['Speech Translation', 'Assistive Tech', 'Inclusive Education', 'Accessibility'],
    videoUrl: 'https://www.youtube.com/embed/Sce8b4EAt2U' // Inspiring tech presentation
  }
];

export default function Spotlight({ onTagClick, onNavigate }: SpotlightProps) {
  return (
    <section className="w-full bg-[#F8F9FA] border-y border-[#DADCE0] py-16 lg:py-24 px-6 lg:px-20 font-sans">
      <div className="mx-auto max-w-[1280px]">
        
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 text-[#4285F4] text-sm font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="h-4 w-4" />
            <span>Featured Spotlight</span>
          </div>
          <h2 className="font-display text-[32px] md:text-[48px] font-bold text-[#202124] tracking-tight">
            Research Spotlight
          </h2>
        </div>

        {/* Dynamic List */}
        <div className="space-y-16 md:space-y-24">
          {SPOTLIGHT_ITEMS.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
              >
                {/* Visual Media - Left on Even, Right on Odd */}
                <div className={`col-span-1 lg:col-span-7 ${!isEven ? 'lg:order-last' : ''}`}>
                  <motion.div 
                    className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#DADCE0] bg-black shadow-sm"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {/* Embedded YouTube video or authentic presentation with strict referer standards */}
                    <iframe
                      className="absolute inset-0 h-full w-full border-0"
                      src={item.videoUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                    ></iframe>
                  </motion.div>
                </div>

                {/* Content Details */}
                <div className="col-span-1 lg:col-span-5 space-y-6">
                  {/* Category & Project Link */}
                  <div className="flex flex-wrap items-center gap-x-2 text-[13px] font-semibold text-[#5F6368]">
                    <span className="text-[#4285F4] uppercase tracking-wider">{item.area}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">{item.subtitle}</span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="font-display text-[28px] md:text-[36px] font-bold text-[#202124] leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[17px] leading-relaxed text-[#5F6368]">
                      {item.description}
                    </p>
                  </div>

                  {/* Association indicators */}
                  <div className="border-y border-[#DADCE0] py-4 space-y-3">
                    <div className="flex items-start space-x-2.5 text-[14px]">
                      <Layers className="h-4 w-4 text-[#5F6368] mt-1 shrink-0" />
                      <div>
                        <span className="font-medium text-[#202124] block">Core Initiative</span>
                        <button
                          onClick={() => onNavigate('#/projects')}
                          className="text-[#4285F4] hover:underline text-left"
                        >
                          {item.projects[0]}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5 text-[14px]">
                      <BookOpen className="h-4 w-4 text-[#5F6368] mt-1 shrink-0" />
                      <div>
                        <span className="font-medium text-[#202124] block">Featured Publication</span>
                        <button
                          onClick={() => onNavigate('#/publications')}
                          className="text-[#4285F4] hover:underline text-left"
                        >
                          {item.publications[0]}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Tags */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#5F6368] uppercase tracking-wider">
                      <Tag className="h-3 w-3" />
                      <span>Clickable Focus Areas</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => onTagClick(tag)}
                          className="rounded-lg bg-white border border-[#DADCE0] px-3 py-1 font-sans text-xs font-medium text-[#202124] hover:border-[#4285F4] hover:text-[#4285F4] transition-all cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
