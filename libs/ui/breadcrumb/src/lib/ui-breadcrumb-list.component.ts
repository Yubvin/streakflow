import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-list',
  standalone: true,
  templateUrl: './ui-breadcrumb-list.component.html',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbListComponent {
  readonly customClass = input<string>('');
}

