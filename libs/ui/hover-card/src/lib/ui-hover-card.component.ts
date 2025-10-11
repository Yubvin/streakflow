import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-hover-card',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"hover-card"',
  },
})
export class UiHoverCardComponent {}

