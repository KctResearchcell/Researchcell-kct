import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Globe2,
  HelpCircle,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { getEvent } from '../services/events';
import { EVENTS } from '../data';

interface Speaker {
  id?: string;
  name: string;
  role?: string;
  title?: string;
  organization?: string;
  company?: string;
  bio?: string;
  avatar?: string;
  image?: string;
}

interface Sponsor {
  id?: string;
  name: string;
  tier?: string;
  logo?: string;
  image?: string;
  website?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export interface EventDetailData {
  id?: string;
  slug?: string;
  title?: string;
  short_description?: string;
  description?: string;
  full_description?: string;
  venue?: string;
  location?: string;
  category?: string;
  type?: string;
  mode?: string;
  start_time?: string;
  end_time?: string;
  date?: string;
  time?: string;
  organizer?: string;
  organized_by?: string;
  organization?: string;
  cover_image?: string | null;
  banner?: string | null;
  image?: string | null;
  speakers?: Speaker[];
  sponsors?: Sponsor[];
  gallery?: string[];
  images?: string[];
  faqs?: FAQItem[];
  registration_url?: string;
  register_url?: string;
  public_status?: string;
  status?: string;
}

interface EventDetailPageProps {
  slug?: string;
  onNavigate?: (hash: string) => void;
}

const FALLBACK_BANNERS: Record<string, string> = {
  'event-icon-2026':
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=85&w=1600&auto=format&fit=crop',
  'event-talk-epigraphy':
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=85&w=1600&auto=format&fit=crop',
  'event-workshop-composites':
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=85&w=1600&auto=format&fit=crop',
  'research-week-2026':
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=85&w=1600&auto=format&fit=crop',
  'coffee-table-talks-2026':
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=85&w=1600&auto=format&fit=crop',
};

const DEFAULT_BANNER =
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=85&w=1600&auto=format&fit=crop';

function formatEventTime(isoString?: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatEventDate(isoString?: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const isPast = normalized === 'past' || normalized === 'completed' || normalized === 'closed';
  const isClosing = normalized === 'closing soon' || normalized === 'closing_soon';
  const isUpcoming = normalized === 'upcoming';

  const styles = isPast
    ? 'border-black/10 bg-black/[0.04] text-black/45'
    : isClosing
    ? 'border-orange-200 bg-orange-50 text-orange-700'
    : isUpcoming
    ? 'border-blue-200 bg-blue-50 text-blue-700'
    : 'border-emerald-200 bg-emerald-50 text-emerald-700';

  const label = isPast ? 'Past' : isClosing ? 'Closing Soon' : isUpcoming ? 'Upcoming' : 'Open';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${styles}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function FAQAccordion({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#E94B35]"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold tracking-[-0.02em] text-[#171717]">{question}</span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white transition-transform duration-300 ${open ? 'rotate-180 bg-black text-white' : ''}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-7 text-black/60">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EventDetailPage({ slug: propSlug, onNavigate }: EventDetailPageProps) {
  const [event, setEvent] = useState<EventDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Extract slug from prop or window location hash/pathname
  const slug = React.useMemo(() => {
    if (propSlug) return propSlug;
    const hash = window.location.hash || '';
    if (hash.startsWith('#/events/')) {
      return hash.replace('#/events/', '').split('?')[0].split('/')[0];
    }
    const path = window.location.pathname || '';
    if (path.startsWith('/events/')) {
      return path.replace('/events/', '').split('?')[0].split('/')[0];
    }
    return '';
  }, [propSlug]);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);
    setNotFound(false);

    getEvent(slug)
      .then((data) => {
        if (!isMounted) return;
        if (data && (data.title || data.id || data.slug)) {
          setEvent(data);
        } else {
          // Fallback check in local data if API returns empty
          const fallbackLocal = EVENTS.find((e) => e.id === slug);
          if (fallbackLocal) {
            setEvent({
              id: fallbackLocal.id,
              slug: fallbackLocal.id,
              title: fallbackLocal.title,
              description: fallbackLocal.description,
              short_description: fallbackLocal.description,
              venue: fallbackLocal.venue,
              type: fallbackLocal.type,
              category: fallbackLocal.type,
              date: fallbackLocal.date,
              time: fallbackLocal.time,
              status: fallbackLocal.status,
              speakers: fallbackLocal.speaker
                ? [{ name: fallbackLocal.speaker, role: 'Keynote Speaker' }]
                : [],
            });
          } else {
            setNotFound(true);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        // Search local fallback data first before failing
        const fallbackLocal = EVENTS.find((e) => e.id === slug);
        if (fallbackLocal) {
          setEvent({
            id: fallbackLocal.id,
            slug: fallbackLocal.id,
            title: fallbackLocal.title,
            description: fallbackLocal.description,
            short_description: fallbackLocal.description,
            venue: fallbackLocal.venue,
            type: fallbackLocal.type,
            category: fallbackLocal.type,
            date: fallbackLocal.date,
            time: fallbackLocal.time,
            status: fallbackLocal.status,
            speakers: fallbackLocal.speaker
              ? [{ name: fallbackLocal.speaker, role: 'Keynote Speaker' }]
              : [],
          });
        } else {
          const msg = err instanceof Error ? err.message : 'Failed to fetch event';
          if (msg.includes('404') || msg.toLowerCase().includes('not found')) {
            setNotFound(true);
          } else {
            setError(msg);
          }
        }
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('#/events');
    } else {
      window.location.hash = '#/events';
    }
  };

  const handleRegister = () => {
    const participantPortalUrl =
      event?.registration_url ||
      event?.register_url ||
      (slug ? `https://re-ems-backend.onrender.com/events/${slug}/register` : undefined);

    if (!participantPortalUrl) return;

    window.open(participantPortalUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white font-sans text-[#171717]">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="h-6 w-32 animate-pulse rounded-full bg-black/10" />
          <div className="mt-10 h-12 w-3/4 animate-pulse rounded-2xl bg-black/10" />
          <div className="mt-6 h-6 w-1/2 animate-pulse rounded-xl bg-black/10" />
          <div className="mt-10 aspect-[16/8] w-full animate-pulse rounded-[36px] bg-black/10" />
        </div>
      </main>
    );
  }

  if (notFound || (!event && !loading && !error)) {
    return (
      <main className="min-h-screen bg-white font-sans text-[#171717]">
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-orange-50 text-[#E94B35]">
            <HelpCircle className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">Event Not Found</h1>
          <p className="mt-3 text-lg text-black/55">
            The event you are looking for does not exist or has been removed from the schedule.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </button>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white font-sans text-[#171717]">
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-red-50 text-red-600">
            <HelpCircle className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">Unable to Load Event</h1>
          <p className="mt-3 text-lg text-black/55">{error}</p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </button>
        </div>
      </main>
    );
  }

  // Extract variables with clean fallbacks
  const title = event?.title || 'Event Details';
  const shortDescription = event?.short_description || event?.description || '';
  const fullDescription = event?.full_description || event?.description || shortDescription;
  const category = event?.category || event?.type || 'Conference';
  const mode = event?.mode || 'In-Person';
  const venue = event?.venue || event?.location || 'Kumaraguru Campus, Coimbatore';
  const organizer = event?.organizer || event?.organized_by || event?.organization || 'Ré Research Ecosystem';
  const status = event?.public_status || event?.status || 'Open';

  const startDateFormatted = event?.start_time ? formatEventDate(event.start_time) : event?.date || '';
  const startTimeFormatted = event?.start_time ? formatEventTime(event.start_time) : event?.time || '';
  const endTimeFormatted = event?.end_time ? formatEventTime(event.end_time) : '';

  const timeDisplay = [startTimeFormatted, endTimeFormatted].filter(Boolean).join(' – ') || event?.time || '09:00 AM - 05:00 PM';

  const bannerImage =
    event?.cover_image ||
    event?.banner ||
    event?.image ||
    FALLBACK_BANNERS[slug] ||
    DEFAULT_BANNER;

  const speakers = event?.speakers || [];
  const sponsors = event?.sponsors || [];
  const gallery = event?.gallery || event?.images || [];
  const faqs = event?.faqs || [];

  return (
    <main className="min-h-screen bg-white font-sans text-[#171717] selection:bg-[#E94B35]/20">
      {/* HEADER BREADCRUMB */}
      <div className="border-b border-black/10 bg-[#FAFAFA] py-5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 sm:px-8">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-[#E94B35]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Events
          </button>
          <div className="flex items-center gap-3">
            <StatusBadge status={status} />
            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="relative border-b border-black/10 py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#E94B35]" />
                {mode} Event
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-[#171717] sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              {shortDescription && (
                <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl">
                  {shortDescription}
                </p>
              )}

              {/* QUICK DETAILS GRID */}
              <div className="mt-8 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2">
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E94B35]">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Date & Time</p>
                    <p className="mt-1 text-sm font-semibold text-[#171717]">{startDateFormatted || 'Upcoming'}</p>
                    <p className="text-xs text-black/50">{timeDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E94B35]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Venue</p>
                    <p className="mt-1 text-sm font-semibold text-[#171717]">{venue}</p>
                    <p className="text-xs text-black/50">{mode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E94B35]">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Organizer</p>
                    <p className="mt-1 text-sm font-semibold text-[#171717]">{organizer}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E94B35]">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Format</p>
                    <p className="mt-1 text-sm font-semibold text-[#171717]">{category}</p>
                  </div>
                </div>
              </div>

              {/* REGISTER BUTTON */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#171717] px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#E94B35]"
                >
                  Register Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="text-xs text-black/45">
                  Redirects to Participant Portal
                </span>
              </div>
            </div>

            {/* BANNER IMAGE */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] border border-black/10 bg-black/5 shadow-2xl">
              <img
                src={bannerImage}
                alt={title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* FULL DESCRIPTION */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E94B35]">About the Event</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-4xl">
              Event Overview & Details
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-black/70 sm:text-lg">
              {fullDescription.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPEAKERS SECTION (Hidden if empty) */}
      {speakers.length > 0 && (
        <section className="border-t border-black/10 bg-[#F9F8F6] py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E94B35]">Featured Speakers</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-4xl">
                Learn from Leaders & Researchers
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker, index) => (
                <motion.div
                  key={speaker.name + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {speaker.avatar || speaker.image ? (
                      <img
                        src={speaker.avatar || speaker.image}
                        alt={speaker.name}
                        className="h-16 w-16 rounded-full object-cover border border-black/10"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-orange-50 text-[#E94B35] font-semibold text-xl">
                        {speaker.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-[#171717]">{speaker.name}</h3>
                      <p className="text-xs font-medium text-[#E94B35]">{speaker.role || speaker.title || 'Speaker'}</p>
                      {(speaker.organization || speaker.company) && (
                        <p className="text-xs text-black/50">{speaker.organization || speaker.company}</p>
                      )}
                    </div>
                  </div>
                  {speaker.bio && <p className="mt-4 text-sm leading-6 text-black/60">{speaker.bio}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPONSORS SECTION (Hidden if empty) */}
      {sponsors.length > 0 && (
        <section className="border-t border-black/10 py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E94B35]">Event Partners & Sponsors</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-4xl">
                Supported by Global Leaders
              </h2>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {sponsors.map((sponsor, index) => (
                <div
                  key={sponsor.name + index}
                  className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-6 py-4 shadow-sm"
                >
                  {sponsor.logo || sponsor.image ? (
                    <img src={sponsor.logo || sponsor.image} alt={sponsor.name} className="h-8 object-contain" />
                  ) : (
                    <UserCheck className="h-5 w-5 text-[#E94B35]" />
                  )}
                  <span className="text-base font-semibold text-[#171717]">{sponsor.name}</span>
                  {sponsor.tier && (
                    <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/50">
                      {sponsor.tier}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY SECTION (Hidden if empty) */}
      {gallery.length > 0 && (
        <section className="border-t border-black/10 bg-[#FAF9F6] py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
            <div className="flex items-center gap-3">
              <ImageIcon className="h-5 w-5 text-[#E94B35]" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E94B35]">Event Gallery</p>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-4xl">
              Highlights & Moments
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((imgUrl, index) => (
                <div key={index} className="aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                  <img
                    src={imgUrl}
                    alt={`Gallery ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQS SECTION (Hidden if empty) */}
      {faqs.length > 0 && (
        <section className="border-t border-black/10 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E94B35]">Frequently Asked Questions</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-4xl">
                Got Questions? We Have Answers.
              </h2>
            </div>

            <div className="mt-12 space-y-0 rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
              {faqs.map((faq, index) => (
                <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER REGISTER CTA BAR */}
      <section className="border-t border-black/10 bg-[#171717] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{category}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{title}</h2>
            <p className="mt-2 text-sm text-white/60">{startDateFormatted} · {venue}</p>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="group inline-flex items-center gap-3 rounded-full bg-[#E94B35] px-8 py-4 text-base font-semibold text-white shadow-xl transition-transform hover:-translate-y-0.5"
          >
            Register via Participant Portal
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </main>
  );
}
