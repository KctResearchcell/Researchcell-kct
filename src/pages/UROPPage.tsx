import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  MessageCircleMore,
  Microscope,
  Network,
  Quote,
  Search,
  Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface ResearchArea {
  id: string;
  name: string;
  description: string;
  image?: string;
  href?: string;
}

interface UROPPageProps {
  onNavigate: (hash: string) => void;
  researchAreas?: ResearchArea[];
}

const JOURNEY = [
  {
    word: 'Curiosity',
    statement: 'Notice the question that keeps returning.',
    copy: 'UROP begins with attention: to an observation, contradiction, gap, or possibility that deserves deeper thought.',
  },
  {
    word: 'Exploration',
    statement: 'Learn what is already known.',
    copy: 'Students enter an existing body of knowledge, read closely, and understand how a question has been approached before.',
  },
  {
    word: 'Investigation',
    statement: 'Turn interest into disciplined inquiry.',
    copy: 'Questions become sharper through discussion, evidence, methods, and the guidance of a faculty mentor.',
  },
  {
    word: 'Experimentation',
    statement: 'Test ideas against reality.',
    copy: 'Depending on the research, students may observe, model, build, compare, analyse, or experiment.',
  },
  {
    word: 'Analysis',
    statement: 'Let evidence challenge assumption.',
    copy: 'Research develops when findings are interpreted carefully rather than forced to fit the answer we expected.',
  },
  {
    word: 'Reflection',
    statement: 'Understand what the work means.',
    copy: 'Students learn to discuss limitations, rethink decisions, and identify the next question created by the research.',
  },
  {
    word: 'Contribution',
    statement: 'Add something meaningful to the conversation.',
    copy: 'A contribution may be an insight, method, prototype, analysis, scholarly output, or direction for continued work.',
  },
] as const;

const LEARNING = [
  ['01', 'Think critically', 'Examine assumptions, compare explanations, and build arguments that can withstand scrutiny.'],
  ['02', 'Read research', 'Navigate scholarly literature, identify gaps, and connect new questions with existing knowledge.'],
  ['03', 'Work with evidence', 'Collect, interpret, and communicate evidence with care rather than relying on intuition alone.'],
  ['04', 'Investigate ethically', 'Recognise that rigorous research also requires responsibility, transparency, and respect.'],
  ['05', 'Collaborate intellectually', 'Discuss ideas, receive critique, document decisions, and improve work through shared thinking.'],
  ['06', 'Communicate clearly', 'Translate complex reasoning into writing, presentations, visuals, and productive research conversations.'],
] as const;

const OUTCOMES = [
  'Scholarly publications',
  'Conference presentations',
  'Prototypes',
  'Innovations',
  'Continued research',
  'Interdisciplinary collaboration',
  'Societal impact',
] as const;

