import React, { useState, useEffect } from 'react';
import { SectionHeader, GlassCard, Badge, Button, Loader } from '../common';
import { apiService } from '../../services';
import { Education } from '../../types';
import {
  GraduationCap,
  Award,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { formatDateRange } from '../../utils/formatters';
import { cn } from '../../utils/cn';

const FALLBACK_EDUCATION: Education[] = [
  {
    _id: '1',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science in Computer Science',
    fieldOfStudy: 'Computer Science & Software Engineering',
    startDate: '2016-08-01',
    endDate: '2020-05-15',
    grade: '3.9 / 4.0 GPA (Magna Cum Laude)',
    description:
      'Rigorous study focused on data structures, algorithms, operating systems, distributed systems, and modern web application development.',
    activities: [
      'Dean’s Honors List (All Semesters)',
      'Lead Tutor for CS61B Data Structures',
      'President of Hackathon & Open Source Developer Club',
    ],
    type: 'Degree',
  },
  {
    _id: '2',
    institution: 'Amazon Web Services (AWS)',
    degree: 'AWS Certified Solutions Architect – Associate',
    fieldOfStudy: 'Cloud Infrastructure & Distributed Systems',
    startDate: '2023-04-10',
    description:
      'Validated technical expertise in designing and deploying scalable, highly available, and fault-tolerant cloud systems on AWS.',
    activities: [
      'VPC Network Architecture & Security Groups',
      'Serverless Microservices (Lambda, DynamoDB, API Gateway)',
      'High-Availability Multi-AZ Database Failover Design',
    ],
    credentialUrl: 'https://aws.amazon.com',
    type: 'Certification',
  },
  {
    _id: '3',
    institution: 'Meta (Coursera Professional Certificate)',
    degree: 'Meta Advanced Front-End Developer Certificate',
    fieldOfStudy: 'React, TypeScript & Web Performance',
    startDate: '2022-11-15',
    description:
      'Professional credential demonstrating mastery of React 18, TypeScript, advanced state management, UX performance optimization, and testing.',
    activities: [
      'Advanced React Hooks & Context Architecture',
      'End-to-End Testing with Jest & React Testing Library',
      'Web Vitals & Lighthouse Performance Optimization',
    ],
    credentialUrl: 'https://meta.com',
    type: 'Certification',
  },
  {
    _id: '4',
    institution: 'Global Tech Hackathon 2023',
    degree: '1st Place Grand Winner – AI & Cloud Category',
    fieldOfStudy: 'Real-time Collaborative Systems',
    startDate: '2023-09-20',
    description:
      'Awarded 1st place among 250+ competing global developer teams for building a real-time collaborative code editor with instant AI debugging.',
    activities: [
      'Built WebSockets sync engine using Node.js & Redis',
      'Implemented real-time visual code diffing',
    ],
    type: 'Award',
  },
];

export const EducationSection: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    apiService
      .getEducation()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setEducationList(data);
          const initialExpanded: Record<string, boolean> = {};
          data.forEach((item) => (initialExpanded[item._id] = true));
          setExpandedItems(initialExpanded);
        } else if (isMounted) {
          setEducationList(FALLBACK_EDUCATION);
          setExpandedItems({ '1': true, '2': true, '3': true, '4': true });
        }
      })
      .catch(() => {
        if (isMounted) {
          setEducationList(FALLBACK_EDUCATION);
          setExpandedItems({ '1': true, '2': true, '3': true, '4': true });
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const CATEGORIES = [
    { label: 'All', key: 'All' },
    { label: 'Degrees', key: 'Degree' },
    { label: 'Certifications', key: 'Certification' },
    { label: 'Awards & Honors', key: 'Award' },
  ];

  const filteredList = educationList.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.type === activeCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeader
        badge="Credentials"
        title="Education & Certifications"
        subtitle="Academic foundation, professional cloud certifications, and technical engineering awards."
      />

      {/* Category Tab Pills */}
      {!loading && (
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full glass-panel border border-[var(--color-border-subtle)]">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    'px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200',
                    isActive
                      ? 'bg-[var(--color-surface-base)] text-[var(--color-accent-primary)] shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {loading ? (
        <Loader size="lg" label="Loading credentials..." />
      ) : filteredList.length === 0 ? (
        <GlassCard padding="lg" className="text-center py-12 max-w-md mx-auto">
          <p className="text-sm text-[var(--color-text-muted)]">No credentials in this category.</p>
          <button
            onClick={() => setActiveCategory('All')}
            className="text-xs font-semibold text-[var(--color-accent-primary)] hover:underline mt-2"
          >
            Show All Credentials
          </button>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {filteredList.map((item) => {
            const isExpanded = expandedItems[item._id] ?? true;
            const isCertification = item.type === 'Certification';
            const isAward = item.type === 'Award';

            return (
              <GlassCard
                key={item._id}
                padding="lg"
                className="space-y-4 group hover:border-[var(--color-accent-primary)]/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] pb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-glow)] border border-[var(--color-accent-primary)]/20 flex items-center justify-center text-[var(--color-accent-primary)] shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200">
                      {isAward ? (
                        <Trophy className="w-5 h-5" />
                      ) : isCertification ? (
                        <Award className="w-5 h-5" />
                      ) : (
                        <GraduationCap className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                          {item.degree}
                        </h3>
                        {item.type && (
                          <Badge
                            variant={isAward ? 'warning' : isCertification ? 'accent' : 'glass'}
                          >
                            {item.type}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-[var(--color-accent-primary)] mt-0.5">
                        {item.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                    <span className="flex items-center font-medium">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[var(--color-accent-primary)]" />
                      {formatDateRange(item.startDate, item.endDate)}
                    </span>

                    <button
                      onClick={() => toggleExpand(item._id)}
                      className="p-1 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors ml-1"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {item.fieldOfStudy && (
                  <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    {item.fieldOfStudy} {item.grade && `• ${item.grade}`}
                  </div>
                )}

                {item.description && (
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Expandable Coursework / Activities */}
                {isExpanded && item.activities && item.activities.length > 0 && (
                  <div className="space-y-2 pt-2 animate-fade-in-up border-t border-[var(--color-border-subtle)]">
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                      {isCertification
                        ? 'Core Domains:'
                        : isAward
                          ? 'Key Highlights:'
                          : 'Academic Focus & Activities:'}
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--color-text-secondary)]">
                      {item.activities.map((act, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent-primary)] shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Verification Credential Button */}
                {item.credentialUrl && (
                  <div className="pt-2 flex justify-end">
                    <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="glass"
                        rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                      >
                        Verify Credential
                      </Button>
                    </a>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      )}
    </section>
  );
};
