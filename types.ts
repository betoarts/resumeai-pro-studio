export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  year: string;
}

export interface ResumeData {
  id: string;
  name: string;
  versionName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  courses: Course[];
  skills: string; // Comma separated for simplicity in UI, parsed for display
  photoUrl?: string;
}

export interface AtsAnalysisResult {
  score: number;
  suggestions: string[];
  missingKeywords: string[];
}

export interface DashboardMetric {
  id: string;
  versionName: string;
  dateCreated: string;
  sector: string;
  appliedCount: number;
  emailResponseCount: number;
  interviewCount: number;
  openRate: number; // Calculated
  atsScore: number;
}

export enum AppSection {
  EDITOR = 'EDITOR',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS'
}