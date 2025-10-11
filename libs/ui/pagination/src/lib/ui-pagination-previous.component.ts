import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-pagination-previous',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ui-pagination-previous.component.html',
  styleUrls: ['./ui-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiPaginationPreviousComponent {
  readonly href = input<string | any[]>('');
  readonly customClass = input<string>('');
}

