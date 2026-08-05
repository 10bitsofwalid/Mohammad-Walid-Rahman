import React from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { Briefcase, GraduationCap, Book, Shield } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experience, education } = PORTFOLIO_DATA;

  const eduIcons = [GraduationCap, Book, Shield];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Column: Experience Timeline */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="mockup-badge">
              <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{experience.badge}</span>
            </div>
            <h2
              id="experience-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight"
            >
              {experience.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {experience.subtitle}
            </p>
          </div>

          {/* Timeline List */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100 dark:before:bg-indigo-950">
            {experience.items.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-[#4F46E5] ring-4 ring-white dark:ring-gray-950 group-hover:scale-125 transition-transform" />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-[#0F172A] dark:text-white">
                      {item.role}
                    </h3>
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {item.company}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Education Timeline */}
        <div id="education" className="space-y-8">
          <div className="space-y-2">
            <div className="mockup-badge">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{education.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              {education.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {education.subtitle}
            </p>
          </div>

          {/* Timeline List */}
          <div className="relative pl-10 space-y-8 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-100 dark:before:bg-indigo-950">
            {education.items.map((item, idx) => {
              const IconComp = eduIcons[idx] ?? GraduationCap;
              return (
                <div key={idx} className="relative group">
                  {/* Timeline Icon Node */}
                  <div className="absolute -left-10 top-0.5 w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-[#4F46E5] dark:text-indigo-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-[#0F172A] dark:text-white">
                        {item.degree}
                      </h3>
                      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {item.institution}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
