import { Component, input, output } from '@angular/core';
import { UiButtonComponent } from '@streakflow/ui/button';

/**
 * PageHeader - reusable page header with title and optional action button
 * This is a DUMB component - presentation only
 */
@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  // Inputs
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly actionLabel = input<string>();
  readonly actionIcon = input<string>('➕');

  // Outputs
  readonly action = output<void>();
}

