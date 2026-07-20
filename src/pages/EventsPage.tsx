import React, { useEffect, useMemo, useState } from 'react';
import { EVENTS } from '../data';
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Globe2,
  MapPin,
  Mic2,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type SourceEvent = (typeof EVENTS)[number];
type EventStatus = 'Open' | 'Closing Soon' | 'Upcoming' | 'Past';

type DisplayEvent = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  date: string;
  month: string;
  venue: string;
  category: string;
  status: EventStatus;
  image: string;
  href: string;
};


const EVENT_IMAGES: Record<string, string> = {
  'event-icon-2026':
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=85&w=1600&auto=format&fit=crop',
  'event-talk-epigraphy':
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=85&w=1600&auto=format&fit=crop',
  'event-workshop-composites':
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=85&w=1600&auto=format&fit=crop',
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=85&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=85&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=85&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=85&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581093458791-9d42e3c8a12b?q=85&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560523159-4a9692d222ef?q=85&w=1600&auto=format&fit=crop',
];

const CATEGORIES = [
  'All',
  'Conferences',
  'Research Talks',
  'Hackathons',
  'Workshops',
  'Competitions',
  'Bootcamps',
  'Faculty Programs',
] as const;

const FEATURED_EVENTS: DisplayEvent[] = [
  {
    id: 'event-icon-2026',
    title: 'ICON 2026',
    eyebrow: 'International Conference',
    description:
      'A global gathering on sustainable agricultural materials, circular engineering and research-led industry transformation.',
    date: '18–20 September 2026',
    month: 'September',
    venue: 'Kumaraguru Campus + Live',
    category: 'Conferences',
    status: 'Open',
    image: EVENT_IMAGES['event-icon-2026'],
    href: '/events/event-icon-2026',
  },
  {
    id: 'research-week-2026',
    title: 'Research Week',
    eyebrow: 'Interdisciplinary Showcase',
    description:
      'A week of student papers, live demonstrations, poster reviews and conversations across research circles.',
    date: '03–07 August 2026',
    month: 'August',
    venue: 'Ré Research Commons',
    category: 'Competitions',
    status: 'Closing Soon',
    image: FALLBACK_IMAGES[1],
    href: '/events/research-week-2026',
  },
  {
    id: 'coffee-table-talks-2026',
    title: 'Coffee Table Talks',
    eyebrow: 'Research Conversation Series',
    description:
      'Small-room conversations where researchers unpack unfinished ideas, methods, failures and unexpected findings.',
    date: 'Monthly · 2026',
    month: 'Monthly',
    venue: 'Ré Forum Studio',
    category: 'Research Talks',
    status: 'Upcoming',
    image: FALLBACK_IMAGES[2],
    href: '/events/coffee-table-talks-2026',
  },
];

const ARCHIVE_BY_YEAR: Record<number, string[]> = {
  2026: [
    'ICON 2026',
    'Research Week',
    'Coffee Table Talks',
    'Materials Workshop',
    'AI Research Summit',
    'Faculty Research Colloquium',
  ],
  2025: [
    'Research Week',
    'Coffee Table Talks',
    'Open Research Hackathon',
    'Research Symposium',
    'Design for Discovery Workshop',
  ],
  2024: [
    'Future Materials Conference',
    'Student Research Congress',
    'Applied AI Bootcamp',
    'Public Research Dialogue',
  ],
};

const YEAR_COUNTS: Record<number, number> = {
  2026: 18,
  2025: 24,
  2024: 19,
};

const GALLERY = [
  {
    image: FALLBACK_IMAGES[0],
    label: 'Research talks',
    className: 'aspect-[4/5]',
  },
  {
    image: FALLBACK_IMAGES[4],
    label: 'Prototype reviews',
    className: 'aspect-[4/3]',
  },
  {
    image: FALLBACK_IMAGES[2],
    label: 'Student teams',
    className: 'aspect-square',
  },
  {
    image: FALLBACK_IMAGES[1],
    label: 'Conference stages',
    className: 'aspect-[3/4]',
  },
  {
    image: FALLBACK_IMAGES[5],
    label: 'Poster presentations',
    className: 'aspect-[4/3]',
  },
  {
    image: FALLBACK_IMAGES[3],
    label: 'Networking',
    className: 'aspect-[4/5]',
  },
];

