import React, { useRef } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpenText,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  FlaskConical,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Microscope,
  Network,
  Presentation,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
  Wrench,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface ProjectIntakePageProps {
  onNavigate: (hash: string) => void;
}

type IconType = React.ComponentType<{ className?: string }>;

type Audience = {
  title: string;
  note: string;
  icon: IconType;
};

type SubmissionType = {
  title: string;
  note: string;
  icon: IconType;
};

type SupportItem = {
  title: string;
  description: string;
  icon: IconType;
};

const AUDIENCES: Audience[] = [
  {
    title: 'Students',
    note: 'An early question, independent idea, or project that deserves deeper investigation.',
    icon: GraduationCap,
  },
  {
    title: 'Student teams',
    note: 'A shared idea that needs clearer research direction, mentorship, and structure.',
    icon: Users,
  },
  {
    title: 'Faculty',
    note: 'A research direction seeking collaborators, facilities, or ecosystem support.',
    icon: BookOpenText,
  },
  {
    title: 'Researchers',
    note: 'An active inquiry that could benefit from interdisciplinary collaboration.',
    icon: Microscope,
  },
  {
    title: 'Innovators',
    note: 'A promising concept that requires evidence, validation, or technical depth.',
    icon: Sparkles,
  },
  {
    title: 'Startups',
    note: 'An innovation-led challenge requiring research, validation, and expert guidance.',
    icon: Rocket,
  },
  {
    title: 'Industry partners',
    note: 'A practical problem that can benefit from structured, interdisciplinary inquiry.',
    icon: Building2,
  },
  {
    title: 'NGOs & communities',
    note: 'A social or community challenge that should be understood before intervention.',
    icon: HeartHandshake,
  },
];

const SUBMISSIONS: SubmissionType[] = [
  {
    title: 'Research questions',
    note: 'An unanswered question with the potential to create useful knowledge.',
    icon: Search,
  },
  {
    title: 'Existing prototypes',
    note: 'A prototype that now needs validation, research depth, or stronger evidence.',
    icon: Wrench,
  },
  {
    title: 'Product concepts',
    note: 'An early product or system idea that needs structured investigation.',
    icon: Boxes,
  },
  {
    title: 'Community challenges',
    note: 'A real-world issue requiring context, stakeholder understanding, and research.',
    icon: HeartHandshake,
  },
  {
    title: 'Industry problems',
    note: 'A practical challenge that could become a meaningful research opportunity.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Startup ideas',
    note: 'An innovation opportunity that requires validation and technical mentorship.',
    icon: Rocket,
  },
  {
    title: 'Social innovations',
    note: 'An intervention intended to create societal value through evidence-led development.',
    icon: Sprout,
  },
  {
    title: 'Technology ideas',
    note: 'AI, hardware, healthcare, education, sustainability, or interdisciplinary concepts.',
    icon: Atom,
  },
];

const EVALUATION = [
  {
    number: '01',
    title: 'Significance',
    copy: 'Is there a meaningful question, challenge, or opportunity worth investigating?',
  },
  {
    number: '02',
    title: 'Research potential',
    copy: 'Can the idea create useful knowledge, evidence, insight, or a defensible contribution?',
  },
  {
    number: '03',
    title: 'Feasibility',
    copy: 'Can the work be pursued responsibly with the available time, expertise, and resources?',
  },
  {
    number: '04',
    title: 'Relevance',
    copy: 'Does the idea respond to a real technical, scholarly, industrial, or societal need?',
  },
  {
    number: '05',
    title: 'Support required',
    copy: 'What mentorship, facilities, collaborations, data, or funding opportunities may be needed?',
  },
  {
    number: '06',
    title: 'Long-term potential',
    copy: 'Could the work mature into deeper research, innovation, publication, deployment, or continued collaboration?',
  },
];

