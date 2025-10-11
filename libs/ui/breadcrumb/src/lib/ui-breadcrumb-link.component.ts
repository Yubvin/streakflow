import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-breadcrumb-link',
  standalone: true,
  imports: [RouterModule],
  template: '<a [attr.data-slot]="\'breadcrumb-link\'" [routerLink]="href()" class="ui-breadcrumb-link"><ng-content></ng-content></a>',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbLinkComponent {
  readonly href = input<string | any[]>('');
  readonly customClass = input<string>('');
}

