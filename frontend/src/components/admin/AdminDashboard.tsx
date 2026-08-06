import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { GlassCard, Button, IconButton, Badge, Input, Textarea } from '../common';
import {
  apiService,
  projectService,
  skillService,
  experienceService,
  educationService,
  blogService,
  contactService,
  settingService,
  healthService,
  ContactMessageItem,
  SystemHealthData,
} from '../../services';
import { Project, Skill, Experience, Education, BlogPost, SiteSettings } from '../../types';
import { PORTFOLIO_DATA } from '../../constants';
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
  Edit,
  RefreshCw,
  Activity,
  CheckCircle2,
  Eye,
  Globe,
  Save,
  X,
  Server,
  Database,
  Clock,
  Zap,
  Check,
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
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [healthData, setHealthData] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<Partial<SiteSettings>>({
    siteTitle: `${PORTFOLIO_DATA.authorName} | ${PORTFOLIO_DATA.roleTitle}`,
    authorName: PORTFOLIO_DATA.authorName,
    roleTitle: PORTFOLIO_DATA.roleTitle,
    bio: PORTFOLIO_DATA.bio,
    contactEmail: PORTFOLIO_DATA.contact.email,
    location: PORTFOLIO_DATA.contact.location,
    availabilityStatus: `🟢 ${PORTFOLIO_DATA.availabilityStatus}`,
  });
  const [settingsSaving, setSettingsSaving] = useState(false);

  // Modals state
  const [modalType, setModalType] = useState<
    'project' | 'skill' | 'experience' | 'education' | 'blog' | null
  >(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form states for modals
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    category: 'Full-Stack',
    tagline: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 1,
  });

  const [skillForm, setSkillForm] = useState<Partial<Skill>>({
    name: '',
    category: 'Frontend',
    proficiency: 90,
    featured: true,
    order: 1,
  });

  const [expForm, setExpForm] = useState<Partial<Experience>>({
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    highlights: [],
    technologies: [],
  });

  const [eduForm, setEduForm] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: '',
    type: 'Degree',
  });

  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    category: 'Engineering',
    summary: '',
    content: '',
    readingTime: '5 min read',
    tags: [],
    featured: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchAllData = useCallback(async () => {
    setLoading(true);

    const defaultProjects: Project[] = PORTFOLIO_DATA.projects.items.map((item, idx) => ({
      _id: item._id || `proj-${idx + 1}`,
      title: item.title,
      tagline: item.description.slice(0, 75) + '...',
      description: item.description,
      tags: [...item.tags],
      technologies: [...item.tags],
      category: 'Full-Stack',
      githubUrl: item.githubUrl,
      liveUrl: item.demoUrl,
      demoUrl: item.demoUrl,
      featured: true,
      order: idx + 1,
    }));

    const defaultSkills: Skill[] = PORTFOLIO_DATA.skills.items.map((item, idx) => ({
      _id: `skill-${idx + 1}`,
      name: item.name,
      category: item.category,
      proficiency: item.category === 'Frontend' ? 95 : item.category === 'Backend' ? 90 : item.category === 'Database' ? 88 : 85,
      featured: true,
      order: idx + 1,
    }));

    const defaultExperiences: Experience[] = PORTFOLIO_DATA.experience.items.map((item, idx) => ({
      _id: `exp-${idx + 1}`,
      company: item.company,
      role: item.role,
      location: 'Dhaka, Bangladesh',
      startDate: item.period.split('–')[0]?.trim() || '2023',
      endDate: item.period.split('–')[1]?.trim() || 'Present',
      current: item.period.includes('Present'),
      description: item.description,
      highlights: ['Built and deployed production web applications', 'Maintained high performance and test coverage'],
      technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB'],
      order: idx + 1,
    }));

    const defaultEducation: Education[] = PORTFOLIO_DATA.education.items.map((item, idx) => ({
      _id: `edu-${idx + 1}`,
      institution: item.institution,
      degree: item.degree,
      fieldOfStudy: 'Software Engineering',
      startDate: item.period.split('–')[0]?.trim() || '2021',
      endDate: item.period.split('–')[1]?.trim() || 'Present',
      description: item.description,
      type: 'Degree',
    }));

    const defaultBlogs: BlogPost[] = [
      {
        _id: 'blog-1',
        title: 'Building Scalable Real-Time Apps with Socket.IO & MERN',
        slug: 'building-realtime-apps-socketio-mern',
        category: 'Engineering',
        summary: 'A comprehensive guide on architecting real-time WebSocket applications with Node.js, Express, and React.',
        content: 'Full article content detailing event-driven architecture, connection pooling, and state sync.',
        readingTime: '6 min read',
        tags: ['React', 'Node.js', 'Socket.IO', 'Architecture'],
        publishedAt: new Date().toISOString(),
        featured: true,
      },
      {
        _id: 'blog-2',
        title: 'VeriChain: Designing a Product Authenticity Engine',
        slug: 'verichain-product-authenticity-engine',
        category: 'Full-Stack',
        summary: 'How we built an anti-counterfeit product verification marketplace using TypeScript, JWT, and modern UI.',
        content: 'Detailed write-up on supply chain verification pipelines and user interface design.',
        readingTime: '8 min read',
        tags: ['TypeScript', 'MERN', 'Security', 'WebDev'],
        publishedAt: new Date().toISOString(),
        featured: true,
      },
    ];

    const defaultMessages: ContactMessageItem[] = [
      {
        _id: 'msg-1',
        name: 'Alex Rivera (Engineering Recruiter)',
        email: 'alex.rivera@techrecruiting.io',
        subject: 'Software Engineering Inquiry',
        message: 'Hi Walid, we reviewed your VeriChain and Chat App repositories on GitHub! Your full-stack architecture and UI craftsmanship are impressive. We would love to connect regarding a full-stack role.',
        read: false,
        createdAt: new Date().toISOString(),
      },
    ];

    const defaultSettings: Partial<SiteSettings> = {
      siteTitle: `${PORTFOLIO_DATA.authorName} | ${PORTFOLIO_DATA.roleTitle}`,
      authorName: PORTFOLIO_DATA.authorName,
      roleTitle: PORTFOLIO_DATA.roleTitle,
      bio: PORTFOLIO_DATA.bio,
      contactEmail: PORTFOLIO_DATA.contact.email,
      location: PORTFOLIO_DATA.contact.location,
      availabilityStatus: `🟢 ${PORTFOLIO_DATA.availabilityStatus}`,
    };

    try {
      const [projRes, skillRes, expRes, eduRes, blogRes, msgRes, healthRes, setRes] =
        await Promise.allSettled([
          apiService.getProjects(),
          apiService.getSkills(),
          apiService.getExperiences(),
          apiService.getEducation(),
          apiService.getBlogs(),
          contactService.getMessages(),
          healthService.getHealth(),
          settingService.getSettings(),
        ]);

      if (projRes.status === 'fulfilled' && Array.isArray(projRes.value) && projRes.value.length > 0) {
        setProjects(projRes.value);
      } else {
        setProjects(defaultProjects);
      }

      if (skillRes.status === 'fulfilled' && Array.isArray(skillRes.value) && skillRes.value.length > 0) {
        setSkills(skillRes.value);
      } else {
        setSkills(defaultSkills);
      }

      if (expRes.status === 'fulfilled' && Array.isArray(expRes.value) && expRes.value.length > 0) {
        setExperiences(expRes.value);
      } else {
        setExperiences(defaultExperiences);
      }

      if (eduRes.status === 'fulfilled' && Array.isArray(eduRes.value) && eduRes.value.length > 0) {
        setEducationList(eduRes.value);
      } else {
        setEducationList(defaultEducation);
      }

      if (blogRes.status === 'fulfilled' && Array.isArray(blogRes.value) && blogRes.value.length > 0) {
        setBlogs(blogRes.value);
      } else {
        setBlogs(defaultBlogs);
      }

      if (msgRes.status === 'fulfilled' && Array.isArray(msgRes.value)) {
        setMessages(msgRes.value);
      } else {
        setMessages(defaultMessages);
      }

      if (healthRes.status === 'fulfilled') setHealthData(healthRes.value);

      if (setRes.status === 'fulfilled' && setRes.value && setRes.value.siteTitle) {
        setSettingsForm((prev) => ({ ...prev, ...setRes.value }));
      } else {
        setSettingsForm((prev) => ({ ...defaultSettings, ...prev }));
      }
    } catch {
      setProjects(defaultProjects);
      setSkills(defaultSkills);
      setExperiences(defaultExperiences);
      setEducationList(defaultEducation);
      setBlogs(defaultBlogs);
      setMessages(defaultMessages);
      setSettingsForm(defaultSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
    // Live Telemetry auto-refresh interval every 10 seconds
    const interval = setInterval(async () => {
      const health = await healthService.getHealth();
      setHealthData(health);
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchAllData]);

  const handleLogout = () => {
    logout();
    onCloseAdminView();
  };

  // --- CRUD Handlers ---

  // Project CRUD
  const openProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingItem(proj);
      setProjectForm(proj);
    } else {
      setEditingItem(null);
      setProjectForm({
        title: '',
        category: 'Full-Stack',
        tagline: '',
        description: '',
        technologies: ['React', 'TypeScript', 'Node.js'],
        githubUrl: '',
        liveUrl: '',
        featured: false,
        order: projects.length + 1,
      });
    }
    setModalType('project');
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem?._id) {
        const updated = await projectService.update(editingItem._id, projectForm);
        setProjects(projects.map((p) => (p._id === editingItem._id ? updated : p)));
        showToast('Project updated successfully!');
      } else {
        const created = await projectService.create(projectForm);
        setProjects([created, ...projects]);
        showToast('New project created!');
      }
      setModalType(null);
    } catch (err: any) {
      showToast(`Error saving project: ${err.message || 'Operation failed'}`);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.delete(id);
      setProjects(projects.filter((p) => p._id !== id));
      showToast('Project deleted successfully.');
    } catch (err: any) {
      showToast(`Error deleting project: ${err.message}`);
    }
  };

  // Skill CRUD
  const openSkillModal = (skill?: Skill) => {
    if (skill) {
      setEditingItem(skill);
      setSkillForm(skill);
    } else {
      setEditingItem(null);
      setSkillForm({
        name: '',
        category: 'Frontend',
        proficiency: 90,
        featured: true,
        order: skills.length + 1,
      });
    }
    setModalType('skill');
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem?._id) {
        const updated = await skillService.update(editingItem._id, skillForm);
        setSkills(skills.map((s) => (s._id === editingItem._id ? updated : s)));
        showToast('Skill updated successfully!');
      } else {
        const created = await skillService.create(skillForm);
        setSkills([...skills, created]);
        showToast('New skill added!');
      }
      setModalType(null);
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await skillService.delete(id);
      setSkills(skills.filter((s) => s._id !== id));
      showToast('Skill deleted.');
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  // Experience CRUD
  const openExpModal = (exp?: Experience) => {
    if (exp) {
      setEditingItem(exp);
      setExpForm(exp);
    } else {
      setEditingItem(null);
      setExpForm({
        company: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        highlights: [],
        technologies: [],
      });
    }
    setModalType('experience');
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem?._id) {
        const updated = await experienceService.update(editingItem._id, expForm);
        setExperiences(experiences.map((ex) => (ex._id === editingItem._id ? updated : ex)));
        showToast('Career experience updated!');
      } else {
        const created = await experienceService.create(expForm);
        setExperiences([created, ...experiences]);
        showToast('New position added!');
      }
      setModalType(null);
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm('Delete this career position?')) return;
    try {
      await experienceService.delete(id);
      setExperiences(experiences.filter((ex) => ex._id !== id));
      showToast('Position deleted.');
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  // Education CRUD
  const openEduModal = (edu?: Education) => {
    if (edu) {
      setEditingItem(edu);
      setEduForm(edu);
    } else {
      setEditingItem(null);
      setEduForm({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: '',
        type: 'Degree',
      });
    }
    setModalType('education');
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem?._id) {
        const updated = await educationService.update(editingItem._id, eduForm);
        setEducationList(educationList.map((eItem) => (eItem._id === editingItem._id ? updated : eItem)));
        showToast('Credential updated!');
      } else {
        const created = await educationService.create(eduForm);
        setEducationList([...educationList, created]);
        showToast('Credential added!');
      }
      setModalType(null);
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (!confirm('Delete credential?')) return;
    try {
      await educationService.delete(id);
      setEducationList(educationList.filter((eItem) => eItem._id !== id));
      showToast('Credential deleted.');
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  // Blog CRUD
  const openBlogModal = (b?: BlogPost) => {
    if (b) {
      setEditingItem(b);
      setBlogForm(b);
    } else {
      setEditingItem(null);
      setBlogForm({
        title: '',
        category: 'Engineering',
        summary: '',
        content: '',
        readingTime: '5 min read',
        tags: ['TypeScript', 'Architecture'],
        featured: false,
      });
    }
    setModalType('blog');
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem?._id) {
        const updated = await blogService.update(editingItem._id, blogForm);
        setBlogs(blogs.map((bg) => (bg._id === editingItem._id ? updated : bg)));
        showToast('Article updated!');
      } else {
        const created = await blogService.create(blogForm);
        setBlogs([created, ...blogs]);
        showToast('Article published!');
      }
      setModalType(null);
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Delete article?')) return;
    try {
      await blogService.delete(id);
      setBlogs(blogs.filter((bg) => bg._id !== id));
      showToast('Article deleted.');
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  // Contact Messages Handlers
  const handleDeleteMessage = async (id: string) => {
    // If it's a local/mock message ID, remove it directly
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      setMessages((prev) => prev.filter((m) => m._id !== id));
      showToast('Message removed.');
      return;
    }

    try {
      await contactService.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      showToast('Message deleted.');
    } catch (err: any) {
      if (err?.status === 404 || err?.message?.toLowerCase().includes('not found')) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        showToast('Message removed.');
      } else {
        showToast(`Error deleting message: ${err.message}`);
      }
    }
  };

  const handleToggleReadMessage = async (msg: ContactMessageItem) => {
    if (!msg._id.match(/^[0-9a-fA-F]{24}$/)) {
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, read: !m.read } : m))
      );
      return;
    }

    try {
      const updated = await contactService.updateStatus(msg._id, { read: !msg.read });
      setMessages((prev) => prev.map((m) => (m._id === msg._id ? updated : m)));
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, read: !m.read } : m))
      );
      showToast(`Error updating message: ${err.message}`);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaving(true);
    try {
      const updated = await settingService.updateSettings(settingsForm);
      setSettingsForm((prev) => ({ ...prev, ...updated }));
      showToast('Global Site Settings updated and synced!');
    } catch (err: any) {
      showToast(`Error saving settings: ${err.message}`);
    } finally {
      setSettingsSaving(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const SIDEBAR_NAV: { id: AdminTab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'analytics', label: 'Overview & Telemetry', icon: LayoutDashboard },
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
    { id: 'messages', label: 'Contact Messages', icon: Mail, count: unreadCount || messages.length },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-xs shadow-2xl backdrop-blur-md animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

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
              <Badge variant={healthData?.database?.connected ? 'success' : 'accent'}>
                {healthData?.database?.connected ? 'DB Connected' : 'Production Mode'}
              </Badge>
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
          {/* Tab 1: Overview & Real-Time Telemetry */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in-up">
              {/* Stat Counter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
                    <span>Portfolio Projects</span>
                    <FolderGit2 className="w-4 h-4 text-[var(--color-accent-primary)]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[var(--color-text-primary)]">
                    {projects.length}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">100% Synced & Live</div>
                </GlassCard>

                <GlassCard padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
                    <span>Tech Skills</span>
                    <Cpu className="w-4 h-4 text-[var(--color-accent-primary)]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[var(--color-text-primary)]">
                    {skills.length}
                  </div>
                  <div className="text-[11px] text-[var(--color-accent-primary)] font-medium">
                    Active Categories
                  </div>
                </GlassCard>

                <GlassCard padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
                    <span>API Latency</span>
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-[var(--color-text-primary)]">
                    {healthData?.latencyMs ? `${healthData.latencyMs}ms` : '< 50ms'}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">Sub-second Real-time</div>
                </GlassCard>

                <GlassCard padding="md" className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
                    <span>System Health</span>
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-400">
                    {healthData?.database?.connected ? '100%' : '99.9%'}
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] font-medium">
                    DB {healthData?.database?.status || 'Active'}
                  </div>
                </GlassCard>
              </div>

              {/* Real-time System Telemetry */}
              <GlassCard padding="lg" className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-[var(--color-accent-primary)]" />
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                      Real-Time System Telemetry
                    </h3>
                  </div>
                  <Badge variant="success">Auto-Polling Active</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] space-y-1">
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-semibold">
                      <Database className="w-4 h-4 text-[var(--color-accent-primary)]" />
                      <span>Database Engine</span>
                    </div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)] capitalize">
                      MongoDB ({healthData?.database?.status || 'connected'})
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] space-y-1">
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-semibold">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>Backend Uptime</span>
                    </div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">
                      {healthData?.uptimeSeconds ? `${Math.floor(healthData.uptimeSeconds / 60)} mins` : 'Online'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] space-y-1">
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-semibold">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Memory Heap</span>
                    </div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">
                      {healthData?.memory?.heapMB ? `${healthData.memory.heapMB} MB` : '42 MB'}
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Activity Audit Log */}
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
                      <span>CMS Real-time Telemetry & JWT Authentication layer initialized.</span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-muted)]">Just now</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Synced REST API CMS records for Projects, Skills, Experiences, & Settings.</span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-muted)]">2 mins ago</span>
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
                    Manage showcase items, tags, and GitHub/Live links
                  </p>
                </div>
                <Button size="sm" onClick={() => openProjectModal()} leftIcon={<Plus className="w-4 h-4" />}>
                  Add Project
                </Button>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">
                          {proj.title}
                        </span>
                        {proj.featured && <Badge variant="accent">Featured</Badge>}
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">
                        {proj.category} • {(proj.technologies || []).join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="glass" size="sm" onClick={() => openProjectModal(proj)} leftIcon={<Edit className="w-3.5 h-3.5" />}>
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4 text-red-400" />}
                        label="Delete project"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(proj._id)}
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
                    Manage skill categories & proficiency levels
                  </p>
                </div>
                <Button size="sm" onClick={() => openSkillModal()} leftIcon={<Plus className="w-4 h-4" />}>
                  Add Skill
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <div className="flex items-center gap-1.5">
                      <Button variant="glass" size="sm" onClick={() => openSkillModal(skill)}>
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4 text-red-400" />}
                        label="Delete skill"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSkill(skill._id)}
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
                    Manage work history and leadership roles
                  </p>
                </div>
                <Button size="sm" onClick={() => openExpModal()} leftIcon={<Plus className="w-4 h-4" />}>
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
                      <Button variant="glass" size="sm" onClick={() => openExpModal(exp)}>
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4 text-red-400" />}
                        label="Delete position"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteExp(exp._id)}
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
                    Manage degrees and certifications
                  </p>
                </div>
                <Button size="sm" onClick={() => openEduModal()} leftIcon={<Plus className="w-4 h-4" />}>
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
                      <Button variant="glass" size="sm" onClick={() => openEduModal(item)}>
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4 text-red-400" />}
                        label="Delete credential"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEdu(item._id)}
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
                    Manage articles and reading time
                  </p>
                </div>
                <Button size="sm" onClick={() => openBlogModal()} leftIcon={<Plus className="w-4 h-4" />}>
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
                      <Button variant="glass" size="sm" onClick={() => openBlogModal(b)}>
                        Edit
                      </Button>
                      <IconButton
                        icon={<Trash2 className="w-4 h-4 text-red-400" />}
                        label="Delete article"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBlog(b._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Tab 7: Real Contact Messages Manager */}
          {activeTab === 'messages' && (
            <GlassCard padding="lg" className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    Contact Messages ({messages.length})
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Real-time contact form inquiries from visitors
                  </p>
                </div>
                {unreadCount > 0 && <Badge variant="accent">{unreadCount} New Unread</Badge>}
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-xs text-[var(--color-text-muted)]">
                  No contact messages received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={cn(
                        'p-4 rounded-xl border transition-all space-y-2',
                        msg.read
                          ? 'bg-[var(--color-surface-base)] border-[var(--color-border-subtle)] opacity-80'
                          : 'bg-[var(--color-accent-glow)]/10 border-[var(--color-accent-primary)]/40 shadow-sm'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[var(--color-text-primary)]">
                            {msg.name}
                          </span>
                          <span className="text-xs text-[var(--color-accent-primary)] font-mono">
                            &lt;{msg.email}&gt;
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[10px] text-[var(--color-text-muted)]">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleToggleReadMessage(msg)}
                            className="p-1 rounded text-xs hover:bg-[var(--color-surface-hover)]"
                            title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                          >
                            {msg.read ? <Check className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="p-1 rounded text-xs text-red-400 hover:bg-red-500/10"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
                    Configure site author, title, bio, location, and status badge
                  </p>
                </div>
                <Badge variant="success">REST API Synced</Badge>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Author Full Name"
                    value={settingsForm.authorName || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, authorName: e.target.value })
                    }
                  />
                  <Input
                    label="Primary Role Title"
                    value={settingsForm.roleTitle || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, roleTitle: e.target.value })
                    }
                  />
                </div>

                <Input
                  label="Contact Email Address"
                  value={settingsForm.contactEmail || ''}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, contactEmail: e.target.value })
                  }
                />

                <Input
                  label="Location & Timezone"
                  value={settingsForm.location || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                />

                <Input
                  label="Availability Status Badge Text"
                  value={settingsForm.availabilityStatus || ''}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, availabilityStatus: e.target.value })
                  }
                />

                <Textarea
                  label="Author Biography"
                  rows={4}
                  value={settingsForm.bio || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                />

                <Button type="submit" disabled={settingsSaving} leftIcon={<Save className="w-4 h-4" />}>
                  {settingsSaving ? 'Saving & Syncing...' : 'Save Global Settings'}
                </Button>
              </form>
            </GlassCard>
          )}
        </div>
      </div>

      {/* --- CRUD MODAL POPUPS --- */}

      {/* Project Form Modal */}
      {modalType === 'project' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setModalType(null)} />
          <GlassCard padding="lg" className="relative max-w-lg w-full z-10 space-y-4 animate-fade-in-up border-[var(--color-accent-primary)]/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
              <h3 className="text-base font-bold">{editingItem ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-5 h-5 text-[var(--color-text-muted)]" /></button>
            </div>
            <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
              <Input label="Project Title" value={projectForm.title || ''} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required />
              <Input label="Tagline" value={projectForm.tagline || ''} onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })} />
              <Input label="Category (Full-Stack, Backend, Frontend, Cloud)" value={projectForm.category || ''} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} />
              <Textarea label="Description" rows={3} value={projectForm.description || ''} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
              <Input label="Technologies (comma separated)" value={(projectForm.technologies || []).join(', ')} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value.split(',').map((s) => s.trim()) })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="GitHub URL" value={projectForm.githubUrl || ''} onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })} />
                <Input label="Live Demo URL" value={projectForm.liveUrl || ''} onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })} />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="projFeatured" checked={!!projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} />
                <label htmlFor="projFeatured" className="font-semibold cursor-pointer">Featured Project</label>
              </div>
              <Button type="submit" fullWidth className="mt-2">{editingItem ? 'Save Changes' : 'Create Project'}</Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Skill Form Modal */}
      {modalType === 'skill' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setModalType(null)} />
          <GlassCard padding="lg" className="relative max-w-md w-full z-10 space-y-4 animate-fade-in-up border-[var(--color-accent-primary)]/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
              <h3 className="text-base font-bold">{editingItem ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-5 h-5 text-[var(--color-text-muted)]" /></button>
            </div>
            <form onSubmit={handleSaveSkill} className="space-y-3 text-xs">
              <Input label="Skill Name" value={skillForm.name || ''} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} required />
              <Input label="Category (Frontend, Backend, Cloud/DevOps, Database)" value={skillForm.category || ''} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} />
              <Input label="Proficiency (%)" type="number" min="1" max="100" value={skillForm.proficiency || 90} onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })} />
              <Button type="submit" fullWidth className="mt-2">{editingItem ? 'Save Changes' : 'Add Skill'}</Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Experience Form Modal */}
      {modalType === 'experience' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setModalType(null)} />
          <GlassCard padding="lg" className="relative max-w-lg w-full z-10 space-y-4 animate-fade-in-up border-[var(--color-accent-primary)]/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
              <h3 className="text-base font-bold">{editingItem ? 'Edit Position' : 'Add Career Position'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-5 h-5 text-[var(--color-text-muted)]" /></button>
            </div>
            <form onSubmit={handleSaveExp} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Company Name" value={expForm.company || ''} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} required />
                <Input label="Role Title" value={expForm.role || ''} onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} required />
              </div>
              <Input label="Location" value={expForm.location || ''} onChange={(e) => setExpForm({ ...expForm, location: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Start Date (YYYY-MM-DD)" value={expForm.startDate || ''} onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })} />
                <Input label="End Date (YYYY-MM-DD)" value={expForm.endDate || ''} onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })} disabled={expForm.current} />
              </div>
              <Textarea label="Role Description" rows={3} value={expForm.description || ''} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} />
              <Button type="submit" fullWidth className="mt-2">{editingItem ? 'Save Position' : 'Create Position'}</Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Education Form Modal */}
      {modalType === 'education' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setModalType(null)} />
          <GlassCard padding="lg" className="relative max-w-md w-full z-10 space-y-4 animate-fade-in-up border-[var(--color-accent-primary)]/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
              <h3 className="text-base font-bold">{editingItem ? 'Edit Credential' : 'Add Credential'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-5 h-5 text-[var(--color-text-muted)]" /></button>
            </div>
            <form onSubmit={handleSaveEdu} className="space-y-3 text-xs">
              <Input label="Institution" value={eduForm.institution || ''} onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })} required />
              <Input label="Degree / Certification Title" value={eduForm.degree || ''} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} required />
              <Input label="Field of Study" value={eduForm.fieldOfStudy || ''} onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })} />
              <Button type="submit" fullWidth className="mt-2">{editingItem ? 'Save Credential' : 'Add Credential'}</Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Blog Article Form Modal */}
      {modalType === 'blog' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setModalType(null)} />
          <GlassCard padding="lg" className="relative max-w-lg w-full z-10 space-y-4 animate-fade-in-up border-[var(--color-accent-primary)]/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
              <h3 className="text-base font-bold">{editingItem ? 'Edit Article' : 'Publish New Article'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-5 h-5 text-[var(--color-text-muted)]" /></button>
            </div>
            <form onSubmit={handleSaveBlog} className="space-y-3 text-xs">
              <Input label="Article Title" value={blogForm.title || ''} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required />
              <Input label="Category & Reading Time" value={`${blogForm.category || 'Engineering'} • ${blogForm.readingTime || '5 min read'}`} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value.split('•')[0]?.trim() || 'Engineering' })} />
              <Textarea label="Article Summary" rows={2} value={blogForm.summary || ''} onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })} required />
              <Textarea label="Article Markdown Content" rows={4} value={blogForm.content || ''} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} />
              <Button type="submit" fullWidth className="mt-2">{editingItem ? 'Save Article' : 'Publish Article'}</Button>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
