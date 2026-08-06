import { projectService } from './projectService';
import { experienceService } from './experienceService';
import { skillService } from './skillService';
import { educationService } from './educationService';
import { testimonialService } from './testimonialService';
import { blogService } from './blogService';
import { contactService } from './contactService';
import { settingService } from './settingService';
import { healthService } from './healthService';
import { authService } from './authService';

export const apiService = {
  getProjects: projectService.getAll,
  getFeaturedProjects: projectService.getFeatured,
  getExperiences: experienceService.getAll,
  getSkills: skillService.getAll,
  getFeaturedSkills: skillService.getFeatured,
  getEducation: educationService.getAll,
  getTestimonials: testimonialService.getAll,
  getBlogs: blogService.getAll,
  getSettings: settingService.getSettings,
  sendMessage: contactService.sendMessage,
  getHealth: healthService.getHealth,
  login: authService.login,
};

export * from './apiClient';
export * from './projectService';
export * from './experienceService';
export * from './skillService';
export * from './educationService';
export * from './testimonialService';
export * from './blogService';
export * from './contactService';
export * from './settingService';
export * from './healthService';
export * from './authService';
