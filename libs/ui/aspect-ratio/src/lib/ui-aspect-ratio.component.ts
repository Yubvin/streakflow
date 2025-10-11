import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ui-aspect-ratio',
  standalone: true,
  templateUrl: './ui-aspect-ratio.component.html',
  styleUrls: ['./ui-aspect-ratio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"aspect-ratio"',
    '[class]': 'customClass()',
  },
})
export class UiAspectRatioComponent {
  readonly ratio = input<number>(16 / 9);
  readonly customClass = input<string>('');

  readonly paddingBottom = computed(() => {
    return `${(1 / this.ratio()) * 100}%`;
  });
}