const SUPPORT: SupportItem[] = [
  {
    title: 'Faculty mentorship',
    description:
      'Projects may be connected with suitable faculty mentors and domain experts according to their research needs.',
    icon: GraduationCap,
  },
  {
    title: 'Research Circle integration',
    description:
      'Successful proposals can become part of a relevant Research Circle and its wider knowledge network.',
    icon: Network,
  },
  {
    title: 'Laboratories & resources',
    description:
      'Project requirements can be assessed for facilities, equipment, data, and other available resources.',
    icon: FlaskConical,
  },
  {
    title: 'Interdisciplinary collaboration',
    description:
      'Ideas can gain perspective and capability through collaboration across disciplines and domains.',
    icon: Handshake,
  },
  {
    title: 'Funding opportunities',
    description:
      'Where applicable, projects may be considered for relevant funding possibilities and resource support.',
    icon: CircleDollarSign,
  },
  {
    title: 'Research documentation',
    description:
      'Structured reviews and documentation help turn an evolving idea into a rigorous body of work.',
    icon: ShieldCheck,
  },
  {
    title: 'Publication guidance',
    description:
      'Projects with suitable research contributions may progress toward scholarly communication and publication.',
    icon: Presentation,
  },
  {
    title: 'Innovation pathways',
    description:
      'Validated work may continue toward prototypes, competitions, intellectual property, deployment, or startup development.',
    icon: Lightbulb,
  },
];

const OUTCOMES = [
  'Research publications',
  'Conference presentations',
  'Validated prototypes',
  'Intellectual property',
  'Competitions',
  'Startup development',
  'Community implementation',
  'Further research',
];

const FAQS = [
  {
    question: 'Does my idea need to be fully developed?',
    answer:
      'No. Project Intake can begin with a research question, an early concept, an existing project, or a prototype. The purpose is to understand what the idea needs in order to become stronger and more rigorous.',
  },
  {
    question: 'Can a team submit an idea?',
    answer:
      'Yes. Student teams, faculty-led groups, startups, industry partners, innovators, and community collaborators can bring ideas into Project Intake.',
  },
  {
    question: 'Do I need a prototype before submitting?',
    answer:
      'No. A prototype is one possible starting point, not a requirement. A clear question, challenge, opportunity, or concept can also be submitted.',
  },
  {
    question: 'What happens after submission?',
    answer:
      'The idea is reviewed to understand its context, research potential, feasibility, support needs, and possible alignment with mentors, resources, and a relevant Research Circle.',
  },
  {
    question: 'Is funding guaranteed?',
    answer:
      'No. Funding is not guaranteed. Where applicable, the project may be assessed for suitable funding opportunities and resource support.',
  },
  {
    question: 'Can the work lead to publication or innovation?',
    answer:
      'Potentially. Depending on the quality and direction of the work, projects may progress toward publication, prototypes, competitions, intellectual property, deployment, startup development, or further research.',
  },
];

const ECOSYSTEM_NODES = [
  { label: 'Evaluation', position: 'left-[4%] top-[13%]' },
  { label: 'Mentorship', position: 'right-[2%] top-[12%]' },
  { label: 'Research Circle', position: 'right-[-1%] top-[45%]' },
  { label: 'Development', position: 'right-[8%] bottom-[6%]' },
  { label: 'Contribution', position: 'left-[8%] bottom-[5%]' },
  { label: 'Collaboration', position: 'left-[-2%] top-[47%]' },
];

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
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p
      className={`text-[10px] font-bold uppercase tracking-[0.24em] ${
        tone === 'light' ? 'text-white/[0.48]' : 'text-[#8A5138]'
      }`}
    >
      {children}
    </p>
  );
}

