import { Component, input, output, computed, signal } from '@angular/core';
import { Habit } from '../../../core/models/habit.model';
import { HabitUtils } from '../../../core/utils/habit.utils';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiProgressComponent } from '@streakflow/ui/progress';
import { UiCardComponent } from '@streakflow/ui/card';

/**
 * Habit action state - discriminated union for all possible states
 */
type HabitActionState =
  | { kind: 'completed' }
  | { kind: 'multi'; current: number; target: number }
  | { kind: 'single' };

type ActionHandler = () => void;

/**
 * Pure function to resolve action based on state
 * No side effects - deterministic and testable
 */
function resolveAction(
  state: HabitActionState,
  registry: Record<HabitActionState['kind'], ActionHandler>
): ActionHandler {
  return registry[state.kind];
}

/**
 * HabitCard - displays habit information and controls
 * This is a DUMB component - presentation only
 */
@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [
    UiButtonComponent, 
    UiProgressComponent, 
    UiCardComponent
  ],
  templateUrl: './habit-card.component.html',
  styleUrl: './habit-card.component.scss'
})
export class HabitCardComponent {
  // Inputs
  readonly habit = input.required<Habit>();

  // Outputs
  readonly markToday = output<void>();
  readonly incrementStep = output<void>();
  readonly undoToday = output<void>();

  // Local UI state (animation only)
  readonly isAnimating = signal(false);

  // Computed values for display
  readonly isMultiGoal = computed(() => HabitUtils.isMultiGoal(this.habit()));
  readonly isCompleted = computed(() => HabitUtils.isCompleted(this.habit()));
  readonly displayProgress = computed(() => 
    HabitUtils.calculateProgress(this.habit().currentStep, this.habit().goal)
  );
  readonly streakText = computed(() => HabitUtils.formatStreak(this.habit().currentStreak));
  readonly showUndoButton = computed(() => {
    const habit = this.habit();
    return habit.currentStep > 0 && !this.isCompleted();
  });

  // Computed state for action dispatch
  readonly actionState = computed((): HabitActionState => {
    const habit = this.habit();
    
    if (HabitUtils.isCompleted(habit)) {
      return { kind: 'completed' };
    }
    
    if (HabitUtils.isMultiGoal(habit)) {
      return { 
        kind: 'multi', 
        current: habit.currentStep, 
        target: habit.goal 
      };
    }
    
    return { kind: 'single' };
  });

  /**
   * Handles main action button click
   * Uses dispatch table pattern - no branching in handler
   */
  onActionClick(): void {
    const state = this.actionState();
    
    const actionByKind: Record<HabitActionState['kind'], ActionHandler> = {
      completed: () => this.emitUndo(),
      multi:     () => this.emitIncrement(),
      single:    () => this.emitMark(),
    };
    
    resolveAction(state, actionByKind)();
  }

  /**
   * Handles undo button click
   */
  onUndoClick(): void {
    this.emitUndo();
  }

  /**
   * Emits mark event with animation
   */
  private emitMark(): void {
    this.animate();
    this.markToday.emit();
  }

  /**
   * Emits increment event with animation
   */
  private emitIncrement(): void {
    this.animate();
    this.incrementStep.emit();
  }

  /**
   * Emits undo event with animation
   */
  private emitUndo(): void {
    this.animate();
    this.undoToday.emit();
  }

  /**
   * Triggers UI animation
   */
  private animate(): void {
    this.isAnimating.set(true);
    setTimeout(() => this.isAnimating.set(false), 300);
  }
}