const FAQS = [
  {
    question: 'What exactly is UROP?',
    answer:
      'UROP is a faculty-guided undergraduate research programme. Students participate in meaningful research problems, learn how investigations are conducted, and contribute within an active research environment.',
  },
  {
    question: 'Do I need prior research experience?',
    answer:
      'No universal requirement is stated on this page. UROP is designed around guided undergraduate research, while the preparation expected for a specific opportunity should be published with that opportunity.',
  },
  {
    question: 'What kind of work might I do?',
    answer:
      'The work depends on the research question. It may include literature exploration, discussion, observation, experimentation, analysis, documentation, review, and scholarly communication.',
  },
  {
    question: 'How does faculty mentorship work?',
    answer:
      'Faculty mentors help students frame questions, engage with literature, select appropriate approaches, interpret evidence, review progress, and grow through constructive academic dialogue.',
  },
  {
    question: 'Can UROP lead to a publication or innovation?',
    answer:
      'Research may contribute toward publications, presentations, prototypes, innovations, continued investigation, or wider impact. These are possibilities rather than guaranteed outcomes and depend on the nature and progress of the work.',
  },
  {
    question: 'Where will duration, eligibility, and application details appear?',
    answer:
      'Those administrative details have not been defined in the information available for this page. Confirmed requirements and timelines should be added alongside each announced opportunity.',
  },
] as const;

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
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function EditorialImage({
  src,
  alt,
  label,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(145deg,#14251d_0%,#244d3b_48%,#8d7256_100%)] ${className}`}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-black/18" />
      {failed && (
        <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:24px_24px]" />
      )}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
        <p className="max-w-md text-xs font-medium leading-5 text-white/82">{label}</p>
        {failed && (
          <span className="shrink-0 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] backdrop-blur">
            Image placeholder
          </span>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#34785b]">
      {children}
    </p>
  );
}

export default function UROPPage({ onNavigate, researchAreas = [] }: UROPPageProps) {
  const reduceMotion = useReducedMotion();
  const [activeJourney, setActiveJourney] = useState(0);
  const journey = JOURNEY[activeJourney];

  const areas = useMemo(() => researchAreas.filter((area) => area.name.trim()), [researchAreas]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <main className="overflow-hidden bg-[#F6F5F0] text-[#151814] selection:bg-[#2E6B50]/20">
      <section className="relative min-h-[760px] overflow-hidden bg-[#0D1712] text-white lg:min-h-[850px]">
        <EditorialImage
          src="/images/urop/urop-hero.jpg"
          alt="Undergraduate researcher discussing an investigation with a faculty mentor"
          label="Replace with an authentic UROP photograph showing a student and faculty mentor thinking together."
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,16,12,0.92)_0%,rgba(9,16,12,0.72)_42%,rgba(9,16,12,0.2)_76%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto flex min-h-[760px] max-w-[1440px] flex-col justify-between px-6 pb-12 pt-8 lg:min-h-[850px] lg:px-20 lg:pb-16">
          <button
            onClick={() => onNavigate('#/programs')}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/16 bg-black/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/72 backdrop-blur transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Research pathways
          </button>

          <div className="max-w-4xl pb-[8vh]">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55 }}
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-200"
            >
              Undergraduate Research Opportunities Programme
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.72, delay: 0.05 }}
              className="mt-6 max-w-4xl font-display text-[52px] font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[94px]"
            >
              Curiosity becomes research
              <span className="block font-serif font-normal italic text-white/62">
                when someone helps you stay with the question.
              </span>
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.14 }}
              className="mt-8 max-w-2xl text-base leading-8 text-white/68 sm:text-lg"
            >
              UROP brings undergraduate students into active research alongside faculty mentors—so they can learn how knowledge is questioned, investigated, tested, discussed, and advanced.
            </motion.p>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.2 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo('research-areas')}
                className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-white px-7 text-sm font-semibold text-[#102017] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1712]"
              >
                Discover research opportunities
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('what-is-urop')}
                className="inline-flex h-[52px] items-center rounded-full border border-white/22 bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Understand UROP
              </button>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/14 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/48">
            <span>Faculty guided</span>
            <span>Inquiry driven</span>
            <span>Collaborative research</span>
            <span>Undergraduate participation</span>
          </div>
        </div>
      </section>

      <section id="what-is-urop" className="scroll-mt-20 px-6 py-24 sm:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <SectionLabel>What UROP is</SectionLabel>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#6D716B]">
                Not a classroom simulation of research. Not a project completed in isolation. UROP is participation in the culture and practice of inquiry.
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="max-w-5xl font-display text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-[#171B17] sm:text-6xl lg:text-[76px]">
                Students do not stand outside research and study it.
                <span className="block text-[#6B756E]">They enter it.</span>
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 md:grid-cols-2">
                <p className="text-base leading-8 text-[#4F554F]">
                  UROP enables undergraduates to work alongside faculty mentors on meaningful research problems. Students learn how questions are framed, how evidence is handled, and how ideas develop through disciplined investigation.
                </p>
                <p className="text-base leading-8 text-[#4F554F]">
                  The programme exists because research capability grows through participation: reading, discussing, testing, documenting, receiving critique, reflecting, and contributing to work larger than a single assignment.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-black/8 bg-[#E9ECE4] px-6 py-24 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-16 max-w-3xl">
            <SectionLabel>Why participate</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Research changes what you notice—and what you are capable of doing with it.
            </h2>
          </Reveal>

          <div className="space-y-5">
            {[
              {
                number: '01',
                title: 'Move beyond receiving knowledge.',
                copy: 'Engage with questions whose answers are not already waiting at the end of a chapter.',
                icon: BookOpenText,
              },
              {
                number: '02',
                title: 'Learn beside experienced researchers.',
                copy: 'See how faculty mentors make decisions, challenge assumptions, interpret uncertainty, and improve an investigation over time.',
                icon: GraduationCap,
              },
              {
                number: '03',
                title: 'Build confidence through contribution.',
                copy: 'Develop the language, judgement, discipline, and persistence required to participate meaningfully in research.',
                icon: Sparkles,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={index * 0.06}>
                  <motion.article
                    whileHover={reduceMotion ? undefined : { x: 8 }}
                    className="group grid grid-cols-1 gap-6 border-t border-black/12 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-center lg:py-10"
                  >
                    <span className="font-mono text-xs text-[#798078]">{item.number}</span>
                    <div>
                      <h3 className="font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#626861]">{item.copy}</p>
                    </div>
                    <div className="grid h-14 w-14 place-items-center rounded-full border border-black/10 bg-white/50 text-[#2F6F53] transition group-hover:bg-[#153527] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="research-journey" className="bg-[#111A15] px-6 py-24 text-white lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>The changing shape of a question</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Research is not a straight line.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-white/52">
                Move across the words to see how an undergraduate question develops through attention, evidence, dialogue, and reflection.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-[34px] border border-white/12 bg-white/[0.035] p-5 sm:p-8 lg:p-10">
                <div className="flex flex-wrap gap-2" aria-label="Research journey themes">
                  {JOURNEY.map((item, index) => {
                    const active = activeJourney === index;
                    return (
                      <button
                        key={item.word}
                        onMouseEnter={() => setActiveJourney(index)}
                        onFocus={() => setActiveJourney(index)}
                        onClick={() => setActiveJourney(index)}
                        aria-pressed={active}
                        className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 ${
                          active
                            ? 'border-emerald-200 bg-emerald-200 text-[#122117]'
                            : 'border-white/13 text-white/56 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {item.word}
                      </button>
                    );
                  })}
                </div>

                <motion.div
                  key={journey.word}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.32 }}
                  className="mt-16 min-h-[270px] border-t border-white/10 pt-10"
                  aria-live="polite"
                >
                  <span className="font-mono text-xs text-emerald-200/72">
                    {String(activeJourney + 1).padStart(2, '0')} / {String(JOURNEY.length).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
                    {journey.statement}
                  </h3>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-white/58">{journey.copy}</p>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <EditorialImage
                src="/images/urop/faculty-mentorship.jpg"
                alt="Faculty mentor and undergraduate researcher reviewing evidence together"
                label="Replace with an authentic image of faculty mentorship: discussion, review, or shared analysis."
                className="aspect-[4/5] rounded-[34px] sm:aspect-[16/11]"
              />
            </div>
            <div className="lg:col-span-5 lg:pl-8">
              <SectionLabel>Faculty mentorship</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">
                Guidance without taking the question away from the student.
              </h2>
              <p className="mt-7 text-base leading-8 text-[#5D635C]">
                The mentor–student relationship is the centre of UROP. Faculty mentors do more than assign work: they model how researchers think, question, review, and respond when the evidence is incomplete.
              </p>

              <div className="mt-10 space-y-0 border-t border-black/10">
                {[
                  'Frame a researchable question',
                  'Navigate relevant literature',
                  'Choose appropriate ways to investigate',
                  'Interpret evidence critically',
                  'Review decisions and limitations',
                  'Grow through academic dialogue',
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-6 border-b border-black/10 py-4"
                  >
                    <span className="text-sm font-medium text-[#313731]">{item}</span>
                    <span className="font-mono text-[10px] text-[#8A9089]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] bg-[#183C2B] p-8 text-white lg:col-span-2 sm:p-10">
              <Quote className="h-7 w-7 text-emerald-200" />
              <p className="mt-10 max-w-3xl font-serif text-3xl italic leading-tight text-white/92 sm:text-5xl">
                “A strong mentor does not remove uncertainty. They help a student learn how to work intelligently within it.”
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-[28px] border border-black/10 bg-white p-8 sm:p-10">
              <MessageCircleMore className="h-7 w-7 text-[#367659]" />
              <p className="mt-20 text-sm leading-7 text-[#656B64]">
                Mentorship becomes tangible through questions, critique, review, discussion, and the repeated practice of explaining why a research decision makes sense.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="research-areas" className="scroll-mt-20 border-y border-black/8 bg-white px-6 py-24 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <SectionLabel>Research areas</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-6xl">
                Begin with the question. Find the Research Circle where it can grow.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#686E67]">
              This section is designed to expand as verified Research Circles and faculty-guided opportunities are published.
            </p>
          </Reveal>

          {areas.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {areas.map((area, index) => (
                <Reveal key={area.id} delay={index * 0.05}>
                  <motion.article
                    whileHover={reduceMotion ? undefined : { y: -6 }}
                    className="group relative min-h-[360px] overflow-hidden rounded-[30px] border border-black/10 bg-[#EEF1EA]"
                  >
                    {area.image && (
                      <img
                        src={area.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-45"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142019] via-[#142019]/48 to-transparent" />
                    <div className="relative flex min-h-[360px] flex-col justify-between p-7 text-white">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-white/44">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <Microscope className="h-5 w-5 text-emerald-200" />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl font-semibold tracking-[-0.03em]">{area.name}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/64">{area.description}</p>
                        {area.href && (
                          <button
                            onClick={() => onNavigate(area.href!)}
                            className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                          >
                            Explore area <ChevronRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-14">
              <div className="relative overflow-hidden rounded-[34px] bg-[#13251B] px-7 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
                <div className="absolute right-[-8%] top-[-55%] h-[460px] w-[460px] rounded-full border border-emerald-200/12" />
                <div className="absolute right-[6%] top-[-24%] h-[300px] w-[300px] rounded-full border border-emerald-200/12" />
                <div className="relative max-w-3xl">
                  <Network className="h-8 w-8 text-emerald-200" />
                  <h3 className="mt-8 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                    Verified research opportunities will live here.
                  </h3>
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-white/58">
                    Add official Research Circle names, faculty-led investigations, and opportunity descriptions through the optional <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-emerald-100">researchAreas</code> prop. Until then, the page avoids presenting invented domains.
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="px-6 py-24 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>What you learn</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Not just research skills. Research judgement.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#6B716A]">
                UROP develops the habits that help students work responsibly with complex questions, evidence, people, and uncertainty.
              </p>
            </div>

            <div className="lg:col-span-8">
              {LEARNING.map(([number, title, copy], index) => (
                <motion.article
                  key={title}
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, delay: index * 0.04 }}
                  className="grid grid-cols-[48px_1fr] gap-4 border-t border-black/10 py-6 sm:grid-cols-[72px_220px_1fr] sm:gap-6 sm:py-7"
                >
                  <span className="font-mono text-xs text-[#8C918B]">{number}</span>
                  <h3 className="text-base font-semibold text-[#202520]">{title}</h3>
                  <p className="col-start-2 text-sm leading-7 text-[#686E67] sm:col-start-auto">{copy}</p>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#DDE5DA] px-6 py-24 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="text-center">
            <SectionLabel>Where research may lead</SectionLabel>
            <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-6xl">
              A research question can travel in more than one direction.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#626960]">
              Outcomes depend on the nature, quality, and progress of the investigation. UROP creates the conditions for contribution; it does not promise a predetermined result.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-3 md:hidden">
              {OUTCOMES.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-full border border-black/10 bg-white/75 px-5 py-3 text-center text-xs font-semibold text-[#2D332D] shadow-sm"
                >
                  {outcome}
                </div>
              ))}
            </div>

            <div className="relative hidden min-h-[520px] md:block">
              <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-[#173829] text-center text-white shadow-[0_30px_80px_rgba(23,56,41,0.25)]">
                <div>
                  <Search className="mx-auto h-6 w-6 text-emerald-200" />
                  <span className="mt-3 block text-xs font-bold uppercase tracking-[0.18em]">The research</span>
                </div>
              </div>

              {OUTCOMES.map((outcome, index) => {
                const positions = [
                  'left-[2%] top-[8%]',
                  'right-[3%] top-[4%]',
                  'right-[0%] top-[42%]',
                  'right-[12%] bottom-[2%]',
                  'left-[34%] bottom-[0%]',
                  'left-[0%] bottom-[13%]',
                  'left-[3%] top-[42%]',
                ];
                return (
                  <motion.div
                    key={outcome}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.06 }}
                    className={`absolute ${positions[index]} max-w-[210px] rounded-full border border-black/10 bg-white/75 px-5 py-3 text-center text-xs font-semibold text-[#2D332D] shadow-sm backdrop-blur`}
                  >
                    {outcome}
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1180px]">
          <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <SectionLabel>Questions students ask</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Clarity before commitment.
              </h2>
            </div>
            <div>
              {FAQS.map((item, index) => (
                <article key={item.question} className="grid gap-4 border-t border-black/10 py-7 sm:grid-cols-[56px_0.8fr_1.2fr] sm:gap-6">
                  <span className="font-mono text-xs text-[#929790]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-base font-semibold leading-6 text-[#232823]">{item.question}</h3>
                  <p className="text-sm leading-7 text-[#686E67]">{item.answer}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-20 lg:pb-28">
        <Reveal className="mx-auto max-w-[1440px] overflow-hidden rounded-[38px] bg-[#102119] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <Lightbulb className="h-8 w-8 text-emerald-200" />
              <h2 className="mt-9 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Bring your curiosity.
                <span className="block text-white/48">Meet a question worth staying with.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/58">
                UROP is an invitation to learn alongside researchers, participate in meaningful inquiry, and discover how your thinking changes when evidence, mentorship, and collaboration enter the room.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('#/connect')}
                  className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-white px-7 text-sm font-semibold text-[#102119] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102119]"
                >
                  Start with a question
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onNavigate('#/programs')}
                  className="inline-flex h-[52px] items-center rounded-full border border-white/18 px-7 text-sm font-semibold text-white transition hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore all pathways
                </button>
              </div>
            </div>
            <EditorialImage
              src="/images/urop/urop-closing.jpg"
              alt="Undergraduate researchers sharing findings in a collaborative setting"
              label="Replace with an authentic UROP closing image: discussion, presentation, or collaborative research moment."
              className="min-h-[420px] lg:min-h-full"
            />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
