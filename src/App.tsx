import React, { useEffect, useRef, useMemo, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';

// Detailed subpages
import ResearchAreasPage from './pages/ResearchAreasPage';
import ResearchCircleDetailPage from './pages/ResearchCircleDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import ResearchLabsPage from './pages/ResearchLabsPage';
import OpenChallengesPage from './pages/OpenChallengesPage';
import ProgramsPage from './pages/ProgramsPage';
import ApplicationsRequestsHub from './pages/CareersPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import PeoplePage from './pages/PeoplePage';
import ResearchPage from './pages/ResearchPage';
import EcosystemPage from './pages/EcosystemPage';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import ResourcesPage from './pages/ResourcesPage';
import ConnectPage from './pages/ConnectPage';
import { RESEARCH_AREAS } from './data';
import KRESTPage from './pages/KRESTPage';
import KRIPPage from './pages/KRIPPage';
import COREPage from './pages/COREPage';
import UROPPage from './pages/UROPPage';
import ProjectIntakePage from './pages/ProjectIntakePage';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building,
  Check,
  ChevronLeft,
  ChevronRight,
  Combine,
  Compass,
  Cpu,
  GraduationCap,
  HeartPulse,
  Layers,
  Network,
  Pause,
  Play,
  Sparkles,
  Sprout,
  Star,
  Users,
  X,
  Quote,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const DOMAIN_VISUALS = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=82&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=82&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=82&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=82&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=82&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=82&w=1600&auto=format&fit=crop',
];

const RECENT_ACTIVITIES = [
  {
    id: 'activity-1',
    date: 'Recent activity',
    category: 'International Contest',
    title: 'Runner UP Sustainability Award in International Small Wind Turbine Contest 2026',
    summary: 'Competing against 13 international teams, the team showcased its innovative and sustainable small wind turbine technology. Their efforts were recognized with the Runner-Up Award in the Sustainability Category, bringing global recognition to Indian engineering and innovation.',
    image: '/src/assets/images/Sulal.jpg',
    icon: Sparkles,
  },
  {
    id: 'activity-2',
    date: 'Recent achievement',
    category: 'Startup achievement',
    title: 'Top 11 Startup at the Zero Project Technology Forum',
    summary:
      'HeaRMeNow, developed by Nandeeswaran K, Rengha Shree, and Hemavarshini, was selected among the Top 11 startups at the Zero Project Technology Forum, supported by Enable India, for its assistive technology innovation.',
    image: '/src/assets/images/recent_3.jpeg',
    icon: Award,
  },
  {
    id: 'activity-3',
    date: 'Recent achievement',
    category: 'Fellowship achievement',
    title: 'Selected for the Environment Policy & Action Youth Fellowship',
    summary:
      'Aparna R M was selected for the Environment Policy & Action Youth Fellowship (April 2025) by IMPRI, recognizing her commitment to sustainability and policy-driven research.',
    image: '/src/assets/images/recent_2.jpeg',
    icon: Award,
  },
  {
    id: 'activity-4',
    date: 'Recent programme',
    category: 'Programme launch',
    title: 'KRIP Cohort I Begins',
    summary:
      'The inaugural Cohort I of the Kumaraguru Research Internship Program (KRIP) commenced, providing students with immersive research experiences under faculty mentorship across diverse disciplines.',
    image: '/src/assets/images/recent_4.jpeg',
    icon: GraduationCap,
  },
];

const STORY_LAYOUTS = [
  {
    variant: 'smallQuote',
    position:
      'lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-span-2',
  },
  {
    variant: 'rating',
    position:
      'lg:col-start-4 lg:col-span-3 lg:row-start-1 lg:row-span-4',
  },
  {
    variant: 'portrait',
    position:
      'lg:col-start-7 lg:col-span-3 lg:row-start-1 lg:row-span-5',
  },
  {
    variant: 'compact',
    position:
      'lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-2',
  },
  {
    variant: 'textAvatar',
    position:
      'lg:col-start-1 lg:col-span-3 lg:row-start-3 lg:row-span-3',
  },
  {
    variant: 'split',
    position:
      'lg:col-start-10 lg:col-span-3 lg:row-start-3 lg:row-span-3',
  },
  {
    variant: 'wide',
    position:
      'lg:col-start-1 lg:col-span-6 lg:row-start-6 lg:row-span-2',
  },
  {
    variant: 'signature',
    position:
      'lg:col-start-7 lg:col-span-3 lg:row-start-6 lg:row-span-3',
  },
  {
    variant: 'largeQuote',
    position:
      'lg:col-start-10 lg:col-span-3 lg:row-start-6 lg:row-span-3',
  },
];

type StoryItem = {
  id: string;
  text: string;
  stars: number;
  author: string;
  role: string;
  date: string;
  avatar: string;
};

type StoryAvatarProps = {
  story: StoryItem;
  className?: string;
  imageClassName?: string;
};

type StoryIdentityProps = {
  story: StoryItem;
  align?: 'left' | 'center';
};

type StoryCardProps = {
  story: StoryItem;
  variant: string;
  position: string;
  index: number;
  active: boolean;
  reduceMotion: boolean;
  onActivate: () => void;
  onPause: () => void;
  onResume: () => void;
};

function StoryAvatar({
  story,
  className = '',
  imageClassName = '',
}: StoryAvatarProps) {
  return (
    <div
      className={`overflow-hidden rounded-full border-[5px] border-white bg-[#E4E5E7] shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${className}`}
    >
      <img
        src={story.avatar}
        alt={story.author}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
    </div>
  );
}

function StoryIdentity({ story, align = 'left' }: StoryIdentityProps) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <p className="text-sm font-bold text-[#171A19]">
        {story.author}
      </p>

      <p className="mt-1 font-mono text-[8px] font-bold uppercase leading-[1.5] tracking-[0.14em] text-black/40">
        {story.role}
      </p>
    </div>
  );
}

