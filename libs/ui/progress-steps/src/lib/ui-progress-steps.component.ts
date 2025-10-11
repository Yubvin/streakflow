import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-progress-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-progress-steps.component.html',
  styleUrls: ['./ui-progress-steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"progress-steps"',
    '[class]': 'customClass()',
  },
})
export class UiProgressStepsComponent {
  readonly steps = input<number>(3);
  readonly current = input<number>(0);
  readonly animating = input<boolean>(false);
  readonly customClass = input<string>('');

  readonly stepsArray = computed(() => {
    return Array.from({ length: this.steps() }, (_, i) => i);
  });

  getStepClass(index: number): string {
    const current = this.current();
    const animating = this.animating();

    if (index < current) {
      return 'completed';
    } else if (index === current && animating) {
      return 'animating';
    } else {
      return 'pending';
    }
  }
}

