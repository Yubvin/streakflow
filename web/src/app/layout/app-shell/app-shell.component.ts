import { Component, signal, computed } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppSidebarComponent } from '../sidebar/app-sidebar.component';
import { AppTopbarComponent } from '../topbar/app-topbar.component';
import { ToastContainerComponent } from '../../shared/components/toast-container/toast-container.component';

/**
 * Route title mapping
 */
const ROUTE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/habits': 'Habits',
  '/analytics': 'Analytics',
  '/profile': 'Settings',
};

/**
 * AppShell - main application shell with layout
 * This is a SMART component - manages layout state
 */
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    AppSidebarComponent,
    AppTopbarComponent,
    ToastContainerComponent
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  readonly sidebarOpen = signal(true);
  readonly currentRoute = signal('/dashboard');

  readonly currentTitle = computed(() => {
    return ROUTE_TITLES[this.currentRoute()] ?? 'StreakFlow';
  });

  readonly showAddButton = computed(() => {
    const route = this.currentRoute();
    return route === '/dashboard' || route === '/habits';
  });

  constructor(private router: Router) {
    this.trackRouteChanges();
  }

  /**
   * Toggles sidebar open/close state
   */
  toggleSidebar(): void {
    this.sidebarOpen.update(isOpen => !isOpen);
  }

  /**
   * Tracks route changes to update title
   */
  private trackRouteChanges(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute.set(event.urlAfterRedirects);
        }
      });
  }
}

