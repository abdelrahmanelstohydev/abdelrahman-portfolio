import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { PERSONAL_DATA, ABOUT_CARDS, STATS_DATA } from '../../../data/portfolio-data';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, RevealOnScrollDirective],
  template: `
    <section id="about" class="section-wrapper about-section">
      <div class="container">
        <!-- Section Title -->
        <app-section-title
          badge="Background &amp; Philosophy"
          title="About"
          highlight="Me"
          subtitle="Get to Know Me"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
        ></app-section-title>

        <!-- Narrative Content Area -->
        <div class="about-grid">
          <div class="about-story glass-card" appRevealOnScroll [revealAnimation]="'fade-right'">
            <div class="story-header">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="terminal-file">abdelrahman_elstohy.profile.ts</span>
            </div>

            <div class="story-body">
              <p class="story-lead">
                {{ personalData.aboutIntro }}
              </p>
              <p>
                {{ personalData.aboutSecondary }}
              </p>
              <blockquote class="story-quote">
                <i class="bi bi-quote quote-icon"></i>
                <p>
                  {{ personalData.aboutBelief }}
                </p>
              </blockquote>
              <p>
                {{ personalData.aboutConclusion }}
              </p>
            </div>

            <div class="story-footer">
              <div class="badge-tag">
                <i class="bi bi-mortarboard-fill"></i>
                <span>{{ personalData.university }} &bull; {{ personalData.status }}</span>
              </div>
            </div>
          </div>

          <!-- 3 Information Cards -->
          <div class="cards-column">
            @for (card of aboutCards; track card.title; let i = $index) {
              <div
                class="info-card glass-card"
                appRevealOnScroll
                [revealAnimation]="'fade-left'"
                [revealDelay]="i * 120"
              >
                <div class="card-icon-box">
                  <i class="bi" [ngClass]="card.icon"></i>
                </div>
                <div class="card-details">
                  <div class="card-header-line">
                    <h3 class="card-title">{{ card.title }}</h3>
                    <span class="card-badge">{{ card.badge }}</span>
                  </div>
                  <span class="card-subtitle">{{ card.subtitle }}</span>
                  <p class="card-description">{{ card.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Highlights -->
        <div class="stats-grid" appRevealOnScroll [revealAnimation]="'fade-up'" [revealDelay]="200">
          @for (stat of stats; track stat.id) {
            <div class="stat-card glass-card">
              <div class="stat-header">
                <div class="stat-icon-wrapper">
                  <i class="bi" [ngClass]="stat.icon"></i>
                </div>
                @if (stat.isPlaceholder) {
                  <span class="badge-placeholder">Editable Placeholder</span>
                }
              </div>
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <p class="stat-description">{{ stat.description }}</p>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      .about-section {
        position: relative;
      }

      .about-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
        margin-bottom: 3.5rem;
      }

      @media (min-width: 992px) {
        .about-grid {
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
        }
      }

      /* Story Terminal Card */
      .about-story {
        padding: 0;
        overflow: hidden;
        border-radius: var(--radius-lg);
      }

      .story-header {
        background: var(--color-bg-primary);
        padding: 0.9rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid var(--color-border);
      }

      .terminal-dots {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .dot.red { background-color: #ff5f56; }
      .dot.yellow { background-color: #ffbd2e; }
      .dot.green { background-color: #27c93f; }

      .terminal-file {
        font-family: var(--font-mono);
        font-size: 0.82rem;
        color: var(--color-text-muted);
      }

      .story-body {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .story-lead {
        font-size: 1.15rem;
        font-weight: 500;
        color: var(--color-text-primary);
        line-height: 1.7;
      }

      .story-quote {
        margin: 0.5rem 0;
        padding: 1.25rem 1.5rem 1.25rem 2rem;
        background: var(--color-accent-subtle);
        border-left: 3px solid var(--color-accent);
        border-radius: 0 var(--radius-md) var(--radius-md) 0;
        position: relative;
      }

      .story-quote p {
        color: var(--color-text-primary);
        font-style: italic;
        font-weight: 500;
        margin: 0;
      }

      .quote-icon {
        font-size: 1.6rem;
        color: var(--color-accent);
        opacity: 0.4;
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
      }

      .story-footer {
        padding: 1.25rem 2rem;
        background: var(--color-bg-primary);
        border-top: 1px solid var(--color-border);
      }

      .badge-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-accent);
        font-family: var(--font-mono);
      }

      /* 3 Info Cards Column */
      .cards-column {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .info-card {
        padding: 1.5rem;
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;
      }

      .card-icon-box {
        width: 52px;
        height: 52px;
        min-width: 52px;
        border-radius: var(--radius-md);
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-bg-secondary) 100%);
        color: #f4f0e2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.45rem;
        box-shadow: 0 6px 18px var(--color-accent-glow);
      }

      .card-details {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .card-header-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.2rem;
      }

      .card-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-text-primary);
      }

      .card-badge {
        font-size: 0.72rem;
        font-weight: 600;
        font-family: var(--font-mono);
        text-transform: uppercase;
        padding: 0.15rem 0.55rem;
        border-radius: var(--radius-full);
        background: var(--color-accent-subtle);
        color: var(--color-accent);
      }

      .card-subtitle {
        font-size: 0.84rem;
        font-weight: 500;
        color: var(--color-accent);
        margin-bottom: 0.45rem;
        font-family: var(--font-mono);
      }

      .card-description {
        font-size: 0.94rem;
        line-height: 1.6;
        color: var(--color-text-secondary);
        margin: 0;
      }

      /* Stats Area */
      .stats-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      @media (min-width: 640px) {
        .stats-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .stat-card {
        padding: 1.85rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .stat-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .stat-icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--color-accent-subtle);
        color: var(--color-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.35rem;
        border: 1px solid var(--color-border);
      }

      .stat-number {
        font-size: 2.75rem;
        font-weight: 800;
        color: var(--color-accent);
        line-height: 1;
        letter-spacing: -0.03em;
        margin-bottom: 0.5rem;
        font-family: var(--font-sans);
      }

      .stat-label {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.35rem;
      }

      .stat-description {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        margin: 0;
      }
    `,
  ],
})
export class AboutComponent {
  readonly personalData = PERSONAL_DATA;
  readonly aboutCards = ABOUT_CARDS;
  readonly stats = STATS_DATA;
}
