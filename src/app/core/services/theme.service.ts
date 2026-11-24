import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'ae_portfolio_theme';

  // Dark mode is default
  readonly currentTheme = signal<ThemeMode>('dark');
  readonly isDark = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY) as ThemeMode | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        this.setTheme(savedTheme);
      } else {
        // Dark theme is default as specified
        this.setTheme('dark');
      }
    }
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
    this.isDark.set(theme === 'dark');

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, theme);
      const body = document.body;
      if (theme === 'dark') {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        document.documentElement.style.colorScheme = 'light';
      }
    }
  }
}
