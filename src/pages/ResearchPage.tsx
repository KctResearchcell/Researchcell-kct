import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Award,
  Battery,
  Beaker,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Compass,
  Cpu,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  History,
  Layers,
  Lightbulb,
  Microscope,
  Navigation,
  Network,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  Users,
  ArrowUpRight,
  Zap
} from 'lucide-react';

interface ResearchPageProps {
  onNavigate: (hash: string) => void;
}

type CultureView = 'philosophy' | 'journey' | 'outcomes';
type CirclePanelView = 'overview' | 'work' | 'people';

type IconName =
  | 'sprout'
  | 'navigation'
  | 'battery'
  | 'heart'
  | 'education'
  | 'design'
  | 'globe'
  | 'energy';

interface Principle {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface JourneyStep {
  title: string;
  phase: string;
  description: string;
  contribution: string;
  icon: React.ReactNode;
}

interface Outcome {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ResearchCircle {
  id: string;
  circleId: string;
  shortName: string;
  title: string;
  tagline: string;
  overview: string;
  themes: string[];
  featuredResearch: string;
  currentProjects: string[];
  publications: string;
  facultyMentor: string;
  achievement: string;
  icon: IconName;
  color: string;
  softColor: string;
  position: { x: number; y: number };
}

const PRINCIPLES: Principle[] = [
  {
    id: 'purpose',
    title: 'Purpose-Driven',
    description: 'Research should address meaningful questions and contribute positively to society.',
    icon: <Compass className="h-5 w-5" />
  },
  {
    id: 'collaborative',
    title: 'Collaborative',
    description: 'The strongest ideas emerge when disciplines, experiences, and perspectives come together.',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'continuous',
    title: 'Continuous',
    description: 'Knowledge grows over time. Every researcher inherits insight and contributes to those who follow.',
    icon: <History className="h-5 w-5" />
  },
  {
    id: 'interdisciplinary',
    title: 'Interdisciplinary',
    description: 'Complex challenges require expertise from multiple domains working together.',
    icon: <Network className="h-5 w-5" />
  },
  {
    id: 'ethical',
    title: 'Ethical',
    description: 'Integrity, transparency, responsibility, and respect remain central to every stage of research.',
    icon: <ShieldCheck className="h-5 w-5" />
  },
  {
    id: 'impactful',
    title: 'Impactful',
    description: 'Research reaches its greatest value when it improves lives, communities, industries, and futures.',
    icon: <TrendingUp className="h-5 w-5" />
  }
];

const JOURNEY_STEPS: JourneyStep[] = [
  {
    title: 'Curiosity',
    phase: '01 / The spark',
    description: 'A meaningful research journey begins by noticing something that deserves a closer look.',
    contribution: 'A question worth pursuing.',
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: 'Observation',
    phase: '02 / Look closer',
    description: 'Researchers study context, existing knowledge, lived experience, and the evidence already available.',
    contribution: 'A grounded understanding of the problem.',
    icon: <Eye className="h-5 w-5" />
  },
  {
    title: 'Inquiry',
    phase: '03 / Ask better',
    description: 'Raw curiosity becomes a clear research question, hypothesis, scope, and direction.',
    contribution: 'A structured inquiry.',
    icon: <HelpCircle className="h-5 w-5" />
  },
  {
    title: 'Research Circle',
    phase: '04 / Find community',
    description: 'The question enters an interdisciplinary community with a shared domain of inquiry.',
    contribution: 'Collective context and continuity.',
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: 'Mentorship',
    phase: '05 / Strengthen direction',
    description: 'Mentors help refine methods, challenge assumptions, protect integrity, and improve research quality.',
    contribution: 'Responsible guidance.',
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    title: 'Investigation',
    phase: '06 / Test and learn',
    description: 'Ideas are examined through fieldwork, experiments, prototyping, analysis, and repeated learning.',
    contribution: 'Evidence that can be trusted.',
    icon: <Microscope className="h-5 w-5" />
  },
  {
    title: 'Innovation',
    phase: '07 / Make knowledge tangible',
    description: 'Findings become models, methods, technologies, products, systems, or new ways of understanding.',
    contribution: 'A useful translation of knowledge.',
    icon: <Lightbulb className="h-5 w-5" />
  },
  {
    title: 'Publication',
    phase: '08 / Contribute',
    description: 'The work is documented with rigour so it can be examined, challenged, and extended by others.',
    contribution: 'A scholarly contribution.',
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: 'Knowledge Sharing',
    phase: '09 / Keep it moving',
    description: 'Methods, datasets, learning, and outcomes are shared with peers, communities, and future cohorts.',
    contribution: 'Knowledge that remains accessible.',
    icon: <Globe className="h-5 w-5" />
  },
  {
    title: 'Impact',
    phase: '10 / Create value',
    description: 'Research strengthens learning, advances practice, supports communities, and informs real decisions.',
    contribution: 'Meaningful change.',
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    title: 'New Questions',
    phase: '11 / Begin again',
    description: 'Every conclusion reveals new uncertainty. The next researcher begins with a stronger foundation.',
    contribution: 'The next cycle of discovery.',
    icon: <CircleDot className="h-5 w-5" />
  }
];

const OUTCOMES: Outcome[] = [
  {
    title: 'Publications',
    description: 'Journal articles, conference papers, book chapters, and scholarly contributions.',
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: 'Innovation',
    description: 'Prototypes, products, technologies, methods, and applied solutions.',
    icon: <Lightbulb className="h-5 w-5" />
  },
  {
    title: 'Capacity Building',
    description: 'Developing confident researchers, innovators, mentors, and future leaders.',
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    title: 'Collaboration',
    description: 'Connecting academia, industry, institutions, professionals, and communities.',
    icon: <Users className="h-5 w-5" />
  },
  {
    title: 'Knowledge',
    description: 'Building a continuously evolving repository of research and learning.',
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: 'Impact',
    description: 'Creating solutions that contribute to society, education, healthcare, industry, and sustainability.',
    icon: <TrendingUp className="h-5 w-5" />
  }
];

const RESEARCH_CIRCLES: ResearchCircle[] = [
  {
    id: 'agriculture',
    circleId: 'environmental-science',
    shortName: 'Agriculture',
    title: 'Agriculture Research Circle',
    tagline: 'Engineering Sustainable Agriculture Through Innovation',
    overview: 'Exploring precision agriculture, smart farming, agricultural automation, mechanisation, water management, and sustainable food systems.',
    themes: ['Precision Agriculture', 'Smart Farming', 'Agri Robotics', 'IoT', 'Sustainable Crop Systems'],
    featuredResearch: 'Automatic Transplanter for Sustainable Farming',
    currentProjects: ['Automatic Transplanter for Sustainable Farming', 'Precision agriculture and water-management explorations'],
    publications: 'Scholarly outputs and project documentation are maintained in the circle knowledge repository.',
    facultyMentor: 'Faculty mentor team available in the circle microsite.',
    achievement: 'Featured progress: translating agricultural automation into practical field-ready research.',
    icon: 'sprout',
    color: '#2F7D5A',
    softColor: '#E7F3EC',
    position: { x: 50, y: 10 }
  },
  {
    id: 'automotive',
    circleId: 'automotive',
    shortName: 'Automotive',
    title: 'Automotive Research Circle',
    tagline: 'Reimagining the Future of Mobility',
    overview: 'Advancing research in electric mobility, intelligent transportation, lightweight engineering, autonomous systems, and sustainable vehicle technologies.',
    themes: ['Electric Vehicles', 'Mobility Innovation', 'Vehicle Design', 'Autonomous Systems'],
    featuredResearch: 'Compact Electric Trike',
    currentProjects: ['Compact Electric Trike', 'Sustainable mobility and lightweight vehicle explorations'],
    publications: 'Circle publications connect mobility engineering, intelligent transport, and sustainable vehicle research.',
    facultyMentor: 'Faculty mentor team available in the circle microsite.',
    achievement: 'Featured progress: developing a compact electric mobility platform.',
    icon: 'navigation',
    color: '#2E68B7',
    softColor: '#E8F0FB',
    position: { x: 78, y: 20 }
  },
  {
    id: 'battery',
    circleId: 'renewable-energy',
    shortName: 'Battery',
    title: 'Battery Research Circle',
    tagline: "Powering Tomorrow's Energy Systems",
    overview: 'Investigating advanced battery technologies, energy storage systems, battery management, fabrication, and sustainable energy solutions.',
    themes: ['Battery Design', 'BESS', 'Energy Storage', 'Battery Analytics'],
    featuredResearch: 'Battery Energy Storage Systems',
    currentProjects: ['Battery Energy Storage Systems', 'Battery analytics and management-system investigations'],
    publications: 'Research outputs are organised around storage performance, battery systems, and sustainable energy integration.',
    facultyMentor: 'Faculty mentor team available in the circle microsite.',
    achievement: 'Featured progress: advancing energy-storage infrastructure from research towards application.',
    icon: 'battery',
    color: '#A96F13',
    softColor: '#F8EEDB',
    position: { x: 90, y: 46 }
  },
  {
    id: 'bioscience',
    circleId: 'bioscience',
    shortName: 'Bioscience',
    title: 'Bioscience Research Circle',
    tagline: 'Advancing Life Through Science',
    overview: 'Integrating biology, healthcare, engineering, and innovation to develop solutions that improve health and quality of life.',
    themes: ['Biotechnology', 'Biomedical Engineering', 'Biomaterials', 'Regenerative Medicine'],
    featuredResearch: 'CRISPR-Cas9 · Diabetic Wound Healing Scaffold · Thermal Cocoon',
    currentProjects: ['CRISPR-Cas9 exploration', 'Diabetic Wound Healing Scaffold', 'Thermal Cocoon'],
    publications: 'The circle repository connects experimental methods, biological investigation, and healthcare innovation outputs.',
    facultyMentor: 'Faculty mentor team available in the circle microsite.',
    achievement: 'Featured progress: connecting regenerative medicine, biomaterials, and translational healthcare research.',
    icon: 'heart',
    color: '#A64B58',
    softColor: '#F7E9EB',
    position: { x: 78, y: 74 }
  },
  {
    id: 'education',
    circleId: 'educational',
    shortName: 'Education',
    title: 'Educational Research Circle',
    tagline: 'Transforming Learning Through Research',
    overview: 'Exploring educational innovation, learning sciences, digital pedagogy, AI-enabled education, and inclusive learning environments.',
    themes: ['Educational Technology', 'AI in Education', 'Curriculum Innovation', 'Inclusive Learning'],
    featuredResearch: 'HeaRmeNow',
    currentProjects: ['HeaRmeNow', 'Inclusive and AI-enabled learning investigations'],
    publications: 'Research outputs examine learning design, inclusive education, educational technology, and evidence-based pedagogy.',
    facultyMentor: 'Faculty mentor team available in the circle microsite.',
    achievement: 'Featured progress: developing accessible communication support for inclusive learning.',
    icon: 'education',
    color: '#7253A6',
    softColor: '#EFEAF7',
    position: { x: 50, y: 88 }
  },
  {
    id: 'design',
    circleId: 'design-society',
    shortName: 'Design',
    title: 'Design Research Circle',
    tagline: 'Designing Meaningful Experiences',
    overview: 'Applying human-centred design, systems thinking, product development, and user-experience research to solve real-world challenges.',
    themes: ['Product Design', 'UX Research', 'Design Thinking', 'Service Design'],
    featuredResearch: 'Design Curriculum Framework',
    currentProjects: ['Design Curriculum Framework', 'Human-centred product and service research'],
    publications: 'Research documentation connects design methods, user evidence, systems thinking, and curriculum innovation.',
    facultyMentor: 'Faculty mentor team available in the circle microsite.',
    achievement: 'Featured progress: building an evidence-led design curriculum framework.',
    icon: 'design',
    color: '#B15F2D',
    softColor: '#F8ECE4',
    position: { x: 22, y: 74 }
  },
  {
    id: 'environment',
    circleId: 'environmental-science',
    shortName: 'Environment',
    title: 'Environmental Science & Sustainable Systems',
    tagline: 'Researching Sustainable Futures',
    overview: 'Investigating sustainable technologies, environmental systems, climate resilience, resource management, and circular-economy principles.',
    themes: ['Climate Action', 'Green Materials', 'Sustainable Infrastructure', 'Circular Economy'],
    featuredResearch: 'Rice Husk Composite · Green Sustainable Concrete',
    currentProjects: ['Rice Husk Composite', 'Green Sustainable Concrete', 'Circular-material investigations'],
    publications: 'The circle preserves material studies, sustainability methods, environmental datasets, and applied research outputs.',
    facultyMentor: 'Faculty mentor team available in the circle microsite.',
    achievement: 'Featured progress: converting regional material streams into sustainable engineering possibilities.',
    icon: 'globe',
    color: '#247F7A',
    softColor: '#E4F3F1',
    position: { x: 10, y: 46 }
  },
  {
    id: 'renewable',
    circleId: 'renewable-energy',
    shortName: 'Renewable',
    title: 'Renewable Energy Research Circle',
    tagline: 'Accelerating the Transition to Clean Energy',
    overview: 'Exploring renewable energy generation, storage, optimisation, smart grids, and emerging sustainable energy technologies.',
    themes: ['Solar', 'Wind', 'Smart Grids', 'Hydrogen', 'Energy Analytics'],
    featuredResearch: 'Renewable Energy Hosting Capacity Improvement',
    currentProjects: ['Renewable Energy Hosting Capacity Improvement', 'Solar, wind, and energy-analytics investigations'],
    publications: 'Research outputs address renewable generation, grid integration, optimisation, and clean-energy systems.',
    facultyMentor: 'Faculty mentor team available in the circle microsite.',
    achievement: 'Featured progress: improving the capacity of energy systems to host renewable generation.',
    icon: 'energy',
    color: '#16809B',
    softColor: '#E4F3F6',
    position: { x: 22, y: 20 }
  }
];

const RESEARCH_DOMAINS = [
  'Engineering & Technology',
  'Healthcare & Biosciences',
  'Agriculture',
  'Education',
  'Design & Human-Centred Innovation',
  'Environmental Science',
  'Renewable Energy',
  'Artificial Intelligence',
  'Data Science',
  'Sustainability',
  'Management & Entrepreneurship',
  'Emerging Interdisciplinary Fields'
];

const ARCHIVE_LAYERS = [
  {
    title: 'Ideas',
    description: 'Questions, assumptions, observations, and opportunity areas remain visible for future cohorts.'
  },
  {
    title: 'Methods',
    description: 'Protocols, frameworks, instruments, and research decisions are documented rather than lost.'
  },
  {
    title: 'Evidence',
    description: 'Datasets, experiments, field notes, and analysis create a stronger starting point for what follows.'
  },
  {
    title: 'Outputs',
    description: 'Publications, prototypes, presentations, and innovations become part of the collective repository.'
  },
  {
    title: 'Learning',
    description: 'Failures, limitations, reflections, and unanswered questions are preserved as research intelligence.'
  }
];

const HERO_INSIGHTS = [
  {
    id: 'question',
    label: 'Question',
    kicker: 'Curiosity begins the system',
    text: 'A question becomes more powerful when it is examined with purpose.'
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    kicker: 'Different minds change the direction',
    text: 'Disciplines, experiences, mentors, and communities strengthen the inquiry.'
  },
  {
    id: 'discovery',
    label: 'Discovery',
    kicker: 'Knowledge returns to the ecosystem',
    text: 'Every finding becomes a foundation for the next researcher and the next question.'
  }
];

const renderCircleIcon = (name: IconName, className = 'h-5 w-5') => {
  switch (name) {
    case 'sprout':
      return <Sprout className={className} />;
    case 'navigation':
      return <Navigation className={className} />;
    case 'battery':
      return <Battery className={className} />;
    case 'heart':
      return <HeartPulse className={className} />;
    case 'education':
      return <GraduationCap className={className} />;
    case 'design':
      return <Compass className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'energy':
      return <Zap className={className} />;
    default:
      return <Cpu className={className} />;
  }
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function ResearchPage({ onNavigate }: ResearchPageProps) {
  const reduceMotion = useReducedMotion();
  const [activeHeroInsight, setActiveHeroInsight] = useState(0);
  const [cultureView, setCultureView] = useState<CultureView>('philosophy');
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);
  const [activeOutcome, setActiveOutcome] = useState(0);
  const [activeCircleId, setActiveCircleId] = useState(RESEARCH_CIRCLES[0].id);
  const [circlePanelView, setCirclePanelView] = useState<CirclePanelView>('overview');
  const [activeDomain, setActiveDomain] = useState(RESEARCH_DOMAINS[0]);
  const [activeArchiveLayer, setActiveArchiveLayer] = useState(0);

  const activeCircle = useMemo(
    () => RESEARCH_CIRCLES.find((circle) => circle.id === activeCircleId) ?? RESEARCH_CIRCLES[0],
    [activeCircleId]
  );

  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (!hash.includes('#/research#') && !hash.includes('#/research/')) return;

      const parts = hash.split('#');
      const targetId = parts[2];
      if (!targetId) return;

      window.setTimeout(() => {
        const target = document.getElementById(targetId);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      }, 160);
    };

