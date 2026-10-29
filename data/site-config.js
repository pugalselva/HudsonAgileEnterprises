/**
 * HUDSON AGILE ENTERPRISES
 * site-config.js — Central Site Configuration
 *
 * Update this file with real contact details, social URLs,
 * and branding before deploying to production.
 */

const SITE_CONFIG = {
  company: {
    name: 'Hudson Agile Enterprises',
    shortName: 'Hudson Agile',
    tagline: 'Engineering Digital Solutions. Empowering Future Innovators.',
    description:
      'Hudson Agile Enterprises builds modern digital solutions and helps students develop practical programming skills through technology-driven learning and campus collaboration.',
    founded: 2024,
    type: 'Technology & Education Company',
  },

  /**
   * Contact details.
   * Replace placeholders with verified company information before deployment.
   * DO NOT publish unverified contact details.
   */
  contact: {
    email: 'contact@hudsonagile.com',          // Replace with verified email
    supportEmail: 'support@hudsonagile.com',    // Replace with verified email
    phone: null,                                // Add verified phone number
    whatsapp: null,                             // Add verified WhatsApp number
    address: null,                              // Add verified address
    city: null,
    state: null,
    country: 'India',
    businessHours: 'Monday – Saturday, 9:00 AM – 6:00 PM IST',
  },

  /**
   * Social media accounts.
   * Only add URLs for accounts that exist and are active.
   * Leave as null to hide the link.
   */
  social: {
    linkedin: null,   // e.g., 'https://linkedin.com/company/hudson-agile'
    twitter: null,    // e.g., 'https://twitter.com/hudsonagile'
    instagram: null,  // e.g., 'https://instagram.com/hudsonagile'
    youtube: null,    // e.g., 'https://youtube.com/@hudsonagile'
    github: null,     // e.g., 'https://github.com/hudson-agile'
    facebook: null,   // e.g., 'https://facebook.com/hudsonagile'
  },

  /**
   * Website configuration
   */
  site: {
    baseUrl: 'https://hudsonagile.com',         // Replace with production URL
    canonicalBase: 'https://hudsonagile.com',   // Replace with production URL
    logoPath: 'assets/images/branding/logo.png',
    faviconPath: 'assets/images/branding/favicon.ico',
  },

  /**
   * Navigation structure
   */
  navigation: [
    { label: 'Home',            href: 'index.html',           icon: 'house' },
    { label: 'About',           href: 'about.html',           icon: 'info-circle' },
    { label: 'Services',        href: 'services.html',        icon: 'briefcase' },
    { label: 'Campus Programs', href: 'campus-programs.html', icon: 'mortarboard' },
    { label: 'Projects',        href: 'projects.html',        icon: 'grid' },
    { label: 'Careers',         href: 'careers.html',         icon: 'person-badge' },
    { label: 'Contact',         href: 'contact.html',         icon: 'envelope' },
  ],

  /**
   * Announcement bar
   * Set enabled: false to hide. Update message with real announcements only.
   */
  announcement: {
    enabled: true,
    message: 'We are now accepting campus collaboration enquiries for the upcoming academic year.',
    linkText: 'Learn More',
    linkHref: 'campus-programs.html',
  },
};

// Freeze config to prevent accidental mutation
Object.freeze(SITE_CONFIG);
