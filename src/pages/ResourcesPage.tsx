import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, BookOpen, GraduationCap, Compass, 
  HelpCircle, Users, Award, Layers, Globe, ShieldCheck, 
  Search, Download, FileText, Settings, ShieldAlert, Check, ChevronRight
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface ResourceItem {
  title: string;
  category: "essentials" | "templates" | "publication" | "circles" | "program" | "institutional" | "innovation" | "brand" | "reports";
  format: string;
  size: string;
  description: string;
}

const RESOURCE_ITEMS: ResourceItem[] = [
  // Essentials
  { title: "Introduction to Research Guide", category: "essentials", format: "PDF", size: "1.2 MB", description: "Foundational guide on establishing key hypotheses, literature reviews, and research questions." },
  { title: "Research Methodology Handbook", category: "essentials", format: "PDF", size: "3.4 MB", description: "Comprehensive methodologies handbook covering qualitative, quantitative, and interdisciplinary designs." },
  { title: "Research Ethics Handbook", category: "essentials", format: "PDF", size: "2.1 MB", description: "Ethics review processes, guidelines for human subjects research, consent metrics, and animal trials." },
  
  // Templates
  { title: "Research Proposal Template", category: "templates", format: "DOCX", size: "450 KB", description: "Official template for submitting formal student or faculty research proposals." },
  { title: "Literature Review Matrix", category: "templates", format: "XLSX", size: "320 KB", description: "Structured spreadsheet tool for cataloging, evaluating, and grouping scholarly references." },
  { title: "Research Logbook & Milestone Tracker", category: "templates", format: "PDF", size: "1.1 MB", description: "Template for documenting daily laboratory actions, experimental parameters, and reviews." },
  { title: "Conference Poster Template (A0 size)", category: "templates", format: "PPTX", size: "4.8 MB", description: "High-fidelity presentation poster layout with pre-selected typographic hierarchies." },

  // Publication Resources
  { title: "APA, Vancouver & IEEE Citation Style Guide", category: "publication", format: "PDF", size: "1.5 MB", description: "Formatting indices, references, citations, tables, and mechanical drawing figures." },
  { title: "Journal Selection & Indexing Guide", category: "publication", format: "PDF", size: "950 KB", description: "Indexes of highly credible SCI, Scopus, and peer-reviewed open access journals." },
  
  // Research Circle Resources
  { title: "Research Circle Starter Kit & Starter Handbook", category: "circles", format: "PDF", size: "2.8 MB", description: "Guidelines for organizing research circles, structuring discussions, and cataloging outcomes." },
  { title: "Reading Circle Discussion Planner", category: "circles", format: "DOCX", size: "210 KB", description: "Structured sheet for assigning papers, highlighting key claims, and mapping critiques." },

  // Program Resources
  { title: "KREST Fellowship Handbook", category: "program", format: "PDF", size: "5.2 MB", description: "The definitive guide to the KREST semester-long research journey and milestone criteria." },
  { title: "KRIP Internship Handbook", category: "program", format: "PDF", size: "1.8 MB", description: "Workbook and timelines for the 4-week field-exploration research challenge." },
  
  // Institutional Resources
  { title: "MoU Framework & Collaboration Guidelines", category: "institutional", format: "PDF", size: "1.3 MB", description: "Official institutional agreement frameworks, templates, and administrative metrics." },
  
  // Innovation Resources
  { title: "Design Thinking & Prototype Canvas", category: "innovation", format: "PDF", size: "2.2 MB", description: "Step-by-step canvas for mapping user empathy, defining problem clusters, and validating prototypes." },
  
  // Brand Resources
  { title: "Ré Official Brand & Presentation Toolkit", category: "brand", format: "ZIP", size: "14.5 MB", description: "Includes high-fidelity logos, SVG wordmarks, colors, and standard slide templates." },
  
  // Reports
  { title: "Ré Annual Impact Report 2025", category: "reports", format: "PDF", size: "8.1 MB", description: "A comprehensive review of a decade of student explorations, publications, and patents." }
];

const CATEGORIES = [
  { id: "all", label: "All Resources" },
  { id: "essentials", label: "Research Essentials" },
  { id: "templates", label: "Templates" },
  { id: "publication", label: "Publication Resources" },
  { id: "circles", label: "Research Circles" },
  { id: "program", label: "Programs" },
  { id: "institutional", label: "Institutional" },
  { id: "innovation", label: "Innovation" },
  { id: "brand", label: "Brand Assets" },
  { id: "reports", label: "Reports" }
];

