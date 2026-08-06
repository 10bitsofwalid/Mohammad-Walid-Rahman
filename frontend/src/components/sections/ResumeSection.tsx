import React from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { FileText, Download, ExternalLink, Sparkles } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { resume } = PORTFOLIO_DATA;

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header Badge & Title */}
      <div className="flex flex-col items-start space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 shadow-xs">
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{resume.badge}</span>
        </div>

        <h2
          id="resume-heading"
          className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight"
        >
          {resume.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
          {resume.subtitle}
        </p>
      </div>

      {/* Main Download Card */}
      <div className="relative bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 dark:from-gray-800/90 dark:via-gray-800/60 dark:to-indigo-950/40 border border-gray-200/80 dark:border-gray-700/80 rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden mb-10 group">
        {/* Soft Ambient Glow in Background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Side: Document Meta & Summary */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* PDF File Icon Graphic */}
            <div className="relative shrink-0">
              <div className="w-20 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 text-white flex flex-col items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <FileText className="w-9 h-9" />
                <span className="text-[10px] font-extrabold tracking-wider mt-1 px-1.5 py-0.5 rounded bg-white/20 uppercase">
                  PDF
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-gray-800">
                <Download className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Document Details */}
            <div className="space-y-3 max-w-xl text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
                  Verified PDF Document
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-400">
                  • Updated {resume.lastUpdated}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                {resume.fileName}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Official CV highlighting full-stack engineering work, MERN & TypeScript project experience, software architecture knowledge, and DIU academic background.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {['MERN Stack', 'TypeScript', 'System Design', 'React & Node.js'].map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/80 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 justify-center">
            <a
              href={resume.fileUrl}
              download={resume.fileName}
              className="dark-pill-btn text-sm px-6 py-3 hover:no-underline inline-flex items-center justify-center gap-2.5 shadow-md hover:shadow-indigo-500/2 shadow-indigo-500/10 group/btn"
              aria-label="Download Resume PDF"
            >
              <Download className="w-4 h-4 text-indigo-300 group-hover/btn:translate-y-0.5 transition-transform" />
              <span className="font-bold">Download Resume</span>
            </a>

            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="light-pill-btn text-sm px-6 py-3 hover:no-underline inline-flex items-center justify-center gap-2.5"
              aria-label="View Resume PDF in Browser"
            >
              <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span>View PDF in Browser</span>
            </a>
          </div>
        </div>
      </div>

      {/* Highlights Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {resume.highlights.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-4 text-left shadow-xs hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
          >
            <div className="text-[11px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              {item.label}
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white mt-1 truncate">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
