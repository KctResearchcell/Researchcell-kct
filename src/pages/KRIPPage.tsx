import React, { useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  MoveDownRight,
} from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

interface KRIPPageProps {
  onNavigate: (hash: string) => void;
}

type ImageAsset = {
  src: string;
  alt: string;
  placeholder: string;
  position?: string;
};

/*
 * Replace these paths with verified KRIP photographs.
 * The component renders a polished editorial placeholder when an asset is absent,
 * so the page remains presentation-ready during content production.
 */
const KRIP_IMAGES = {
  hero: {
    src: '/images/krip/hero-research-discussion.jpg',
    alt: 'KRIP participants in a focused research discussion with a faculty mentor',
    placeholder: 'Hero · mentor interaction / research discussion',
    position: 'center 45%',
  },
  introduction: {
    src: '/images/krip/understanding-the-problem.jpg',
    alt: 'Students examining notes and evidence while framing a research problem',
    placeholder: 'What is KRIP · problem-framing photograph',
    position: 'center',
  },
  context: {
    src: '/images/krip/observation-and-context.jpg',
    alt: 'A student observing and documenting context carefully',
    placeholder: 'Experience · observation and context',
    position: 'center',
  },
  literature: {
    src: '/images/krip/literature-review.jpg',
    alt: 'Students reading and discussing research literature together',
    placeholder: 'Experience · literature review',
    position: 'center',
  },
  mentor: {
    src: '/images/krip/mentor-conversation.jpg',
    alt: 'A mentor and students challenging assumptions during a research conversation',
    placeholder: 'Experience · mentor conversation',
    position: 'center',
  },
  synthesis: {
    src: '/images/krip/evidence-synthesis.jpg',
    alt: 'A collaborative whiteboard session used to analyse research evidence',
    placeholder: 'Experience · evidence synthesis',
    position: 'center',
  },
  presentation: {
    src: '/images/krip/research-presentation.jpg',
    alt: 'A student communicating research insights to peers and mentors',
    placeholder: 'Experience · research presentation',
    position: 'center',
  },
  learning: {
    src: '/images/krip/learning-beyond-classroom.jpg',
    alt: 'KRIP students collaborating and reflecting beyond a conventional classroom setting',
    placeholder: 'Learning beyond the classroom · collaborative photograph',
    position: 'center',
  },
  galleryOne: {
    src: '/images/krip/gallery-mentor-dialogue.jpg',
    alt: 'Mentor dialogue during KRIP',
    placeholder: 'Gallery · mentor dialogue',
  },
  galleryTwo: {
    src: '/images/krip/gallery-reading.jpg',
    alt: 'Literature review and annotation during KRIP',
    placeholder: 'Gallery · reading and annotation',
  },
  galleryThree: {
    src: '/images/krip/gallery-whiteboard.jpg',
    alt: 'Whiteboard thinking session during KRIP',
    placeholder: 'Gallery · whiteboard thinking',
  },
  galleryFour: {
    src: '/images/krip/gallery-observation.jpg',
    alt: 'Careful observation and documentation during KRIP',
    placeholder: 'Gallery · observation',
  },
  galleryFive: {
    src: '/images/krip/gallery-collaboration.jpg',
    alt: 'Student collaboration during KRIP',
    placeholder: 'Gallery · collaboration',
  },
  gallerySix: {
    src: '/images/krip/gallery-presentation.jpg',
    alt: 'Student research presentation during KRIP',
    placeholder: 'Gallery · presentation',
  },
  archiveOne: {
    src: '/images/krip/archive-edition-one.jpg',
    alt: 'Participants from a past edition of KRIP',
    placeholder: 'Archive · verified past-edition photograph',
  },
  archiveTwo: {
    src: '/images/krip/archive-edition-two.jpg',
    alt: 'Mentors and students from a past edition of KRIP',
    placeholder: 'Archive · verified mentor and student photograph',
  },
} satisfies Record<string, ImageAsset>;

