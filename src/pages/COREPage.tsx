import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  GraduationCap,
  LibraryBig,
  MapPinned,
  MessageSquareText,
  NotebookPen,
  PenLine,
  Presentation,
  SearchCheck,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface COREPageProps {
  onNavigate: (hash: string) => void;
}

interface Course {
  id: string;
  number: string;
  title: string;
  summary: string;
  objectives: string[];
  themes: string[];
  outcomes: string[];
  accent: string;
  accentSoft: string;
}

interface GalleryItem {
  src: string;
  alt: string;
  label: string;
  caption: string;
  className: string;
}
const CORE_META = [
  ['Academic status', 'One-credit academic programme'],
  ['Framework', 'Flexible and Comprehensive Learning Framework'],
  ['Primary cohort', 'First and second year undergraduate students'],
  ['Course offerings', 'Updated according to each academic year'],
];
const COURSE_OUTCOMES = [
  {
    title: 'Develop critical thinking',
    description:
      'Move beyond recall by examining assumptions, comparing perspectives, and forming reasoned conclusions.',
  },
  {
    title: 'Learn research fundamentals',
    description:
      'Understand questions, evidence, sources, methods, interpretation, and responsible academic practice.',
  },
  {
    title: 'Experience evidence-based learning',
    description:
      'Use observation, literature, data, and discussion to support academic claims.',
  },
  {
    title: 'Improve academic writing',
    description:
      'Organise ideas clearly, use evidence appropriately, and communicate with academic discipline.',
  },
  {
    title: 'Think across disciplines',
    description:
      'Recognise how complex problems require perspectives from more than one field.',
  },
  {
    title: 'Build confidence for further research',
    description:
      'Gain a structured foundation before entering advanced research pathways and project programmes.',
  },
];
interface AcademicYearOffering {
  academicYear: string;
  label: string;
  description?: string;
  courses: {
    title: string;
    summary: string;
  }[];
}

const COURSE_OFFERINGS: AcademicYearOffering[] = [
  {
    academicYear: '2024–2025',
    label: 'Previous academic year',
    description:
      'CORE was delivered through the following course offerings during the 2024–2025 academic year.',
    courses: [
      {
        title: 'Transdisciplinary Education',
        summary:
          'Introduced students to complex questions through multiple disciplinary perspectives, structured inquiry, evidence, and academic discussion.',
      },
      {
        title: 'Sustainability Practices',
        summary:
          'Explored sustainability through classroom learning, case analysis, observation, reflection, and evidence-based assignments.',
      },
    ],
  },
];

const LEARNING_EXPERIENCE = [
  {
    title: 'Faculty-led sessions',
    description: 'Concepts, methods, and academic expectations introduced through guided teaching.',
    icon: GraduationCap,
  },
  {
    title: 'Case studies',
    description: 'Real situations examined through evidence, context, and competing interpretations.',
    icon: LibraryBig,
  },
  {
    title: 'Structured discussions',
    description: 'Ideas tested through questioning, listening, debate, and reasoned response.',
    icon: MessageSquareText,
  },
  {
    title: 'Reflection',
    description: 'Students connect course ideas with their assumptions, experiences, and learning.',
    icon: NotebookPen,
  },
  {
    title: 'Field observations',
    description: 'Classroom concepts are connected to places, communities, systems, and practices.',
    icon: MapPinned,
  },
  {
    title: 'Evidence-based assignments',
    description: 'Claims are developed through credible sources, observations, and organised reasoning.',
    icon: SearchCheck,
  },
  {
    title: 'Collaborative learning',
    description: 'Students learn to work across perspectives and contribute responsibly to a group.',
    icon: Users,
  },
  {
    title: 'Academic writing',
    description: 'Ideas are communicated through clear structure, appropriate evidence, and reflection.',
    icon: PenLine,
  },
];

const ASSESSMENT = [
  {
    method: 'Assignments',
    purpose: 'Apply concepts, interpret evidence, and communicate understanding in a structured format.',
  },
  {
    method: 'Presentations',
    purpose: 'Explain ideas clearly, respond to questions, and demonstrate academic communication.',
  },
  {
    method: 'Reflection journals',
    purpose: 'Record changes in understanding, assumptions, observations, and learning decisions.',
  },
  {
    method: 'Case analysis',
    purpose: 'Evaluate context, stakeholders, evidence, alternatives, and consequences.',
  },
  {
    method: 'Course participation',
    purpose: 'Contribute thoughtfully to discussions, peer learning, and collaborative activities.',
  },
  {
    method: 'Mini investigations',
    purpose: 'Frame a focused question and explore it through an appropriate introductory method.',
  },
];

