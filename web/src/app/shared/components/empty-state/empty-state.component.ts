import { Component, input, output } from '@angular/core';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiCardComponent } from '@streakflow/ui/card';

/**
 * EmptyState - displays empty state with icon, message and optional action
 * This is a DUMB component - presentation only
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  // Inputs
  readonly icon = input<string>('📭');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly actionLabel = input<string>();
  readonly actionIcon = input<string>('➕');

  // Outputs
  readonly action = output<void>();
}

