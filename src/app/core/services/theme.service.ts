import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
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
      this.applyTheme(this.readTheme());
    }
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.applyTheme(theme);

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.STORAGE_KEY, theme);
      } catch {
        return;
      }
    }
  }

  private readTheme(): ThemeMode {
    try {
      return localStorage.getItem(this.STORAGE_KEY) === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  }

  private applyTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
    this.isDark.set(theme === 'dark');

    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('theme-dark', theme === 'dark');
      document.body.classList.toggle('theme-light', theme === 'light');
      document.documentElement.style.colorScheme = theme;
    }
  }
}
