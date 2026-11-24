import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly activeSection = signal<string>('home');
  readonly isScrolled = signal<boolean>(false);
  readonly scrollProgress = signal<number>(0);

  private sectionIds: string[] = [
    'home',
    'about',
    'education',
    'experience',
    'skills',
    'projects',
    'testimonials',
    'services',
    'contact',
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollListener();
    }
  }

  private initScrollListener(): void {
    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial check
    setTimeout(() => this.handleScroll(), 100);
  }

  private handleScroll(): void {
    const scrollY = window.scrollY;
    this.isScrolled.set(scrollY > 50);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      this.scrollProgress.set(progress);
    }

    // Determine active section
    const scrollPosition = scrollY + 180;
    for (let i = this.sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.sectionIds[i]);
      if (section) {
        const top = section.offsetTop;
        if (scrollPosition >= top) {
          this.activeSection.set(this.sectionIds[i]);
          break;
        }
      }
    }
  }

  scrollTo(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -75; // navbar height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      this.activeSection.set(sectionId);
    }
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.activeSection.set('home');
  }
}