function StoryCard({
  story,
  variant,
  position,
  index,
  active,
  reduceMotion,
  onActivate,
  onPause,
  onResume,
}: StoryCardProps) {
  const baseClass = `
    group relative h-full min-h-[220px] overflow-visible
    rounded-[1.55rem] border bg-white
    transition-[transform,box-shadow,border-color]
    duration-500 ease-out
    ${position}
    ${
      active
        ? 'z-20 border-black/15 shadow-[0_30px_80px_rgba(23,26,25,0.18)] lg:scale-[1.025]'
        : 'z-10 border-black/[0.06] shadow-[0_15px_45px_rgba(23,26,25,0.09)]'
    }
  `;

  const motionProps = reduceMotion
    ? {}
    : {
        initial: {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        whileInView: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
        viewport: {
          once: true,
          amount: 0.15,
        },
        transition: {
          duration: 0.65,
          delay: index * 0.07,
          ease: [0.22, 1, 0.36, 1] as const,
        },
        whileHover: {
          y: -8,
          rotate: index % 2 === 0 ? -0.35 : 0.35,
        },
      };

  const events = {
    onMouseEnter: () => {
      onActivate();
      onPause();
    },
    onMouseLeave: onResume,
    onFocus: () => {
      onActivate();
      onPause();
    },
    onBlur: onResume,
  };

  if (variant === 'smallQuote') {
    return (
      <motion.article
        {...motionProps}
        {...events}
        tabIndex={0}
        className={`${baseClass} p-6 sm:p-7`}
      >
        <Quote className="h-8 w-8 fill-[#171A19] text-[#171A19]" />

        <p className="mt-5 text-sm leading-[1.7] text-black/58">
          “{story.text}”
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <StoryIdentity story={story} />

          <StoryAvatar
            story={story}
            className="h-14 w-14 shrink-0"
          />
        </div>
      </motion.article>
    );
  }

  if (variant === 'rating') {
    return (
      <motion.article
        {...motionProps}
        {...events}
        tabIndex={0}
        className={`${baseClass} flex flex-col items-center px-7 pb-8 pt-14 text-center`}
      >
        <StoryAvatar
          story={story}
          className="absolute -top-9 h-[90px] w-[90px]"
        />

  

        <p className="mt-5 text-sm leading-[1.75] text-black/55">
          “{story.text}”
        </p>

        <div className="mt-auto pt-7">
          <StoryIdentity story={story} align="center" />
        </div>


      </motion.article>
    );
  }

  if (variant === 'portrait') {
    return (
      <motion.article
        {...motionProps}
        {...events}
        tabIndex={0}
        className={`${baseClass} flex min-h-[500px] flex-col border-[5px] border-white p-0`}
      >
        <div className="relative min-h-[330px] flex-1 overflow-hidden rounded-t-[1.25rem] bg-[#D7D9DA]">
          <motion.img
            src={story.avatar}
            alt={story.author}
            className="absolute inset-0 h-full w-full object-cover"
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: active ? 1.06 : 1,
                  }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        <div className="px-6 py-6 text-center">
          <p className="text-sm leading-[1.65] text-black/58">
            “{story.text}”
          </p>

          <div className="mt-4">
            <StoryIdentity story={story} align="center" />
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        {...motionProps}
        {...events}
        tabIndex={0}
        className={`${baseClass} px-7 pb-6 pt-12 text-center`}
      >
        <StoryAvatar
          story={story}
          className="absolute -top-8 left-8 h-[74px] w-[74px]"
        />

        <h3 className="font-display text-xl font-semibold tracking-[-0.03em]">
          Good Job!
        </h3>

        <p className="mx-auto mt-4 max-w-sm text-xs leading-[1.7] text-black/52">
          “{story.text}”
        </p>

        <div className="mt-4">
          <StoryIdentity story={story} align="center" />
        </div>
      </motion.article>
    );
  }

  if (variant === 'textAvatar') {
    return (
      <motion.article
        {...motionProps}
        {...events}
        tabIndex={0}
        className={`${baseClass} flex flex-col p-7`}
      >
        <Quote className="h-6 w-6 fill-[#171A19] text-[#171A19]" />

        <p className="mt-5 text-sm leading-[1.75] text-black/58">
          “{story.text}”
        </p>

        <div className="mt-auto flex items-end justify-between gap-5 pt-6">
          <StoryIdentity story={story} />

          <StoryAvatar
            story={story}
            className="h-[62px] w-[62px] shrink-0"
          />
        </div>
      </motion.article>
    );
  }

  if (variant === 'split') {
    return (
      <motion.article
        {...motionProps}
        {...events}
        tabIndex={0}
        className={`${baseClass} grid grid-cols-[0.8fr_1.2fr] overflow-hidden`}
      >
        <div className="relative min-h-[240px] overflow-hidden bg-[#D7D9DA]">
          <motion.img
            src={story.avatar}
            alt={story.author}
            className="absolute inset-0 h-full w-full object-cover"
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: active ? 1.08 : 1,
                  }
            }
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="flex flex-col justify-between p-6">
          <div>
            <Quote className="h-5 w-5 fill-[#171A19] text-[#171A19]" />

            <p className="mt-4 text-xs leading-[1.75] text-black/58">
              “{story.text}”
            </p>
          </div>

          <div className="mt-5">
            <StoryIdentity story={story} />
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'wide') {
    return (
      <motion.article
        {...motionProps}
        {...events}
        tabIndex={0}
        className={`${baseClass} flex min-h-[190px] flex-col items-center justify-center px-8 py-7 text-center`}
      >
        <h3 className="font-display text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
          I was very impressed!
        </h3>

        <p className="mt-4 max-w-3xl text-sm leading-[1.7] text-black/55">
          “{story.text}”
        </p>

        <div className="mt-4">
          <StoryIdentity story={story} align="center" />
        </div>

        <div
          aria-hidden="true"
          className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center"
        >
          {[0, 1, 2].map((avatarIndex) => (
            <StoryAvatar
              key={avatarIndex}
              story={story}
              className={`h-14 w-14 ${
                avatarIndex !== 0 ? '-ml-2' : ''
              }`}
            />
          ))}
        </div>
      </motion.article>
    );
  }

  if (variant === 'signature') {
    return (
      <motion.article
        {...motionProps}
        {...events}
        tabIndex={0}
        className={`${baseClass} flex flex-col items-center px-7 pb-7 pt-14 text-center`}
      >
        <StoryAvatar
          story={story}
          className="absolute -top-8 h-[76px] w-[76px]"
        />

        <Quote className="mt-2 h-6 w-6 fill-[#171A19] text-[#171A19]" />

        <p className="mt-5 text-sm leading-[1.75] text-black/55">
          “{story.text}”
        </p>

        <div className="mt-auto pt-6">
          <StoryIdentity story={story} align="center" />
        </div>

        <p className="mt-5 -rotate-3 font-display text-2xl italic text-black/35">
          {story.author}
        </p>
      </motion.article>
    );
  }

  return (
    <motion.article
      {...motionProps}
      {...events}
      tabIndex={0}
      className={`${baseClass} flex flex-col justify-between p-7`}
    >
      <div>
        <Quote className="h-8 w-8 fill-[#171A19] text-[#171A19]" />

        <p className="mt-6 font-display text-xl font-medium leading-[1.35] tracking-[-0.025em]">
          “{story.text}”
        </p>
      </div>

      <div className="mt-7 flex items-center justify-between gap-5">
        <StoryIdentity story={story} />

        <StoryAvatar
          story={story}
          className="h-[72px] w-[72px] shrink-0"
        />
      </div>
    </motion.article>
  );
}

const ECOSYSTEM_STEPS = [
  {
    step: '01',
    name: 'Curiosity',
    verb: 'Question',
    desc: 'A simple, persistent question exposes a real-world friction worth investigating.',
    icon: Sparkles,
    accent: '#6366F1',
  },
  {
    step: '02',
    name: 'Mentorship',
    verb: 'Frame',
    desc: 'Domain experts sharpen the question, challenge assumptions, and establish scientific direction.',
    icon: GraduationCap,
    accent: '#10B981',
  },
  {
    step: '03',
    name: 'Programs',
    verb: 'Equip',
    desc: 'Structured pathways provide methods, tools, funding, and time to pursue the work seriously.',
    icon: Compass,
    accent: '#3B82F6',
  },
  {
    step: '04',
    name: 'Circles',
    verb: 'Connect',
    desc: 'Interdisciplinary cohorts bring different perspectives into one sustained research conversation.',
    icon: Users,
    accent: '#A855F7',
  },
  {
    step: '05',
    name: 'Research',
    verb: 'Prove',
    desc: 'Experiments, evidence, iteration, and rigorous documentation turn ideas into reliable knowledge.',
    icon: Layers,
    accent: '#06B6D4',
  },
  {
    step: '06',
    name: 'Impact',
    verb: 'Translate',
    desc: 'Validated insight becomes a paper, patent, prototype, product, policy, or community outcome.',
    icon: Award,
    accent: '#F43F5E',
  },
];

const videos = [
  "src/assets/videos/video1.mp4",
  "src/assets/videos/video 2.mp4",
  "src/assets/videos/video3.mp4",
  "src/assets/videos/video 4.mp4",
  "src/assets/videos/video 5.mp4",
];
const PROGRAMS = [
  {
    id: "exploration-circle",
    short: "EXPLORE",
    title: "Exploration Circle",
    tag: "Where curiosity begins",
    desc: "The gateway into the Ré ecosystem through workshops, seminars, coffee table talks, expert sessions, and research-focused events that inspire curiosity and introduce students to the world of research.",
    metric: "Open",
    metricLabel: "for all students",
    index: "01",
    icon: Compass,
    image:
      "/src/assets/images/exploration_circle.jpeg",
  },

  {
    id: "core",
    short: "CORE",
    title: "Course-Oriented Research Experience",
    tag: "Research integrated into academics",
    desc: "A structured academic programme that introduces research methodology, critical thinking, scientific inquiry, and research communication through credit-based learning experiences.",
    metric: "1",
    metricLabel: "credit programme",
    index: "02",
    icon: Layers,
    image:
      "/src/assets/images/core.jpeg",
  },

  {
    id: "krest",
    short: "KREST",
    title: "Kumaraguru Research and Exploration in Science and Technology",
    tag: "A semester-long research journey",
    desc: "Ré's flagship semester-long programme that guides students through a structured research journey comprising research foundations, probation, nano projects, faculty mentorship, and interdisciplinary research.",
    metric: "Semester",
    metricLabel: "long programme",
    index: "03",
    icon: GraduationCap,
    image:
      "/src/assets/images/krest.jpeg",
  },

  {
    id: "urop",
    short: "UROP",
    title: "Undergraduate Research Opportunities Programme",
    tag: "Faculty-guided research experience",
    desc: "An opportunity for undergraduate students to work alongside faculty mentors on active research projects, gaining authentic research experience through sustained mentorship and collaboration.",
    metric: "Faculty",
    metricLabel: "guided research",
    index: "04",
    icon: Sparkles,
    image:
      "/src/assets/images/urop.jpeg",
  },

  {
    id: "krip",
    short: "KRIP",
    title: "Kumaraguru Research Internship Programme",
    tag: "Short-term immersive research internship",
    desc: "An intensive research internship designed for students seeking hands-on exposure to interdisciplinary research through mentor-guided projects, experimentation, and collaborative learning.",
    metric: "Short",
    metricLabel: "term internship",
    index: "05",
    icon: Compass,
    image:
      "/src/assets/images/krip.jpeg",
  },

  {
    id: "project-intake",
    short: "PROJECT",
    title: "Research Project Intake",
    tag: "Transforming ideas into impactful research",
    desc: "A structured entry point for students and faculty to submit research ideas, receive expert evaluation, secure mentorship, and develop projects within the Ré research ecosystem.",
    metric: "Open",
    metricLabel: "throughout the year",
    index: "06",
    icon: Layers,
    image:
      "/src/assets/images/project_intake.jpeg",
  },
];

