import { Component, inject, signal, input } from '@angular/core';
import { HabitService } from '../../core/services/habit.service';
import { ToastService } from '../../core/services/toast.service';
import { Habit } from '../../core/models/habit.model';
import { 
  UiDialogComponent,
  UiDialogContentComponent,
  UiDialogHeaderComponent,
  UiDialogTitleComponent,
  UiDialogDescriptionComponent,
  UiDialogFooterComponent
} from '@streakflow/ui/dialog';
import { UiButtonComponent } from '@streakflow/ui/button';

/**
 * DeleteHabitModal - confirmation modal for deleting habit
 * This is a SMART component - uses services
 */
@Component({
  selector: 'app-delete-habit-modal',
  standalone: true,
  imports: [
    UiDialogComponent,
    UiDialogContentComponent,
    UiDialogHeaderComponent,
    UiDialogTitleComponent,
    UiDialogDescriptionComponent,
    UiDialogFooterComponent,
    UiButtonComponent
  ],
  templateUrl: './delete-habit-modal.component.html',
  styleUrl: './delete-habit-modal.component.scss'
})
export class DeleteHabitModalComponent {
  private habitService = inject(HabitService);
  private toastService = inject(ToastService);

  readonly habitToDelete = input<Habit | null>(null);
  readonly isOpen = signal(false);

  /**
   * Opens modal with habit
   */
  open(habit: Habit): void {
    this.isOpen.set(true);
  }

  /**
   * Closes modal
   */
  close(): void {
    this.isOpen.set(false);
  }

  /**
   * Confirms deletion
   */
  onConfirm(): void {
    const habit = this.habitToDelete();
    if (!habit) return;

    this.habitService.deleteHabit(habit.id);
    this.toastService.success('Habit deleted successfully');
    this.close();
  }
}

