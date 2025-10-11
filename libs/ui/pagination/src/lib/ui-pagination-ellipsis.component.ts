import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-pagination-ellipsis',
  standalone: true,
  templateUrl: './ui-pagination-ellipsis.component.html',
  styleUrls: ['./ui-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiPaginationEllipsisComponent {
  readonly customClass = input<string>('');
}

