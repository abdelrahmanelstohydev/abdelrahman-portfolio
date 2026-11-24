import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PERSONAL_DATA } from '../../../data/portfolio-data';
import { ScrollService } from '../../../core/services/scroll.service';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  template: `
    <section id="home" class="hero-section">
      <div class="container hero-container">
        <!-- Two Column Layout: Left (Profile), Right (Content) -->
        <div class="hero-grid">
          
          <!-- LEFT SIDE: Profile Photo & Floating Elements -->
          <div class="hero-visual" appRevealOnScroll [revealAnimation]="'fade-right'">
            <div class="visual-wrapper">
              <!-- Glowing ambient backlights -->
              <div class="glow-backdrop"></div>
              <div class="glow-ring"></div>

              <!-- Main Photo Frame with floating animation -->
              <div class="photo-frame">
                <img
                  [src]="personalData.profileImage"
                  [alt]="personalData.name + ' - Profile Photo'"
                  class="profile-img"
                  loading="eager"
                  (error)="onImageError($event)"
                />
              </div>

              <!-- Decorative Floating Badges -->
              <div class="floating-badge badge-csharp">
                <i class="bi bi-filetype-cs"></i>
                <span>Node.js</span>
              </div>

              <div class="floating-badge badge-angular">
                <i class="bi bi-triangle-half"></i>
                <span>Angular</span>
              </div>

              <div class="floating-badge badge-sql">
                <i class="bi bi-database-fill"></i>
                <span>MongoDB</span>
              </div>

              <div class="floating-badge badge-cs-student">
                <i class="bi bi-mortarboard-fill"></i>
                <span>Mansoura CS</span>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE: Information, Typing Animation, CTAs -->
          <div class="hero-content" appRevealOnScroll [revealAnimation]="'fade-left'" [revealDelay]="150">
            <!-- Introductory Label -->
            <div class="intro-label">
              <span class="pulse-indicator"></span>
              <span>HELLO, I'M</span>
            </div>

            <!-- Main Heading -->
            <h1 class="hero-title">{{ personalData.name }}</h1>

            <!-- Dynamic Animated Professional Title -->
            <div class="typewriter-container" aria-live="polite">
              <span class="typewriter-prefix">A passionate </span>
              <span class="typewriter-text">{{ currentTitle() }}</span>
              <span class="cursor-blink">|</span>
            </div>

            <!-- Bio -->
            <p class="hero-bio">
              {{ personalData.bio }}
            </p>

            <!-- Primary Action Buttons -->
            <div class="hero-cta-group">
              <button
                class="btn btn-primary"
                (click)="scrollService.scrollTo('projects')"
              >
                <span>View My Projects</span>
                <i class="bi bi-arrow-right"></i>
              </button>

              <button
                class="btn btn-outline"
                (click)="scrollService.scrollTo('contact')"
              >
                <i class="bi bi-chat-dots"></i>
                <span>Hire Me</span>
              </button>
            </div>

            <!-- Social Media Buttons -->
            <div class="hero-socials">
              <span class="socials-label">Connect with me:</span>
              <div class="social-links">
                <a
                  [href]="personalData.linkedinUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-btn"
                  title="Connect on LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <i class="bi bi-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
                <a
                  [href]="personalData.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-btn"
                  title="Explore GitHub Repositories"
                  aria-label="GitHub Profile"
                >
                  <i class="bi bi-github"></i>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- Subtle Scroll Down Indicator -->
        <div class="scroll-indicator" (click)="scrollService.scrollTo('about')" role="button" tabindex="0">
          <div class="mouse-icon">
            <div class="mouse-wheel"></div>
          </div>
          <span class="scroll-label">Scroll to explore</span>
          <i class="bi bi-chevron-down arrow-down"></i>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        padding-top: calc(var(--navbar-height) + 2rem);
        padding-bottom: 4rem;
        z-index: 2;
      }

      .hero-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100vh - var(--navbar-height) - 4rem);
      }

      .hero-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3.5rem;
        align-items: center;
      }

      @media (min-width: 992px) {
        .hero-grid {
          grid-template-columns: 1fr 1.25fr;
          gap: 4.5rem;
        }
      }

      /* ---------------------------------------------------------------------
         LEFT SIDE: PHOTO & FLOATING BADGES
         --------------------------------------------------------------------- */
      .hero-visual {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .visual-wrapper {
        position: relative;
        width: 300px;
        height: 300px;
      }

      @media (min-width: 540px) {
        .visual-wrapper {
          width: 360px;
          height: 360px;
        }
      }

      @media (min-width: 1200px) {
        .visual-wrapper {
          width: 400px;
          height: 400px;
        }
      }

      .glow-backdrop {
        position: absolute;
        inset: -20px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
        opacity: 0.35;
        filter: blur(35px);
        animation: pulseGlow 5s infinite alternate ease-in-out;
      }

      .glow-ring {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 2px dashed var(--color-accent);
        opacity: 0.45;
        animation: spinSlow 35s infinite linear;
      }

      .photo-frame {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 8px;
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-bg-secondary) 100%);
        box-shadow: 0 15px 45px var(--color-shadow);
        animation: subtleFloat 6s infinite alternate ease-in-out;
        overflow: hidden;
        position: relative;
        z-index: 2;
      }

      .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        background: var(--color-card-bg);
      }

      /* Floating badges */
      .floating-badge {
        position: absolute;
        z-index: 4;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.55rem 0.95rem;
        background: var(--color-glass-card);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-full);
        box-shadow: 0 8px 24px var(--color-shadow);
        font-family: var(--font-mono);
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-text-primary);
        white-space: nowrap;
        animation: floatBadge 5s infinite alternate ease-in-out;
      }

      .floating-badge i {
        font-size: 1.05rem;
        color: var(--color-accent);
      }

      .badge-csharp {
        top: 8%;
        right: -8%;
        animation-delay: 0s;
      }

      .badge-angular {
        bottom: 12%;
        right: -6%;
        animation-delay: -1.5s;
      }

      .badge-sql {
        bottom: 5%;
        left: -4%;
        animation-delay: -3s;
      }

      .badge-cs-student {
        top: 10%;
        left: -10%;
        animation-delay: -2s;
      }

      @keyframes subtleFloat {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-12px);
        }
      }

      @keyframes floatBadge {
        0% {
          transform: translateY(0) scale(1);
        }
        100% {
          transform: translateY(-8px) scale(1.03);
        }
      }

      @keyframes pulseGlow {
        0% {
          opacity: 0.25;
          transform: scale(0.95);
        }
        100% {
          opacity: 0.5;
          transform: scale(1.05);
        }
      }

      @keyframes spinSlow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      /* ---------------------------------------------------------------------
         RIGHT SIDE: CONTENT
         --------------------------------------------------------------------- */
      .hero-content {
        display: flex;
        flex-direction: column;
      }

      .intro-label {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.4rem 1rem;
        background: var(--color-accent-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-full);
        color: var(--color-accent);
        font-family: var(--font-mono);
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        width: fit-content;
        margin-bottom: 1.25rem;
      }

      .pulse-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--color-accent);
        box-shadow: 0 0 10px var(--color-accent);
        animation: pulseDot 2s infinite ease-in-out;
      }

      @keyframes pulseDot {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.4;
          transform: scale(1.3);
        }
      }

      .hero-title {
        font-size: 2.75rem;
        font-weight: 800;
        color: var(--color-text-primary);
        letter-spacing: -0.03em;
        line-height: 1.15;
        margin-bottom: 0.75rem;
      }

      @media (min-width: 768px) {
        .hero-title {
          font-size: 3.75rem;
        }
      }

      @media (min-width: 1200px) {
        .hero-title {
          font-size: 4.25rem;
        }
      }

      /* Typewriter */
      .typewriter-container {
        font-size: 1.35rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.45rem;
      }

      @media (min-width: 768px) {
        .typewriter-container {
          font-size: 1.75rem;
        }
      }

      .typewriter-prefix {
        color: var(--color-text-secondary);
      }

      .typewriter-text {
        color: var(--color-accent);
        font-weight: 700;
        border-bottom: 2px solid var(--color-border);
        padding-bottom: 2px;
      }

      .cursor-blink {
        color: var(--color-accent);
        font-weight: 400;
        animation: blink 1s infinite;
      }

      @keyframes blink {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
      }

      .hero-bio {
        font-size: 1.08rem;
        line-height: 1.8;
        color: var(--color-text-secondary);
        margin-bottom: 2.25rem;
        max-width: 620px;
      }

      .hero-cta-group {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 2.5rem;
      }

      .hero-socials {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .socials-label {
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-text-muted);
        font-family: var(--font-mono);
      }

      .social-links {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .social-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-full);
        background: var(--color-glass-card);
        border: 1px solid var(--color-border);
        color: var(--color-text-primary);
        font-size: 0.88rem;
        font-weight: 600;
        transition: var(--transition-smooth);
      }

      .social-btn i {
        font-size: 1.05rem;
        color: var(--color-accent);
      }

      .social-btn:hover {
        border-color: var(--color-accent);
        background: var(--color-accent-subtle);
        transform: translateY(-2px);
        color: var(--color-accent);
      }

      /* Scroll Indicator */
      .scroll-indicator {
        margin-top: 3.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        opacity: 0.75;
        transition: opacity 0.3s ease, transform 0.3s ease;
        align-self: center;
      }

      .scroll-indicator:hover {
        opacity: 1;
        transform: translateY(3px);
      }

      .mouse-icon {
        width: 22px;
        height: 36px;
        border: 2px solid var(--color-text-muted);
        border-radius: 12px;
        position: relative;
        display: flex;
        justify-content: center;
      }

      .mouse-wheel {
        width: 3px;
        height: 6px;
        background-color: var(--color-accent);
        border-radius: 2px;
        position: absolute;
        top: 6px;
        animation: wheelScroll 2s infinite;
      }

      @keyframes wheelScroll {
        0% {
          transform: translateY(0);
          opacity: 1;
        }
        80% {
          transform: translateY(14px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 0;
        }
      }

      .scroll-label {
        font-size: 0.75rem;
        font-family: var(--font-mono);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-text-muted);
      }

      .arrow-down {
        font-size: 0.9rem;
        color: var(--color-accent);
        animation: arrowBounce 1.5s infinite;
      }

      @keyframes arrowBounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(4px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .photo-frame,
        .floating-badge,
        .glow-ring,
        .glow-backdrop,
        .cursor-blink,
        .mouse-wheel,
        .arrow-down {
          animation: none !important;
        }
      }
    `,
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly scrollService = inject(ScrollService);
  readonly personalData = PERSONAL_DATA;
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentTitle = signal<string>('Backend Developer');

  private titleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typeTimeout?: any;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingAnimation();
    }
  }

  ngOnDestroy(): void {
    if (this.typeTimeout) {
      clearTimeout(this.typeTimeout);
    }
  }

  private startTypingAnimation(): void {
    const titles = this.personalData.roleTitles;
    const currentFullTitle = titles[this.titleIndex];

    if (this.isDeleting) {
      this.charIndex--;
      this.currentTitle.set(currentFullTitle.substring(0, this.charIndex));
    } else {
      this.charIndex++;
      this.currentTitle.set(currentFullTitle.substring(0, this.charIndex));
    }

    let typeSpeed = this.isDeleting ? 45 : 90;

    if (!this.isDeleting && this.charIndex === currentFullTitle.length) {
      // Pause at end of word
      typeSpeed = 2200;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.titleIndex = (this.titleIndex + 1) % titles.length;
      typeSpeed = 400;
    }

    this.typeTimeout = setTimeout(() => this.startTypingAnimation(), typeSpeed);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    // Fallback to SVG placeholder if needed
    target.src = 'assets/images/profile.svg';
  }
}
