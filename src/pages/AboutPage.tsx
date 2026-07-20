import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Compass,
  Eye,
  GraduationCap,
  HeartHandshake,
  History,
  Lightbulb,
  Network,
  Orbit,
  Rocket,
  Scale,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type PrincipleId =
  | 'curiosity'
  | 'integrity'
  | 'collaboration'
  | 'excellence'
  | 'inclusion'
  | 'impact';

type EcosystemId =
  | 'explore'
  | 'pathways'
  | 'circles'
  | 'mentorship'
  | 'knowledge'
  | 'partnerships';

const PRINCIPLES = [
  {
    id: 'curiosity' as PrincipleId,
    number: '01',
    title: 'Curiosity',
    statement: 'Every meaningful discovery begins with a thoughtful question.',
    description:
      'We create space for learners to observe closely, question assumptions, and follow ideas with purpose.',
    icon: Lightbulb,
    accent: '#D96C3F',
    tint: '#FFF3EC',
  },
  {
    id: 'integrity' as PrincipleId,
    number: '02',
    title: 'Integrity',
    statement: 'Knowledge grows through honesty, responsibility, and ethical research.',
    description:
      'Research at Ré is grounded in transparency, accountability, respect, and responsible scholarly practice.',
    icon: Scale,
    accent: '#2F6F57',
    tint: '#EDF7F2',
  },
  {
    id: 'collaboration' as PrincipleId,
    number: '03',
    title: 'Collaboration',
    statement: 'Great ideas flourish when diverse perspectives come together.',
    description:
      'We connect learners, educators, researchers, institutions, industry, and communities around shared questions.',
    icon: Users,
    accent: '#246BFD',
    tint: '#EEF4FF',
  },
  {
    id: 'excellence' as PrincipleId,
    number: '04',
    title: 'Excellence',
    statement: 'Continuous learning inspires meaningful progress.',
    description:
      'Excellence is treated as a practice of reflection, refinement, disciplined inquiry, and steady improvement.',
    icon: Target,
    accent: '#6F4BD8',
    tint: '#F3EFFF',
  },
  {
    id: 'inclusion' as PrincipleId,
    number: '05',
    title: 'Inclusion',
    statement: 'Every curious mind deserves the opportunity to explore.',
    description:
      'Research pathways are designed to welcome different disciplines, experiences, ambitions, and starting points.',
    icon: HeartHandshake,
    accent: '#B65C00',
    tint: '#FFF5E8',
  },
  {
    id: 'impact' as PrincipleId,
    number: '06',
    title: 'Impact',
    statement: 'Research creates lasting value when knowledge benefits society.',
    description:
      'We encourage research that strengthens learning, communities, healthcare, industry, sustainability, and public life.',
    icon: Rocket,
    accent: '#137A7F',
    tint: '#EAF8F8',
  },
];

const ECOSYSTEM = [
  {
    id: 'explore' as EcosystemId,
    number: '01',
    title: 'Exploration',
    label: 'Questions become possibilities',
    description:
      'Conversations, workshops, events, and early exposure create a low-pressure entry into research.',
    icon: Compass,
    route: '#/events',
    accent: '#D96C3F',
  },
  {
    id: 'pathways' as EcosystemId,
    number: '02',
    title: 'Research Pathways',
    label: 'Learning becomes structured',
    description:
      'CORE, KREST, KRIP, and Project Intake support different levels of experience, commitment, and aspiration.',
    icon: GraduationCap,
    route: '#/programs',
    accent: '#246BFD',
  },
  {
    id: 'circles' as EcosystemId,
    number: '03',
    title: 'Research Circles',
    label: 'Individual work becomes collective progress',
    description:
      'Long-term interdisciplinary communities preserve research knowledge and carry it across cohorts.',
    icon: Orbit,
    route: '#/research',
    accent: '#1B8A5A',
  },
  {
    id: 'mentorship' as EcosystemId,
    number: '04',
    title: 'Mentorship',
    label: 'Curiosity gains direction',
    description:
      'Educators, researchers, and experts guide inquiry, methods, ethics, documentation, and scholarly growth.',
    icon: Users,
    route: '#/people',
    accent: '#7A4DE8',
  },
  {
    id: 'knowledge' as EcosystemId,
    number: '05',
    title: 'Knowledge',
    label: 'Discovery becomes a shared legacy',
    description:
      'Projects, publications, methods, datasets, and learning resources remain available for future researchers.',
    icon: BookOpen,
    route: '#/knowledge-hub',
    accent: '#137A7F',
  },
  {
    id: 'partnerships' as EcosystemId,
    number: '06',
    title: 'Partnerships',
    label: 'Research reaches society',
    description:
      'Institutions, healthcare, industry, government, and communities connect knowledge with meaningful outcomes.',
    icon: Network,
    route: '#/connect',
    accent: '#B65C00',
  },
];

