import React, { useState } from 'react';
import { PUBLICATIONS } from '../data';
import { FileText, Search, ChevronDown, ChevronUp, ExternalLink, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import PageHeader from '../components/PageHeader';

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedPubId, setExpandedPubId] = useState<string | null>(null);

  // Derive logical research categories from loaded papers
  const categories = ['all', ...Array.from(new Set(PUBLICATIONS.map(pub => pub.category)))];

  const filteredPublications = PUBLICATIONS.filter((pub) => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      activeCategory === 'all' || pub.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleAbstract = (id: string) => {
    if (expandedPubId === id) {
      setExpandedPubId(null);
    } else {
      setExpandedPubId(id);
    }
  };

  return (
    <div className="w-full font-sans text-[#202124]">
      {/* 1:1 Google Research Replica Editorial Title Header */}
      <PageHeader 
        category="SCHOLARLY DISSEMINATIONS"
        title="Publications"
        description="Browse peer-reviewed journal studies, conference proceedings, and patented blueprints developed by core RÉ fellows and international research teams."
        accentColor="green"
        gradientTheme="red"
        images={[
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=500&auto=format&fit=crop"
        ]}
      />

      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-20">

      {/* Grid search and select */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
        
        {/* Left Side Filter categories */}
        <div className="lg:col-span-3 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] p-5 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <Filter className="h-4 w-4 text-[#5F6368]" />
            <span className="text-xs font-bold uppercase tracking-wider">Publications Catalog</span>
          </div>

          <div className="flex flex-col space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-[14px] font-medium transition-colors capitalize cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-[#EA4335]/5 text-[#EA4335]' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {cat === 'all' ? 'All Publications' : cat}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#DADCE0] text-xs text-gray-400">
            All listed materials follow double-blind index benchmarks and reference active DOIs.
          </div>
        </div>

        {/* Right Side: Main list search and rendering */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Search bar input widget */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Filter by title, author names or journal venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#DADCE0] rounded-xl pl-11 pr-4 py-3.5 text-[15px] focus:outline-none focus:border-[#EA4335] transition-colors shadow-sm"
            />
          </div>

          {/* List display */}
          <div className="space-y-4">
            {filteredPublications.length === 0 ? (
              <div className="text-center py-16 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
                <p className="text-[#5F6368]">No academic papers match your search parameters.</p>
              </div>
            ) : (
              filteredPublications.map((pub) => {
                const isExpanded = expandedPubId === pub.id;
                return (
                  <div
                    key={pub.id}
                    className="border border-[#DADCE0] rounded-xl bg-white p-6 hover:shadow-xs transition-shadow space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="inline-block bg-gray-100 text-gray-600 font-mono text-[11px] font-bold uppercase px-2.5 py-0.5 rounded">
                          {pub.category}
                        </span>
                        
                        <h3 className="text-[18px] md:text-[20px] font-bold text-[#202124] tracking-tight leading-snug">
                          {pub.title}
                        </h3>

                        <p className="text-[15px] text-gray-800 font-medium">
                          {pub.authors.join(', ')}
                        </p>

                        <p className="text-[14px] text-[#5F6368] italic">
                          {pub.journal} — {pub.year}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 border border-[#DADCE0] hover:border-[#EA4335] text-gray-500 hover:text-[#EA4335] rounded-lg transition-colors inline-flex items-center space-x-1.5 text-xs font-semibold"
                          title="Open DOI record"
                        >
                          <span>DOI</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>

                    {/* Toggle Abstract block */}
                    <div>
                      <button
                        onClick={() => toggleAbstract(pub.id)}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-[#EA4335] uppercase tracking-wider hover:underline focus:outline-none cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Hide Abstract</span>
                            <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <span>Read Abstract</span>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 p-4 bg-[#F8F9FA] rounded-lg border border-[#DADCE0] text-[14px] text-[#5F6368] leading-relaxed"
                        >
                          <p className="font-semibold text-[#202124] mb-1">Abstract Summary:</p>
                          {pub.abstract}
                        </motion.div>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

    </div>
    </div>
  );
}
