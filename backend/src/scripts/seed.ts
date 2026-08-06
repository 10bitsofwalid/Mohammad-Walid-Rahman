import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.model.js';
import { Project } from '../models/Project.model.js';
import { Experience } from '../models/Experience.model.js';
import { Skill } from '../models/Skill.model.js';
import { Education } from '../models/Education.model.js';
import { Social } from '../models/Social.model.js';
import { Setting } from '../models/Setting.model.js';
import { Blog } from '../models/Blog.model.js';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected successfully!');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Skill.deleteMany({}),
      Education.deleteMany({}),
      Social.deleteMany({}),
      Setting.deleteMany({}),
      Blog.deleteMany({}),
    ]);
    console.log('Cleared existing collections.');

    // Seed Admin User
    const passwordHash = await bcrypt.hash('walid-435-officials', 12);
    await User.create({
      name: 'Mohammad Walid Rahman',
      email: 'walidrahman.officials@gmail.com',
      passwordHash,
      role: 'admin',
    });
    console.log('Created Admin User (walidrahman.officials@gmail.com)');

    // Seed Projects
    await Project.insertMany([
      {
        title: 'Apple-Grade E-Commerce Platform',
        slug: 'apple-grade-ecommerce',
        tagline: 'Ultra-fast Next.js store with dynamic glassmorphism UI',
        description:
          'High-performance full-stack web store with realtime inventory management, Stripe checkout, and ultra-sleek glassmorphic UI.',
        thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000',
        images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
        category: 'Full-Stack',
        featured: true,
        metrics: [{ label: 'Lighthouse Score', value: '100/100' }],
        order: 1,
      },
      {
        title: 'Distributed Cloud Microservices Dashboard',
        slug: 'distributed-microservices-dashboard',
        tagline: 'Real-time telemetry dashboard for multi-region Kubernetes clusters',
        description:
          'Real-time metrics streaming dashboard with WebSocket telemetry monitoring server health across multi-region Kubernetes clusters.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
        images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        technologies: ['React', 'Zustand', 'Go', 'Docker', 'WebSockets', 'Grafana'],
        category: 'Backend',
        featured: true,
        metrics: [{ label: 'Throughput', value: '50k req/sec' }],
        order: 2,
      },
    ]);
    console.log('Seeded Projects.');

    // Seed Experiences
    await Experience.insertMany([
      {
        company: 'TechCorp International',
        role: 'Lead Staff Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2022-01-01',
        current: true,
        description:
          'Spearheaded frontend architecture overhaul across core enterprise applications.',
        highlights: [
          'Architected micro-frontend design system serving 1M+ daily active users',
          'Reduced p99 page latency from 1.8s to 320ms across key workflows',
        ],
        technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
        order: 1,
      },
    ]);
    console.log('Seeded Experiences.');

    // Seed Skills
    await Skill.insertMany([
      { name: 'React', category: 'Frontend', proficiency: 95, featured: true, order: 1 },
      { name: 'TypeScript', category: 'Frontend', proficiency: 92, featured: true, order: 2 },
      { name: 'Node.js', category: 'Backend', proficiency: 90, featured: true, order: 3 },
      { name: 'MongoDB', category: 'Backend', proficiency: 88, featured: true, order: 4 },
    ]);
    console.log('Seeded Skills.');

    // Seed Education
    await Education.insertMany([
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2015-09-01',
        endDate: '2019-06-01',
        description: 'First Class Honors in Software Systems & Distributed Computing.',
      },
    ]);
    console.log('Seeded Education.');

    // Seed Socials
    await Social.insertMany([
      { platform: 'GitHub', url: 'https://github.com', icon: 'github', order: 1 },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin', order: 2 },
      { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter', order: 3 },
    ]);
    console.log('Seeded Social Links.');

    // Seed Settings
    await Setting.create({
      siteTitle: 'Senior Software Engineer Portfolio',
      authorName: 'Senior Software Engineer',
      roleTitle: 'Lead Full-Stack Architect',
      bio: 'Crafting world-class digital experiences with precision & performance.',
      contactEmail: 'contact@example.com',
      availabilityStatus: 'Available for Select Contracts & Advisory',
    });
    console.log('Seeded Site Settings.');

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
}

seedDatabase();