const TIMELINE = [
  {
    period: '2016',
    phase: 'Founding phase',
    title: 'Research beyond the classroom',
    description:
      'Ré was established in 2016. Thirty-eight funded faculty projects demonstrated clear institutional investment in research beyond conventional academic activity.',
    accent: '#D96C3F',
  },
  {
    period: '2017–2018',
    phase: 'Structuring phase',
    title: 'Creating repeatable pathways',
    description:
      'Project intake windows, proposal reviews, and early research-culture events introduced more structured ways for learners and faculty to participate.',
    accent: '#246BFD',
  },
  {
    period: '2018–2020',
    phase: 'Training phase',
    title: 'From events to sustained programmes',
    description:
      'Research Essentials, faculty training programmes, Exploré planning, and ROS training moved engagement from isolated events towards continuous capability-building.',
    accent: '#1B8A5A',
  },
  {
    period: '2020–2021',
    phase: 'Continuity phase',
    title: 'Research culture under disruption',
    description:
      'During COVID, training and collaboration continued online. Participation in the Swadeshi Microprocessor initiative demonstrated continuity despite disruption.',
    accent: '#7A4DE8',
  },
  {
    period: '2021–2023',
    phase: 'Output phase',
    title: 'Visible research and technical outcomes',
    description:
      'Publications, internships, Trike 2π development, national competition wins, and visible technical outputs strengthened Ré’s culture of applied research.',
    accent: '#137A7F',
  },
  {
    period: '2024 onward',
    phase: 'Reframing phase',
    title: 'A central research ecosystem',
    description:
      'Ré was repositioned as a connected institutional research ecosystem. The 2026 SOP introduced sharper governance, clearer stage-gating, and stronger continuity.',
    accent: '#B65C00',
  },
];

const LEADERSHIP_ROLES = [
  {
    title: 'Leadership',
    description:
      'Sets direction, protects the purpose of Ré, and creates the conditions required for research culture to grow.',
    icon: Building2,
  },
  {
    title: 'Mentors',
    description:
      'Guide learners through questions, methods, ethics, experimentation, documentation, and reflection.',
    icon: Users,
  },
  {
    title: 'Educators',
    description:
      'Bring inquiry into academic learning and help research become part of everyday educational practice.',
    icon: GraduationCap,
  },
  {
    title: 'Researchers',
    description:
      'Extend knowledge, strengthen Research Circles, and create opportunities for collaborative discovery.',
    icon: Eye,
  },
  {
    title: 'Collaborators',
    description:
      'Connect the ecosystem with institutions, industry, healthcare, government, and communities.',
    icon: Network,
  },
];

