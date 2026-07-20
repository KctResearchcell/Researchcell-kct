import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Sprout, HeartPulse, Zap, Navigation, 
  GraduationCap, Compass, HelpCircle, Users, Award, BookOpen, 
  Layers, Building, Link2, CheckCircle, ChevronDown
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface EcosystemNode {
  id: string;
  name: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  color: string;
  bgLight: string;
}

const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "impact",
    name: "IMPACT",
    description: "Research creating lasting value for society, industry, and local communities.",
    details: "The ultimate culmination of inquiry: deploying green concrete, commercializing EV trikes, and captioning classrooms.",
    icon: <Award className="h-5 w-5 text-[#EA4335]" />,
    color: "text-[#EA4335]",
    bgLight: "bg-[#EA4335]/10"
  },
  {
    id: "publications",
    name: "PUBLICATIONS",
    description: "Discoveries communicated, peer-reviewed, and preserved.",
    details: "Indexing research findings in leading global scientific journals and regional linguistic archives.",
    icon: <BookOpen className="h-5 w-5 text-[#4285F4]" />,
    color: "text-[#4285F4]",
    bgLight: "bg-[#4285F4]/10"
  },
  {
    id: "innovation",
    name: "INNOVATION",
    description: "Ideas transformed into physical products and actionable patents.",
    details: "Prototyping mechanical components, formulating sustainable composites, and designing digital applications.",
    icon: <Zap className="h-5 w-5 text-[#FBBC05]" />,
    color: "text-[#FBBC05]",
    bgLight: "bg-[#FBBC05]/10"
  },
  {
    id: "research",
    name: "RESEARCH",
    description: "Purposeful exploration driven by evidence-based questions.",
    details: "The core engine of investigation, utilizing advanced laboratories and computational telemetry.",
    icon: <Layers className="h-5 w-5 text-[#1A73E8]" />,
    color: "text-[#1A73E8]",
    bgLight: "bg-[#1A73E8]/10"
  },
  {
    id: "knowledge-hub",
    name: "KNOWLEDGE HUB",
    description: "Open educational resources supporting subsequent cohorts.",
    details: "Providing handbooks, research methodologies, and literature matrix guidelines publicly.",
    icon: <GraduationCap className="h-5 w-5 text-[#9333EA]" />,
    color: "text-[#9333EA]",
    bgLight: "bg-[#9333EA]/10"
  },
  {
    id: "circles",
    name: "RESEARCH CIRCLES",
    description: "Long-term interdisciplinary communities fostering collective learning.",
    details: "Sustaining knowledge across student generations so cohorts never have to start from scratch.",
    icon: <Users className="h-5 w-5 text-[#34A853]" />,
    color: "text-[#34A853]",
    bgLight: "bg-[#34A853]/10"
  },
  {
    id: "programs",
    name: "PROGRAMS",
    description: "Structured academic pathways (KREST, KRIP, CORE, UROP).",
    details: "Acquiring rigorous methodology, evaluation matrixes, and continuous mentorship support.",
    icon: <Compass className="h-5 w-5 text-indigo-600" />,
    color: "text-indigo-600",
    bgLight: "bg-indigo-50"
  },
  {
    id: "mentorship",
    name: "MENTORSHIP",
    description: "Experienced guides enabling others to discover their potential.",
    details: "Faculty facilitators and domain experts working alongside scholars to refine questions and test assumptions.",
    icon: <Sparkles className="h-5 w-5 text-emerald-600" />,
    color: "text-emerald-600",
    bgLight: "bg-emerald-50"
  },
  {
    id: "curiosity",
    name: "CURIOSITY",
    description: "The spark that begins every single discovery journey.",
    details: "An open invitation to observe closely, think deeply, and ask bold questions without academic barriers.",
    icon: <Sprout className="h-5 w-5 text-orange-600" />,
    color: "text-orange-600",
    bgLight: "bg-orange-50"
  }
];

