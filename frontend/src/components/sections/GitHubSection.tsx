import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { PORTFOLIO_DATA } from '../../constants';
import {
  GitCommit,
  Users,
  FolderGit2,
  ExternalLink,
  Code2,
  Activity,
  Terminal,
  Star,
} from 'lucide-react';

interface GitHubProfileData {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  bio: string;
  name: string;
}

export const GitHubSection: React.FC = () => {
  const { githubActivity, socials } = PORTFOLIO_DATA;
  const username = githubActivity?.username || '10bitsofwalid';
  const githubUrl = socials?.github || `https://github.com/${username}`;

  const [profile, setProfile] = useState<GitHubProfileData | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch GitHub profile');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setProfile({
            public_repos: data.public_repos ?? 25,
            followers: data.followers ?? 11,
            following: data.following ?? 0,
            avatar_url: data.avatar_url ?? `https://github.com/${username}.png`,
            html_url: data.html_url ?? githubUrl,
            bio: data.bio ?? 'Software Engineering Undergraduate & Developer',
            name: data.name ?? 'Mohammad Walid Rahman',
          });
        }
      })
      .catch(() => {
        // Fallback silently if offline or rate limited
      });

    return () => {
      isMounted = false;
    };
  }, [username, githubUrl]);

  // Color theme for react-github-calendar matching site indigo primary palette
  const calendarExplicitTheme = {
    light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start space-y-3">
        <div className="mockup-badge">
          <Activity className="w-3.5 h-3.5 text-[#4F46E5]" aria-hidden="true" />
          <span>{githubActivity.badge}</span>
        </div>
        <h2
          id="github-heading"
          className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight"
        >
          {githubActivity.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
          {githubActivity.subtitle}
        </p>
      </div>

      {/* GitHub Profile Banner & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Profile & Link */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <img
              src={profile?.avatar_url || `https://github.com/${username}.png`}
              alt={`${username} GitHub Avatar`}
              className="w-16 h-16 rounded-2xl ring-2 ring-[#4F46E5]/20 object-cover"
              loading="lazy"
            />
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">
                {profile?.name || 'Mohammad Walid Rahman'}
              </h3>
              <p className="text-xs font-medium text-[#4F46E5] dark:text-indigo-400 font-mono">
                @{username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {profile?.bio || 'Building full-stack apps & open-source tools.'}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1 font-medium">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" />
                {profile?.public_repos ?? 25} Repos
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                {profile?.followers ?? 11} Followers
              </span>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold hover:bg-[#4F46E5] dark:hover:bg-indigo-400 transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Center & Right: 4 Stat Counter Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-[#4F46E5] dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0F172A] dark:text-white">
                {profile?.public_repos ?? 25}
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Public Repositories
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GitCommit className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0F172A] dark:text-white">500+</div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Contributions
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-amber-300 dark:hover:border-amber-700 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0F172A] dark:text-white">
                TypeScript
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Primary Language
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0F172A] dark:text-white">
                {profile?.followers ?? 11}
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Followers</div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Contribution Heatmap Card */}
      <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#4F46E5]" />
              Contribution Calendar
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Live GitHub contribution activity over the past year (@{username})
            </p>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#4F46E5] dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            <span>View GitHub Graph</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contribution Calendar Container */}
        <div className="overflow-x-auto pb-2 pt-2 flex justify-center text-xs text-gray-600 dark:text-gray-300">
          <GitHubCalendar
            username={username}
            blockSize={13}
            blockMargin={4}
            fontSize={12}
            theme={calendarExplicitTheme}
          />
        </div>
      </div>

      {/* Top Languages & Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Breakdown */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-6 space-y-5 shadow-xs">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-500" />
            Top Languages & Tech Distribution
          </h3>

          <div className="space-y-4">
            {githubActivity.languages.map((lang, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#0F172A] dark:text-gray-200">{lang.name}</span>
                  <span className="text-gray-400">{lang.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Open Source Stats Banner */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white space-y-5 flex flex-col justify-between relative overflow-hidden border border-indigo-800/50 shadow-md">
          <div className="space-y-2 z-10">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-400/30">
              Open Source Focus
            </span>
            <h3 className="text-xl font-extrabold tracking-tight">
              Building with Passion & Purpose
            </h3>
            <p className="text-xs text-indigo-200/80 leading-relaxed">
              From web apps and microservices to C data structures and cross-platform tools, all
              source code is open and accessible on GitHub.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 z-10">
            <a
              href={`${githubUrl}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors flex items-center gap-3"
            >
              <FolderGit2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs font-bold">Explore Repos</div>
                <div className="text-[10px] text-indigo-200 font-mono">25+ Projects</div>
              </div>
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors flex items-center gap-3"
            >
              <Star className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold">Star Profile</div>
                <div className="text-[10px] text-indigo-200 font-mono">github.com/{username}</div>
              </div>
            </a>
          </div>

          {/* Background Decorative Accent */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
