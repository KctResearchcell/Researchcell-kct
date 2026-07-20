import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, BookOpen, GraduationCap, Compass, 
  HelpCircle, Users, Award, Layers, Globe, ShieldCheck, 
  Search, BookOpenCheck, PlayCircle, Headphones, ArrowUpRight, CheckCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface Topic {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  bgLight: string;
  borderColor: string;
  articlesCount: string;
}

const TOPICS: Topic[] = [
  {
    id: "fundamentals",
    title: "Research Fundamentals",
    desc: "Understanding the bedrock foundations of scientific research, inquiry frameworks, and formulating clean hypotheses.",
    icon: <BookOpen className="h-5 w-5 text-blue-600" />,
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    articlesCount: "42 Articles"
  },
  {
    id: "methodology",
    title: "Research Methodology",
    desc: "Choosing appropriate quantitative/qualitative research methods, scientific study designs, and telemetry integrations.",
    icon: <Compass className="h-5 w-5 text-emerald-600" />,
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    articlesCount: "35 Articles"
  },
  {
    id: "writing",
    title: "Academic Writing",
    desc: "Mastering how to write academic proposals, journal manuscripts, structured dissertations, and technical reports.",
    icon: <Layers className="h-5 w-5 text-purple-600" />,
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    articlesCount: "28 Articles"
  },
  {
    id: "publication",
    title: "Publication",
    desc: "Publishing ethically and effectively, navigating double-blind peer review, and selecting high-impact indexed journals.",
    icon: <Award className="h-5 w-5 text-yellow-600" />,
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
    articlesCount: "19 Articles"
  },
  {
    id: "innovation",
    title: "Innovation",
    desc: "Transforming raw academic research into functional, commercial prototypes, active licensing models, and startups.",
    icon: <Zap className="h-5 w-5 text-orange-600" />,
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    articlesCount: "24 Articles"
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    desc: "Guidelines for responsible, clean, and ethical use of AI models in classroom learning, research modeling, and coding.",
    icon: <Cpu className="h-5 w-5 text-indigo-600" />,
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    articlesCount: "15 Articles"
  },
  {
    id: "ethics",
    title: "Research Ethics",
    desc: "Integrity, transparency, active plagiarism checking, and responsible academic decision-making across cohorts.",
    icon: <ShieldCheck className="h-5 w-5 text-rose-600" />,
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
    articlesCount: "12 Articles"
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    desc: "Qualitative and quantitative analysis, statistical tools, mechanical modeling tools, and GIS stream visualizations.",
    icon: <Globe className="h-5 w-5 text-teal-600" />,
    bgLight: "bg-teal-50",
    borderColor: "border-teal-200",
    articlesCount: "31 Articles"
  }
];

const PATHWAYS_KNOWLEDGE = [
  {
    title: "Beginning Research",
    steps: ["What is Research?", "Choosing a Topic", "Literature Review", "Research Questions", "Methodology", "Ethics"],
    color: "border-blue-200 bg-blue-50/40 text-blue-800"
  },
  {
    title: "Academic Writing",
    steps: ["Structuring Papers", "Referencing Styles", "Figures & Tables", "Peer Review", "Publishing"],
    color: "border-purple-200 bg-purple-50/40 text-purple-800"
  },
  {
    title: "Innovation Journey",
    steps: ["Problem Identification", "Design Thinking", "Validation", "Prototyping", "Impact Matrix"],
    color: "border-emerald-200 bg-emerald-50/40 text-emerald-800"
  }
];

import { Cpu, Zap } from 'lucide-react';

