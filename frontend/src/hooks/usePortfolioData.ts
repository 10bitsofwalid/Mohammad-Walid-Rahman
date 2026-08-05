import { useQuery, useMutation } from '@tanstack/react-query';
import {
  projectService,
  experienceService,
  skillService,
  settingService,
  contactService,
} from '../services';
import { ContactMessagePayload } from '../types';

export function useProjects(category?: string) {
  return useQuery({
    queryKey: ['projects', category],
    queryFn: () => projectService.getAll(category),
    staleTime: 5 * 60 * 1000,
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: () => experienceService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => skillService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => settingService.getSettings(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useContactMutation() {
  return useMutation({
    mutationFn: (payload: ContactMessagePayload) => contactService.sendMessage(payload),
  });
}
