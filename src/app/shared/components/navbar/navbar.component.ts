import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { ScrollService } from '../../../core/services/scroll.service';
import { PERSONAL_DATA } from '../../../data/portfolio-data';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar-wrapper" [class.scrolled]="scrollService.isScrolled()">
      <div class="container navbar-content">
        <!-- Minimalist AE Logo / Monogram -->
        <a class="nav-logo" (click)="onNavClick('home')" role="button" tabindex="0">
          <div class="monogram-box">
            <span class="monogram">AE</span>
            <span class="monogram-glow"></span>
          </div>
          <div class="logo-name-group">
            <span class="logo-name">{{ personalData.name }}</span>
            <span class="logo-badge">Portfolio</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <ul class="nav-list">
            @for (link of navLinks; track link.id) {
              <li class="nav-item">
                <a
                  class="nav-link"
                  [class.active]="scrollService.activeSection() === link.id"
                  (click)="onNavClick(link.id)"
                  role="button"
                  tabindex="0"
                >
                  {{ link.label }}
                  @if (scrollService.activeSection() === link.id) {
                    <span class="active-indicator"></span>
                  }
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Right Action Items (Theme Toggle, CV Button, Mobile Hamburger) -->
        <div class="nav-actions">
          <!-- Dark / Light Mode Toggle Button -->
          <button
            class="theme-toggle-btn"
            (click)="themeService.toggleTheme()"
            [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
            [title]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            @if (themeService.isDark()) {
              <i class="bi bi-sun-fill theme-icon spin-in"></i>
            } @else {
              <i class="bi bi-moon-stars-fill theme-icon spin-in"></i>
            }
          </button>

          <!-- Download CV Button -->
          @if (personalData.cvUrl) {
          <a
            [href]="personalData.cvUrl"
            download="Abdelrahman_Elstohy_CV.pdf"
            class="btn btn-outline btn-sm cv-btn"
            title="Download Abdelrahman Elstohy's CV (PDF)"
          >
            <i class="bi bi-file-earmark-arrow-down"></i>
            <span>Resume</span>
          </a>
          }

          <!-- Mobile Hamburger Toggle -->
          <button
            class="mobile-toggle-btn"
            [class.open]="isMobileMenuOpen()"
            (click)="toggleMobileMenu()"
            aria-label="Toggle navigation menu"
          >
            <span class="hamburger-bar top"></span>
            <span class="hamburger-bar middle"></span>
            <span class="hamburger-bar bottom"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="isMobileMenuOpen()">
        <div class="mobile-drawer-content">
          <ul class="mobile-nav-list">
            @for (link of navLinks; track link.id) {
              <li>
                <a
                  class="mobile-nav-link"
                  [class.active]="scrollService.activeSection() === link.id"
                  (click)="onMobileNavClick(link.id)"
                >
                  <span class="link-label">{{ link.label }}</span>
                  <i class="bi bi-chevron-right arrow-icon"></i>
                </a>
              </li>
            }
          </ul>

          <div class="mobile-actions">
            @if (personalData.cvUrl) {
            <a
              [href]="personalData.cvUrl"
              download="Abdelrahman_Elstohy_CV.pdf"
              class="btn btn-primary w-full"
              (click)="isMobileMenuOpen.set(false)"
            >
              <i class="bi bi-file-earmark-arrow-down"></i>
              <span>Download CV (PDF)</span>
            </a>
            }
          </div>
        </div>
      </div>
      @if (isMobileMenuOpen()) {
        <div class="mobile-backdrop" (click)="isMobileMenuOpen.set(false)"></div>
      }
    </header>
  `,
  styles: [
    `
      .navbar-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: var(--navbar-height);
        z-index: 1000;
        background: transparent;
        transition: background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        border-bottom: 1px solid transparent;
      }

      .navbar-wrapper.scrolled {
        background: var(--color-glass-bg);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-bottom-color: var(--color-border);
        box-shadow: 0 4px 24px var(--color-shadow);
      }

      .navbar-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
      }

      /* Logo */
      .nav-logo {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        cursor: pointer;
        user-select: none;
      }

      .monogram-box {
        position: relative;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--color-card-bg) 0%, var(--color-bg-secondary) 100%);
        border: 1.5px solid var(--color-border);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease, border-color 0.3s ease;
      }

      .nav-logo:hover .monogram-box {
        transform: scale(1.06);
        border-color: var(--color-accent);
      }

      .monogram {
        font-family: var(--font-sans);
        font-weight: 800;
        font-size: 1.15rem;
        color: var(--color-text-primary);
        letter-spacing: -0.04em;
        background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .monogram-glow {
        position: absolute;
        inset: -2px;
        border-radius: 14px;
        background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }

      .nav-logo:hover .monogram-glow {
        opacity: 0.5;
      }

      .logo-name-group {
        display: flex;
        flex-direction: column;
      }

      .logo-name {
        font-weight: 700;
        font-size: 1.08rem;
        color: var(--color-text-primary);
        letter-spacing: -0.02em;
        line-height: 1.2;
      }

      .logo-badge {
        font-size: 0.72rem;
        font-family: var(--font-mono);
        color: var(--color-accent);
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      /* Desktop Nav */
      .desktop-nav {
        display: none;
      }

      @media (min-width: 1040px) {
        .desktop-nav {
          display: block;
        }
      }

      .nav-list {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        list-style: none;
      }

      .nav-link {
        font-size: 0.92rem;
        font-weight: 500;
        color: var(--color-text-secondary);
        cursor: pointer;
        padding: 0.5rem 0.2rem;
        position: relative;
        transition: color 0.2s ease;
      }

      .nav-link:hover,
      .nav-link.active {
        color: var(--color-text-primary);
      }

      .nav-link.active {
        color: var(--color-accent);
        font-weight: 600;
      }

      .active-indicator {
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-accent);
        border-radius: 2px;
        box-shadow: 0 0 8px var(--color-accent);
      }

      /* Actions */
      .nav-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .theme-toggle-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--color-card-bg);
        border: 1px solid var(--color-border);
        color: var(--color-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.15rem;
        transition: var(--transition-smooth);
      }

      .theme-toggle-btn:hover {
        border-color: var(--color-accent);
        background: var(--color-accent-subtle);
        transform: rotate(15deg);
      }

      .spin-in {
        animation: spinIn 0.35s ease;
      }

      @keyframes spinIn {
        from {
          transform: rotate(-90deg) scale(0.6);
          opacity: 0;
        }
        to {
          transform: rotate(0) scale(1);
          opacity: 1;
        }
      }

      .cv-btn {
        display: none;
      }

      @media (min-width: 580px) {
        .cv-btn {
          display: inline-flex;
        }
      }

      /* Mobile Hamburger */
      .mobile-toggle-btn {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 38px;
        height: 38px;
        background: var(--color-card-bg);
        border: 1px solid var(--color-border);
        border-radius: 10px;
        padding: 8px 7px;
        cursor: pointer;
      }

      @media (min-width: 1040px) {
        .mobile-toggle-btn {
          display: none;
        }
      }

      .hamburger-bar {
        width: 100%;
        height: 2px;
        background-color: var(--color-text-primary);
        border-radius: 2px;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }

      .mobile-toggle-btn.open .top {
        transform: translateY(7px) rotate(45deg);
      }

      .mobile-toggle-btn.open .middle {
        opacity: 0;
      }

      .mobile-toggle-btn.open .bottom {
        transform: translateY(-7px) rotate(-45deg);
      }

      /* Mobile Drawer */
      .mobile-drawer {
        position: fixed;
        top: var(--navbar-height);
        left: 0;
        right: 0;
        background: var(--color-glass-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--color-border);
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 999;
      }

      .mobile-drawer.open {
        max-height: 80vh;
        overflow-y: auto;
      }

      .mobile-drawer-content {
        padding: 1.5rem;
      }

      .mobile-nav-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }

      .mobile-nav-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.85rem 1rem;
        border-radius: var(--radius-md);
        font-weight: 500;
        color: var(--color-text-secondary);
        transition: background 0.2s ease, color 0.2s ease;
      }

      .mobile-nav-link:hover,
      .mobile-nav-link.active {
        background: var(--color-accent-subtle);
        color: var(--color-accent);
      }

      .mobile-nav-link.active {
        font-weight: 700;
        border-left: 3px solid var(--color-accent);
      }

      .arrow-icon {
        font-size: 0.85rem;
        opacity: 0.5;
      }

      .mobile-actions {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--color-border);
      }

      .w-full {
        width: 100%;
      }

      .mobile-backdrop {
        position: fixed;
        inset: 0;
        top: var(--navbar-height);
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        z-index: 998;
      }
    `,
  ],
})
export class NavbarComponent {
  readonly themeService = inject(ThemeService);
  readonly scrollService = inject(ScrollService);
  readonly personalData = PERSONAL_DATA;

  readonly isMobileMenuOpen = signal<boolean>(false);

  readonly navLinks: NavLink[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Get In Touch' },
  ];

  onNavClick(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
  }

  onMobileNavClick(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
    this.isMobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }
}