const IMPACT_METRICS = [
  {
    value: "3,500+",
    label: "Students Impacted",
    note: "Through research programmes, projects, Research Circles, events, mentorship, and collaborative experiences."
  },
  {
    value: "250+",
    label: "Research Publications",
    note: "Knowledge disseminated through journals, conferences, and scholarly platforms."
  },
  {
    value: "170+",
    label: "Research Events",
    note: "Workshops, seminars, expert sessions, reviews, and research engagement activities."
  },
  {
    value: "150+",
    label: "Active Researchers",
    note: "Students, faculty members, mentors and contributors continue to participate across the ecosystem."
  }
];

const PARTNER_GROUPS = [
  { label: 'Educational Institutions', icon: GraduationCap },
  { label: 'Research Organisations', icon: Network },
  { label: 'Healthcare', icon: HeartPulse },
  { label: 'Industry', icon: Building },
  { label: 'Government', icon: Award },
  { label: 'Communities', icon: Users },
];

const RE_TESTIMONIALS = [


  {
    id: "testm-3",
    text: "KRIP gave me my first meaningful exposure to research. Every review and discussion helped me understand that research is a continuous process.",
    stars: 5,
    author: "Varshini",
    role: "KRIP Intern",
    date: "",
    avatar: "src/assets/testimonials/varshini.jpeg",
  },
  {
    id: "testm-2",
    text: "Working alongside students, faculty, and researchers showed me how every successful project begins with collaboration. Ré became more than a workplace—it became an ecosystem where ideas are nurtured with purpose and responsibility.",
    stars: 5,
    author: "Tharini",
    role: "Research & Administrative Fellow",
    date: "",
    avatar: "src/assets/testimonials/tharini.jpeg",
  },
  {
    id: "testm-4",
    text: "The freedom to explore ideas while receiving constant guidance helped me grow both as a researcher and as an individual. Ré encouraged curiosity while teaching the discipline required to transform ideas into outcomes.",
    stars: 5,
    author: "Rengha Shree",
    role: "Research Fellow",
    date: "",
    avatar: "src/assets/testimonials/renghasree.jpeg",
  },

  {
    id: "testm-5",
    text: "The biggest lesson I learned at Ré was that research is never an individual effort. Working with people from different disciplines expanded my perspective and showed me the value of collaborative problem-solving.",
    stars: 5,
    author: "Tharika",
    role: "Research Fellow",
    date: "",
    avatar: "src/assets/testimonials/tharika.jpeg",
  },

  {
    id: "testm-6",
    text: "What impressed me most was the culture of curiosity. Students are encouraged not just to complete projects, but to question assumptions, explore possibilities, and continuously refine their ideas.",
    stars: 5,
    author: "Student Researcher",
    role: "KREST Participant",
    date: "",
    avatar: "/images/testimonials/student1.jpg",
  },

  {
    id: "testm-7",
    text: "Ré provided the confidence to step beyond the classroom and work on problems that have real-world relevance. Every interaction with mentors strengthened both my technical skills and my confidence to pursue research.",
    stars: 5,
    author: "Research Intern",
    role: "KRIP Participant",
    date: "",
    avatar: "/images/testimonials/student2.jpg",
  },
  

  {
    id: "testm-8",
    text: "Being part of a Research Circle helped me understand that innovation happens when different disciplines come together. The environment encouraged open discussions, experimentation, and continuous learning.",
    stars: 5,
    author: "Research Circle Member",
    role: "Student Researcher",
    date: "",
    avatar: "/images/testimonials/student3.jpg",
  },
    {
    id: "testm-1",
    text: "Ré changed the way I approached learning. It taught me that research isn't about having all the answers—it's about asking better questions, embracing uncertainty, and learning through exploration. The experiences and people I found here continue to shape how I think beyond graduation.",
    stars: 5,
    author: "Nandeeswaran",
    role: "Alumnus | Batch 2022–2026",
    date: "",
    avatar: "src/assets/testimonials/Nandees.jpg",
  },

  {
    id: "testm-9",
    text: "Ré is not simply a place where research happens; it is a community that inspires people to think differently. The mentorship, opportunities, and collaborative culture continue to influence the way I approach every new challenge.",
    stars: 5,
    author: "Alumni Researcher",
    role: "Former Ré Member",
    date: "",
    avatar: "/images/testimonials/alumni.jpg",
  },
];
const RiverDeltaBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(74,222,128,0.18),transparent_38%),radial-gradient(circle_at_90%_90%,rgba(59,130,246,0.16),transparent_40%)]" />
    <svg
      className="h-full w-full"
      width="100%"
      height="100%"
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M500 520 Q520 320 500 160" fill="none" stroke="#2a664e" strokeWidth="14" strokeLinecap="round" />
      <path d="M506 290 Q400 240 240 180" fill="none" stroke="#255b46" strokeWidth="9" strokeLinecap="round" />
      <path d="M500 250 Q600 190 760 140" fill="none" stroke="#255b46" strokeWidth="9" strokeLinecap="round" />
      <path d="M240 180 Q160 140 80 110" fill="none" stroke="#20503d" strokeWidth="5" strokeLinecap="round" />
      <path d="M240 180 Q230 100 210 40" fill="none" stroke="#20503d" strokeWidth="5" strokeLinecap="round" />
      <path d="M760 140 Q820 80 910 50" fill="none" stroke="#20503d" strokeWidth="5" strokeLinecap="round" />
      <path d="M760 140 Q720 70 680 20" fill="none" stroke="#20503d" strokeWidth="5" strokeLinecap="round" />
      <path d="M500 160 Q440 110 420 20" fill="none" stroke="#1d4838" strokeWidth="7" strokeLinecap="round" />
    </svg>
  </div>
);

type SafeImageProps = {
  src: string;
  alt: string;
  fallbackGradient: string;
  fallbackSvg: React.ReactNode;
  loading?: 'eager' | 'lazy';
  className?: string;
};

