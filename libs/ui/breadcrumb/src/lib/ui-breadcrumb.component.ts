import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  templateUrl: './ui-breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbComponent {
  readonly customClass = input<string>('');
}