const JOURNEYS = [
  {
    role: "I'm a Student",
    path: ["Curiosity", "Programs", "Research Circles", "Publications", "Impact"],
    desc: "Start with a simple question, join a structured fellowship like KREST, integrate into a Research Circle, publish your results, and deploy a physical prototype.",
    color: "border-blue-500 text-blue-600 bg-blue-50"
  },
  {
    role: "I'm an Educator",
    path: ["Mentorship", "Programs", "Research", "Publications"],
    desc: "Guide emerging scholars, facilitate research-infused CORE courses, co-author scholarly publications, and earn national mentorship recognition.",
    color: "border-emerald-500 text-emerald-600 bg-emerald-50"
  },
  {
    role: "I'm a Researcher",
    path: ["Collaboration", "Research", "Publications", "Innovation"],
    desc: "Run advanced experiments, publish in peer-reviewed journals, file patents, and establish international joint lab initiatives.",
    color: "border-purple-500 text-purple-600 bg-purple-50"
  },
  {
    role: "I'm an Institution",
    path: ["Partnership", "Programs", "Research Culture", "Impact"],
    desc: "Embed the Ré framework inside your regular academic curriculum, elevate faculty research capacity, and build connected knowledge archives.",
    color: "border-indigo-500 text-indigo-600 bg-indigo-50"
  },
  {
    role: "I'm an Industry Partner",
    path: ["Collaboration", "Innovation", "Applied Research", "Community Impact"],
    desc: "Sponsor interdisciplinary challenges, access functional prototypes, co-develop IP, and acquire research-ready undergraduate scholars.",
    color: "border-orange-500 text-orange-600 bg-orange-50"
  }
];

