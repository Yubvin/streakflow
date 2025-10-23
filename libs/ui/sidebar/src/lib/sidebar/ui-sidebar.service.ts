import { Injectable, signal, computed, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export type SidebarState = 'expanded' | 'collapsed';

@Injectable()
export class UiSidebarService {
  private readonly _open = signal(true);
  private readonly _openMobile = signal(false);
  private readonly _isMobile = signal(false);

  readonly open = this._open.asReadonly();
  readonly openMobile = this._openMobile.asReadonly();
  readonly isMobile = this._isMobile.asReadonly();
  readonly state = computed<SidebarState>(() => 
    this._open() ? 'expanded' : 'collapsed'
  );

  constructor() {
    // Only run browser-specific code on the client
    if (typeof window === 'undefined') {
      return;
    }

    // Load initial state from cookie
    const savedState = this.getCookie(SIDEBAR_COOKIE_NAME);
    if (savedState !== null) {
      this._open.set(savedState === 'true');
    }

    // Setup keyboard shortcut
    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(takeUntilDestroyed())
      .subscribe(event => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          this.toggleSidebar();
        }
      });

    // Setup mobile detection
    const checkMobile = () => {
      this._isMobile.set(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
  }

  setOpen(value: boolean): void {
    this._open.set(value);
    this.setCookie(SIDEBAR_COOKIE_NAME, String(value), SIDEBAR_COOKIE_MAX_AGE);
  }

  setOpenMobile(value: boolean): void {
    this._openMobile.set(value);
  }

  toggleSidebar(): void {
    if (this._isMobile()) {
      this._openMobile.update(open => !open);
    } else {
      const newValue = !this._open();
      this.setOpen(newValue);
    }
  }

  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() ?? null;
    }
    
    return null;
  }

  private setCookie(name: string, value: string, maxAge: number): void {
    if (typeof document === 'undefined') return;
    
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
  }
}

