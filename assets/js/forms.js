/**
 * HUDSON AGILE ENTERPRISES
 * forms.js — Form Validation & Submission Handling
 *
 * Handles:
 * - Client-side field validation
 * - Accessible inline error messages
 * - Success state (demo mode — no backend)
 * - Consent checkbox enforcement
 *
 * IMPORTANT: This is a FRONTEND-ONLY implementation.
 * Forms do NOT send data to any server in this version.
 * PHP/Laravel backend integration is required for actual submission.
 * See README.md for integration instructions.
 */

'use strict';

const Forms = {

  init() {
    this.initEnquiryForms();
    this.initFaqAccordion();
  },

  /* ══════════════════════════════════
     ENQUIRY FORM VALIDATION
  ══════════════════════════════════ */

  initEnquiryForms() {
    // Find all forms with data-validate attribute
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });

      // Real-time validation on blur
      form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => {
          this.validateField(field);
        });

        field.addEventListener('input', () => {
          if (field.classList.contains('is-invalid')) {
            this.validateField(field);
          }
        });
      });
    });
  },

  handleFormSubmit(form) {
    const isValid = this.validateForm(form);

    if (!isValid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
        Utils.announceToScreenReader(
          'Please correct the errors in the form before submitting.',
          'assertive'
        );
      }
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
    }

    // Simulate async submission (frontend demo only)
    setTimeout(() => {
      this.showSuccessState(form);
      Utils.announceToScreenReader(
        'Your enquiry has been submitted. We will be in touch shortly.',
        'polite'
      );
    }, 1200);
  },

  validateForm(form) {
    let isValid = true;

    form.querySelectorAll('[data-required]').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    // Validate consent checkbox if present
    const consent = form.querySelector('[data-consent]');
    if (consent && !consent.checked) {
      this.showFieldError(consent, 'Please accept the privacy notice to continue.');
      isValid = false;
    }

    return isValid;
  },

  validateField(field) {
    const value = field.value.trim();
    const type  = field.type;
    const isRequired = field.hasAttribute('data-required');

    // Skip non-required empty fields
    if (!isRequired && !value) {
      this.clearFieldError(field);
      return true;
    }

    // Empty required
    if (isRequired && !value) {
      const label = this.getFieldLabel(field);
      this.showFieldError(field, `${label} is required.`);
      return false;
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Please enter a valid email address.');
        return false;
      }
    }

    // Phone validation (optional but formatted check when provided)
    if (field.dataset.type === 'phone' && value) {
      const phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
      if (!phoneRegex.test(value)) {
        this.showFieldError(field, 'Please enter a valid phone number.');
        return false;
      }
    }

    // Min length
    const minLen = parseInt(field.dataset.minLength, 10);
    if (minLen && value.length < minLen) {
      this.showFieldError(field, `Please enter at least ${minLen} characters.`);
      return false;
    }

    this.clearFieldError(field);
    field.classList.add('is-valid');
    return true;
  },

  getFieldLabel(field) {
    const labelEl = field.closest('.mb-3, .form-group')?.querySelector('label');
    if (labelEl) return labelEl.textContent.replace('*', '').trim();
    return field.name || 'This field';
  },

  showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    field.setAttribute('aria-invalid', 'true');

    let errorEl = document.getElementById(`${field.id}-error`);
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.id = `${field.id}-error`;
      errorEl.className = 'form-error-msg';
      errorEl.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorEl);
    }

    errorEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${message}`;
    errorEl.classList.remove('hidden');
    field.setAttribute('aria-describedby', errorEl.id);
  },

  clearFieldError(field) {
    field.classList.remove('is-invalid');
    field.setAttribute('aria-invalid', 'false');

    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) {
      errorEl.classList.add('hidden');
      errorEl.textContent = '';
    }
  },

  showSuccessState(form) {
    // Hide form fields
    const formBody = form.querySelector('[data-form-body]');
    if (formBody) formBody.style.display = 'none';

    // Show success state
    const successEl = form.querySelector('[data-success-state]');
    if (successEl) {
      successEl.classList.add('visible');
    } else {
      // Fallback inline success message
      const msg = document.createElement('div');
      msg.className = 'form-success-state visible';
      msg.innerHTML = `
        <div class="form-success-icon">
          <i class="bi bi-check-lg"></i>
        </div>
        <h3 class="form-success-title">Enquiry Received</h3>
        <p class="form-success-desc">Thank you for reaching out. We have noted your enquiry and will respond as soon as possible.</p>
        <div class="form-demo-notice">
          <i class="bi bi-info-circle-fill flex-shrink-0"></i>
          <span><strong>Demo mode:</strong> This form does not currently send data to a server. PHP/Laravel backend integration is required for real email delivery. See README.md for details.</span>
        </div>
      `;
      form.appendChild(msg);
      form.style.overflow = 'visible';
    }
  },

  /* ══════════════════════════════════
     FAQ ACCORDION
  ══════════════════════════════════ */

  initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.setAttribute('aria-expanded', 'false');

      const answer = item.querySelector('.faq-answer');
      if (answer) {
        const answerId = `faq-answer-${Math.random().toString(36).slice(2, 7)}`;
        answer.id = answerId;
        questionBtn.setAttribute('aria-controls', answerId);
      }

      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others (accordion behaviour)
        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('open', !isOpen);
        questionBtn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  },
};
