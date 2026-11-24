import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { PERSONAL_DATA } from '../../../data/portfolio-data';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SectionTitleComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <section id="contact" class="section-wrapper contact-section">
      <div class="container">
        <!-- Section Title -->
        <app-section-title
          badge="Direct Outreach"
          title="Let's Work"
          highlight="Together"
          subtitle="Have a project or an opportunity? Let's talk!"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
        ></app-section-title>

        <div class="contact-grid">
          <!-- Left Column: Direct Channels & Cards -->
          <div class="channels-column" appRevealOnScroll [revealAnimation]="'fade-right'">
            <div class="channels-intro">
              <h3 class="channels-title">Get in Touch Directly</h3>
              <p class="channels-desc">
                Whether you want to discuss backend architectures, collaborate on full-stack projects, inquire about academic problem solving, or discuss an internship or software role, feel free to reach out directly through any of these channels:
              </p>
            </div>

            <div class="channels-list">
              <!-- WhatsApp -->
              @if (personalData.whatsappUrl) {
              <a
                [href]="personalData.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="channel-card glass-card"
                title="Chat directly on WhatsApp"
              >
                <div class="channel-icon-wrap icon-whatsapp">
                  <i class="bi bi-whatsapp"></i>
                </div>
                <div class="channel-meta">
                  <div class="channel-label-row">
                    <span class="channel-name">WhatsApp Direct</span>
                    <span class="channel-action">Instant Chat <i class="bi bi-box-arrow-up-right"></i></span>
                  </div>
                  <span class="channel-val">{{ personalData.whatsappDisplay }}</span>
                </div>
              </a>
              }

              <!-- Email -->
              <a
                [href]="'mailto:' + personalData.email"
                class="channel-card glass-card"
                title="Send an email"
              >
                <div class="channel-icon-wrap icon-email">
                  <i class="bi bi-envelope-at-fill"></i>
                </div>
                <div class="channel-meta">
                  <div class="channel-label-row">
                    <span class="channel-name">Email Inbox</span>
                    <span class="channel-action">Mailto <i class="bi bi-arrow-right"></i></span>
                  </div>
                  <span class="channel-val">{{ personalData.email }}</span>
                </div>
              </a>

              <!-- LinkedIn -->
              <a
                [href]="personalData.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="channel-card glass-card"
                title="Connect on LinkedIn"
              >
                <div class="channel-icon-wrap icon-linkedin">
                  <i class="bi bi-linkedin"></i>
                </div>
                <div class="channel-meta">
                  <div class="channel-label-row">
                    <span class="channel-name">LinkedIn Profile</span>
                    <span class="channel-action">Connect <i class="bi bi-box-arrow-up-right"></i></span>
                  </div>
                  <span class="channel-val">abdelrahman-elstohy</span>
                </div>
              </a>

              <!-- GitHub -->
              <a
                [href]="personalData.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="channel-card glass-card"
                title="View GitHub profile and repositories"
              >
                <div class="channel-icon-wrap icon-github">
                  <i class="bi bi-github"></i>
                </div>
                <div class="channel-meta">
                  <div class="channel-label-row">
                    <span class="channel-name">GitHub Repositories</span>
                    <span class="channel-action">Explore <i class="bi bi-box-arrow-up-right"></i></span>
                  </div>
                  <span class="channel-val">abdelrahman-elstohy</span>
                </div>
              </a>
            </div>

            <!-- University & Location Card -->
            <div class="location-card glass-card">
              <i class="bi bi-geo-alt-fill loc-icon"></i>
              <div>
                <h5 class="loc-title">Location &amp; Academic Base</h5>
                <p class="loc-text">Mansoura, Egypt &bull; Mansoura University Computer Science</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Angular Reactive Contact Form -->
          <div class="form-column" appRevealOnScroll [revealAnimation]="'fade-left'" [revealDelay]="150">
            <div class="form-card glass-card">
              <div class="form-header">
                <h3 class="form-title">Send a Message</h3>
                <p class="form-subtitle">Fill out the form below to initiate correspondence.</p>
              </div>

              <!-- Success Notification -->
              @if (submissionState() === 'success') {
                <div class="alert-box alert-success" role="alert">
                  <i class="bi bi-check-circle-fill alert-icon"></i>
                  <div class="alert-content">
                    <h5 class="alert-heading">Message Ready &amp; Recorded!</h5>
                    <p class="alert-desc">
                      Thank you, <strong>{{ submittedName() }}</strong>. Your inquiry has been processed in this local front-end session.
                    </p>
                    <div class="integration-notice">
                      <i class="bi bi-info-circle"></i>
                      <span>
                        Note: For automatic production email delivery, plug in an endpoint (e.g. EmailJS, Formspree, or your Node.js API endpoint) into <code>contact.component.ts</code>. You can also use the direct email and social links on the left.
                      </span>
                    </div>
                    <button class="btn btn-outline btn-sm reset-btn" (click)="resetForm()">
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              }

              <!-- Error Notification -->
              @if (submissionState() === 'error') {
                <div class="alert-box alert-error" role="alert">
                  <i class="bi bi-exclamation-triangle-fill alert-icon"></i>
                  <div class="alert-content">
                    <h5 class="alert-heading">Submission Error</h5>
                    <p class="alert-desc">
                      Please verify all fields are filled out correctly and try again.
                    </p>
                  </div>
                </div>
              }

              <!-- The Reactive Form -->
              @if (submissionState() !== 'success') {
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate class="contact-form">
                  <!-- Full Name Field -->
                  <div class="form-group">
                    <label for="fullName" class="form-label">
                      Full Name <span class="required">*</span>
                    </label>
                    <div class="input-wrapper" [class.has-error]="isInvalid('fullName')">
                      <i class="bi bi-person input-icon"></i>
                      <input
                        id="fullName"
                        type="text"
                        formControlName="fullName"
                        placeholder="e.g. John Doe"
                        class="form-input"
                        autocomplete="name"
                      />
                    </div>
                    @if (isInvalid('fullName')) {
                      <div class="error-msg">
                        @if (contactForm.get('fullName')?.errors?.['required']) {
                          <span>Full name is required.</span>
                        }
                        @if (contactForm.get('fullName')?.errors?.['minlength']) {
                          <span>Full name must be at least 3 characters.</span>
                        }
                      </div>
                    }
                  </div>

                  <!-- Email Address Field -->
                  <div class="form-group">
                    <label for="email" class="form-label">
                      Email Address <span class="required">*</span>
                    </label>
                    <div class="input-wrapper" [class.has-error]="isInvalid('email')">
                      <i class="bi bi-envelope input-icon"></i>
                      <input
                        id="email"
                        type="email"
                        formControlName="email"
                        placeholder="e.g. yourname@example.com"
                        class="form-input"
                        autocomplete="email"
                      />
                    </div>
                    @if (isInvalid('email')) {
                      <div class="error-msg">
                        @if (contactForm.get('email')?.errors?.['required']) {
                          <span>Email address is required.</span>
                        }
                        @if (contactForm.get('email')?.errors?.['email']) {
                          <span>Please enter a valid email address.</span>
                        }
                      </div>
                    }
                  </div>

                  <!-- Subject Field -->
                  <div class="form-group">
                    <label for="subject" class="form-label">
                      Subject <span class="required">*</span>
                    </label>
                    <div class="input-wrapper" [class.has-error]="isInvalid('subject')">
                      <i class="bi bi-chat-left-text input-icon"></i>
                      <input
                        id="subject"
                        type="text"
                        formControlName="subject"
                        placeholder="e.g. Software Engineering Opportunity / Collaboration"
                        class="form-input"
                      />
                    </div>
                    @if (isInvalid('subject')) {
                      <div class="error-msg">
                        @if (contactForm.get('subject')?.errors?.['required']) {
                          <span>Subject is required.</span>
                        }
                        @if (contactForm.get('subject')?.errors?.['minlength']) {
                          <span>Subject must be at least 4 characters.</span>
                        }
                      </div>
                    }
                  </div>

                  <!-- Message Field -->
                  <div class="form-group">
                    <label for="message" class="form-label">
                      Message <span class="required">*</span>
                    </label>
                    <div class="input-wrapper" [class.has-error]="isInvalid('message')">
                      <textarea
                        id="message"
                        formControlName="message"
                        rows="5"
                        placeholder="Write your message here... (minimum 15 characters)"
                        class="form-textarea"
                      ></textarea>
                    </div>
                    @if (isInvalid('message')) {
                      <div class="error-msg">
                        @if (contactForm.get('message')?.errors?.['required']) {
                          <span>Message is required.</span>
                        }
                        @if (contactForm.get('message')?.errors?.['minlength']) {
                          <span>Message must be at least 15 characters.</span>
                        }
                      </div>
                    }
                  </div>

                  <!-- Submit Button with Loading State -->
                  <button
                    type="submit"
                    class="btn btn-primary submit-btn"
                    [disabled]="isLoading()"
                  >
                    @if (isLoading()) {
                      <span class="spinner-border" role="status"></span>
                      <span>Sending Message...</span>
                    } @else {
                      <i class="bi bi-send-fill"></i>
                      <span>Send Message</span>
                    }
                  </button>
                </form>
              }
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      .contact-section {
        position: relative;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      @media (min-width: 992px) {
        .contact-grid {
          grid-template-columns: 1fr 1.25fr;
          gap: 3.5rem;
        }
      }

      /* Left Column: Direct Channels */
      .channels-column {
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
      }

      .channels-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.75rem;
      }

      .channels-desc {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--color-text-secondary);
        margin: 0;
      }

      .channels-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .channel-card {
        padding: 1.25rem 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 1.25rem;
        transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
      }

      .channel-card:hover {
        transform: translateX(6px);
        border-color: var(--color-accent);
      }

      .channel-icon-wrap {
        width: 48px;
        height: 48px;
        min-width: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.35rem;
      }

      .icon-whatsapp {
        background: rgba(37, 211, 102, 0.15);
        color: #25d366;
        border: 1px solid rgba(37, 211, 102, 0.3);
      }

      .icon-email {
        background: var(--color-accent-subtle);
        color: var(--color-accent);
        border: 1px solid var(--color-border);
      }

      .icon-linkedin {
        background: rgba(10, 102, 194, 0.15);
        color: #0a66c2;
        border: 1px solid rgba(10, 102, 194, 0.3);
      }

      .icon-github {
        background: var(--color-bg-primary);
        color: var(--color-text-primary);
        border: 1px solid var(--color-border);
      }

      .channel-meta {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }

      .channel-label-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .channel-name {
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-text-primary);
      }

      .channel-action {
        font-size: 0.78rem;
        font-weight: 600;
        font-family: var(--font-mono);
        color: var(--color-accent);
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }

      .channel-val {
        font-size: 0.88rem;
        color: var(--color-text-secondary);
        font-family: var(--font-mono);
      }

      .location-card {
        padding: 1.25rem 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 1rem;
        border-left: 3px solid var(--color-accent);
      }

      .loc-icon {
        font-size: 1.5rem;
        color: var(--color-accent);
      }

      .loc-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.2rem;
      }

      .loc-text {
        font-size: 0.85rem;
        color: var(--color-text-secondary);
        margin: 0;
      }

      /* Right Column: Form Card */
      .form-card {
        padding: 2.5rem;
        border-radius: var(--radius-lg);
      }

      .form-header {
        margin-bottom: 2rem;
      }

      .form-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.35rem;
      }

      .form-subtitle {
        font-size: 0.95rem;
        color: var(--color-text-secondary);
        margin: 0;
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.35rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
      }

      .form-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-text-primary);
      }

      .required {
        color: #ff5f56;
      }

      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }

      .input-icon {
        position: absolute;
        left: 1rem;
        color: var(--color-text-muted);
        font-size: 1.1rem;
        pointer-events: none;
      }

      .form-input,
      .form-textarea {
        width: 100%;
        background: var(--input-bg);
        border: 1.5px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 0.85rem 1rem 0.85rem 2.85rem;
        font-family: inherit;
        font-size: 0.95rem;
        color: var(--color-text-primary);
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .form-textarea {
        padding: 0.85rem 1rem;
        resize: vertical;
        min-height: 120px;
      }

      .form-input:focus,
      .form-textarea:focus {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px var(--color-accent-subtle);
      }

      .input-wrapper.has-error .form-input,
      .input-wrapper.has-error .form-textarea {
        border-color: #ff5f56;
      }

      .error-msg {
        font-size: 0.8rem;
        color: #ff5f56;
        font-family: var(--font-mono);
      }

      .submit-btn {
        width: 100%;
        padding: 1rem;
        font-size: 1.05rem;
        margin-top: 0.5rem;
      }

      .spinner-border {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Alert Box */
      .alert-box {
        padding: 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1.5rem;
      }

      .alert-success {
        background: rgba(39, 201, 63, 0.12);
        border: 1px solid rgba(39, 201, 63, 0.3);
      }

      .alert-error {
        background: rgba(255, 95, 86, 0.12);
        border: 1px solid rgba(255, 95, 86, 0.3);
      }

      .alert-icon {
        font-size: 1.5rem;
      }

      .alert-success .alert-icon {
        color: #27c93f;
      }

      .alert-error .alert-icon {
        color: #ff5f56;
      }

      .alert-heading {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.35rem;
      }

      .alert-desc {
        font-size: 0.95rem;
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin-bottom: 0.75rem;
      }

      .integration-notice {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        font-size: 0.82rem;
        color: var(--color-text-muted);
        background: var(--color-bg-primary);
        padding: 0.75rem 1rem;
        border-radius: var(--radius-sm);
        margin-bottom: 1rem;
        border: 1px dashed var(--color-border);
      }

      .integration-notice i {
        color: var(--color-accent);
        margin-top: 0.1rem;
      }

      .integration-notice code {
        font-family: var(--font-mono);
        color: var(--color-accent);
      }

      .reset-btn {
        margin-top: 0.5rem;
      }
    `,
  ],
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  readonly personalData = PERSONAL_DATA;

  readonly isLoading = signal<boolean>(false);
  readonly submissionState = signal<'idle' | 'success' | 'error'>('idle');
  readonly submittedName = signal<string>('');

  readonly contactForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(15)]],
  });

  isInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.submissionState.set('idle');

    const formValues = this.contactForm.value;

    // Simulate reliable client-side submission with clear feedback
    setTimeout(() => {
      this.isLoading.set(false);
      this.submittedName.set(formValues.fullName);
      this.submissionState.set('success');
    }, 1200);
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submissionState.set('idle');
  }
}
