export interface ResearchArea {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  overview: string;
  projectsList: string[];
  publicationsList: string[];
  labsList: string[];
  researchersList: string[];
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  areaId: string;
  areaName: string;
  status: 'ongoing' | 'completed';
  stage?: 'Product' | 'Prototype';
  leader: string;
  description: string;
  outcome: string;
  details: string;
  tags: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  abstract: string;
  category: string;
  url?: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  facilities: string[];
  coordinator: string;
  contactEmail: string;
  location: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetIndustry: string;
  deadline: string;
  scope: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  specifications: string[];
  accessProcedure: string;
  contactPerson: string;
}

export interface Program {
  id: string;

  title: string;
  tagline: string;

  description: string;
  overview: string;

  programmeJourney: string[];

  activities: string[];

  highlights: {
    label: string;
    value: string;
  }[];

  stories: {
    author: string;
    role: string;
    quote: string;
  }[];

  outcomes: string[];
}

export interface CareerOpportunity {
  id: string;
  title: string;
  type: 'Assistantship' | 'Internship' | 'Faculty' | 'Industry';
  stipendOrPackage?: string;
  description: string;
  requirements: string[];
  process: string[];
  deadline: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Conference' | 'Talk' | 'Seminar' | 'Workshop' | 'Hackathon';
  date: string;
  time: string;
  venue: string;
  speaker?: string;
  description: string;
  agenda: string[];
  status: 'upcoming' | 'past';
}

export interface Member {
  name: string;
  role: string;
  designation: string;
  bio: string;
  image?: string;
  publicationsCount: number;
}