export default function ResourcesPage({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = RESOURCE_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-white text-[#202124] font-sans selection:bg-[#4285F4]/15">
      
      {/* HERO */}
      <PageHeader
        category="RÉ FILE CENTER"
        title="Knowledge That Supports Every Journey"
        description="Every meaningful research journey is strengthened by access to the right knowledge, tools, and guidance. The Ré Resource Centre brings together carefully curated materials that support learners, educators, researchers, institutions, and collaborators at every stage of exploration, discovery, and contribution."
        accentColor="green"
        gradientTheme="blue"
        hideImages={false}
        images={[
          "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500&auto=format&fit=crop"
        ]}
      />

      {/* SECTION 1: ROLE-BASED RESOURCES */}
      <section className="border-b border-[#DADCE0] py-20 bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#1A73E8] uppercase block">TARGETED MATERIAL ACQUISITION</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Resources for Every Role
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              We compile specialized toolkits designed around your specific structural engagement within the ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { role: "Students", list: ["Research fundamentals", "Proposal templates", "Presentation formats", "Publication checklists", "Project logbooks"] },
              { role: "Educators", list: ["CORE course handbooks", "Mentorship guides", "Student evaluation rubrics", "Workshop design modules"] },
              { role: "Researchers", list: ["Advanced literature grids", "Publication workflow guides", "Plagiarism check standards", "Joint funding frameworks"] },
              { role: "Institutions", list: ["MoU templates", "Ecosystem roll-out manuals", "Capacity development plans", "Quality assurance metrics"] },
              { role: "Industry Partners", list: ["Problem intake procedures", "IP ownership frameworks", "Prototype validation standards", "Engagement brochures"] }
            ].map((roleGroup, i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">{roleGroup.role}</h3>
                <ul className="space-y-2">
                  {roleGroup.list.map((li, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <Check className="h-4 w-4 text-[#34A853]" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: CATALOG & KNOWLEDGE LIBRARY */}
      <section className="py-24 border-b border-[#DADCE0]" id="resource-catalog">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#1A73E8] uppercase block mb-2">COMPLETE DIRECTORY</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Resource Catalog</h2>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-3 rounded-full w-full md:max-w-md shadow-xs shrink-0">
              <Search className="h-4.5 w-4.5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search resources, guides, templates, reports..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-gray-900 outline-none w-full font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Filter Sidebar */}
            <div className="lg:col-span-3 space-y-2 sticky top-28">
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block px-3 mb-2">Categories</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-gray-900 text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right Resource Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredResources.map((res, i) => (
                  <motion.div
                    key={res.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2, delay: i * 0.02 }}
                    className="border border-gray-200 bg-white rounded-2xl p-6 flex flex-col justify-between hover:border-gray-400 hover:shadow-xs transition-all relative overflow-hidden group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                          {res.category.toUpperCase()}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-blue-600 uppercase">
                          {res.format} • {res.size}
                        </span>
                      </div>
                      
                      <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#1A73E8] transition-colors">
                        {res.title}
                      </h3>
                      
                      <p className="text-xs text-gray-500 leading-relaxed font-light">
                        {res.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">SECURE ASSET</span>
                      <button 
                        onClick={() => alert(`Beginning secure simulation download of: ${res.title}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A73E8] hover:underline cursor-pointer"
                      >
                        <Download className="h-4.5 w-4.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredResources.length === 0 && (
                <div className="col-span-2 text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl space-y-2">
                  <ShieldAlert className="h-8 w-8 text-gray-300 mx-auto" />
                  <h3 className="text-sm font-bold text-gray-600">No resources found</h3>
                  <p className="text-xs text-gray-400 font-light">Try adjusting your search criteria or selecting another category.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: ALWAYS GROWING */}
      <section className="py-20 bg-gray-900 text-white border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10 text-center space-y-6 max-w-3xl">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-400 uppercase block">KNOWLEDGE EVOLUTION</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Always Growing</h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Knowledge is continuously evolving, and so is the Resource Centre. New guides, templates, publications, learning materials, frameworks, and institutional resources are added regularly to support emerging opportunities. Visitors are encouraged to return, explore, and continue learning.
          </p>
        </div>
      </section>

      {/* SECTION 4: FINAL CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#1A73E8] uppercase block">PREPARE WITH ACCURATE TOOLKITS</span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Unlock the Resource Library
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            Explore a growing collection of knowledge, tools, templates, and guidance designed to strengthen research, encourage collaboration, and support meaningful learning.
          </p>
          <div className="pt-4">
            <button
              onClick={() => alert('Accessing core resource repository files...')}
              className="bg-gray-900 hover:bg-black text-white font-bold px-8 py-4 rounded-full transition-all text-sm cursor-pointer shadow-md"
            >
              Explore the Resource Centre
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
