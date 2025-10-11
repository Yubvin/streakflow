import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: '<div class="ui-card" [attr.data-slot]="\'card\'"><ng-content></ng-content></div>',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardComponent {
  readonly customClass = input<string>('');
}

