import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BatteryCharging,
  BookOpenText,
  Bot,
  CarFront,
  ChevronRight,
  Cpu,
  Dna,
  FlaskConical,
  GraduationCap,
  Leaf,
  Microscope,
  Network,
  PencilRuler,
  Search,
  Sparkles,
  Sprout,
  Users,
  Wind,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type Project = {
  id: string;
  title: string;
  description: string;
  team: string;
  area: string;
  type?: 'Research paper' | 'Research project' | 'Digital platform';
};

type AreaConfig = {
  name: string;
  shortName: string;
  statement: string;
  accent: string;
  wash: string;
  icon: React.ComponentType<{ className?: string }>;
};

const AREA_CONFIG: AreaConfig[] = [
  {
    name: 'Agriculture Research Circle',
    shortName: 'Agriculture',
    statement: 'Research for more precise, productive, and sustainable cultivation.',
    accent: '#557A46',
    wash: '#EEF3EA',
    icon: Sprout,
  },
  {
    name: 'Educational Research Circle',
    shortName: 'Education',
    statement: 'Inclusive learning experiences shaped through research and technology.',
    accent: '#496C92',
    wash: '#EDF2F7',
    icon: GraduationCap,
  },
  {
    name: 'Environmental Science & Sustainable Systems',
    shortName: 'Environment',
    statement: 'Materials and systems designed around circularity and lower impact.',
    accent: '#3F7765',
    wash: '#EAF3EF',
    icon: Leaf,
  },
  {
    name: 'Automotive Research – Mechanical',
    shortName: 'Automotive · Mechanical',
    statement: 'Mechanical mobility systems developed through design and validation.',
    accent: '#8A6048',
    wash: '#F4EEE9',
    icon: CarFront,
  },
  {
    name: 'Automotive Research – Electrical',
    shortName: 'Automotive · Electrical',
    statement: 'Autonomous and electrical systems for mobility and material movement.',
    accent: '#8B6D31',
    wash: '#F6F1E5',
    icon: Bot,
  },
  {
    name: 'Automotive Research – Software',
    shortName: 'Automotive · Software',
    statement: 'Digital systems supporting the wider research ecosystem.',
    accent: '#536B8C',
    wash: '#EDF0F5',
    icon: Cpu,
  },
  {
    name: 'Bioscience Research',
    shortName: 'Bioscience',
    statement: 'Biological research addressing health, food, agriculture, and materials.',
    accent: '#7A4F72',
    wash: '#F3EDF2',
    icon: Dna,
  },
  {
    name: 'Power Conversion & Storage (PCS)',
    shortName: 'Power Conversion & Storage',
    statement: 'Energy-storage systems engineered for demanding applications.',
    accent: '#765C2D',
    wash: '#F4F0E6',
    icon: BatteryCharging,
  },
  {
    name: 'Centre of Excellence – Design Research',
    shortName: 'Design Research',
    statement: 'Research that strengthens engineering design education and practice.',
    accent: '#7B5C45',
    wash: '#F2ECE8',
    icon: PencilRuler,
  },
  {
    name: 'Renewable Energy',
    shortName: 'Renewable Energy',
    statement: 'Research advancing energy extraction, conversion, and grid integration.',
    accent: '#3E6F70',
    wash: '#EAF2F2',
    icon: Wind,
  },
];

