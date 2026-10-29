/**
 * HUDSON AGILE ENTERPRISES
 * projects.js — Portfolio Filtering & Rendering
 *
 * Reads from data/projects.js (PROJECTS_DATA, PROJECT_CATEGORIES)
 * and renders the project grid with category filter buttons.
 */

'use strict';

const ProjectsModule = {
  currentFilter: 'all',
  grid: null,
  filtersContainer: null,

  init() {
    this.grid = document.getElementById('projects-grid');
    this.filtersContainer = document.getElementById('project-filters');

    if (!this.grid) return;

    // Only available on pages that have loaded projects.js data
    if (typeof PROJECTS_DATA === 'undefined') {
      console.warn('[ProjectsModule] PROJECTS_DATA not found. Load data/projects.js before projects.js');
      return;
    }

    this.renderFilters();
    this.renderProjects('all');
  },

  renderFilters() {
    if (!this.filtersContainer) return;
    if (typeof PROJECT_CATEGORIES === 'undefined') return;

    this.filtersContainer.innerHTML = '';

    PROJECT_CATEGORIES.forEach(cat => {
      const btn = Utils.createElement('button', {
        class: `filter-btn${cat.id === 'all' ? ' active' : ''}`,
        type: 'button',
        'data-filter': cat.id,
        'aria-pressed': cat.id === 'all' ? 'true' : 'false',
      }, cat.label);

      btn.addEventListener('click', () => {
        this.setFilter(cat.id);
      });

      this.filtersContainer.appendChild(btn);
    });
  },

  setFilter(categoryId) {
    this.currentFilter = categoryId;

    // Update button states
    if (this.filtersContainer) {
      this.filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.dataset.filter === categoryId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    }

    this.renderProjects(categoryId);

    Utils.announceToScreenReader(
      categoryId === 'all'
        ? `Showing all projects`
        : `Showing ${PROJECT_CATEGORIES.find(c => c.id === categoryId)?.label || categoryId} projects`
    );
  },

  renderProjects(categoryId) {
    if (!this.grid) return;

    const filtered = categoryId === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => p.category === categoryId);

    // Clear grid (keep empty state element)
    const emptyState = this.grid.querySelector('.projects-empty-state');
    this.grid.innerHTML = '';
    if (emptyState) this.grid.appendChild(emptyState);

    if (filtered.length === 0) {
      this.showEmptyState();
      return;
    }

    this.hideEmptyState();

    filtered.forEach(project => {
      const card = this.buildProjectCard(project);
      this.grid.insertBefore(card, this.grid.querySelector('.projects-empty-state'));
    });
  },

  buildProjectCard(project) {
    const imageSection = project.image
      ? `<img src="${project.image}" alt="${project.imageAlt}" loading="lazy" class="w-100 h-100" style="object-fit:cover;">`
      : `<div class="project-card-placeholder">
           <i class="bi bi-layers"></i>
           <span>${project.categoryLabel}</span>
         </div>`;

    const sampleBadge = project.isSample
      ? `<span class="badge-tech ms-1" style="background:rgba(217,119,6,.08);border-color:rgba(217,119,6,.2);color:#D97706;">Sample</span>`
      : '';

    const techBadges = project.technologies
      .slice(0, 4)
      .map(t => `<span class="badge-tech badge-tech-blue">${t}</span>`)
      .join('');

    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.innerHTML = `
      <div class="project-card-image">
        ${imageSection}
        <span class="project-card-category">${project.categoryLabel}</span>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${project.title} ${sampleBadge}</h3>
        <p class="project-card-desc">${project.description}</p>
        <div class="project-card-footer">
          <div class="project-tech-badges">${techBadges}</div>
          ${project.link && project.link !== '#'
            ? `<a href="${project.link}" class="project-detail-modal-trigger" target="_blank" rel="noopener noreferrer">
                 View <i class="bi bi-arrow-up-right"></i>
               </a>`
            : `<span class="project-detail-modal-trigger" style="color:var(--color-gray-400);cursor:default;">
                 Details Soon
               </span>`
          }
        </div>
      </div>
    `;
    return card;
  },

  showEmptyState() {
    const emptyState = this.grid?.querySelector('.projects-empty-state');
    if (emptyState) emptyState.classList.add('visible');
  },

  hideEmptyState() {
    const emptyState = this.grid?.querySelector('.projects-empty-state');
    if (emptyState) emptyState.classList.remove('visible');
  },

  /**
   * Render a featured projects strip (used on homepage)
   * @param {string} containerId
   * @param {number} limit
   */
  renderFeatured(containerId, limit = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (typeof PROJECTS_DATA === 'undefined') return;

    const featured = PROJECTS_DATA.filter(p => p.featured).slice(0, limit);

    featured.forEach(project => {
      const card = this.buildProjectCard(project);
      container.appendChild(card);
    });
  },
};
