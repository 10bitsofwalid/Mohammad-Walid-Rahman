import React, { useState } from 'react';
import { SectionHeader, GlassCard, Badge, Button } from '../common';
import {
  Code,
  Layout,
  Cloud,
  Server,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  technologies: string[];
}

const SERVICES: ServiceItem[] = [
  {
    icon: Code,
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web applications built with React 18, TypeScript, Node.js, Express, and MongoDB. Tailored for high availability and sub-second load times.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    icon: Layout,
    title: 'Frontend Architecture & Design Systems',
    description:
      'Pixel-perfect component systems built with HSL design tokens, accessible ARIA primitives, dark/light theme engines, and fluid responsive layouts.',
    technologies: ['React', 'TypeScript', 'Vanilla CSS', 'Tailwind', 'Storybook'],
  },
  {
    icon: Server,
    title: 'REST / GraphQL Backend Systems',
    description:
      'Scalable backend APIs with Zod payload validation, JWT authentication, rate limiting, MongoDB aggregation pipelines, and comprehensive error handling.',
    technologies: ['Node.js', 'Express', 'Zod', 'JWT', 'Mongoose', 'PostgreSQL'],
  },
  {
    icon: Cloud,
    title: 'Cloud DevOps & CI/CD Pipelines',
    description:
      'Cloud deployment automation using Docker containers, AWS infrastructure, automated GitHub Actions testing, and 24/7 uptime monitoring.',
    technologies: ['Docker', 'AWS', 'GitHub Actions', 'Vite', 'Nginx'],
  },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Discovery & Architecture',
    description:
      'Requirement gathering, scope definition, database schema design, and system architecture planning to lay a rock-solid technical foundation.',
    deliverables: [
      'System Architecture Diagram',
      'Database Schema Model',
      'Technical Spec Document',
    ],
    tech: ['System Design', 'Zod Schemas', 'ERD Diagrams'],
  },
  {
    step: '02',
    title: 'UI/UX & Design System',
    description:
      'Translating product goals into an Apple-grade visual design system with HSL color tokens, typography scales, glassmorphism components, and fluid layouts.',
    deliverables: ['Design System Tokens', 'Responsive Layout Shell', 'Interactive Prototypes'],
    tech: ['HSL Tokens', 'CSS Architecture', 'Figma'],
  },
  {
    step: '03',
    title: 'Full-Stack Engineering',
    description:
      'Iterative, type-safe development across client and server workspaces. Building clean React components and Express REST API endpoints.',
    deliverables: ['Clean TypeScript Codebase', 'REST API Endpoints', 'Zustand State Engine'],
    tech: ['React 18', 'Node.js', 'TypeScript', 'MongoDB'],
  },
  {
    step: '04',
    title: 'Testing, QA & Security',
    description:
      'Rigorous automated typechecking, linting rules, input sanitization, security middleware, and Lighthouse 100/100 performance optimization.',
    deliverables: ['Zero Lint Errors', '100/100 Lighthouse Score', 'Security Audit Report'],
    tech: ['ESLint', 'Prettier', 'TypeScript tsc', 'Lighthouse'],
  },
  {
    step: '05',
    title: 'Cloud Deployment & Launch',
    description:
      'Building production bundles, containerizing services, deploying to cloud servers with SSL certificates, and setting up monitoring.',
    deliverables: ['Live Production URL', 'CI/CD Automated Deployment', 'Monitoring Dashboards'],
    tech: ['Docker', 'AWS / Vercel', 'GitHub Actions'],
  },
];

