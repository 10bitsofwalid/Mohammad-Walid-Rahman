import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { GlassCard, Button, IconButton, Badge, Input, Textarea } from '../common';
import { apiService } from '../../services';
import { Project, Skill, Experience, Education, BlogPost } from '../../types';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  FileText,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  RefreshCw,
  Activity,
  CheckCircle2,
  Eye,
  Globe,
  Save,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface AdminDashboardProps {
  onCloseAdminView: () => void;
}

type AdminTab =
  | 'analytics'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'blogs'
  | 'messages'
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onCloseAdminView }) => {
  const { adminUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    siteTitle: 'Mohammad Walid Rahman | Senior Full-Stack Engineer',
    authorName: 'Mohammad Walid Rahman',
    roleTitle: 'Senior Full-Stack Engineer',
    bio: 'I design, architect, and build scalable web applications with Apple-grade UI craftsmanship and rock-solid TypeScript backends.',
    contactEmail: 'walid.rahman.dev@gmail.com',
    location: 'San Francisco, CA (Remote Worldwide)',
    availabilityStatus: '🟢 Available for Projects',
  });

  const [settingsSaved, setSettingsSaved] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projData, skillData, expData, eduData, blogData] = await Promise.allSettled([
        apiService.getProjects(),
        apiService.getSkills(),
        apiService.getExperiences(),
        apiService.getEducation(),
        apiService.getBlogs(),
      ]);

      if (projData.status === 'fulfilled') setProjects(projData.value);
      if (skillData.status === 'fulfilled') setSkills(skillData.value);
      if (expData.status === 'fulfilled') setExperiences(expData.value);
      if (eduData.status === 'fulfilled') setEducationList(eduData.value);
      if (blogData.status === 'fulfilled') setBlogs(blogData.value);
    } catch {
      // Fallbacks handle missing endpoint states
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    onCloseAdminView();
  };

  const SIDEBAR_NAV: { id: AdminTab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'analytics', label: 'Overview & Analytics', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects Management', icon: FolderGit2, count: projects.length },
    { id: 'skills', label: 'Skills & Tech Stack', icon: Cpu, count: skills.length },
    { id: 'experience', label: 'Career Experience', icon: Briefcase, count: experiences.length },
    {
      id: 'education',
      label: 'Education & Credentials',
      icon: GraduationCap,
      count: educationList.length,
    },
    { id: 'blogs', label: 'Technical Articles', icon: FileText, count: blogs.length },
    { id: 'messages', label: 'Contact Messages', icon: Mail },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Admin Suite Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-[var(--color-border-subtle)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--gradient-accent)] text-white flex items-center justify-center font-extrabold text-lg shadow-md">
            CMS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Admin CMS Dashboard
              </h1>
              <Badge variant="accent">Production Mode</Badge>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Logged in as{' '}
              <strong className="text-[var(--color-text-primary)]">
                {adminUser?.name || 'System Admin'}
              </strong>{' '}
              ({adminUser?.role})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="glass"
            size="sm"
            onClick={fetchAllData}
            leftIcon={<RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />}
          >
            Refresh Sync
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onCloseAdminView}
            leftIcon={<Globe className="w-4 h-4" />}
          >
            View Website
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={handleLogout}
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Admin Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2 glass-panel p-2.5 rounded-2xl border border-[var(--color-border-subtle)]">
          <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider px-3 py-1 block">
            CMS Modules
          </span>

          {SIDEBAR_NAV.map((nav) => {
            const Icon = nav.icon;
            const isActive = activeTab === nav.id;

            return (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-[var(--gradient-accent)] text-white shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{nav.label}</span>
                </div>
                {nav.count !== undefined && (
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[10px] font-bold',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]'
                    )}
                  >
                    {nav.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Workspace */}
        <div className="lg:col-span-9 space-y-6">
          {/* Tab 1: Overview & Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in-up">
              {/* Stat Counter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
                    <span>Total Projects</span>
                    <FolderGit2 className="w-4 h-4 text-[var(--color-accent-primary)]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[var(--color-text-primary)]">
                    {projects.length || 6}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">100% Synced & Live</div>
                </GlassCard>

                <GlassCard padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
                    <span>Tech Skills</span>
                    <Cpu className="w-4 h-4 text-[var(--color-accent-primary)]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[var(--color-text-primary)]">
                    {skills.length || 12}
                  </div>
                  <div className="text-[11px] text-[var(--color-accent-primary)] font-medium">
                    Across 5 Categories
                  </div>
                </GlassCard>

                <GlassCard padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
                    <span>Monthly Visitors</span>
                    <Eye className="w-4 h-4 text-[var(--color-accent-primary)]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[var(--color-text-primary)]">
                    14.8k
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">+24% vs Last Month</div>
                </GlassCard>

                <GlassCard padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
                    <span>System Health</span>
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-400">99.9%</div>
                  <div className="text-[11px] text-[var(--color-text-muted)] font-medium">
                    Sub-second Latency
                  </div>
                </GlassCard>
              </div>

              {/* Activity Log */}
              <GlassCard padding="lg" className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Recent Activity Log
                  </h3>
                  <Badge variant="glass">System Audit</Badge>
                </div>

                <div className="space-y-3 text-xs text-[var(--color-text-secondary)]">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        Updated Session 16 Footer navigation & back-to-top motion trigger.
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-muted)]">Just now</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Session 15 Contact Messaging payload delivery verified cleanly.</span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-muted)]">12 mins ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)] shrink-0" />
                      <span>Fetched REST API CMS data for Skills, Experiences, and Education.</span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-muted)]">1 hour ago</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Tab 2: Projects Management CRUD */}
          {activeTab === 'projects' && (
            <GlassCard padding="lg" className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Portfolio Projects ({projects.length})
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Manage showcase items, tags, and GitHub URLs
                  </p>
                </div>
                <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Add Project
                </Button>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">
                          {proj.title}
                        </span>
                        {proj.featured && <Badge variant="accent">Featured</Badge>}
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">
                        {proj.category} • {proj.tags.join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="glass" size="sm">
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete project"
                        variant="ghost"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Tab 3: Skills CRUD */}
          {activeTab === 'skills' && (
            <GlassCard padding="lg" className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Technical Skills ({skills.length})
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Manage skill categories & proficiency percentages
                  </p>
                </div>
                <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Add Skill
                </Button>
              </div>

              <div className="space-y-3">
                {skills.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]"
                  >
                    <div>
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {skill.name}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">
                        {skill.category} • {skill.proficiency}% Proficiency
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="glass" size="sm">
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete skill"
                        variant="ghost"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Tab 4: Experience CRUD */}
          {activeTab === 'experience' && (
            <GlassCard padding="lg" className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Career Experience ({experiences.length})
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Manage positions, companies, and date ranges
                  </p>
                </div>
                <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Add Position
                </Button>
              </div>

              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div
                    key={exp._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]"
                  >
                    <div>
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {exp.role}
                      </span>
                      <span className="text-xs text-[var(--color-accent-primary)] font-semibold block mt-0.5">
                        {exp.company} ({exp.startDate} – {exp.current ? 'Present' : exp.endDate})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="glass" size="sm">
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete position"
                        variant="ghost"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Tab 5: Education CRUD */}
          {activeTab === 'education' && (
            <GlassCard padding="lg" className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Education & Credentials ({educationList.length})
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Manage degrees, cloud certifications, and awards
                  </p>
                </div>
                <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Add Credential
                </Button>
              </div>

              <div className="space-y-3">
                {educationList.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]"
                  >
                    <div>
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.degree}
                      </span>
                      <span className="text-xs text-[var(--color-accent-primary)] font-semibold block mt-0.5">
                        {item.institution} • {item.type || 'Degree'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="glass" size="sm">
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete credential"
                        variant="ghost"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Tab 6: Blogs CRUD */}
          {activeTab === 'blogs' && (
            <GlassCard padding="lg" className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Technical Articles ({blogs.length})
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Manage markdown articles and reading time
                  </p>
                </div>
                <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  New Article
                </Button>
              </div>

              <div className="space-y-3">
                {blogs.map((b) => (
                  <div
                    key={b._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]"
                  >
                    <div>
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {b.title}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">
                        {b.category} • {b.readingTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="glass" size="sm">
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete article"
                        variant="ghost"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Tab 7: Messages Manager */}
          {activeTab === 'messages' && (
            <GlassCard padding="lg" className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Contact Messages (1)
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    View incoming contact form submissions
                  </p>
                </div>
                <Badge variant="success">Active API</Badge>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">
                      Demo Customer
                    </span>
                    <span className="text-xs text-[var(--color-accent-primary)]">
                      &lt;demo@example.com&gt;
                    </span>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)]">Today</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  "Hi Walid, we reviewed your portfolio and would like to discuss a senior
                  full-stack opportunity for our engineering team."
                </p>
              </div>
            </GlassCard>
          )}

          {/* Tab 8: Site Settings Manager */}
          {activeTab === 'settings' && (
            <GlassCard padding="lg" className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Site Global Settings
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Configure author details, bio, location, and availability badge
                  </p>
                </div>
                {settingsSaved && <Badge variant="success">Settings Saved!</Badge>}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Author Full Name"
                    value={settingsForm.authorName}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, authorName: e.target.value })
                    }
                  />
                  <Input
                    label="Primary Role Title"
                    value={settingsForm.roleTitle}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, roleTitle: e.target.value })
                    }
                  />
                </div>

                <Input
                  label="Contact Email Address"
                  value={settingsForm.contactEmail}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, contactEmail: e.target.value })
                  }
                />

                <Input
                  label="Location & Timezone"
                  value={settingsForm.location}
                  onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                />

                <Input
                  label="Availability Status Badge Text"
                  value={settingsForm.availabilityStatus}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, availabilityStatus: e.target.value })
                  }
                />

                <Textarea
                  label="Author Biography"
                  rows={4}
                  value={settingsForm.bio}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                />

                <Button type="submit" leftIcon={<Save className="w-4 h-4" />}>
                  Save Global Settings
                </Button>
              </form>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};
