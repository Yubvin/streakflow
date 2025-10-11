import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"tooltip"',
  },
})
export class UiTooltipComponent {
  readonly delayDuration = input<number>(0);
}

