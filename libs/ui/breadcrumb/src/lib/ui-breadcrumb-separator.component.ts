import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-separator',
  standalone: true,
  templateUrl: './ui-breadcrumb-separator.component.html',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbSeparatorComponent {
  readonly customClass = input<string>('');
}

