import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { RouterModule } from '@angular/router';

export type UiPaginationLinkSize = 'default' | 'icon';

@Component({
  selector: 'ui-pagination-link',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a 
      [routerLink]="href()"
      [attr.data-slot]="'pagination-link'"
      [attr.data-active]="isActive()"
      [attr.aria-current]="isActive() ? 'page' : null"
      [attr.data-variant]="variant()"
      [attr.data-size]="size()"
      class="ui-pagination-link"
    >
      <ng-content></ng-content>
    </a>
  `,
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

