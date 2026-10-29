/**
 * HUDSON AGILE ENTERPRISES
 * services.js — Software Services Data
 *
 * Add, remove, or update services here.
 * All service pages and cards are generated from this data.
 */

const SERVICES_DATA = [
  {
    id: 'website-development',
    icon: 'bi-globe2',
    iconColor: 'service-card-icon-blue',
    title: 'Website Development',
    shortDesc:
      'Professional, responsive websites built with modern technologies. From landing pages to complex multi-page corporate websites.',
    fullDesc:
      'We design and develop professional business websites that represent your brand credibly online. Every website we build is fully responsive, fast-loading, and optimized for search engines. Whether you need a corporate landing page, a service website, or a multi-page business site, we deliver clean, maintainable code that your team can confidently manage.',
    features: [
      'Responsive design for all devices',
      'Performance optimization',
      'SEO-ready HTML structure',
      'Cross-browser compatibility',
      'Content management ready',
      'Secure and accessible',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'WordPress'],
    link: 'services.html#website-development',
    category: 'Web',
  },
  {
    id: 'web-applications',
    icon: 'bi-window-stack',
    iconColor: 'service-card-icon-blue',
    title: 'Custom Web Applications',
    shortDesc:
      'Feature-rich web applications tailored to your business processes. Built with scalable architecture and modern frameworks.',
    fullDesc:
      'Custom web applications solve specific business challenges that off-the-shelf software cannot address. We build web applications with clearly defined architectures, using modern frontend frameworks connected to reliable backend APIs. Our applications are designed for performance, security, and ease of maintenance.',
    features: [
      'Business-specific workflow automation',
      'User authentication and authorization',
      'Role-based access control',
      'RESTful API integration',
      'Database-driven functionality',
      'Scalable application architecture',
    ],
    technologies: ['React', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    link: 'services.html#web-applications',
    category: 'Applications',
  },
  {
    id: 'api-integration',
    icon: 'bi-plug',
    iconColor: 'service-card-icon-cyan',
    title: 'API Integration',
    shortDesc:
      'Connect your systems with third-party services, payment gateways, and business tools through robust API integrations.',
    fullDesc:
      'Modern businesses run on connected systems. We design and implement API integrations that allow your website and applications to communicate with payment gateways, logistics providers, CRM platforms, communication tools, and external data sources. We work with both REST and third-party SDK integrations.',
    features: [
      'Payment gateway integration',
      'Third-party service connections',
      'Data synchronization',
      'Webhook implementation',
      'API documentation',
      'Error handling and monitoring',
    ],
    technologies: ['REST API', 'JSON', 'OAuth', 'Webhooks', 'Node.js'],
    link: 'services.html#api-integration',
    category: 'Integration',
  },
  {
    id: 'database-solutions',
    icon: 'bi-database',
    iconColor: 'service-card-icon-blue',
    title: 'Database Solutions',
    shortDesc:
      'Efficient database design, optimization, and management for applications that need reliable, scalable data storage.',
    fullDesc:
      'A well-designed database is the foundation of any reliable application. We design normalized, efficient database schemas that support your business requirements today and scale with your growth. We handle database design, query optimization, data migration, and ongoing database management.',
    features: [
      'Relational database design',
      'Query optimization',
      'Data migration services',
      'Backup and recovery planning',
      'Database performance tuning',
      'Data modeling and documentation',
    ],
    technologies: ['MySQL', 'PostgreSQL', 'SQLite', 'Database Design'],
    link: 'services.html#database-solutions',
    category: 'Infrastructure',
  },
  {
    id: 'software-maintenance',
    icon: 'bi-tools',
    iconColor: 'service-card-icon-navy',
    title: 'Software Maintenance',
    shortDesc:
      'Ongoing support, bug fixes, security updates, and feature enhancements to keep your software running at its best.',
    fullDesc:
      'Software requires continuous care. We provide ongoing maintenance services including bug fixes, security patches, dependency updates, performance improvements, and feature enhancements. Our maintenance packages are designed to give you peace of mind and keep your software secure and up to date.',
    features: [
      'Bug identification and resolution',
      'Security patch management',
      'Performance monitoring',
      'Dependency updates',
      'Feature enhancements',
      'Documentation maintenance',
    ],
    technologies: ['Git', 'GitHub', 'CI/CD', 'Testing'],
    link: 'services.html#software-maintenance',
    category: 'Support',
  },
  {
    id: 'technical-consulting',
    icon: 'bi-lightbulb',
    iconColor: 'service-card-icon-cyan',
    title: 'Technical Consulting',
    shortDesc:
      'Expert guidance on technology selection, architecture decisions, and digital strategy for your business or project.',
    fullDesc:
      'Technology decisions have long-term consequences. Our technical consulting service provides honest, practical guidance on technology selection, application architecture, team structure, and digital strategy. Whether you are starting a new project or evaluating your existing technology stack, we help you make informed decisions.',
    features: [
      'Technology stack assessment',
      'Architecture review and recommendations',
      'Digital transformation guidance',
      'Project feasibility analysis',
      'Code review and quality assessment',
      'Technology roadmap planning',
    ],
    technologies: ['Architecture', 'Strategy', 'Review', 'Planning'],
    link: 'services.html#technical-consulting',
    category: 'Consulting',
  },
];

// Freeze to prevent accidental mutation
Object.freeze(SERVICES_DATA);
