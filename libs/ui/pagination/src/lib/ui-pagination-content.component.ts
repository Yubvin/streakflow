import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-pagination-content',
  standalone: true,
  template: '<ul [attr.data-slot]="\'pagination-content\'" class="ui-pagination-content"><ng-content></ng-content></ul>',
  styleUrls: ['./ui-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiPaginationContentComponent {
  readonly customClass = input<string>('');
}

