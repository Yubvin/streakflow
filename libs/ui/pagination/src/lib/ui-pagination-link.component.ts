import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { RouterModule } from '@angular/router';

export type UiPaginationLinkSize = 'default' | 'icon';

@Component({
  selector: 'ui-pagination-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ui-pagination-link.component.html',
  styleUrls: ['./ui-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiPaginationLinkComponent {
  readonly href = input<string | any[]>('');
  readonly isActive = input<boolean>(false);
  readonly size = input<UiPaginationLinkSize>('icon');
  readonly customClass = input<string>('');

  readonly variant = computed(() => this.isActive() ? 'outline' : 'ghost');
}

