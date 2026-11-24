import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0; // ms
  @Input() revealAnimation: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' = 'fade-up';

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const nativeEl = this.el.nativeElement as HTMLElement;
    this.renderer.addClass(nativeEl, 'reveal-init');
    this.renderer.addClass(nativeEl, `anim-${this.revealAnimation}`);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (this.revealDelay > 0) {
              setTimeout(() => {
                this.renderer.addClass(nativeEl, 'revealed');
              }, this.revealDelay);
            } else {
              this.renderer.addClass(nativeEl, 'revealed');
            }
            this.observer?.unobserve(nativeEl);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
