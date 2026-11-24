import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible() && !isTouchDevice()) {
      <!-- Trailing outer glowing ring -->
      <div
        class="cursor-ring"
        [class.hovering]="isHovering()"
        [class.clicking]="isClicking()"
        [style.transform]="'translate3d(' + ringX() + 'px, ' + ringY() + 'px, 0)'"
      ></div>

      <!-- Precise center dot -->
      <div
        class="cursor-dot"
        [class.hovering]="isHovering()"
        [style.transform]="'translate3d(' + dotX() + 'px, ' + dotY() + 'px, 0)'"
      ></div>
    }
  `,
  styles: [
    `
      .cursor-ring {
        position: fixed;
        top: -18px;
        left: -18px;
        width: 36px;
        height: 36px;
        border: 1.5px solid var(--color-accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, opacity 0.25s ease;
        opacity: 0.65;
        box-shadow: 0 0 12px var(--color-accent-glow);
        will-change: transform;
      }

      .cursor-ring.hovering {
        width: 52px;
        height: 52px;
        top: -26px;
        left: -26px;
        background: var(--color-accent-subtle);
        border-color: var(--color-accent);
        opacity: 0.9;
        backdrop-filter: blur(2px);
      }

      .cursor-ring.clicking {
        transform: scale(0.85);
      }

      .cursor-dot {
        position: fixed;
        top: -4px;
        left: -4px;
        width: 8px;
        height: 8px;
        background-color: var(--color-accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 100000;
        transition: transform 0.05s ease, width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
        box-shadow: 0 0 8px var(--color-accent);
        will-change: transform;
      }

      .cursor-dot.hovering {
        transform: scale(1.4);
        background-color: var(--color-text-primary);
      }

      @media (hover: none) and (pointer: coarse) {
        .cursor-ring,
        .cursor-dot {
          display: none !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .cursor-ring,
        .cursor-dot {
          display: none !important;
        }
      }
    `,
  ],
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  readonly isVisible = signal<boolean>(false);
  readonly isHovering = signal<boolean>(false);
  readonly isClicking = signal<boolean>(false);
  readonly isTouchDevice = signal<boolean>(false);

  readonly dotX = signal<number>(-100);
  readonly dotY = signal<number>(-100);
  readonly ringX = signal<number>(-100);
  readonly ringY = signal<number>(-100);

  private targetX = -100;
  private targetY = -100;
  private currentRingX = -100;
  private currentRingY = -100;
  private animFrameId?: number;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      this.isTouchDevice.set(true);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      this.isTouchDevice.set(true);
      return;
    }

    this.startAnimationLoop();
    this.addInteractiveListeners();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.isTouchDevice()) return;

    if (!this.isVisible()) {
      this.isVisible.set(true);
      this.currentRingX = e.clientX;
      this.currentRingY = e.clientY;
    }

    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.dotX.set(e.clientX);
    this.dotY.set(e.clientY);
  }

  @HostListener('window:mousedown')
  onMouseDown(): void {
    this.isClicking.set(true);
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    this.isClicking.set(false);
  }

  @HostListener('window:mouseleave')
  onMouseLeave(): void {
    this.isVisible.set(false);
  }

  @HostListener('window:mouseenter')
  onMouseEnter(): void {
    if (!this.isTouchDevice()) {
      this.isVisible.set(true);
    }
  }

  private startAnimationLoop(): void {
    const loop = () => {
      // Smooth lerp for outer ring
      const ease = 0.18;
      this.currentRingX += (this.targetX - this.currentRingX) * ease;
      this.currentRingY += (this.targetY - this.currentRingY) * ease;

      this.ringX.set(Math.round(this.currentRingX * 10) / 10);
      this.ringY.set(Math.round(this.currentRingY * 10) / 10);

      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  private addInteractiveListeners(): void {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = !!target.closest(
        'a, button, input, textarea, select, .interactive, .btn, .clickable, .glass-card, .skill-card, .filter-pill'
      );
      this.isHovering.set(isInteractive);
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
  }
}
