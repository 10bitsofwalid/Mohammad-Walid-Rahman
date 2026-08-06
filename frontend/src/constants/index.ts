import { ASSETS } from '../assets';

export const APP_CONFIG = {
  name: 'Mohammad Walid Rahman',
  version: '1.0.0',
  author: 'Mohammad Walid Rahman',
} as const;

export const PORTFOLIO_DATA = {
  authorName: 'Mohammad Walid Rahman',
  roleTitle: 'Full Stack Developer',
  availabilityStatus: 'Open to Opportunities',
  availabilitySubtext: "Let's build something amazing together!",
  bio: 'Software Engineering undergraduate at Daffodil International University, building real projects to learn full-stack development — from C-based data structure systems to Node.js/Express APIs, React frontends and Cross Platforms.',
  socials: {
    github: 'https://github.com/10bitsofwalid',
    linkedin: 'https://www.linkedin.com/in/mohammad-walid-rahman',
    email: 'mailto:walidrahmanbd@gmail.com',
    x: 'https://x.com',
    instagram: 'https://www.instagram.com/maybee.walid',
    facebook: 'https://www.facebook.com/maybeee.walid',
    discord: 'https://discord.gg/f9FkewZQZS',
    portfolio: 'https://walid-rahman-portfolio.vercel.app/',
  },
  contact: {
    email: 'walidrahman.officials@gmail.com',
    phone: '+880 1648-177033',
    location: 'Uttara, Dhaka-1230, Bangladesh',
  },
  about: {
    badge: 'About Me',
    title: 'Turning Ideas Into Real-World Solutions',
    paragraphs: [
      "I'm a Software Engineering undergraduate at Daffodil International University, building real projects to learn full-stack development from the ground up — from C-based data structure systems to Node.js/Express APIs, React frontends and Cross Platforms.",
      'I enjoy turning ideas into working, deployed applications — not just tutorials. Currently exploring Flutter, scalable system design, and web security fundamentals. Open to internships, entry-level Software Engineer roles, and open-source collaboration.',
    ],
    experienceBadge: '1+ Year Experience',
    stats: [
      { numericValue: 25, suffix: '+', label: 'Repositories' },
      { numericValue: 5, suffix: '+', label: 'Technologies' },
      { numericValue: 11, suffix: '', label: 'GitHub Followers' },
      { value: '∞', label: 'Learning' },
    ],
  },
  skills: {
    badge: 'My Skills',
    title: 'Technologies I Work With',
    subtitle: 'Always learning, always building. Here are the technologies I work with:',
    categories: ['All', 'Frontend', 'Backend', 'Database', 'Mobile', 'Tools'],
    items: [
      { name: 'React.js', category: 'Frontend', color: '#61DAFB', icon: 'react' },
      { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', icon: 'js' },
      { name: 'TypeScript', category: 'Frontend', color: '#3178C6', icon: 'ts' },
      { name: 'HTML5', category: 'Frontend', color: '#E34F26', icon: 'html5' },
      { name: 'CSS3', category: 'Frontend', color: '#1572B6', icon: 'css3' },
      { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4', icon: 'tailwind' },
      { name: 'Node.js', category: 'Backend', color: '#339933', icon: 'node' },
      { name: 'Express.js', category: 'Backend', color: '#000000', icon: 'express' },
      { name: 'MongoDB', category: 'Database', color: '#47A248', icon: 'mongodb' },
      { name: 'MySQL', category: 'Database', color: '#4479A1', icon: 'mysql' },
      { name: 'Git', category: 'Tools', color: '#F05032', icon: 'git' },
      { name: 'GitHub', category: 'Tools', color: '#181717', icon: 'github' },
      { name: 'Vercel', category: 'Tools', color: '#000000', icon: 'vercel' },
      { name: 'VS Code', category: 'Tools', color: '#007ACC', icon: 'vscode' },
      { name: 'Flutter', category: 'Mobile', color: '#02569B', icon: 'flutter' },
      { name: 'Dart', category: 'Mobile', color: '#4479A1', icon: 'dart' },
      { name: 'PHP', category: 'Backend', color: '#4479A1', icon: 'dart' },
    ],
  },
  projects: {
    badge: 'Featured Work',
    title: "Some Things I've Built",
    subtitle: "Here are a few projects I'm really proud of. Each one taught me something new.",
    items: [
      {
        _id: '1',
        title: 'VeriChain – Product Authenticity Platform And Marketplace',
        description:
          'Full-stack MERN platform combining e-commerce, product authenticity verification, and supply chain traceability to help users verify genuine products, track ownership history, and prevent counterfeit trading.',
        tags: ['TypeScript', 'MERN', 'JWT', 'Supply Chain'],
        image: ASSETS.verichain,
        demoUrl: 'https://github.com/10bitsofwalid/VeriChain-Authentication-WebApp',
        githubUrl: 'https://github.com/10bitsofwalid/VeriChain-Authentication-WebApp',
      },
      {
        _id: '2',
        title: 'Real-Time Chat Application',
        description:
          'Real-time chat application built with the MERN stack supporting one-on-one and group conversations over Socket.IO. Features JWT-based authentication and a responsive chat UI.',
        tags: ['Socket.IO', 'React', 'Node.js', 'MongoDB'],
        image: ASSETS.chatapp,
        demoUrl: 'https://local-chat-site.vercel.app',
        githubUrl: 'https://github.com/10bitsofwalid/chat-app',
      },
      {
        _id: '3',
        title: 'Online Budget Tracker',
        description:
          'Full-stack expense tracking web app with user authentication built with Express and MongoDB. Supports account registration, secure login sessions, and complete CRUD management of personal expenses with live balance updates.',
        tags: ['JavaScript', 'Express.js', 'MongoDB', 'Auth'],
        image: ASSETS.budgettracker,
        demoUrl: 'https://youronlinebudgettracker.vercel.app',
        githubUrl: 'https://github.com/10bitsofwalid/online-budget-tracker',
      },
    ],
  },
  experience: {
    badge: 'Experience',
    title: 'My Journey So Far',
    subtitle: 'A timeline of my professional journey and key experiences.',
    items: [
      {
        role: 'Full Stack Developer',
        company: 'Self-Employed',
        period: '2023 – Present',
        description:
          'Building and deploying full-stack web applications using the MERN stack. Turned ideas into working, deployed products — not just tutorials. Focused on real-time communication systems, authentication flows, and scalable backend APIs.',
      },
      {
        role: 'Open Source Contributor',
        company: 'GitHub (10bitsofwalid)',
        period: '2022 – Present',
        description:
          'Maintaining 25+ public repositories covering full-stack apps, data structure systems, e-commerce platforms, and personal portfolios. Projects span TypeScript, JavaScript, HTML/CSS, C, Python, and Dart/Flutter.',
      },
      {
        role: 'Competitive Programmer',
        company: 'LeetCode / HackerRank',
        period: '2021 – Present',
        description:
          'Solving algorithmic challenges to sharpen problem-solving skills and deepen understanding of data structures, complexity analysis, and systems fundamentals.',
      },
    ],
  },
  education: {
    badge: 'Education',
    title: 'Academic Background',
    subtitle: 'My educational journey and qualifications.',
    items: [
      {
        degree: 'BSc in Software Engineering',
        institution: 'Daffodil International University',
        period: '2021 – Present',
        description:
          'Pursuing a degree in Software Engineering with focus on full-stack development, data structures, system design, and web security fundamentals. Building real capstone projects alongside coursework.',
      },
      {
        degree: 'Higher Secondary Certificate (Science)',
        institution: 'Milestone College',
        period: '2018 – 2020',
        description:
          'Science background with strong foundation in mathematics, physics and problem solving.',
      },
      {
        degree: 'Secondary School Certificate (Science)',
        institution: 'Milestone School And College',
        period: '2016 – 2018',
        description:
          'Built the academic foundation with a focus on sciences and developed an early passion for technology and logic.',
      },
    ],
  },
  githubActivity: {
    badge: 'Coding Activity',
    title: 'GitHub & Open Source Activity',
    subtitle: 'My daily commits, contribution graph, and code statistics on GitHub.',
    username: '10bitsofwalid',
    stats: [
      { label: 'Public Repos', value: '25+' },
      { label: 'Total Contributions', value: '500+' },
      { label: 'Primary Language', value: 'TypeScript' },
      { label: 'Followers', value: '11' },
    ],
    languages: [
      { name: 'TypeScript', percentage: 42, color: '#3178C6' },
      { name: 'JavaScript', percentage: 28, color: '#F7DF1E' },
      { name: 'HTML / CSS', percentage: 15, color: '#E34F26' },
      { name: 'C / C++', percentage: 9, color: '#A8B9CC' },
      { name: 'Dart / Other', percentage: 6, color: '#00B4AB' },
    ],
  },

  certificates: {
    badge: 'Certifications',
    title: 'Licenses & Certifications',
    subtitle: 'Verified professional certifications and completed learning paths.',
    items: [
      {
        id: 'cert-1',
        title: 'Mastering Design Patterns with Java',
        issuer: 'CodeSignal',
        issueDate: 'April 2026',
        credentialId: 'cmmmz4gj4009xi904zm7fl5rx',
        credentialUrl: 'https://codesignal.com/learn/certificates/cmmmz4gj4009xi904zm7fl5rx/course-paths/85',
        image: ASSETS.certificate2,
        tags: ['Java', 'Design Patterns', 'CS Fundamentals', 'Software Architecture'],
      },
      {
        id: 'cert-2',
        title: 'UML (Unified Modeling Language) Training Course',
        issuer: 'Elevify / Ministry of Education',
        issueDate: 'October 2023',
        credentialId: 'BCDX-1234-ZYW9-7654',
        credentialUrl: 'http://www.moe.gov.er/verify/cer#241-35-435',
        image: ASSETS.certificate1,
        tags: ['UML', 'Software Design', 'System Architecture', 'Modeling'],
      },
    ],
  },

  beyondCode: {
    badge: 'Beyond Code',
    title: 'What Drives Me',
    subtitle: 'A few things that keep me motivated and inspired outside of work.',
    items: [
      {
        title: 'Problem Solving',
        description:
          'I love breaking down complex problems into clear steps and finding elegant, working solutions — from algorithms to architecture.',
        icon: 'puzzle',
      },
      {
        title: 'Continuous Learning',
        description:
          'Currently exploring Flutter, scalable system design, and web security fundamentals. Tech evolves, and so do I.',
        icon: 'book',
      },
      {
        title: 'Building Real Things',
        description:
          'Shipping deployed apps, not just following tutorials. Every project teaches me something that no course can replicate.',
        icon: 'sparkles',
      },
      {
        title: 'Community',
        description:
          'Sharing knowledge, collaborating on open source, and growing together with developers around the world.',
        icon: 'heart',
      },
    ],
  },
} as const;
