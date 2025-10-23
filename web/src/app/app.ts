import { Component } from '@angular/core';
import { UiSidebarProviderComponent } from '@streakflow/ui/sidebar';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

/**
 * App - root application component
 * Provides sidebar context and renders AppShell
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UiSidebarProviderComponent,
    AppShellComponent
  ],
  template: `
    <lib-ui-sidebar-provider>
      <app-shell />
    </lib-ui-sidebar-provider>
  `,
})
export class App {}
