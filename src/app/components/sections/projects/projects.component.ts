import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { PROJECTS_DATA } from '../../../data/portfolio-data';
import { ProjectItem } from '../../../models/portfolio.model';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

type ProjectCategoryFilter = 'all' | 'backend' | 'frontend' | 'fullstack';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, RevealOnScrollDirective],
  template: `
    <section id="projects" class="section-wrapper projects-section">
      <div class="container">
        <!-- Section Title -->
        <app-section-title
          badge="Academic &amp; Practical Work"
          title="My"
          highlight="Projects"
          subtitle="Selected projects and team training work"
          appRevealOnScroll
          [revealAnimation]="'fade-up'"
        ></app-section-title>

        <!-- Project Filtering Tabs -->
        <div class="filter-controls" appRevealOnScroll [revealAnimation]="'fade-up'">
          <div class="filter-tabs">
            @for (tab of filterTabs; track tab.id) {
              <button
                class="filter-tab-btn"
                [class.active]="currentFilter() === tab.id"
                (click)="setFilter(tab.id)"
              >
                <i class="bi" [ngClass]="tab.icon"></i>
                <span>{{ tab.label }}</span>
                <span class="count-badge">{{ getCount(tab.id) }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          @for (project of filteredProjects(); track project.id; let i = $index) {
            <article
              class="project-card glass-card"
              appRevealOnScroll
              [revealAnimation]="'fade-up'"
              [revealDelay]="i * 120"
            >
              <!-- Project Cover Visual -->
              <div class="card-cover">
                <img
                  [src]="project.image"
                  [alt]="project.title + ' Cover'"
                  class="cover-image"
                  loading="lazy"
                />
                <div class="cover-overlay"></div>

                <!-- Category and Placeholder Badges -->
                <div class="cover-badges">
                  <span class="category-pill">{{ project.categoryLabel }}</span>
                </div>
              </div>

              <!-- Card Details -->
              <div class="card-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-desc">{{ project.shortDescription }}</p>

                <!-- Key architectural features -->
                <ul class="features-list">
                  @for (feat of project.features; track feat) {
                    <li>
                      <i class="bi bi-check-circle-fill"></i>
                      <span>{{ feat }}</span>
                    </li>
                  }
                </ul>

                <!-- Tech Stack Tags -->
                <div class="tech-row">
                  @for (tech of project.technologies; track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                </div>

                @if (project.githubUrl || project.demoUrl) {
                  <div class="card-actions">
                    @if (project.githubUrl) {
                      <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm action-btn" title="View GitHub Repository">
                        <i class="bi bi-github"></i><span>Repository</span>
                      </a>
                    }
                    @if (project.demoUrl) {
                      <a [href]="project.demoUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm action-btn" title="View Live Demo">
                        <i class="bi bi-box-arrow-up-right"></i><span>Live Demo</span>
                      </a>
                    }
                  </div>
                }
              </div>
            </article>
          }
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      .projects-section {
        position: relative;
      }

      /* Filter Controls */
      .filter-controls {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
      }

      .filter-tabs {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.65rem;
        background: var(--color-glass-card);
        padding: 0.45rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--color-border);
        backdrop-filter: blur(12px);
      }

      .filter-tab-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.55rem 1.25rem;
        border-radius: var(--radius-full);
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-text-secondary);
        transition: var(--transition-smooth);
        border: 1px solid transparent;
      }

      .filter-tab-btn:hover {
        color: var(--color-text-primary);
        background: var(--color-accent-subtle);
      }

      .filter-tab-btn.active {
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-bg-secondary) 100%);
        color: #f4f0e2 !important;
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 16px var(--color-accent-glow);
      }

      .count-badge {
        font-size: 0.75rem;
        padding: 0.15rem 0.5rem;
        border-radius: var(--radius-full);
        background: rgba(0, 0, 0, 0.2);
        font-family: var(--font-mono);
      }

      /* Sample Banner */
      .sample-notice {
        max-width: 860px;
        margin: 0 auto 3rem auto;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        font-size: 0.88rem;
        color: var(--color-text-secondary);
        border-left: 3px solid #ffbd2e;
      }

      .sample-notice i {
        font-size: 1.2rem;
        color: #ffbd2e;
      }

      .sample-notice code {
        font-family: var(--font-mono);
        color: var(--color-accent);
        background: var(--color-accent-subtle);
        padding: 0.1rem 0.35rem;
        border-radius: 4px;
      }

      /* Projects Grid */
      .projects-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      @media (min-width: 768px) {
        .projects-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .project-card {
        border-radius: var(--radius-lg);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
      }

      .project-card:hover {
        transform: translateY(-8px);
        border-color: var(--color-accent);
        box-shadow: 0 20px 40px var(--color-accent-glow);
      }

      /* Card Cover */
      .card-cover {
        position: relative;
        height: 240px;
        overflow: hidden;
        background: var(--color-bg-primary);
      }

      .cover-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .project-card:hover .cover-image {
        transform: scale(1.05);
      }

      .cover-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 40%, var(--color-card-bg) 100%);
      }

      .cover-badges {
        position: absolute;
        top: 1rem;
        left: 1rem;
        right: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
      }

      .category-pill {
        font-size: 0.75rem;
        font-weight: 700;
        font-family: var(--font-mono);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 0.3rem 0.75rem;
        border-radius: var(--radius-full);
        background: var(--color-card-bg);
        color: var(--color-accent);
        border: 1px solid var(--color-border);
      }

      /* Card Content */
      .card-content {
        padding: 1.85rem;
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .project-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.65rem;
      }

      .project-desc {
        font-size: 0.95rem;
        line-height: 1.65;
        color: var(--color-text-secondary);
        margin-bottom: 1.25rem;
      }

      .features-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
        margin-bottom: 1.5rem;
      }

      .features-list li {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.88rem;
        color: var(--color-text-secondary);
      }

      .features-list li i {
        color: var(--color-accent);
        font-size: 0.95rem;
        margin-top: 0.15rem;
      }

      .tech-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        margin-bottom: 1.75rem;
        margin-top: auto;
      }

      .card-actions {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--color-border);
      }

      .action-btn {
        flex: 1;
      }
    `,
  ],
})
export class ProjectsComponent {
  readonly allProjects = PROJECTS_DATA;
  readonly currentFilter = signal<ProjectCategoryFilter>('all');

  readonly filterTabs = [
    { id: 'all' as ProjectCategoryFilter, label: 'All Projects', icon: 'bi-collection-fill' },
    { id: 'backend' as ProjectCategoryFilter, label: 'Backend', icon: 'bi-server' },
    { id: 'frontend' as ProjectCategoryFilter, label: 'Frontend', icon: 'bi-window-sidebar' },
    { id: 'fullstack' as ProjectCategoryFilter, label: 'Full Stack', icon: 'bi-layers-half' },
  ];

  setFilter(filter: ProjectCategoryFilter): void {
    this.currentFilter.set(filter);
  }

  filteredProjects(): ProjectItem[] {
    const filter = this.currentFilter();
    if (filter === 'all') {
      return this.allProjects;
    }
    return this.allProjects.filter((p) => p.category === filter);
  }

  getCount(filter: ProjectCategoryFilter): number {
    if (filter === 'all') {
      return this.allProjects.length;
    }
    return this.allProjects.filter((p) => p.category === filter).length;
  }
}
