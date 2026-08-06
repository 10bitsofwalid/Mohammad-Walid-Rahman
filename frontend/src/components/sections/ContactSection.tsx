import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { contactService } from '../../services/contactService';

export const ContactSection: React.FC = () => {
  const { contact } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    if (formData.message.trim().length < 5) {
      setError('Message must be at least 5 characters long.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await contactService.sendMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-indigo-50/60 via-white to-blue-50/40 dark:from-gray-900 dark:via-gray-800/80 dark:to-indigo-900/20 border border-gray-100 dark:border-gray-700/60 p-8 sm:p-12 shadow-sm">
        {/* Subtle background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="mockup-badge">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Let's Connect</span>
              </div>
              <h2
                id="contact-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight"
              >
                Have a Project in Mind?
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects or just having
                a chat about technology.
              </p>
            </div>

            {/* Contact Info List */}
            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${contact.email}`}
                aria-label={`Send email to ${contact.email}`}
                className="flex items-center gap-3 text-sm font-medium text-[#0F172A] dark:text-white hover:text-[#4F46E5] transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-[#4F46E5] dark:text-indigo-300 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>{contact.email}</span>
              </a>

              <div className="flex items-center gap-3 text-sm font-medium text-[#0F172A] dark:text-white">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-[#4F46E5] dark:text-indigo-300 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>{contact.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-[#0F172A] dark:text-white">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-[#4F46E5] dark:text-indigo-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <span> {contact.location} </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div role="status" aria-live="polite" className="py-16 text-center space-y-3">
                <div className="text-3xl font-extrabold text-[#4F46E5]">Thank You! 🎉</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your message has been sent successfully. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 text-xs font-medium">
                    {error}
                  </div>
                )}
                {/* Name & Email in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-[#0F172A] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-shadow"
                  />
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-[#0F172A] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-shadow"
                  />
                </div>

                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-[#0F172A] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] resize-none transition-shadow"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="dark-pill-btn w-full justify-center py-3.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
