import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header" [class.text-center]="centered">
      @if (badge) {
        <div class="header-badge">
          <span class="pulsing-dot"></span>
          <span>{{ badge }}</span>
        </div>
      }
      <h2 class="main-title">
        {{ title }}
        <span class="title-highlight">{{ highlight }}</span>
      </h2>
      @if (subtitle) {
        <p class="subtitle">{{ subtitle }}</p>
      }
      <div class="header-divider" [class.mx-auto]="centered"></div>
    </div>
  `,
  styles: [
    `
      .section-header {
        margin-bottom: 3.5rem;
        position: relative;
      }

      .text-center {
        text-align: center;
      }

      .header-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.95rem;
        border-radius: var(--radius-full);
        background: var(--color-accent-subtle);
        border: 1px solid var(--color-border);
        color: var(--color-accent);
        font-family: var(--font-mono);
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-bottom: 1rem;
      }

      .pulsing-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: var(--color-accent);
        box-shadow: 0 0 8px var(--color-accent);
        animation: pulse 2s infinite ease-in-out;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.4);
          opacity: 0.5;
        }
      }

      .main-title {
        font-size: 2.2rem;
        font-weight: 800;
        color: var(--color-text-primary);
        letter-spacing: -0.025em;
        margin-bottom: 0.75rem;
      }

      @media (min-width: 768px) {
        .main-title {
          font-size: 2.75rem;
        }
      }

      .title-highlight {
        color: var(--color-accent);
        position: relative;
      }

      .subtitle {
        color: var(--color-text-secondary);
        font-size: 1.1rem;
        max-width: 650px;
        margin: 0 auto 1.5rem auto;
      }

      .header-divider {
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, var(--color-accent) 0%, transparent 100%);
        border-radius: 2px;
      }

      .mx-auto {
        margin-left: auto;
        margin-right: auto;
        background: linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%);
      }
    `,
  ],
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input() highlight = '';
  @Input() subtitle?: string;
  @Input() badge?: string;
  @Input() centered = true;
}
