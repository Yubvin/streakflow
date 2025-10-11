import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-pagination-item',
  standalone: true,
  template: '<li [attr.data-slot]="\'pagination-item\'"><ng-content></ng-content></li>',
  styleUrls: ['./ui-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiPaginationItemComponent {
  readonly customClass = input<string>('');
}

