import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FlaskConical,
  GraduationCap,
  Handshake,
  Lightbulb,
  Mail,
  Map,
  MapPin,
  MessageCircleMore,
  Network,
  PackageSearch,
  Phone,
  Search,
  Send,
  Sparkles,
  UploadCloud,
  UserRound,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type HubWorkspaceId =
  | 'programme'
  | 'workspace'
  | 'resources'
  | 'project'
  | 'collaboration'
  | 'mentor'
  | 'enquiry';

export interface HubSubmission {
  type: HubWorkspaceId;
  subtype?: string;
  submittedAt: string;
  data: Record<string, FieldValue>;
}

export interface HubSubmissionResult {
  referenceId?: string;
}

export interface WorkspaceInfo {
  id: string;
  name: string;
  purpose?: string;
  facilities?: string[];
  capacity?: number | string;
  status?: string;
  suitableActivities?: string[];
}

export interface VisitDetails {
  officeLocation?: string;
  openingHours?: string;
  email?: string;
  phone?: string;
  campusDirections?: string;
  parking?: string;
  visitorGuidelines?: string;
  mapHref?: string;
}

export interface ApplicationsRequestsHubProps {
  onNavigate?: (hash: string) => void;
  onSubmit?: (
    submission: HubSubmission,
  ) => Promise<HubSubmissionResult | void> | HubSubmissionResult | void;
  researchCircles?: string[];
  workspaces?: WorkspaceInfo[];
  visitDetails?: VisitDetails;
}

type FieldValue = string | boolean | File | null;

type SelectOption = {
  label: string;
  value: string;
};

type FieldConfig = {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'number'
    | 'date'
    | 'time'
    | 'textarea'
    | 'select'
    | 'file'
    | 'checkbox';
  placeholder?: string;
  help?: string;
  required?: boolean;
  minLength?: number;
  min?: number | string;
  max?: number | string;
  rows?: number;
  accept?: string;
  options?: SelectOption[];
  width?: 'full' | 'half';
  validate?: (
    value: FieldValue | undefined,
    values: Record<string, FieldValue>,
  ) => string | undefined;
};

type ProgrammeId = 'krest' | 'core' | 'krip' | 'urop';

type Programme = {
  id: ProgrammeId;
  name: string;
  fullName: string;
  positioning: string;
  forWhom: string;
  duration: string;
  commitment: string;
  selection: string;
  timeline: string;
  accent: string;
};

const PROGRAMMES: Programme[] = [
  {
    id: 'krest',
    name: 'KREST',
    fullName: 'Kumaraguru Research and Exploration in Science and Technology',
    positioning: 'A structured, semester-long pathway into sustained research.',
    forWhom:
      'Students seeking research foundations, mentorship, a nano project, a major project and the possibility of research outputs.',
    duration: 'Academic semester',
    commitment: 'Sustained, structured participation',
    selection: 'Selection details are published with each programme call.',
    timeline: 'Application dates are announced separately.',
    accent: '#26634B',
  },
  {
    id: 'core',
    name: 'CORE',
    fullName: 'Course-Oriented Research Experience',
    positioning: 'Research integrated into formal academic learning.',
    forWhom:
      'Students who want to experience inquiry, evidence and research through a credit-bearing academic context.',
    duration: 'Academic term',
    commitment: 'Curriculum-integrated participation',
    selection: 'Programme access details are published with the relevant academic offering.',
    timeline: 'Academic timelines are communicated through the official programme call.',
    accent: '#315D91',
  },
  {
    id: 'krip',
    name: 'KRIP',
    fullName: 'Kumaraguru Research Internship Programme',
    positioning: 'An intensive research experience built around understanding problems deeply.',
    forWhom:
      'Students ready to investigate complex challenges through context, evidence, collaboration and faculty mentorship.',
    duration: 'Four weeks',
    commitment: 'Intensive participation',
    selection: 'Selection details are published with each KRIP call.',
    timeline: 'Application dates are announced for each edition.',
    accent: '#6E55A8',
  },
  {
    id: 'urop',
    name: 'UROP',
    fullName: 'Undergraduate Research Opportunities Programme',
    positioning: 'Learn alongside faculty and contribute to active research.',
    forWhom:
      'Undergraduates seeking sustained research exposure, mentorship and experience contributing to ongoing investigations.',
    duration: 'Long-term',
    commitment: 'Faculty-guided research',
    selection: 'Opportunity-specific information is published when research openings are available.',
    timeline: 'Openings and application dates are announced separately.',
    accent: '#2B7071',
  },
];

const DEFAULT_WORKSPACES: WorkspaceInfo[] = [
  { id: 'd101', name: 'D101', status: 'Availability confirmation required' },
  { id: 'd102', name: 'D102', status: 'Availability confirmation required' },
  { id: 'b101', name: 'B101', status: 'Availability confirmation required' },
];

const RESOURCE_CATEGORIES = [
  'Laboratory Equipment',
  'Electronics',
  'Mechanical Tools',
  'Software Licenses',
  'Datasets',
  'Testing Facilities',
  'Fabrication Support',
  'Consumables',
  'Other',
];

const COLLABORATION_TYPES = [
  'Industry',
  'Institution',
  'Startup',
  'NGO',
  'Research Lab',
  'Faculty',
  'Alumni',
];

const ENQUIRY_CATEGORIES = [
  'Research Guidance',
  'Publication',
  'Funding',
  'Events',
  'Conference',
  'Partnership',
  'Media',
  'Administration',
  'Technical Support',
  'Other',
];

const SERVICE_CARDS: Array<{
  id: string;
  workspace: HubWorkspaceId;
  preset?: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  wash: string;
}> = [
  {
    id: 'apply',
    workspace: 'programme',
    title: 'Apply for a Programme',
    description: 'Begin an application for KREST, CORE, KRIP or UROP.',
    icon: GraduationCap,
    tone: '#285D46',
    wash: '#EAF3ED',
  },
  {
    id: 'book',
    workspace: 'workspace',
    title: 'Book a Workspace',
    description: 'Request D101, D102 or B101 for research-related work.',
    icon: CalendarDays,
    tone: '#315D91',
    wash: '#EAF0F8',
  },
  {
    id: 'resources',
    workspace: 'resources',
    title: 'Request Research Resources',
    description: 'Ask for equipment, access, software, materials or technical support.',
    icon: PackageSearch,
    tone: '#8A5A20',
    wash: '#F7F0E6',
  },
  {
    id: 'project',
    workspace: 'project',
    title: 'Submit a Project',
    description: 'Bring an idea, question, challenge, prototype or ongoing project into Ré.',
    icon: Lightbulb,
    tone: '#9A4F35',
    wash: '#F8ECE7',
  },
  {
    id: 'industry',
    workspace: 'collaboration',
    preset: 'Industry',
    title: 'Industry Collaboration',
    description: 'Explore research, innovation or problem-solving with Ré.',
    icon: Building2,
    tone: '#4E5676',
    wash: '#EEEFF5',
  },
  {
    id: 'institution',
    workspace: 'collaboration',
    preset: 'Institution',
    title: 'Institution Partnership',
    description: 'Start a conversation around shared research and academic collaboration.',
    icon: Network,
    tone: '#49686A',
    wash: '#EBF2F1',
  },
  {
    id: 'mentor',
    workspace: 'mentor',
    title: 'Become a Mentor',
    description: 'Offer expertise, review, guidance or domain perspective to research teams.',
    icon: Users,
    tone: '#6C4F87',
    wash: '#F2EDF6',
  },
  {
    id: 'enquiry',
    workspace: 'enquiry',
    title: 'General Enquiry',
    description: 'Start with a question when none of the other routes fit.',
    icon: MessageCircleMore,
    tone: '#426064',
    wash: '#EDF2F2',
  },
];

