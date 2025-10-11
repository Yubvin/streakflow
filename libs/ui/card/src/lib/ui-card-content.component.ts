import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-content',
  standalone: true,
  template: '<div class="ui-card-content" [attr.data-slot]="\'card-content\'"><ng-content></ng-content></div>',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardContentComponent {
  readonly customClass = input<string>('');
}

