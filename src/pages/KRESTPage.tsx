import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleDot,
  FileCheck2,
  FileText,
  FlaskConical,
  GraduationCap,
  LibraryBig,
  Network,
  NotebookPen,
  Presentation,
  Scale,
  Search,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface KRESTPageProps {
  onNavigate: (hash: string) => void;
}

interface PathwayStage {
  number: string;
  title: string;
  purpose: string;
  evidence: string;
}

interface CapabilityGroup {
  title: string;
  description: string;
  topics: string[];
}

const PATHWAY_STAGES: PathwayStage[] = [
  {
    number: '01',
    title: 'Selection',
    purpose:
      'Students enter through a considered selection process that examines motivation, intellectual curiosity, readiness for sustained work, and willingness to receive critique.',
    evidence:
      'A cohort selected for commitment to the discipline of research rather than prior experience alone.',
  },
  {
    number: '02',
    title: 'Orientation',
    purpose:
      'The cohort is introduced to Ré, the expectations of KREST, academic integrity, mentor relationships, documentation practices, and the standards of scholarly work.',
    evidence:
      'A shared understanding of the pathway, its responsibilities, and the institutional research culture.',
  },
  {
    number: '03',
    title: 'Probationary Phase',
    purpose:
      'Students demonstrate consistency, responsiveness to feedback, academic discipline, and the capacity to work within an evaluated research environment.',
    evidence:
      'An evidence-based decision on readiness to progress into formal research education.',
  },
  {
    number: '04',
    title: 'Research Foundations',
    purpose:
      'Students study the concepts and practices required to formulate questions, examine literature, select methods, collect evidence, document decisions, and communicate responsibly.',
    evidence:
      'A working foundation in research methodology, ethics, inquiry, analysis, and scholarly communication.',
  },
  {
    number: '05',
    title: 'Nano Research Project',
    purpose:
      'Foundational learning is tested through a small, tightly scoped investigation completed with faculty guidance and explicit documentation.',
    evidence:
      'A complete introductory investigation that demonstrates whether the student can translate instruction into research practice.',
  },
  {
    number: '06',
    title: 'Evaluation',
    purpose:
      'Faculty review the student’s reasoning, methodological choices, documentation, communication, reliability, and response to critique.',
    evidence:
      'A rigorous progression decision grounded in demonstrated research capability.',
  },
  {
    number: '07',
    title: 'Major Research Project',
    purpose:
      'Students undertake sustained investigation of a consequential question with greater independence, deeper methodological responsibility, and regular mentor review.',
    evidence:
      'A substantial body of research shaped by continuity, evidence, and accountable decision-making.',
  },
  {
    number: '08',
    title: 'Research Circle Integration',
    purpose:
      'The work becomes part of a continuing community of faculty, students, methods, questions, and institutional knowledge within Ré.',
    evidence:
      'Research that is situated within a living intellectual community rather than isolated as a one-semester activity.',
  },
  {
    number: '09',
    title: 'Research Outputs',
    purpose:
      'The investigation is developed into an appropriate scholarly, technical, or translational contribution.',
    evidence:
      'Publications, posters, technical reports, working papers, prototypes, conference submissions, or potential intellectual property.',
  },
];

const EDUCATION_MODEL = [
  {
    title: 'Research education',
    description:
      'Explicit instruction in the principles, methods, ethics, and communication practices that define credible research.',
    icon: BookOpen,
  },
  {
    title: 'Guided practice',
    description:
      'Concepts are applied through bounded investigations before students assume responsibility for more complex work.',
    icon: FlaskConical,
  },
  {
    title: 'Continuous evaluation',
    description:
      'Progress is determined through evidence of capability, not attendance or completion alone.',
    icon: FileCheck2,
  },
  {
    title: 'Independent investigation',
    description:
      'Students progressively learn to frame questions, justify decisions, manage uncertainty, and sustain inquiry.',
    icon: Search,
  },
  {
    title: 'Faculty mentorship',
    description:
      'Mentors provide intellectual challenge, methodological guidance, critique, and standards of scholarly conduct.',
    icon: Users,
  },
  {
    title: 'Research Circle integration',
    description:
      'Projects, methods, and knowledge remain connected to continuing communities of inquiry within Ré.',
    icon: Network,
  },
];

