import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  color: string;
}

@Component({
  selector: 'app-particle-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="background-container" aria-hidden="true">
      <!-- Ambient Glowing Orbs -->
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>
      <div class="ambient-orb orb-3"></div>

      <!-- Geometric Grid Overlay -->
      <div class="cyber-grid"></div>

      <!-- Canvas for Floating Lightweight Particles -->
      <canvas #particleCanvas class="particle-canvas"></canvas>
    </div>
  `,
  styles: [
    `
      .background-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
      }

      /* Ambient Glowing Orbs */
      .ambient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.22;
        transition: opacity 0.5s ease;
        animation: floatOrb 20s infinite alternate ease-in-out;
      }

      body.theme-light .ambient-orb {
        opacity: 0.16;
        filter: blur(100px);
      }

      .orb-1 {
        width: 500px;
        height: 500px;
        top: -100px;
        right: -100px;
        background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
        animation-duration: 24s;
      }

      .orb-2 {
        width: 600px;
        height: 600px;
        bottom: 5%;
        left: -150px;
        background: radial-gradient(circle, var(--color-bg-secondary) 0%, transparent 75%);
        animation-duration: 28s;
        animation-delay: -5s;
      }

      .orb-3 {
        width: 380px;
        height: 380px;
        top: 45%;
        right: 15%;
        background: radial-gradient(circle, var(--color-accent) 0%, transparent 65%);
        animation-duration: 18s;
        animation-delay: -9s;
      }

      @keyframes floatOrb {
        0% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(30px, 40px, 0) scale(1.08);
        }
        100% {
          transform: translate3d(-25px, -35px, 0) scale(0.95);
        }
      }

      /* Subtle Cyber Engineering Grid */
      .cyber-grid {
        position: absolute;
        inset: 0;
        background-size: 60px 60px;
        background-image: 
          linear-gradient(to right, rgba(91, 145, 163, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(91, 145, 163, 0.035) 1px, transparent 1px);
        mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 90%);
        -webkit-mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 90%);
      }

      body.theme-light .cyber-grid {
        background-image: 
          linear-gradient(to right, rgba(97, 157, 198, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(97, 157, 198, 0.05) 1px, transparent 1px);
      }

      .particle-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      @media (prefers-reduced-motion: reduce) {
        .ambient-orb {
          animation: none !important;
        }
        .particle-canvas {
          display: none;
        }
      }
    `,
  ],
})
export class ParticleBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('particleCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animFrameId?: number;
  private width = 0;
  private height = 0;
  private resizeListener?: () => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    this.initCanvas();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.resizeListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.handleResize();

    this.resizeListener = () => this.handleResize();
    window.addEventListener('resize', this.resizeListener, { passive: true });

    this.createParticles();
    this.renderLoop();
  }

  private handleResize(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;

    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  private createParticles(): void {
    // Keep count lightweight (40 particles) to avoid CPU load
    const count = Math.min(45, Math.floor((this.width * this.height) / 32000));
    this.particles = [];

    const isLight = document.body.classList.contains('theme-light');
    const color = isLight ? '97, 157, 198' : '91, 145, 163';

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.4 + 0.15,
        targetAlpha: Math.random() * 0.4 + 0.15,
        color,
      });
    }
  }

  private renderLoop = (): void => {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const isLight = document.body.classList.contains('theme-light');
    const rgb = isLight ? '97, 157, 198' : '91, 145, 163';

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
      this.ctx.fill();

      // Connect nearby particles with subtle line
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${rgb}, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    this.animFrameId = requestAnimationFrame(this.renderLoop);
  };
}
