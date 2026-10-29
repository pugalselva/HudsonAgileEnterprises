/**
 * HUDSON AGILE ENTERPRISES
 * projects.js — Project Portfolio Data
 *
 * These are illustrative sample projects for demonstration purposes.
 * Replace with real project data as Hudson Agile completes client work.
 *
 * NOTE: Do not add real client names, client logos, or fabricated
 * business results without verification.
 */

const PROJECTS_DATA = [
  {
    id: 'campus-connect-portal',
    title: 'Campus Connect Portal',
    category: 'web-app',
    categoryLabel: 'Web Application',
    description:
      'A college management portal enabling seamless communication between students, faculty, and administration. Includes notice boards, event scheduling, and academic tracking.',
    technologies: ['Laravel', 'MySQL', 'Bootstrap', 'JavaScript'],
    image: null,        // Replace with actual project screenshot path
    imageAlt: 'Campus Connect Portal — college management web application',
    link: '#',          // Replace with live URL or case study link
    featured: true,
    isSample: true,
  },
  {
    id: 'business-website-template',
    title: 'Professional Business Website',
    category: 'website',
    categoryLabel: 'Website',
    description:
      'A responsive corporate website with a modern design, service sections, team profiles, client enquiry forms, and integrated blog functionality.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    image: null,
    imageAlt: 'Professional business website with modern design',
    link: '#',
    featured: true,
    isSample: true,
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management System',
    category: 'web-app',
    categoryLabel: 'Web Application',
    description:
      'A database-driven inventory system for small businesses. Features include stock tracking, purchase order management, supplier records, and exportable reports.',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'Chart.js'],
    image: null,
    imageAlt: 'Inventory management system dashboard',
    link: '#',
    featured: false,
    isSample: true,
  },
  {
    id: 'student-project-showcase',
    title: 'Student Project Showcase Platform',
    category: 'education',
    categoryLabel: 'Education Tech',
    description:
      'A platform for students to publish and share their final-year projects, complete with technology tags, project descriptions, and GitHub repository links.',
    technologies: ['Laravel', 'MySQL', 'React', 'REST API'],
    image: null,
    imageAlt: 'Student project showcase and portfolio platform',
    link: '#',
    featured: true,
    isSample: true,
  },
  {
    id: 'workshop-registration-system',
    title: 'Workshop Registration System',
    category: 'education',
    categoryLabel: 'Education Tech',
    description:
      'An online registration system for programming workshops and technical seminars. Includes participant management, slot booking, and automated confirmation messages.',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    image: null,
    imageAlt: 'Workshop registration and management system',
    link: '#',
    featured: false,
    isSample: true,
  },
  {
    id: 'api-integration-ecommerce',
    title: 'E-Commerce API Integration',
    category: 'integration',
    categoryLabel: 'API Integration',
    description:
      'Integration of payment gateway, SMS notification, and logistics tracking APIs for a small business e-commerce platform. Enables real-time order tracking and automated payment processing.',
    technologies: ['Node.js', 'REST API', 'PostgreSQL', 'Webhooks'],
    image: null,
    imageAlt: 'E-commerce platform API integration project',
    link: '#',
    featured: false,
    isSample: true,
  },
];

/**
 * Project filter categories.
 * Add new categories as more project types are added.
 */
const PROJECT_CATEGORIES = [
  { id: 'all',         label: 'All Projects' },
  { id: 'website',     label: 'Websites' },
  { id: 'web-app',     label: 'Web Applications' },
  { id: 'education',   label: 'Education Tech' },
  { id: 'integration', label: 'API Integration' },
];

Object.freeze(PROJECTS_DATA);
Object.freeze(PROJECT_CATEGORIES);
