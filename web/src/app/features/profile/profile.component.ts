import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UiCardComponent } from '@streakflow/ui/card';
import { UiButtonComponent } from '@streakflow/ui/button';

/**
 * Profile - user profile and settings screen
 * This is a SMART component - manages settings
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    PageHeaderComponent,
    UiCardComponent,
    UiButtonComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  readonly themeService = inject(ThemeService);
}