const STUDENT_OUTCOMES = [
  'Understand the foundations of research methodology.',
  'Develop analytical and evidence-based thinking.',
  'Communicate ideas clearly in written and spoken academic formats.',
  'Work across disciplines and recognise multiple perspectives.',
  'Approach future projects with stronger questions and better judgement.',
  'Prepare for KREST, KRIP, UROP, Project Intake, and other Ré pathways.',
];

const ACADEMIC_INFORMATION = [
  ['Credits', 'One academic credit'],
  ['Eligibility', 'Primarily first and second year undergraduate students'],
  ['Duration', 'Defined by the academic course schedule'],
  ['Mode', 'Faculty-led coursework with classroom and activity-based learning'],
  ['Academic framework', 'Flexible and Comprehensive Learning Framework (FCLF)'],
  ['Offered by', 'Kumaraguru through the Ré research ecosystem'],
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/images/core/core-classroom.jpg',
    alt: 'Students participating in a CORE classroom session',
    label: 'Classroom',
    caption: 'Faculty-led discussion and inquiry inside the classroom.',
    className: 'md:col-span-7 md:row-span-2 min-h-[420px] md:min-h-[620px]',
  },
  {
    src: '/images/core/core-presentation.jpg',
    alt: 'Student presenting work during a CORE course',
    label: 'Presentation',
    caption: 'Students make their reasoning visible through academic presentation.',
    className: 'md:col-span-5 min-h-[300px]',
  },
  {
    src: '/images/core/core-field-visit.jpg',
    alt: 'Students making field observations',
    label: 'Field observation',
    caption: 'Course concepts are examined in real contexts.',
    className: 'md:col-span-5 min-h-[300px]',
  },
  {
    src: '/images/core/core-collaboration.jpg',
    alt: 'Students working together during a CORE activity',
    label: 'Collaborative learning',
    caption: 'Different perspectives are brought into the same conversation.',
    className: 'md:col-span-4 min-h-[330px]',
  },
  {
    src: '/images/core/core-faculty.jpg',
    alt: 'Faculty member guiding a CORE session',
    label: 'Faculty session',
    caption: 'Academic guidance supports structured inquiry and reflection.',
    className: 'md:col-span-4 min-h-[330px]',
  },
  {
    src: '/images/core/core-showcase.jpg',
    alt: 'Student work displayed during a CORE showcase',
    label: 'Course showcase',
    caption: 'Assignments and investigations are shared with peers and faculty.',
    className: 'md:col-span-4 min-h-[330px]',
  },
];

const FAQS = [
  {
    question: 'Who can enrol in CORE?',
    answer:
      'CORE is intended primarily for first and second year undergraduate students. Final eligibility and registration conditions should follow the academic instructions issued for the relevant semester.',
  },
  {
    question: 'Is prior research experience required?',
    answer:
      'No. CORE is designed as an academic introduction to research-oriented learning. Students are not expected to arrive with prior research experience.',
  },
  {
    question: 'Will I receive academic credit?',
    answer:
      'Yes. CORE is a one-credit academic course offered under Kumaraguru’s Flexible and Comprehensive Learning Framework.',
  },
  {
    question: 'How is the course evaluated?',
    answer:
      'Evaluation may include assignments, presentations, reflection journals, case analysis, participation, and mini investigations. The final scheme can be updated to match the approved course plan.',
  },
  {
    question: 'Is CORE an internship, fellowship, or research project?',
    answer:
      'No. CORE is a formal academic course. It introduces research through structured coursework rather than placing students directly into an internship, fellowship, or independent project.',
  },
  {
    question: 'What can I pursue after CORE?',
    answer:
      'CORE builds the academic foundation for later participation in pathways such as KREST, KRIP, UROP, Project Intake, and other research opportunities within the Ré ecosystem.',
  },
];

