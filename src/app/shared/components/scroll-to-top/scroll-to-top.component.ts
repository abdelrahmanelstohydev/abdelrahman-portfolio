import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (scrollService.isScrolled()) {
      <button
        class="scroll-top-btn"
        (click)="scrollService.scrollToTop()"
        aria-label="Scroll back to top"
        title="Scroll to top"
      >
        <!-- Circular Progress SVG -->
        <svg class="progress-ring" width="48" height="48" viewBox="0 0 48 48">
          <circle
            class="progress-ring__background"
            cx="24"
            cy="24"
            r="20"
            stroke-width="2.5"
            fill="none"
          />
          <circle
            class="progress-ring__circle"
            cx="24"
            cy="24"
            r="20"
            stroke-width="2.5"
            fill="none"
            [style.stroke-dasharray]="circumference"
            [style.stroke-dashoffset]="dashOffset()"
          />
        </svg>
        <i class="bi bi-arrow-up icon"></i>
      </button>
    }
  `,
  styles: [
    `
      .scroll-top-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--color-glass-card);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid var(--color-border);
        color: var(--color-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        box-shadow: 0 4px 20px var(--color-shadow);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
      }

      .scroll-top-btn:hover {
        transform: translateY(-4px) scale(1.05);
        border-color: var(--color-accent);
        box-shadow: 0 8px 25px var(--color-accent-glow);
        color: var(--color-text-primary);
      }

      .progress-ring {
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(-90deg);
        pointer-events: none;
      }

      .progress-ring__background {
        stroke: var(--color-border);
      }

      .progress-ring__circle {
        stroke: var(--color-accent);
        transition: stroke-dashoffset 0.15s ease-out;
      }

      .icon {
        font-size: 1.25rem;
        position: relative;
        z-index: 2;
        transition: transform 0.2s ease;
      }

      .scroll-top-btn:hover .icon {
        transform: translateY(-2px);
      }
    `,
  ],
})
export class ScrollToTopComponent {
  readonly scrollService = inject(ScrollService);
  readonly radius = 20;
  readonly circumference = 2 * Math.PI * 20;

  dashOffset(): number {
    const progress = this.scrollService.scrollProgress();
    return this.circumference - (progress / 100) * this.circumference;
  }
}
