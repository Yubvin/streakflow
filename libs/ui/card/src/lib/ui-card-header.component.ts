import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-header',
  standalone: true,
  template: '<div class="ui-card-header" [attr.data-slot]="\'card-header\'"><ng-content></ng-content></div>',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardHeaderComponent {
  readonly customClass = input<string>('');
}