export const SafeImage = ({
  src,
  alt,
  fallbackGradient,
  fallbackSvg,
  loading = 'lazy',
  className = '',
}: SafeImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    if (imgRef.current?.complete) setIsLoading(false);
  }, [src]);

  return (
    <div className={`relative flex h-full w-full select-none items-center justify-center overflow-hidden bg-[#F1F3F4] ${className}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#E8EAED]">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-[#DADCE0] border-t-[#4285F4]" />
        </div>
      )}

      {hasError ? (
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${fallbackGradient}`}>
          <div className="flex flex-col items-center gap-3 text-center">
            {fallbackSvg}
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              Asset unavailable
            </span>
          </div>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.035] ${
            isLoading ? 'scale-[1.02] opacity-0' : 'scale-100 opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};

const Reveal = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionIndex = ({ number, label, tone = 'text-[#4285F4]' }: { number: string; label: string; tone?: string }) => (
  <div className={`mb-5 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] ${tone}`}>
    <span>{number}</span>
    <span className="h-px w-8 bg-current opacity-40" />
    <span>{label}</span>
  </div>
);

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#/');
  const [previousHash, setPreviousHash] = useState<string>('#/research-areas');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('krip');
  const [selectedAreaId, setSelectedAreaId] = useState<string>(RESEARCH_AREAS[0]?.id ?? '');
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [latestPage, setLatestPage] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [ecosystemIndex, setEcosystemIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const [activityIndex, setActivityIndex] = useState(0);
  const [activityPaused, setActivityPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storiesPaused, setStoriesPaused] = useState(false);

  const collageStories = useMemo(() => {
    if (!RE_TESTIMONIALS.length) return [];

    return STORY_LAYOUTS.map((layout, index) => ({
      ...RE_TESTIMONIALS[index % RE_TESTIMONIALS.length],
      ...layout,
      collageId: `${RE_TESTIMONIALS[index % RE_TESTIMONIALS.length].id}-${index}`,
    }));
  }, []);

  useEffect(() => {
    if (reduceMotion || storiesPaused || collageStories.length === 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveStoryIndex((current) => (current + 1) % collageStories.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, [reduceMotion, storiesPaused, collageStories.length]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentHash((previous) => {
        if (previous !== hash && !previous.startsWith('#/research-circle/')) {
          setPreviousHash(previous);
        }
        return hash;
      });

      if (!hash.includes('#/about#') && !hash.includes('#/about/')) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (testimonialPaused || reduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setTestimonialIndex((previous) => (previous + 1) % RE_TESTIMONIALS.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [testimonialPaused, reduceMotion]);

  useEffect(() => {
    if (activityPaused || reduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setActivityIndex((previous) => (previous + 1) % RECENT_ACTIVITIES.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [activityPaused, reduceMotion]);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    setCurrentHash((previous) => {
      if (previous !== hash && !previous.startsWith('#/research-circle/')) {
        setPreviousHash(previous);
      }
      return hash;
    });
  };

  const handleProgramClick = (programId: string) => {
    setSelectedProgramId(programId);
    navigateTo(`#/programs/${programId}`);
  };

  const latestPublications = [
    [
      {
        id: 'proj-1',
        src: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=82&w=1600&auto=format&fit=crop',
        alt: 'Battery Energy Storage System',
        tag: 'BESS',
        owner: 'Battery Research Circle',
        stage: 'Product',
        date: 'Active infrastructure',
        category: 'Clean energy',
        title: 'Battery Energy Storage System',
        desc: 'An energy management solution that stores excess electricity from solar photovoltaic systems and supplies power during low generation or high demand. It improves energy reliability, grid stability, and renewable integration.',
        outcome: 'Grid-ready',
        gradient: 'from-[#E6F4EA] to-[#CEEAD6]',
        svg: <Zap className="h-20 w-20 text-[#34A853]" />,
      },
      {
        id: 'proj-2',
        src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=82&w=1600&auto=format&fit=crop',
        alt: 'Small Scale Wind Turbine',
        tag: 'Wind energy',
        owner: 'Team Sulal',
        stage: 'Prototype',
        date: 'Research feature',
        category: 'Renewable capture',
        title: 'Small Scale Wind Turbine',
        desc: 'A small-scale turbine using eco-conscious composite blades and optimized aerodynamics to improve clean energy capture while reducing material impact.',
        outcome: 'Field prototype',
        gradient: 'from-[#E8F0FE] to-[#D2E3FC]',
        svg: <Sprout className="h-20 w-20 text-[#4285F4]" />,
      },
      {
        id: 'proj-3',
        src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=82&w=1600&auto=format&fit=crop',
        alt: 'Assistive Communication Device for Hard of Hearing Individuals',
        tag: 'Assistive tech',
        owner: 'Educational Research Circle',
        stage: 'Prototype',
        date: 'Research feature',
        category: 'Inclusion and access',
        title: 'Assistive Communication Device for Hard of Hearing Individuals',
        desc: 'A platform that converts multilingual speech into accessible captions with translation, speaker identification, and simplified language for Indian classrooms and daily communication.',
        outcome: 'Classroom pilot',
        gradient: 'from-[#FCE8E6] to-[#FAD2CF]',
        svg: <HeartPulse className="h-20 w-20 text-[#EA4335]" />,
      },
    ],
  ];

  const selectedAreaIndex = Math.max(
    0,
    RESEARCH_AREAS.findIndex((area) => area.id === selectedAreaId),
  );
  const selectedArea = RESEARCH_AREAS[selectedAreaIndex] ?? RESEARCH_AREAS[0];
  const selectedProgram = PROGRAMS.find((program) => program.id === selectedProgramId) ?? PROGRAMS[0];
  const selectedEcosystemStep = ECOSYSTEM_STEPS[ecosystemIndex];
  const selectedTestimonial = RE_TESTIMONIALS[testimonialIndex];
  const selectedActivity = RECENT_ACTIVITIES[activityIndex];

  const getAreaIcon = (iconName: string, className = 'h-5 w-5') => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className={`${className} text-indigo-500`} />;
      case 'HeartPulse':
        return <HeartPulse className={`${className} text-red-500`} />;
      case 'TreePine':
        return <Sprout className={`${className} text-emerald-500`} />;
      case 'Combine':
        return <Combine className={`${className} text-amber-500`} />;
      case 'Compass':
        return <Compass className={`${className} text-purple-500`} />;
      case 'Zap':
        return <Zap className={`${className} text-blue-500`} />;
      default:
        return <Sparkles className={`${className} text-[#1A73E8]`} />;
    }
  };

  const renderView = () => {
    const parsedParts = currentHash.split('#');
    const cleanHash = parsedParts[1] ? `#${parsedParts[1]}` : '#/';

    if (cleanHash === '#/' || cleanHash === '') return renderHome();

    if (cleanHash.startsWith('#/research-circle/')) {
      const circleId = cleanHash.replace('#/research-circle/', '');
      return (
        <ResearchCircleDetailPage
          circleId={circleId}
          onBack={() => {
            const backHash = previousHash && !previousHash.startsWith('#/research-circle/') ? previousHash : '#/research-areas';
            navigateTo(backHash);
          }}
          onNavigate={navigateTo}
        />
      );
    }

    switch (cleanHash) {
      case '#/research-areas':
        return <ResearchAreasPage onNavigate={navigateTo} />;
      case '#/projects':
        return <ProjectsPage />;
      case '#/publications':
        return <PublicationsPage />;
      case '#/labs':
        return <ResearchLabsPage />;
      case '#/challenges':
        return <OpenChallengesPage />;
      case '#/careers':
        return <ApplicationsRequestsHub />;
      case '#/events':
        return <EventsPage />;
      case '#/about':
        return <AboutPage />;
      case '#/people':
        return <PeoplePage />;
      case '#/research':
        return <ResearchPage onNavigate={navigateTo} />;
      case '#/ecosystem':
        return <EcosystemPage onNavigate={navigateTo} />;
      case '#/knowledge-hub':
        return <KnowledgeHubPage onNavigate={navigateTo} />;
      case '#/resources':
        return <ResourcesPage onNavigate={navigateTo} />;
      case '#/connect':
        return <ConnectPage onNavigate={navigateTo} />;
      case '#/programs/core':
        return <COREPage onNavigate={navigateTo} />;

      case '#/programs/krest':
        return <KRESTPage onNavigate={navigateTo} />;

      case '#/programs/krip':
        return <KRIPPage onNavigate={navigateTo} />;

      case '#/programs/urop':
        return <UROPPage onNavigate={navigateTo} />;

      case '#/programs/project-intake':
        return <ProjectIntakePage onNavigate={navigateTo} />;
      default:
        if (cleanHash === '#/programs' || cleanHash.startsWith('#/programs/')) {
          const selectedId = cleanHash.startsWith('#/programs/')
            ? cleanHash.replace('#/programs/', '')
            : selectedProgramId;
          return <ProgramsPage onNavigate={navigateTo} selectedProgramId={selectedId} />;
        }
        return renderHome();
    }
  };

  const renderHome = () => (
    <div id="homepage-root" className="w-full overflow-clip bg-white text-[#202124] selection:bg-[#4285F4]/20">
      <style>{`
        html { scroll-behavior: smooth; }
        .re-text-balance { text-wrap: balance; }
        .re-no-scrollbar::-webkit-scrollbar { display: none; }
        .re-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="fixed left-0 top-0 z-[90] h-[2px] w-full bg-transparent" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-[#1A73E8]"
          animate={{ scaleX: scrollProgress }}
          transition={{ duration: reduceMotion ? 0 : 0.12, ease: 'linear' }}
        />
      </div>

      {/* 01 — Hero */}
<section
  id="home-hero"
  className="relative isolate min-h-[980px] overflow-hidden border-b border-black/10 bg-[#F5F4EF] text-[#101010] lg:min-h-[calc(100svh-24px)]"
  aria-labelledby="home-hero-title"
>
  {/* Background image containing only the visual “10” */}
  <motion.div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/src/assets/images/decade.jpeg')",
    }}
    initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: reduceMotion ? 0 : 1.1,
      ease: [0.22, 1, 0.36, 1],
    }}
    aria-hidden="true"
  />

  {/* Readability gradients */}
  <div
    className="pointer-events-none absolute inset-y-0 left-0 hidden w-[43%] bg-gradient-to-r from-[#F7F6F2] via-[#F7F6F2]/95 to-transparent lg:block"
    aria-hidden="true"
  />

  <div
    className="pointer-events-none absolute inset-y-0 right-0 hidden w-[22%] bg-gradient-to-l from-[#F7F6F2]/90 via-[#F7F6F2]/45 to-transparent lg:block"
    aria-hidden="true"
  />

  {/* Mobile image fade */}
  <div
    className="pointer-events-none absolute inset-x-0 top-[37vh] h-[22vh] bg-gradient-to-b from-transparent via-[#F5F4EF]/90 to-[#F5F4EF] lg:hidden"
    aria-hidden="true"
  />

  <div className="relative mx-auto flex min-h-[980px] max-w-[1680px] flex-col px-6 pb-10 pt-[52vh] sm:px-10 sm:pt-[58vh] lg:min-h-[calc(100svh-24px)] lg:px-16 lg:pb-9 lg:pt-0 xl:px-20">
    <div className="grid flex-1 items-center gap-12 lg:grid-cols-[0.82fr_1.25fr_0.48fr]">
      {/* Left editorial content */}
      <div className="relative z-10 max-w-[610px] lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            delay: 0.15,
          }}
          className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.34em] text-[#5F6360]"
        >
          <span>2016</span>
          <span className="h-px w-10 bg-black/35" />
          <span>2026</span>
        </motion.div>

        <motion.h1
          id="home-hero-title"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.72,
            delay: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 max-w-[610px] text-[48px] font-black uppercase leading-[0.92] tracking-[-0.055em] sm:text-[64px] lg:text-[60px] xl:text-[60px]"
        >
          A decade of
          <span className="block">engineering</span>
          <span className="block">curiosity.</span>
        </motion.h1>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            delay: 0.31,
          }}
          className="mt-8"
        >
          <div className="mb-7 h-px w-14 bg-black/45" />

          <p className="max-w-[500px] text-[16px] leading-7 text-[#383B38] sm:text-[17px] sm:leading-8">
            For ten years, Ré has transformed{' '}
            <em className="font-semibold text-black">curiosity</em> into
            discovery, ideas into{' '}
            <em className="font-semibold text-black">innovation</em>, and
            students into globally recognized researchers.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: 0.4,
          }}
          className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <button
            type="button"
            onClick={() => navigateTo('#/about')}
            className="group inline-flex h-[50px] items-center gap-5 rounded-full bg-black px-6 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#191919] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            Explore the Journey
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          {/* <button
            type="button"
            onClick={() =>
              document.getElementById('home-about')?.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'start',
              })
            }
            className="group inline-flex h-[50px] items-center gap-4 rounded-full px-2 text-sm font-medium text-[#303330] transition hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            Learn More

            <span className="grid h-10 w-10 place-items-center rounded-full border border-black/30 transition group-hover:border-black group-hover:bg-black group-hover:text-white">
              →
            </span>
          </button> */}
        </motion.div>
      </div>

      {/* Keeps the central “10” image unobstructed */}
      <div className="hidden lg:block" aria-hidden="true" />

      {/* Right statistics */}
      <motion.aside
        initial={reduceMotion ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.72,
          delay: 0.48,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 lg:block lg:overflow-visible lg:rounded-none lg:border-0 lg:border-l lg:border-black/15 lg:bg-transparent lg:pl-8"
        aria-label="Ten years of Ré in numbers"
      >
        {[
          {
            value: '10',
            label: 'Years',
            detail: 'of Ré',
            color: '#1EA7E1',
            symbol: '✳',
          },
          {
            value: '100+',
            label: 'Research Projects',
            detail: '',
            color: '#25BDB5',
            symbol: '△',
          },
          {
            value: '1000+',
            label: 'Student Researchers',
            detail: '',
            color: '#8955DB',
            symbol: '◎',
          },
          {
            value: 'Global Impact',
            label: 'Across Borders',
            detail: '',
            color: '#F16B24',
            symbol: '⊕',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.value}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: 0.56 + index * 0.07,
            }}
            className="min-h-[150px] bg-[#F5F4EF]/94 p-5 backdrop-blur-sm lg:min-h-0 lg:bg-transparent lg:px-0 lg:py-7 lg:backdrop-blur-none"
          >
            <div className="flex items-start gap-4">
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: stat.color }}
              />

              <div className="flex-1">
                <p
                  className={
                    stat.value === 'Global Impact'
                      ? 'max-w-[130px] text-[16px] font-black uppercase leading-[1.2] tracking-[0.12em]'
                      : 'text-[28px] font-black leading-none tracking-[-0.04em]'
                  }
                >
                  {stat.value}
                </p>

                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.19em] text-[#242724]">
                  {stat.label}
                </p>

                {stat.detail && (
                  <p className="mt-1 text-[11px] text-[#555955]">
                    {stat.detail}
                  </p>
                )}
              </div>

              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/25 text-sm text-black">
                {stat.symbol}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.aside>
    </div>

    {/* Scroll indicator */}
    <motion.button
      type="button"
      onClick={() =>
        document.getElementById('home-journey')?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      }
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: 0.8,
      }}
      className="mt-10 hidden w-fit text-left text-black/65 transition hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 lg:block"
      aria-label="Scroll to discover"
    >
      <span className="block text-[9px] font-medium uppercase tracking-[0.42em]">
        Scroll to discover
      </span>

      <motion.span
        animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 1.7,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="mt-4 block text-xl"
      >
        ↓
      </motion.span>
    </motion.button>
  </div>
</section>

      {/* 01A — Recent activities */}
      <section id="home-recent-activities" className="relative overflow-hidden border-b border-black/10 bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-20">
          <Reveal className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionIndex number="01" label="Recent activities" tone="text-[#1A73E8]" />
              <h2 className="re-text-balance max-w-4xl font-display text-[clamp(2.5rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-[#202124]">
                Curiosity, currently in motion.
              </h2>
            </div>
            <button
              onClick={() => navigateTo('#/events')}
              className="group inline-flex w-fit items-center gap-2 border-b border-black/25 pb-2 text-sm font-bold text-[#202124] transition-colors hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
            >
              View all activities
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-[#F5F4EF] lg:mt-16 lg:rounded-[3rem]" delay={0.08}>
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative min-h-[420px] overflow-hidden lg:col-span-7 lg:min-h-[590px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedActivity.id}
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <SafeImage
                      src={selectedActivity.image}
                      alt={selectedActivity.title}
                      fallbackGradient="from-[#DDE8E1] to-[#C3D8CB]"
                      fallbackSvg={<selectedActivity.icon className="h-20 w-20 text-[#216645]" />}
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10 lg:p-12">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">
                        {selectedActivity.category} / {selectedActivity.date}
                      </p>
                      <h3 className="mt-4 max-w-3xl font-display text-xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-2xl">
                        {selectedActivity.title}
                      </h3>
                      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
                        {selectedActivity.summary}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
                <div className="space-y-2">
                  {RECENT_ACTIVITIES.map((activity, index) => {
                    const active = index === activityIndex;
                    const Icon = activity.icon;
                    return (
                      <button
                        key={activity.id}
                        type="button"
                        onClick={() => setActivityIndex(index)}
                        className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] ${
                          active ? 'border-[#202124] bg-[#202124] text-white' : 'border-transparent hover:border-black/10 hover:bg-white'
                        }`}
                        aria-pressed={active}
                      >
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${active ? 'bg-white/12' : 'bg-white'}`}>
                          <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-[#1A73E8]'}`} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block font-mono text-[9px] font-bold uppercase tracking-[0.18em] ${active ? 'text-white/50' : 'text-[#80868B]'}`}>
                            {activity.date}
                          </span>
                          <span className="mt-1 block truncate text-sm font-bold">{activity.title}</span>
                        </span>
                        <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActivityIndex((previous) => (previous - 1 + RECENT_ACTIVITIES.length) % RECENT_ACTIVITIES.length)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white transition-colors hover:bg-[#202124] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                      aria-label="Previous recent activity"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActivityIndex((previous) => (previous + 1) % RECENT_ACTIVITIES.length)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white transition-colors hover:bg-[#202124] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                      aria-label="Next recent activity"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActivityPaused((previous) => !previous)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white transition-colors hover:bg-[#202124] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                      aria-label={activityPaused ? 'Resume recent activity rotation' : 'Pause recent activity rotation'}
                    >
                      {activityPaused ? <Play className="ml-0.5 h-4 w-4 fill-current" /> : <Pause className="h-4 w-4" />}
                    </button>
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5F6368]">
                    {String(activityIndex + 1).padStart(2, '0')} / {String(RECENT_ACTIVITIES.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — A place where questions find direction */}
      <section id="home-research-intro" className="relative overflow-hidden bg-[#F5F4EF] py-24 sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full border border-black/5" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-20">
          <Reveal className="lg:col-span-5 lg:pt-8">
            <SectionIndex number="02" label="A place where questions find direction" tone="text-[#1A73E8]" />
            <h2 className="re-text-balance font-display text-[clamp(2.9rem,6vw,6.7rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#202124]">
              A Place Where Questions Find Direction.
            </h2>

          </Reveal>

          <Reveal className="lg:col-span-7 lg:pl-12" delay={0.1}>
            <div className="grid grid-cols-1 gap-10  lg:items-start">
              <div className="space-y-6 text-base leading-[1.8] text-[#4F5357] sm:text-xl">
                <p>
                  Curiosity is one of the most powerful qualities we possess. It encourages us to observe more closely, think more deeply, and imagine new possibilities. When guided with purpose, curiosity becomes research. When shared with others, it becomes innovation. When pursued with commitment, it creates meaningful impact.
                </p>
                <p className="font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#202124] sm:text-4xl">
                  Ré exists to cultivate this journey.
                </p>
                <p>
                  Designed as an integrated research ecosystem, Ré brings together students, educators, researchers, institutions, industry, and communities into an environment where ideas are explored, knowledge is created, and learning extends far beyond the classroom.
                </p>
              </div>

              {/* <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:mt-20">
                <SafeImage
                  src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=82&w=1800&auto=format&fit=crop"
                  alt="Researchers exploring ideas together"
                  fallbackGradient="from-[#DCE6E1] to-[#BFD5C8]"
                  fallbackSvg={<Network className="h-20 w-20 text-[#216645]" />}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">An integrated research ecosystem</p>
                  <p className="mt-3 font-display text-2xl font-semibold leading-tight">Ideas are explored. Knowledge is created. Learning moves beyond the classroom.</p>
                </div>
              </div> */}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — KI.CER ecosystem */}
      <section id="home-ecosystem-intro" className="relative overflow-hidden bg-[#E9F0EB] py-24 sm:py-32 lg:py-40">
        <div className="absolute -right-48 -top-48 h-[620px] w-[620px] rounded-full border border-[#1D4D35]/10" aria-hidden="true" />
        <div className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full border border-[#1D4D35]/10" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-20">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionIndex number="03" label="KI.CER" tone="text-[#216645]" />
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#486B58]">
                Kumaraguru Institutions Centre of Exploratory Research
              </p>
              <h2 className="re-text-balance max-w-4xl font-display text-[clamp(2.9rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.058em] text-[#163225]">
                One Ecosystem. Infinite Possibilities.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.75] text-[#3E5A4A] sm:text-lg lg:col-span-6 lg:pt-14">
              <p>Research is not a single destination. It is a continuous journey shaped by people, opportunities, experiences, and collaboration.</p>
              <p>Every initiative within Ré is thoughtfully connected to create a seamless pathway from the first spark of curiosity to research, innovation, publication, leadership, and societal contribution.</p>
              <p>Whether you are beginning your first research project or advancing interdisciplinary collaborations, the ecosystem grows with you, supporting every stage of your journey.</p>
            </div>
          </Reveal>

          {/* <Reveal className="mt-16 overflow-hidden rounded-[2rem] border border-[#173D2B]/10 bg-white/55 p-5 backdrop-blur-sm sm:p-8 lg:mt-20 lg:rounded-[3rem] lg:p-12" delay={0.1}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedEcosystemStep.step}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4 }}
                    className="flex min-h-[350px] flex-col justify-between rounded-[1.5rem] bg-[#163225] p-7 text-white sm:p-9"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/45">{selectedEcosystemStep.step} / 06</span>
                        <selectedEcosystemStep.icon className="h-6 w-6" style={{ color: selectedEcosystemStep.accent }} />
                      </div>
                      <p className="mt-14 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">{selectedEcosystemStep.verb}</p>
                      <h3 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{selectedEcosystemStep.name}</h3>
                      <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">{selectedEcosystemStep.desc}</p>
                    </div>
                    <button
                      onClick={() => navigateTo('#/ecosystem')}
                      className="group mt-10 inline-flex w-fit items-center gap-2 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Explore the full ecosystem
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative lg:col-span-7 lg:flex lg:items-center">
                <div className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-[#173D2B]/15 sm:block lg:left-0 lg:top-1/2 lg:h-px lg:w-full" aria-hidden="true" />
                <div className="relative grid w-full grid-cols-1 gap-2 sm:pl-12 lg:grid-cols-6 lg:gap-3 lg:pl-0">
                  {ECOSYSTEM_STEPS.map((item, index) => {
                    const active = index === ecosystemIndex;
                    const complete = index < ecosystemIndex;
                    return (
                      <button
                        key={item.step}
                        type="button"
                        onMouseEnter={() => setEcosystemIndex(index)}
                        onFocus={() => setEcosystemIndex(index)}
                        onClick={() => setEcosystemIndex(index)}
                        className={`group relative flex items-center gap-4 rounded-2xl p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#216645] sm:-ml-12 sm:pl-0 lg:ml-0 lg:flex-col lg:gap-5 lg:bg-transparent lg:p-0 lg:text-center ${active ? 'bg-white' : 'hover:bg-white/55'}`}
                        aria-pressed={active}
                      >
                        <span
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all sm:h-11 sm:w-11 ${
                            active
                              ? 'scale-110 border-[#163225] bg-[#163225] text-white shadow-lg'
                              : complete
                                ? 'border-[#216645] bg-[#E9F0EB] text-[#216645]'
                                : 'border-[#AFC0B6] bg-[#F7FAF8] text-[#657B6E]'
                          }`}
                        >
                          {complete ? <Check className="h-4 w-4" /> : <item.icon className="h-4 w-4" />}
                        </span>
                        <span>
                          <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#6F8277]">{item.step}</span>
                          <span className={`mt-0.5 block text-sm font-bold ${active ? 'text-[#163225]' : 'text-[#4D6457]'}`}>{item.name}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal> */}
        </div>
      </section>

      {/* 04 — Research without boundaries */}
      <section id="home-research-domains" className="relative overflow-hidden bg-[#111614] py-24 text-white sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArea?.id}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 0.26 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7 }}
              className="absolute inset-y-0 right-0 w-full bg-cover bg-center lg:w-[58%]"
              style={{ backgroundImage: `url(${DOMAIN_VISUALS[selectedAreaIndex % DOMAIN_VISUALS.length]})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#111614_0%,#111614_45%,rgba(17,22,20,0.74)_70%,#111614_100%)]" />
        </div>

        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 sm:px-8 lg:grid-cols-12 lg:px-20">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:h-fit">
            <SectionIndex number="04" label="Research without boundaries" tone="text-[#7DD3FC]" />
            <h2 className="re-text-balance font-display text-[clamp(2.8rem,5.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              Every Discipline Begins with a Question.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-[1.75] text-white/62">
              <p>The world&apos;s most meaningful discoveries emerge when curiosity crosses disciplines.</p>
              <p>Ré encourages exploration across science, engineering, medicine, technology, humanities, education, sustainability, business, design, and emerging fields of knowledge. Every domain becomes an opportunity to connect ideas, solve meaningful challenges, and contribute new perspectives to society.</p>
              <p className="font-semibold text-white">Research at Ré is not defined by subjects alone. It is defined by the questions we choose to pursue.</p>
            </div>
            <button
              onClick={() => navigateTo('#/research-areas')}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#111614] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111614]"
            >
              Explore Research Areas
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </Reveal>

          <div className="lg:col-span-7 lg:pl-10">
            <div className="border-t border-white/15">
              {RESEARCH_AREAS.map((area, index) => {
                const isActive = area.id === selectedAreaId;
                return (
                  <motion.button
                    key={area.id}
                    type="button"
                    onMouseEnter={() => setSelectedAreaId(area.id)}
                    onFocus={() => setSelectedAreaId(area.id)}
                    onClick={() => {
                      if (isActive) navigateTo('#/research-areas');
                      else setSelectedAreaId(area.id);
                    }}
                    className="group grid w-full grid-cols-[42px_1fr_auto] items-start gap-4 border-b border-white/15 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7DD3FC] sm:grid-cols-[58px_1fr_auto] sm:py-8"
                    animate={{ opacity: isActive ? 1 : 0.58 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    aria-pressed={isActive}
                  >
                    <span className="pt-1 font-mono text-[10px] font-bold tracking-[0.18em] text-white/40">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="flex items-center gap-3">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${isActive ? 'border-white/30 bg-white text-black' : 'border-white/15 bg-white/5'}`}>
                          {getAreaIcon(area.iconName, 'h-4 w-4')}
                        </span>
                        <span className="font-display text-xl font-semibold tracking-tight sm:text-3xl">{area.title}</span>
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            initial={reduceMotion ? false : { opacity: 0, height: 0, y: -4 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            transition={{ duration: reduceMotion ? 0 : 0.35 }}
                            className="block overflow-hidden"
                          >
                            <span className="mt-4 block max-w-xl text-sm leading-relaxed text-white/62 sm:text-base">{area.summary}</span>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7DD3FC]">
                              Explore area <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <ArrowUpRight className={`mt-1 h-5 w-5 transition-transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Learning through research */}
      <section id="home-learning-intro" className="bg-[#F8F9FA] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-20">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionIndex number="05" label="Learning through research" tone="text-[#9333EA]" />
              <h2 className="re-text-balance font-display text-[clamp(2.8rem,5.8vw,6.3rem)] font-semibold leading-[0.91] tracking-[-0.058em] text-[#202124]">
                Every Journey Begins Differently.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.75] text-[#5F6368] sm:text-lg lg:col-span-6 lg:pt-14">
              <p>Some learners begin with a simple observation. Some with a challenge they wish to solve. Others with an idea waiting to be explored.</p>
              <p>Ré provides structured pathways that support every stage of research—from developing essential skills and working alongside experienced mentors to leading projects, publishing scholarly work, and transforming ideas into meaningful outcomes.</p>
              <p className="font-display text-2xl font-semibold leading-tight text-[#202124]">Every journey is unique. Every journey matters.</p>
              <button
                onClick={() => navigateTo('#/programs')}
                className="group inline-flex items-center gap-2 border-b border-[#202124]/25 pb-2 text-sm font-bold text-[#202124] transition-colors hover:border-[#202124] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA]"
              >
                Explore Programs
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </Reveal>

          <Reveal className="mt-16 grid grid-cols-1 overflow-hidden rounded-[2rem] border border-black/10 bg-white lg:mt-20 lg:grid-cols-12 lg:rounded-[3rem]" delay={0.1}>
            <div className="re-no-scrollbar flex gap-3 overflow-x-auto border-b border-black/10 p-4 lg:col-span-4 lg:block lg:overflow-visible lg:border-b-0 lg:border-r lg:p-8">
              {PROGRAMS.map((program) => {
                const active = program.id === selectedProgram.id;
                return (
                  <button
                    key={program.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedProgramId(program.id)}
                    className={`group min-w-[190px] rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA] lg:min-w-0 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:px-0 lg:py-6 ${
                      active ? 'border-[#202124] bg-[#202124] text-white lg:border-black/10 lg:bg-transparent lg:text-[#202124]' : 'border-black/10 bg-white text-[#5F6368] lg:border-black/10'
                    }`}
                  >
                    <span className="flex items-start justify-between gap-5">
                      <span>
                        <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${active ? 'text-white/55 lg:text-[#9333EA]' : 'text-[#80868B]'}`}>
                          {program.index} / {program.short}
                        </span>
                        <span className="mt-2 block text-sm font-bold leading-snug">{program.title}</span>
                      </span>
                      <ArrowRight className={`hidden h-4 w-4 shrink-0 transition-transform lg:block ${active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[590px] overflow-hidden lg:col-span-8 lg:min-h-[680px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProgram.id}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45 }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={selectedProgram.image}
                    alt={`${selectedProgram.title} scholars`}
                    fallbackGradient="from-[#E8E1F4] to-[#D9C9EA]"
                    fallbackSvg={<selectedProgram.icon className="h-20 w-20 text-[#7339A8]" />}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10 lg:p-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
                      <div className="max-w-2xl">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-purple-200">{selectedProgram.tag}</p>
                        <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{selectedProgram.title}</h3>
                        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/72 sm:text-base">{selectedProgram.desc}</p>
                        <button
                          onClick={() => handleProgramClick(selectedProgram.id)}
                          className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#202124] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          Explore {selectedProgram.short}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </button>
                      </div>
                      <div className="border-l border-white/25 pl-6 sm:text-right">
                        <p className="font-display text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">{selectedProgram.metric}</p>
                        <p className="mt-1 max-w-[140px] font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/55 sm:ml-auto">{selectedProgram.metricLabel}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 — From discovery to impact */}
      <section id="home-latest-research" className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-20">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionIndex number="06" label="From discovery to impact" tone="text-[#1A73E8]" />
              <h2 className="re-text-balance font-display text-[clamp(2.8rem,5.8vw,6.4rem)] font-semibold leading-[0.91] tracking-[-0.058em] text-[#202124]">
                Creating Knowledge That Matters.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.75] text-[#5F6368] sm:text-lg lg:col-span-5 lg:pt-14">
              <p>Research achieves its greatest value when knowledge is shared, applied, and continues to inspire new ideas.</p>
              <p>Across the Ré ecosystem, learners and mentors contribute through publications, interdisciplinary projects, innovation initiatives, partnerships, and community engagement that extend learning beyond institutions and create meaningful impact across society.</p>
              <p className="font-semibold text-[#202124]">Every contribution strengthens a growing culture of inquiry.</p>
            </div>
          </Reveal>

          <Reveal className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-black/10 sm:grid-cols-4 lg:mt-20 lg:rounded-[3rem]" delay={0.08}>
            {IMPACT_METRICS.map((metric) => (
              <div key={metric.label} className="bg-[#F5F4EF] p-6 sm:p-8 lg:p-10">
                <p className="font-display text-[clamp(2.4rem,4vw,4.8rem)] font-semibold leading-none tracking-[-0.055em] text-[#202124]">{metric.value}</p>
                <p className="mt-4 text-sm font-bold leading-snug text-[#202124]">{metric.label}</p>
                <p className="mt-2 hidden text-xs leading-relaxed text-[#80868B] sm:block">{metric.note}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-16 flex flex-col gap-7 lg:mt-24 lg:flex-row lg:items-end lg:justify-between" delay={0.08}>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#80868B]">Impact highlights</p>
              <h3 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#202124] sm:text-5xl">Research moving from evidence into the world.</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigateTo('#/publications')} className="min-h-11 rounded-full border border-black/15 bg-white px-5 text-sm font-bold text-[#202124] transition-colors hover:bg-[#F1F3F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]">Publications</button>
              <button onClick={() => navigateTo('#/projects')} className="min-h-11 rounded-full bg-[#202124] px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2">Projects</button>
            </div>
          </Reveal>

  <div className="relative overflow-hidden">
    <div className="flex animate-marquee gap-6 w-max">

      {[...videos, ...videos].map((video, index) => (
        <video
          key={index}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-[320px] h-[560px] rounded-3xl object-cover shadow-xl flex-shrink-0"
        />
      ))}

    </div>
  </div>

        </div>
      </section>

      {/* 07 — Stories of discovery */}
{/* 07 — Stories of discovery */}
<section
  id="home-scholar-stories"
  className="relative overflow-hidden bg-[#F5F2EC] py-24 text-[#181818] sm:py-32 lg:py-40"
>
  {/* Existing section and data integration: :contentReference[oaicite:0]{index=0} */}

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(200,55,55,0.075),transparent_32%),radial-gradient(circle_at_8%_88%,rgba(24,24,24,0.045),transparent_34%)]"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(24,24,24,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,24,0.018)_1px,transparent_1px)] bg-[size:48px_48px]"
  />

  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025] mix-blend-multiply"
  >
    <filter id="re-stories-noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.82"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>

    <rect
      width="100%"
      height="100%"
      filter="url(#re-stories-noise)"
    />
  </svg>

  <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
    <Reveal>
      <div className="flex items-start justify-between gap-8">
        <div className="max-w-[1120px]">
          <SectionIndex
            number="07"
            label="Stories of discovery"
            tone="text-[#C83737]"
          />

          <h2 className="re-text-balance max-w-[1100px] font-display text-[clamp(3.25rem,7.6vw,8.25rem)] font-semibold leading-[0.86] tracking-[-0.068em] text-[#181818]">
            Every journey leaves
            <span className="block text-black/32">
              something behind.
            </span>
          </h2>

          <p className="mt-8 max-w-2xl text-[15px] leading-[1.8] text-black/52 sm:text-base lg:mt-10 lg:text-lg">
            Discover the experiences of students, educators, researchers,
            mentors and partners whose ideas continue to shape the evolving
            story of Ré.
          </p>
        </div>
{/* 
        <button
          type="button"
          onClick={() => navigateTo('#/people')}
          aria-label="Explore all stories"
          className="group mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem] bg-[#181818] text-white shadow-[0_12px_30px_rgba(24,24,24,0.14)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(24,24,24,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83737] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F2EC] sm:h-14 sm:w-14"
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button> */}
      </div>
    </Reveal>

    <div
      className="
        re-no-scrollbar
        -mx-6 mt-16 flex snap-x snap-mandatory gap-5
        overflow-x-auto overscroll-x-contain px-6 pb-10
        sm:-mx-8 sm:mt-20 sm:px-8
        md:mx-0 md:grid md:grid-cols-2 md:gap-x-7 md:gap-y-14
        md:overflow-visible md:px-0 md:pb-0
        lg:mt-28 lg:grid-cols-4 lg:gap-6 lg:pb-20
        xl:gap-8
      "
    >
      {collageStories.slice(0, 4).map((story, index) => {
        const themes = [
          {
            background: 'bg-[#181818]',
            text: 'text-white',
            secondary: 'text-white/50',
            quote: 'text-white/76',
            badge: 'bg-white/[0.11] text-white',
            imageBackground: 'bg-white/[0.06]',
          },
          {
            background: 'bg-[#F4F2EE]',
            text: 'text-[#181818]',
            secondary: 'text-black/45',
            quote: 'text-black/66',
            badge: 'bg-black/[0.075] text-black/70',
            imageBackground: 'bg-black/[0.045]',
          },
          {
            background: 'bg-[#F5F9D7]',
            text: 'text-[#181818]',
            secondary: 'text-black/45',
            quote: 'text-black/66',
            badge: 'bg-black/[0.08] text-black/70',
            imageBackground: 'bg-black/[0.05]',
          },
          {
            background: 'bg-[#181818]',
            text: 'text-white',
            secondary: 'text-white/50',
            quote: 'text-white/76',
            badge: 'bg-white/[0.11] text-white',
            imageBackground: 'bg-white/[0.06]',
          },
        ] as const;

        const configurations = [
          {
            rotation: -2.2,
            offset: 'lg:translate-y-[44px]',
            height: 'h-[500px]',
            imageHeight: 'h-[160px]',
          },
          {
            rotation: 1.35,
            offset: 'lg:translate-y-[8px]',
            height: 'h-[480px]',
            imageHeight: 'h-[150px]',
          },
          {
            rotation: -1.25,
            offset: 'lg:translate-y-[68px]',
            height: 'h-[500px]',
            imageHeight: 'h-[170px]',
          },
          {
            rotation: 1.8,
            offset: 'lg:-translate-y-[8px]',
            height: 'h-[470px]',
            imageHeight: 'h-[150px]',
          },
        ] as const;

        const theme = themes[index % themes.length];
        const configuration =
          configurations[index % configurations.length];

        const researchArea =
          ('researchArea' in story &&
          typeof story.researchArea === 'string'
            ? story.researchArea
            : '') ||
          ('research_area' in story &&
          typeof story.research_area === 'string'
            ? story.research_area
            : '') ||
          ('area' in story && typeof story.area === 'string'
            ? story.area
            : '');

        return (
          <motion.div
            key={story.collageId ?? story.id}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.18,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.08 + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-[calc(100vw-3rem)] max-w-[360px] shrink-0
              snap-center
              md:w-auto md:max-w-none
            "
          >
            <div className={configuration.offset}>
              <motion.article
                initial={false}
                animate={{
                  rotate: configuration.rotation,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        rotate: configuration.rotation * 0.24,
                        boxShadow:
                          '0 30px 74px rgba(24, 24, 24, 0.15)',
                      }
                }
                whileFocus={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        rotate: configuration.rotation * 0.24,
                        boxShadow:
                          '0 30px 74px rgba(24, 24, 24, 0.15)',
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                tabIndex={0}
                aria-label={`Story from ${story.author}`}
                style={{
                  boxShadow: '0 18px 52px rgba(24, 24, 24, 0.085)',
                }}
                className={`
                  group relative w-full overflow-hidden rounded-[2rem]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#C83737] focus-visible:ring-offset-4
                  focus-visible:ring-offset-[#F5F2EC]
                  ${configuration.height}
                  ${theme.background}
                  ${theme.text}
                `}
              >
                <div className="flex h-full flex-col p-5 sm:p-6">
                  <div className="flex min-h-8 items-start justify-between gap-4">
                    <span
                      className={`
                        flex h-8 min-w-8 items-center justify-center rounded-full
                        px-2.5 font-mono text-[10px] font-bold tracking-[-0.02em]
                        ${theme.badge}
                      `}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {researchArea && (
                      <span
                        className={`
                          max-w-[65%] pt-1 text-right font-mono text-[8px]
                          font-bold uppercase leading-[1.45]
                          tracking-[0.16em] ${theme.secondary}
                        `}
                      >
                        {researchArea}
                      </span>
                    )}
                  </div>

                  <div
                    className={`
                      relative mt-5 shrink-0 overflow-hidden
                      rounded-[1.4rem] ${configuration.imageHeight}
                      ${theme.imageBackground}
                    `}
                  >
                    <img
                      src={story.avatar}
                      alt={story.author}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="
                        h-full w-full object-cover object-center
                        saturate-[0.94]
                        transition-transform duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:scale-[1.02]
                        group-focus-visible:scale-[1.02]
                      "
                    />
                  </div>

                  <div className="mt-5 flex min-h-0 flex-1 flex-col">
                    <h3 className="font-display text-xl font-semibold leading-none tracking-[-0.035em]">
                      {story.author}
                    </h3>

                    <p
                      className={`
                        mt-2 font-mono text-[8px] font-bold uppercase
                        leading-[1.5] tracking-[0.17em]
                        ${theme.secondary}
                      `}
                    >
                      {story.role}
                    </p>

                    <p
                      className={`
                        mt-4 text-[13px] font-medium leading-[1.62]
                        tracking-[-0.01em] sm:text-[13.5px]
                        ${theme.quote}
                      `}
                    >
                      “{story.text}”
                    </p>
                  </div>
                </div>
              </motion.article>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


      {/* 08 — Partnerships */}
      <section id="home-partnerships" className="relative overflow-hidden bg-[#F8F9FA] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-20">
          <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionIndex number="08" label="Partnerships" tone="text-[#1A73E8]" />
              <h2 className="re-text-balance font-display text-[clamp(2.8rem,5.7vw,6.2rem)] font-semibold leading-[0.91] tracking-[-0.058em] text-[#202124]">
                Advancing Research Through Collaboration.
              </h2>
              <p className="mt-7 font-display text-2xl font-semibold tracking-[-0.025em] text-[#3C4043]">Meaningful progress is built together.</p>
            </div>
            <div className="space-y-5 text-base leading-[1.75] text-[#5F6368] sm:text-lg lg:col-span-6 lg:pt-14">
              <p>Ré collaborates with educational institutions, research organizations, healthcare, industry, government, and communities to create opportunities that encourage interdisciplinary learning, strengthen research capacity, and translate ideas into meaningful outcomes.</p>
              <p>Together, we build an ecosystem where knowledge is shared, collaboration is celebrated, and innovation serves society.</p>
              <button onClick={() => navigateTo('#/connect')} className="group inline-flex items-center gap-2 border-b border-black/25 pb-2 text-sm font-bold text-[#202124] transition-colors hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]">
                Partner with Ré
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </Reveal>

        
        </div>
      </section>

      {/* 09 — Final call to action */}
      <section id="home-cta" className="bg-[#F8F9FA] px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="relative mx-auto min-h-[720px] max-w-[1600px] overflow-hidden rounded-[2rem] bg-[#102F22] text-white sm:rounded-[3rem] lg:min-h-[820px]">
          <RiverDeltaBackground />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_34%)]" />
          <div className="relative z-10 flex min-h-[720px] flex-col justify-between p-7 sm:p-12 lg:min-h-[820px] lg:p-20">
            <div className="flex items-center justify-between border-b border-white/15 pb-5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">
              <span>09 / An open invitation</span>
              <span>Begin with Curiosity. Grow with Ré.</span>
            </div>

            <Reveal className="max-w-6xl py-16 lg:py-20">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">Every great journey begins with a single question.</p>
              <h2 className="re-text-balance mt-6 font-display text-[clamp(3.2rem,8vw,8.8rem)] font-semibold leading-[0.87] tracking-[-0.065em]">
                Your Next Question Could Shape Tomorrow.
              </h2>
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/68 sm:text-xl">
                Whether you are a student taking your first step into research, an educator inspiring future scholars, a researcher exploring new frontiers, or an institution committed to advancing knowledge, Ré invites you to become part of a community where curiosity is cultivated, ideas are explored, and research becomes a lifelong pursuit.
              </p>
              <p className="mt-8 font-display text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">Begin with Curiosity. Grow with Ré.</p>
            </Reveal>

            <div className="flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => navigateTo('#/research')}
                className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-[#102F22] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102F22]"
              >
                Explore Ré
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="max-w-[390px] text-xs leading-relaxed text-white/42 sm:text-right">
                At Ré, curiosity is given the environment, direction, and community it needs to become discoveries that shape the world.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-[#4285F4]/20">
      <Header currentHash={currentHash} onNavigate={navigateTo} onSearchOpen={() => setSearchOpen(true)} />

      <main className="flex-grow">{renderView()}</main>

      <Footer onNavigate={navigateTo} />

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} onNavigate={navigateTo} />}

      <AnimatePresence>
        {filmModalOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Ré research film"
            onClick={() => setFilmModalOpen(false)}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
              className="relative w-full max-w-[1100px] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setFilmModalOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close film"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full border-0"
                  src="https://www.youtube.com/embed/c1v8fN7I6Q8?autoplay=1"
                  title="Ré Research Film"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
