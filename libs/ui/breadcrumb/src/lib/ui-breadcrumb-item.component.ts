import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-item',
  standalone: true,
  template: '<li [attr.data-slot]="\'breadcrumb-item\'" class="ui-breadcrumb-item"><ng-content></ng-content></li>',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbItemComponent {
  readonly customClass = input<string>('');
}