    handleScrollToHash();
    window.addEventListener('hashchange', handleScrollToHash);
    return () => window.removeEventListener('hashchange', handleScrollToHash);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveHeroInsight((current) => (current + 1) % HERO_INSIGHTS.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  useEffect(() => {
    setCirclePanelView('overview');
  }, [activeCircleId]);

  const handleCircleNodeClick = (circle: ResearchCircle) => {
    const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
    if (canHover || activeCircleId === circle.id) {
      onNavigate(`#/research-circle/${circle.circleId}`);
      return;
    }
    setActiveCircleId(circle.id);
  };

  const cultureTabs: Array<{ id: CultureView; label: string }> = [
    { id: 'philosophy', label: 'Our philosophy' },
    { id: 'journey', label: 'Research journey' },
    { id: 'outcomes', label: 'What research creates' }
  ];

  return (
    <div className="w-full overflow-hidden bg-[#F7F7F2] font-sans text-[#17211D] selection:bg-emerald-200/70">
      {/* HERO — AN INTERACTIVE ORIENTATION, NOT A STATIC BANNER */}
      {/* <section
        id="research-at-re"
        className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#0C241A] text-white"
      >
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px)',
            backgroundSize: '54px 54px'
          }}
        />
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -right-36 bottom-0 h-[520px] w-[520px] rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-[1500px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:px-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="mb-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Research at Ré
            </div>

            <h1 className="max-w-5xl text-[clamp(3.25rem,7.2vw,7.7rem)] font-black leading-[0.88] tracking-[-0.065em]">
              Engineering curiosity into{' '}
              <span className="font-serif font-normal italic text-emerald-300">discovery.</span>
            </h1>

            <p className="mt-9 max-w-2xl text-base font-light leading-8 text-white/70 sm:text-lg">
              At Ré, research begins with curiosity and grows through collaboration, inquiry, and continuous learning. Diverse minds explore important questions and contribute to knowledge that creates lasting value for society.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection('research-circles')}
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0C241A] transition hover:-translate-y-0.5 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                Explore Research Circles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('#/connect')}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Join the Research Community
              </button>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-7 sm:grid-cols-4">
              {['Research Circles', 'Programmes', 'Mentorship', 'Collaboration'].map((item, index) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-1 font-mono text-[10px] text-emerald-300">0{index + 1}</span>
                  <span className="text-xs font-semibold leading-5 text-white/65">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <motion.div
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[7%] rounded-full border border-dashed border-white/20"
              />
              <motion.div
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[20%] rounded-full border border-white/15"
              />
              <div className="absolute inset-[33%] flex items-center justify-center rounded-full border border-emerald-200/25 bg-white/[0.07] text-center shadow-[0_0_80px_rgba(52,211,153,0.12)] backdrop-blur-md">
                <div className="px-5">
                  <Sparkles className="mx-auto mb-3 h-6 w-6 text-emerald-300" />
                  <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-300">Ré</span>
                  <span className="mt-1 block text-lg font-bold leading-tight">Living research ecosystem</span>
                </div>
              </div>

              {HERO_INSIGHTS.map((insight, index) => {
                const positions = [
                  'left-1/2 top-[2%] -translate-x-1/2',
                  'right-[1%] top-[58%] -translate-y-1/2',
                  'bottom-[5%] left-[7%]'
                ];
                const active = activeHeroInsight === index;
                return (
                  <button
                    key={insight.id}
                    type="button"
                    onMouseEnter={() => setActiveHeroInsight(index)}
                    onFocus={() => setActiveHeroInsight(index)}
                    onClick={() => setActiveHeroInsight(index)}
                    aria-pressed={active}
                    className={`absolute ${positions[index]} z-10 rounded-2xl border px-4 py-3 text-left transition-all focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      active
                        ? 'w-[190px] border-emerald-300/60 bg-emerald-300 text-[#0C241A] shadow-xl'
                        : 'w-[150px] border-white/20 bg-[#0C241A]/80 text-white backdrop-blur-md hover:border-white/45'
                    }`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] opacity-65">0{index + 1}</span>
                    <span className="mt-1 block text-sm font-bold">{insight.label}</span>
                  </button>
                );
              })}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroInsight}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  className="absolute bottom-[4%] right-[3%] hidden w-[235px] rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-xl sm:block"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    {HERO_INSIGHTS[activeHeroInsight].kicker}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/70">{HERO_INSIGHTS[activeHeroInsight].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('research-culture')}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 transition hover:text-white md:flex"
        >
          Enter the research culture
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
            <ChevronRight className="h-3.5 w-3.5 rotate-90" />
          </span>
        </button>
      </section> */}

      {/* ONE INTERACTIVE CULTURE WORKSPACE REPLACES THREE LONG STATIC SECTIONS */}
      <section id="research-culture" className="border-b border-black/10 bg-[#F7F7F2] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-700">Research is a culture</span>
              <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Research is a journey, not a destination.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-10">
              <p className="text-base font-light leading-8 text-black/60">
                Research is often seen as a project with a beginning and an end. At Ré, it is an evolving journey of asking better questions, seeking deeper understanding, testing ideas with integrity, learning through collaboration, and sharing knowledge that empowers others.
              </p>
              <p className="mt-5 text-lg font-bold">Research is not an activity. It is a culture.</p>
            </div>
          </div>

        </div>
      </section>

      {/* RESEARCH CIRCLES — THE MAIN INTERACTIVE ECOSYSTEM MAP */}
      {/* Research Circles */}
<section
  id="research-circles"
  className="relative scroll-mt-20 overflow-hidden border-b border-black/10 bg-[#EEEDE5] py-20 sm:py-28 lg:py-32"
>
  {/* Background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-emerald-300/20 blur-[140px]" />

    <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-300/15 blur-[140px]" />

    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.8) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-[1500px] px-6 lg:px-20">
    {/* Header */}
    <motion.div
  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{
    duration: reduceMotion ? 0 : 0.7,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end"
>
  <div className="lg:col-span-8">
    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-700">
      Research Circles
    </span>

    <h2 className="mt-4 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
      Explore communities built
      <span className="block text-black/30">
        around shared curiosity.
      </span>
    </h2>
  </div>

  <div className="lg:col-span-4">
    <p className="max-w-xl text-sm font-light leading-7 text-black/55 sm:text-base">
      Discover Ré’s interdisciplinary research communities. Each
      circle has its own dedicated space for projects, people,
      publications, opportunities, and ongoing discoveries.
    </p>
  </div>
</motion.div>
  </div>

  {/* Infinite cards */}
  <div className="relative mt-14 sm:mt-20">
    {/* Edge fades */}
    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#EEEDE5] to-transparent sm:w-32 lg:w-48" />

    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#EEEDE5] to-transparent sm:w-32 lg:w-48" />

    <div className="research-circle-marquee flex w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
      {[0, 1].map((groupIndex) => (
        <div
          key={groupIndex}
          className="flex shrink-0 gap-5 pr-5 sm:gap-7 sm:pr-7"
          aria-hidden={groupIndex === 1}
        >
          {RESEARCH_CIRCLES.map((circle, index) => (
            <motion.article
              key={`${groupIndex}-${circle.id}`}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -10,
                      rotate: index % 2 === 0 ? -0.4 : 0.4,
                    }
              }
              className="group relative flex min-h-[390px] w-[285px] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_55px_-35px_rgba(0,0,0,0.45)] transition-shadow duration-500 hover:shadow-[0_35px_80px_-35px_rgba(0,0,0,0.45)] sm:w-[325px] sm:p-8"
            >
              {/* Card glow */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-15 blur-[55px] transition-opacity duration-500 group-hover:opacity-30"
                style={{
                  backgroundColor: circle.color,
                }}
              />

              {/* Number */}
              <div className="relative flex items-start justify-between">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: circle.softColor,
                    color: circle.color,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: 8,
                          scale: 1.08,
                      }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                  }}
                >
                  {renderCircleIcon(circle.icon, "h-6 w-6")}
                </motion.div>

                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative mt-10">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: circle.color,
                  }}
                >
                  {circle.shortName}
                </span>

                <h3 className="mt-3 text-2xl font-black leading-[1.05] tracking-[-0.04em] sm:text-3xl">
                  {circle.title}
                </h3>

                <p
                  className="mt-4 text-sm font-semibold leading-6"
                  style={{
                    color: circle.color,
                  }}
                >
                  {circle.tagline}
                </p>

                <p className="mt-5 line-clamp-3 text-sm font-light leading-7 text-black/50">
                  {circle.overview}
                </p>
              </div>

              {/* Themes */}
              <div className="relative mt-6 flex flex-wrap gap-2">
                {circle.themes.slice(0, 3).map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full border border-black/10 bg-black/[0.025] px-3 py-1.5 text-[10px] font-semibold text-black/50"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              {/* Explore button */}
              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    `#/research-circle/${circle.circleId}`,
                  )
                }
                className="relative mt-auto flex w-full items-center justify-between border-t border-black/10 pt-6 text-left text-sm font-bold focus:outline-none"
                tabIndex={groupIndex === 1 ? -1 : 0}
              >
                <span>Explore Circle</span>

                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
                  style={{
                    backgroundColor: circle.color,
                  }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </motion.article>
          ))}
        </div>
      ))}
    </div>
  </div>

  {/* Bottom link */}
  <div className="relative mx-auto mt-14 flex max-w-[1500px] justify-center px-6 lg:px-20">
    <button
      type="button"
      onClick={() => onNavigate("#/research-circles")}
      className="group inline-flex items-center gap-3 rounded-full bg-[#102A20] px-7 py-4 text-sm font-bold text-white shadow-[0_15px_40px_-20px_rgba(16,42,32,0.8)] transition-all duration-300 hover:-translate-y-1 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 focus-visible:ring-offset-[#EEEDE5]"
    >
      View All Research Circles

      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  </div>

  <style>{`
    @keyframes research-circle-marquee {
      from {
        transform: translateX(0);
      }

      to {
        transform: translateX(-50%);
      }
    }

    .research-circle-marquee {
      animation: research-circle-marquee 42s linear infinite;
      will-change: transform;
    }

    @media (max-width: 640px) {
      .research-circle-marquee {
        animation-duration: 32s;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .research-circle-marquee {
        animation: none;
        width: 100%;
        overflow-x: auto;
        padding-inline: 1.5rem;
        scrollbar-width: none;
      }

      .research-circle-marquee::-webkit-scrollbar {
        display: none;
      }

      .research-circle-marquee > div:nth-child(2) {
        display: none;
      }
    }
  `}</style>
