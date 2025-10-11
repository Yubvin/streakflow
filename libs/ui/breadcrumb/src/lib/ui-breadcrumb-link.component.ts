import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-breadcrumb-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ui-breadcrumb-link.component.html',
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

