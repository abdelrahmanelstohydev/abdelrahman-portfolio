import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { SKILL_CATEGORIES } from '../../../data/portfolio-data';
import { SkillCategory, SkillItem } from '../../../models/portfolio.model';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, RevealOnScrollDirective],
  template: `
    <section id="skills" class="section-wrapper skills-section">
      <div class="container">
        <!-- Section Title -->
        <app-section-title
          badge="Core Competencies"
          title="My Technical"
          highlight="Skills"
          subtitle="Technologies &amp; Tools I Work With"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
        ></app-section-title>

        <!-- Category Filter Tabs -->
        <div class="filter-tabs-wrapper" appRevealOnScroll [revealAnimation]="'fade-up'">
          <div class="filter-tabs">
            <button
              class="filter-pill"
              [class.active]="selectedCategory() === 'all'"
              (click)="selectedCategory.set('all')"
            >
              <i class="bi bi-grid-fill"></i>
              <span>All Categories</span>
            </button>
            @for (cat of categories; track cat.id) {
              <button
                class="filter-pill"
                [class.active]="selectedCategory() === cat.id"
                (click)="selectedCategory.set(cat.id)"
              >
                <i class="bi" [ngClass]="cat.icon"></i>
                <span>{{ cat.title }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Skills Category Cards Grid -->
        <div class="categories-grid">
          @for (cat of filteredCategories(); track cat.id; let i = $index) {
            <div
              class="category-card glass-card"
              appRevealOnScroll
              [revealAnimation]="'fade-up'"
              [revealDelay]="(i % 3) * 100"
            >
              <!-- Card Header -->
              <div class="card-top">
                <div class="cat-icon-box">
                  <i class="bi" [ngClass]="cat.icon"></i>
                </div>
                <div>
                  <h3 class="cat-title">{{ cat.title }}</h3>
                  <p class="cat-desc">{{ cat.description }}</p>
                </div>
              </div>

              <!-- Skills Grid inside Category -->
              <div class="skills-grid">
                @for (skill of cat.skills; track skill.name) {
                  <div class="skill-chip" [class.highlighted]="skill.highlight">
                    <div class="skill-icon-wrap">
                      <i class="bi" [ngClass]="skill.icon"></i>
                    </div>
                    <span class="skill-name">{{ skill.name }}</span>
                    @if (skill.proficiency) {
                      <span class="skill-level">{{ skill.proficiency }}</span>
                    }
                    @if (skill.highlight) {
                      <span class="skill-star" title="Core Focus">
                        <i class="bi bi-patch-check-fill"></i>
                      </span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <!-- Engineering Mindset Callout -->
        <div class="engineering-philosophy glass-card" appRevealOnScroll [revealAnimation]="'fade-up'" [revealDelay]="150">
          <div class="philosophy-icon">
            <i class="bi bi-code-square"></i>
          </div>
          <div class="philosophy-content">
            <h4 class="philosophy-title">Focus on Quality &amp; Architecture</h4>
            <p class="philosophy-desc">
              Rather than presenting arbitrary proficiency percentages (e.g. "90% C#"), I focus on real-world engineering fundamentals: understanding memory management, algorithmic complexity, relational data integrity, modular separation of concerns, and clean API contracts.
            </p>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      .skills-section {
        position: relative;
      }

      /* Filter Tabs */
      .filter-tabs-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 3.5rem;
      }

      .filter-tabs {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.65rem;
        background: var(--color-glass-card);
        padding: 0.5rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--color-border);
        backdrop-filter: blur(12px);
      }

      .filter-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.55rem 1.15rem;
        border-radius: var(--radius-full);
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-text-secondary);
        transition: var(--transition-smooth);
        border: 1px solid transparent;
      }

      .filter-pill i {
        font-size: 0.95rem;
        color: var(--color-accent);
      }

      .filter-pill:hover {
        color: var(--color-text-primary);
        background: var(--color-accent-subtle);
      }

      .filter-pill.active {
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-bg-secondary) 100%);
        color: #f4f0e2 !important;
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 16px var(--color-accent-glow);
      }

      .filter-pill.active i {
        color: #f4f0e2;
      }

      /* Categories Grid */
      .categories-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      @media (min-width: 768px) {
        .categories-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1200px) {
        .categories-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .category-card {
        padding: 2rem;
        border-radius: var(--radius-lg);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .card-top {
        display: flex;
        align-items: flex-start;
        gap: 1.15rem;
        margin-bottom: 1.75rem;
      }

      .cat-icon-box {
        width: 48px;
        height: 48px;
        min-width: 48px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-bg-secondary) 100%);
        color: #f4f0e2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.35rem;
        box-shadow: 0 4px 14px var(--color-accent-glow);
      }

      .cat-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.25rem;
      }

      .cat-desc {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        line-height: 1.45;
        margin: 0;
      }

      /* Skills list chips inside category card */
      .skills-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
      }

      .skill-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        padding: 0.5rem 0.85rem;
        border-radius: var(--radius-md);
        background: var(--color-bg-primary);
        border: 1px solid var(--color-border);
        transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .skill-chip:hover {
        transform: translateY(-2px);
        border-color: var(--color-accent);
        box-shadow: 0 4px 12px var(--color-accent-glow);
      }

      .skill-chip.highlighted {
        border-color: rgba(91, 145, 163, 0.45);
        background: var(--color-accent-subtle);
      }

      .skill-icon-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-accent);
        font-size: 1.1rem;
      }

      .skill-level {
        margin-left: auto;
        padding: 0.15rem 0.45rem;
        border-radius: 999px;
        font-size: 0.66rem;
        line-height: 1.4;
        color: var(--color-text-muted);
        background: var(--color-accent-subtle);
        white-space: nowrap;
      }

      .skill-name {
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-text-primary);
      }

      .skill-star {
        color: var(--color-accent);
        font-size: 0.85rem;
        display: flex;
        align-items: center;
      }

      /* Engineering Philosophy */
      .engineering-philosophy {
        margin-top: 3.5rem;
        padding: 1.75rem 2rem;
        display: flex;
        gap: 1.5rem;
        align-items: center;
        border-left: 4px solid var(--color-accent);
      }

      .philosophy-icon {
        width: 52px;
        height: 52px;
        min-width: 52px;
        border-radius: 50%;
        background: var(--color-accent-subtle);
        color: var(--color-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
      }

      .philosophy-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.35rem;
      }

      .philosophy-desc {
        font-size: 0.95rem;
        line-height: 1.65;
        color: var(--color-text-secondary);
        margin: 0;
      }
    `,
  ],
})
export class SkillsComponent {
  readonly categories = SKILL_CATEGORIES;
  readonly selectedCategory = signal<string>('all');

  filteredCategories(): SkillCategory[] {
    const selected = this.selectedCategory();
    if (selected === 'all') {
      return this.categories;
    }
    return this.categories.filter((cat) => cat.id === selected);
  }
}
