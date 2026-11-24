import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { EXPERIENCE_DATA } from '../../../data/portfolio-data';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, RevealOnScrollDirective],
  template: `
    <section id="experience" class="section-wrapper experience-section">
      <div class="container">
        <!-- Section Title -->
        <app-section-title
          badge="Technical Training"
          title="Technical"
          highlight="Training"
          subtitle="MEAN Stack training and practical team-based learning"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
        ></app-section-title>

        <!-- Experience Timeline -->
        <div class="experience-timeline">
          @for (item of experiences; track item.id; let i = $index) {
            <div
              class="exp-item"
              appRevealOnScroll
              [revealAnimation]="i % 2 === 0 ? 'fade-right' : 'fade-left'"
              [revealDelay]="i * 120"
            >
              <div class="exp-marker">
                <div class="exp-dot"></div>
                <div class="exp-line"></div>
              </div>

              <div class="exp-card glass-card">
                <div class="exp-header">
                  <div>
                    <h3 class="exp-title">{{ item.title }}</h3>
                    <div class="exp-company-group">
                      <span class="exp-company">{{ item.company }}</span>
                      <span class="exp-bullet">&bull;</span>
                      <span class="exp-type">{{ item.employmentType }}</span>
                      <span class="exp-bullet">&bull;</span>
                      <span class="exp-location">{{ item.location }}</span>
                    </div>
                  </div>
                  <div class="exp-period-badge">
                    <i class="bi bi-clock-history"></i>
                    <span>{{ item.period }}</span>
                  </div>
                </div>

                <p class="exp-description">{{ item.description }}</p>

                <div class="responsibilities-group">
                  <h5 class="resp-heading">Key Engineering Highlights:</h5>
                  <ul class="resp-list">
                    @for (resp of item.responsibilities; track resp) {
                      <li>
                        <i class="bi bi-arrow-right-short"></i>
                        <span>{{ resp }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <div class="tech-stack-row">
                  <span class="tech-label">Stack:</span>
                  <div class="tech-pills">
                    @for (tech of item.technologies; track tech) {
                      <span class="tech-tag">{{ tech }}</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      .experience-section {
        position: relative;
      }

      .placeholder-info-banner {
        max-width: 900px;
        margin: 0 auto 3rem auto;
        padding: 1.5rem;
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;
        border-left: 4px solid var(--color-accent);
      }

      .banner-icon {
        width: 44px;
        height: 44px;
        min-width: 44px;
        border-radius: 12px;
        background: var(--color-accent-subtle);
        color: var(--color-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.35rem;
      }

      .banner-title-line {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.35rem;
      }

      .banner-title {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--color-text-primary);
      }

      .banner-desc {
        font-size: 0.92rem;
        line-height: 1.6;
        color: var(--color-text-secondary);
        margin: 0;
      }

      .banner-desc code {
        font-family: var(--font-mono);
        color: var(--color-accent);
        background: var(--color-accent-subtle);
        padding: 0.1rem 0.35rem;
        border-radius: 4px;
      }

      /* Experience Timeline */
      .experience-timeline {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: relative;
        padding-left: 2rem;
      }

      @media (min-width: 768px) {
        .experience-timeline {
          padding-left: 2.5rem;
        }
      }

      .exp-item {
        position: relative;
      }

      .exp-marker {
        position: absolute;
        left: -2rem;
        top: 1.75rem;
        bottom: -2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      @media (min-width: 768px) {
        .exp-marker {
          left: -2.5rem;
        }
      }

      .exp-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: var(--color-accent);
        box-shadow: 0 0 10px var(--color-accent);
        z-index: 2;
        border: 2px solid var(--color-bg-primary);
      }

      .exp-line {
        width: 2px;
        flex: 1;
        background: var(--color-border);
        margin-top: 4px;
      }

      .exp-card {
        padding: 2rem;
        border-radius: var(--radius-lg);
      }

      .exp-header {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
      }

      @media (min-width: 640px) {
        .exp-header {
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
        }
      }

      .exp-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.25rem;
      }

      .exp-company-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--color-text-muted);
      }

      .exp-company {
        color: var(--color-accent);
        font-weight: 600;
      }

      .exp-period-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-family: var(--font-mono);
        font-size: 0.82rem;
        color: var(--color-text-secondary);
        background: var(--color-bg-primary);
        border: 1px solid var(--color-border);
        padding: 0.35rem 0.8rem;
        border-radius: var(--radius-full);
        white-space: nowrap;
        width: fit-content;
      }

      .exp-description {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--color-text-secondary);
        margin-bottom: 1.25rem;
      }

      .responsibilities-group {
        margin-bottom: 1.5rem;
      }

      .resp-heading {
        font-size: 0.92rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
      }

      .resp-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }

      .resp-list li {
        display: flex;
        align-items: flex-start;
        gap: 0.4rem;
        font-size: 0.92rem;
        color: var(--color-text-secondary);
      }

      .resp-list li i {
        color: var(--color-accent);
        font-size: 1.15rem;
      }

      .tech-stack-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding-top: 1rem;
        border-top: 1px solid var(--color-border);
      }

      .tech-label {
        font-size: 0.82rem;
        font-family: var(--font-mono);
        font-weight: 600;
        color: var(--color-text-muted);
        text-transform: uppercase;
      }

      .tech-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    `,
  ],
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCE_DATA;
}
