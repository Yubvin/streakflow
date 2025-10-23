import { Component, model, output } from '@angular/core';
import { UiCardComponent } from '@streakflow/ui/card';
import { UiInputComponent } from '@streakflow/ui/input';
import { UiSelectTriggerDirective, UiSelectContentComponent, UiSelectItemComponent } from '@streakflow/ui/select';

/**
 * HabitToolbar - search and filter controls for habits list
 * This is a DUMB component - presentation only
 */
@Component({
  selector: 'app-habit-toolbar',
  standalone: true,
  imports: [
    UiCardComponent,
    UiInputComponent,
    UiSelectTriggerDirective,
    UiSelectContentComponent,
    UiSelectItemComponent
  ],
  templateUrl: './habit-toolbar.component.html',
  styleUrl: './habit-toolbar.component.scss'
})
export class HabitToolbarComponent {
  // Two-way binding for search and filter
  readonly searchQuery = model<string>('');
  readonly frequencyFilter = model<string>('all');

  // Outputs for changes
  readonly searchChange = output<string>();
  readonly filterChange = output<string>();
}

