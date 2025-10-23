import { Component, input, output, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiBadgeComponent } from '@streakflow/ui/badge';
import { UiSeparatorComponent } from '@streakflow/ui/separator';
import { UiSidebarTriggerComponent } from '@streakflow/ui/sidebar';

/**
 * AppTopbar - application top bar
 * This is a DUMB component - presentation only (except theme toggle)
 */
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    UiButtonComponent,
    UiBadgeComponent,
    UiSeparatorComponent,
    UiSidebarTriggerComponent
  ],
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss'
})
export class AppTopbarComponent {
  readonly themeService = inject(ThemeService);

  // Inputs
  readonly title = input.required<string>();
  readonly showAddButton = input<boolean>(false);

  // Outputs
  readonly toggleSidebar = output<void>();
  readonly addHabit = output<void>();
}

