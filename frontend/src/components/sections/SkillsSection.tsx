import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

// High-fidelity tech logos matching the design screenshot
const TechLogoIcon: React.FC<{ icon: string; color: string }> = ({
  icon,
  color,
}) => {
  switch (icon) {
    case 'react':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
          <circle cx="50" cy="50" r="8" fill="#61DAFB" />
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="16"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="5"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="16"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="5"
            transform="rotate(60 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="16"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="5"
            transform="rotate(120 50 50)"
          />
        </svg>
      );
    case 'js':
      return (
        <div className="w-10 h-10 rounded-sm bg-[#F7DF1E] flex items-end justify-end p-1">
          <span className="text-black font-extrabold text-sm leading-none">JS</span>
        </div>
      );
    case 'ts':
      return (
        <div className="w-10 h-10 rounded-sm bg-[#3178C6] flex items-end justify-end p-1">
          <span className="text-white font-extrabold text-sm leading-none">TS</span>
        </div>
      );
    case 'node':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
          <path
            d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z"
            fill="#339933"
            opacity="0.15"
          />
          <text x="50" y="62" textAnchor="middle" fill="#339933" fontSize="22" fontWeight="bold">
            Node
          </text>
        </svg>
      );
    case 'express':
      return (
        <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-black dark:text-white font-semibold text-sm italic">ex</span>
        </div>
      );
    case 'mongodb':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <path
            d="M50 10 C50 10 28 35 28 55 C28 73 38 87 50 90 C62 87 72 73 72 55 C72 35 50 10 50 10Z"
            fill="#47A248"
          />
          <path
            d="M50 90 L50 25"
            stroke="#B8C5B8"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <path d="M15 30 Q50 20 85 30 Q50 40 15 30Z" fill="#4479A1" />
          <path d="M15 30 L15 70 Q50 80 85 70 L85 30 Q50 40 15 30Z" fill="#4479A1" opacity="0.7" />
          <path d="M15 50 Q50 60 85 50" stroke="#6EA8D0" strokeWidth="3" fill="none" />
          <path d="M72 15 C80 25 88 10 92 5" stroke="#F29111" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'html5':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <polygon points="14,8 86,8 78,88 50,96 22,88" fill="#E44D26" />
          <polygon points="50,86 72,80 78,16 50,16" fill="#F16529" />
          <polygon points="50,42 34,42 33,32 50,32 50,22 22,22 25,52 50,52" fill="white" />
          <polygon points="50,42 50,52 65,52 63,72 50,75 50,86 72,80 78,16 50,16" fill="#EBEBEB" />
        </svg>
      );
    case 'css3':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <polygon points="14,8 86,8 78,88 50,96 22,88" fill="#1572B6" />
          <polygon points="50,86 72,80 78,16 50,16" fill="#33A9DC" />
          <polygon points="34,42 33,32 50,32 50,22 22,22 25,52 50,52 50,42" fill="white" />
          <polygon points="50,62 50,72 64,68 65,58 50,58 50,52 68,52 70,32 50,32 50,42 59,42 58,52 50,52" fill="#EBEBEB" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <path
            d="M25 37.5 C31.25 18.75 43.75 9.375 62.5 12.5 C53.125 25 50 37.5 56.25 50 C62.5 31.25 75 21.875 93.75 25 C87.5 43.75 75 56.25 56.25 56.25 C50 68.75 43.75 75 31.25 75 C6.25 75 0 56.25 6.25 37.5 C12.5 50 18.75 56.25 25 56.25 C18.75 43.75 18.75 25 25 37.5Z"
            fill="#06B6D4"
          />
          <path
            d="M25 62.5 C31.25 43.75 43.75 34.375 62.5 37.5 C53.125 50 50 62.5 56.25 75 C62.5 56.25 75 46.875 93.75 50 C87.5 68.75 75 81.25 56.25 81.25 C50 93.75 43.75 100 31.25 100 C6.25 100 0 81.25 6.25 62.5 C12.5 75 18.75 81.25 25 81.25 C18.75 68.75 18.75 50 25 62.5Z"
            fill="#06B6D4"
            opacity="0.6"
          />
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <rect width="100" height="100" rx="12" fill="#F05032" />
          <path
            d="M88 46.5 L53.5 12 C51.6 10.1 48.4 10.1 46.5 12 L38.5 20 L48.8 30.3 C51 29.5 53.5 30 55.2 31.8 C57 33.6 57.5 36.1 56.6 38.3 L66.5 48.2 C68.7 47.3 71.2 47.8 73 49.6 C75.5 52.1 75.5 56.2 73 58.7 C70.5 61.2 66.4 61.2 63.9 58.7 C62 56.8 61.5 54 62.6 51.6 L53.2 42.2 L53.2 66.3 C53.9 66.6 54.6 67.1 55.2 67.7 C57.7 70.2 57.7 74.3 55.2 76.8 C52.7 79.3 48.6 79.3 46.1 76.8 C43.6 74.3 43.6 70.2 46.1 67.7 C46.9 66.9 47.8 66.4 48.8 66.1 L48.8 41.7 C47.8 41.4 46.9 40.9 46.1 40.1 C44.1 38.1 43.7 35.1 44.9 32.6 L34.8 22.5 L12 45.3 C10.1 47.2 10.1 50.4 12 52.3 L46.5 86.8 C48.4 88.7 51.6 88.7 53.5 86.8 L88 52.3 C89.9 50.4 89.9 48.4 88 46.5Z"
            fill="white"
          />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <circle cx="50" cy="50" r="48" fill="#181717" />
          <path
            d="M50 8 C26.9 8 8 26.9 8 50 C8 68.6 20.2 84.2 37 89.7 C39.1 90.1 39.9 88.8 39.9 87.7 C39.9 86.7 39.8 83.3 39.8 79.7 C28 82.2 25.5 74.7 25.5 74.7 C23.6 69.9 20.8 68.6 20.8 68.6 C17 66 21.1 66.1 21.1 66.1 C25.3 66.4 27.5 70.4 27.5 70.4 C31.3 77 37.6 74.9 40.1 73.9 C40.5 71.1 41.6 69.2 42.8 68.1 C33.2 67 23.1 63.2 23.1 46.8 C23.1 42.3 24.7 38.7 27.6 35.8 C27.2 34.7 25.7 30.6 28.1 25.1 C28.1 25.1 31.7 23.9 39.9 29.1 C43.4 28.1 47.2 27.6 51 27.6 C54.8 27.6 58.6 28.1 62.1 29.1 C70.3 23.9 73.9 25.1 73.9 25.1 C76.3 30.6 74.8 34.7 74.4 35.8 C77.3 38.7 78.9 42.3 78.9 46.8 C78.9 63.2 68.8 67 59.1 68.1 C60.7 69.5 62.1 72.2 62.1 76.4 C62.1 82.4 62 87.3 62 87.7 C62 88.8 62.8 90.1 64.9 89.7 C81.8 84.2 94 68.6 94 50 C94 26.9 73.1 8 50 8Z"
            fill="white"
          />
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <circle cx="50" cy="50" r="48" fill="#000000" />
          <polygon points="50,22 84,78 16,78" fill="white" />
        </svg>
      );
    case 'azure':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <path d="M37 10 L10 90 L55 90 L90 10Z" fill="#0089D6" opacity="0.7" />
          <path d="M55 10 L90 90 L10 90Z" fill="#0089D6" />
          <path d="M37 10 L63 10 L90 65 L55 90Z" fill="#50B4E8" />
        </svg>
      );
    case 'vscode':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <path d="M72 5 L28 42 L8 28 L5 32 L23 50 L5 68 L8 72 L28 58 L72 95 L95 82 L95 18Z" fill="#007ACC" />
          <path d="M72 5 L28 42 L8 28 L5 32 L23 50 L5 68 L8 72 L28 58 L72 95 L95 82 L95 18Z" fill="url(#vscodeGrad)" opacity="0.4" />
          <defs>
            <linearGradient id="vscodeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1F9CF0" />
              <stop offset="100%" stopColor="#28C7F7" />
            </linearGradient>
          </defs>
          <polygon points="72,5 28,42 28,58 72,95 95,82 95,18" fill="white" opacity="0.15" />
          <polygon points="23,50 8,28 5,32 23,50 5,68 8,72" fill="white" opacity="0.2" />
        </svg>
      );
    case 'flutter':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <polygon points="10,50 45,15 80,15 45,50" fill="#54C5F8" />
          <polygon points="45,50 80,15 80,50 62,68" fill="#01579B" />
          <polygon points="45,50 62,68 80,85 80,50" fill="#29B6F6" opacity="0.8" />
          <polygon points="28,67 45,50 62,68 45,85" fill="#29B6F6" />
          <polygon points="45,85 62,68 80,85" fill="#01579B" opacity="0.5" />
        </svg>
      );
    default:
      return <Zap className="w-8 h-8" style={{ color }} />;
  }
};

export const SkillsSection: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills.items
      : skills.items.filter((item) => item.category === activeCategory);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Badge & Title Row + Filter Pills aligned to design */}
      <div className="flex flex-col items-start space-y-3 mb-8">
        <div className="mockup-badge">
          <Zap className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{skills.badge}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
          <div>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight"
            >
              {skills.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
              {skills.subtitle}
            </p>
          </div>

          {/* Filter Pills — right-aligned matching design */}
          <div
            className="flex flex-wrap gap-2 md:shrink-0"
            role="group"
            aria-label="Filter skills by category"
          >
            {skills.categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${category}`}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]',
                    isActive
                      ? 'bg-[#4F46E5] text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {filteredSkills.length} skills in {activeCategory} category
      </div>

      {/* Grid of Tech Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 pt-4">
        {filteredSkills.map((tech) => (
          <div
            key={tech.name}
            className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-3 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-default"
          >
            <div className="group-hover:scale-110 transition-transform duration-200">
              <TechLogoIcon icon={tech.icon} color={tech.color} />
            </div>
            <span className="text-xs font-semibold text-[#0F172A] dark:text-white leading-tight">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
