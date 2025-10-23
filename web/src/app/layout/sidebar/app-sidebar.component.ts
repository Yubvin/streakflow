import { Component, input, output, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { 
  UiSidebarComponent,
  UiSidebarHeaderComponent,
  UiSidebarContentComponent,
  UiSidebarFooterComponent,
  UiSidebarGroupComponent,
  UiSidebarMenuComponent,
  UiSidebarMenuItemComponent,
  UiSidebarMenuButtonComponent
} from '@streakflow/ui/sidebar';
import { UiAvatarComponent } from '@streakflow/ui/avatar';
import { UiButtonComponent } from '@streakflow/ui/button';

/**
 * Navigation item interface
 */
interface NavItem {
  label: string;
  route: string;
  icon: string;
}

/**
 * Navigation items - declarative configuration
 */
const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: '📊' },
  { label: 'Habits', route: '/habits', icon: '✅' },
  { label: 'Analytics', route: '/analytics', icon: '📈' },
  { label: 'Profile', route: '/profile', icon: '👤' }
] as const;

/**
 * AppSidebar - application sidebar with navigation
 * This is a SMART component - uses AuthService
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    UiSidebarComponent,
    UiSidebarHeaderComponent,
    UiSidebarContentComponent,
    UiSidebarFooterComponent,
    UiSidebarGroupComponent,
    UiSidebarMenuComponent,
    UiSidebarMenuItemComponent,
    UiSidebarMenuButtonComponent,
    UiAvatarComponent,
    UiButtonComponent
  ],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss'
})
export class AppSidebarComponent {
  private authService = inject(AuthService);

  // Inputs
  readonly open = input<boolean>(true);

  // Outputs
  readonly openChange = output<boolean>();

  // Public data
  readonly navItems = NAV_ITEMS;
  readonly currentUser = this.authService.currentUser;
  readonly userInitials = computed(() => {
    const user = this.currentUser();
    if (!user) return 'U';
    return user.fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  });

  /**
   * Handles logout
   */
  onLogout(): void {
    this.authService.logout();
  }
}

