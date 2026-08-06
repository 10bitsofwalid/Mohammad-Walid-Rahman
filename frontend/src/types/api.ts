export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  results?: number;
  data: T;
  message?: string;
}

export interface Project {
  _id: string;
  title: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  coverImage?: string;
  tags: string[];
  technologies?: string[];
  category: string;
  demoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  order: number;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Architecture' | 'Tools' | string;
  proficiency: number;
  icon?: string;
  featured: boolean;
  order: number;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  grade?: string;
  activities?: string[];
  credentialUrl?: string;
  type?: 'Degree' | 'Certification' | 'Award';
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SocialLink {
  _id: string;
  platform: string;
  url: string;
  icon?: string;
  order: number;
}

export interface SiteSettings {
  _id?: string;
  siteTitle: string;
  authorName: string;
  roleTitle: string;
  bio: string;
  avatarUrl?: string;
  contactEmail: string;
  location?: string;
  resumeUrl?: string;
  availabilityStatus: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  content: string;
  rating?: number;
  featured?: boolean;
  order?: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  readingTime?: string;
  publishedAt: string;
  featured?: boolean;
}
