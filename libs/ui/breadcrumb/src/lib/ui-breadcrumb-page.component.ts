import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-page',
  standalone: true,
  templateUrl: './ui-breadcrumb-page.component.html',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbPageComponent {
  readonly customClass = input<string>('');
}

