import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-list',
  standalone: true,
  template: '<ol [attr.data-slot]="\'breadcrumb-list\'" class="ui-breadcrumb-list"><ng-content></ng-content></ol>',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbListComponent {
  readonly customClass = input<string>('');
}

