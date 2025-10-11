import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-pagination-previous',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a 
      [routerLink]="href()"
      aria-label="Go to previous page"
      [attr.data-slot]="'pagination-link'"
      [attr.data-variant]="'ghost'"
      [attr.data-size]="'default'"
      class="ui-pagination-link ui-pagination-previous"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      <span class="hidden sm:block">Previous</span>
    </a>
  `,
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

