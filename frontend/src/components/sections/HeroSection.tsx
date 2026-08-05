import React from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { ASSETS } from '../../assets';
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter, ChevronDown, Facebook, Instagram } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { availabilityStatus, availabilitySubtext, bio, socials } = PORTFOLIO_DATA;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Soft Pastel Ambient Blobs */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-indigo-200/25 dark:bg-indigo-900/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-100/20 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 space-y-7 text-left">
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/60 text-xs font-medium text-[#6366F1] dark:text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Hello, I'm</span>
          </div>

          {/* Main Headline — split across two lines matching the design */}
          <div className="space-y-0">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.05]">
              Mohammad
              <br />
              Walid Rahman
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3B82F6] dark:text-blue-400 tracking-tight mt-1">
              Full Stack Developer
            </h2>
          </div>

          {/* Bio Text */}
          <p className="text-base sm:text-lg text-[#475569] dark:text-gray-300 max-w-xl font-normal leading-relaxed">
            {bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a href="#projects" className="dark-pill-btn hover:no-underline">
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a href="#contact" className="light-pill-btn hover:no-underline">
              <span>Download Resume</span>
              <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </a>
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs font-semibold text-[#64748B] dark:text-gray-400">
              Connect with me
            </span>
            <div className="flex items-center gap-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#4F46E5] hover:border-indigo-300 hover:scale-110 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#4F46E5] hover:border-indigo-300 hover:scale-110 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={socials.email}
                aria-label="Email"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#4F46E5] hover:border-indigo-300 hover:scale-110 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Twitter"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#4F46E5] hover:border-indigo-300 hover:scale-110 transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#4F46E5] hover:border-indigo-300 hover:scale-110 transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#4F46E5] hover:border-indigo-300 hover:scale-110 transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#4F46E5] hover:border-indigo-300 hover:scale-110 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image with Overlay Card & Doodle Text */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          {/* Blob Background Container */}
          <div className="relative w-72 h-80 sm:w-88 sm:h-96 lg:w-[380px] lg:h-[440px] rounded-3xl bg-gradient-to-tr from-indigo-100 via-blue-50 to-slate-200/60 dark:from-indigo-950/40 dark:via-blue-900/20 dark:to-slate-800/30 p-3 sm:p-4 shadow-sm flex items-end justify-center">
            {/* Avatar Photo */}
            <img
              src={ASSETS.profilePic}
              alt="Mohammad Walid Rahman"
              className="w-full h-full object-cover object-top rounded-2xl shadow-md"
            />

            {/* Floating Availability Badge Card */}
            <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 bg-white/98 dark:bg-gray-800/98 backdrop-blur-md border border-gray-100 dark:border-gray-700 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 min-w-[220px]">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <div className="text-left">
                <div className="text-xs font-bold text-[#0F172A] dark:text-white">
                  {availabilityStatus}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  {availabilitySubtext}
                </div>
              </div>
            </div>

            {/* Hand-drawn style text pointer */}
            <div className="absolute -top-10 -right-8 hidden sm:flex flex-col items-start pointer-events-none select-none">
              <span className="font-handwriting text-sm italic text-gray-500 dark:text-gray-400 tracking-wide leading-tight">
                Code
                <br />
                Create
                <br />
                Make an Impact
                <br />— Walid
              </span>
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500 -ml-2 mt-1 transform -rotate-12"
                viewBox="0 0 50 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 35 5 Q 15 25 10 38" />
                <path d="M 5 30 L 10 38 L 18 35" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex flex-col items-center justify-center pt-8 text-center space-y-1">
        <a
          href="#about"
          className="inline-flex flex-col items-center text-xs font-medium text-gray-400 hover:text-[#4F46E5] transition-colors"
        >
          <div className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center p-1 mb-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
          <span>Scroll to explore</span>
          <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
        </a>
      </div>
    </section>
  );
};
