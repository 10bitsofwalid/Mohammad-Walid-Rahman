import React, { useState, lazy, Suspense } from 'react';
import { Layout } from './components/layout';
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  GitHubSection,
  CertificatesSection,
} from './components/sections';
import { SEO, Skeleton } from './components/common';
import { useAuthStore } from './store/useAuthStore';
import { ShieldCheck } from 'lucide-react';

// Dynamic lazy imports for non-critical sections & admin suite
const BeyondCodeSection = lazy(() =>
  import('./components/sections/BeyondCodeSection').then((m) => ({ default: m.BeyondCodeSection }))
);
const ContactSection = lazy(() =>
  import('./components/sections/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const AdminDashboard = lazy(() =>
  import('./components/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const AdminLoginModal = lazy(() =>
  import('./components/admin/AdminLoginModal').then((m) => ({ default: m.AdminLoginModal }))
);

const SectionFallback: React.FC = () => (
  <div className="py-20 max-w-7xl mx-auto px-4 space-y-6">
    <Skeleton className="h-8 w-64 rounded-xl" />
    <Skeleton className="h-4 w-96 rounded-lg" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <Skeleton className="h-64 rounded-2xl" />
      <Skeleton className="h-64 rounded-2xl" />
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  </div>
);

export const App: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setIsAdminView(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  if (isAdminView && isAuthenticated) {
    return (
      <Suspense fallback={<SectionFallback />}>
        <SEO title="Admin CMS | Mohammad Walid Rahman" />
        <AdminDashboard onCloseAdminView={() => setIsAdminView(false)} />
      </Suspense>
    );
  }

  return (
    <Layout>
      <SEO />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <GitHubSection />
      <CertificatesSection />

      <Suspense fallback={<SectionFallback />}>
        <BeyondCodeSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>

      {/* Admin Floating Trigger Pill */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={handleOpenAdmin}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] text-xs font-semibold shadow-md transition-all duration-200 hover:scale-105"
          title="Admin CMS Dashboard"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CMS</span>
        </button>
      </div>

      {/* Admin Auth Modal */}
      <Suspense fallback={null}>
        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => setIsAdminView(true)}
        />
      </Suspense>
    </Layout>
  );
};

export default App;
