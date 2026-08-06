import React from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { Lightbulb, Puzzle, BookOpen, Sparkles, Heart } from 'lucide-react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

const iconStyles: Record<string, { icon: React.ReactNode; bg: string; border: string }> = {
  puzzle: {
    icon: <Puzzle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    bg: 'bg-indigo-50 dark:bg-indigo-950/70',
    border: 'border-indigo-100 dark:border-indigo-800',
  },
  book: {
    icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    bg: 'bg-blue-50 dark:bg-blue-950/70',
    border: 'border-blue-100 dark:border-blue-800',
  },
  sparkles: {
    icon: <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    bg: 'bg-purple-50 dark:bg-purple-950/70',
    border: 'border-purple-100 dark:border-purple-800',
  },
  heart: {
    icon: <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
    bg: 'bg-pink-50 dark:bg-pink-950/70',
    border: 'border-pink-100 dark:border-pink-800',
  },
};

export const BeyondCodeSection: React.FC = () => {
  const { beyondCode } = PORTFOLIO_DATA;

  return (
    <section id="beyond-code" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Badge Header */}
      <div className="flex flex-col items-start space-y-3 mb-10">
        <div className="mockup-badge">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{beyondCode.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
          {beyondCode.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {beyondCode.subtitle}
        </p>
      </div>

      {/* Infinite Moving Cards showcase for Beyond Code / What Drives Me */}
      <div className="w-full">
        <InfiniteMovingCards
          items={beyondCode.items}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          gap={20}
          renderItem={(item) => {
            const style = iconStyles[item.icon ?? 'puzzle'] ?? {
              icon: <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
              bg: 'bg-indigo-50 dark:bg-indigo-950/70',
              border: 'border-indigo-100 dark:border-indigo-800',
            };

            return (
              <div className="w-[280px] sm:w-[340px] bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    {style.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed min-h-[60px]">
                  {item.description}
                </p>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
};
