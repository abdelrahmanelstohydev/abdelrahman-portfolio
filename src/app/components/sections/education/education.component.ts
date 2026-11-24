import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { EDUCATION_DATA } from '../../../data/portfolio-data';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, RevealOnScrollDirective],
  template: `
    <section id="education" class="section-wrapper education-section">
      <div class="container">
        <!-- Section Title -->
        <app-section-title
          badge="Academic Background"
          title="My"
          highlight="Education"
          subtitle="Theoretical foundations and computer science fundamentals"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
        ></app-section-title>

        <!-- Vertical Animated Timeline -->
        <div class="timeline-container">
          <div class="timeline-track"></div>

          <!-- Mansoura University Main Education Node -->
          <div class="timeline-item" appRevealOnScroll [revealAnimation]="'fade-up'">
            <!-- Timeline Pin & Node -->
            <div class="timeline-marker">
              <div class="marker-pulse"></div>
              <div class="marker-core">
                <i class="bi bi-mortarboard-fill"></i>
              </div>
            </div>

            <!-- Content Card -->
            <div class="timeline-card glass-card">
              <!-- Top Header Meta -->
              <div class="card-meta">
                <div class="period-badge">
                  <i class="bi bi-calendar3"></i>
                  <span>{{ education.startYear }} — {{ education.expectedGraduation }}</span>
                </div>
                <div class="status-badge">
                  <span class="active-dot"></span>
                  <span>{{ education.status }}</span>
                </div>
              </div>

              <!-- Institution & Degree -->
              <h3 class="institution-name">{{ education.institution }}</h3>
              <div class="degree-title">
                <span class="degree-name">{{ education.degree }}</span>
                <span class="field-name">in {{ education.fieldOfStudy }}</span>
              </div>
              <p class="faculty-name">{{ education.faculty }}</p>

              <!-- Description -->
              <p class="edu-description">
                {{ education.description }}
              </p>

              <!-- Relevant Coursework Grid -->
              <div class="coursework-section">
                <div class="section-subheading">
                  <i class="bi bi-journal-code"></i>
                  <span>Relevant Coursework:</span>
                </div>
                <div class="coursework-tags">
                  @for (course of education.coursework; track course) {
                    <span class="tech-tag">{{ course }}</span>
                  }
                </div>
              </div>

              <!-- Academic Achievements -->
              <div class="achievements-section">
                <div class="section-subheading">
                  <i class="bi bi-award-fill"></i>
                  <span>Training:</span>
                </div>
                <ul class="achievements-list">
                  @for (ach of education.achievements; track ach) {
                    <li>
                      <i class="bi bi-check2-circle"></i>
                      <span>{{ ach }}</span>
                    </li>
                  }
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      .education-section {
        position: relative;
      }

      .timeline-container {
        position: relative;
        max-width: 900px;
        margin: 0 auto;
        padding-left: 2rem;
      }

      @media (min-width: 768px) {
        .timeline-container {
          padding-left: 3rem;
        }
      }

      .timeline-track {
        position: absolute;
        top: 20px;
        bottom: 20px;
        left: 8px;
        width: 3px;
        background: linear-gradient(180deg, var(--color-accent) 0%, var(--color-bg-secondary) 100%);
        border-radius: 2px;
        box-shadow: 0 0 10px var(--color-accent-glow);
      }

      @media (min-width: 768px) {
        .timeline-track {
          left: 15px;
        }
      }

      .timeline-item {
        position: relative;
      }

      .timeline-marker {
        position: absolute;
        left: -2rem;
        top: 2rem;
        transform: translate(-50%, 0);
        z-index: 5;
      }

      @media (min-width: 768px) {
        .timeline-marker {
          left: -3rem;
        }
      }

      .marker-core {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-bg-secondary) 100%);
        color: #f4f0e2;
        border: 3px solid var(--color-bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        box-shadow: 0 0 16px var(--color-accent-glow);
        position: relative;
        z-index: 2;
      }

      .marker-pulse {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        background: var(--color-accent);
        opacity: 0.3;
        animation: pulseRing 2.5s infinite ease-out;
      }

      @keyframes pulseRing {
        0% {
          transform: scale(0.9);
          opacity: 0.4;
        }
        70% {
          transform: scale(1.4);
          opacity: 0;
        }
        100% {
          transform: scale(1.4);
          opacity: 0;
        }
      }

      .timeline-card {
        padding: 2.25rem;
        border-radius: var(--radius-lg);
      }

      .card-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.25rem;
      }

      .period-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--font-mono);
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-accent);
        background: var(--color-accent-subtle);
        padding: 0.35rem 0.85rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--color-border);
      }

      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
        font-weight: 600;
        color: #27c93f;
        background: rgba(39, 201, 63, 0.12);
        padding: 0.35rem 0.8rem;
        border-radius: var(--radius-full);
        border: 1px solid rgba(39, 201, 63, 0.25);
      }

      .active-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #27c93f;
        box-shadow: 0 0 6px #27c93f;
        animation: activePulse 2s infinite ease-in-out;
      }

      @keyframes activePulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }

      .institution-name {
        font-size: 1.85rem;
        font-weight: 800;
        color: var(--color-text-primary);
        margin-bottom: 0.35rem;
      }

      .degree-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.4rem;
        font-size: 1.15rem;
        font-weight: 600;
        color: var(--color-accent);
        margin-bottom: 0.25rem;
      }

      .faculty-name {
        font-size: 0.95rem;
        color: var(--color-text-muted);
        font-family: var(--font-mono);
        margin-bottom: 1.5rem;
      }

      .edu-description {
        font-size: 1.05rem;
        line-height: 1.75;
        color: var(--color-text-secondary);
        margin-bottom: 2rem;
      }

      .coursework-section,
      .achievements-section {
        margin-bottom: 1.75rem;
      }

      .section-subheading {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.65rem;
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.85rem;
      }

      .section-subheading i {
        color: var(--color-accent);
      }

      .coursework-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .achievements-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
      }

      .achievements-list li {
        display: flex;
        align-items: flex-start;
        gap: 0.65rem;
        font-size: 0.95rem;
        color: var(--color-text-secondary);
      }

      .achievements-list li i {
        color: var(--color-accent);
        font-size: 1.1rem;
        margin-top: 0.1rem;
      }

      .notice-footer {
        padding: 0.85rem 1.25rem;
        background: var(--color-bg-primary);
        border: 1px dashed var(--color-border);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.82rem;
        color: var(--color-text-muted);
      }

      .notice-footer code {
        font-family: var(--font-mono);
        color: var(--color-accent);
        background: var(--color-accent-subtle);
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
      }
    `,
  ],
})
export class EducationComponent {
  readonly education = EDUCATION_DATA;
}
