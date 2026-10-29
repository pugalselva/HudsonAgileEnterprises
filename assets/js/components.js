/**
 * HUDSON AGILE ENTERPRISES
 * components.js — Shared Component Loader
 *
 * Loads header.html and footer.html into pages via fetch().
 *
 * IMPORTANT: fetch() requires an HTTP server.
 * The site will not load components when opened via file:// protocol.
 * Use VS Code Live Server, Python's http.server, or similar.
 * See README.md for local development instructions.
 *
 * On GoDaddy shared hosting, fetch() works correctly.
 */

'use strict';

const Components = {
  /**
   * Load an HTML component into a selector
   * @param {string} selector — target element selector
   * @param {string} url — path to the component HTML file
   * @returns {Promise<void>}
   */
  async load(selector, url) {
    const target = document.querySelector(selector);
    if (!target) return;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} — ${url}`);
      }
      const html = await response.text();
      target.innerHTML = html;
    } catch (err) {
      console.warn(`[Components] Could not load "${url}":`, err.message);

      // Show graceful fallback for header
      if (selector === '#site-header') {
        target.innerHTML = Components.fallbackHeader();
      }

      // Show graceful fallback for footer
      if (selector === '#site-footer') {
        target.innerHTML = Components.fallbackFooter();
      }
    }
  },

  /**
   * Minimal fallback header if component fetch fails
   */
  fallbackHeader() {
    return `
      <nav class="site-navbar" role="navigation" aria-label="Main navigation">
        <div class="container">
          <div class="navbar-inner">
            <a href="index.html" class="navbar-brand-link">
              <span class="navbar-brand-name">HUDSON AGILE</span>
            </a>
            <div style="font-size:0.8rem;color:rgba(255,255,255,0.4);">
              ⚠ Run via HTTP server to load navigation. See README.md.
            </div>
          </div>
        </div>
      </nav>
    `;
  },

  /**
   * Minimal fallback footer if component fetch fails
   */
  fallbackFooter() {
    const year = Utils.getCurrentYear();
    return `
      <footer class="site-footer" role="contentinfo">
        <div class="container">
          <div class="footer-bottom">
            <p class="footer-bottom-text">
              &copy; ${year} Hudson Agile Enterprises. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    `;
  },

  /**
   * Initialize after components are loaded
   * Re-run nav active states and footer year
   */
  afterLoad() {
    Navigation.initActiveLinks();
    Navigation.initMobileDrawer();
    Navigation.initStickyNav();

    // Set footer year
    const yearEls = document.querySelectorAll('[data-year]');
    yearEls.forEach(el => {
      el.textContent = Utils.getCurrentYear();
    });

    // Set contact info from config (if available)
    if (typeof SITE_CONFIG !== 'undefined') {
      Components.populateContactInfo();
      Components.populateAnnouncementBar();
    }
  },

  populateContactInfo() {
    const { contact, social } = SITE_CONFIG;

    // Email links
    document.querySelectorAll('[data-email]').forEach(el => {
      if (contact.email) {
        el.textContent = contact.email;
        if (el.tagName === 'A') el.href = `mailto:${contact.email}`;
      } else {
        el.closest('[data-contact-item]')?.style.setProperty('display', 'none');
      }
    });

    // Phone links
    document.querySelectorAll('[data-phone]').forEach(el => {
      if (contact.phone) {
        el.textContent = contact.phone;
        if (el.tagName === 'A') el.href = `tel:${contact.phone}`;
      } else {
        el.closest('[data-contact-item]')?.style.setProperty('display', 'none');
      }
    });

    // Social links
    const socialIcons = {
      linkedin: 'bi-linkedin',
      twitter: 'bi-twitter-x',
      instagram: 'bi-instagram',
      youtube: 'bi-youtube',
      github: 'bi-github',
      facebook: 'bi-facebook',
    };

    const socialContainer = document.getElementById('footer-social');
    if (socialContainer) {
      let hasLinks = false;
      socialContainer.innerHTML = '';

      for (const [platform, url] of Object.entries(social)) {
        if (url) {
          hasLinks = true;
          const a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.className = 'footer-social-link';
          a.setAttribute('aria-label', `Hudson Agile on ${platform}`);
          a.innerHTML = `<i class="bi ${socialIcons[platform] || 'bi-link'}"></i>`;
          socialContainer.appendChild(a);
        }
      }

      if (!hasLinks) {
        socialContainer.style.display = 'none';
      }
    }
  },

  populateAnnouncementBar() {
    const { announcement } = SITE_CONFIG;
    const bar = document.getElementById('announcement-bar');
    if (!bar) return;

    if (!announcement.enabled) {
      bar.style.display = 'none';
      return;
    }

    const textEl = bar.querySelector('[data-announcement-text]');
    const linkEl = bar.querySelector('[data-announcement-link]');

    if (textEl) textEl.textContent = announcement.message;
    if (linkEl && announcement.linkHref) {
      linkEl.textContent = announcement.linkText;
      linkEl.href = announcement.linkHref;
    }
  },
};
