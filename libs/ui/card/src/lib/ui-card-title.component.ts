import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-title',
  standalone: true,
  template: '<h4 class="ui-card-title" [attr.data-slot]="\'card-title\'"><ng-content></ng-content></h4>',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardTitleComponent {
  readonly customClass = input<string>('');
}