</section>

      {/* RESEARCH DOMAINS + LIVING KNOWLEDGE, BUILT AS AN INTERACTIVE FIELD */}
      <section id="research-domains" className="border-b border-white/10 bg-[#0E1713] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-300">Research without boundaries</span>
              <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[1] tracking-[-0.045em] sm:text-6xl">
                Ideas become stronger where disciplines intersect.
              </h2>
              <p className="mt-6 max-w-2xl text-sm font-light leading-7 text-white/55">
                Research at Ré extends across multiple disciplines. Rather than working in isolation, domains connect through shared questions, collaborative projects, and interdisciplinary Research Circles.
              </p>

              <div className="mt-10 flex flex-wrap gap-2.5">
                {RESEARCH_DOMAINS.map((domain) => {
                  const active = activeDomain === domain;
                  return (
                    <button
                      key={domain}
                      type="button"
                      onMouseEnter={() => setActiveDomain(domain)}
                      onFocus={() => setActiveDomain(domain)}
                      onClick={() => setActiveDomain(domain)}
                      className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                        active
                          ? 'border-emerald-300 bg-emerald-300 text-[#0E1713]'
                          : 'border-white/15 bg-white/[0.035] text-white/55 hover:border-white/35 hover:text-white'
                      }`}
                    >
                      {domain}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDomain}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  className="mt-8 flex max-w-2xl items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-300 text-[#0E1713]">
                    <Network className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">Active domain</span>
                    <h3 className="mt-1 text-base font-bold">{activeDomain}</h3>
                    <p className="mt-2 text-xs font-light leading-5 text-white/50">
                      This domain is not a silo. It connects with other fields through shared evidence, methods, people, and problems.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-sm sm:p-9">
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-300">A living knowledge ecosystem</span>
                <h3 className="mt-4 text-3xl font-black tracking-[-0.035em]">Research becomes a shared legacy.</h3>
                <p className="mt-5 text-sm font-light leading-7 text-white/55">
                  Every Research Circle maintains a growing archive of ideas, publications, project documentation, methodologies, datasets, and learning resources. New members inherit this knowledge, contribute discoveries, and strengthen the foundation for those who follow.
                </p>

                <div className="mt-8 space-y-2">
                  {ARCHIVE_LAYERS.map((layer, index) => {
                    const active = activeArchiveLayer === index;
                    return (
                      <button
                        key={layer.title}
                        type="button"
                        onMouseEnter={() => setActiveArchiveLayer(index)}
                        onFocus={() => setActiveArchiveLayer(index)}
                        onClick={() => setActiveArchiveLayer(index)}
                        className={`w-full rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                          active ? 'border-emerald-300/45 bg-emerald-300/10' : 'border-white/10 bg-black/10 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className={`font-mono text-[10px] ${active ? 'text-emerald-300' : 'text-white/30'}`}>0{index + 1}</span>
                            <span className="text-sm font-bold">{layer.title}</span>
                          </div>
                          <ChevronRight className={`h-4 w-4 transition ${active ? 'rotate-90 text-emerald-300' : 'text-white/25'}`} />
                        </div>
                        <AnimatePresence initial={false}>
                          {active && (
                            <motion.p
                              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                              className="overflow-hidden pl-8 pt-3 text-xs font-light leading-5 text-white/50"
                            >
                              {layer.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="begin-research" className="relative overflow-hidden bg-[#E6F1E9] py-20 sm:py-28">
        <div className="absolute left-[-10%] top-[-35%] h-[500px] w-[500px] rounded-full border border-emerald-900/10" />
        <div className="absolute bottom-[-70%] right-[-6%] h-[650px] w-[650px] rounded-full border border-emerald-900/10" />

        <div className="relative mx-auto max-w-[1200px] px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-800">Begin your research journey</span>
          <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Every meaningful discovery begins with a question.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-base font-light leading-8 text-black/60">
            Whether you are taking your first steps into research, exploring interdisciplinary collaboration, mentoring future researchers, or seeking institutional partnerships, Ré provides an ecosystem where curiosity is encouraged, ideas are nurtured, and knowledge continues to grow.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection('research-circles')}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#102A20] px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-black focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              Explore Research Circles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('#/connect')}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-emerald-900/20 bg-white/55 px-7 py-3 text-sm font-bold text-[#102A20] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              Join the Ré Research Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