const RESEARCH_MOVEMENTS = [
  {
    title: 'Understand context',
    copy: 'See the environment around a problem before isolating the problem itself.',
    image: KRIP_IMAGES.context,
  },
  {
    title: 'Ask meaningful questions',
    copy: 'Replace the pressure to answer quickly with the discipline to question precisely.',
  },
  {
    title: 'Read what is already known',
    copy: 'Enter an existing body of knowledge, identify gaps, and learn where evidence ends.',
    image: KRIP_IMAGES.literature,
  },
  {
    title: 'Challenge assumptions',
    copy: 'Treat every first impression as a proposition to examine—not a fact to defend.',
    image: KRIP_IMAGES.mentor,
  },
  {
    title: 'Investigate systematically',
    copy: 'Observe, discuss, experiment, document, and compare with purpose rather than habit.',
  },
  {
    title: 'Work with evidence',
    copy: 'Let patterns in the investigation shape the direction, even when they contradict expectation.',
    image: KRIP_IMAGES.synthesis,
  },
  {
    title: 'Reflect and communicate',
    copy: 'Make the reasoning visible so that others can question it, understand it, and build upon it.',
    image: KRIP_IMAGES.presentation,
  },
];

const LEARNING_LANGUAGE = [
  'Critical thinking',
  'Research ethics',
  'Observation',
  'Documentation',
  'Communication',
  'Collaboration',
  'Evidence-based reasoning',
  'Reflection',
  'Professional confidence',
];

const GALLERY = [
  {
    image: KRIP_IMAGES.galleryOne,
    caption: 'A question becomes clearer when it is examined from more than one perspective.',
    className: 'md:col-span-7 md:row-span-2 min-h-[520px]',
  },
  {
    image: KRIP_IMAGES.galleryTwo,
    caption: 'Reading is not preparation for research. It is part of the research.',
    className: 'md:col-span-5 min-h-[300px]',
  },
  {
    image: KRIP_IMAGES.galleryThree,
    caption: 'Ideas become useful when assumptions are made visible.',
    className: 'md:col-span-5 min-h-[300px]',
  },
  {
    image: KRIP_IMAGES.galleryFour,
    caption: 'Attention is a research skill: what is noticed determines what can be understood.',
    className: 'md:col-span-4 min-h-[380px]',
  },
  {
    image: KRIP_IMAGES.galleryFive,
    caption: 'Collaboration is not agreement. It is the ability to think rigorously together.',
    className: 'md:col-span-4 min-h-[380px]',
  },
  {
    image: KRIP_IMAGES.gallerySix,
    caption: 'Research is complete only when its reasoning can be communicated clearly.',
    className: 'md:col-span-4 min-h-[380px]',
  },
];

const PATHWAY = [
  'KRIP',
  'Research Circles',
  'KREST',
  'UROP',
  'Project Intake',
  'Publications',
  'Innovation',
  'Higher Studies',
  'Entrepreneurship',
];

const FAQS = [
  {
    question: 'Who can apply?',
    answer:
      'KRIP is designed for undergraduate students who want an early, rigorous experience of research beyond conventional coursework. Edition-specific eligibility is published with the official application call.',
  },
  {
    question: 'Is prior research experience required?',
    answer:
      'No prior research experience is expected. KRIP is an entry into the mindset and practice of research. Curiosity, openness to critique, and the willingness to work carefully matter more than arriving with a finished idea.',
  },
  {
    question: 'How long is KRIP?',
    answer:
      'KRIP is structured as an immersive four-week research experience. Exact dates and participation requirements are announced for each edition.',
  },
  {
    question: 'Will I receive mentorship?',
    answer:
      'Yes. The programme is faculty guided, with mentoring focused on how participants frame questions, examine evidence, reflect on their reasoning, and communicate their research.',
  },
  {
    question: 'What will I work on?',
    answer:
      'Participants work on a mentor-guided research problem or area of inquiry. The goal is not to force a product outcome, but to develop a defensible understanding of the problem and the evidence around it.',
  },
  {
    question: 'Will I receive a certificate?',
    answer:
      'Certificate availability, completion criteria, and attendance requirements are communicated in the official announcement for the relevant KRIP edition.',
  },
  {
    question: 'How are participants selected?',
    answer:
      'Selection follows the criteria published for each edition and may consider the quality of the application, intellectual curiosity, commitment, and fit with available research areas and mentorship capacity.',
  },
];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] ${
        light ? 'text-white/55' : 'text-[#706D66]'
      }`}
    >
      <span className={`h-px w-9 ${light ? 'bg-white/30' : 'bg-black/25'}`} />
      {children}
    </div>
  );
}

function EditorialImage({
  image,
  className = '',
  imageClassName = '',
  priority = false,
  overlay = true,
  children,
}: {
  image: ImageAsset;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  overlay?: boolean;
  children?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative isolate overflow-hidden bg-[#242825] ${className}`}>
      {!failed && image.src ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
          style={{ objectPosition: image.position ?? 'center' }}
          sizes={priority ? '100vw' : '(min-width: 1024px) 60vw, 100vw'}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(209,232,209,0.25),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(183,159,119,0.22),transparent_34%),linear-gradient(135deg,#26302b_0%,#121714_50%,#30302b_100%)]">
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6 text-white/65">
            <span className="max-w-[18rem] text-xs uppercase tracking-[0.18em]">
              {image.placeholder}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] sm:block">
              Replace with verified KRIP image
            </span>
          </div>
        </div>
      )}

      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />}
      {children}
    </div>
  );
}

