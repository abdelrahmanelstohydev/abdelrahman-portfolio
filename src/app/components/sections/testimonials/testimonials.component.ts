import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { TESTIMONIALS_DATA } from '../../../data/portfolio-data';
import { TestimonialItem } from '../../../models/portfolio.model';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, RevealOnScrollDirective],
  template: `
    <section id="testimonials" class="section-wrapper testimonials-section">
      <div class="container">
        <!-- Section Title -->
        <app-section-title
          badge="Peer Recommendations"
          title="What People"
          highlight="Say"
          subtitle="Feedback &amp; Testimonials"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
        ></app-section-title>

        <!-- Sample Disclaimer Banner -->
        <div class="sample-banner glass-card" appRevealOnScroll [revealAnimation]="'fade-up'">
          <div class="sample-badge-wrap">
            <span class="badge-placeholder">Sample Content</span>
          </div>
          <p class="sample-text">
            These testimonials are academic-inspired sample placeholders demonstrating layout, card responsiveness, and rating presentation until actual client or supervisor recommendations are provided.
          </p>
        </div>

        <!-- Carousel Container -->
        <div
          class="carousel-wrapper"
          (mouseenter)="pauseAutoplay()"
          (mouseleave)="resumeAutoplay()"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
          [revealDelay]="100"
        >
          <!-- Active Card Viewport -->
          <div class="carousel-track">
            @for (item of testimonials; track item.id; let i = $index) {
              <div
                class="carousel-slide"
                [class.active]="currentIndex() === i"
                [class.prev]="currentIndex() > i"
                [class.next]="currentIndex() < i"
              >
                <div class="testimonial-card glass-card">
                  <!-- Decorative quote mark -->
                  <div class="quote-watermark">
                    <i class="bi bi-quote"></i>
                  </div>

                  <!-- Star Rating -->
                  <div class="star-rating" [attr.aria-label]="item.rating + ' out of 5 stars'">
                    @for (star of [1, 2, 3, 4, 5]; track star) {
                      <i class="bi bi-star-fill star-icon"></i>
                    }
                  </div>

                  <!-- Feedback quote -->
                  <p class="feedback-text">
                    "{{ item.feedback }}"
                  </p>

                  <!-- Author Row -->
                  <div class="author-row">
                    <img
                      [src]="item.avatar"
                      [alt]="item.name + ' Avatar'"
                      class="author-avatar"
                      loading="lazy"
                    />
                    <div class="author-info">
                      <h4 class="author-name">{{ item.name }}</h4>
                      <span class="author-role">{{ item.role }}</span>
                      <span class="author-org">{{ item.organization }}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Carousel Controls: Prev / Next Buttons & Pagination Dots -->
          <div class="carousel-controls">
            <button
              class="nav-btn prev-btn"
              (click)="prevSlide()"
              aria-label="Previous testimonial"
              title="Previous testimonial"
            >
              <i class="bi bi-chevron-left"></i>
            </button>

            <!-- Pagination Dots -->
            <div class="dots-group" role="tablist">
              @for (item of testimonials; track item.id; let i = $index) {
                <button
                  class="dot-btn"
                  [class.active]="currentIndex() === i"
                  (click)="goToSlide(i)"
                  [attr.aria-label]="'Go to slide ' + (i + 1)"
                ></button>
              }
            </div>

            <button
              class="nav-btn next-btn"
              (click)="nextSlide()"
              aria-label="Next testimonial"
              title="Next testimonial"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      .testimonials-section {
        position: relative;
      }

      .sample-banner {
        max-width: 780px;
        margin: 0 auto 3rem auto;
        padding: 1.25rem 1.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.5rem;
        border-top: 3px solid #ffbd2e;
      }

      @media (min-width: 640px) {
        .sample-banner {
          flex-direction: row;
          text-align: left;
        }
      }

      .sample-text {
        font-size: 0.88rem;
        color: var(--color-text-secondary);
        margin: 0;
      }

      /* Carousel Wrapper */
      .carousel-wrapper {
        max-width: 820px;
        margin: 0 auto;
        position: relative;
      }

      .carousel-track {
        position: relative;
        min-height: 380px;
      }

      @media (min-width: 768px) {
        .carousel-track {
          min-height: 340px;
        }
      }

      .carousel-slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        pointer-events: none;
        transform: scale(0.95) translateX(30px);
        transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .carousel-slide.active {
        opacity: 1;
        pointer-events: auto;
        transform: scale(1) translateX(0);
        position: relative;
      }

      .testimonial-card {
        padding: 2.75rem;
        border-radius: var(--radius-lg);
        position: relative;
        overflow: hidden;
      }

      .quote-watermark {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        font-size: 6rem;
        color: var(--color-accent);
        opacity: 0.08;
        line-height: 1;
        pointer-events: none;
      }

      .star-rating {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        margin-bottom: 1.5rem;
      }

      .star-icon {
        color: #ffbd2e;
        font-size: 1.15rem;
      }

      .feedback-text {
        font-size: 1.15rem;
        line-height: 1.8;
        color: var(--color-text-primary);
        font-style: italic;
        margin-bottom: 2rem;
        position: relative;
        z-index: 2;
      }

      .author-row {
        display: flex;
        align-items: center;
        gap: 1.25rem;
      }

      .author-avatar {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        border: 2px solid var(--color-accent);
        box-shadow: 0 4px 14px var(--color-accent-glow);
      }

      .author-name {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-text-primary);
        line-height: 1.2;
      }

      .author-role {
        font-size: 0.88rem;
        color: var(--color-accent);
        font-weight: 600;
        display: block;
      }

      .author-org {
        font-size: 0.82rem;
        color: var(--color-text-muted);
        font-family: var(--font-mono);
      }

      /* Controls */
      .carousel-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2rem;
      }

      .nav-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--color-glass-card);
        border: 1px solid var(--color-border);
        color: var(--color-text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        cursor: pointer;
        transition: var(--transition-smooth);
      }

      .nav-btn:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
        background: var(--color-accent-subtle);
        transform: scale(1.08);
      }

      .dots-group {
        display: flex;
        align-items: center;
        gap: 0.65rem;
      }

      .dot-btn {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--color-border);
        border: none;
        cursor: pointer;
        transition: width 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease;
      }

      .dot-btn.active {
        width: 28px;
        border-radius: 6px;
        background: var(--color-accent);
        box-shadow: 0 0 10px var(--color-accent);
      }
    `,
  ],
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  readonly testimonials = TESTIMONIALS_DATA;
  readonly currentIndex = signal<number>(0);
  private platformId = inject(PLATFORM_ID);
  private autoplayInterval?: any;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  private startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 6500);
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  nextSlide(): void {
    this.currentIndex.update((idx) => (idx + 1) % this.testimonials.length);
  }

  prevSlide(): void {
    this.currentIndex.update(
      (idx) => (idx - 1 + this.testimonials.length) % this.testimonials.length
    );
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }
}
