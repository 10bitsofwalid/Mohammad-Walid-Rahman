export interface RouteItem {
  id: string;
  label: string;
  path: string;
  isSectionLink: boolean;
}

export const NAV_ROUTES: RouteItem[] = [
  { id: 'hero', label: 'Home', path: '#hero', isSectionLink: true },
  { id: 'about', label: 'About', path: '#about', isSectionLink: true },
  { id: 'skills', label: 'Skills', path: '#skills', isSectionLink: true },
  { id: 'projects', label: 'Projects', path: '#projects', isSectionLink: true },
  { id: 'experience', label: 'Experience', path: '#experience', isSectionLink: true },
  { id: 'education', label: 'Education', path: '#education', isSectionLink: true },
  { id: 'github', label: 'GitHub Activity', path: '#github', isSectionLink: true },
  { id: 'certificates', label: 'Certificates', path: '#certificates', isSectionLink: true },
  { id: 'contact', label: 'Contact', path: '#contact', isSectionLink: true },
];

export const SECTION_IDS = NAV_ROUTES.filter((r) => r.isSectionLink).map((r) => r.id);