function GalleryFigure({
  image,
  caption,
  className,
  index,
}: {
  image: ImageAsset;
  caption: string;
  className: string;
  index: number;
}) {
  return (
    <Reveal className={className} delay={Math.min(index * 0.05, 0.2)}>
      <figure className="group relative h-full min-h-[inherit] overflow-hidden bg-[#222821]">
        <EditorialImage
          image={image}
          className="h-full min-h-[inherit]"
          imageClassName="transition duration-1000 ease-out group-hover:scale-[1.035]"
          overlay={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-6 text-white opacity-85 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-8">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.22em] text-white/50">
            Through the lens of KRIP
          </span>
          <p className="max-w-xl font-serif text-xl leading-snug sm:text-2xl">{caption}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-t border-black/15 py-1 last:border-b">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47634F] focus-visible:ring-offset-4">
        <span className="text-lg font-medium tracking-[-0.02em] sm:text-xl">{question}</span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/15 transition duration-300 group-open:rotate-180 group-open:bg-[#162019] group-open:text-white">
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </span>
      </summary>
      <div className="max-w-3xl pb-7 pr-12 text-base leading-8 text-[#62655F]">{answer}</div>
    </details>
  );
}

export default function KRIPPage({ onNavigate }: KRIPPageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const heroCopyY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const scrollToExperience = () => {
    document.getElementById('krip-experience')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="overflow-x-clip bg-[#F1F0EA] text-[#151815] selection:bg-[#C8D9C8] selection:text-[#101510]">
      <section
        ref={heroRef}
        aria-labelledby="krip-title"
        className="relative isolate min-h-[100svh] overflow-hidden bg-[#101510] text-white"
      >
        <motion.div
          className="absolute -inset-x-4 -inset-y-10"
          style={reduceMotion ? undefined : { y: heroImageY, scale: heroImageScale }}
        >
          <EditorialImage
            image={KRIP_IMAGES.hero}
            priority
            className="h-full w-full"
            imageClassName="saturate-[0.78] contrast-[1.04]"
            overlay={false}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,13,9,0.84)_0%,rgba(8,13,9,0.56)_42%,rgba(8,13,9,0.12)_76%),linear-gradient(0deg,rgba(8,13,9,0.75)_0%,transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:100%_12.5%]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-6 pb-8 pt-6 sm:px-10 lg:px-16 lg:pb-12 lg:pt-9">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('#/programs')}
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
            >
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" aria-hidden="true" />
              Research pathways
            </button>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Ré · Research &amp; Exploration
            </span>
          </div>

          <motion.div
            className="my-auto max-w-[1040px] py-20"
            style={reduceMotion ? undefined : { y: heroCopyY, opacity: heroCopyOpacity }}
          >
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D8E6D7]">
              Kumaraguru Research Internship Programme
            </p>
            <h1
              id="krip-title"
              className="max-w-6xl font-serif text-[clamp(5rem,15vw,13rem)] font-normal leading-[0.72] tracking-[-0.075em]"
            >
              KRIP
            </h1>
            <p className="mt-8 max-w-3xl text-balance text-[clamp(2rem,4.4vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.055em]">
              Learn to understand
              <span className="block font-serif font-normal italic text-[#D6DFD1]">before you innovate.</span>
            </p>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              An immersive four-week research experience for undergraduate students who want to learn how researchers observe, question, investigate, and think.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('#/careers')}
                className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#E8EBE4] px-7 py-4 text-sm font-semibold text-[#101510] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#101510]"
              >
                Apply for KRIP
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={scrollToExperience}
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full border border-white/30 bg-black/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#101510]"
              >
                Explore the experience
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          <div className="grid gap-6 border-t border-white/20 pt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:grid-cols-2 lg:grid-cols-4">
            <span>Summer research internship</span>
            <span>Open to undergraduate students</span>
            <span>Faculty guided</span>
            <span>Interdisciplinary research experience</span>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-44">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5 lg:pt-10">
            <SectionLabel>What is KRIP?</SectionLabel>
            <h2 className="mt-8 max-w-xl text-balance text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.91] tracking-[-0.065em]">
              Research begins long before the solution.
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-[#565A54]">
              KRIP exists because undergraduate students are often introduced to research through outcomes—papers, prototypes, conclusions—without first experiencing the thinking that made those outcomes possible.
            </p>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#565A54]">
              It is not a classroom course, a workshop, or simply time spent inside an organisation. It is a structured encounter with the discipline of understanding a problem before attempting to change it.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <EditorialImage
              image={KRIP_IMAGES.introduction}
              className="aspect-[4/5] min-h-[560px] lg:aspect-[5/6] lg:min-h-[760px]"
            >
              <p className="absolute bottom-8 left-8 right-8 z-10 max-w-xl font-serif text-2xl leading-tight text-white sm:bottom-12 sm:left-12 sm:text-4xl">
                “The first responsibility of a researcher is not to be clever. It is to be attentive.”
              </p>
            </EditorialImage>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#111611] px-6 py-24 text-white sm:px-10 sm:py-36 lg:px-16 lg:py-48">
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <SectionLabel light>A different way of thinking</SectionLabel>
          </Reveal>

          <div className="mt-16 border-t border-white/20">
            {[
              ['Most people begin with answers.', 'Researchers begin with questions.'],
              ['Assumptions feel efficient.', 'Evidence makes thinking accountable.'],
              ['A quick solution can be impressive.', 'A well-understood problem can be transformative.'],
            ].map(([premise, shift], index) => (
              <Reveal key={premise} delay={index * 0.06}>
                <div className="grid gap-5 border-b border-white/20 py-10 sm:py-14 lg:grid-cols-12 lg:items-baseline">
                  <p className="text-lg leading-8 text-white/45 lg:col-span-5 lg:text-2xl">{premise}</p>
                  <p className="text-balance text-[clamp(2.3rem,5vw,5.6rem)] font-medium leading-[0.95] tracking-[-0.06em] lg:col-span-7">
                    {shift}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="ml-auto mt-20 max-w-3xl lg:mt-28">
            <p className="font-serif text-[clamp(2.4rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.045em] text-[#D9E1D5]">
              KRIP develops researchers—not merely interns who complete assigned tasks.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="krip-experience" className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  <SectionLabel>The KRIP experience</SectionLabel>
                  <h2 className="mt-8 text-balance text-[clamp(3rem,5.7vw,6rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                    An intellectual journey, not a schedule.
                  </h2>
                  <p className="mt-7 max-w-md text-lg leading-8 text-[#60635E]">
                    Observation, literature review, discussion, experimentation, stakeholder interaction, documentation, and mentoring are different ways of pursuing the same purpose: deeper understanding.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="space-y-20 lg:col-span-8 lg:space-y-28">
              {RESEARCH_MOVEMENTS.map((movement, index) => (
                <article key={movement.title} className="grid gap-8 sm:grid-cols-12 sm:items-start">
                  <Reveal className="sm:col-span-2">
                    <span className="font-serif text-5xl text-[#A6A99F]">{String(index + 1).padStart(2, '0')}</span>
                  </Reveal>
                  <Reveal className="sm:col-span-10" delay={0.05}>
                    <h3 className="max-w-3xl text-balance text-[clamp(2.25rem,4.5vw,5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                      {movement.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5F635D]">{movement.copy}</p>
                    {movement.image && (
                      <EditorialImage
                        image={movement.image}
                        className="mt-9 aspect-[16/10] min-h-[340px] sm:mt-12 sm:min-h-[440px]"
                        imageClassName="transition duration-1000 hover:scale-[1.02]"
                      />
                    )}
                  </Reveal>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[900px] overflow-hidden bg-[#1A201B] text-white">
        <EditorialImage
          image={KRIP_IMAGES.learning}
          className="absolute inset-0 h-full w-full"
          imageClassName="saturate-[0.72]"
          overlay={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,16,12,0.92)_0%,rgba(11,16,12,0.72)_48%,rgba(11,16,12,0.18)_100%)]" />

        <div className="relative mx-auto grid min-h-[900px] max-w-[1500px] gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:px-16 lg:py-40">
          <Reveal className="lg:col-span-5">
            <SectionLabel light>Learning beyond the classroom</SectionLabel>
            <h2 className="mt-8 text-balance text-[clamp(3.4rem,6.5vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.07em]">
              Research changes the person doing it.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/65">
              KRIP is not defined by where learning happens. It is defined by the quality of attention, reasoning, responsibility, and reflection a participant brings to the investigation.
            </p>
          </Reveal>

          <div className="self-end lg:col-span-6 lg:col-start-7">
            <div className="border-t border-white/25">
              {LEARNING_LANGUAGE.map((item, index) => (
                <Reveal key={item} delay={Math.min(index * 0.035, 0.18)}>
                  <div className="flex items-center justify-between gap-6 border-b border-white/20 py-4 sm:py-5">
                    <span className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">{item}</span>
                    <span className="font-serif text-sm text-white/35">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E8E6DF] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-[1700px]">
          <div className="mx-auto mb-14 max-w-[1500px] px-2 sm:mb-20 sm:px-4">
            <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <SectionLabel>Through the lens of KRIP</SectionLabel>
                <h2 className="mt-8 text-balance text-[clamp(3.3rem,6vw,6.7rem)] font-medium leading-[0.9] tracking-[-0.065em]">
                  The atmosphere of inquiry.
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-[#5C605A] lg:col-span-5 lg:col-start-8">
                These moments are not a checklist of activities. Together, they reveal what it feels like to stay with a question long enough for understanding to emerge.
              </p>
            </Reveal>
          </div>

          <div className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
            {GALLERY.map((item, index) => (
              <GalleryFigure key={item.image.placeholder} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E2DDD0] px-6 py-28 sm:px-10 sm:py-40 lg:px-16 lg:py-52">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionLabel>Student reflections</SectionLabel>
            <blockquote className="mt-16 max-w-6xl font-serif text-[clamp(3rem,7vw,8.5rem)] leading-[0.94] tracking-[-0.055em] text-[#1B211B]">
              “A verified participant reflection belongs here—not a manufactured testimonial.”
            </blockquote>
            <div className="mt-12 flex flex-col gap-4 border-t border-black/20 pt-6 text-sm text-[#65675F] sm:flex-row sm:items-center sm:justify-between">
              <span>Replace this copy with an approved, attributable KRIP student reflection.</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">Editorial placeholder</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-44">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel>Past KRIP editions</SectionLabel>
              <h2 className="mt-8 max-w-4xl text-balance text-[clamp(3.2rem,6vw,6.8rem)] font-medium leading-[0.91] tracking-[-0.065em]">
                Every edition adds to a living research culture.
              </h2>
            </div>
            <p className="max-w-lg text-lg leading-8 text-[#60635D] lg:col-span-4 lg:col-start-9">
              The archive should document verified batches, themes, mentors, student work, and programme photographs—preserving continuity without turning the experience into a list of claims.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <EditorialImage image={KRIP_IMAGES.archiveOne} className="aspect-[4/3] min-h-[440px] lg:min-h-[640px]">
                <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-white sm:p-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Past edition archive</p>
                  <p className="mt-3 max-w-lg font-serif text-3xl leading-tight sm:text-4xl">
                    Batch, theme, mentors, research experience, and verified gallery.
                  </p>
                </div>
              </EditorialImage>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:pt-28" delay={0.08}>
              <EditorialImage image={KRIP_IMAGES.archiveTwo} className="aspect-[4/5] min-h-[500px] lg:min-h-[650px]">
                <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-white sm:p-10">
                  <p className="font-serif text-3xl leading-tight">An archive built from authentic programme material.</p>
                </div>
              </EditorialImage>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#131813] px-6 py-24 text-white sm:px-10 sm:py-36 lg:px-16 lg:py-48">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel light>Where KRIP leads</SectionLabel>
              <h2 className="mt-8 text-balance text-[clamp(3.4rem,6.5vw,7rem)] font-medium leading-[0.9] tracking-[-0.07em]">
                A first experience of research can become a longer journey.
              </h2>
            </div>
            <p className="max-w-lg text-lg leading-8 text-white/55 lg:col-span-4 lg:col-start-9">
              KRIP connects with the wider Ré ecosystem, creating multiple directions for students who choose to continue investigating, building knowledge, and developing ideas.
            </p>
          </Reveal>

          <div className="mt-20 border-t border-white/20 sm:mt-28">
            {PATHWAY.map((item, index) => (
              <Reveal key={item} delay={Math.min(index * 0.035, 0.2)}>
                <div
                  className={`group flex items-center gap-4 border-b border-white/20 py-6 transition sm:py-8 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <span className="font-serif text-sm text-white/30">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[clamp(2rem,5.4vw,6rem)] font-medium leading-none tracking-[-0.055em] text-white/80 transition duration-500 group-hover:text-white">
                    {item}
                  </span>
                  {index < PATHWAY.length - 1 && (
                    <MoveDownRight className="h-5 w-5 text-[#A9B9A7] transition duration-500 group-hover:translate-x-1 group-hover:translate-y-1" aria-hidden="true" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-44">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel>Frequently asked questions</SectionLabel>
            <h2 className="mt-8 text-balance text-[clamp(3rem,5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.06em]">
              Practical details, clearly answered.
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.08}>
            {FAQS.map((item) => (
              <FAQItem key={item.question} {...item} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative isolate min-h-[90svh] overflow-hidden bg-[#C9D8C7] px-6 py-24 sm:px-10 lg:px-16">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.8),transparent_24%),radial-gradient(circle_at_16%_85%,rgba(95,123,100,0.36),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(16,27,18,0.55)_1px,transparent_1px)] [background-size:100%_12.5%]" />

        <div className="relative mx-auto flex min-h-[calc(90svh-12rem)] max-w-[1500px] flex-col justify-between">
          <Reveal>
            <SectionLabel>Begin with a question</SectionLabel>
          </Reveal>

          <Reveal className="max-w-6xl py-20">
            <h2 className="text-balance text-[clamp(4rem,10vw,11rem)] font-medium leading-[0.79] tracking-[-0.08em] text-[#111711]">
              Research changes the way you think.
            </h2>
            <p className="mt-10 max-w-2xl font-serif text-[clamp(2rem,4vw,4.2rem)] leading-[1.02] tracking-[-0.04em] text-[#344438]">
              Begin that journey with KRIP.
            </p>
          </Reveal>

          <div className="flex flex-col gap-8 border-t border-[#172018]/25 pt-7 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-lg leading-8 text-[#354438]">
              Great researchers are not defined by the speed at which they find solutions, but by the depth with which they understand problems.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('#/careers')}
              className="group inline-flex min-h-14 w-fit items-center gap-4 rounded-full bg-[#111711] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111711] focus-visible:ring-offset-4 focus-visible:ring-offset-[#C9D8C7]"
            >
              Apply now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
