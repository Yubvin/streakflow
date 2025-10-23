import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'streakflow_theme';

/**
 * Theme service - manages application theme
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Private state
  private themeSignal = signal<Theme>('system');
  
  // Public read-only state
  readonly theme = this.themeSignal.asReadonly();
  readonly isDark = signal<boolean>(false);

  constructor() {
    this.loadTheme();
    this.applyTheme();

    // Auto-apply theme when it changes
    effect(() => {
      this.applyTheme();
    });
  }

  /**
   * Sets theme
   */
  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    this.saveTheme();
  }

  /**
   * Toggles between light and dark theme
   */
  toggleTheme(): void {
    const currentIsDark = this.isDark();
    this.setTheme(currentIsDark ? 'light' : 'dark');
  }

  /**
   * Applies theme to DOM
   */
  private applyTheme(): void {
    const theme = this.theme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = theme === 'dark' || (theme === 'system' && prefersDark);
    this.isDark.set(shouldBeDark);

    document.documentElement.classList.toggle('dark', shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }

  /**
   * Loads theme from localStorage
   */
  private loadTheme(): void {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      this.themeSignal.set(stored);
    }
  }

  /**
   * Saves theme to localStorage
   */
  private saveTheme(): void {
    localStorage.setItem(STORAGE_KEY, this.theme());
  }
}

