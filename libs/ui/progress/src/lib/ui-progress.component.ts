import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ui-progress',
  standalone: true,
  templateUrl: './ui-progress.component.html',
  styleUrls: ['./ui-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"progress"',
    '[class]': 'customClass()',
    role: 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
    '[attr.aria-valuenow]': 'value()',
  },
})
export class UiProgressComponent {
  readonly value = input<number>(0);
  readonly customClass = input<string>('');

  readonly transform = computed(() => {
    const val = Math.min(100, Math.max(0, this.value()));
    return `translateX(-${100 - val}%)`;
  });
}

