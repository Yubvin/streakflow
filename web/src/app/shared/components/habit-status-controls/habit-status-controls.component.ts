import { Component, input, output, computed, signal } from '@angular/core';
import { Habit } from '../../../core/models/habit.model';
import { HabitUtils } from '../../../core/utils/habit.utils';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiTooltipTriggerDirective } from '@streakflow/ui/tooltip';

/**
 * Habit control state - discriminated union
 */
type HabitControlState =
  | { kind: 'completed' }
  | { kind: 'multi'; canIncrement: boolean; canUndo: boolean }
  | { kind: 'single' };

type ControlHandler = () => void;

/**
 * Pure function to resolve action
 */
function resolveControlAction(
  state: HabitControlState,
  registry: Record<HabitControlState['kind'], ControlHandler>
): ControlHandler {
  return registry[state.kind];
}

/**
 * HabitStatusControls - compact controls for habit status (for table view)
 * This is a DUMB component - presentation only
 */
@Component({
  selector: 'app-habit-status-controls',
  standalone: true,
  imports: [UiButtonComponent, UiTooltipTriggerDirective],
  templateUrl: './habit-status-controls.component.html',
  styleUrl: './habit-status-controls.component.scss'
})
export class HabitStatusControlsComponent {
  // Inputs
  readonly habit = input.required<Habit>();

  // Outputs
  readonly markComplete = output<void>();
  readonly increment = output<void>();
  readonly undo = output<void>();

  // Local UI state
  readonly isAnimating = signal(false);

  // Computed values for display
  readonly isMultiGoal = computed(() => HabitUtils.isMultiGoal(this.habit()));
  readonly isCompleted = computed(() => HabitUtils.isCompleted(this.habit()));
  readonly currentProgress = computed(() => this.habit().currentStep);
  readonly totalGoal = computed(() => this.habit().goal);
  readonly progressPercentage = computed(() => 
    HabitUtils.calculateProgress(this.currentProgress(), this.totalGoal())
  );
  readonly showUndoButton = computed(() => {
    const progress = this.currentProgress();
    return progress > 0 && !this.isCompleted();
  });

  // Computed state for control dispatch
  readonly controlState = computed((): HabitControlState => {
    const habit = this.habit();
    
    if (HabitUtils.isCompleted(habit)) {
      return { kind: 'completed' };
    }
    
    if (HabitUtils.isMultiGoal(habit)) {
      return {
        kind: 'multi',
        canIncrement: habit.currentStep < habit.goal,
        canUndo: habit.currentStep > 0
      };
    }
    
    return { kind: 'single' };
  });

  /**
   * Handles increment button click
   * Uses dispatch table pattern - no branching
   */
  onIncrementClick(): void {
    const state = this.controlState();
    
    const actionByKind: Record<HabitControlState['kind'], ControlHandler> = {
      completed: () => {}, // No-op for completed
      multi:     () => this.emitIncrement(),
      single:    () => {}, // No-op for single (uses mark button)
    };
    
    resolveControlAction(state, actionByKind)();
  }

  /**
   * Handles mark complete button click
   * Uses dispatch table pattern - no branching
   */
  onMarkCompleteClick(): void {
    const state = this.controlState();
    
    const actionByKind: Record<HabitControlState['kind'], ControlHandler> = {
      completed: () => {}, // No-op for completed
      multi:     () => {}, // No-op for multi (uses increment)
      single:    () => this.emitMark(),
    };
    
    resolveControlAction(state, actionByKind)();
  }

  /**
   * Handles undo button click
   * Uses dispatch table pattern - no branching
   */
  onUndoClick(): void {
    const state = this.controlState();
    
    const actionByKind: Record<HabitControlState['kind'], ControlHandler> = {
      completed: () => {}, // No-op for completed
      multi:     () => this.emitUndo(),
      single:    () => {}, // No-op for single
    };
    
    resolveControlAction(state, actionByKind)();
  }

  /**
   * Emits mark event with animation
   */
  private emitMark(): void {
    this.animate();
    this.markComplete.emit();
  }

  /**
   * Emits increment event with animation
   */
  private emitIncrement(): void {
    this.animate();
    this.increment.emit();
  }

  /**
   * Emits undo event with animation
   */
  private emitUndo(): void {
    this.animate();
    this.undo.emit();
  }

  /**
   * Triggers UI animation
   */
  private animate(): void {
    this.isAnimating.set(true);
    setTimeout(() => this.isAnimating.set(false), 300);
  }
}