const FAQS = [
  {
    category: 'Applications',
    question: 'Where can I find exact eligibility and application dates?',
    answer:
      'Eligibility, selection and dates can vary by programme or application call. The hub presents the application workspace, while exact cycle information should be published with the relevant official announcement.',
  },
  {
    category: 'Applications',
    question: 'Can I save an unfinished application?',
    answer:
      'When no submission service is connected, this component saves completed submissions as local browser drafts. A production implementation can connect the same form payload to your application API or database.',
  },
  {
    category: 'Workspaces',
    question: 'Does a booking request guarantee the workspace?',
    answer:
      'No. A request records the preferred room, date, time and purpose. Confirmation depends on availability, suitability and the applicable approval process.',
  },
  {
    category: 'Workspaces',
    question: 'Can I request equipment with a workspace booking?',
    answer:
      'Yes. The booking workspace includes equipment requirements and special notes. A separate resource request is better when the need is substantial or unrelated to a room booking.',
  },
  {
    category: 'Research',
    question: 'Can I submit an idea that is not fully developed?',
    answer:
      'Yes. Project Intake can begin with a question, early concept, challenge, prototype or ongoing project. The submission should explain the context and the support needed to strengthen it.',
  },
  {
    category: 'Publications',
    question: 'Does submitting a project guarantee publication?',
    answer:
      'No. Publications, conference presentations and other research outputs are possibilities that depend on the quality, relevance, progress and nature of the work.',
  },
  {
    category: 'Resources',
    question: 'Is every requested resource automatically approved?',
    answer:
      'No. Resource support depends on relevance, availability, project requirements, duration and any applicable approval. The request form helps Ré understand and evaluate the need.',
  },
  {
    category: 'Collaborations',
    question: 'Who can initiate a collaboration request?',
    answer:
      'The hub provides dedicated routes for industry, institutions, startups, NGOs, research labs, faculty and alumni. Each request should describe the shared opportunity and the contribution expected from both sides.',
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function scrollToId(id: string, reduceMotion: boolean) {
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}

function Reveal({
  children,
  className,
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
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: reduceMotion ? 0 : 0.62,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        'text-[10px] font-bold uppercase tracking-[0.24em]',
        light ? 'text-white/45' : 'text-[#2E654F]',
      )}
    >
      {children}
    </p>
  );
}

