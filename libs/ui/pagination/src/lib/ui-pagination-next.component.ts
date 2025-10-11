import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-pagination-next',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ui-pagination-next.component.html',
  styleUrls: ['./ui-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiPaginationNextComponent {
  readonly href = input<string | any[]>('');
  readonly customClass = input<string>('');
}