const PROJECTS: Project[] = [
  {
    id: 'smart-agriculture-iot-robotics',
    title: 'Smart Agriculture – IoT & Robotics',
    description:
      'Application of IoT sensors for real-time monitoring of soil, crops, and environmental conditions; use of robotics for automation in planting, monitoring, and precision farming; and data-driven decision-making to improve productivity, efficiency, and sustainability.',
    team: 'Agriculture Research Circle Team',
    area: 'Agriculture Research Circle',
    type: 'Research paper',
  },
  {
    id: 'automatic-transplanter',
    title: 'Automatic Transplanter for Urban & Sustainable Farming',
    description:
      'Automated transplanting system aimed at reducing manual labour, improving planting precision, and enhancing overall planting efficiency.',
    team: 'Agriculture Research Circle Team',
    area: 'Agriculture Research Circle',
    type: 'Research project',
  },
  {
    id: 'hearmenow',
    title: 'HeaRmeNow – Assistive Learning Solution',
    description:
      'Assistive educational technology addressing hearing-related learning challenges through real-time captioning and inclusive classroom support.',
    team: 'Nandeeswaran K, Rengha Shree, Hemavarshini',
    area: 'Educational Research Circle',
    type: 'Research project',
  },
  {
    id: 'rice-husk-composite',
    title: 'Rice Husk Composite (“Rice Space Composite”)',
    description:
      'Development of a rice husk-based composite material aligned with circular economy principles and scalable sustainable applications.',
    team: 'Environmental Research Circle Team',
    area: 'Environmental Science & Sustainable Systems',
    type: 'Research project',
  },
  {
    id: 'green-sustainable-concrete',
    title: 'Green & Sustainable Concrete',
    description:
      'Research on environmentally friendly concrete alternatives to reduce the carbon footprint of conventional construction materials.',
    team: 'Environmental Research Circle Team',
    area: 'Environmental Science & Sustainable Systems',
    type: 'Research project',
  },
  {
    id: 'compact-electric-trike',
    title: 'Compact Electric Trike for Green Campus Mobility',
    description:
      'Sustainable electric mobility solution focusing on compact design, structural efficiency, and eco-friendly propulsion.',
    team: 'Srihari, Harish Kumar',
    area: 'Automotive Research – Mechanical',
    type: 'Research project',
  },
  {
    id: 'aakruthi-research-paper',
    title: 'Aakruthi Research Work',
    description:
      'Conversion of Aakruthi Design Challenge work into a structured research paper.',
    team: 'Visva, Shruthi',
    area: 'Automotive Research – Mechanical',
    type: 'Research paper',
  },
  {
    id: 'autonomous-load-carrying-bot',
    title: 'Autonomous Load-Carrying Bot',
    description:
      'Sensor-based autonomous robot designed for material handling and collaborative industrial applications through a KCIRI collaboration.',
    team: 'Surya Akash, Dharaneesh, Nirmal, Srinaya, Gokul, Subinsha',
    area: 'Automotive Research – Electrical',
    type: 'Research project',
  },
  {
    id: 're-website-development',
    title: 'Ré Website Development',
    description:
      'Design and development of the official digital platform for the Ré Research Cell.',
    team: 'Karthi',
    area: 'Automotive Research – Software',
    type: 'Digital platform',
  },
  {
    id: 'crispr-cas9-grna',
    title: 'CRISPR–Cas9 gRNA System with Cas9 Inhibitor',
    description:
      'Design of a novel CRISPR system with post-editing Cas9 deactivation to improve gene-editing control.',
    team: 'Bioscience Research Team',
    area: 'Bioscience Research',
    type: 'Research project',
  },
  {
    id: 'onion-shelf-life',
    title: 'Improving Shelf Life of Onion',
    description:
      'Research focused on reducing post-harvest losses and improving food security.',
    team: 'Bioscience Research Team',
    area: 'Bioscience Research',
    type: 'Research project',
  },
  {
    id: 'diabetic-wound-scaffolds',
    title: 'Scaffolds for Diabetic Wound Healing',
    description:
      'Development of a sustainable, coconut-water-based dual-layer scaffold to promote tissue regeneration.',
    team: 'Bioscience Research Team',
    area: 'Bioscience Research',
    type: 'Research project',
  },
  {
    id: 'thermal-cocoon',
    title: 'Thermal Cocoon',
    description:
      'Interdisciplinary textile-based solution for body temperature regulation.',
    team: 'Bioscience & Textile Team',
    area: 'Bioscience Research',
    type: 'Research project',
  },
  {
    id: 'panchagavyam-phyto-biobricks',
    title: 'Panchagavyam Phyto-Biobricks',
    description:
      'Development of nutrient- and microbe-enriched biobricks for sustainable agriculture applications.',
    team: 'Bioscience Research Team',
    area: 'Bioscience Research',
    type: 'Research project',
  },
  {
    id: 'mars-rover-battery',
    title: 'Mars Rover Battery Design & Fabrication',
    description:
      'Design and fabrication of a battery system suitable for extraterrestrial rover applications.',
    team: 'PCS Team',
    area: 'Power Conversion & Storage (PCS)',
    type: 'Research project',
  },
  {
    id: 'design-curriculum-framework',
    title: 'Design Curriculum Framework',
    description:
      'Development of an industry-aligned design curriculum covering the complete engineering design lifecycle.',
    team: 'Centre of Excellence – Design Research Team',
    area: 'Centre of Excellence – Design Research',
    type: 'Research project',
  },
  {
    id: 'renewable-hosting-capacity',
    title: 'Renewable Energy Hosting Capacity Improvement',
    description:
      'Power-quality and hosting-capacity enhancement in distribution feeders based on a Kerala Government SIH problem statement.',
    team: 'Renewable Energy Team',
    area: 'Renewable Energy',
    type: 'Research project',
  },
  {
    id: 'wind-turbine-blade',
    title: 'Wind Turbine Blade Prototyping',
    description:
      'Design and fabrication of optimized small-scale wind turbine blades.',
    team: 'Renewable Energy Team',
    area: 'Renewable Energy',
    type: 'Research project',
  },
  {
    id: 'mppt-system',
    title: 'MPPT System Development',
    description:
      'Development of maximum power point tracking systems for improved renewable energy extraction.',
    team: 'Renewable Energy Team',
    area: 'Renewable Energy',
    type: 'Research project',
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
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.58,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectVisual({
  area,
  title,
  index,
}: {
  area: AreaConfig;
  title: string;
  index: number;
}) {
  const Icon = area.icon;

  return (
    <div
      className="relative min-h-[220px] overflow-hidden rounded-[24px]"
      style={{ backgroundColor: area.wash }}
      aria-hidden="true"
    >
      <div
        className="absolute -right-16 -top-20 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: `${area.accent}2B` }}
      />
      <div
        className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: `${area.accent}20` }}
      />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `linear-gradient(${area.accent}25 1px, transparent 1px), linear-gradient(90deg, ${area.accent}25 1px, transparent 1px)`,
          backgroundSize: '34px 34px',
        }}
      />
      <div className="absolute inset-5 rounded-[18px] border border-white/70 bg-white/35 backdrop-blur-[2px]" />

      <div className="relative flex h-full min-h-[220px] flex-col justify-between p-8">
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: area.accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div
            className="grid h-11 w-11 place-items-center rounded-full border border-white/75 bg-white/65"
            style={{ color: area.accent }}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <p className="max-w-[16rem] text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#19201D]">
          {title}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const area = AREA_CONFIG.find((item) => item.name === project.area) ?? AREA_CONFIG[0];

  return (
    <Reveal delay={(index % 3) * 0.05}>
      <article className="group flex h-full flex-col rounded-[30px] border border-[#D9DDD8] bg-white p-3 shadow-[0_22px_50px_rgba(25,41,34,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(25,41,34,0.1)]">
        <ProjectVisual area={area} title={project.title} index={index} />

        <div className="flex flex-1 flex-col px-3 pb-3 pt-6 sm:px-5 sm:pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.17em]"
              style={{ backgroundColor: area.wash, color: area.accent }}
            >
              {area.shortName}
            </span>
            {project.type && (
              <span className="rounded-full border border-[#DDE1DD] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.17em] text-[#727872]">
                {project.type}
              </span>
            )}
          </div>

          <h3 className="mt-5 text-[24px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#141815]">
            {project.title}
          </h3>

          <p className="mt-4 line-clamp-3 text-[14px] leading-6 text-[#626A64]">
            {project.description}
          </p>

          <div className="mt-auto flex items-end justify-between gap-5 border-t border-[#EAEBE8] pt-5">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#999F99]">
                Research team
              </p>
              <p className="mt-1 line-clamp-2 text-xs font-medium leading-5 text-[#444B45]">
                {project.team}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpen(project)}
              className="group/button inline-flex shrink-0 items-center gap-2 rounded-full border border-[#CCD2CD] px-4 py-2.5 text-xs font-semibold text-[#1D2922] transition hover:border-[#183D2A] hover:bg-[#183D2A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2A] focus-visible:ring-offset-2"
              aria-label={`View details for ${project.title}`}
            >
              View
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ProjectsPage() {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [activeArea, setActiveArea] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const matchesArea = activeArea === 'All' || project.area === activeArea;
      const matchesQuery =
        !normalizedQuery ||
        [project.title, project.description, project.team, project.area, project.type]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery));

      return matchesArea && matchesQuery;
    });
  }, [activeArea, query]);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedProject]);

  const selectedArea = selectedProject
    ? AREA_CONFIG.find((item) => item.name === selectedProject.area) ?? AREA_CONFIG[0]
    : AREA_CONFIG[0];

  const scrollToProjects = () => {
    document
      .getElementById('project-portfolio')
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <main className="overflow-hidden bg-[#F4F3EE] text-[#151A16] selection:bg-[#315E48]/20">
      {/* <section className="relative overflow-hidden bg-[#10251B] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(117,167,133,0.22),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(198,153,95,0.16),transparent_32%)]" />
        <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.11)_1px,transparent_1px)] [background-size:58px_58px]" />

        <div className="relative mx-auto grid min-h-[760px] max-w-[1500px] grid-cols-1 items-center gap-14 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-20">
          <div className="max-w-4xl">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45 }}
              className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9FD0AD]"
            >
              Ré · Research portfolio
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.04 }}
              className="mt-6 max-w-4xl text-[52px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-[88px]"
            >
              Research made visible.
              <span className="mt-2 block font-serif font-normal italic text-white/48">
                Questions becoming contribution.
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: 0.1 }}
              className="mt-8 max-w-2xl text-base leading-8 text-white/62 sm:text-lg"
            >
              Explore the projects taking shape across Ré—from sustainable materials and
              assistive learning to bioscience, autonomous systems, design research, and
              renewable energy.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: 0.16 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#10251B] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#10251B]"
              >
                Explore the portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <span className="rounded-full border border-white/14 bg-white/[0.05] px-4 py-3 text-xs font-medium text-white/62 backdrop-blur">
                {PROJECTS.length} documented projects · {AREA_CONFIG.length} research areas
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.12 }}
            className="relative hidden min-h-[510px] lg:block"
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/12" />

            <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.07] backdrop-blur">
              <div className="text-center">
                <Microscope className="mx-auto h-7 w-7 text-[#A5D0B1]" />
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">
                  One research
                  <span className="block">ecosystem</span>
                </p>
              </div>
            </div>

            {AREA_CONFIG.slice(0, 8).map((area, index) => {
              const Icon = area.icon;
              const positions = [
                'left-[3%] top-[10%]',
                'right-[2%] top-[7%]',
                'right-[-2%] top-[40%]',
                'right-[8%] bottom-[5%]',
                'left-[40%] bottom-[-2%]',
                'left-[3%] bottom-[8%]',
                'left-[-2%] top-[42%]',
                'left-[35%] top-[-2%]',
              ];

              return (
                <motion.div
                  key={area.name}
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, index % 2 === 0 ? -7 : 7, 0] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 5.5 + index * 0.35,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                  }
                  className={`absolute ${positions[index]} w-[170px] rounded-[22px] border border-white/12 bg-[#173226]/78 p-4 shadow-2xl backdrop-blur`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full"
                      style={{ backgroundColor: `${area.accent}55` }}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-xs font-semibold leading-4 text-white/82">
                      {area.shortName}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section> */}

      <section className="border-b border-[#D9DDD8] bg-[#ECEDE7]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-20">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#426B54]">
              The portfolio
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">
              Different disciplines.
              <span className="block font-serif font-normal italic text-[#778078]">
                A shared culture of inquiry.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:pt-8">
            <p className="max-w-2xl text-[15px] leading-7 text-[#5F6861]">
              This page is an overview of current research work represented across the Ré
              ecosystem. Every project is shown through its question, research area, and
              contributing team—without reducing the work to a generic status label.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="project-portfolio"
        className="scroll-mt-20 px-6 py-20 lg:px-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#426B54]">
                Explore projects
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
                Research across Ré
              </h2>
            </div>

            <label className="relative block w-full max-w-md">
              <span className="sr-only">Search projects</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A827C]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, teams, or research areas"
                className="h-13 w-full rounded-full border border-[#CDD2CD] bg-white pl-11 pr-5 text-sm text-[#1B211C] outline-none transition placeholder:text-[#969C97] focus:border-[#315E48] focus:ring-4 focus:ring-[#315E48]/10"
              />
            </label>
          </div>

          <div className="mt-10 flex gap-2 overflow-x-auto pb-3">
            <button
              type="button"
              onClick={() => setActiveArea('All')}
              aria-pressed={activeArea === 'All'}
              className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315E48] ${
                activeArea === 'All'
                  ? 'bg-[#173D2A] text-white'
                  : 'border border-[#D2D6D2] bg-white text-[#5B635D] hover:border-[#879189]'
              }`}
            >
              All projects
              <span className="ml-2 opacity-55">{PROJECTS.length}</span>
            </button>

            {AREA_CONFIG.map((area) => {
              const count = PROJECTS.filter((project) => project.area === area.name).length;
              const active = activeArea === area.name;

              return (
                <button
                  key={area.name}
                  type="button"
                  onClick={() => setActiveArea(area.name)}
                  aria-pressed={active}
                  className="shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315E48]"
                  style={{
                    borderColor: active ? area.accent : '#D2D6D2',
                    backgroundColor: active ? area.wash : '#FFFFFF',
                    color: active ? area.accent : '#5B635D',
                  }}
                >
                  {area.shortName}
                  <span className="ml-2 opacity-55">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-12 flex items-center justify-between border-b border-[#D8DCD7] pb-5">
            <p className="text-sm text-[#69716B]" aria-live="polite">
              Showing <span className="font-semibold text-[#202721]">{filteredProjects.length}</span>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>

            {(query || activeArea !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveArea('All');
                }}
                className="text-xs font-semibold text-[#315E48] underline decoration-[#315E48]/25 underline-offset-4 hover:decoration-[#315E48]"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[30px] border border-dashed border-[#C8CEC9] bg-white px-6 py-20 text-center">
              <Search className="mx-auto h-7 w-7 text-[#7B847D]" />
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                No matching projects
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6A726C]">
                Try a broader research area or search using a project topic, team name, or
                discipline.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveArea('All');
                }}
                className="mt-6 rounded-full bg-[#173D2A] px-5 py-3 text-xs font-semibold text-white"
              >
                View the complete portfolio
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-20 lg:pb-28">
        <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[38px] bg-[#DCE5DC]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.72fr]">
            <div className="p-9 sm:p-14 lg:p-16">
              <Sparkles className="h-6 w-6 text-[#315E48]" />
              <h2 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
                Research grows through people, disciplines, and shared questions.
              </h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#58645B]">
                The portfolio will continue to evolve as projects develop and new work enters
                the Ré ecosystem. Project details should be updated from verified research
                records rather than inferred from incomplete information.
              </p>
            </div>

            <div className="relative min-h-[320px] overflow-hidden bg-[#173D2A] p-9 text-white sm:p-12 lg:min-h-full">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/8 blur-3xl" />
              <Network className="relative h-7 w-7 text-[#A7D0B2]" />
              <p className="relative mt-9 text-[10px] font-bold uppercase tracking-[0.23em] text-white/43">
                Research is collaborative
              </p>
              <p className="relative mt-4 max-w-md text-2xl font-semibold leading-snug tracking-[-0.025em]">
                Every project is connected to a team, a research context, and a larger body of
                inquiry.
              </p>
              <div className="relative mt-10 flex items-center gap-3 text-sm text-white/58">
                <Users className="h-4 w-4" />
                <span>{PROJECTS.length} projects represented on this page</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[90] bg-[#08100B]/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setSelectedProject(null);
            }}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-detail-title"
              initial={reduceMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 40 }}
              transition={{ duration: reduceMotion ? 0 : 0.28 }}
              className="ml-auto flex h-full w-full max-w-[720px] flex-col overflow-y-auto bg-[#F5F4EF] shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D9DDD8] bg-[#F5F4EF]/92 px-6 py-5 backdrop-blur sm:px-9">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7B837D]">
                    Project detail
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#242B25]">
                    Ré research portfolio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#CDD2CD] bg-white text-[#444C46] transition hover:bg-[#173D2A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173D2A]"
                  aria-label="Close project details"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 sm:p-9">
                <ProjectVisual area={selectedArea} title={selectedProject.title} index={0} />

                <div className="mt-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.17em]"
                      style={{
                        backgroundColor: selectedArea.wash,
                        color: selectedArea.accent,
                      }}
                    >
                      {selectedArea.shortName}
                    </span>
                    {selectedProject.type && (
                      <span className="rounded-full border border-[#D7DBD7] bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.17em] text-[#6B736D]">
                        {selectedProject.type}
                      </span>
                    )}
                  </div>

                  <h2
                    id="project-detail-title"
                    className="mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl"
                  >
                    {selectedProject.title}
                  </h2>

                  <p className="mt-7 text-base leading-8 text-[#5C655E]">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-[#D8DCD8] bg-white p-6">
                    <BookOpenText className="h-5 w-5" style={{ color: selectedArea.accent }} />
                    <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.19em] text-[#949A95]">
                      Research area
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#252C26]">
                      {selectedProject.area}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[#D8DCD8] bg-white p-6">
                    <Users className="h-5 w-5" style={{ color: selectedArea.accent }} />
                    <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.19em] text-[#949A95]">
                      Contributors
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#252C26]">
                      {selectedProject.team}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-4 rounded-[24px] p-6"
                  style={{ backgroundColor: selectedArea.wash }}
                >
                  <FlaskConical className="h-5 w-5" style={{ color: selectedArea.accent }} />
                  <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.19em] text-[#777F79]">
                    Research context
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#4E5851]">
                    {selectedArea.statement}
                  </p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}