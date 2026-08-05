import React, { useState, useEffect, useMemo } from 'react';
import { SectionHeader, GlassCard, Badge, Button, Input, CardSkeleton } from '../common';
import { apiService } from '../../services';
import { BlogPost } from '../../types';
import { useFocusTrap } from '../../hooks';
import { Clock, Calendar, Search, X, BookOpen, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { cn } from '../../utils/cn';

const FALLBACK_BLOGS: BlogPost[] = [
  {
    _id: '1',
    title: 'Architecting Apple-Grade Design Systems in React & TypeScript',
    slug: 'apple-grade-design-systems-react-typescript',
    summary:
      'How to engineer scalable HSL design token pipelines, accessible ARIA components, and fluid typography scales for sub-second UI rendering.',
    content: `
# Architecting Apple-Grade Design Systems in React & TypeScript

Building enterprise design systems requires balancing aesthetic perfection with strict software engineering discipline. In this article, we explore how to structure HSL CSS variable design tokens alongside type-safe React 18 component primitives.

## 1. HSL Design Token Architecture

Using raw hex colors leads to fragile themes. HSL (Hue, Saturation, Lightness) color space allows dynamic alpha blending and dark/light mode calculations:

\`\`\`css
:root {
  --hsl-accent-primary: 212 100% 60%;
  --color-accent-primary: hsl(var(--hsl-accent-primary));
  --color-accent-glow: hsla(var(--hsl-accent-primary) / 0.25);
}
\`\`\`

## 2. Type-Safe Component Polymorphism

Using TypeScript's \`React.forwardRef\` alongside polymorphic \`as\` prop patterns ensures maximum flexibility without sacrificing type safety.

## 3. Sub-second Rendering & GPU Acceleration

By enforcing hardware-accelerated CSS properties (\`transform\`, \`opacity\`, \`backdrop-filter\`) and avoiding expensive layout reflows, modern web apps achieve buttery 60fps animations on mobile and desktop.
    `,
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Design Systems', 'CSS'],
    readingTime: '5 min read',
    publishedAt: '2024-02-15',
    featured: true,
  },
  {
    _id: '2',
    title: 'Scaling Node.js REST APIs to 10k Requests/Sec with MongoDB Aggregation',
    slug: 'scaling-nodejs-apis-mongodb-aggregation',
    summary:
      'Deep dive into Node.js event loop optimization, Redis caching layers, Zod validation pipelines, and MongoDB compound indexing strategies.',
    content: `
# Scaling Node.js REST APIs to 10k Requests/Sec

When scaling Node.js backends for high-concurrency enterprise workloads, I/O bottlenecks and database query latencies are the primary failure points.

## 1. Compound Indexing in MongoDB

Without proper compound indexes, complex filtering and pagination degrade to full collection scans. Enforcing compound indexes matching query sorting parameters keeps p99 latencies under 20ms:

\`\`\`typescript
// Mongoose Compound Index
schema.index({ category: 1, featured: -1, order: 1 });
\`\`\`

## 2. Non-blocking Middleware Pipelines

Utilizing fast async middleware wrappers and Zod schema validation prevents invalid payloads from reaching application logic layers.
    `,
    coverImage:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'MongoDB', 'Performance'],
    readingTime: '7 min read',
    publishedAt: '2024-01-20',
    featured: true,
  },
  {
    _id: '3',
    title: 'Zero-Downtime Microservices Deployment with Docker & GitHub Actions',
    slug: 'zero-downtime-docker-github-actions',
    summary:
      'A step-by-step guide to configuring automated CI/CD pipelines, containerizing Node.js applications, and running zero-downtime deployments.',
    content: `
# Zero-Downtime Microservices Deployment with Docker

Modern cloud infrastructure demands automated deployments without dropping customer connections.

## 1. Multi-Stage Docker Builds

Using multi-stage Docker builds reduces production image sizes from 1.2GB down to under 120MB, speeding up container spin-up times dramatically.

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
\`\`\`
    `,
    coverImage:
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    category: 'DevOps',
    tags: ['Docker', 'DevOps', 'AWS', 'CI/CD'],
    readingTime: '6 min read',
    publishedAt: '2023-12-10',
    featured: false,
  },
];

