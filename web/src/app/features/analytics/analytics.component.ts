import { Component, inject } from '@angular/core';
import { HabitService } from '../../core/services/habit.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

/**
 * Analytics - analytics and insights screen
 * This is a SMART component - manages data
 */
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    PageHeaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  private habitService = inject(HabitService);

  readonly habits = this.habitService.activeHabits;
}

