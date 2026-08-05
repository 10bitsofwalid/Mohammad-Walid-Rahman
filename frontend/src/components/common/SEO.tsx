import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Mohammad Walid Rahman | Senior Full-Stack Engineer',
  description = 'Apple-grade full-stack software engineer specializing in React 18, TypeScript, Node.js, Express, MongoDB, and cloud architecture.',
  url = 'https://walidrahman.dev',
  image = 'https://walidrahman.dev/assets/profile.jpg',
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Inject JSON-LD Schema.org Structured Data
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mohammad Walid Rahman',
      jobTitle: 'Senior Full-Stack Engineer',
      url: url,
      image: image,
      sameAs: ['https://github.com', 'https://linkedin.com', 'https://twitter.com'],
      knowsAbout: [
        'React',
        'TypeScript',
        'Node.js',
        'Express',
        'MongoDB',
        'System Architecture',
        'Cloud Infrastructure',
      ],
    };

    const scriptId = 'json-ld-structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(personSchema);

    return () => {
      // Clean up script if component unmounts
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [title, description, url, image]);

  return null;
};
