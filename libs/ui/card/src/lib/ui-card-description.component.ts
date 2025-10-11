import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-description',
  standalone: true,
  template: '<p class="ui-card-description" [attr.data-slot]="\'card-description\'"><ng-content></ng-content></p>',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardDescriptionComponent {
  readonly customClass = input<string>('');
}