const OFFERING_TIERS = [
  {
    name: 'MVP Development',
    badge: 'Popular for Startups',
    description: 'Rapid, production-ready MVP web application built in 2–4 weeks.',
    features: [
      'Custom React 18 & TypeScript Frontend',
      'Express REST API & MongoDB Database',
      'Dark / Light Theme & Responsive Layout',
      'Deployment to Vercel / AWS Cloud',
    ],
    recommended: false,
  },
  {
    name: 'Full-Stack Product',
    badge: 'Most Popular',
    description: 'Comprehensive enterprise web product with custom architecture & CMS API.',
    features: [
      'Complete React + Node.js Codebase',
      'Advanced Zustand & React Query State',
      'Design System & Glassmorphism UI',
      'CI/CD Pipeline & Automated Tests',
      'SEO & Performance Optimization',
    ],
    recommended: true,
  },
  {
    name: 'Architecture Audit',
    badge: 'Consulting',
    description: 'Deep performance tuning, code refactoring, and security audit for existing apps.',
    features: [
      'Lighthouse 100/100 Performance Tuning',
      'TypeScript Strict Type Refactoring',
      'Backend Latency & Query Optimization',
      'Comprehensive Technical Report',
    ],
    recommended: false,
  },
];

export const ServicesSection: React.FC = () => {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(0);

  const activeWorkflow = WORKFLOW_STEPS[activeWorkflowIndex] || WORKFLOW_STEPS[0];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="Services & Process"
        title="Engineering Services & Workflow"
        subtitle="End-to-end software engineering solutions crafted with discipline, performance, and Apple-grade elegance."
      />

      {/* Core Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {SERVICES.map((service) => {
          const IconComponent = service.icon;
          return (
            <GlassCard
              key={service.title}
              padding="lg"
              className="space-y-4 group hover:border-[var(--color-accent-primary)]/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-glow)] border border-[var(--color-accent-primary)]/20 flex items-center justify-center text-[var(--color-accent-primary)] group-hover:scale-110 transition-transform duration-200">
                <IconComponent className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                {service.title}
              </h3>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
                {service.technologies.map((tech) => (
                  <Badge key={tech} variant="glass">
                    {tech}
                  </Badge>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* 5-Step Interactive Development Workflow */}
      <div className="mb-20 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="accent" icon={<GitBranch className="w-3.5 h-3.5" />}>
            Development Process
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)]">
            5-Step Engineering Workflow
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Click through each pipeline phase to explore the structured development methodology.
          </p>
        </div>

        {/* Workflow Step Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = activeWorkflowIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveWorkflowIndex(idx)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0 border',
                  isActive
                    ? 'bg-[var(--gradient-accent)] text-white border-transparent shadow-md'
                    : 'glass-pill text-[var(--color-text-secondary)] border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]'
                )}
              >
                <span className="opacity-80">{step.step}.</span>
                <span>{step.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Workflow Highlight Card */}
        <GlassCard padding="lg" className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold gradient-text-accent">
                {activeWorkflow.step}
              </span>
              <div>
                <h4 className="text-xl font-bold text-[var(--color-text-primary)]">
                  {activeWorkflow.title}
                </h4>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Phase {activeWorkflowIndex + 1} of 5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeWorkflow.tech.map((t) => (
                <Badge key={t} variant="glass">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
            {activeWorkflow.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)]">
            <span className="text-xs font-semibold text-[var(--color-text-primary)]">
              Key Phase Deliverables:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeWorkflow.deliverables.map((deliv, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-primary)] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)] shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Transparent Service Offering Tiers (Optional Pricing Guide) */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="accent" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Service Offerings
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)]">
            Project Engagement Models
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Flexible collaboration structures tailored to startup launches or enterprise upgrades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OFFERING_TIERS.map((tier) => (
            <GlassCard
              key={tier.name}
              padding="lg"
              className={cn(
                'flex flex-col justify-between space-y-6 relative transition-all duration-300',
                tier.recommended &&
                  'border-[var(--color-accent-primary)] shadow-lg shadow-[var(--color-accent-glow)]'
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={tier.recommended ? 'accent' : 'glass'}>{tier.badge}</Badge>
                  {tier.recommended && <Zap className="w-5 h-5 text-amber-400" />}
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[var(--color-text-primary)]">
                    {tier.name}
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{tier.description}</p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)]">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[var(--color-accent-primary)] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <a href="#contact">
                  <Button
                    variant={tier.recommended ? 'primary' : 'secondary'}
                    fullWidth
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Discuss Project
                  </Button>
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
