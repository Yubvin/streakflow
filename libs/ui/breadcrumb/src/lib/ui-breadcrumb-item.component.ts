import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-item',
  standalone: true,
  templateUrl: './ui-breadcrumb-item.component.html',
  styleUrls: ['./ui-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbItemComponent {
  readonly customClass = input<string>('');
}

