import { Component, inject, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../../core/services/habit.service';
import { ToastService } from '../../core/services/toast.service';
import { Habit } from '../../core/models/habit.model';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { HabitToolbarComponent } from '../../shared/components/habit-toolbar/habit-toolbar.component';
import { HabitStatusControlsComponent } from '../../shared/components/habit-status-controls/habit-status-controls.component';
import { AddHabitModalComponent } from '../../modals/add-habit-modal/add-habit-modal.component';
import { EditHabitModalComponent } from '../../modals/edit-habit-modal/edit-habit-modal.component';
import { DeleteHabitModalComponent } from '../../modals/delete-habit-modal/delete-habit-modal.component';
import { RelativeTimePipe } from '../../shared/pipes/relative-time.pipe';
import { 
  TableComponent, 
  TableHeaderComponent, 
  TableBodyComponent, 
  TableRowComponent,
  TableHeadComponent,
  TableCellComponent
} from '../../shared/components/table/table.component';
import { UiCardComponent } from '@streakflow/ui/card';
import { UiBadgeComponent } from '@streakflow/ui/badge';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiDropdownMenuTriggerDirective, UiDropdownMenuContentComponent, UiDropdownMenuItemComponent } from '@streakflow/ui/dropdown-menu';

/**
 * Habits - habits list screen with table view
 * This is a SMART component - manages data
 */
@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [
    FormsModule,
    PageHeaderComponent,
    EmptyStateComponent,
    HabitToolbarComponent,
    HabitStatusControlsComponent,
    AddHabitModalComponent,
    EditHabitModalComponent,
    DeleteHabitModalComponent,
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeadComponent,
    TableCellComponent,
    UiCardComponent,
    UiBadgeComponent,
    UiButtonComponent,
    UiDropdownMenuTriggerDirective,
    UiDropdownMenuContentComponent,
    UiDropdownMenuItemComponent,
    RelativeTimePipe
  ],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss'
})
export class HabitsComponent {
  private habitService = inject(HabitService);
  private toastService = inject(ToastService);

  readonly addHabitModal = viewChild.required(AddHabitModalComponent);
  readonly editHabitModal = viewChild.required(EditHabitModalComponent);
  readonly deleteHabitModal = viewChild.required(DeleteHabitModalComponent);

  readonly habits = this.habitService.activeHabits;
  readonly searchQuery = signal('');
  readonly frequencyFilter = signal('all');
  readonly habitToEdit = signal<Habit | null>(null);
  readonly habitToDelete = signal<Habit | null>(null);

  readonly filteredHabits = computed(() => {
    return this.habitService.filterHabits(
      this.searchQuery(),
      this.frequencyFilter()
    );
  });

  onAddHabit(): void {
    this.addHabitModal().open();
  }

  onMarkComplete(habitId: string): void {
    this.habitService.markHabitToday(habitId);
    this.toastService.success('Habit marked as complete!');
  }

  onIncrement(habitId: string): void {
    this.habitService.incrementHabitStep(habitId);
    this.toastService.success('Progress updated!');
  }

  onUndo(habitId: string): void {
    this.habitService.undoHabitStep(habitId);
    this.toastService.info('Progress undone');
  }

  onEditHabit(habitId: string): void {
    const habit = this.habitService.getHabitById(habitId);
    if (!habit) return;
    
    this.habitToEdit.set(habit);
    this.editHabitModal().open(habit);
  }

  onViewHistory(habitId: string): void {
    // TODO: Open ViewHistoryModal (Phase 9)
    this.toastService.info('View history - coming in Phase 9!');
  }

  onDeleteHabit(habitId: string): void {
    const habit = this.habitService.getHabitById(habitId);
    if (!habit) return;
    
    this.habitToDelete.set(habit);
    this.deleteHabitModal().open(habit);
  }

  onClearFilters(): void {
    this.searchQuery.set('');
    this.frequencyFilter.set('all');
  }
}
