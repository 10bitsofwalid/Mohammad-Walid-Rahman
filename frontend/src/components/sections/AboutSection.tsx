import React from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { ASSETS } from '../../assets';
import { User } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { about, authorName } = PORTFOLIO_DATA;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image Card with Experience Badge */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 group">
            <img
              src={ASSETS.profilePic}
              alt={authorName}
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Experience Badge Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
              <div className="text-2xl font-extrabold text-[#0F172A] dark:text-white">2+</div>
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Years Experience
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Stats */}
        <div className="lg:col-span-7 space-y-8">
          {/* Badge + Heading */}
          <div className="space-y-3">
            <div className="mockup-badge">
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{about.badge}</span>
            </div>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight"
            >
              {about.title}
            </h2>
          </div>

          {/* Bio Paragraphs */}
          <div className="space-y-4 text-[#475569] dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            {about.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* 4 Stat Cards in a row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {about.stats.map((stat, idx) => {
              const displayVal =
                'numericValue' in stat ? `${stat.numericValue}${stat.suffix || ''}` : stat.value;
              const isInfinity = displayVal === '∞';
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-4 text-left shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div
                    className={`font-extrabold text-[#0F172A] dark:text-white mb-0.5 ${isInfinity ? 'text-3xl text-[#4F46E5]' : 'text-2xl sm:text-3xl'}`}
                  >
                    {displayVal}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
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
