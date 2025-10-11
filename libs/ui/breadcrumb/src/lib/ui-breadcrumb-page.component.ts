import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-page',
  standalone: true,
  template: '<span [attr.data-slot]="\'breadcrumb-page\'" role="link" aria-disabled="true" aria-current="page" class="ui-breadcrumb-page"><ng-content></ng-content></span>',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbPageComponent {
  readonly customClass = input<string>('');
}