const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    title: 'Formulate',
    description:
      'Develop questions that are clear, consequential, researchable, and grounded in prior knowledge.',
    topics: [
      'Problem identification',
      'Research questions',
      'Literature review',
      'Critical thinking',
      'Scientific inquiry',
    ],
  },
  {
    title: 'Design',
    description:
      'Choose defensible approaches for investigating a question and producing credible evidence.',
    topics: [
      'Research methodology',
      'Research design',
      'Data collection',
      'Research ethics',
      'Scope and feasibility',
    ],
  },
  {
    title: 'Document',
    description:
      'Maintain an accountable record of sources, decisions, methods, observations, findings, and limitations.',
    topics: [
      'Research documentation',
      'Technical reporting',
      'Evidence management',
      'Versioned progress',
      'Reflective practice',
    ],
  },
  {
    title: 'Communicate',
    description:
      'Present research with accuracy, structure, intellectual honesty, and awareness of audience.',
    topics: [
      'Academic writing',
      'Scientific communication',
      'Posters and presentations',
      'Argument and evidence',
      'Scholarly conventions',
    ],
  },
];

const EVALUATION_DIMENSIONS = [
  {
    dimension: 'Question quality',
    evidence:
      'Clarity, significance, scope, grounding in literature, and suitability for investigation.',
  },
  {
    dimension: 'Methodological judgement',
    evidence:
      'Ability to justify methods, recognise constraints, and align evidence with the research question.',
  },
  {
    dimension: 'Research integrity',
    evidence:
      'Ethical conduct, responsible use of sources and data, transparent documentation, and acknowledgement of limitations.',
  },
  {
    dimension: 'Analytical reasoning',
    evidence:
      'Interpretation of evidence, examination of assumptions, comparison of alternatives, and quality of conclusions.',
  },
  {
    dimension: 'Documentation',
    evidence:
      'Consistency, traceability, completeness, and the ability of another researcher to understand the work.',
  },
  {
    dimension: 'Scholarly communication',
    evidence:
      'Clarity, structure, precision, use of evidence, and responsiveness during review and presentation.',
  },
  {
    dimension: 'Research discipline',
    evidence:
      'Reliability, sustained engagement, response to critique, planning, and accountability to agreed milestones.',
  },
];

const RESEARCH_OUTPUTS = [
  'Research publications',
  'Posters',
  'Technical reports',
  'Working papers',
  'Prototypes',
  'Conference submissions',
  'Research documentation',
  'Potential intellectual property',
];

const ACADEMIC_INFORMATION = [
  ['Full name', 'Kumaraguru Research and Exploration in Science and Technology'],
  ['Institutional role', 'Flagship structured research education pathway of Ré'],
  ['Duration', 'One academic semester'],
  ['Intake', 'One cohort every semester'],
  ['Eligibility', 'Undergraduate and postgraduate students from any discipline'],
  ['Prior experience', 'Not required'],
  ['Mentorship', 'Faculty-mentored with structured reviews and progression decisions'],
  ['Research context', 'Integrated with Ré Research Circles and institutional research priorities'],
];

