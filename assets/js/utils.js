/**
 * HUDSON AGILE ENTERPRISES
 * utils.js — Utility Functions
 */

'use strict';

const Utils = {
  /**
   * Get the current year for footer copyright
   */
  getCurrentYear() {
    return new Date().getFullYear();
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Debounce: limits how often a function runs
   * @param {Function} fn
   * @param {number} delay ms
   */
  debounce(fn, delay = 150) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * Scroll to an element smoothly
   * @param {string|Element} target — CSS selector or element
   * @param {number} offset — px to offset from top (e.g., sticky nav height)
   */
  scrollTo(target, offset = 80) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    if (Utils.prefersReducedMotion()) {
      window.scrollTo({ top });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  },

  /**
   * Safely set inner HTML text (escapes to prevent XSS)
   * @param {Element} el
   * @param {string} text
   */
  setTextContent(el, text) {
    if (el) el.textContent = text;
  },

  /**
   * Create an element with attributes and optional children
   * @param {string} tag
   * @param {Object} attrs
   * @param  {...Node|string} children
   */
  createElement(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(attrs)) {
      if (key === 'class') el.className = val;
      else if (key.startsWith('data-')) el.setAttribute(key, val);
      else el[key] = val;
    }
    for (const child of children) {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child) el.appendChild(child);
    }
    return el;
  },

  /**
   * Get the current page filename
   * e.g., 'index.html', 'about.html'
   */
  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename || 'index.html';
  },

  /**
   * Announce a message to screen readers via aria-live
   * @param {string} message
   * @param {'polite'|'assertive'} priority
   */
  announceToScreenReader(message, priority = 'polite') {
    let announcer = document.getElementById('sr-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.setAttribute('aria-live', priority);
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'visually-hidden';
      document.body.appendChild(announcer);
    }
    // Clear then set to trigger announcement
    announcer.textContent = '';
    setTimeout(() => { announcer.textContent = message; }, 100);
  },

  /**
   * Format a tech stack array into badge HTML strings
   * @param {string[]} techs
   */
  renderTechBadges(techs) {
    return techs
      .map(t => `<span class="badge-tech badge-tech-blue">${t}</span>`)
      .join('');
  },
};