export default function ProjectIntakePage({ onNavigate }: ProjectIntakePageProps) {
  const reduceMotion = useReducedMotion();
  const fitRef = useRef<HTMLElement>(null);

  const scrollToFit = () => {
    fitRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="overflow-hidden bg-[#F3F0E9] text-[#171512] selection:bg-[#D96E41]/20">
      <section className="relative min-h-[760px] overflow-hidden bg-[#15120F] text-white lg:min-h-[860px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(217,110,65,0.3),transparent_27%),radial-gradient(circle_at_22%_86%,rgba(88,132,110,0.2),transparent_28%),linear-gradient(130deg,#15120F_0%,#1A1713_50%,#111916_100%)]" />
        <div className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(255,255,255,0.65)_0.7px,transparent_0.7px)] [background-size:24px_24px]" />
        <div className="absolute -right-40 top-16 h-[560px] w-[560px] rounded-full border border-white/[0.08]" />
        <div className="absolute -right-20 top-36 h-[400px] w-[400px] rounded-full border border-white/[0.08]" />

        <div className="relative mx-auto grid min-h-[760px] max-w-[1480px] grid-cols-1 items-center gap-16 px-6 py-24 sm:px-8 lg:min-h-[860px] lg:grid-cols-12 lg:px-20">
          <div className="lg:col-span-7">
            <motion.button
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45 }}
              onClick={() => onNavigate('#/programs')}
              className="mb-12 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/[0.45] transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/[0.08]0"
            >
              <ArrowLeft className="h-4 w-4" />
              Research pathways
            </motion.button>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.52, delay: 0.05 }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#F49B72]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F49B72]">
                Project Intake · Ré
              </span>
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.1 }}
              className="max-w-5xl font-display text-[52px] font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[92px]"
            >
              An idea is only the beginning.
              <span className="mt-2 block font-serif font-normal italic text-white/[0.48]">
                Research gives it direction.
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.58, delay: 0.17 }}
              className="mt-9 max-w-2xl text-base leading-8 text-white/[0.62] sm:text-lg"
            >
              Project Intake is the entry point for questions, concepts, prototypes, and real-world challenges that deserve structured research, mentorship, collaboration, and long-term development within the Ré ecosystem.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.58, delay: 0.23 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                onClick={() => onNavigate('#/connect')}
                className="group inline-flex h-[54px] items-center gap-3 rounded-full bg-white px-7 text-sm font-semibold text-[#171512] transition hover:-translate-y-0.5 hover:bg-[#F6E7DE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#15120F]"
              >
                Submit an idea
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToFit}
                className="inline-flex h-[54px] items-center gap-3 rounded-full border border-white/[0.16] bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/[0.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                See whether it fits
                <ArrowDown className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.18 }}
            className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:col-span-5 lg:block"
            aria-hidden="true"
          >
            <div className="absolute inset-[4%] rounded-full border border-white/[0.08]" />
            <div className="absolute inset-[18%] rounded-full border border-dashed border-white/10" />
            <div className="absolute inset-[32%] rounded-full border border-white/10" />

            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={reduceMotion ? undefined : { duration: 38, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[10%] rounded-full"
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#F49B72] shadow-[0_0_30px_rgba(244,155,114,0.8)]" />
              <span className="absolute bottom-[12%] left-[6%] h-2 w-2 rounded-full bg-[#8CC7A8]" />
              <span className="absolute right-[3%] top-[48%] h-1.5 w-1.5 rounded-full bg-white/70" />
            </motion.div>

            <div className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.07] p-8 text-center shadow-2xl backdrop-blur-xl">
              <div>
                <Lightbulb className="mx-auto h-7 w-7 text-[#F49B72]" />
                <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em]">Your idea</p>
                <p className="mt-2 text-xs leading-5 text-white/[0.45]">Unfinished is a valid place to begin.</p>
              </div>
            </div>

            <div className="absolute left-[1%] top-[13%] rounded-2xl border border-white/10 bg-[#1E1A16]/[0.84] px-4 py-3 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.38]">Question</span>
            </div>
            <div className="absolute right-[0%] top-[22%] rounded-2xl border border-white/10 bg-[#1E1A16]/[0.84] px-4 py-3 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.38]">Prototype</span>
            </div>
            <div className="absolute bottom-[12%] right-[4%] rounded-2xl border border-white/10 bg-[#1E1A16]/[0.84] px-4 py-3 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.38]">Challenge</span>
            </div>
            <div className="absolute bottom-[8%] left-[2%] rounded-2xl border border-white/10 bg-[#1E1A16]/[0.84] px-4 py-3 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.38]">Concept</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={fitRef} id="who-can-apply" className="scroll-mt-20 px-6 py-24 sm:px-8 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Who Project Intake is for</Eyebrow>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[72px]">
                You do not need a finished answer.
                <span className="block font-serif font-normal italic text-[#8A8178]">You need something worth exploring.</span>
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-7 text-[#6E6962] lg:col-span-5 lg:justify-self-end">
              Project Intake is open to people who already have a question, idea, challenge, or active project and need the right research ecosystem around it.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[32px] border border-black/[0.08] bg-black/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <motion.article
                  key={audience.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, delay: index * 0.04 }}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                  className="group min-h-[250px] bg-[#FBFAF7] p-7 transition-colors hover:bg-white sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#F4EEE8] text-[#A25435] transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.18em] text-black/[0.24]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-12 text-xl font-semibold tracking-[-0.025em]">{audience.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#77716A]">{audience.note}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#E9E4DA] px-6 py-24 sm:px-8 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <Reveal className="max-w-4xl">
            <Eyebrow>What you can bring</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[70px]">
              Bring the idea at the stage it exists today.
            </h2>
            <p className="mt-7 max-w-2xl text-[15px] leading-7 text-[#6D675F]">
              A polished proposal is not the only valid beginning. Project Intake can start with a question, a challenge, an early concept, an active project, or a prototype that needs deeper research.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SUBMISSIONS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.035 }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className={`relative overflow-hidden rounded-[28px] border border-black/[0.08] p-7 shadow-[0_20px_50px_rgba(40,32,24,0.04)] ${
                    index === 0 || index === 5 ? 'bg-[#1B1815] text-white' : 'bg-[#F8F6F1]'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      index === 0 || index === 5 ? 'bg-white/10 text-[#F6A27C]' : 'bg-[#EEE3D9] text-[#A25435]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-9 text-lg font-semibold tracking-[-0.025em]">{item.title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${index === 0 || index === 5 ? 'text-white/[0.54]' : 'text-[#77716A]'}`}>
                    {item.note}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="ecosystem" className="relative overflow-hidden bg-[#171512] px-6 py-24 text-white sm:px-8 lg:px-20 lg:py-36">
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:68px_68px]" />
        <div className="absolute left-[10%] top-[22%] h-80 w-80 rounded-full bg-[#D96E41]/12 blur-[110px]" />
        <div className="absolute bottom-[8%] right-[8%] h-96 w-96 rounded-full bg-[#5E8E74]/13 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="light">What happens after submission</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.05em] sm:text-6xl lg:text-[68px]">
              Your idea does not enter a queue.
              <span className="block font-serif font-normal italic text-white/[0.42]">It enters an ecosystem.</span>
            </h2>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/[0.56]">
              Ré first works to understand the idea: what it is trying to solve, what evidence it needs, what expertise could strengthen it, and what kind of research environment would help it progress.
            </p>
            <div className="mt-10 border-l border-white/[0.14] pl-6">
              <p className="max-w-md text-xl font-medium leading-8 text-white/[0.08]6">
                The process is not designed to preserve every proposal unchanged. It is designed to make promising work more rigorous, feasible, and meaningful.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="relative mx-auto aspect-square w-full max-w-[650px]" aria-label="Project Intake ecosystem">
              <div className="absolute inset-[6%] rounded-full border border-white/[0.08]" />
              <div className="absolute inset-[20%] rounded-full border border-dashed border-white/10" />
              <div className="absolute inset-[35%] rounded-full border border-white/10" />

              <motion.div
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={reduceMotion ? undefined : { duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[13%] rounded-full border border-white/0"
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#F49B72]" />
                <span className="absolute bottom-[5%] left-[20%] h-1.5 w-1.5 rounded-full bg-[#8CC7A8]" />
              </motion.div>

              <div className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:h-56 sm:w-56">
                <div>
                  <Lightbulb className="mx-auto h-7 w-7 text-[#F49B72]" />
                  <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">One idea</p>
                  <p className="mt-2 text-xs leading-5 text-white/[0.44]">surrounded by the right people, questions, and resources</p>
                </div>
              </div>

              {ECOSYSTEM_NODES.map((node, index) => (
                <motion.div
                  key={node.label}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduceMotion ? 0 : 0.15 + index * 0.08 }}
                  className={`absolute ${node.position} flex min-h-[74px] min-w-[132px] items-center justify-center rounded-2xl border border-white/10 bg-[#211E1A]/[0.82] px-4 py-3 text-center shadow-xl backdrop-blur-md sm:min-w-[154px]`}
                >
                  <span className="text-[11px] font-semibold tracking-[0.01em] text-white/[0.74]">{node.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Evaluation philosophy</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[70px]">
                Evaluation is not a verdict on the idea.
                <span className="block font-serif font-normal italic text-[#8A8178]">It is a diagnosis of what it needs.</span>
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-7 text-[#6E6962] lg:col-span-5 lg:justify-self-end">
              Ré looks beyond presentation quality. The aim is to understand whether the idea can become a responsible, research-worthy and sustainable body of work.
            </p>
          </Reveal>

          <div className="mt-16 divide-y divide-black/10 border-y border-black/10">
            {EVALUATION.map((item, index) => (
              <motion.article
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduceMotion ? 0 : 0.52, delay: index * 0.035 }}
                className="group grid grid-cols-[54px_1fr] gap-5 py-7 sm:grid-cols-[90px_0.65fr_1.35fr] sm:items-center sm:py-9"
              >
                <span className="font-mono text-[11px] font-bold text-[#B8AFA6]">{item.number}</span>
                <h3 className="text-xl font-semibold tracking-[-0.025em] transition-transform group-hover:translate-x-1 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="col-start-2 text-sm leading-7 text-[#756F68] sm:col-start-3 sm:max-w-2xl">{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#DDE4DC] px-6 py-24 sm:px-8 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <Reveal className="max-w-4xl">
            <Eyebrow>What can grow around your project</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[70px]">
              An idea becomes stronger when support is designed around it.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SUPPORT.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.48, delay: index * 0.04 }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="rounded-[28px] border border-black/[0.08] bg-[#F7F8F3]/[0.82] p-7 shadow-[0_20px_60px_rgba(29,44,35,0.04)] backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1D3527] text-[#BCE0C9]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-10 text-lg font-semibold tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#667069]">{item.description}</p>
                </motion.article>
              );
            })}
          </div>

          <Reveal className="mt-10 rounded-[28px] border border-black/[0.08] bg-[#1D3527] p-7 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#BCE0C9]">Support is project-dependent.</p>
              <p className="mt-2 text-sm leading-6 text-white/[0.54]">
                Mentorship, facilities, funding opportunities, collaboration, and publication pathways depend on the project’s needs, feasibility, alignment, and available resources. They should be understood as possibilities—not automatic entitlements.
              </p>
            </div>
            <ShieldCheck className="mt-6 h-7 w-7 shrink-0 text-[#BCE0C9] sm:mt-0" />
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Where an idea may lead</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.05em] sm:text-6xl">
                The outcome is not predetermined.
                <span className="block font-serif font-normal italic text-[#8A8178]">The contribution is discovered through the work.</span>
              </h2>
              <p className="mt-7 max-w-lg text-[15px] leading-7 text-[#6F6962]">
                Different projects mature in different ways. These are possible directions for strong work, not guaranteed results.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {OUTCOMES.map((outcome, index) => (
                  <motion.div
                    key={outcome}
                    initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.035 }}
                    className="group flex min-h-[92px] items-center justify-between rounded-2xl border border-black/[0.08] bg-white/[0.55] px-5 py-4 transition hover:bg-white"
                  >
                    <span className="text-sm font-semibold text-[#2E2A26]">{outcome}</span>
                    <ArrowRight className="h-4 w-4 text-[#B2A89F] transition-transform group-hover:translate-x-1 group-hover:text-[#A25435]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-black/[0.08] bg-[#F8F6F1] px-6 py-24 sm:px-8 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="max-w-3xl">
            <Eyebrow>Questions before you submit</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Clarity before commitment.</h2>
          </Reveal>

          <div className="mt-14 divide-y divide-black/10 border-y border-black/10">
            {FAQS.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A25435]">
                  <span className="text-base font-semibold tracking-[-0.015em] sm:text-lg">{item.question}</span>
                  <span className="relative h-6 w-6 shrink-0 rounded-full border border-black/[0.15]">
                    <span className="absolute left-1/2 top-1/2 h-px w-2.5 -translate-x-1/2 -translate-y-1/2 bg-black/60" />
                    <span className="absolute left-1/2 top-1/2 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-black/60 transition-transform group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-3xl pb-7 pr-10 text-sm leading-7 text-[#726C65]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-20 lg:py-28">
        <Reveal className="mx-auto max-w-[1320px] overflow-hidden rounded-[40px] bg-[#D96E41] text-[#1A120E] shadow-[0_36px_100px_rgba(104,48,24,0.16)]">
          <div className="relative grid grid-cols-1 gap-12 p-9 sm:p-14 lg:grid-cols-12 lg:items-end lg:p-16">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-black/10" />
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-black/10" />

            <div className="relative lg:col-span-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/[0.48]">Begin with the unanswered question</p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[72px]">
                Every meaningful innovation begins before anyone knows exactly what it will become.
              </h2>
              <p className="mt-7 max-w-2xl text-[15px] leading-7 text-black/[0.62]">
                Bring the question, challenge, concept, or prototype. Project Intake is where Ré begins understanding what it could become—and what it will take to get there.
              </p>
            </div>

            <div className="relative flex lg:col-span-4 lg:justify-end">
              <button
                onClick={() => onNavigate('#/connect')}
                className="group inline-flex h-[56px] items-center gap-3 rounded-full bg-[#181512] px-8 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#D96E41]"
              >
                Submit your idea
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
