import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-hover-card',
  standalone: true,
  templateUrl: './ui-hover-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"hover-card"',
  },
})
export class UiHoverCardComponent {}

