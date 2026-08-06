import React from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { Briefcase, ArrowRight, Github, PlusIcon } from 'lucide-react';
import { CoverflowCarousel, CoverflowSlide } from '../ui/CoverflowCarousel';

export const ProjectsSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  // Transform project items into Coverflow slides
  const slides: CoverflowSlide[] = projects.items.map((project) => ({
    src: project.image,
    alt: project.title,
    title: project.title,
    subtitle: project.description,
    project: project,
  }));

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Badge Header & Right Action */}
      <div className="flex flex-col items-start space-y-3 mb-6">
        <div className="mockup-badge">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{projects.badge}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              {projects.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
              {projects.subtitle}
            </p>
          </div>

          <a
            href="https://github.com/10bitsofwalid"
            target="_blank"
            rel="noopener noreferrer"
            className="light-pill-btn text-sm px-5 py-2.5 hover:no-underline shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 3D Coverflow Carousel Showcase */}
      <div className="pt-2">
        <CoverflowCarousel
          slides={slides}
          cardWidth="clamp(280px, 45vw, 420px)"
          aspectRatio={1.5}
          rotate={38}
          depth={0.55}
          perspective={2.8}
          gap={0.08}
          loop={true}
          showNavigation={true}
          showPagination={true}
          showCaption={true}
          label="Project Showcase"
          renderCard={(slide) => {
            const proj = slide.project;
            return (
              <div className="relative w-full h-full group overflow-hidden bg-slate-900">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-400 mb-1">
                    Featured Project
                  </span>
                  <h3 className="text-base sm:text-lg font-bold line-clamp-1 group-hover:text-indigo-300 transition-colors">
                    {proj.title}
                  </h3>
                </div>
              </div>
            );
          }}
          renderCaption={(activeSlide) => {
            if (!activeSlide) return null;
            const proj = activeSlide.project;
            return (
              <div className="relative mt-6 max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 shadow-xl backdrop-blur-md transition-all duration-300">
                <PlusIcon className="absolute -top-3 -left-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
                <PlusIcon className="absolute -top-3 -right-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
                <PlusIcon className="absolute -bottom-3 -left-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
                <PlusIcon className="absolute -right-3 -bottom-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between gap-3">
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
                    >
                      <span>View Live Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
};