export const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const modalRef = useFocusTrap<HTMLDivElement>({
    active: !!activeArticle,
    onEscape: () => setActiveArticle(null),
  });

  useEffect(() => {
    let isMounted = true;
    apiService
      .getBlogs()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setBlogs(data);
        } else if (isMounted) {
          setBlogs(FALLBACK_BLOGS);
        }
      })
      .catch(() => {
        if (isMounted) setBlogs(FALLBACK_BLOGS);
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
    { label: 'Frontend', key: 'Frontend' },
    { label: 'Backend', key: 'Backend' },
    { label: 'DevOps', key: 'DevOps' },
    { label: 'Architecture', key: 'Architecture' },
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      const matchesQuery =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <section
      id="blogs"
      aria-labelledby="blogs-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeader
        badge="Technical Articles"
        title="Engineering Insights & Publications"
        subtitle="Deep dives into software architecture, frontend design systems, database scaling, and DevOps pipelines."
      />

      {/* Controls Bar: Category Pills & Real-Time Search Box */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full glass-panel border border-[var(--color-border-subtle)] w-full md:w-auto">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
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

        {/* Real-time Search Box */}
        <div className="w-full md:w-72">
          <Input
            placeholder="Search articles or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-[var(--color-text-muted)]" />}
            rightIcon={
              searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:text-[var(--color-text-primary)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : undefined
            }
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <GlassCard padding="lg" className="text-center py-16 space-y-3 max-w-md mx-auto">
          <div className="text-base font-bold text-[var(--color-text-primary)]">
            No articles found
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            No matching articles for "{searchQuery}". Try clearing your search query.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs font-semibold text-[var(--color-accent-primary)] hover:underline pt-2"
          >
            Reset Filters
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <GlassCard
              key={post._id}
              padding="none"
              className="flex flex-col justify-between overflow-hidden group hover:border-[var(--color-accent-primary)]/40 transition-all duration-300"
            >
              <div>
                {/* Cover Image Container */}
                <div className="h-48 w-full overflow-hidden relative bg-[var(--color-surface-hover)]">
                  <img
                    src={
                      post.coverImage ||
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="accent">{post.category}</Badge>
                  </div>
                </div>

                {/* Article Meta & Summary */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] font-medium">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[var(--color-accent-primary)]" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.readingTime || '5 min read'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-[10px] font-medium text-[var(--color-text-muted)] bg-[var(--color-surface-hover)] px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Button
                  variant="glass"
                  size="sm"
                  fullWidth
                  onClick={() => setActiveArticle(post)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Read Article
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Interactive Article Modal Reader */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setActiveArticle(null)}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative max-w-3xl w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-strong)] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto animate-fade-in-up space-y-6 outline-none"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
              <div className="flex items-center gap-2">
                <Badge variant="accent">{activeArticle.category}</Badge>
                <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {activeArticle.readingTime || '5 min read'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]"
                aria-label="Close article"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Article Title & Cover */}
            <div className="space-y-4">
              <h2
                id="article-modal-title"
                className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] leading-snug"
              >
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                <span>Published on {formatDate(activeArticle.publishedAt)}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[var(--color-accent-primary)]">
                  <BookOpen className="w-3.5 h-3.5" />
                  Technical Publication
                </span>
              </div>

              {activeArticle.coverImage && (
                <div className="w-full h-64 rounded-xl overflow-hidden bg-[var(--color-surface-hover)]">
                  <img
                    src={activeArticle.coverImage}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Article Markdown Content Body */}
            <div className="prose prose-invert max-w-none text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed space-y-4 font-sans">
              <div className="p-4 rounded-xl bg-[var(--color-surface-base)] border-l-4 border-[var(--color-accent-primary)] text-xs sm:text-sm font-medium text-[var(--color-text-primary)]">
                {activeArticle.summary}
              </div>

              <div className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {activeArticle.content}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {activeArticle.tags.map((t) => (
                  <Badge key={t} variant="glass">
                    #{t}
                  </Badge>
                ))}
              </div>

              <Button variant="secondary" size="sm" onClick={() => setActiveArticle(null)}>
                Close Reader
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
