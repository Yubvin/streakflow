import { Component, inject, computed, viewChild } from '@angular/core';
import { HabitService } from '../../core/services/habit.service';
import { ToastService } from '../../core/services/toast.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { HabitCardComponent } from '../../shared/components/habit-card/habit-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { AddHabitModalComponent } from '../../modals/add-habit-modal/add-habit-modal.component';
import { KPIData } from '../../core/models/analytics.model';

/**
 * Dashboard - main screen with KPIs and habit cards
 * This is a SMART component - manages data
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PageHeaderComponent,
    KpiCardComponent,
    HabitCardComponent,
    EmptyStateComponent,
    AddHabitModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private habitService = inject(HabitService);
  private toastService = inject(ToastService);

  readonly addHabitModal = viewChild.required(AddHabitModalComponent);

  // Data from service
  readonly habits = this.habitService.activeHabits;
  readonly stats = this.habitService.stats;

  // KPI Data
  readonly kpiData = computed((): KPIData[] => {
    const statsData = this.stats();
    return [
      {
        title: "Today's Completion",
        value: `${statsData.completionRate}%`,
        icon: '🎯',
        trend: 'up',
        trendValue: '+5% from yesterday'
      },
      {
        title: 'Active Habits',
        value: statsData.totalHabits,
        icon: '✅',
        trend: 'neutral',
        trendValue: 'Total tracked'
      },
      {
        title: 'Average Streak',
        value: `${statsData.averageStreak} days`,
        icon: '🔥',
        trend: 'up',
        trendValue: 'Across all habits'
      },
      {
        title: 'Longest Streak',
        value: `${statsData.longestStreak} days`,
        icon: '🏆',
        trend: 'neutral',
        trendValue: 'Personal best'
      }
    ];
  });

  // Actions
  onMarkHabit(habitId: string): void {
    this.habitService.markHabitToday(habitId);
    this.toastService.success('Habit marked as complete! 🎉');
  }

  onIncrementStep(habitId: string): void {
    this.habitService.incrementHabitStep(habitId);
    this.toastService.success('Progress updated!');
  }

  onUndoStep(habitId: string): void {
    this.habitService.undoHabitStep(habitId);
    this.toastService.info('Progress undone');
  }

  onAddHabit(): void {
    this.addHabitModal().open();
  }
}

