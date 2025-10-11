import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-action',
  standalone: true,
  template: '<div class="ui-card-action" [attr.data-slot]="\'card-action\'"><ng-content></ng-content></div>',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardActionComponent {
  readonly customClass = input<string>('');
}

