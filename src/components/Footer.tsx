import React from 'react';
import { ArrowUpRight, Github, Linkedin, Youtube, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (hash: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    onNavigate(hash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F8F9FA] border-t border-[#DADCE0] text-[#202124] py-16 px-6 lg:px-20 font-sans">
      <div className="mx-auto max-w-[1280px]">
        {/* Main Footer Layout: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#DADCE0]">
          
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-display text-2xl font-black text-[#202124]">RÉ</span>
              <span className="text-[#c0c1c4] text-lg font-light">|</span>
              <span className="font-sans text-xs font-semibold tracking-wider uppercase text-[#5F6368]">
                Centre for Exploratory Research
              </span>
            </div>
            
            <p className="text-[#5F6368] text-[15px] leading-relaxed max-w-sm">
              Providing young scholars with structure, stipends, and specialized materials laboratories to convert pure curiosity into regional scientific translations.
            </p>
            
            <div className="pt-2 text-[14px] text-[#5F6368] font-medium">
              Kumaraguru Institutions, Coimbatore
            </div>
          </div>

          {/* Col 2: Affiliations */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[14px] font-semibold text-[#202124] uppercase tracking-wider">
              Core Affiliations
            </h4>
            <ul className="space-y-2 text-sm text-[#5F6368]">
              <li>
                <a 
                  href="https://www.kct.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between text-[14px] hover:text-[#4285F4] transition-colors group"
                >
                  <span>Kumaraguru College of Technology</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#4285F4]" />
                </a>
              </li>
              <li>
                <a 
                  href="https://kclas.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between text-[14px] hover:text-[#4285F4] transition-colors group"
                >
                  <span>Kumaraguru College of Liberal Arts & Science</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#4285F4]" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.kumaraguru.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between text-[14px] hover:text-[#4285F4] transition-colors group"
                >
                  <span>Kumaraguru Incubators</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#4285F4]" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.kumaraguru.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between text-[14px] hover:text-[#4285F4] transition-colors group"
                >
                  <span>Kumaraguru Institutions</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#4285F4]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Social */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[14px] font-semibold text-[#202124] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a href="#/research-areas" onClick={(e) => handleNavClick(e, '#/research-areas')} className="text-[#5F6368] hover:text-[#4285F4] transition-colors">
                  Research
                </a>
              </li>
              <li>
                <a href="#/programs" onClick={(e) => handleNavClick(e, '#/programs')} className="text-[#5F6368] hover:text-[#4285F4] transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#/events" onClick={(e) => handleNavClick(e, '#/events')} className="text-[#5F6368] hover:text-[#4285F4] transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#/careers" onClick={(e) => handleNavClick(e, '#/careers')} className="text-[#5F6368] hover:text-[#4285F4] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#/about" onClick={(e) => handleNavClick(e, '#/about')} className="text-[#5F6368] hover:text-[#4285F4] transition-colors">
                  About RÉ
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <h4 className="text-[12px] font-semibold text-[#202124] uppercase tracking-wider mb-2">Connect</h4>
              <div className="flex items-center space-x-3 text-[#5F6368]">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#4285F4] transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#EA4335] transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#FBBC05] transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[14px] font-semibold text-[#202124] uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="text-[14px] text-[#5F6368] leading-relaxed space-y-1">
              <p className="font-medium text-[#202124]">Kumaraguru Institutions Campus</p>
              <p>Athipalayam Road, Chinnavedampatti</p>
              <p>Coimbatore, Tamil Nadu 641049</p>
              <p className="pt-1 text-[#202124]">India</p>
            </div>
            <div className="pt-1 text-[13px] text-[#4285F4] font-medium">
              Email: student.research@kct.ac.in
            </div>
          </div>

        </div>

        {/* Lower Footer Area containing the mandatory "System Identity" */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-widest block">
              System Identity / Registered Scopes
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#5F6368]">
              <span className="flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]"></span>
                <span>KREST Fellowship Schemes</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]"></span>
                <span>KRIP Internships</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC05]"></span>
                <span>NFRC Materials Fabrications Research</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335]"></span>
                <span>Vatteluttu Vision OCR Registries</span>
              </span>
            </div>
          </div> */}

          <div className="w-full text-center text-[13px] text-[#5F6368]">
            <span>&copy; {currentYear} RÉ — Centre for Exploratory Research. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
