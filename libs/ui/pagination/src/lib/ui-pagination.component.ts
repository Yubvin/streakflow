import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  template: '<nav role="navigation" aria-label="pagination" [attr.data-slot]="\'pagination\'" class="ui-pagination"><ng-content></ng-content></nav>',
  styleUrls: ['./ui-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiPaginationComponent {
  readonly customClass = input<string>('');
}

