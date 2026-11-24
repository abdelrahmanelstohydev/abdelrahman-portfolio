export interface PersonalDetails {
  name: string;
  roleTitles: string[];
  university: string;
  faculty: string;
  status: string;
  bio: string;
  aboutIntro: string;
  aboutSecondary: string;
  aboutBelief: string;
  aboutConclusion: string;
  profileImage: string;
  cvUrl: string;
  whatsappUrl: string;
  whatsappDisplay: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface AboutCard {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
  isPlaceholder: boolean;
}

export interface EducationItem {
  institution: string;
  faculty: string;
  fieldOfStudy: string;
  degree: string;
  status: string;
  startYear: string;
  expectedGraduation: string;
  description: string;
  coursework: string[];
  achievements: string[];
  isPlaceholderDetails: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  employmentType: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  isPlaceholder: boolean;
}

export interface SkillItem {
  name: string;
  icon: string;
  category: string;
  highlight?: boolean;
  proficiency?: 'Advanced' | 'Good' | 'Intermediate';
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'backend' | 'frontend' | 'fullstack';
  categoryLabel: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  image: string;
  isSamplePlaceholder: boolean;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  feedback: string;
  avatar: string;
  rating: number;
  isSamplePlaceholder: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}
