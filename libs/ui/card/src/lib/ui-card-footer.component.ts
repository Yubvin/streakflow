import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-card-footer',
  standalone: true,
  template: '<div class="ui-card-footer" [attr.data-slot]="\'card-footer\'"><ng-content></ng-content></div>',
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiCardFooterComponent {
  readonly customClass = input<string>('');
}

