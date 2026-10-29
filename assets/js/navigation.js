/**
 * HUDSON AGILE ENTERPRISES
 * navigation.js — Navigation Behaviours
 *
 * Handles:
 * - Sticky navbar with scroll class
 * - Mobile drawer toggle
 * - Active nav link detection
 * - Back-to-top button
 * - Smooth scroll for anchor links
 */

'use strict';

const Navigation = {
  navbar: null,
  mobileDrawer: null,
  mobileToggle: null,
  backToTopBtn: null,
  isDrawerOpen: false,

  init() {
    this.navbar       = document.querySelector('.site-navbar');
    this.mobileDrawer = document.querySelector('.mobile-nav-drawer');
    this.mobileToggle = document.querySelector('.navbar-toggler-btn');
    this.backToTopBtn = document.getElementById('back-to-top');

    this.initStickyNav();
    this.initMobileDrawer();
    this.initActiveLinks();
    this.initBackToTop();
    this.initSmoothScroll();
  },

  /* ── Sticky Nav ── */
  initStickyNav() {
    if (!this.navbar) return;

    const handleScroll = Utils.debounce(() => {
      if (window.scrollY > 10) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  },

  /* ── Mobile Drawer ── */
  initMobileDrawer() {
    if (!this.mobileToggle || !this.mobileDrawer) return;

    this.mobileToggle.addEventListener('click', () => {
      this.toggleDrawer();
    });

    // Close drawer when a link inside it is clicked
    this.mobileDrawer.addEventListener('click', (e) => {
      if (e.target.closest('.mobile-nav-link')) {
        this.closeDrawer();
      }
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDrawerOpen) {
        this.closeDrawer();
        this.mobileToggle.focus();
      }
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (
        this.isDrawerOpen &&
        !this.navbar.contains(e.target) &&
        !this.mobileDrawer.contains(e.target)
      ) {
        this.closeDrawer();
      }
    });
  },

  toggleDrawer() {
    this.isDrawerOpen ? this.closeDrawer() : this.openDrawer();
  },

  openDrawer() {
    this.isDrawerOpen = true;
    this.mobileDrawer.classList.add('open');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    this.mobileToggle.innerHTML = '<i class="bi bi-x-lg"></i>';
  },

  closeDrawer() {
    this.isDrawerOpen = false;
    this.mobileDrawer.classList.remove('open');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
  },

  /* ── Active Links ── */
  initActiveLinks() {
    const currentPage = Utils.getCurrentPage();

    // Desktop nav
    document.querySelectorAll('.nav-link-item').forEach(link => {
      const href = link.getAttribute('href');
      if (
        href === currentPage ||
        (currentPage === '' && href === 'index.html')
      ) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // Mobile nav
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (
        href === currentPage ||
        (currentPage === '' && href === 'index.html')
      ) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  },

  /* ── Back to Top ── */
  initBackToTop() {
    if (!this.backToTopBtn) return;

    const handleScroll = Utils.debounce(() => {
      if (window.scrollY > 400) {
        this.backToTopBtn.classList.add('visible');
      } else {
        this.backToTopBtn.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    this.backToTopBtn.addEventListener('click', () => {
      Utils.scrollTo(document.body, 0);
      window.scrollTo({ top: 0, behavior: Utils.prefersReducedMotion() ? 'auto' : 'smooth' });
    });
  },

  /* ── Smooth Scroll for anchor links ── */
  initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      if (hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      Utils.scrollTo(target, 88);

      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, null, hash);
      }
    });
  },
};
