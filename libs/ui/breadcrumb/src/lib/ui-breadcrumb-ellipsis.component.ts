import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-ellipsis',
  standalone: true,
  templateUrl: './ui-breadcrumb-ellipsis.component.html',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbEllipsisComponent {
  readonly customClass = input<string>('');
}

