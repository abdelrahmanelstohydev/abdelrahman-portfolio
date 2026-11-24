import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../../core/services/scroll.service';
import { PERSONAL_DATA } from '../../../data/portfolio-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-wrapper">
      <div class="container">
        <div class="footer-main">
          <!-- Left: Identity & Bio -->
          <div class="footer-brand">
            <div class="brand-header" (click)="scrollService.scrollToTop()" role="button" tabindex="0">
              <div class="monogram-box">
                <span class="monogram">AE</span>
              </div>
              <div class="brand-text">
                <h3 class="brand-name">{{ personalData.name }}</h3>
                <span class="brand-sub">{{ personalData.status }} &bull; Mansoura University</span>
              </div>
            </div>
            <p class="brand-bio">
              Computer Science student at Mansoura University, focused on full-stack web development with the MEAN stack.
            </p>
            <div class="footer-socials">
              <a [href]="personalData.linkedinUrl" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn Profile">
                <i class="bi bi-linkedin"></i>
              </a>
              <a [href]="personalData.githubUrl" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub Profile">
                <i class="bi bi-github"></i>
              </a>
              <a [href]="'mailto:' + personalData.email" class="social-icon" aria-label="Send Email">
                <i class="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>

          <!-- Middle: Navigation Links -->
          <div class="footer-links-col">
            <h4 class="col-title">Navigation</h4>
            <ul class="col-list">
              <li><a (click)="scrollService.scrollTo('home')" role="button">Home</a></li>
              <li><a (click)="scrollService.scrollTo('about')" role="button">About Me</a></li>
              <li><a (click)="scrollService.scrollTo('education')" role="button">Education</a></li>
              <li><a (click)="scrollService.scrollTo('experience')" role="button">Experience</a></li>
              <li><a (click)="scrollService.scrollTo('skills')" role="button">Technical Skills</a></li>
              <li><a (click)="scrollService.scrollTo('projects')" role="button">Projects</a></li>
            </ul>
          </div>

          <!-- Right: Services & Quick Contact -->
          <div class="footer-links-col">
            <h4 class="col-title">Engineering Focus</h4>
            <ul class="col-list">
              <li><a (click)="scrollService.scrollTo('services')" role="button">MEAN Stack Development</a></li>
              <li><a (click)="scrollService.scrollTo('services')" role="button">Node.js &amp; Express</a></li>
              <li><a (click)="scrollService.scrollTo('services')" role="button">Angular Development</a></li>
              <li><a (click)="scrollService.scrollTo('services')" role="button">MongoDB &amp; Databases</a></li>
              <li><a (click)="scrollService.scrollTo('services')" role="button">Full-Stack Solutions</a></li>
              <li><a (click)="scrollService.scrollTo('contact')" role="button">Get In Touch</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-divider"></div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p class="copyright">
            &copy; {{ currentYear }} <span class="highlight">{{ personalData.name }}</span>. All rights reserved.
          </p>
          <p class="tagline">
            Designed &amp; Developed with passion by Abdelrahman Elstohy.
          </p>
          <button class="footer-back-to-top" (click)="scrollService.scrollToTop()" aria-label="Back to top">
            <span>Back to top</span>
            <i class="bi bi-arrow-up-circle-fill"></i>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer-wrapper {
        background: var(--color-card-bg);
        border-top: 1px solid var(--color-border);
        padding: 5rem 0 2.5rem 0;
        position: relative;
        z-index: 10;
        transition: var(--theme-transition);
      }

      .footer-main {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      @media (min-width: 768px) {
        .footer-main {
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3.5rem;
        }
      }

      .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .brand-header {
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
        cursor: pointer;
        width: fit-content;
      }

      .monogram-box {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
        border: 1.5px solid var(--color-border);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .monogram {
        font-family: var(--font-sans);
        font-weight: 800;
        font-size: 1.2rem;
        color: var(--color-accent);
      }

      .brand-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-text-primary);
        line-height: 1.2;
      }

      .brand-sub {
        font-size: 0.82rem;
        color: var(--color-text-muted);
        font-family: var(--font-mono);
      }

      .brand-bio {
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--color-text-secondary);
        max-width: 460px;
      }

      .footer-socials {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        margin-top: 0.5rem;
      }

      .social-icon {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--color-bg-primary);
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.05rem;
        transition: var(--transition-smooth);
      }

      .social-icon:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
        transform: translateY(-3px);
        box-shadow: 0 4px 15px var(--color-accent-glow);
      }

      .col-title {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 1.25rem;
        position: relative;
      }

      .col-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
      }

      .col-list a {
        font-size: 0.92rem;
        color: var(--color-text-secondary);
        cursor: pointer;
        transition: color 0.2s ease, transform 0.2s ease;
        display: inline-block;
      }

      .col-list a:hover {
        color: var(--color-accent);
        transform: translateX(3px);
      }

      .footer-divider {
        height: 1px;
        background: var(--color-border);
        margin: 3.5rem 0 2rem 0;
      }

      .footer-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
        font-size: 0.88rem;
        color: var(--color-text-muted);
      }

      @media (min-width: 768px) {
        .footer-bottom {
          flex-direction: row;
          justify-content: space-between;
          text-align: left;
        }
      }

      .highlight {
        color: var(--color-accent);
        font-weight: 600;
      }

      .tagline {
        font-style: italic;
        color: var(--color-text-secondary);
      }

      .footer-back-to-top {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.88rem;
        cursor: pointer;
        transition: transform 0.2s ease, color 0.2s ease;
      }

      .footer-back-to-top:hover {
        transform: translateY(-2px);
        color: var(--color-accent-hover);
      }

      .footer-back-to-top i {
        font-size: 1.2rem;
      }
    `,
  ],
})
export class FooterComponent {
  readonly scrollService = inject(ScrollService);
  readonly personalData = PERSONAL_DATA;
  readonly currentYear: number = new Date().getFullYear();
}