function ServiceCard({
  item,
  active,
  onClick,
}: {
  item: (typeof SERVICE_CARDS)[number];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className={cn(
        'group relative min-h-[230px] overflow-hidden rounded-[28px] border p-6 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5E47] focus-visible:ring-offset-2',
        active
          ? 'border-[#183C2F]/30 shadow-[0_22px_60px_rgba(23,56,44,0.12)]'
          : 'border-black/8 hover:border-black/15 hover:shadow-[0_18px_48px_rgba(21,30,25,0.08)]',
      )}
      style={{ backgroundColor: item.wash }}
      aria-pressed={active}
    >
      <div
        className="absolute -right-14 -top-16 h-48 w-48 rounded-full opacity-[0.12] blur-2xl transition-transform duration-500 group-hover:scale-125"
        style={{ backgroundColor: item.tone }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-6">
          <span
            className="grid h-12 w-12 place-items-center rounded-2xl bg-white/80 shadow-sm"
            style={{ color: item.tone }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <ChevronRight
            className="h-5 w-5 -translate-x-1 text-black/25 transition-all group-hover:translate-x-0 group-hover:text-black/65"
            aria-hidden="true"
          />
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#151A17]">
            {item.title}
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#616862]">
            {item.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function InputLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <span className="mb-2 block text-xs font-semibold text-[#333A35]">
      {label}
      {required && <span className="ml-1 text-[#A04432]">*</span>}
    </span>
  );
}

function DynamicForm({
  formId,
  workspace,
  subtype,
  title,
  description,
  fields,
  submitLabel,
  onSubmit,
}: {
  formId: string;
  workspace: HubWorkspaceId;
  subtype?: string;
  title: string;
  description: string;
  fields: FieldConfig[];
  submitLabel: string;
  onSubmit?: ApplicationsRequestsHubProps['onSubmit'];
}) {
  const [values, setValues] = useState<Record<string, FieldValue>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState<{
    referenceId: string;
    localOnly: boolean;
  } | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setValues({});
    setErrors({});
    setSubmitError('');
    setSuccess(null);
  }, [formId]);

  const setValue = (name: string, value: FieldValue) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};

    for (const field of fields) {
      const value = values[field.name];
      const empty =
        value === undefined ||
        value === null ||
        value === '' ||
        (field.type === 'checkbox' && value !== true);

      if (field.required && empty) {
        next[field.name] =
          field.type === 'checkbox'
            ? 'Please confirm this before continuing.'
            : 'This field is required.';
        continue;
      }

      if (empty) continue;

      if (
        field.type === 'email' &&
        typeof value === 'string' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        next[field.name] = 'Enter a valid email address.';
      }

      if (
        field.type === 'url' &&
        typeof value === 'string' &&
        !/^https?:\/\//i.test(value)
      ) {
        next[field.name] = 'Include the full URL beginning with http:// or https://.';
      }

      if (
        field.minLength &&
        typeof value === 'string' &&
        value.trim().length < field.minLength
      ) {
        next[field.name] = `Please provide at least ${field.minLength} characters.`;
      }

      if (field.type === 'number' && typeof value === 'string') {
        const number = Number(value);
        if (field.min !== undefined && number < Number(field.min)) {
          next[field.name] = `Value must be at least ${field.min}.`;
        }
        if (field.max !== undefined && number > Number(field.max)) {
          next[field.name] = `Value must not exceed ${field.max}.`;
        }
      }

      const customError = field.validate?.(value, values);
      if (customError) next[field.name] = customError;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    if (!validate()) {
      window.setTimeout(() => {
        const invalid = document.querySelector<HTMLElement>(
          `#${formId} [aria-invalid="true"]`,
        );
        invalid?.focus();
      }, 0);
      return;
    }

    setSubmitting(true);

    const payload: HubSubmission = {
      type: workspace,
      subtype,
      submittedAt: new Date().toISOString(),
      data: values,
    };

    try {
      let referenceId = `RE-${Date.now().toString(36).toUpperCase()}`;
      let localOnly = !onSubmit;

      if (onSubmit) {
        const result = await onSubmit(payload);
        if (result && result.referenceId) referenceId = result.referenceId;
      } else {
        const storageSafe = Object.fromEntries(
          Object.entries(values).map(([key, value]) => [
            key,
            value instanceof File ? value.name : value,
          ]),
        );
        try {
          localStorage.setItem(
            `re-request-${referenceId}`,
            JSON.stringify({ ...payload, data: storageSafe }),
          );
        } catch {
          localOnly = true;
        }
        await new Promise((resolve) => window.setTimeout(resolve, 550));
      }

      setSuccess({ referenceId, localOnly });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'The request could not be submitted. Please review the form and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[520px] flex-col items-center justify-center rounded-[30px] border border-[#CFE0D7] bg-[#F2F8F4] px-6 py-16 text-center"
        role="status"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#1E6549] text-white shadow-[0_18px_45px_rgba(30,101,73,0.22)]">
          <Check className="h-7 w-7" />
        </span>
        <Eyebrow>{success.localOnly ? 'Local draft created' : 'Request received'}</Eyebrow>
        <h3 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.035em] text-[#142019] sm:text-4xl">
          {success.localOnly
            ? 'Your request is saved in this browser.'
            : 'Your request has entered the Ré workspace.'}
        </h3>
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#5E6861]">
          {success.localOnly
            ? 'Connect the component’s onSubmit prop to your API to send requests to Ré. Until then, this submission remains a local implementation draft.'
            : 'Keep the reference below for your records. Any next steps depend on the request type and the applicable review process.'}
        </p>
        <div className="mt-7 rounded-2xl border border-[#C9DAD1] bg-white px-5 py-3 font-mono text-sm font-semibold text-[#1D5F46]">
          {success.referenceId}
        </div>
        <button
          type="button"
          onClick={() => {
            setValues({});
            setSuccess(null);
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#142019] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#142019] focus-visible:ring-offset-2"
        >
          Start another request
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate>
      <div className="mb-8 max-w-2xl">
        <h3 className="text-3xl font-semibold tracking-[-0.035em] text-[#151A17] sm:text-4xl">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[#657069]">{description}</p>
      </div>

      {submitError && (
        <div
          className="mb-6 rounded-2xl border border-[#E3B9B0] bg-[#FFF3F0] px-5 py-4 text-sm text-[#8A3528]"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
        {fields.map((field) => {
          const value = values[field.name];
          const error = errors[field.name];
          const describedBy = `${formId}-${field.name}-description`;
          const baseClass = cn(
            'w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-[#202622] outline-none transition placeholder:text-[#A0A8A2] focus:border-[#2B7055] focus:ring-4 focus:ring-[#2B7055]/10',
            error ? 'border-[#BA5140]' : 'border-black/12',
          );

          return (
            <label
              key={field.name}
              className={cn(field.width === 'half' ? 'sm:col-span-1' : 'sm:col-span-2')}
            >
              <InputLabel label={field.label} required={field.required} />

              {field.type === 'textarea' && (
                <textarea
                  name={field.name}
                  value={typeof value === 'string' ? value : ''}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  rows={field.rows ?? 5}
                  className={cn(baseClass, 'resize-y')}
                  aria-invalid={Boolean(error)}
                  aria-describedby={describedBy}
                />
              )}

              {field.type === 'select' && (
                <select
                  name={field.name}
                  value={typeof value === 'string' ? value : ''}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  className={baseClass}
                  aria-invalid={Boolean(error)}
                  aria-describedby={describedBy}
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'file' && (
                <span
                  className={cn(
                    'flex min-h-[108px] cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed bg-white px-5 py-4 transition hover:border-[#2B7055]/60 hover:bg-[#F8FBF9]',
                    error ? 'border-[#BA5140]' : 'border-black/15',
                  )}
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EDF4F0] text-[#2A684F]">
                      <UploadCloud className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[#28312B]">
                        {value instanceof File ? value.name : 'Choose a file'}
                      </span>
                      <span className="mt-1 block text-xs text-[#7A837D]">
                        {field.help ?? 'Upload a supporting document if available.'}
                      </span>
                    </span>
                  </span>
                  {value instanceof File && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        setValue(field.name, null);
                      }}
                      className="grid h-8 w-8 place-items-center rounded-full border border-black/10 bg-white text-[#69716C] hover:text-black"
                      aria-label={`Remove ${value.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <input
                    type="file"
                    accept={field.accept}
                    className="sr-only"
                    onChange={(event) =>
                      setValue(field.name, event.target.files?.[0] ?? null)
                    }
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                  />
                </span>
              )}

              {field.type === 'checkbox' && (
                <span className="flex items-start gap-3 rounded-2xl border border-black/10 bg-[#F8F9F7] p-4">
                  <input
                    type="checkbox"
                    checked={value === true}
                    onChange={(event) => setValue(field.name, event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-black/20 text-[#28684E] focus:ring-[#28684E]"
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                  />
                  <span className="text-sm leading-6 text-[#555F59]">
                    {field.placeholder}
                  </span>
                </span>
              )}

              {!['textarea', 'select', 'file', 'checkbox'].includes(field.type) && (
                <input
                  type={field.type}
                  name={field.name}
                  value={typeof value === 'string' ? value : ''}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  className={baseClass}
                  aria-invalid={Boolean(error)}
                  aria-describedby={describedBy}
                />
              )}

              <span id={describedBy} className="mt-2 block min-h-[18px] text-xs">
                {error ? (
                  <span className="text-[#A84132]">{error}</span>
                ) : field.type !== 'file' && field.help ? (
                  <span className="text-[#818A84]">{field.help}</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-black/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-5 text-[#7A837D]">
          Required fields are marked with an asterisk. Submitting a request does not itself guarantee selection, booking, resources, funding or collaboration.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-[#16221B] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-wait disabled:opacity-65 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16221B] focus-visible:ring-offset-2"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
              Processing…
            </>
          ) : (
            <>
              {submitLabel}
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function sharedIdentityFields(): FieldConfig[] {
  return [
    {
      name: 'fullName',
      label: 'Full name',
      type: 'text',
      placeholder: 'Your full name',
      required: true,
      width: 'half',
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      placeholder: 'name@example.com',
      required: true,
      width: 'half',
    },
    {
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      placeholder: 'Your contact number',
      required: true,
      width: 'half',
    },
    {
      name: 'department',
      label: 'Department / organisation',
      type: 'text',
      placeholder: 'Your department or organisation',
      required: true,
      width: 'half',
    },
  ];
}

function programmeFields(
  programme: Programme,
  circles: string[],
): FieldConfig[] {
  const circleOptions = [
    { label: 'Not sure yet', value: 'Not sure yet' },
    ...circles.map((circle) => ({ label: circle, value: circle })),
  ];

  const programmePrompt: Record<ProgrammeId, FieldConfig> = {
    krest: {
      name: 'programmeResponse',
      label: 'What do you hope to investigate through a semester-long research experience?',
      type: 'textarea',
      placeholder:
        'Describe the question, area or kind of research experience you want to pursue.',
      required: true,
      minLength: 80,
    },
    core: {
      name: 'programmeResponse',
      label: 'How would research strengthen your current academic learning?',
      type: 'textarea',
      placeholder:
        'Connect your course, discipline or academic interests with the kind of inquiry you want to undertake.',
      required: true,
      minLength: 80,
    },
    krip: {
      name: 'programmeResponse',
      label: 'Describe a complex problem you want to understand more deeply.',
      type: 'textarea',
      placeholder:
        'Focus on the context, people, evidence or assumptions you would want to investigate before proposing a solution.',
      required: true,
      minLength: 80,
    },
    urop: {
      name: 'programmeResponse',
      label: 'What kind of ongoing research would you like to learn from and contribute to?',
      type: 'textarea',
      placeholder:
        'Describe your research interests, the questions that motivate you and the contribution you hope to make.',
      required: true,
      minLength: 80,
    },
  };

  return [
    ...sharedIdentityFields(),
    {
      name: 'year',
      label: 'Current year of study',
      type: 'select',
      required: true,
      width: 'half',
      options: [
        { label: 'First year', value: 'First year' },
        { label: 'Second year', value: 'Second year' },
        { label: 'Third year', value: 'Third year' },
        { label: 'Fourth year', value: 'Fourth year' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      name: 'preferredCircle',
      label: 'Preferred Research Circle',
      type: 'select',
      required: true,
      width: 'half',
      options: circleOptions,
      help:
        circles.length === 0
          ? 'Verified Research Circle options can be supplied through the researchCircles prop.'
          : undefined,
    },
    programmePrompt[programme.id],
    {
      name: 'researchInterests',
      label: 'Research interests',
      type: 'textarea',
      placeholder: 'List the themes, questions, methods or domains that interest you.',
      required: true,
      minLength: 35,
      rows: 4,
    },
    {
      name: 'availability',
      label: 'Availability and current commitments',
      type: 'textarea',
      placeholder: `Explain how you would accommodate the ${programme.commitment.toLowerCase()} expected by ${programme.name}.`,
      required: true,
      minLength: 35,
      rows: 4,
    },
    {
      name: 'portfolio',
      label: 'Portfolio or profile link',
      type: 'url',
      placeholder: 'https://',
      help: 'Optional. Share relevant work, writing, projects or a professional profile.',
      width: 'half',
    },
    {
      name: 'resume',
      label: 'Resume',
      type: 'file',
      accept: '.pdf,.doc,.docx',
      help: 'Optional unless the official application call states otherwise.',
      width: 'half',
    },
    {
      name: 'accuracy',
      label: 'Declaration',
      type: 'checkbox',
      required: true,
      placeholder:
        'I confirm that the information in this application is accurate and understand that programme-specific eligibility, selection and timelines are communicated separately.',
    },
  ];
}

function ProgrammeWorkspace({
  selected,
  setSelected,
  circles,
  onSubmit,
}: {
  selected: ProgrammeId;
  setSelected: (id: ProgrammeId) => void;
  circles: string[];
  onSubmit?: ApplicationsRequestsHubProps['onSubmit'];
}) {
  const programme = PROGRAMMES.find((item) => item.id === selected) ?? PROGRAMMES[0];
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="mb-9">
        <Eyebrow>Programme applications</Eyebrow>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-[#151A17] sm:text-5xl">
          Choose the research experience that matches your intent.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#657069]">
          Each application uses the same essential identity information, but the central question changes to reflect the purpose of the programme.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {PROGRAMMES.map((item) => {
          const active = item.id === programme.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              className={cn(
                'rounded-[24px] border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                active
                  ? 'border-black/20 bg-[#17211B] text-white shadow-[0_18px_45px_rgba(19,35,27,0.16)]'
                  : 'border-black/8 bg-white hover:border-black/15',
              )}
              aria-pressed={active}
              style={{
                boxShadow: active ? `0 18px 45px ${item.accent}22` : undefined,
              }}
            >
              <span
                className={cn(
                  'text-[10px] font-bold uppercase tracking-[0.2em]',
                  active ? 'text-white/45' : 'text-[#858D87]',
                )}
              >
                {item.duration}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                {item.name}
              </h3>
              <p
                className={cn(
                  'mt-2 text-xs leading-5',
                  active ? 'text-white/62' : 'text-[#68716B]',
                )}
              >
                {item.positioning}
              </p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={programme.id}
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.26 }}
          className="mt-7 overflow-hidden rounded-[30px] border border-black/9 bg-white"
        >
          <div className="grid border-b border-black/8 bg-[#F7F7F3] md:grid-cols-[1.25fr_0.75fr]">
            <div className="p-7 sm:p-9">
              <Eyebrow>{programme.fullName}</Eyebrow>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#18201B]">
                {programme.positioning}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#636D66]">
                {programme.forWhom}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-black/8 md:grid-cols-1">
              {[
                ['Duration', programme.duration],
                ['Commitment', programme.commitment],
                ['Selection', programme.selection],
                ['Timeline', programme.timeline],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#F7F7F3] p-4 sm:px-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A918C]">
                    {label}
                  </span>
                  <p className="mt-1.5 text-xs font-medium leading-5 text-[#39423C]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 sm:p-9 lg:p-11">
            <DynamicForm
              formId={`programme-${programme.id}`}
              workspace="programme"
              subtype={programme.id}
              title={`${programme.name} application`}
              description="Use this workspace to express your motivation and research interests. Exact programme rules remain governed by the relevant official application call."
              fields={programmeFields(programme, circles)}
              submitLabel={`Submit ${programme.name} application`}
              onSubmit={onSubmit}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WorkspaceBooking({
  spaces,
  selected,
  setSelected,
  onSubmit,
}: {
  spaces: WorkspaceInfo[];
  selected: string;
  setSelected: (id: string) => void;
  onSubmit?: ApplicationsRequestsHubProps['onSubmit'];
}) {
  const room = spaces.find((item) => item.id === selected) ?? spaces[0];
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  const fields: FieldConfig[] = [
    ...sharedIdentityFields(),
    {
      name: 'purpose',
      label: 'Purpose of booking',
      type: 'textarea',
      placeholder: 'Explain what will happen in the workspace and why the room is needed.',
      required: true,
      minLength: 40,
    },
    {
      name: 'preferredDate',
      label: 'Preferred date',
      type: 'date',
      min: localToday,
      required: true,
      width: 'half',
      validate: (value) =>
        typeof value === 'string' && value < localToday
          ? 'Choose today or a future date.'
          : undefined,
    },
    {
      name: 'preferredTime',
      label: 'Preferred start time',
      type: 'time',
      required: true,
      width: 'half',
    },
    {
      name: 'duration',
      label: 'Expected duration',
      type: 'text',
      placeholder: 'Example: 2 hours',
      required: true,
      width: 'half',
    },
    {
      name: 'participants',
      label: 'Number of participants',
      type: 'number',
      placeholder: '1',
      required: true,
      min: 1,
      width: 'half',
    },
    {
      name: 'facultyMentor',
      label: 'Faculty mentor / responsible person',
      type: 'text',
      placeholder: 'Name and department, where applicable',
      required: true,
      width: 'half',
    },
    {
      name: 'equipment',
      label: 'Equipment required',
      type: 'text',
      placeholder: 'List equipment or write None',
      required: true,
      width: 'half',
    },
    {
      name: 'notes',
      label: 'Special notes',
      type: 'textarea',
      placeholder: 'Access, setup, safety, layout or other requirements.',
      rows: 4,
    },
    {
      name: 'bookingAcknowledgement',
      label: 'Booking acknowledgement',
      type: 'checkbox',
      required: true,
      placeholder:
        'I understand that this is a request. The room is confirmed only after Ré reviews availability and suitability.',
    },
  ];

  return (
    <div>
      <Eyebrow>Workspace booking</Eyebrow>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
        Choose the space. Explain the work. Request the time.
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#657069]">
        Room details below remain intentionally configurable. Supply verified capacity, facilities and usage information through the workspaces prop.
      </p>

      <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {spaces.map((space) => {
          const active = space.id === room.id;
          return (
            <button
              type="button"
              key={space.id}
              onClick={() => setSelected(space.id)}
              className={cn(
                'rounded-[26px] border p-6 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                active
                  ? 'border-[#315D91]/40 bg-[#16253A] text-white shadow-[0_18px_44px_rgba(30,51,78,0.16)]'
                  : 'border-black/9 bg-white hover:-translate-y-1 hover:border-black/16',
              )}
              aria-pressed={active}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'grid h-11 w-11 place-items-center rounded-2xl',
                    active ? 'bg-white/10 text-white' : 'bg-[#EAF0F8] text-[#315D91]',
                  )}
                >
                  <Building2 className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em]',
                    active ? 'bg-white/10 text-white/62' : 'bg-[#F3F5F4] text-[#7B847E]',
                  )}
                >
                  {space.status ?? 'Status not published'}
                </span>
              </div>
              <h3 className="mt-8 text-3xl font-semibold tracking-[-0.035em]">
                {space.name}
              </h3>
              <p className={cn('mt-3 text-sm leading-6', active ? 'text-white/60' : 'text-[#69726C]')}>
                {space.purpose ?? 'Purpose and room suitability are confirmed against the request.'}
              </p>
              <div className={cn('mt-6 border-t pt-4 text-xs', active ? 'border-white/10 text-white/48' : 'border-black/8 text-[#7D857F]')}>
                Capacity: {space.capacity ?? 'Not published'}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-7 rounded-[30px] border border-black/9 bg-white p-6 sm:p-9 lg:p-11">
        <DynamicForm
          formId={`workspace-${room.id}`}
          workspace="workspace"
          subtype={room.name}
          title={`Request ${room.name}`}
          description="Share enough context for Ré to evaluate room fit, availability, participant needs and any equipment dependencies."
          fields={fields}
          submitLabel="Send booking request"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

function ResourceWorkspace({
  circles,
  onSubmit,
}: {
  circles: string[];
  onSubmit?: ApplicationsRequestsHubProps['onSubmit'];
}) {
  const fields: FieldConfig[] = [
    ...sharedIdentityFields(),
    {
      name: 'category',
      label: 'Resource category',
      type: 'select',
      required: true,
      width: 'half',
      options: RESOURCE_CATEGORIES.map((item) => ({ label: item, value: item })),
    },
    {
      name: 'resourceName',
      label: 'Resource name',
      type: 'text',
      placeholder: 'Describe the exact item, access or support needed',
      required: true,
      width: 'half',
    },
    {
      name: 'purpose',
      label: 'Purpose and research need',
      type: 'textarea',
      placeholder: 'Explain how this resource supports the investigation or project.',
      required: true,
      minLength: 60,
    },
    {
      name: 'project',
      label: 'Project or research activity',
      type: 'text',
      placeholder: 'Project title or activity name',
      required: true,
      width: 'half',
    },
    {
      name: 'researchCircle',
      label: 'Research Circle',
      type: 'select',
      required: true,
      width: 'half',
      options: [
        { label: 'Not assigned / not sure', value: 'Not assigned / not sure' },
        ...circles.map((circle) => ({ label: circle, value: circle })),
      ],
    },
    {
      name: 'urgency',
      label: 'Urgency',
      type: 'select',
      required: true,
      width: 'half',
      options: [
        { label: 'Standard', value: 'Standard' },
        { label: 'Time-sensitive', value: 'Time-sensitive' },
        { label: 'Critical dependency', value: 'Critical dependency' },
      ],
    },
    {
      name: 'expectedDuration',
      label: 'Expected duration of use',
      type: 'text',
      placeholder: 'Example: 3 days or 6 weeks',
      required: true,
      width: 'half',
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      placeholder: '1',
      min: 1,
      required: true,
      width: 'half',
    },
    {
      name: 'facultyApproval',
      label: 'Faculty approval status',
      type: 'select',
      required: true,
      width: 'half',
      options: [
        { label: 'Approved', value: 'Approved' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Not applicable', value: 'Not applicable' },
      ],
    },
    {
      name: 'attachment',
      label: 'Supporting attachment',
      type: 'file',
      accept: '.pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg',
      help: 'Optional quotation, specification, approval or project document.',
      width: 'half',
    },
    {
      name: 'requirements',
      label: 'Special requirements',
      type: 'textarea',
      placeholder: 'Compatibility, safety, installation, access or technical requirements.',
      rows: 4,
    },
  ];

  return (
    <div>
      <Eyebrow>Research resources</Eyebrow>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
        Describe the need, not just the item.
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#657069]">
        A useful request connects the resource to a research purpose, duration, quantity, approval status and technical requirement.
      </p>
      <div className="mt-9 rounded-[30px] border border-black/9 bg-white p-6 sm:p-9 lg:p-11">
        <DynamicForm
          formId="resource-request"
          workspace="resources"
          title="Request research resources"
          description="Requests may cover equipment, electronics, tools, software, data, testing, fabrication, consumables or another clearly described need."
          fields={fields}
          submitLabel="Send resource request"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

function ProjectWorkspace({
  circles,
  onSubmit,
}: {
  circles: string[];
  onSubmit?: ApplicationsRequestsHubProps['onSubmit'];
}) {
  const fields: FieldConfig[] = [
    ...sharedIdentityFields(),
    {
      name: 'applicantType',
      label: 'You are submitting as',
      type: 'select',
      required: true,
      width: 'half',
      options: [
        'Student',
        'Student Team',
        'Faculty',
        'Researcher',
        'Innovator',
        'Startup',
        'Industry Partner',
        'NGO / Community Organisation',
        'Other',
      ].map((item) => ({ label: item, value: item })),
    },
    {
      name: 'currentStage',
      label: 'Current stage',
      type: 'select',
      required: true,
      width: 'half',
      options: [
        'Question or challenge',
        'Early concept',
        'Research in progress',
        'Prototype',
        'Existing project',
      ].map((item) => ({ label: item, value: item })),
    },
    {
      name: 'title',
      label: 'Working title',
      type: 'text',
      placeholder: 'A clear name for the idea or challenge',
      required: true,
    },
    {
      name: 'question',
      label: 'What question, challenge or opportunity are you bringing?',
      type: 'textarea',
      placeholder: 'Explain the context, why it matters and what remains unresolved.',
      required: true,
      minLength: 90,
    },
    {
      name: 'workSoFar',
      label: 'What has already been explored or developed?',
      type: 'textarea',
      placeholder: 'Share observations, evidence, experiments, prototypes or previous work.',
      required: true,
      minLength: 50,
    },
    {
      name: 'supportNeeded',
      label: 'What support would strengthen the work?',
      type: 'textarea',
      placeholder: 'Mentorship, Research Circle integration, resources, validation, collaboration or another need.',
      required: true,
      minLength: 45,
    },
    {
      name: 'researchCircle',
      label: 'Possible Research Circle',
      type: 'select',
      width: 'half',
      options: [
        { label: 'Not sure yet', value: 'Not sure yet' },
        ...circles.map((circle) => ({ label: circle, value: circle })),
      ],
    },
    {
      name: 'attachment',
      label: 'Project material',
      type: 'file',
      width: 'half',
      accept: '.pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.zip',
      help: 'Optional concept note, presentation, drawing, evidence or project document.',
    },
    {
      name: 'projectAcknowledgement',
      label: 'Project acknowledgement',
      type: 'checkbox',
      required: true,
      placeholder:
        'I understand that submitting an idea begins an evaluation and does not guarantee acceptance, resources, funding, publication or a particular outcome.',
    },
  ];

  return (
    <div>
      <Eyebrow>Project Intake</Eyebrow>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
        Give the idea enough context to begin a serious conversation.
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#657069]">
        The submission can begin with an unfinished question, concept, challenge, prototype or ongoing project. It does not need to arrive as a finished solution.
      </p>
      <div className="mt-9 rounded-[30px] border border-black/9 bg-white p-6 sm:p-9 lg:p-11">
        <DynamicForm
          formId="project-intake"
          workspace="project"
          title="Submit an idea or project"
          description="Ré uses this information to understand the research potential, current stage and support that may be required around the work."
          fields={fields}
          submitLabel="Submit to Project Intake"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

function CollaborationWorkspace({
  selectedType,
  setSelectedType,
  onSubmit,
}: {
  selectedType: string;
  setSelectedType: (value: string) => void;
  onSubmit?: ApplicationsRequestsHubProps['onSubmit'];
}) {
  const contextualPrompt: Record<string, string> = {
    Industry: 'Describe the problem, research opportunity or innovation objective your organisation wants to explore with Ré.',
    Institution: 'Describe the shared academic, research or institutional opportunity you want to develop with Ré.',
    Startup: 'Explain the research, validation or technical challenge where collaboration could strengthen the venture.',
    NGO: 'Describe the community or societal challenge that requires structured research and collaboration.',
    'Research Lab': 'Explain the investigation, expertise, infrastructure or scholarly opportunity that could be advanced together.',
    Faculty: 'Describe the research, mentorship or interdisciplinary collaboration you want to initiate.',
    Alumni: 'Explain how your expertise, network or professional context could contribute to the Ré ecosystem.',
  };

  const fields: FieldConfig[] = [
    ...sharedIdentityFields(),
    {
      name: 'role',
      label: 'Your role',
      type: 'text',
      placeholder: 'Designation or relationship to the organisation',
      required: true,
      width: 'half',
    },
    {
      name: 'website',
      label: 'Organisation website',
      type: 'url',
      placeholder: 'https://',
      width: 'half',
    },
    {
      name: 'collaborationTitle',
      label: 'Working title',
      type: 'text',
      placeholder: 'A concise title for the opportunity',
      required: true,
    },
    {
      name: 'opportunity',
      label: 'What would you like to explore together?',
      type: 'textarea',
      placeholder: contextualPrompt[selectedType] ?? contextualPrompt.Industry,
      required: true,
      minLength: 90,
    },
    {
      name: 'contribution',
      label: 'What can your side contribute?',
      type: 'textarea',
      placeholder: 'Expertise, data, mentorship, problem context, infrastructure, sponsorship, access or another contribution.',
      required: true,
      minLength: 50,
    },
    {
      name: 'requestFromRe',
      label: 'What are you seeking from Ré?',
      type: 'textarea',
      placeholder: 'Research capability, student teams, faculty expertise, validation, facilities or another form of collaboration.',
      required: true,
      minLength: 50,
    },
    {
      name: 'timeframe',
      label: 'Indicative timeframe',
      type: 'text',
      placeholder: 'Share any relevant dates or preferred period',
      required: true,
      width: 'half',
    },
    {
      name: 'attachment',
      label: 'Supporting document',
      type: 'file',
      width: 'half',
      accept: '.pdf,.doc,.docx,.ppt,.pptx',
      help: 'Optional brief, proposal, problem statement or organisation profile.',
    },
  ];

  return (
    <div>
      <Eyebrow>Collaboration requests</Eyebrow>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
        Start with the shared opportunity—not a generic partnership message.
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#657069]">
        The form adapts its central prompt to the kind of contributor initiating the conversation.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Collaboration type">
        {COLLABORATION_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={cn(
              'rounded-full border px-4 py-2.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              selectedType === type
                ? 'border-[#1E5F49] bg-[#1E5F49] text-white'
                : 'border-black/10 bg-white text-[#5F6862] hover:border-black/20',
            )}
            aria-pressed={selectedType === type}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="mt-7 rounded-[30px] border border-black/9 bg-white p-6 sm:p-9 lg:p-11">
        <DynamicForm
          formId={`collaboration-${selectedType.toLowerCase().replace(/\s+/g, '-')}`}
          workspace="collaboration"
          subtype={selectedType}
          title={`${selectedType} collaboration request`}
          description="Explain the shared problem, the contribution each side can make and the outcome worth exploring together."
          fields={fields}
          submitLabel="Start collaboration conversation"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

function MentorWorkspace({ onSubmit }: { onSubmit?: ApplicationsRequestsHubProps['onSubmit'] }) {
  const fields: FieldConfig[] = [
    ...sharedIdentityFields(),
    {
      name: 'role',
      label: 'Current role',
      type: 'text',
      placeholder: 'Your designation or professional role',
      required: true,
      width: 'half',
    },
    {
      name: 'profile',
      label: 'Professional profile',
      type: 'url',
      placeholder: 'https://',
      width: 'half',
    },
    {
      name: 'expertise',
      label: 'Areas of expertise',
      type: 'textarea',
      placeholder: 'Describe the domains, methods, industries or research areas where you can guide others.',
      required: true,
      minLength: 60,
    },
    {
      name: 'mentorshipInterest',
      label: 'How would you like to contribute?',
      type: 'textarea',
      placeholder: 'Mentoring, technical review, research discussions, project critique, industry context or another contribution.',
      required: true,
      minLength: 60,
    },
    {
      name: 'availability',
      label: 'Indicative availability',
      type: 'text',
      placeholder: 'Example: two hours per month',
      required: true,
      width: 'half',
    },
    {
      name: 'resume',
      label: 'Profile or resume',
      type: 'file',
      width: 'half',
      accept: '.pdf,.doc,.docx',
      help: 'Optional supporting professional or academic profile.',
    },
    {
      name: 'mentorAcknowledgement',
      label: 'Mentor acknowledgement',
      type: 'checkbox',
      required: true,
      placeholder:
        'I understand that this is an expression of interest and that mentorship opportunities depend on research needs and suitable alignment.',
    },
  ];

  return (
    <div>
      <Eyebrow>Mentor interest</Eyebrow>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
        Offer the perspective that helps research become more rigorous.
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#657069]">
        Mentorship may involve questions, critique, domain expertise, technical review or professional context—not simply giving students answers.
      </p>
      <div className="mt-9 rounded-[30px] border border-black/9 bg-white p-6 sm:p-9 lg:p-11">
        <DynamicForm
          formId="mentor-interest"
          workspace="mentor"
          title="Express interest in mentoring"
          description="Tell Ré where your expertise is strongest and the kind of research contribution you are prepared to make."
          fields={fields}
          submitLabel="Send mentor interest"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

function EnquiryWorkspace({ onSubmit }: { onSubmit?: ApplicationsRequestsHubProps['onSubmit'] }) {
  const fields: FieldConfig[] = [
    {
      name: 'fullName',
      label: 'Your name',
      type: 'text',
      placeholder: 'How should we address you?',
      required: true,
      width: 'half',
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      placeholder: 'name@example.com',
      required: true,
      width: 'half',
    },
    {
      name: 'category',
      label: 'What would you like to discuss?',
      type: 'select',
      required: true,
      options: ENQUIRY_CATEGORIES.map((item) => ({ label: item, value: item })),
    },
    {
      name: 'message',
      label: 'Tell us what is on your mind',
      type: 'textarea',
      placeholder:
        'Share the question, context and the kind of response or direction that would be useful.',
      required: true,
      minLength: 50,
      rows: 7,
    },
    {
      name: 'attachment',
      label: 'Optional attachment',
      type: 'file',
      accept: '.pdf,.doc,.docx,.png,.jpg,.jpeg',
      help: 'Add context only when a document or image makes the enquiry clearer.',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
      <div>
        <Eyebrow>General enquiry</Eyebrow>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Begin with what you want to understand.
        </h2>
        <p className="mt-5 text-sm leading-7 text-[#657069]">
          You do not need to know Ré’s internal structure before asking a question. Choose the closest topic and explain the conversation you need.
        </p>
        <div className="mt-8 rounded-[28px] bg-[#17221C] p-7 text-white">
          <MessageCircleMore className="h-6 w-6 text-[#9BD1B8]" />
          <p className="mt-7 text-2xl font-medium leading-tight tracking-[-0.025em]">
            “What would make the next step clearer?”
          </p>
          <p className="mt-4 text-sm leading-6 text-white/52">
            A useful enquiry includes context, the question and the decision or direction you are trying to reach.
          </p>
        </div>
      </div>
      <div className="rounded-[30px] border border-black/9 bg-white p-6 sm:p-9 lg:p-11">
        <DynamicForm
          formId="general-enquiry"
          workspace="enquiry"
          title="Start a conversation"
          description="The category helps route the message. The explanation helps someone understand it."
          fields={fields}
          submitLabel="Send enquiry"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

function WorkspacePanel({
  active,
  selectedProgramme,
  setSelectedProgramme,
  spaces,
  selectedSpace,
  setSelectedSpace,
  circles,
  collaborationType,
  setCollaborationType,
  onSubmit,
}: {
  active: HubWorkspaceId;
  selectedProgramme: ProgrammeId;
  setSelectedProgramme: (id: ProgrammeId) => void;
  spaces: WorkspaceInfo[];
  selectedSpace: string;
  setSelectedSpace: (id: string) => void;
  circles: string[];
  collaborationType: string;
  setCollaborationType: (value: string) => void;
  onSubmit?: ApplicationsRequestsHubProps['onSubmit'];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: 0.28 }}
      >
        {active === 'programme' && (
          <ProgrammeWorkspace
            selected={selectedProgramme}
            setSelected={setSelectedProgramme}
            circles={circles}
            onSubmit={onSubmit}
          />
        )}
        {active === 'workspace' && (
          <WorkspaceBooking
            spaces={spaces}
            selected={selectedSpace}
            setSelected={setSelectedSpace}
            onSubmit={onSubmit}
          />
        )}
        {active === 'resources' && (
          <ResourceWorkspace circles={circles} onSubmit={onSubmit} />
        )}
        {active === 'project' && (
          <ProjectWorkspace circles={circles} onSubmit={onSubmit} />
        )}
        {active === 'collaboration' && (
          <CollaborationWorkspace
            selectedType={collaborationType}
            setSelectedType={setCollaborationType}
            onSubmit={onSubmit}
          />
        )}
        {active === 'mentor' && <MentorWorkspace onSubmit={onSubmit} />}
        {active === 'enquiry' && <EnquiryWorkspace onSubmit={onSubmit} />}
      </motion.div>
    </AnimatePresence>
  );
}

function VisitSection({ details }: { details: VisitDetails }) {
  const contactItems = [
    {
      label: 'Office location',
      value: details.officeLocation,
      empty: 'Verified office location not configured',
      icon: MapPin,
    },
    {
      label: 'Opening hours',
      value: details.openingHours,
      empty: 'Verified opening hours not configured',
      icon: Clock3,
    },
    {
      label: 'Email',
      value: details.email,
      empty: 'Verified email not configured',
      icon: Mail,
    },
    {
      label: 'Phone',
      value: details.phone,
      empty: 'Verified phone number not configured',
      icon: Phone,
    },
  ];

  return (
    <section id="visit" className="scroll-mt-24 border-y border-black/8 bg-[#17211C] text-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-20 lg:py-28">
        <Reveal>
          <Eyebrow light>Visit Ré</Eyebrow>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
            Sometimes the right request begins in person.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/55">
            Add verified location, hours, contact and visitor information through the visitDetails prop. The page intentionally avoids inventing operational details.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[26px] bg-white/10 sm:grid-cols-2">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-[#17211C] p-5">
                  <Icon className="h-4 w-4 text-[#9FD1B9]" />
                  <span className="mt-5 block text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                    {item.label}
                  </span>
                  <p className={cn('mt-2 text-sm leading-6', item.value ? 'text-white/82' : 'text-white/38')}>
                    {item.value ?? item.empty}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative min-h-[560px] overflow-hidden rounded-[34px] border border-white/10 bg-[#203128]">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:46px_46px]" />
          <div className="absolute left-[18%] top-[24%] h-48 w-48 rounded-full bg-[#6BA888]/18 blur-[70px]" />
          <div className="absolute bottom-[18%] right-[13%] h-56 w-56 rounded-full bg-[#557EA5]/16 blur-[80px]" />
          <div className="relative flex h-full min-h-[560px] flex-col justify-between p-7 sm:p-10">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                <Map className="h-4 w-4" />
                Campus map
              </span>
              {details.mapHref ? (
                <a
                  href={details.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#18231D] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Open map
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-semibold text-white/36">
                  Map link not configured
                </span>
              )}
            </div>

            <div className="mx-auto grid h-44 w-44 place-items-center rounded-full border border-white/12 bg-white/[0.05] shadow-2xl backdrop-blur">
              <div className="text-center">
                <span className="font-serif text-5xl italic">Ré</span>
                <span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-white/38">
                  Research & Exploration
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Campus directions', details.campusDirections],
                ['Parking', details.parking],
                ['Visitor guidelines', details.visitorGuidelines],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/10 p-4 backdrop-blur">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                    {label}
                  </span>
                  <p className={cn('mt-2 text-xs leading-5', value ? 'text-white/68' : 'text-white/34')}>
                    {value ?? 'Verified information not configured'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(FAQS.map((item) => item.category)))];

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return FAQS.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery =
        !normalized ||
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section id="faq" className="scroll-mt-24 bg-[#F2F1EC] px-6 py-24 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Help centre</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Search the questions that usually block the next step.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#67706A]">
              The answers avoid claiming policies that have not been supplied. Programme-specific rules should remain attached to official calls and operational approvals.
            </p>

            <label className="relative mt-8 block">
              <span className="sr-only">Search frequently asked questions</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7E8781]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search applications, resources, workspaces…"
                className="w-full rounded-2xl border border-black/10 bg-white py-4 pl-11 pr-4 text-sm outline-none transition focus:border-[#2A6A50] focus:ring-4 focus:ring-[#2A6A50]/10"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    'rounded-full border px-3.5 py-2 text-[11px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    category === item
                      ? 'border-[#1F6048] bg-[#1F6048] text-white'
                      : 'border-black/10 bg-white text-[#68716B] hover:border-black/20',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {results.map((item, index) => (
              <Reveal key={item.question} delay={Math.min(index * 0.035, 0.18)}>
                <article className="h-full rounded-[25px] border border-black/8 bg-white p-6 shadow-[0_10px_34px_rgba(25,35,29,0.035)]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-[#EEF4F0] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#2B684F]">
                      {item.category}
                    </span>
                    <CircleHelp className="h-4 w-4 text-[#A0A8A2]" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-6 tracking-[-0.02em] text-[#202722]">
                    {item.question}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#68716B]">
                    {item.answer}
                  </p>
                </article>
              </Reveal>
            ))}
            {results.length === 0 && (
              <div className="md:col-span-2 rounded-[28px] border border-dashed border-black/15 bg-white/60 px-6 py-14 text-center">
                <Search className="mx-auto h-6 w-6 text-[#8D958F]" />
                <h3 className="mt-4 text-lg font-semibold text-[#303833]">
                  No matching answer
                </h3>
                <p className="mt-2 text-sm text-[#737C76]">
                  Try a broader search or begin a general enquiry.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ApplicationsRequestsHub({
  onNavigate,
  onSubmit,
  researchCircles = [],
  workspaces = DEFAULT_WORKSPACES,
  visitDetails = {},
}: ApplicationsRequestsHubProps) {
  const reduceMotion = useReducedMotion();
  const workspaceRef = useRef<HTMLElement>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<HubWorkspaceId>('programme');
  const [selectedProgramme, setSelectedProgramme] = useState<ProgrammeId>('krest');
  const [selectedSpace, setSelectedSpace] = useState(workspaces[0]?.id ?? 'd101');
  const [collaborationType, setCollaborationType] = useState('Industry');

  const spaces = workspaces.length > 0 ? workspaces : DEFAULT_WORKSPACES;

  useEffect(() => {
    if (!spaces.some((space) => space.id === selectedSpace)) {
      setSelectedSpace(spaces[0].id);
    }
  }, [selectedSpace, spaces]);

  const openWorkspace = (
    workspace: HubWorkspaceId,
    preset?: string,
    shouldScroll = true,
  ) => {
    setActiveWorkspace(workspace);
    if (workspace === 'collaboration' && preset) setCollaborationType(preset);
    if (shouldScroll) {
      window.setTimeout(() => {
        workspaceRef.current?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }, 40);
    }
  };

  return (
    <main className="overflow-hidden bg-[#F7F7F3] text-[#151A17] selection:bg-[#2B6C52]/18">
      <section className="relative min-h-[780px] overflow-hidden bg-[#111A15] text-white lg:min-h-[860px]">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-[#3B8B68]/22 blur-[110px]" />
        <div className="absolute bottom-[8%] right-[8%] h-80 w-80 rounded-full bg-[#416D99]/18 blur-[120px]" />

        <div className="relative mx-auto grid min-h-[780px] max-w-[1440px] grid-cols-1 items-center gap-14 px-6 py-28 lg:min-h-[860px] lg:grid-cols-[1.04fr_0.96fr] lg:px-20">
          <div className="max-w-3xl">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('#/')}
                className="mb-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Ré
              </button>
            )}

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/62 backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-[#9FD4B9]" />
              Ré Research Operations
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.05 }}
              className="mt-7 text-[50px] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl lg:text-[88px]"
            >
              Applications
              <span className="block font-serif font-normal italic text-[#A4CEB9]">
                & Requests
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.11 }}
              className="mt-8 max-w-2xl text-base leading-8 text-white/60 sm:text-lg"
            >
              One intelligent workspace for programme applications, room bookings,
              research resources, project submissions, collaborations, mentorship
              and every conversation that begins with Ré.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.17 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={() => scrollToId('services', reduceMotion)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#132019] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111A15]"
              >
                Start a request
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToId('services', reduceMotion)}
                className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore available services
                <ArrowDown className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.14 }}
            className="relative mx-auto hidden aspect-square w-full max-w-[580px] lg:block"
            aria-label="Applications and requests service map"
          >
            <div className="absolute inset-[13%] rounded-full border border-white/10" />
            <div className="absolute inset-[28%] rounded-full border border-dashed border-white/10" />
            <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/13 bg-white/[0.055] shadow-2xl backdrop-blur-md">
              <div className="text-center">
                <span className="font-serif text-5xl italic">Ré</span>
                <span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-white/38">
                  One gateway
                </span>
              </div>
            </div>

            {[
              { label: 'Applications', icon: GraduationCap, position: 'left-[2%] top-[18%]' },
              { label: 'Workspaces', icon: CalendarDays, position: 'right-[0%] top-[14%]' },
              { label: 'Resources', icon: Wrench, position: 'right-[-2%] bottom-[24%]' },
              { label: 'Projects', icon: Lightbulb, position: 'left-[35%] bottom-[0%]' },
              { label: 'Collaborations', icon: Handshake, position: 'left-[-1%] bottom-[24%]' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, index % 2 === 0 ? -7 : 7, 0] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 5.2 + index * 0.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                  }
                  className={`absolute ${item.position} w-[165px] rounded-2xl border border-white/10 bg-[#17251D]/90 p-4 shadow-xl backdrop-blur`}
                >
                  <Icon className="h-4 w-4 text-[#9BD0B6]" />
                  <p className="mt-4 text-sm font-semibold text-white/88">{item.label}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/32">
                    Start here
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <nav className="sticky top-0 z-40 border-b border-black/8 bg-[#F7F7F3]/90 backdrop-blur-xl" aria-label="Hub sections">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto px-6 py-3 lg:px-20">
          {[
            ['Services', 'services'],
            ['Active workspace', 'request-workspace'],
            ['Visit Ré', 'visit'],
            ['Help centre', 'faq'],
          ].map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToId(id, reduceMotion)}
              className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-[#626B65] transition hover:bg-white hover:text-[#1D2A22] focus:outline-none focus-visible:ring-2"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <section id="services" className="scroll-mt-24 px-6 py-24 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <Eyebrow>Choose your intent</Eyebrow>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                What are you trying to move forward?
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#67706A]">
              Select the closest intent. The hub opens a focused workspace instead of presenting every form at once.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICE_CARDS.map((item, index) => (
              <Reveal key={item.id} delay={Math.min(index * 0.045, 0.2)}>
                <ServiceCard
                  item={item}
                  active={activeWorkspace === item.workspace}
                  onClick={() => openWorkspace(item.workspace, item.preset)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={workspaceRef}
        id="request-workspace"
        className="scroll-mt-20 border-y border-black/8 bg-[#EEEFEA] px-6 py-20 lg:px-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#17221C] text-white">
                <FlaskConical className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7D857F]">
                  Active workspace
                </p>
                <p className="mt-1 text-sm font-semibold capitalize text-[#222A25]">
                  {activeWorkspace === 'programme'
                    ? 'Programme applications'
                    : activeWorkspace}
                </p>
              </div>
            </div>

            <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-black/9 bg-white/65 p-1">
              {([
                ['programme', GraduationCap],
                ['workspace', CalendarDays],
                ['resources', PackageSearch],
                ['project', Lightbulb],
                ['collaboration', Handshake],
                ['mentor', UserRound],
                ['enquiry', MessageCircleMore],
              ] as Array<[HubWorkspaceId, React.ComponentType<{ className?: string }>]>).map(([id, Icon]) => (
                <button
                  key={id as string}
                  type="button"
                  onClick={() => openWorkspace(id as HubWorkspaceId, undefined, false)}
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full transition focus:outline-none focus-visible:ring-2',
                    activeWorkspace === id
                      ? 'bg-[#17221C] text-white'
                      : 'text-[#7A837D] hover:bg-white hover:text-[#243029]',
                  )}
                  aria-label={`Open ${id} workspace`}
                  aria-pressed={activeWorkspace === id}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-black/8 bg-[#F8F8F5] p-5 shadow-[0_24px_70px_rgba(25,35,29,0.06)] sm:p-8 lg:p-12">
            <WorkspacePanel
              active={activeWorkspace}
              selectedProgramme={selectedProgramme}
              setSelectedProgramme={setSelectedProgramme}
              spaces={spaces}
              selectedSpace={selectedSpace}
              setSelectedSpace={setSelectedSpace}
              circles={researchCircles}
              collaborationType={collaborationType}
              setCollaborationType={setCollaborationType}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </section>

      <VisitSection details={visitDetails} />
      <FAQSection />

      <section className="px-6 py-24 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[38px] bg-[#DCEBE2]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="p-8 sm:p-12 lg:p-16">
              <Eyebrow>Before you leave</Eyebrow>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
                Your next research journey starts with one clear request.
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#52625A]">
                You do not need to understand every internal process. Choose what you want to move forward and give Ré the context needed to respond intelligently.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-px bg-[#BFD1C7]">
              {([
                ['Apply', 'programme', GraduationCap],
                ['Book workspace', 'workspace', CalendarDays],
                ['Request resources', 'resources', PackageSearch],
                ['Contact Ré', 'enquiry', MessageCircleMore],
              ] as Array<[string, HubWorkspaceId, React.ComponentType<{ className?: string }>]>).map(([label, id, Icon]) => (
                <button
                  key={label as string}
                  type="button"
                  onClick={() => openWorkspace(id as HubWorkspaceId)}
                  className="group flex min-h-[180px] flex-col justify-between bg-[#DCEBE2] p-6 text-left transition hover:bg-[#E8F2EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                >
                  <Icon className="h-5 w-5 text-[#2C664F]" />
                  <span className="flex items-center justify-between gap-3 text-sm font-semibold text-[#25352C]">
                    {label as string}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
