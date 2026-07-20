import React, { useEffect, useRef } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Compass,
  GraduationCap,
  Lightbulb,
  Microscope,
  Network,
  PlusCircle,
  Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface ProgramsPageProps {
  onNavigate: (hash: string) => void;
  selectedProgramId?: string;
}

type PathwayId =
  | 'exploration-circle'
  | 'core'
  | 'krest'
  | 'krip'
  | 'urop'
  | 'project-intake';

type Pathway = {
  id: PathwayId;
  index: string;
  name: string;
  fullName?: string;
  eyebrow: string;
  positioning: string;
  description: string;
  duration: string;
  format: string;
  audience: string;
  href: string;
  accent: string;
  wash: string;
  icon: React.ComponentType<{ className?: string }>;
};

const PATHWAYS: Pathway[] = [
  {
    id: 'exploration-circle',
    index: '01',
    name: 'Exploration Circle',
    eyebrow: 'Community engagement',
    positioning: 'Begin with curiosity, conversation and community.',
    description:
      'Ré’s open platform for Research Café, Coffee Table Conversations, workshops, expert talks, masterclasses, networking sessions and community events.',
    duration: 'Flexible',
    format: 'Open participation',
    audience: 'Anyone looking for an accessible introduction to research and the Ré community.',
    href: '#/events',
    accent: '#B65E3A',
    wash: '#FBF1EA',
    icon: Compass,
  },
  {
    id: 'core',
    index: '02',
    name: 'CORE',
    fullName: 'Course-Oriented Research Experience',
    eyebrow: 'Curriculum-integrated research',
    positioning: 'Experience research as part of academic learning.',
    description:
      'A credit-bearing academic research experience that integrates research directly into the curriculum.',
    duration: 'Academic term',
    format: 'Credit-bearing course',
    audience: 'Students who want research embedded within their formal academic experience.',
    href: '#/programs/core',
    accent: '#315F7E',
    wash: '#EDF3F7',
    icon: BookOpen,
  },
  {
    id: 'krest',
    index: '03',
    name: 'KREST',
    fullName: 'Kumaraguru Research and Exploration in Science and Technology',
    eyebrow: 'Flagship research programme',
    positioning: 'Build sustained research foundations with structured mentorship.',
    description:
      'Ré’s semester-long flagship programme, bringing together research foundations, a Nano Project, a Major Project, mentorship and research outputs.',
    duration: 'One semester',
    format: 'Structured mentorship',
    audience: 'Students ready for sustained research engagement across an academic semester.',
    href: '#/programs/krest',
    accent: '#24684E',
    wash: '#EBF4EF',
    icon: GraduationCap,
  },
  {
    id: 'krip',
    index: '04',
    name: 'KRIP',
    fullName: 'Kumaraguru Research Internship Programme',
    eyebrow: 'Intensive research experience',
    positioning: 'Understand complex problems before attempting solutions.',
    description:
      'A four-week programme centred on context, stakeholder engagement, evidence collection, research thinking, interdisciplinary collaboration and faculty mentorship.',
    duration: 'Four weeks',
    format: 'Intensive and faculty-guided',
    audience: 'Students seeking concentrated research exposure and deeper problem understanding.',
    href: '#/programs/krip',
    accent: '#72579A',
    wash: '#F2EEF7',
    icon: CalendarDays,
  },
 {
  id: 'urop',
  index: '05',
  name: 'UROP',
  fullName: 'Undergraduate Research Opportunities Programme',
  eyebrow: 'Faculty-guided undergraduate research',
  positioning: 'Learn alongside faculty and contribute to active research.',
  description:
    'A faculty-guided programme where undergraduate students participate in ongoing research, develop research capabilities, and contribute toward scholarly, innovative, or interdisciplinary outcomes.',
  duration: 'Long-term',
  format: 'Faculty-guided research',
  audience:
    'Undergraduate students seeking sustained research exposure, mentorship, and experience contributing to ongoing investigations.',
  href: '#/programs/urop',
  accent: '#2B7071',
  wash: '#EAF4F3',
  icon: Microscope,
},
  {
    id: 'project-intake',
    index: '06',
    name: 'Project Intake',
    eyebrow: 'Ideas entering the ecosystem',
    positioning: 'Bring an idea into the Ré research ecosystem.',
    description:
      'An entry point for student ideas, faculty ideas, startups, innovators and collaborators seeking evaluation, mentorship, resources and Research Circle integration.',
    duration: 'Project-based',
    format: 'Evaluated proposal pathway',
    audience: 'People or teams with an idea, challenge or project that needs research support.',
    href: '#/programs/project-intake',
    accent: '#946328',
    wash: '#F8F1E7',
    icon: PlusCircle,
  },
];

