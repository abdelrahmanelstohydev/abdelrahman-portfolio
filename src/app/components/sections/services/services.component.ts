import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { SERVICES_DATA } from '../../../data/portfolio-data';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, RevealOnScrollDirective],
  template: `
    <section id="services" class="section-wrapper services-section">
      <div class="container">
        <!-- Section Title -->
        <app-section-title
          badge="Technical Focus"
          title="What I’m Learning"
          highlight="For You"
          subtitle="Technologies and areas I’m developing through practice"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
        ></app-section-title>

        <!-- Services Grid -->
        <div class="services-grid">
          @for (service of services; track service.id; let i = $index) {
            <div
              class="service-card glass-card"
              appRevealOnScroll
              [revealAnimation]="'fade-up'"
              [revealDelay]="(i % 3) * 100"
            >
              <div class="card-glow"></div>

              <!-- Top Row: Number & Icon -->
              <div class="card-head">
                <span class="service-number">{{ service.number }}</span>
                <div class="service-icon-box">
                  <i class="bi" [ngClass]="service.icon"></i>
                </div>
              </div>

              <!-- Title & Description -->
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-desc">{{ service.description }}</p>

              <!-- Highlights list -->
              <div class="service-highlights">
                @for (item of service.highlights; track item) {
                  <span class="highlight-pill">
                    <i class="bi bi-check2"></i>
                    <span>{{ item }}</span>
                  </span>
                }
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      .services-section {
        position: relative;
      }

      .services-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      @media (min-width: 768px) {
        .services-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1200px) {
        .services-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .service-card {
        padding: 2.25rem;
        border-radius: var(--radius-lg);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
      }

      .card-glow {
        position: absolute;
        top: -40px;
        right: -40px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
      }

      .service-card:hover .card-glow {
        opacity: 0.25;
      }

      .service-card:hover {
        transform: translateY(-8px);
        border-color: var(--color-accent);
        box-shadow: 0 16px 36px var(--color-accent-glow);
      }

      .card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
      }

      .service-number {
        font-family: var(--font-mono);
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-text-muted);
        opacity: 0.6;
        transition: color 0.3s ease, opacity 0.3s ease;
      }

      .service-card:hover .service-number {
        color: var(--color-accent);
        opacity: 1;
      }

      .service-icon-box {
        width: 54px;
        height: 54px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-bg-secondary) 100%);
        color: #f4f0e2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 6px 16px var(--color-accent-glow);
        transition: transform 0.3s ease;
      }

      .service-card:hover .service-icon-box {
        transform: scale(1.1) rotate(5deg);
      }

      .service-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.75rem;
      }

      .service-desc {
        font-size: 0.98rem;
        line-height: 1.7;
        color: var(--color-text-secondary);
        margin-bottom: 1.75rem;
      }

      .service-highlights {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: auto;
        padding-top: 1.25rem;
        border-top: 1px solid var(--color-border);
      }

      .highlight-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.8rem;
        font-family: var(--font-mono);
        font-weight: 500;
        color: var(--color-accent);
        background: var(--color-accent-subtle);
        padding: 0.25rem 0.65rem;
        border-radius: var(--radius-full);
      }

      .highlight-pill i {
        font-size: 0.9rem;
      }
    `,
  ],
})
export class ServicesComponent {
  readonly services = SERVICES_DATA;
}
