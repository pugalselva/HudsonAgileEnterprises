/**
 * HUDSON AGILE ENTERPRISES
 * main.js — Application Entry Point
 *
 * Initializes all modules in the correct order after
 * shared components (header/footer) have loaded.
 */

'use strict';

document.addEventListener('DOMContentLoaded', async () => {

  // ── 1. Set footer copyright year (before component load) ──
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = Utils.getCurrentYear();
  });

  // ── 2. Load shared header and footer components ──
  await Promise.all([
    Components.load('#site-header', 'components/header.html'),
    Components.load('#site-footer', 'components/footer.html'),
  ]);

  // ── 3. Run post-load setup ──
  Components.afterLoad();

  // ── 4. Initialize Navigation ──
  Navigation.init();

  // ── 5. Initialize Forms & FAQ ──
  Forms.init();

  // ── 6. Initialize Project filtering (projects page only) ──
  ProjectsModule.init();

  // ── 7. Render featured projects on homepage ──
  ProjectsModule.renderFeatured('featured-projects-grid', 3);

  // ── 8. Initialize back-to-top button ──
  initBackToTopStandalone();

});

/**
 * Back-to-top button may live outside the component,
 * so initialize it independently if needed.
 */
function initBackToTopStandalone() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const handleScroll = Utils.debounce(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: Utils.prefersReducedMotion() ? 'auto' : 'smooth',
    });
  });
}
