import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  templateUrl: './ui-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"tooltip"',
  },
})
export class UiTooltipComponent {
  readonly delayDuration = input<number>(0);
}

