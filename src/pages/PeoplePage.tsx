import React, { useState } from 'react';
import { MEMBERS } from '../data';
import { Users, Mail, Search, Award, GraduationCap, Star, BookOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const STUDENT_SCHOLARS = [
  {
    name: "Karan",
    role: "KRIP Scholar",
    circle: "Battery Research Circle",
    topic: "Eco-Acoustic Composite Modellers",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Catherine",
    role: "KREST Fellow",
    circle: "Natural Fibre Research Centre",
    topic: "Green Composites & Acoustics",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Peter",
    role: "REFLECT Scholar",
    circle: "Environmental Systems Circle",
    topic: "Natural Composites Characterization",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Anjali",
    role: "NLP Research Intern",
    circle: "AI & Data Science Circle",
    topic: "Vatteluttu Vision OCR & Linguistics",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  }
];

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "faculty" | "scholars">("all");

  const filteredFaculty = MEMBERS.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredScholars = STUDENT_SCHOLARS.filter(scholar =>
    scholar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholar.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholar.circle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full font-sans text-[#202124] bg-white">
      <PageHeader 
        category="RÉ INTELLECTUAL COMMUNITY"
        title="Our People & Scholars"
        description="Meet the dedicated faculty mentors, industry-aligned advisors, and undergraduate explorers driving scientific inquiry and regional translations at Kumaraguru Institutions."
        accentColor="green"
        gradientTheme="green"
        images={[
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=500&auto=format&fit=crop"
        ]}
      />

      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-20">
        
        {/* Search & Tabs Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#DADCE0] mb-12">
          <div className="flex items-center space-x-2 bg-[#F8F9FA] border border-[#DADCE0] rounded-full px-5 py-3 w-full md:max-w-md shadow-sm">
            <Search className="h-4.5 w-4.5 text-gray-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Search by name, role, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-medium"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 border cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#1A73E8] border-[#1A73E8] text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              All Community
            </button>
            <button
              onClick={() => setActiveTab("faculty")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 border cursor-pointer ${
                activeTab === "faculty"
                  ? "bg-[#1A73E8] border-[#1A73E8] text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Faculty Core
            </button>
            <button
              onClick={() => setActiveTab("scholars")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 border cursor-pointer ${
                activeTab === "scholars"
                  ? "bg-[#1A73E8] border-[#1A73E8] text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Student Scholars
            </button>
          </div>
        </div>

        {/* Executive Mentors Block (Static for high-fidelity authority) */}
        {searchQuery === "" && activeTab !== "scholars" && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 text-[#1A73E8] text-xs font-bold uppercase tracking-widest mb-4">
              <Award className="h-4.5 w-4.5" />
              <span>Leadership & Advisory Board</span>
            </div>
            <h2 className="font-display text-[28px] md:text-[34px] font-bold text-gray-900 tracking-tight leading-tight mb-8">
              Guiding Academic and Scientific Directions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-[#DADCE0] rounded-2xl p-6 bg-[#F8F9FA] shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">PATRON</span>
                <h3 className="font-display text-[19px] font-bold text-gray-900">Sri. Balasubramaniam</h3>
                <p className="text-xs text-gray-500 font-medium mb-3">President, Kumaraguru Institutions</p>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Directing the long-term vision of Kumaraguru Institutions, ensuring resources and infrastructure empower young explorers.
                </p>
              </div>

              <div className="border border-[#DADCE0] rounded-2xl p-6 bg-[#F8F9FA] shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">EXECUTIVE DIRECTOR</span>
                <h3 className="font-display text-[19px] font-bold text-gray-900">Sri. Shankar Vanavarayar</h3>
                <p className="text-xs text-gray-500 font-medium mb-3">Joint Correspondent, Kumaraguru Institutions</p>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Advocated structural frameworks of inquiry over traditional classrooms, initiating the establishment of RÉ.
                </p>
              </div>

              <div className="border border-[#DADCE0] rounded-2xl p-6 bg-[#F8F9FA] shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">DEAN RESEARCH</span>
                <h3 className="font-display text-[19px] font-bold text-gray-900">Dr. D. Saravanan</h3>
                <p className="text-xs text-gray-500 font-medium mb-3">Dean Research & Innovation, KCT</p>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Overseeing academic compliance, peer-review panels, journal indexations, and patent filings across all departments.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Faculty Core Directory Grid */}
        {(activeTab === "all" || activeTab === "faculty") && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 text-[#34A853] text-xs font-bold uppercase tracking-widest mb-4">
              <Users className="h-4.5 w-4.5" />
              <span>Faculty Core Coordinators ({filteredFaculty.length})</span>
            </div>
            <h2 className="font-display text-[28px] md:text-[34px] font-bold text-gray-900 tracking-tight leading-tight mb-8">
              Mentoring Scientific Investigations
            </h2>

            {filteredFaculty.length === 0 ? (
              <p className="text-gray-500 py-6 border border-dashed border-gray-200 rounded-xl text-center">No faculty members match your query.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFaculty.map((member, idx) => (
                  <div 
                    key={idx} 
                    className="border border-[#DADCE0] rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between bg-white"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">
                        {member.designation}
                      </span>
                      <h3 className="font-display text-[20px] font-bold text-gray-900">{member.name}</h3>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight">{member.role}</p>
                      <p className="text-sm text-gray-600 leading-relaxed font-light pt-2">{member.bio}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#DADCE0] flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1.5">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span>{member.publicationsCount}+ publications</span>
                      </div>
                      <a href={`mailto:info@kumaraguru.edu`} className="text-[#1A73E8] hover:underline flex items-center space-x-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Student Scholars Grid */}
        {(activeTab === "all" || activeTab === "scholars") && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-[#FBBC05] text-xs font-bold uppercase tracking-widest mb-4">
              <GraduationCap className="h-4.5 w-4.5" />
              <span>Student Researchers ({filteredScholars.length})</span>
            </div>
            <h2 className="font-display text-[28px] md:text-[34px] font-bold text-gray-900 tracking-tight leading-tight mb-8">
              Outstanding Fellows & Scholars
            </h2>

            {filteredScholars.length === 0 ? (
              <p className="text-gray-500 py-6 border border-dashed border-gray-200 rounded-xl text-center">No student scholars match your query.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredScholars.map((scholar, idx) => (
                  <div 
                    key={idx}
                    className="border border-[#DADCE0] rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition-all bg-white text-center flex flex-col items-center"
                  >
                    <img 
                      src={scholar.avatar} 
                      alt={scholar.name} 
                      className="h-16 w-16 rounded-full object-cover border border-gray-200 mb-4 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">{scholar.role}</span>
                    <h3 className="font-display text-[18px] font-bold text-gray-900 leading-tight mb-1">{scholar.name}</h3>
                    <p className="text-[11px] font-semibold text-gray-500 leading-tight uppercase tracking-wider mb-3">{scholar.circle}</p>
                    
                    <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[12px] text-gray-600 font-light mt-auto w-full">
                      <span className="font-semibold block text-[10px] text-gray-400 uppercase tracking-wider mb-1">STUDY TOPIC</span>
                      "{scholar.topic}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}