const ECOSYSTEM_OUTCOMES = [
  'Research Projects',
  'Innovation',
  'Publications',
  'Competitions',
  'Patents',
  'Startups',
  'Societal Impact',
];

const normalizePathwayId = (value?: string): PathwayId | undefined => {
  if (!value) return undefined;

  const normalized = value.trim().toLowerCase();
  if (PATHWAYS.some((pathway) => pathway.id === normalized)) {
    return normalized as PathwayId;
  }

  if (normalized === 'exploration') return 'exploration-circle';
  if (normalized === 'project') return 'project-intake';
  return undefined;
};

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[10px] font-bold uppercase tracking-[0.25em] ${
        light ? 'text-white/48' : 'text-[#276449]'
      }`}
    >
      {children}
    </p>
  );
}

function PathwayCard({
  pathway,
  onNavigate,
  highlighted,
  setRef,
}: {
  pathway: Pathway;
  onNavigate: (hash: string) => void;
  highlighted: boolean;
  setRef: (node: HTMLElement | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = pathway.icon;

  return (
    <motion.article
      ref={setRef}
      id={`pathway-${pathway.id}`}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={`group relative flex min-h-[520px] scroll-mt-28 flex-col overflow-hidden rounded-[34px] border bg-white p-7 shadow-[0_24px_70px_rgba(20,28,24,0.055)] transition-[border-color,box-shadow] duration-500 sm:p-9 lg:p-10 ${
        highlighted
          ? 'border-[#2C6A4F]/45 shadow-[0_28px_90px_rgba(27,92,65,0.14)]'
          : 'border-black/[0.085] hover:border-black/20 hover:shadow-[0_34px_90px_rgba(20,28,24,0.1)]'
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at 92% 4%, ${pathway.wash} 0, ${pathway.wash} 11%, transparent 36%)`,
      }}
      aria-labelledby={`${pathway.id}-title`}
    >
      <div
        className="pointer-events-none absolute right-[-6%] top-[-7%] h-48 w-48 rounded-full border opacity-45 transition-transform duration-700 group-hover:scale-110"
        style={{ borderColor: `${pathway.accent}32` }}
      />
      <div
        className="pointer-events-none absolute right-[9%] top-[11%] h-20 w-20 rounded-full border opacity-35"
        style={{ borderColor: `${pathway.accent}40` }}
      />

      <div className="relative z-10 flex items-start justify-between gap-6">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-[#8A8E89]">
            PATH {pathway.index}
          </span>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: pathway.accent }}>
            {pathway.eyebrow}
          </p>
        </div>

        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-white/75 shadow-sm backdrop-blur"
          style={{ borderColor: `${pathway.accent}28`, color: pathway.accent }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="relative z-10 mt-12">
        <h3
          id={`${pathway.id}-title`}
          className="font-display text-4xl font-semibold leading-none tracking-[-0.045em] text-[#121713] sm:text-[46px]"
        >
          {pathway.name}
        </h3>
        {pathway.fullName && (
          <p className="mt-3 max-w-md text-xs font-semibold uppercase leading-5 tracking-[0.13em] text-[#777C77]">
            {pathway.fullName}
          </p>
        )}

        <p className="mt-7 max-w-xl text-xl font-medium leading-8 tracking-[-0.015em] text-[#202722]">
          {pathway.positioning}
        </p>
        <p className="mt-4 max-w-xl text-[14px] leading-7 text-[#666C67]">{pathway.description}</p>
      </div>

      <dl className="relative z-10 mt-9 grid grid-cols-2 border-y border-black/[0.09]">
        <div className="border-r border-black/[0.09] py-5 pr-5">
          <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#929691]">Duration</dt>
          <dd className="mt-2 text-sm font-semibold text-[#252C27]">{pathway.duration}</dd>
        </div>
        <div className="py-5 pl-5">
          <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#929691]">Format</dt>
          <dd className="mt-2 text-sm font-semibold text-[#252C27]">{pathway.format}</dd>
        </div>
        <div className="col-span-2 border-t border-black/[0.09] py-5">
          <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#929691]">Who it is for</dt>
          <dd className="mt-2 max-w-xl text-sm leading-6 text-[#555C56]">{pathway.audience}</dd>
        </div>
      </dl>

      <div className="relative z-10 mt-auto pt-8">
        <button
          type="button"
          onClick={() => onNavigate(pathway.href)}
          className="group/link inline-flex items-center gap-3 text-sm font-bold text-[#151B17] outline-none transition-colors hover:text-[#276449] focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[#276449] focus-visible:ring-offset-4"
          aria-label={`Explore ${pathway.name}`}
        >
          Explore
          <span
            className="grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:text-white"
            style={{ borderColor: `${pathway.accent}55` }}
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </motion.article>
  );
}

function PathwayConstellation({ onSelect }: { onSelect: (id: PathwayId) => void }) {
  const reduceMotion = useReducedMotion();
  const positions = [
    'left-[2%] top-[15%]',
    'left-[36%] top-[0%]',
    'right-[1%] top-[19%]',
    'right-[2%] bottom-[15%]',
    'left-[36%] bottom-[0%]',
    'left-[1%] bottom-[18%]',
  ];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.82, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-square w-full max-w-[570px]"
      aria-label="Six parallel pathways into the Ré research ecosystem"
    >
      <div className="absolute inset-[14%] rounded-full border border-white/10" />
      <div className="absolute inset-[27%] rounded-full border border-dashed border-white/12" />
      <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.075] shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-lg">
        <div className="text-center">
          <span className="font-display text-[42px] font-semibold leading-none">Ré</span>
          <span className="mt-2 block text-[8px] font-bold uppercase tracking-[0.22em] text-white/45">
            One ecosystem
          </span>
        </div>
      </div>

      {PATHWAYS.map((pathway, index) => {
        const Icon = pathway.icon;
        return (
          <motion.button
            key={pathway.id}
            type="button"
            onClick={() => onSelect(pathway.id)}
            animate={reduceMotion ? undefined : { y: [0, index % 2 === 0 ? -5 : 5, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 5.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }
            }
            className={`absolute ${positions[index]} group w-[132px] rounded-2xl border border-white/12 bg-[#132019]/86 p-3.5 text-left shadow-xl backdrop-blur-md transition-colors hover:border-white/30 hover:bg-[#18281F] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-[150px] sm:p-4`}
            aria-label={`Jump to ${pathway.name}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[9px] font-bold tracking-[0.18em] text-white/35">{pathway.index}</span>
              <Icon className="h-3.5 w-3.5 text-white/52" />
            </div>
            <span className="mt-3 block text-xs font-semibold text-white sm:text-sm">{pathway.name}</span>
            <span className="mt-1 block text-[9px] leading-4 text-white/42">Independent entry point</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function EcosystemField() {
  const reduceMotion = useReducedMotion();
  const desktopPositions = [
    'left-[8%] top-[17%]',
    'left-[36%] top-[8%]',
    'right-[8%] top-[18%]',
    'right-[3%] bottom-[23%]',
    'left-[38%] bottom-[8%]',
    'left-[6%] bottom-[21%]',
    'left-1/2 top-[47%] -translate-x-1/2',
  ];

  return (
    <div className="relative mt-14 min-h-[520px] overflow-hidden rounded-[38px] border border-white/10 bg-[#101A14] px-6 py-12 sm:px-10 lg:min-h-[600px] lg:px-14">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:30px_30px]" />
      <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
      <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.08]" />
      <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#235A40]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[260px] lg:-translate-x-1/2 lg:-translate-y-1/2">
        <Network className="mx-auto h-5 w-5 text-emerald-300/80" />
        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/38">Shared research home</p>
        <h3 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
          Research Circles
        </h3>
        <p className="mt-4 text-xs leading-6 text-white/48">
          Different entry points can contribute to a wider field of collaborative research and creation.
        </p>
      </div>

      <div className="relative z-10 mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-0 lg:block">
        {ECOSYSTEM_OUTCOMES.map((outcome, index) => (
          <motion.div
            key={outcome}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.055 }}
            className={`rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 text-center text-xs font-semibold text-white/72 backdrop-blur-sm lg:absolute lg:min-w-[150px] ${desktopPositions[index]}`}
          >
            {outcome}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ProgramsPage({ onNavigate, selectedProgramId }: ProgramsPageProps) {
  const reduceMotion = useReducedMotion();
  const pathwaysSectionRef = useRef<HTMLElement | null>(null);
  const pathwayRefs = useRef<Partial<Record<PathwayId, HTMLElement | null>>>({});
  const selectedPathwayId = normalizePathwayId(selectedProgramId);

  const scrollToPathway = (id: PathwayId) => {
    pathwayRefs.current[id]?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    if (!selectedPathwayId) return;

    const frame = window.requestAnimationFrame(() => {
      pathwayRefs.current[selectedPathwayId]?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion, selectedPathwayId]);

  return (
    <main className="w-full overflow-hidden bg-[#F5F4EF] text-[#111713] selection:bg-[#2A664B]/18">
      <section className="relative isolate min-h-[820px] overflow-hidden bg-[#0E1712] text-white lg:min-h-[880px]">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_22%,rgba(54,120,87,0.22),transparent_34%),radial-gradient(circle_at_15%_82%,rgba(99,78,138,0.14),transparent_31%)]" />
        <div className="absolute inset-0 -z-20 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:70px_70px]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="mx-auto grid min-h-[820px] max-w-[1500px] grid-cols-1 items-center gap-14 px-6 py-28 sm:px-8 lg:min-h-[880px] lg:grid-cols-[1.02fr_0.98fr] lg:px-20">
          <div className="max-w-3xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.48 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/13 bg-white/[0.055] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/58 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              Six research pathways
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.68, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-display text-[52px] font-semibold leading-[0.98] tracking-[-0.058em] sm:text-7xl lg:text-[88px]"
            >
              Choose the pathway that matches
              <span className="block font-serif font-normal italic text-white/44">where you are.</span>
            </motion.h1>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: 0.14 }}
              className="mt-8 max-w-2xl"
            >
              <p className="text-xl font-medium leading-8 text-white/86">
                There is no single route into research—and these are not stages to complete in order.
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/54">
                Ré offers six parallel ways to explore, learn, investigate, contribute or bring an idea into a shared research ecosystem.
              </p>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.58, delay: 0.2 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={() =>
                  pathwaysSectionRef.current?.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'start',
                  })
                }
                className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#101713] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1712]"
              >
                Explore all pathways
                <ArrowDown className="h-4 w-4" />
              </button>
              <span className="inline-flex items-center rounded-full border border-white/13 px-5 py-3.5 text-xs font-semibold text-white/48">
                Parallel entry points · One research ecosystem
              </span>
            </motion.div>
          </div>

          <PathwayConstellation onSelect={scrollToPathway} />
        </div>
      </section>

      <section
        ref={pathwaysSectionRef}
        id="research-pathways"
        className="scroll-mt-10 px-6 py-24 sm:px-8 lg:px-20 lg:py-32"
        aria-labelledby="pathways-heading"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="grid grid-cols-1 gap-8 border-b border-black/10 pb-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel>Research pathway atlas</SectionLabel>
              <h2
                id="pathways-heading"
                className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#121713] sm:text-6xl lg:text-[76px]"
              >
                Six different ways to become part of research.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="max-w-md text-[15px] leading-7 text-[#686E69]">
                Start with community, curriculum, a structured programme, intensive inquiry, active faculty research or an idea of your own.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {PATHWAYS.map((pathway) => (
              <PathwayCard
                key={pathway.id}
                pathway={pathway}
                onNavigate={onNavigate}
                highlighted={selectedPathwayId === pathway.id}
                setRef={(node) => {
                  pathwayRefs.current[pathway.id] = node;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.08] bg-[#ECEAE3] px-6 py-24 sm:px-8 lg:px-20 lg:py-28" aria-labelledby="comparison-heading">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel>Compare at a glance</SectionLabel>
              <h2
                id="comparison-heading"
                className="mt-5 max-w-4xl font-display text-4xl font-semibold tracking-[-0.045em] text-[#111713] sm:text-6xl"
              >
                The difference is not importance. It is fit.
              </h2>
            </div>
            <p className="max-w-md text-[14px] leading-7 text-[#666C67] lg:col-span-4">
              Every pathway is a valid entry point. Compare the commitment and context, then explore the one that aligns with your current intent.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12 overflow-hidden rounded-[28px] border border-black/10 bg-[#F8F7F2]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[940px] border-collapse text-left">
                <caption className="sr-only">Comparison of the six Ré research pathways</caption>
                <thead>
                  <tr className="border-b border-black/10 text-[9px] font-bold uppercase tracking-[0.2em] text-[#878C87]">
                    <th scope="col" className="px-7 py-5">Pathway</th>
                    <th scope="col" className="px-7 py-5">Best when you want to</th>
                    <th scope="col" className="px-7 py-5">Duration</th>
                    <th scope="col" className="px-7 py-5">Format</th>
                    <th scope="col" className="px-7 py-5"><span className="sr-only">Explore</span></th>
                  </tr>
                </thead>
                <tbody>
                  {PATHWAYS.map((pathway) => (
                    <tr key={pathway.id} className="group border-b border-black/[0.075] last:border-b-0 hover:bg-white/75">
                      <th scope="row" className="px-7 py-6">
                        <span className="block text-[9px] font-bold tracking-[0.18em] text-[#969A95]">{pathway.index}</span>
                        <span className="mt-1.5 block text-sm font-bold text-[#1C231E]">{pathway.name}</span>
                      </th>
                      <td className="max-w-md px-7 py-6 text-sm leading-6 text-[#555C56]">{pathway.positioning}</td>
                      <td className="px-7 py-6 text-sm font-semibold text-[#313832]">{pathway.duration}</td>
                      <td className="px-7 py-6 text-sm text-[#555C56]">{pathway.format}</td>
                      <td className="px-7 py-6 text-right">
                        <button
                          type="button"
                          onClick={() => onNavigate(pathway.href)}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#2A644A] outline-none transition-transform group-hover:translate-x-1 focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[#2A644A] focus-visible:ring-offset-4"
                          aria-label={`Explore ${pathway.name}`}
                        >
                          Explore <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* <section className="bg-[#F5F4EF] px-6 py-24 sm:px-8 lg:px-20 lg:py-32" aria-labelledby="ecosystem-heading">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel>How pathways connect</SectionLabel>
              <h2
                id="ecosystem-heading"
                className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#121713] sm:text-6xl lg:text-[74px]"
              >
                Different beginnings. A shared field of possibility.
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-7 text-[#676D68] lg:col-span-4">
              The pathway is where someone enters. Research Circles connect that participation to projects and wider scholarly, innovation and societal outcomes.
            </p>
          </Reveal>

          <EcosystemField />
        </div>
      </section> */}

      <section className="px-6 pb-24 sm:px-8 lg:px-20 lg:pb-32">
        <Reveal className="mx-auto max-w-[1500px] overflow-hidden rounded-[40px] bg-[#DCE9E0]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-9 sm:p-14 lg:p-16">
              <SectionLabel>Find your place in Ré</SectionLabel>
              <h2 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#102018] sm:text-6xl lg:text-[72px]">
                Begin where your curiosity is now.
              </h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#516158]">
                Explore each pathway in detail, understand its commitment and choose the experience that best matches how you want to engage with research today.
              </p>
              <button
                type="button"
                onClick={() =>
                  pathwaysSectionRef.current?.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'start',
                  })
                }
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#102018] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102018] focus-visible:ring-offset-4"
              >
                View the six pathways
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="relative min-h-[340px] overflow-hidden border-t border-[#102018]/10 bg-[#173526] p-10 text-white lg:min-h-full lg:border-l lg:border-t-0">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -right-4 -top-4 h-44 w-44 rounded-full border border-white/10" />
              <Lightbulb className="relative z-10 h-6 w-6 text-emerald-200" />
              <blockquote className="relative z-10 mt-16 max-w-lg font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                “Research does not require everyone to begin in the same place.”
              </blockquote>
              <p className="relative z-10 mt-6 max-w-md text-sm leading-7 text-white/54">
                It requires a meaningful way to begin—and an ecosystem capable of supporting what comes next.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}