const FAQS = [
  {
    question: 'Is KREST an internship, workshop, or certification course?',
    answer:
      'No. KREST is a semester-long research education pathway. Its purpose is to develop research capability through instruction, guided practice, evaluation, mentorship, and progressively independent investigation.',
  },
  {
    question: 'Do applicants need previous research experience?',
    answer:
      'No. Selection considers motivation, curiosity, discipline, and readiness for sustained work. KREST is designed to develop research capability rather than assume it already exists.',
  },
  {
    question: 'Who can apply?',
    answer:
      'Undergraduate and postgraduate students from any discipline may apply, particularly those interested in research, higher education, interdisciplinary problem-solving, innovation, or evidence-led entrepreneurship.',
  },
  {
    question: 'How long does the pathway run?',
    answer:
      'KREST is structured across one academic semester, with one intake every semester.',
  },
  {
    question: 'Does every student progress automatically?',
    answer:
      'No. Progression is evidence-based. Students are reviewed during the probationary phase, after foundational learning, and through project evaluations. Advancement depends on demonstrated research capability and academic discipline.',
  },
  {
    question: 'What may result from the research?',
    answer:
      'Depending on the question, maturity of the work, and disciplinary context, outputs may include publications, posters, technical reports, working papers, prototypes, conference submissions, or potential intellectual property.',
  },
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
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-7 border-t pt-6 lg:grid-cols-12 ${
        light ? 'border-white/20' : 'border-[#18211D]/15'
      }`}
    >
      <div className="lg:col-span-3">
        <div className="flex items-center gap-4">
          <span
            className={`font-mono text-[10px] ${
              light ? 'text-white/40' : 'text-[#6B756F]'
            }`}
          >
            {index}
          </span>
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.22em] ${
              light ? 'text-[#D3B28F]' : 'text-[#7A3E28]'
            }`}
          >
            {eyebrow}
          </p>
        </div>
      </div>

      <div className="lg:col-span-9">
        <h2
          className={`max-w-5xl font-serif text-[clamp(2.7rem,5vw,5.8rem)] leading-[0.96] tracking-[-0.045em] ${
            light ? 'text-white' : 'text-[#18211D]'
          }`}
        >
          {title}
        </h2>

        {description && (
          <p
            className={`mt-7 max-w-3xl text-base leading-8 sm:text-lg ${
              light ? 'text-white/60' : 'text-[#536058]'
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-[#18211D]/15">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-8 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3E28] focus-visible:ring-offset-4"
      >
        <span className="max-w-3xl font-serif text-xl leading-snug sm:text-2xl">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 text-base leading-8 text-[#55615A]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function KRESTPage({ onNavigate }: KRESTPageProps) {
  const reduceMotion = useReducedMotion();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const scrollToPathway = () => {
    document
      .getElementById('krest-pathway')
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#F3F0E8] text-[#18211D]">
      {/* Hero */}
      <section className="border-b border-[#18211D]/15">
        <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-8 sm:px-8 lg:px-20 lg:pb-24">
          <button
            type="button"
            onClick={() => onNavigate('#/programs')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#5D6962] transition-colors hover:text-[#18211D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3E28] focus-visible:ring-offset-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Research pathways
          </button>

          <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A3E28]">
                KREST · Kumaraguru Research and Exploration in Science and Technology
              </p>

              <h1 className="mt-7 max-w-6xl font-serif text-[clamp(4rem,8vw,8.8rem)] leading-[0.86] tracking-[-0.06em]">
                Researchers are
                <span className="block italic text-[#637069]">developed deliberately.</span>
              </h1>

              <p className="mt-9 max-w-3xl text-lg leading-8 text-[#4F5B54] sm:text-xl sm:leading-9">
                KREST is Ré&apos;s flagship semester-long research pathway: a
                progressive, evaluated, and faculty-mentored education in how to
                formulate questions, investigate systematically, and contribute
                credible research.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <button
                  type="button"
                  onClick={scrollToPathway}
                  className="group inline-flex items-center gap-3 border-b border-[#18211D] pb-2 text-sm font-bold"
                >
                  Study the pathway
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('#/careers')}
                  className="group inline-flex items-center gap-3 border-b border-[#18211D]/25 pb-2 text-sm font-semibold text-[#55615A] transition-colors hover:border-[#18211D] hover:text-[#18211D]"
                >
                  View the next intake
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-4">
              <dl className="border-t border-[#18211D]/20">
                {[
                  ['Duration', 'One academic semester'],
                  ['Intake', 'One cohort every semester'],
                  ['Eligibility', 'Undergraduate and postgraduate students'],
                  ['Prior research', 'Not required'],
                  ['Mentorship', 'Faculty-guided and continuously evaluated'],
                ].map(([term, detail]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#18211D]/20 py-5"
                  >
                    <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6B756F]">
                      {term}
                    </dt>
                    <dd className="text-sm font-semibold leading-6">{detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow="Institutional purpose"
            title="Research capability is not assumed. It is taught, practised, examined, and refined."
            description="KREST exists to replace accidental exposure with a coherent educational pathway. Students progress from foundational instruction to guided investigation, independent research, and contribution within a continuing intellectual community."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 border-y border-[#18211D]/15 lg:grid-cols-3">
          {[
            {
              title: 'Not episodic',
              text: 'KREST is not organised around a single workshop, event, or short-term activity. Capability develops through sustained work across a semester.',
            },
            {
              title: 'Not project-first',
              text: 'Students are not simply assigned projects. They are taught how to think, design, document, evaluate, and communicate as researchers.',
            },
            {
              title: 'Not completion-based',
              text: 'Progression depends on demonstrated capability, academic discipline, and the quality of evidence produced through each stage.',
            },
          ].map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              className="border-b border-[#18211D]/15 py-9 last:border-b-0 lg:border-b-0 lg:border-r lg:px-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <p className="font-mono text-xs text-[#7A3E28]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-7 font-serif text-3xl">{item.title}</h3>
              <p className="mt-5 max-w-md text-base leading-8 text-[#566159]">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education model */}
      <section className="border-y border-[#18211D]/15 bg-[#E8E3D8]">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="Research education model"
              title="Six institutional commitments shape every KREST cohort."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16">
            {EDUCATION_MODEL.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={item.title}
                  delay={(index % 2) * 0.05}
                  className="grid grid-cols-[52px_1fr] gap-5 border-t border-[#18211D]/15 py-7"
                >
                  <Icon className="h-5 w-5 text-[#7A3E28]" />
                  <div>
                    <h3 className="font-serif text-2xl">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-[#566159]">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pathway */}
      <section
        id="krest-pathway"
        className="mx-auto max-w-[1500px] scroll-mt-24 px-6 py-24 sm:px-8 sm:py-32 lg:px-20"
      >
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="The KREST pathway"
            title="Nine stages progressively transfer responsibility from mentor to researcher."
            description="The sequence is deliberate. Each stage establishes the judgement, discipline, and evidence required for the next."
          />
        </Reveal>

        <div className="mt-20 border-t border-[#18211D]/15">
          {PATHWAY_STAGES.map((stage, index) => (
            <Reveal
              key={stage.number}
              className="grid grid-cols-1 gap-7 border-b border-[#18211D]/15 py-10 md:grid-cols-[100px_260px_1fr] md:gap-10 lg:grid-cols-[130px_330px_1fr] lg:py-14"
            >
              <div>
                <span className="font-serif text-5xl leading-none text-[#7A3E28] sm:text-6xl">
                  {stage.number}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
                  {stage.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B756F]">
                    Educational purpose
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#566159]">
                    {stage.purpose}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A3E28]">
                    Evidence of progression
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#2E3933]">
                    {stage.evidence}
                  </p>
                </div>
              </div>

              {index < PATHWAY_STAGES.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:col-start-1 md:flex md:justify-center"
                >
                  <ArrowRight className="h-4 w-4 rotate-90 text-[#7A3E28]/55" />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capability curriculum */}
      <section className="border-y border-[#18211D]/15 bg-[#1E2823] text-white">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
          <Reveal>
            <SectionHeader
              index="04"
              eyebrow="Curriculum of research capability"
              title="Students learn the intellectual and practical disciplines required to conduct credible research."
              description="KREST combines formal research education with repeated application, critique, revision, and documentation."
              light
            />
          </Reveal>

          <div className="mt-16 border-t border-white/18">
            {CAPABILITY_GROUPS.map((group, index) => (
              <Reveal
                key={group.title}
                className="grid grid-cols-1 gap-8 border-b border-white/18 py-10 md:grid-cols-[90px_250px_1fr] md:gap-10 lg:grid-cols-[110px_300px_1fr]"
              >
                <span className="font-mono text-xs text-[#D3B28F]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3 className="font-serif text-3xl">{group.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {group.topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-3 border-t border-white/14 py-4 sm:odd:pr-6 sm:even:pl-6"
                    >
                      <CircleDot className="h-3.5 w-3.5 shrink-0 text-[#D3B28F]" />
                      <span className="text-sm font-semibold text-white/78">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="Evaluation and progression"
            title="KREST evaluates the formation of a researcher, not the completion of activities."
            description="Review is continuous and evidence-led. Faculty examine the quality of judgement, method, documentation, conduct, and communication demonstrated across the pathway."
          />
        </Reveal>

        <div className="mt-16 border-t border-[#18211D]/15">
          {EVALUATION_DIMENSIONS.map((item, index) => (
            <Reveal
              key={item.dimension}
              className="grid grid-cols-[46px_1fr] gap-5 border-b border-[#18211D]/15 py-6 sm:grid-cols-[70px_260px_1fr] sm:gap-8"
            >
              <span className="font-mono text-xs text-[#7A3E28]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl">{item.dimension}</h3>
              <p className="col-start-2 max-w-3xl text-sm leading-7 text-[#566159] sm:col-start-auto">
                {item.evidence}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 border-l-2 border-[#7A3E28] pl-6">
          <p className="max-w-3xl text-base leading-8 text-[#4F5B54]">
            Progression is not automatic. Students advance when the evidence shows
            that they are ready to assume greater responsibility for the quality,
            integrity, and direction of their research.
          </p>
        </Reveal>
      </section>

      {/* Research Circle integration */}
      <section className="border-y border-[#18211D]/15 bg-[#DDE3DD]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:px-20">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#375A49]">
              Research Circle integration
            </p>
            <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.6rem)] leading-[0.96] tracking-[-0.045em]">
              Research continues beyond one student and one semester.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <p className="max-w-3xl text-lg leading-9 text-[#4E5D55]">
              Major investigations are situated within Ré&apos;s Research Circles,
              where faculty, students, questions, methods, and prior work form a
              continuing research community. This preserves institutional knowledge,
              strengthens mentorship, and allows subsequent cohorts to build from a
              more mature starting point.
            </p>

            <div className="mt-10 grid grid-cols-1 border-y border-[#18211D]/15 sm:grid-cols-3">
              {[
                ['Continuity', 'Questions and methods remain available to future researchers.'],
                ['Mentorship', 'Students work within an established intellectual community.'],
                ['Contribution', 'Outputs strengthen a wider body of institutional research.'],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="border-b border-[#18211D]/15 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                >
                  <h3 className="font-serif text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#58655E]">{text}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('#/research-circles')}
              className="group mt-9 inline-flex items-center gap-3 border-b border-[#18211D] pb-2 text-sm font-bold"
            >
              Explore the Research Circles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Outputs */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
        <Reveal>
          <SectionHeader
            index="06"
            eyebrow="Research outputs"
            title="The objective is credible contribution, expressed in the form most appropriate to the research."
            description="Outputs are not treated as decorative evidence of participation. They emerge from the quality, maturity, and relevance of the investigation."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 border-t border-[#18211D]/15 md:grid-cols-2">
          {RESEARCH_OUTPUTS.map((output, index) => (
            <Reveal
              key={output}
              delay={(index % 2) * 0.04}
              className="grid grid-cols-[42px_1fr] gap-5 border-b border-[#18211D]/15 py-7 md:odd:border-r md:odd:pr-8 md:even:pl-8"
            >
              <span className="font-mono text-xs text-[#7A3E28]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="font-serif text-2xl">{output}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Academic information */}
      <section className="border-y border-[#18211D]/15 bg-[#E9E5DC]">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
          <Reveal>
            <SectionHeader
              index="07"
              eyebrow="Academic information"
              title="A semester-long pathway with explicit standards, mentorship, and progression."
            />
          </Reveal>

          <dl className="mt-16 border-t border-[#18211D]/15">
            {ACADEMIC_INFORMATION.map(([term, detail]) => (
              <Reveal
                key={term}
                className="grid grid-cols-1 gap-2 border-b border-[#18211D]/15 py-6 sm:grid-cols-[250px_1fr] sm:gap-10"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B756F]">
                  {term}
                </dt>
                <dd className="max-w-3xl text-base font-semibold leading-7">
                  {detail}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:px-20">
        <Reveal className="lg:col-span-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7A3E28]">
            Frequently asked questions
          </p>
          <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.98] tracking-[-0.045em]">
            Entering the pathway.
          </h2>
        </Reveal>

        <div className="border-b border-[#18211D]/15 lg:col-span-8">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openFAQ === index}
              onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#7A3E28] text-white">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
                One intake every semester
              </p>
              <h2 className="mt-6 max-w-5xl font-serif text-[clamp(3.3rem,6vw,7rem)] leading-[0.9] tracking-[-0.05em]">
                Enter a pathway designed to form researchers.
              </h2>
            </div>

            <div className="lg:col-span-4">
              <p className="max-w-md text-base leading-8 text-white/72">
                Previous research experience is not required. Intellectual curiosity,
                discipline, and readiness for sustained work are.
              </p>

              <button
                type="button"
                onClick={() => onNavigate('#/careers')}
                className="group mt-8 inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#7A3E28]"
              >
                Review the next KREST intake
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
