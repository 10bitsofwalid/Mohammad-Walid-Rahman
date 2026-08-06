import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import {
  Award,
  ExternalLink,
  Maximize2,
  X,
  CheckCircle2,
  Calendar,
  Building2,
  Copy,
  Check,
  PlusIcon,
} from 'lucide-react';
import { CoverflowCarousel, CoverflowSlide } from '../ui/CoverflowCarousel';

export const CertificatesSection: React.FC = () => {
  const { certificates } = PORTFOLIO_DATA;
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const handleCopyId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const slides: CoverflowSlide[] = certificates.items.map((cert) => ({
    src: cert.image,
    alt: cert.title,
    title: cert.title,
    subtitle: cert.issuer,
    cert: cert,
  }));

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="space-y-3 mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 shadow-xs">
          <Award className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{certificates.badge}</span>
        </div>
        <h2
          id="certificates-heading"
          className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight"
        >
          {certificates.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
          {certificates.subtitle}
        </p>
      </div>

      {/* Coverflow 3D Showcase */}
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
          label="Certificates Showcase"
          renderCard={(slide) => {
            const cert = slide.cert;
            return (
              <div className="relative w-full h-full group overflow-hidden bg-slate-900 cursor-pointer">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Verified Badge Overlay */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow-md z-10">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified</span>
                </span>

                {/* Bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-medium text-indigo-300">
                    {cert.issuer}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold line-clamp-1">
                    {cert.title}
                  </h3>
                </div>
              </div>
            );
          }}
          renderCaption={(activeSlide) => {
            if (!activeSlide) return null;
            const cert = activeSlide.cert;
            return (
              <div className="relative mt-6 max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-md transition-all duration-300">
                <PlusIcon className="absolute -top-3 -left-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
                <PlusIcon className="absolute -top-3 -right-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
                <PlusIcon className="absolute -bottom-3 -left-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
                <PlusIcon className="absolute -right-3 -bottom-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
                <div className="space-y-4">
                  {/* Issuer & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">
                        Credential ID:
                      </span>
                      <span className="font-mono text-gray-800 dark:text-gray-200 font-semibold bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                        {cert.credentialId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyId(cert.credentialId)}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        title="Copy Credential ID"
                      >
                        {copiedId === cert.credentialId ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.tags.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedImage({ src: cert.image, title: cert.title })}
                      className="px-4 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Preview Image</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Lightbox Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate view: ${selectedImage.title}`}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/90">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate max-w-lg">
                  {selectedImage.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-slate-950/50">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg border border-gray-800"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;

