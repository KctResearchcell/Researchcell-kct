import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Cpu, Layers, BookOpen, ShieldAlert, Zap } from 'lucide-react';
import { RESEARCH_AREAS, PROJECTS, PUBLICATIONS, LABS, CHALLENGES } from '../data';

interface SearchOverlayProps {
  onClose: () => void;
  onNavigate: (hash: string) => void;
}

export default function SearchOverlay({ onClose, onNavigate }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Block scrolling of background while search overlay is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleItemClick = (hash: string) => {
    onNavigate(hash);
    onClose();
  };

  // Carry out searches across ALL models
  const matchedAreas = query
    ? RESEARCH_AREAS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedProjects = query
    ? PROJECTS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.leader.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedPublications = query
    ? PUBLICATIONS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.abstract.toLowerCase().includes(query.toLowerCase()) ||
        item.authors.some(a => a.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const matchedLabs = query
    ? LABS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const totalResults = matchedAreas.length + matchedProjects.length + matchedPublications.length + matchedLabs.length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/98 backdrop-blur-md transition-all animate-fadeIn font-sans">
      
      {/* Top Search bar Input */}
      <div className="h-[80px] border-b border-[#DADCE0] w-full flex items-center justify-between px-6 lg:px-20">
        <div className="flex items-center space-x-3 flex-1 max-w-4xl">
          <Search className="h-6 w-6 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search across research areas, projects, labs, and publications..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-xl md:text-2xl outline-none font-sans font-medium text-[#202124] placeholder-gray-400"
          />
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#5F6368] hover:text-[#202124] hover:bg-gray-100 rounded-full transition-all cursor-pointer"
          title="Close search panel (Esc)"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Results Workspace */}
      <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-20">
        <div className="max-w-[900px] mx-auto">
          
          {!query ? (
            <div className="py-20 text-center space-y-4">
              <span className="text-[13px] font-bold text-[#5F6368] uppercase tracking-widest block">Query Directives</span>
              <p className="text-2xl font-bold text-[#202124] tracking-tight">What are you exploring today?</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2 max-w-lg mx-auto">
                {['Vatteluttu OCR', 'Banana fibre Composites', 'Rural Education', 'Materials Prototyping', 'Diabetic Retinopathy'].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full bg-[#F8F9FA] hover:bg-gray-100 border border-[#DADCE0] px-3.5 py-1.5 text-xs font-semibold text-gray-700 cursor-pointer"
                  >
                    "{s}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Results metrics */}
              <div className="text-sm font-semibold text-[#5F6368]">
                Found {totalResults} matches for "{query}"
              </div>

              {totalResults === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <p className="text-lg text-[#5F6368]">No listings found across our research directories.</p>
                  <p className="text-xs text-gray-400">Try searching broad domains like "materials", "AI", "heritage", or physical terms.</p>
                </div>
              ) : (
                <div className="space-y-8 pb-12">
                  
                  {/* Matching Research Areas */}
                  {matchedAreas.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[#4285F4] uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
                        <Cpu className="h-3.5 w-3.5" />
                        <span>Research Domains ({matchedAreas.length})</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {matchedAreas.map((area) => (
                          <div
                            key={area.id}
                            onClick={() => handleItemClick('#/research-areas')}
                            className="bg-gray-50 border border-[#DADCE0] p-4 rounded-xl cursor-pointer hover:border-[#4285F4] hover:bg-white transition-all"
                          >
                            <span className="font-bold text-[15px] text-gray-900 block">{area.title}</span>
                            <span className="text-xs text-[#5F6368] line-clamp-1 mt-1">{area.summary}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Projects */}
                  {matchedProjects.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[#34A853] uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
                        <Layers className="h-3.5 w-3.5" />
                        <span>Research Initiatives ({matchedProjects.length})</span>
                      </h4>
                      <div className="space-y-2">
                        {matchedProjects.map((project) => (
                          <div
                            key={project.id}
                            onClick={() => handleItemClick('#/projects')}
                            className="bg-gray-50 border border-[#DADCE0] p-4 rounded-xl cursor-pointer hover:border-[#34A853] hover:bg-white transition-all flex justify-between items-center"
                          >
                            <div>
                              <span className="font-bold text-[15px] text-gray-900 block">{project.title}</span>
                              <span className="text-xs text-[#5F6368] line-clamp-1 mt-1">{project.description}</span>
                            </div>
                            <span className="text-[11px] font-mono font-bold uppercase text-[#5F6368] bg-white border border-[#DADCE0] rounded px-2.5 py-0.5 shrink-0 ml-4 hidden sm:block">
                              {project.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Publications */}
                  {matchedPublications.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[#EA4335] uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Peer-reviewed Papers ({matchedPublications.length})</span>
                      </h4>
                      <div className="space-y-2">
                        {matchedPublications.map((pub) => (
                          <div
                            key={pub.id}
                            onClick={() => handleItemClick('#/publications')}
                            className="bg-gray-50 border border-[#DADCE0] p-4 rounded-xl cursor-pointer hover:border-[#EA4335] hover:bg-white transition-all"
                          >
                            <span className="font-bold text-[15px] text-gray-900 block">{pub.title}</span>
                            <span className="text-xs text-[#5F6368] block mt-1">{pub.authors.join(', ')} • {pub.journal} ({pub.year})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Labs */}
                  {matchedLabs.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[#4285F4] uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
                        <Zap className="h-3.5 w-3.5" />
                        <span>Specialized Laboratories ({matchedLabs.length})</span>
                      </h4>
                      <div className="space-y-2">
                        {matchedLabs.map((lab) => (
                          <div
                            key={lab.id}
                            onClick={() => handleItemClick('#/labs')}
                            className="bg-gray-50 border border-[#DADCE0] p-4 rounded-xl cursor-pointer hover:border-[#4285F4] hover:bg-white transition-all"
                          >
                            <span className="font-bold text-[15px] text-gray-900 block">{lab.title}</span>
                            <span className="text-xs text-[#5F6368] line-clamp-1 mt-1">{lab.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
