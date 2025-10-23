import { Component, inject, computed, signal, input, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HabitService } from '../../core/services/habit.service';
import { ToastService } from '../../core/services/toast.service';
import { CustomValidators } from '../../core/utils/validators';
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
import { UiInputComponent } from '@streakflow/ui/input';
import { UiLabelComponent } from '@streakflow/ui/label';
import { UiSelectTriggerDirective, UiSelectContentComponent, UiSelectItemComponent } from '@streakflow/ui/select';

/**
 * Habit icons - declarative configuration
 */
const HABIT_ICONS = ['🎯', '💧', '💪', '📚', '🧘', '🏃', '🥗', '💤', '🎨', '🎵'] as const;

/**
 * Habit colors - declarative configuration
 */
const HABIT_COLORS = ['#4F46E5', '#06B6D4', '#22C55E', '#A855F7', '#F97316', '#EF4444'] as const;

/**
 * Weekday names - declarative configuration
 */
const WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

type FrequencyType = 'daily' | 'weekly' | 'custom';

const GOAL_LABELS: Record<FrequencyType, string> = {
  daily: 'Goal per day',
  weekly: 'Goal per week',
  custom: 'Goal per selected day'
};

const GOAL_PLACEHOLDERS: Record<FrequencyType, string> = {
  daily: 'e.g., 8 times/day',
  weekly: 'e.g., 5 times/week',
  custom: 'e.g., 3 times/day'
};

/**
 * EditHabitModal - modal for editing existing habit
 * This is a SMART component - uses services
 */
@Component({
  selector: 'app-edit-habit-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiDialogComponent,
    UiDialogContentComponent,
    UiDialogHeaderComponent,
    UiDialogTitleComponent,
    UiDialogDescriptionComponent,
    UiDialogFooterComponent,
    UiButtonComponent,
    UiInputComponent,
    UiLabelComponent,
    UiSelectTriggerDirective,
    UiSelectContentComponent,
    UiSelectItemComponent
  ],
  templateUrl: './edit-habit-modal.component.html',
  styleUrl: './edit-habit-modal.component.scss'
})
export class EditHabitModalComponent {
  private formBuilder = inject(FormBuilder);
  private habitService = inject(HabitService);
  private toastService = inject(ToastService);

  readonly habitToEdit = input<Habit | null>(null);
  readonly isOpen = signal(false);

  // Constants
  readonly icons = HABIT_ICONS;
  readonly colors = HABIT_COLORS;
  readonly weekdayNames = WEEKDAY_NAMES;

  // Form
  readonly form: FormGroup = this.formBuilder.group({
    name: ['', [CustomValidators.habitName()]],
    goal: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    frequency: ['daily' as FrequencyType],
    icon: ['🎯'],
    color: ['#4F46E5'],
    weekdays: [[true, true, true, true, true, true, true]]
  });

  // Computed values
  readonly goalLabel = computed(() => {
    const frequency = this.form.value.frequency as FrequencyType;
    return GOAL_LABELS[frequency];
  });

  readonly goalPlaceholder = computed(() => {
    const frequency = this.form.value.frequency as FrequencyType;
    return GOAL_PLACEHOLDERS[frequency];
  });

  readonly selectedDaysCount = computed(() => {
    const weekdays = this.form.value.weekdays as boolean[];
    return weekdays.filter(Boolean).length;
  });

  readonly showDaySelector = computed(() => {
    const frequency = this.form.value.frequency;
    return frequency === 'weekly' || frequency === 'custom';
  });

  readonly isFormValid = computed(() => {
    const isValid = this.form.valid;
    const hasSelectedDays = this.showDaySelector() 
      ? this.selectedDaysCount() > 0 
      : true;
    return isValid && hasSelectedDays;
  });

  constructor() {
    // Auto-populate form when habit changes
    effect(() => {
      const habit = this.habitToEdit();
      if (habit && this.isOpen()) {
        this.populateForm(habit);
      }
    });
  }

  /**
   * Opens modal with habit data
   */
  open(habit: Habit): void {
    this.populateForm(habit);
    this.isOpen.set(true);
  }

  /**
   * Closes modal
   */
  close(): void {
    this.isOpen.set(false);
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (!this.isFormValid()) return;

    const habit = this.habitToEdit();
    if (!habit) return;

    const updates = this.form.value;
    this.habitService.updateHabit(habit.id, updates);
    this.toastService.success('Habit updated successfully!');
    this.close();
  }

  /**
   * Selects icon
   */
  selectIcon(icon: string): void {
    this.form.patchValue({ icon });
  }

  /**
   * Selects color
   */
  selectColor(color: string): void {
    this.form.patchValue({ color });
  }

  /**
   * Toggles weekday selection
   */
  toggleDay(dayIndex: number): void {
    const weekdays = [...this.form.value.weekdays] as boolean[];
    weekdays[dayIndex] = !weekdays[dayIndex];
    this.form.patchValue({ weekdays });
  }

  /**
   * Handles frequency change
   */
  onFrequencyChange(frequency: FrequencyType): void {
    const weekdayPresets: Record<FrequencyType, boolean[]> = {
      daily: [true, true, true, true, true, true, true],
      weekly: [true, true, true, true, true, false, false],
      custom: [false, false, false, false, false, false, false]
    };

    this.form.patchValue({ 
      frequency,
      weekdays: weekdayPresets[frequency]
    });
  }

  /**
   * Populates form with habit data
   */
  private populateForm(habit: Habit): void {
    this.form.patchValue({
      name: habit.name,
      goal: habit.goal,
      frequency: habit.frequency,
      icon: habit.icon,
      color: habit.color,
      weekdays: habit.weekdays ?? [true, true, true, true, true, true, true]
    });
  }
}

