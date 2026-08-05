import React, { memo } from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { Briefcase, ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  tags: readonly string[];
  image: string;
  demoUrl: string;
  githubUrl?: string;
}

const ProjectCard = memo(({ project }: { project: ProjectItem }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group">
    {/* Banner Preview Image */}
    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Content Body */}
    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
      <div className="space-y-2">
        <h3 className="text-base font-bold text-[#0F172A] dark:text-white leading-snug group-hover:text-[#4F46E5] transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tag Pills */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Card Footer Link */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#0F172A] dark:text-white hover:text-[#4F46E5] flex items-center gap-1 group/link transition-colors"
        >
          <span>View Project</span>
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
        </a>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} in new tab`}
            className="text-gray-400 hover:text-[#4F46E5] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

export const ProjectsSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Badge Header & Right Action */}
      <div className="flex flex-col items-start space-y-3 mb-8">
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
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="light-pill-btn text-sm px-5 py-2.5 hover:no-underline shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 3 Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {projects.items.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};