const OUTCOMES = [
  'Publications',
  'Networking',
  'Research Exposure',
  'Certifications',
  'Competitions',
  'Funding Opportunities',
  'Industry Mentorship',
  'International Visibility',
];

const STATS = [
  { value: '10', suffix: 'Years', label: 'Building research culture' },
  { value: '250+', suffix: 'Events', label: 'Across formats and disciplines' },
  { value: '18', suffix: 'Research Circles', label: 'Connected by shared inquiry' },
  { value: '6000+', suffix: 'Participants', label: 'Students, faculty and partners' },
  { value: '120+', suffix: 'Speakers', label: 'From academia and industry' },
  { value: '42+', suffix: 'Research Projects', label: 'Presented through Ré events' },
];

function parseYear(value: string): number {
  const match = value.match(/20\d{2}/);
  return match ? Number(match[0]) : 2026;
}

function getSourceImage(event: SourceEvent, index: number): string {
  return EVENT_IMAGES[event.id] ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function normalizeCategory(type: string): string {
  const value = type.toLowerCase();
  if (value.includes('conference') || value.includes('summit')) return 'Conferences';
  if (value.includes('talk') || value.includes('seminar') || value.includes('forum')) return 'Research Talks';
  if (value.includes('hack')) return 'Hackathons';
  if (value.includes('workshop')) return 'Workshops';
  if (value.includes('competition') || value.includes('challenge')) return 'Competitions';
  if (value.includes('bootcamp')) return 'Bootcamps';
  if (value.includes('faculty')) return 'Faculty Programs';
  return 'Conferences';
}

function sourceToDisplay(event: SourceEvent, index: number): DisplayEvent {
  const category = normalizeCategory(event.type ?? 'Conference');
  return {
    id: event.id,
    title: event.title,
    eyebrow: event.type ?? category,
    description: event.description,
    date: event.date,
    month: event.date.split(' ')[0] || 'Upcoming',
    venue: event.venue,
    category,
    status: event.status === 'past' ? 'Past' : index === 1 ? 'Closing Soon' : 'Open',
    image: getSourceImage(event, index),
    href: `/events/${event.id}`,
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-09-18T09:00:00+05:30').getTime();

    const update = () => {
      const difference = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(difference / 86_400_000),
        hours: Math.floor((difference % 86_400_000) / 3_600_000),
        minutes: Math.floor((difference % 3_600_000) / 60_000),
        seconds: Math.floor((difference % 60_000) / 1000),
      });
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Countdown to ICON 2026">
      {[
        ['Days', timeLeft.days],
        ['Hrs', timeLeft.hours],
        ['Min', timeLeft.minutes],
        ['Sec', timeLeft.seconds],
      ].map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-black/10 bg-white/75 px-3 py-3 text-center backdrop-blur-md">
          <span className="block text-xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-2xl">
            {String(value).padStart(2, '0')}
          </span>
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E94B35]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-[#171717] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-7 text-black/55 sm:text-lg">{description}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: EventStatus }) {
  const styles: Record<EventStatus, string> = {
    Open: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    'Closing Soon': 'border-orange-200 bg-orange-50 text-orange-700',
    Upcoming: 'border-black/10 bg-white/90 text-black/65',
    Past: 'border-black/10 bg-black/[0.04] text-black/45',
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${styles[status]}`}>
      {status}
    </span>
  );
}

function EventCard({ event, large = false }: { event: DisplayEvent; large?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
    >
      <a href={event.href} className="block">
        <div className={`relative overflow-hidden ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          <div className="absolute left-5 top-5">
            <StatusBadge status={event.status} />
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
            <span className="text-xs font-medium uppercase tracking-[0.17em] text-white/75">{event.category}</span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-105">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className={large ? 'p-7 sm:p-8' : 'p-6'}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E94B35]">{event.eyebrow}</p>
          <h3 className={`mt-3 font-semibold tracking-[-0.045em] text-[#171717] ${large ? 'text-3xl' : 'text-2xl'}`}>
            {event.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/55">{event.description}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/10 pt-5 text-xs font-medium text-black/50">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#E94B35]" />
              {event.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#E94B35]" />
              {event.venue}
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

function RegistrationCard({ event }: { event: DisplayEvent }) {
  return (
    <motion.a
      href={event.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="group grid gap-5 rounded-[32px] border border-black/10 bg-white p-4 shadow-[0_12px_45px_rgba(0,0,0,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)] md:grid-cols-[220px_1fr_auto] md:items-center md:p-5"
    >
      <div className="aspect-[16/10] overflow-hidden rounded-[22px] bg-black/5">
        <img
          src={event.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="px-1 md:px-3">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={event.status} />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">{event.month}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#171717]">{event.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">{event.description}</p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-black/10 px-1 pt-4 md:border-l md:border-t-0 md:px-6 md:pt-0">
        <span className="text-sm font-semibold text-[#171717]">Register</span>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#171717] text-white transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </motion.a>
  );
}

function ArchiveAccordion({ year }: { year: number }) {
  const [open, setOpen] = useState(year === 2026);
  const events = ARCHIVE_BY_YEAR[year] ?? [];

  return (
    <div className="border-t border-black/15 last:border-b">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left sm:py-9"
        aria-expanded={open}
      >
        <div className="flex items-end gap-5 sm:gap-8">
          <span className="text-4xl font-semibold tracking-[-0.05em] text-[#171717] sm:text-6xl">{year}</span>
          <span className="pb-1 text-sm font-medium text-black/40">{YEAR_COUNTS[year] ?? events.length} Events</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold text-[#171717]">
          <span>{open ? 'Close' : 'View'}</span>
          <span className={`grid h-11 w-11 place-items-center rounded-full border border-black/10 transition-transform duration-300 ${open ? 'rotate-180 bg-black text-white' : 'bg-white group-hover:bg-black group-hover:text-white'}`}>
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-x-10 gap-y-0 pb-8 md:grid-cols-2">
              {events.map((event, index) => (
                <a
                  href={`/events/archive/${year}/${index + 1}`}
                  key={event}
                  className="group flex items-center justify-between border-t border-black/10 py-5 first:border-t-0 md:first:border-t"
                >
                  <span className="text-base font-medium text-black/65 transition-colors group-hover:text-[#E94B35]">{event}</span>
                  <ArrowRight className="h-4 w-4 text-black/25 transition-all group-hover:translate-x-1 group-hover:text-[#E94B35]" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');

  const sourceEvents = useMemo(() => EVENTS.map(sourceToDisplay), []);
  const upcomingSourceEvents = sourceEvents.filter((event) => event.status !== 'Past');

  const filteredFeatured = useMemo(() => {
    const combined = [...FEATURED_EVENTS, ...upcomingSourceEvents].filter(
      (event, index, collection) => collection.findIndex((item) => item.id === event.id) === index,
    );

    if (activeCategory === 'All') return combined.slice(0, 6);
    return combined.filter((event) => event.category === activeCategory).slice(0, 6);
  }, [activeCategory, upcomingSourceEvents]);

  const eventsByYear = useMemo(() => {
    const grouped: Record<number, { current: DisplayEvent[]; upcoming: DisplayEvent[]; past: DisplayEvent[] }> = {};

    sourceEvents.forEach((event) => {
      const year = parseYear(event.date);
      if (!grouped[year]) grouped[year] = { current: [], upcoming: [], past: [] };

      if (event.status === 'Past') grouped[year].past.push(event);
      else if (event.status === 'Closing Soon') grouped[year].current.push(event);
      else grouped[year].upcoming.push(event);
    });

    if (!grouped[2026]) grouped[2026] = { current: [], upcoming: [], past: [] };
    grouped[2026].current = [FEATURED_EVENTS[1], ...grouped[2026].current];
    grouped[2026].upcoming = [FEATURED_EVENTS[0], FEATURED_EVENTS[2], ...grouped[2026].upcoming];

    return grouped;
  }, [sourceEvents]);

  const timelineYears = Array.from(new Set([2026, 2025, 2024, ...Object.keys(eventsByYear).map(Number)])).sort(
    (a, b) => b - a,
  );

  return (
    <main className="min-h-screen overflow-hidden bg-white font-sans text-[#171717] selection:bg-[#E94B35]/20">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pb-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[#E94B35]/10 blur-3xl" />
        <div className="pointer-events-none absolute left-[36%] top-10 h-72 w-72 rounded-full bg-orange-100/80 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1500px] gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#E94B35]" />
              Research Events
            </div>

            <h1 className="mt-7 text-[clamp(4rem,8vw,8.4rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Ideas deserve
              <span className="block text-[#E94B35]">a stage.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-black/55 sm:text-xl">
              Conferences. Hackathons. Research talks. Workshops. Competitions. Innovation challenges.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#featured-events"
                className="group inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Explore Events
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
              <a
                href="/events/host"
                className="group inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#171717] transition-colors hover:border-[#E94B35] hover:text-[#E94B35]"
              >
                Host with Ré
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.a
            href="/events/event-icon-2026"
            initial={{ opacity: 0, x: 35, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative min-h-[620px] overflow-hidden rounded-[36px] border border-black/10 bg-[#F5F2EE] shadow-[0_30px_100px_rgba(0,0,0,0.13)]"
          >
            <img
              src={EVENT_IMAGES['event-icon-2026']}
              alt="ICON 2026 conference"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/85" />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-8">
              <StatusBadge status="Open" />
              <div className="rounded-full border border-white/30 bg-black/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                320 Seats
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">International Conference on</p>
              <h2 className="mt-3 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">ICON 2026</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                Sustainable agricultural materials, circular engineering and research-led industrial transformation.
              </p>

              <div className="mt-7 grid gap-4 border-t border-white/20 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-white/70">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#FF8D7D]" />
                      18 Sept 2026
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#FF8D7D]" />
                      Kumaraguru Campus
                    </span>
                  </div>
                  <div className="mt-5 max-w-md">
                    <Countdown />
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Register
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="border-b border-black/10 py-10 sm:py-12">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 sm:px-6 ${
                    active
                      ? 'border-[#171717] bg-[#171717] text-white shadow-lg'
                      : 'border-black/10 bg-white text-black/60 hover:-translate-y-0.5 hover:border-black/30 hover:text-black'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section id="featured-events" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured Events"
              title="Current registrations. Serious opportunities."
              description="Explore major conferences, research showcases and conversations currently open across Ré."
            />
            <a href="/events/all" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#171717]">
              View all events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div layout className="mt-12 grid gap-7 lg:grid-cols-3">
              {filteredFeatured.length > 0 ? (
                filteredFeatured.slice(0, 3).map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full rounded-[32px] border border-dashed border-black/15 bg-black/[0.02] px-6 py-20 text-center"
                >
                  <p className="text-lg font-semibold">No events in this category yet.</p>
                  <p className="mt-2 text-sm text-black/45">Choose another category to continue exploring.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CURRENT REGISTRATIONS */}
      <section className="border-y border-black/10 bg-[#F7F5F2] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            eyebrow="Current Registrations"
            title="Register now. Plan the details later."
            description="The listing remains focused on discovery. Registration, agenda, speakers and FAQs live on each event page."
          />

          <div className="mt-12 space-y-5">
            {FEATURED_EVENTS.slice(0, 2).map((event) => (
              <RegistrationCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS BY YEAR */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            eyebrow="Events by Year"
            title="A living record of research in motion."
            description="Current, upcoming and completed events remain visible as part of Ré’s institutional research history."
          />

          <div className="mt-16 space-y-16">
            {timelineYears.slice(0, 4).map((year) => {
              const group = eventsByYear[year] ?? { current: [], upcoming: [], past: [] };
              const current = group.current.slice(0, 3);
              const upcoming = group.upcoming.slice(0, 4);
              const past = group.past.slice(0, 4);

              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className="grid gap-8 border-t border-black/15 pt-8 lg:grid-cols-[220px_1fr] lg:gap-14"
                >
                  <div className="lg:sticky lg:top-8 lg:self-start">
                    <div className="text-6xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-7xl">{year}</div>
                    <div className="mt-4 h-1 w-16 rounded-full bg-[#E94B35]" />
                  </div>

                  <div className="grid gap-10 md:grid-cols-3">
                    {[
                      ['Current Events', current],
                      ['Upcoming', upcoming],
                      ['Past', past],
                    ].map(([label, events]) => (
                      <div key={label as string}>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">{label as string}</h3>
                        <div className="mt-5 space-y-0">
                          {(events as DisplayEvent[]).length > 0 ? (
                            (events as DisplayEvent[]).map((event) => (
                              <a
                                href={event.href}
                                key={`${label}-${event.id}`}
                                className="group flex items-center justify-between gap-4 border-t border-black/10 py-4 first:border-t-0"
                              >
                                <div>
                                  <p className="font-medium text-black/70 transition-colors group-hover:text-[#E94B35]">{event.title}</p>
                                  <p className="mt-1 text-xs text-black/35">{event.date}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 shrink-0 text-black/20 transition-all group-hover:translate-x-1 group-hover:text-[#E94B35]" />
                              </a>
                            ))
                          ) : (
                            <p className="border-t border-black/10 py-4 text-sm text-black/30">No listed events</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

  

      {/* EVENT GALLERY */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            eyebrow="Event Gallery"
            title="Research looks better when it is happening."
            description="Students, poster presentations, judging, prototypes, dialogue and the moments between them."
          />

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {GALLERY.map((item, index) => (
              <motion.figure
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="group relative mb-5 break-inside-avoid overflow-hidden rounded-[28px] bg-black/5"
              >
                <div className={item.className}>
                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm font-semibold text-white">
                    {item.label}
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTICIPATE */}
      <section className="border-y border-black/10 bg-[#FFF7F3] py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-12 xl:px-16">
          <div className="lg:sticky lg:top-8">
            <SectionHeading
              eyebrow="Why Participate?"
              title="Every event is designed to produce outcomes."
              description="No filler programming. Every format should expose people to stronger ideas, useful collaborators and a clearer next step."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {OUTCOMES.map((outcome, index) => (
              <motion.div
                key={outcome}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.035 }}
                className="flex min-h-28 items-center gap-4 rounded-[26px] border border-black/10 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.035)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E94B35] text-white">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-lg font-semibold tracking-[-0.025em]">{outcome}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeading eyebrow="Ré in Numbers" title="A decade of showing the work." align="center" />

          <div className="mt-14 grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((stat) => (
              <motion.div
                key={stat.suffix}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="min-h-52 border-b border-r border-black/10 p-7 sm:p-9"
              >
                <div className="text-5xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-6xl">{stat.value}</div>
                <div className="mt-2 text-lg font-semibold text-[#E94B35]">{stat.suffix}</div>
                <p className="mt-8 text-sm leading-6 text-black/45">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DUAL CTA */}
      <section className="border-t border-black/10 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-6 px-6 sm:px-8 lg:grid-cols-2 lg:px-12 xl:px-16">
          <motion.a
            href="/events/register"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="group relative min-h-[460px] overflow-hidden rounded-[36px] bg-[#E94B35] p-8 text-white shadow-[0_25px_80px_rgba(233,75,53,0.24)] sm:p-10"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/20" />
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/20" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Student</p>
                <h2 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Want to participate?</h2>
                <p className="mt-5 max-w-md text-base leading-7 text-white/70">Join upcoming events, meet researchers and put your work in the room.</p>
              </div>
              <div className="mt-16 flex items-end justify-between">
                <span className="text-lg font-semibold">Register</span>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#E94B35] transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="/events/host"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="group min-h-[460px] rounded-[36px] border border-black/10 bg-[#171717] p-8 text-white shadow-[0_25px_80px_rgba(0,0,0,0.14)] sm:p-10"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Faculty · Industry · Institution · Startup · NGO · Government</p>
                <h2 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Want to collaborate?</h2>
                <p className="mt-5 max-w-md text-base leading-7 text-white/55">Host an event with Ré and build a serious platform around a question that matters.</p>
              </div>
              <div className="mt-16 flex items-end justify-between">
                <span className="text-lg font-semibold">Host an event with Ré</span>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative overflow-hidden bg-[#F3F0EB] py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#E94B35]/12 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E94B35]">Start Something</p>
          <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-7xl lg:text-8xl">
            The next breakthrough begins with a conversation.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="/events/all" className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white">
              Explore Events
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/events/speakers" className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#171717]">
              <Mic2 className="h-4 w-4 text-[#E94B35]" />
              Become a Speaker
            </a>
            <a href="/events/partner" className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#171717]">
              <Globe2 className="h-4 w-4 text-[#E94B35]" />
              Partner with Ré
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
