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
} from 'lucide-react';

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

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="space-y-3 mb-12 text-center md:text-left">
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.items.map((cert) => (
          <div
            key={cert.id}
            className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 shadow-md hover:shadow-xl dark:shadow-indigo-950/20 transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Image Preview Thumbnail */}
            <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-850 overflow-hidden cursor-pointer group/img">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                <button
                  type="button"
                  onClick={() => setSelectedImage({ src: cert.image, title: cert.title })}
                  className="px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                  aria-label={`View full size certificate for ${cert.title}`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Preview Full</span>
                </button>
              </div>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Verified</span>
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                {/* Issuer & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5 font-medium text-indigo-600 dark:text-indigo-400">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>

                {/* Certificate Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cert.title}
                </h3>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="text-gray-400 dark:text-gray-500 font-medium">
                      Credential ID:
                    </span>
                    <span className="font-mono text-gray-700 dark:text-gray-300 font-semibold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {cert.credentialId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(cert.credentialId)}
                      className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      title="Copy Credential ID"
                    >
                      {copiedId === cert.credentialId ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Tags & Action */}
              <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group/link"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedImage({ src: cert.image, title: cert.title })}
                    className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>View Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
