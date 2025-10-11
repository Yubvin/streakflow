import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-pagination-ellipsis',
  standalone: true,
  template: `
    <span [attr.data-slot]="'pagination-ellipsis'" aria-hidden="true" class="ui-pagination-ellipsis">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <circle cx="12" cy="12" r="1"/>
        <circle cx="19" cy="12" r="1"/>
        <circle cx="5" cy="12" r="1"/>
      </svg>
      <span class="sr-only">More pages</span>
    </span>
  `,
  styleUrls: ['./ui-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiPaginationEllipsisComponent {
  readonly customClass = input<string>('');
}