function FadeIn({
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

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 border-t border-[#1E2823]/15 pt-6 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A3F2A]">
          {eyebrow}
        </p>
      </div>
      <div className="lg:col-span-9">
        <h2 className="max-w-5xl font-serif text-[clamp(2.5rem,5vw,5.6rem)] leading-[0.98] tracking-[-0.045em] text-[#18211D]">
          {title}
        </h2>
        {description && (
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#4F5A54] sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function GalleryImage({ item }: { item: GalleryItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`group relative overflow-hidden border border-[#1E2823]/12 bg-[#D7D8D1] ${item.className}`}
    >
      {!failed && (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
      )}

      {failed && (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#D9DDD7,#BFC8C1)] px-8 text-center">
          <div>
            <Presentation className="mx-auto h-8 w-8 text-[#59665F]" />
            <p className="mt-4 text-sm font-semibold text-[#354139]">
              Add image: {item.src}
            </p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
          {item.label}
        </p>
        <p className="mt-2 max-w-md font-serif text-2xl leading-tight">
          {item.caption}
        </p>
      </figcaption>
    </figure>
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
    <div className="border-t border-[#1E2823]/15">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-8 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A3F2A] focus-visible:ring-offset-4"
      >
        <span className="font-serif text-xl leading-snug text-[#18211D] sm:text-2xl">
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

export default function COREPage({ onNavigate }: COREPageProps) {
  const reduceMotion = useReducedMotion();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const scrollToCurriculum = () => {
    document
      .getElementById('core-curriculum')
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#F4F1E9] text-[#18211D]">
      {/* Hero */}
      <section className="border-b border-[#1E2823]/15">
        <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-8 sm:px-8 lg:px-20 lg:pb-24">
          <button
            type="button"
            onClick={() => onNavigate('#/programs')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#5A655F] transition-colors hover:text-[#18211D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A3F2A] focus-visible:ring-offset-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Research pathways
          </button>

          <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-end">
            <FadeIn className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8A3F2A]">
                CORE · Course-Oriented Research Experience
              </p>

              <h1 className="mt-7 max-w-6xl font-serif text-[clamp(4rem,8.5vw,9rem)] leading-[0.86] tracking-[-0.06em]">
                Research begins
                <span className="block italic text-[#66736C]">in the classroom.</span>
              </h1>

              <p className="mt-9 max-w-3xl text-lg leading-8 text-[#4F5A54] sm:text-xl sm:leading-9">
  CORE is a one-credit academic programme that introduces students to
  inquiry, critical thinking, evidence-based learning, and introductory
  research methods through structured course offerings under
  Kumaraguru&apos;s Flexible and Comprehensive Learning Framework.
</p>

              <button
                type="button"
                onClick={scrollToCurriculum}
                className="group mt-9 inline-flex items-center gap-3 border-b border-[#18211D] pb-2 text-sm font-bold"
              >
                View the curriculum
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </FadeIn>

            <FadeIn delay={0.12} className="lg:col-span-4">
<dl className="border-t border-[#1E2823]/20">
  {CORE_META.map(([term, detail]) => (
    <div
      key={term}
      className="grid grid-cols-[120px_1fr] gap-5 border-b border-[#1E2823]/20 py-5"
    >
      <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6B756F]">
        {term}
      </dt>

      <dd className="text-sm font-semibold leading-6">
        {detail}
      </dd>
    </div>
  ))}
</dl>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What is CORE */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
        <FadeIn>
          <SectionHeading
            eyebrow="What is CORE?"
            title="An academic foundation for learning how research works."
            description="CORE places research habits inside formal learning, where students can develop them gradually, with faculty guidance and academic structure."
          />
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 border-y border-[#1E2823]/15 lg:grid-cols-3">
          {[
            {
              number: '01',
              title: 'Why it exists',
              text: 'Students are often introduced to research only after they are expected to perform it. CORE builds the foundation earlier.',
            },
            {
              number: '02',
              title: 'Why research belongs in classrooms',
              text: 'Questioning, evidence, analysis, and communication are not separate from learning. They are how deep learning happens.',
            },
            {
              number: '03',
              title: 'How CORE bridges both',
              text: 'The course connects academic content with introductory research methods through assignments, discussion, observation, and reflection.',
            },
          ].map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.07}
              className="border-b border-[#1E2823]/15 py-9 last:border-b-0 lg:border-b-0 lg:border-r lg:px-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A3F2A]">
                {item.number}
              </p>
              <h3 className="mt-7 font-serif text-3xl leading-tight">{item.title}</h3>
              <p className="mt-5 max-w-md text-base leading-8 text-[#55615A]">
                {item.text}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Why students choose CORE */}
      <section className="border-y border-[#1E2823]/15 bg-[#ECE8DE]">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
          <FadeIn>
            <SectionHeading
              eyebrow="Why students choose CORE"
              title="The value is not another programme. It is a stronger way of learning."
            />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16">
            {COURSE_OUTCOMES.map((outcome, index) => (
              <FadeIn
                key={outcome.title}
                delay={(index % 2) * 0.06}
                className="grid grid-cols-[56px_1fr] gap-5 border-t border-[#1E2823]/15 py-7"
              >
                <span className="font-mono text-xs text-[#8A3F2A]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-2xl">{outcome.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#58635D]">
                    {outcome.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Course structure */}
      {/* Academic delivery */}
<section
  id="core-learning-model"
  className="mx-auto max-w-[1500px] scroll-mt-24 px-6 py-24 sm:px-8 sm:py-32 lg:px-20"
>
  <FadeIn>
    <SectionHeading
      eyebrow="Academic delivery"
      title="CORE introduces research through structured academic learning."
      description="The specific courses offered under CORE may change between academic years. The academic purpose remains consistent: helping students develop inquiry, evidence-based thinking, reflection, and introductory research capabilities."
    />
  </FadeIn>

  <div className="mt-16 border-y border-[#1E2823]/15">
    {[
      {
        number: '01',
        title: 'Academic coursework',
        description:
          'Students enrol in an approved credit-bearing course offered under CORE for the relevant academic year.',
      },
      {
        number: '02',
        title: 'Guided inquiry',
        description:
          'Faculty introduce students to questioning, evidence, interpretation, academic reading, and structured investigation.',
      },
      {
        number: '03',
        title: 'Applied learning',
        description:
          'Students engage through assignments, discussions, case studies, observations, writing, and collaborative activities.',
      },
      {
        number: '04',
        title: 'Academic evaluation',
        description:
          'Learning is evaluated through course-appropriate assessments defined for each academic offering.',
      },
    ].map((item, index) => (
      <FadeIn
        key={item.number}
        delay={index * 0.04}
        className="grid grid-cols-[52px_1fr] gap-5 border-b border-[#1E2823]/15 py-8 last:border-b-0 sm:grid-cols-[80px_280px_1fr] sm:gap-8"
      >
        <span className="font-mono text-xs text-[#8A3F2A]">
          {item.number}
        </span>

        <h3 className="font-serif text-2xl leading-tight sm:text-3xl">
          {item.title}
        </h3>

        <p className="col-start-2 max-w-2xl text-sm leading-7 text-[#58635D] sm:col-start-auto">
          {item.description}
        </p>
      </FadeIn>
    ))}
  </div>
</section>
      {/* Learning experience */}
      <section className="border-y border-[#1E2823]/15 bg-[#1E2823] text-white">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
          <FadeIn>
            <div className="grid grid-cols-1 gap-8 border-t border-white/20 pt-6 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D6A48C]">
                  Learning experience
                </p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="max-w-5xl font-serif text-[clamp(2.7rem,5vw,5.7rem)] leading-[0.98] tracking-[-0.045em]">
                  Learning happens through participation, not passive exposure.
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 sm:text-lg">
                  CORE combines teaching, discussion, observation, writing, and guided
                  investigation as one coherent academic experience.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16">
            {LEARNING_EXPERIENCE.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn
                  key={item.title}
                  delay={(index % 2) * 0.05}
                  className="grid grid-cols-[48px_1fr] gap-5 border-t border-white/18 py-7"
                >
                  <Icon className="h-5 w-5 text-[#D6A48C]" />
                  <div>
                    <h3 className="font-serif text-2xl">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/58">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Assessment"
            title="Evaluation follows the work of the course."
            description="The structure below is intentionally modular so that approved weightages and assessment components can be updated without redesigning the section."
          />
        </FadeIn>

        <div className="mt-16 border-t border-[#1E2823]/15">
          {ASSESSMENT.map((item, index) => (
            <FadeIn
              key={item.method}
              className="grid grid-cols-[48px_1fr] gap-5 border-b border-[#1E2823]/15 py-6 sm:grid-cols-[72px_220px_1fr] sm:gap-7"
            >
              <span className="font-mono text-xs text-[#8A3F2A]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl">{item.method}</h3>
              <p className="col-start-2 text-sm leading-7 text-[#58635D] sm:col-start-auto">
                {item.purpose}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Student outcomes */}
      <section className="border-y border-[#1E2823]/15 bg-[#E8E2D6]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:px-20">
          <FadeIn className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A3F2A]">
              Student outcomes
            </p>
            <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.98] tracking-[-0.045em]">
              CORE prepares students to enter research with stronger academic judgement.
            </h2>
          </FadeIn>

          <div className="lg:col-span-7">
            <div className="border-t border-[#1E2823]/15">
              {STUDENT_OUTCOMES.map((outcome, index) => (
                <FadeIn
                  key={outcome}
                  className="grid grid-cols-[42px_1fr] gap-5 border-b border-[#1E2823]/15 py-5"
                >
                  <span className="font-mono text-xs text-[#8A3F2A]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base font-semibold leading-7">{outcome}</p>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="mt-10 border-l-2 border-[#8A3F2A] pl-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A3F2A]">
                Progression within Ré
              </p>
              <p className="mt-3 max-w-2xl font-serif text-2xl leading-snug">
                CORE → KREST → KRIP → UROP → Project Intake
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#59645E]">
                CORE is the academic starting point. Later pathways allow students to
                deepen their research exposure through increasingly focused experiences.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Academic information */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Academic information"
            title="Course information, presented clearly."
          />
        </FadeIn>

        <dl className="mt-16 border-t border-[#1E2823]/15">
          {ACADEMIC_INFORMATION.map(([term, detail]) => (
            <FadeIn
              key={term}
              className="grid grid-cols-1 gap-2 border-b border-[#1E2823]/15 py-6 sm:grid-cols-[240px_1fr] sm:gap-10"
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B756F]">
                {term}
              </dt>
              <dd className="max-w-3xl text-base font-semibold leading-7">{detail}</dd>
            </FadeIn>
          ))}
        </dl>
      </section>

      {/* Course offerings by academic year */}
<section className="border-y border-[#1E2823]/15 bg-[#ECE8DE]">
  <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
    <FadeIn>
      <SectionHeading
        eyebrow="Course offerings"
        title="Courses offered under CORE may vary by academic year."
        description="The courses listed below represent confirmed offerings for the specified academic period. Future offerings will be updated as they are introduced."
      />
    </FadeIn>

    <div className="mt-16 space-y-16">
      {COURSE_OFFERINGS.map((offering) => (
        <article
          key={offering.academicYear}
          className="grid grid-cols-1 gap-10 border-t border-[#1E2823]/15 pt-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A3F2A]">
              {offering.label}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {offering.academicYear}
            </h3>

            {offering.description && (
              <p className="mt-4 max-w-xs text-sm leading-7 text-[#59645E]">
                {offering.description}
              </p>
            )}
          </div>

          <div className="lg:col-span-9">
            {offering.courses.map((course, index) => (
              <FadeIn
                key={`${offering.academicYear}-${course.title}`}
                delay={index * 0.05}
                className="grid grid-cols-[42px_1fr] gap-5 border-t border-[#1E2823]/15 py-7 first:border-t-0 first:pt-0 sm:grid-cols-[60px_260px_1fr]"
              >
                <span className="font-mono text-xs text-[#8A3F2A]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h4 className="font-serif text-2xl leading-tight">
                  {course.title}
                </h4>

                <p className="col-start-2 max-w-2xl text-sm leading-7 text-[#58635D] sm:col-start-auto">
                  {course.summary}
                </p>
              </FadeIn>
            ))}
          </div>
        </article>
      ))}
    </div>

    <p className="mt-14 border-l-2 border-[#8A3F2A] pl-5 text-sm leading-7 text-[#59645E]">
      Course titles, content, eligibility, and delivery may be revised
      for future academic years based on the approved academic plan.
    </p>
  </div>
</section>

      {/* Gallery */}
      <section className="border-y border-[#1E2823]/15 bg-[#DED9CE] py-24 sm:py-32">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-20">
          <FadeIn>
            <SectionHeading
              eyebrow="Inside CORE"
              title="A course shaped by discussion, observation, and academic exchange."
              description="Use this section to document past batches, classroom activities, presentations, field visits, student interactions, faculty sessions, and course showcases."
            />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12">
            {GALLERY_ITEMS.map((item, index) => (
              <FadeIn key={item.src} delay={(index % 3) * 0.04} className={item.className}>
                <GalleryImage item={{ ...item, className: 'h-full min-h-[inherit]' }} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:px-20">
        <FadeIn className="lg:col-span-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A3F2A]">
            Frequently asked questions
          </p>
          <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.98] tracking-[-0.045em]">
            Before you begin.
          </h2>
        </FadeIn>

        <div className="border-b border-[#1E2823]/15 lg:col-span-8">
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

      {/* Final CTA */}
      <section className="bg-[#8A3F2A] text-white">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-20">
          <FadeIn className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/65">
                CORE · Academic foundation
              </p>
              <h2 className="mt-6 max-w-5xl font-serif text-[clamp(3.2rem,6vw,7rem)] leading-[0.9] tracking-[-0.05em]">
                Explore research through learning.
              </h2>
            </div>

            <div className="lg:col-span-4">
              <p className="max-w-md text-base leading-8 text-white/72">
                Begin with a formal course that helps you ask better questions, use
                evidence carefully, and understand how research develops.
              </p>

              <button
                type="button"
                onClick={() => onNavigate('#/connect')}
                className="group mt-8 inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#8A3F2A]"
              >
                Begin your research journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}