const goTo = (hash: string) => {
  window.location.hash = hash;
};

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  const [activePrinciple, setActivePrinciple] =
    useState<PrincipleId>('curiosity');
  const [activeEcosystem, setActiveEcosystem] =
    useState<EcosystemId>('circles');
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeLeader, setActiveLeader] = useState(0);

  const principle = useMemo(
    () =>
      PRINCIPLES.find((item) => item.id === activePrinciple) ??
      PRINCIPLES[0],
    [activePrinciple],
  );

  const ecosystem = useMemo(
    () =>
      ECOSYSTEM.find((item) => item.id === activeEcosystem) ?? ECOSYSTEM[2],
    [activeEcosystem],
  );

  const timeline = TIMELINE[activeTimeline];
  const PrincipleIcon = principle.icon;
  const EcosystemIcon = ecosystem.icon;
  const ActiveLeadershipIcon = LEADERSHIP_ROLES[activeLeader].icon;

  return (
    <div className="w-full overflow-hidden bg-[#F7F6F2] text-[#171A18] selection:bg-[#2F6F57]/20">
      {/* HERO */}
      {/* <section className="relative isolate min-h-[760px] overflow-hidden border-b border-black/10 bg-[#0E1712] text-white lg:min-h-[830px]">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_22%,rgba(51,139,93,0.26),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(217,108,63,0.20),transparent_28%),linear-gradient(180deg,#0E1712_0%,#13221A_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:68px_68px]" />
        <motion.div
          className="absolute -right-44 top-1/2 -z-10 h-[650px] w-[650px] -translate-y-1/2 rounded-full border border-white/10"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFA783] shadow-[0_0_40px_rgba(239,167,131,0.8)]" />
          <div className="absolute bottom-[18%] left-[4%] h-3 w-3 rounded-full bg-[#8ED1AA] shadow-[0_0_32px_rgba(142,209,170,0.7)]" />
        </motion.div>

        <div className="relative mx-auto grid min-h-[760px] max-w-[1440px] grid-cols-1 items-center gap-16 px-6 py-28 lg:min-h-[830px] lg:grid-cols-12 lg:px-20">
          <div className="lg:col-span-8">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-[#91C7A3]"
            >
              About Ré
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.05 }}
              className="mt-6 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-[88px]"
            >
              Engineering Curiosity.
              <span className="block font-serif font-normal italic text-[#9ED0AD]">
                Enabling Discovery.
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.12 }}
              className="mt-8 max-w-3xl text-xl font-medium leading-8 text-white/84"
            >
              A simple idea became the foundation of an evolving research
              ecosystem.
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.18 }}
              className="mt-5 max-w-3xl text-base leading-8 text-white/58"
            >
              Ré was established with a vision to cultivate curiosity,
              encourage inquiry, and create meaningful opportunities for
              learners to engage with research from the earliest stages of
              their academic journey. Today, it brings together students,
              educators, researchers, institutions, and industry in a shared
              pursuit of knowledge, innovation, and impact.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.24 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                onClick={() =>
                  document
                    .getElementById('our-beginning')
                    ?.scrollIntoView({
                      behavior: reduceMotion ? 'auto' : 'smooth',
                    })
                }
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-[#0E1712] transition hover:-translate-y-0.5"
              >
                Discover our story
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => goTo('#/ecosystem')}
                className="inline-flex h-13 items-center rounded-full border border-white/18 bg-white/[0.05] px-7 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.1]"
              >
                Explore the ecosystem
              </button>
            </motion.div>
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <div className="relative mx-auto aspect-square max-w-[420px]">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-[16%] rounded-full border border-dashed border-white/15" />
              <div className="absolute inset-[34%] grid place-items-center rounded-full bg-white/[0.08] backdrop-blur-xl">
                <span className="font-serif text-6xl italic text-white">Ré</span>
              </div>
              {['Question', 'Inquiry', 'Knowledge', 'Impact'].map(
                (item, index) => {
                  const theta =
                    (index / 4) * Math.PI * 2 - Math.PI / 2;
                  const left = 50 + Math.cos(theta) * 43;
                  const top = 50 + Math.sin(theta) * 43;
                  return (
                    <motion.div
                      key={item}
                      animate={
                        reduceMotion
                          ? undefined
                          : { y: [0, index % 2 === 0 ? -7 : 7, 0] }
                      }
                      transition={{
                        duration: 5 + index * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12 bg-[#14221A]/85 px-4 py-2 text-xs font-bold text-white/72 backdrop-blur"
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      {item}
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section> */}

      {/* BEGINNING */}
      <section
        id="our-beginning"
        className="scroll-mt-20 border-b border-black/10 bg-[#F7F6F2] py-24"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:px-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.23em] text-[#2F6F57]">
              Our beginning
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-6xl">
              Every meaningful journey begins with a question.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-8 text-base leading-8 text-[#666B66] sm:grid-cols-2">
              <p>
                Ré was born from a simple observation: curiosity is one of
                humanity&apos;s greatest strengths. Every learner possesses an
                innate desire to ask questions, understand the world, and
                explore possibilities.
              </p>
              <p>
                When curiosity is encouraged through thoughtful guidance,
                meaningful collaboration, and purposeful learning, it becomes
                the foundation of research, innovation, and lifelong
                discovery.
              </p>
            </div>

            <div className="mt-10 rounded-[32px] border border-black/10 bg-white p-8 sm:p-10">
              <span className="font-serif text-5xl italic text-[#D96C3F]">
                “
              </span>
              <p className="mt-2 max-w-3xl text-2xl font-semibold leading-10 tracking-[-0.025em] sm:text-3xl">
                What began as a vision to strengthen research culture has
                evolved into a connected ecosystem that empowers learners to
                think independently, investigate confidently, and contribute
                meaningfully to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY + VISION + MISSION */}
      <section className="border-b border-black/10 bg-white py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.23em] text-[#2F6F57]">
                Our philosophy
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Curiosity is where every discovery begins.
              </h2>
              <p className="mt-6 leading-8 text-[#686D68]">
                At Ré, research is more than an academic pursuit. It is a
                mindset, a way of observing, and a process of asking better
                questions, seeking deeper understanding, and continuously
                learning through exploration.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:col-span-8 md:grid-cols-2">
              <article className="rounded-[30px] bg-[#14221A] p-8 text-white sm:p-10">
                <Eye className="h-7 w-7 text-[#9ED0AD]" />
                <p className="mt-10 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ED0AD]">
                  Our vision
                </p>
                <h3 className="mt-4 text-3xl font-black tracking-[-0.035em]">
                  Inspiring a world where curiosity shapes the future.
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/60">
                  To build a globally connected research ecosystem that
                  nurtures curiosity, advances knowledge, inspires innovation,
                  and empowers individuals and institutions to create
                  meaningful impact through research.
                </p>
              </article>

              <article className="rounded-[30px] border border-black/10 bg-[#F1EFE7] p-8 sm:p-10">
                <Target className="h-7 w-7 text-[#D96C3F]" />
                <p className="mt-10 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#D96C3F]">
                  Our mission
                </p>
                <h3 className="mt-4 text-3xl font-black tracking-[-0.035em]">
                  Creating opportunities for every curious mind.
                </h3>
                <div className="mt-6 space-y-3">
                  {[
                    'Cultivate a vibrant culture of research and inquiry.',
                    'Enable interdisciplinary learning and collaboration.',
                    'Support learners through mentorship and structured research experiences.',
                    'Encourage innovation that addresses meaningful societal challenges.',
                    'Connect academia, industry, healthcare, and communities through research partnerships.',
                    'Build an ecosystem where knowledge is created, shared, and transformed into impact.',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-[#5E625E]"
                    >
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#2F6F57]" />
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-b border-black/10 bg-[#F7F6F2] py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.23em] text-[#2F6F57]">
              What we believe
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              The principles that guide us.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-5">
              {PRINCIPLES.map((item) => {
                const Icon = item.icon;
                const active = item.id === activePrinciple;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePrinciple(item.id)}
                    className={`min-h-[138px] rounded-2xl border p-5 text-left transition ${
                      active
                        ? 'border-transparent text-white shadow-xl'
                        : 'border-black/10 bg-white text-[#5E635F] hover:border-black/25'
                    }`}
                    style={{
                      backgroundColor: active ? item.accent : undefined,
                    }}
                    aria-pressed={active}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5" />
                      <span className="font-mono text-[10px] opacity-55">
                        {item.number}
                      </span>
                    </div>
                    <span className="mt-8 block text-sm font-black">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={principle.id}
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -18 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-[34px] border p-8 sm:p-12 lg:col-span-7"
                style={{
                  backgroundColor: principle.tint,
                  borderColor: `${principle.accent}35`,
                }}
              >
                <div
                  className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
                  style={{ backgroundColor: `${principle.accent}22` }}
                />
                <div className="relative z-10">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-sm"
                    style={{ color: principle.accent }}
                  >
                    <PrincipleIcon className="h-6 w-6" />
                  </div>
                  <p
                    className="mt-12 font-mono text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: principle.accent }}
                  >
                    Principle {principle.number}
                  </p>
                  <h3 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                    {principle.statement}
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#656A65]">
                    {principle.description}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="border-b border-black/10 bg-[#101914] py-24 text-white">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.23em] text-[#91C7A3]">
                The Ré ecosystem
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                A connected environment for research and innovation.
              </h2>
              <p className="mt-6 leading-8 text-white/58">
                Every initiative is connected through a shared purpose: to
                cultivate curiosity and transform ideas into meaningful
                outcomes.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_0.9fr]">
                <div className="relative mx-auto aspect-square w-full max-w-[560px]">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 600 600"
                    aria-hidden="true"
                  >
                    {ECOSYSTEM.map((_, index) => {
                      const angle =
                        (index / ECOSYSTEM.length) * Math.PI * 2 -
                        Math.PI / 2;
                      const x = 300 + Math.cos(angle) * 225;
                      const y = 300 + Math.sin(angle) * 225;
                      return (
                        <motion.line
                          key={index}
                          x1="300"
                          y1="300"
                          x2={x}
                          y2={y}
                          stroke="rgba(255,255,255,0.14)"
                          strokeWidth="1"
                          initial={
                            reduceMotion ? false : { pathLength: 0, opacity: 0 }
                          }
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 }}
                        />
                      );
                    })}
                  </svg>

                  <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-white/[0.07] text-center backdrop-blur">
                    <div>
                      <span className="font-serif text-5xl italic">Ré</span>
                      <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                        Connected
                      </span>
                    </div>
                  </div>

                  {ECOSYSTEM.map((item, index) => {
                    const angle =
                      (index / ECOSYSTEM.length) * Math.PI * 2 -
                      Math.PI / 2;
                    const left = 50 + Math.cos(angle) * 40;
                    const top = 50 + Math.sin(angle) * 40;
                    const Icon = item.icon;
                    const active = item.id === activeEcosystem;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveEcosystem(item.id)}
                        className={`absolute flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center transition ${
                          active
                            ? 'scale-110 border-white bg-white text-[#101914] shadow-2xl'
                            : 'border-white/12 bg-[#17241C]/90 text-white/65 hover:border-white/35 hover:text-white'
                        }`}
                        style={{ left: `${left}%`, top: `${top}%` }}
                        aria-pressed={active}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: active ? item.accent : undefined }}
                        />
                        <span className="mt-2 max-w-[72px] text-[10px] font-black leading-3">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.article
                    key={ecosystem.id}
                    initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -18 }}
                    className="flex min-h-[430px] flex-col justify-between rounded-[32px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur sm:p-10"
                  >
                    <div>
                      <div
                        className="grid h-13 w-13 place-items-center rounded-2xl bg-white"
                        style={{ color: ecosystem.accent }}
                      >
                        <EcosystemIcon className="h-6 w-6" />
                      </div>
                      <p
                        className="mt-10 font-mono text-xs font-bold uppercase tracking-[0.2em]"
                        style={{ color: ecosystem.accent }}
                      >
                        Ecosystem {ecosystem.number}
                      </p>
                      <h3 className="mt-4 text-3xl font-black tracking-[-0.04em]">
                        {ecosystem.title}
                      </h3>
                      <p className="mt-3 text-lg font-medium text-white/82">
                        {ecosystem.label}
                      </p>
                      <p className="mt-5 text-sm leading-7 text-white/55">
                        {ecosystem.description}
                      </p>
                    </div>

                    <button
                      onClick={() => goTo(ecosystem.route)}
                      className="group mt-10 inline-flex w-fit items-center gap-2 text-sm font-bold text-white"
                    >
                      Explore {ecosystem.title}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="border-b border-black/10 bg-white py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.23em] text-[#2F6F57]">
                Leadership
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                Guided by purpose.
              </h2>
              <p className="mt-6 max-w-lg leading-8 text-[#676C67]">
                Behind every initiative is a collective commitment to
                nurturing curiosity and strengthening research culture. Rather
                than leading from the front, the Ré community leads by
                enabling others to discover their own potential.
              </p>

              <div className="mt-9 space-y-2">
                {LEADERSHIP_ROLES.map((item, index) => (
                  <button
                    key={item.title}
                    onClick={() => setActiveLeader(index)}
                    className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-sm font-bold transition ${
                      index === activeLeader
                        ? 'bg-[#14221A] text-white'
                        : 'border border-black/10 bg-[#F7F6F2] text-[#5F645F] hover:border-black/25'
                    }`}
                  >
                    {item.title}
                    <ArrowRight
                      className={`h-4 w-4 transition ${
                        index === activeLeader ? 'translate-x-1' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLeader}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                className="relative overflow-hidden rounded-[36px] bg-[#E7EFE9] p-9 sm:p-14 lg:col-span-7"
              >
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2F6F57]/10 blur-3xl" />
                <div className="relative z-10">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-[#2F6F57] shadow-sm">
                    <ActiveLeadershipIcon className="h-7 w-7" />
                  </div>
                  <p className="mt-14 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#2F6F57]">
                    Enabling role
                  </p>
                  <h3 className="mt-4 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                    {LEADERSHIP_ROLES[activeLeader].title}
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#5F6C62]">
                    {LEADERSHIP_ROLES[activeLeader].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-b border-black/10 bg-[#F7F6F2] py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.23em] text-[#2F6F57]">
              The journey so far
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              From a funded beginning to a connected ecosystem.
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-[36px] border border-black/10 bg-white shadow-[0_28px_90px_-58px_rgba(23,26,24,0.5)]">
            <div className="flex overflow-x-auto border-b border-black/10 bg-[#F0EEE7]">
              {TIMELINE.map((item, index) => (
                <button
                  key={item.period}
                  onClick={() => setActiveTimeline(index)}
                  className="relative min-w-[180px] flex-1 px-5 py-5 text-left"
                >
                  <span
                    className={`block text-xs font-black ${
                      index === activeTimeline
                        ? 'text-[#171A18]'
                        : 'text-[#8A8F89]'
                    }`}
                  >
                    {item.period}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A9E99]">
                    {item.phase}
                  </span>
                  {index === activeTimeline && (
                    <motion.span
                      layoutId="about-timeline-indicator"
                      className="absolute bottom-0 left-5 right-5 h-[3px] rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimeline}
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}
                className="grid min-h-[400px] grid-cols-1 md:grid-cols-[220px_1fr]"
              >
                <div
                  className="flex flex-col justify-between p-8 text-white sm:p-10"
                  style={{ backgroundColor: timeline.accent }}
                >
                  <History className="h-7 w-7" />
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">
                      {timeline.phase}
                    </span>
                    <div className="mt-3 text-4xl font-black tracking-[-0.05em]">
                      {timeline.period}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-8 sm:p-12">
                  <div>
                    <h3 className="max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                      {timeline.title}
                    </h3>
                    <p className="mt-6 max-w-3xl text-base leading-8 text-[#666B66]">
                      {timeline.description}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <button
                      onClick={() =>
                        setActiveTimeline((current) =>
                          Math.max(0, current - 1),
                        )
                      }
                      disabled={activeTimeline === 0}
                      className="grid h-11 w-11 place-items-center rounded-full border border-black/10 transition hover:bg-black hover:text-white disabled:opacity-25"
                      aria-label="Previous period"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <span className="font-mono text-xs font-bold text-[#878C87]">
                      {String(activeTimeline + 1).padStart(2, '0')} /{' '}
                      {String(TIMELINE.length).padStart(2, '0')}
                    </span>

                    <button
                      onClick={() =>
                        setActiveTimeline((current) =>
                          Math.min(TIMELINE.length - 1, current + 1),
                        )
                      }
                      disabled={activeTimeline === TIMELINE.length - 1}
                      className="grid h-11 w-11 place-items-center rounded-full border border-black/10 transition hover:bg-black hover:text-white disabled:opacity-25"
                      aria-label="Next period"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FUTURE + FINAL CTA */}
      <section className="bg-[#14221A] px-6 py-24 text-white lg:px-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.23em] text-[#91C7A3]">
              Looking ahead
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              The future of Ré is still guided by curiosity.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-3xl text-base leading-8 text-white/62">
              As the ecosystem grows, so does our commitment to creating
              meaningful research opportunities, fostering interdisciplinary
              collaboration, strengthening partnerships, and enabling learners
              to contribute confidently to the advancement of knowledge and
              society.
            </p>

            <div className="mt-10 rounded-[36px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur sm:p-12">
              <CircleDot className="h-7 w-7 text-[#91C7A3]" />
              <h3 className="mt-8 max-w-3xl text-4xl font-black tracking-[-0.045em] sm:text-6xl">
                The story continues with every curious mind.
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/58">
                Whether you are beginning your first research experience,
                mentoring future researchers, collaborating with institutions,
                or advancing innovation, there is a place for you within the Ré
                ecosystem.
              </p>
              <button
                onClick={() => goTo('#/ecosystem')}
                className="group mt-9 inline-flex h-13 items-center gap-3 rounded-full bg-white px-8 text-sm font-bold text-[#14221A] transition hover:-translate-y-0.5"
              >
                Explore the ecosystem
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
