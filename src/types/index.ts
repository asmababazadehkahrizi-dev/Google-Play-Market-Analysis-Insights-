export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "email";
}

export interface Project {
  slug: string;
  title: string;
  label: string;
  category: string;
  summary: string;
  businessProblem: string;
  solution: string;
  outcomes: string[];
  technologies: string[];
  image: string;
  gallery: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: number;
  }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  credential: string;
  field: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}
