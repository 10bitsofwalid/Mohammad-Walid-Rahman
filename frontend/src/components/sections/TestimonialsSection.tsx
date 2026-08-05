import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader, GlassCard, Badge, IconButton, Loader } from '../common';
import { apiService } from '../../services';
import { Testimonial } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2, Building2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: '1',
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'Fintech Cloud Technologies',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    content:
      'Walid is an extraordinary software engineer. He redesigned our core client dashboard with Apple-grade precision, reducing load times by 65% and delivering a flawless user experience ahead of deadline.',
    rating: 5,
    featured: true,
  },
  {
    _id: '2',
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Aetheria SaaS Systems',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content:
      'Working with Walid was a game changer for our backend architecture. He built rock-solid microservices with Express, MongoDB, and TypeScript that handled 5x our peak traffic without a single hiccup.',
    rating: 5,
    featured: true,
  },
  {
    _id: '3',
    name: 'Elena Rostova',
    role: 'Head of Engineering',
    company: 'Nexus Design Systems',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content:
      'His attention to detail in UI craftsmanship, HSL token systems, and responsive layouts is unparalleled. Walid seamlessly bridges high-level architecture with pixel-perfect implementation.',
    rating: 5,
    featured: true,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    apiService
      .getTestimonials()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setTestimonials(data);
        } else if (isMounted) {
          setTestimonials(FALLBACK_TESTIMONIALS);
        }
      })
      .catch(() => {
        if (isMounted) setTestimonials(FALLBACK_TESTIMONIALS);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-play carousel timer (5s) with pause-on-hover & reduced motion check
  useEffect(() => {
    if (loading || testimonials.length <= 1 || isHovered || prefersReducedMotion) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [loading, testimonials.length, isHovered, prefersReducedMotion]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex] || FALLBACK_TESTIMONIALS[0];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <SectionHeader
        badge="Endorsements"
        title="Recommendations & Testimonials"
        subtitle="What engineering leaders, product executives, and CTOs say about collaborating together."
      />

      {loading ? (
        <Loader size="lg" label="Loading recommendations..." />
      ) : (
        <div
          className="relative max-w-4xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client Testimonials Carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          {/* Main Active Testimonial Card */}
          <GlassCard
            padding="lg"
            className="space-y-6 animate-fade-in-up relative overflow-hidden transition-all duration-500 min-h-[320px] flex flex-col justify-between"
          >
            {/* Background Decorative Quote Watermark */}
            <Quote className="absolute right-6 top-6 w-24 h-24 text-[var(--color-accent-glow)] opacity-20 pointer-events-none" />

            <div className="space-y-4 z-10 relative">
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: currentTestimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                  Verified Recommendation
                </Badge>
              </div>

              {/* Quote Content */}
              <blockquote className="text-base sm:text-lg text-[var(--color-text-primary)] font-normal leading-relaxed italic">
                "{currentTestimonial.content}"
              </blockquote>
            </div>

            {/* Author Profile Information */}
            <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-subtle)] z-10 relative">
              <div className="flex items-center gap-3">
                <img
                  src={
                    currentTestimonial.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                  }
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-accent-primary)]/40 shadow-sm"
                />

                <div>
                  <div className="text-base font-bold text-[var(--color-text-primary)]">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)] font-medium flex items-center gap-1.5">
                    <span>{currentTestimonial.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[var(--color-accent-primary)] font-semibold">
                      <Building2 className="w-3 h-3" />
                      {currentTestimonial.company}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <IconButton
                  icon={<ChevronLeft className="w-4 h-4" />}
                  label="Previous recommendation"
                  onClick={handlePrev}
                  variant="glass"
                  size="sm"
                />
                <IconButton
                  icon={<ChevronRight className="w-4 h-4" />}
                  label="Next recommendation"
                  onClick={handleNext}
                  variant="glass"
                  size="sm"
                />
              </div>
            </div>
          </GlassCard>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {testimonials.map((_, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    isActive
                      ? 'w-8 bg-[var(--color-accent-primary)] shadow-xs'
                      : 'w-2 bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-text-muted)]'
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