export default function KnowledgeHubPage({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = TOPICS.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-white text-[#202124] font-sans selection:bg-[#9333EA]/15">
      
      {/* HERO */}
      <PageHeader
        category="RÉ KNOWLEDGE CENTER"
        title="Explore. Learn. Grow"
        description="Knowledge becomes more meaningful when it is shared, understood, and applied. The Ré Knowledge Hub brings together carefully curated learning resources, research guides, practical toolkits, and educational content to support every stage of the research journey."
        accentColor="green"
        gradientTheme="purple"
        hideImages={false}
        images={[
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=500&auto=format&fit=crop"
        ]}
      />

      {/* SECTION 1: LEARNING NEVER STOPS */}
      <section className="border-b border-[#DADCE0] py-20 bg-gray-50/50" id="explore-hub">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#9333EA] uppercase block">OUR CORE VALUES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1C2E4A] leading-tight">
              Learning Never Stops
            </h2>
            <div className="h-1.5 w-16 bg-[#9333EA] rounded-full" />
            <p className="text-base text-[#5F6368] font-light leading-relaxed">
              Curiosity grows through continuous learning. The Knowledge Hub has been designed as an evolving collection of articles, learning resources, practical guides, videos, templates, frameworks, and expert insights that help learners, educators, researchers, and institutions strengthen their understanding of research and innovation.
            </p>
            <p className="text-base text-[#1C2E4A] font-bold">
              Whether you are asking your first research question or leading interdisciplinary collaborations, there is always something new to discover.
            </p>
          </div>

          <div className="lg:col-span-6 bg-white border border-[#DADCE0] rounded-3xl p-8 shadow-xs flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BookOpenCheck className="h-5 w-5 text-[#9333EA]" /> Repository Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-100 bg-gray-50/50 p-4 rounded-xl text-center">
                <span className="text-3xl font-black text-gray-900 block">500+</span>
                <span className="text-[10px] text-gray-400 font-mono font-bold tracking-widest block uppercase mt-1">Articles</span>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 p-4 rounded-xl text-center">
                <span className="text-3xl font-black text-gray-900 block">200+</span>
                <span className="text-[10px] text-gray-400 font-mono font-bold tracking-widest block uppercase mt-1">Videos</span>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 p-4 rounded-xl text-center">
                <span className="text-3xl font-black text-gray-900 block">50+</span>
                <span className="text-[10px] text-gray-400 font-mono font-bold tracking-widest block uppercase mt-1">Podcasts</span>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 p-4 rounded-xl text-center">
                <span className="text-3xl font-black text-gray-900 block">100+</span>
                <span className="text-[10px] text-gray-400 font-mono font-bold tracking-widest block uppercase mt-1">Infographics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXPLORE BY TOPIC */}
      <section className="py-24 border-b border-[#DADCE0]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#9333EA] uppercase block mb-2">INTERACTIVE KNOWLEDGE EXPLORER</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Explore by Topic
              </h2>
            </div>
            
            {/* Search Input bar */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-full w-full md:max-w-xs shadow-xs shrink-0">
              <Search className="h-4 w-4 text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-gray-900 outline-none w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Topics grid list (cols 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTopics.map((topic) => {
                const isActive = selectedTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                      isActive
                        ? "border-[#9333EA] bg-[#9333EA]/5 shadow-xs"
                        : "border-gray-100 bg-white hover:border-gray-300 shadow-xs"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${isActive ? 'bg-[#9333EA]/15' : 'bg-gray-50'} shrink-0`}>
                      {topic.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-gray-900">{topic.title}</h3>
                      <p className="text-xs text-gray-400 font-mono font-bold uppercase tracking-wider">{topic.articlesCount}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Topic Detail (cols 4) */}
            <div className="lg:col-span-4 bg-white border border-[#DADCE0] rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTopic.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 text-left"
                >
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">TOPIC INSIGHT</span>
                  <h3 className="text-lg font-bold text-gray-900">{selectedTopic.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {selectedTopic.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <button
                  onClick={() => onNavigate('#/resources')}
                  className="w-full py-3 rounded-xl border border-[#9333EA] hover:bg-[#9333EA]/5 text-[#9333EA] font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Resources</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LEARN YOUR WAY */}
      <section className="py-24 border-b border-[#DADCE0] bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#9333EA] uppercase block">DIVERSE MEDIA CHANNELS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Learn Your Way
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              We offer instructional, scholarly, and case learning formats across multiple digital channels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Articles", desc: "Thoughtfully written educational content covering citation guides, ethics, and paper reviews.", icon: <BookOpen className="h-6 w-6 text-blue-500" /> },
              { title: "Videos", desc: "Recorded workshops, tutorials, research film highlights, and expert symposium archives.", icon: <PlayCircle className="h-6 w-6 text-red-500" /> },
              { title: "Podcasts", desc: "Coffee table conversations with experienced faculty mentors and senior KREST research fellows.", icon: <Headphones className="h-6 w-6 text-purple-500" /> }
            ].map((media, i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 rounded-2xl text-left hover:border-gray-400 transition-all shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-xl inline-block">{media.icon}</div>
                  <h3 className="text-base font-bold text-gray-900">{media.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{media.desc}</p>
                </div>
                <button onClick={() => onNavigate('#/resources')} className="text-xs font-bold text-[#9333EA] flex items-center gap-1 hover:underline pt-6 mt-auto">
                  <span>Browse {media.title}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED LEARNING PATHS */}
      <section className="py-24 border-b border-[#DADCE0]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#9333EA] uppercase block">GUIDED INTENTIONAL SEQUENCES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Featured Learning Paths
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Instead of isolated articles, group content into journeys. These pathways make learning intentional rather than random.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PATHWAYS_KNOWLEDGE.map((path, i) => (
              <div key={i} className="border border-gray-200 bg-white rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">{path.title}</h3>
                  <div className="space-y-2">
                    {path.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-1 border-b border-gray-50 last:border-0">
                        <span className="text-[10px] font-mono font-bold text-gray-400">0{idx + 1}</span>
                        <span className="text-xs text-gray-700 font-semibold">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('#/resources')}
                  className="w-full mt-6 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Start Learning Path
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: RECOMMENDED FOR YOU */}
      <section className="py-20 border-b border-[#DADCE0] bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400 uppercase block">INTELLIGENT CONTENT DELIVERY</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Recommended for You</h2>
            <p className="text-base text-gray-300 font-light leading-relaxed">
              If someone explores AI Research inside Ré, the portal automatically suggets auxiliary articles, ethics constraints, and relevant datasets:
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400"><CheckCircle className="h-4 w-4" /> Suggested: AI Ethics & Machine Learning Basics</div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400"><CheckCircle className="h-4 w-4" /> Suggested: Localized caption generator telemetry</div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400"><CheckCircle className="h-4 w-4" /> Suggested: KREST Orientation Handbooks</div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold mb-4 font-mono text-purple-400">RELATED ECOSYSTEM LINKS</h3>
            <div className="space-y-2.5 font-mono text-[11px] text-gray-300">
              <a href="#/research-areas" className="block hover:text-white transition-colors">↳ Explore active Research Circles</a>
              <a href="#/programs" className="block hover:text-white transition-colors">↳ Browse credit-bearing CORE courses</a>
              <a href="#/publications" className="block hover:text-white transition-colors">↳ Read our indexed Publications</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#9333EA] uppercase block">EVERY QUESTION OPENS THE DOOR</span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Start Your Exploration
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            Explore resources that inspire deeper understanding, strengthen research capabilities, and encourage lifelong learning within the Ré ecosystem.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('#/resources')}
              className="bg-gray-900 hover:bg-black text-white font-bold px-8 py-4 rounded-full transition-all text-sm cursor-pointer shadow-md"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