export default function EcosystemPage({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const [selectedNode, setSelectedNode] = useState<EcosystemNode>(ECOSYSTEM_NODES[3]); // research default
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState<number>(0);

  return (
    <div className="w-full bg-white text-[#202124] font-sans selection:bg-[#34A853]/15">
      
      {/* HERO */}
      <PageHeader
        category="THE RÉ ECOSYSTEM"
        title="One Ecosystem. Infinite Possibilities"
        description="Every meaningful journey begins with curiosity. Within the Ré ecosystem, curiosity evolves into inquiry, inquiry into research, research into knowledge, and knowledge into meaningful impact. Every initiative, every programme, every collaboration, and every individual is connected through a shared purpose—to cultivate discovery that benefits society."
        accentColor="green"
        gradientTheme="green"
        hideImages={false}
        images={[
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop"
        ]}
      />

      {/* SECTION 1: EVERYTHING IS CONNECTED */}
      <section className="border-b border-[#DADCE0] py-20 bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#34A853] uppercase block">THE CONNECTIVITY RULE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1C2E4A] leading-tight">
              Everything is Connected
            </h2>
            <div className="h-1.5 w-16 bg-[#34A853] rounded-full" />
            <p className="text-base text-[#5F6368] font-light leading-relaxed">
              Research is never a single activity. It is a living ecosystem where people, ideas, opportunities, knowledge, and collaboration continuously influence one another.
            </p>
            <p className="text-base text-[#5F6368] font-light leading-relaxed">
              At Ré, every experience is intentionally connected. A learner may begin with curiosity, join a Research Circle, participate in a programme, publish research, collaborate with mentors, contribute to innovation, and eventually inspire the next generation of researchers.
            </p>
            <p className="text-base text-[#1C2E4A] font-bold">
              There is no single starting point. There is only the journey.
            </p>
          </div>

          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#DADCE0] bg-white p-8 shadow-xs flex flex-col justify-center min-h-[350px]">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Link2 className="h-32 w-32 text-gray-900" /></div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-xl font-bold text-gray-900">How Ideas Ripple Across Ré</h3>
              <div className="space-y-3 font-mono text-xs text-[#34A853]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Curiosity sparks an unexpected question</span>
                </div>
                <div className="pl-6 border-l border-emerald-300 py-1">
                  <span>↳ Tested in KREST Fellowship</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Structured in a long-term Research Circle</span>
                </div>
                <div className="pl-6 border-l border-emerald-300 py-1">
                  <span>↳ Documented as an indexed journal paper</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Translated into physical societal impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE ECOSYSTEM GRAPH */}
      <section className="py-24 border-b border-[#DADCE0]" id="ecosystem-map">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#34A853] uppercase block">THE SIGNATURE VISUALIZER</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Explore the Living Network
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Interact with the flowing network elements below to see how each pillar feeds into research, publication, and lasting societal impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Interactive Grid Area */}
            <div className="lg:col-span-8 bg-[#1C2E4A] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[520px]">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
              
              {/* Central Map Graphic Container */}
              <div className="relative flex-grow flex items-center justify-center min-h-[380px]">
                
                {/* Connections map */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/10 stroke-1" fill="none">
                  {/* Connect Curiosity (8) -> Mentorship (7) -> Programs (6) -> Circles (5) -> Research (3) -> Innovation (2) / Publications (1) -> Impact (0) */}
                  <line x1="50%" y1="90%" x2="50%" y2="78%" className="stroke-emerald-500/30 stroke-2" />
                  <line x1="50%" y1="78%" x2="50%" y2="65%" className="stroke-emerald-500/30 stroke-2" />
                  <line x1="50%" y1="65%" x2="50%" y2="50%" className="stroke-emerald-500/30 stroke-2" />
                  <line x1="50%" y1="50%" x2="50%" y2="35%" className="stroke-blue-400/30 stroke-[3px]" />
                  <line x1="50%" y1="35%" x2="25%" y2="35%" className="stroke-blue-400/30 stroke-2" />
                  <line x1="50%" y1="35%" x2="75%" y2="35%" className="stroke-blue-400/30 stroke-2" />
                  <line x1="25%" y1="35%" x2="50%" y2="18%" className="stroke-red-400/30 stroke-2" />
                  <line x1="75%" y1="35%" x2="50%" y2="18%" className="stroke-red-400/30 stroke-2" />
                </svg>

                {/* Draw Node Buttons */}
                {[
                  { id: "impact", x: "50%", y: "18%", label: "IMPACT", node: ECOSYSTEM_NODES[0] },
                  { id: "publications", x: "25%", y: "35%", label: "PUBLICATIONS", node: ECOSYSTEM_NODES[1] },
                  { id: "innovation", x: "50%", y: "35%", label: "RESEARCH & DEV", node: ECOSYSTEM_NODES[2] },
                  { id: "knowledge-hub", x: "75%", y: "35%", label: "KNOWLEDGE HUB", node: ECOSYSTEM_NODES[4] },
                  { id: "circles", x: "50%", y: "50%", label: "RESEARCH CIRCLES", node: ECOSYSTEM_NODES[5] },
                  { id: "programs", x: "50%", y: "65%", label: "PROGRAMS", node: ECOSYSTEM_NODES[6] },
                  { id: "mentorship", x: "50%", y: "78%", label: "MENTORSHIP", node: ECOSYSTEM_NODES[7] },
                  { id: "curiosity", x: "50%", y: "90%", label: "CURIOSITY", node: ECOSYSTEM_NODES[8] }
                ].map((item) => {
                  const isActive = selectedNode.id === item.node.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedNode(item.node)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 rounded-full text-xs font-bold font-mono tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "bg-white text-gray-900 shadow-lg scale-110 border-2 border-[#34A853]"
                          : "bg-[#253959] text-gray-200 border border-white/10 hover:bg-[#2b4266] hover:scale-105"
                      }`}
                      style={{ left: item.x, top: item.y }}
                    >
                      {item.node.icon}
                      <span className="hidden sm:inline">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-center pt-4 border-t border-white/5 select-none text-white/40 text-[10px] font-mono tracking-wider">
                FLOW DIRECTION: SPARKS OF CURIOSITY RISE UP TO FUEL MEANINGFUL IMPACT
              </div>
            </div>

            {/* Left Column: Selected Node Details */}
            <div className="lg:col-span-4 bg-white border border-[#DADCE0] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">SELECTED PILLAR</span>
                    <div className="inline-flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${selectedNode.bgLight}`}>
                        {selectedNode.icon}
                      </div>
                      <h3 className="text-xl font-black text-gray-900">{selectedNode.name}</h3>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-gray-800 italic leading-snug">
                    &ldquo;{selectedNode.description}&rdquo;
                  </p>

                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">SYSTEM DETAILS</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      {selectedNode.details}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-8 border-t border-gray-100">
                <button
                  onClick={() => onNavigate('#/programs')}
                  className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-bold text-xs tracking-widest uppercase hover:bg-black transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Explore Pathways</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EVERY JOURNEY IS UNIQUE */}
      <section className="py-24 border-b border-[#DADCE0] bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#34A853] uppercase block">CHOOSE YOUR PATHWAY</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Every Journey is Unique
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              There is no single path through the ecosystem. Choose your role below to animate your personalized pathway through the Ré research ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Personas Tabs */}
            <div className="lg:col-span-4 space-y-2">
              {JOURNEYS.map((j, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedJourneyIndex(i)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    selectedJourneyIndex === i
                      ? "border-emerald-500 bg-white text-gray-900 font-bold shadow-xs"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  <span className="text-sm font-semibold">{j.role}</span>
                  <ChevronDown className={`h-4 w-4 transform transition-transform ${selectedJourneyIndex === i ? '-rotate-90 text-[#34A853]' : ''}`} />
                </button>
              ))}
            </div>

            {/* Path visualization details */}
            <div className="lg:col-span-8 bg-white border border-gray-200 rounded-3xl p-8 shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedJourneyIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    Pathway for {JOURNEYS[selectedJourneyIndex].role}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {JOURNEYS[selectedJourneyIndex].path.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-mono text-[11px] font-bold">
                          {step}
                        </div>
                        {idx !== JOURNEYS[selectedJourneyIndex].path.length - 1 && (
                          <ChevronDown className="h-4 w-4 text-gray-300 transform -rotate-90 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500 font-light leading-relaxed pt-2">
                    {JOURNEYS[selectedJourneyIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE PILLARS OF THE ECOSYSTEM */}
      <section className="py-24 border-b border-[#DADCE0]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#34A853] uppercase block">THE BUILDING BLOCKS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              The Pillars of the Ecosystem
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Every visual, structural, or scholastic choice we execute rests firmly upon eight foundational principles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Curiosity", desc: "The beginning of every single scientific discovery." },
              { title: "Learning", desc: "Continuous individual growth through deliberate inquiry." },
              { title: "Research", desc: "Purposeful exploration driven by evidence-based questions." },
              { title: "Collaboration", desc: "Knowledge grows significantly stronger when shared generously." },
              { title: "Innovation", desc: "Transforming abstract ideas into concrete physical solutions." },
              { title: "Knowledge", desc: "Discoveries systematically communicated and permanently preserved." },
              { title: "Community", desc: "People connected tightly together through a shared curiosity." },
              { title: "Impact", desc: "Research creating long-term measurable value for society." }
            ].map((p, idx) => (
              <div key={idx} className="bg-white border border-gray-200 hover:border-gray-400 p-6 rounded-2xl text-left transition-all hover:shadow-xs">
                <span className="text-xs font-mono font-bold text-gray-300 block mb-3">PILLAR 0{idx + 1}</span>
                <h3 className="text-base font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ECOSYSTEM IN ACTION */}
      <section className="py-20 bg-gray-900 text-white border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase block">ACTUAL PATHWAY TRANSITIONS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">The Ecosystem in Action</h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Below are real-world transitions demonstrating how individuals and partner institutions navigate our ecosystem dynamically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-emerald-400 font-mono mb-4">STUDENT PATHWAY</h3>
              <div className="flex flex-col gap-2 font-mono text-[11px] text-gray-300">
                <div>[01] Student enters with basic mechanical question</div>
                <div className="pl-4 border-l border-emerald-500/30">↳ Deploys prototype inside Battery Circle</div>
                <div>[02] Mentored dynamically by faculty leads</div>
                <div className="pl-4 border-l border-emerald-500/30">↳ Enrolls in a semester KREST Fellowship</div>
                <div>[03] Conducts mechanical thermal failure analysis</div>
                <div className="pl-4 border-l border-emerald-500/30">↳ Files national design patents & publishes</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-emerald-400 font-mono mb-4">INSTITUTING PATHWAY</h3>
              <div className="flex flex-col gap-2 font-mono text-[11px] text-gray-300">
                <div>[01] Partner Institution signs institutional MoU</div>
                <div className="pl-4 border-l border-emerald-500/30">↳ Accesses core research methodology toolkits</div>
                <div>[02] Faculty undergoes development programs</div>
                <div className="pl-4 border-l border-emerald-500/30">↳ Integrates CORE research modules in curriculum</div>
                <div>[03] Co-authors 15+ student research papers</div>
                <div className="pl-4 border-l border-emerald-500/30">↳ Establishes a permanent regional materials hub</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: GROWING TOGETHER CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#34A853] uppercase block">AN ECOSYSTEM IS NEVER COMPLETE</span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Where Will Your Journey Begin?
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            Every learner, mentor, educator, researcher, institution, and collaborator who joins Ré strengthens the connections within the community and creates opportunities for new ideas to emerge. As the ecosystem continues to grow, so does its ability to inspire discovery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('#/programs')}
              className="bg-gray-900 hover:bg-black text-white font-bold px-8 py-4 rounded-full transition-all text-sm cursor-pointer shadow-md"
            >
              Begin with Curiosity
            </button>
            <button
              onClick={() => onNavigate('#/connect')}
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-bold px-8 py-4 rounded-full transition-all text-sm cursor-pointer shadow-sm"
            >
              Explore the Ecosystem
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
