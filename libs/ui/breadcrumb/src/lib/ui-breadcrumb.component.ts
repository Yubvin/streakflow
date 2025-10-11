import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  template: '<nav aria-label="breadcrumb" [attr.data-slot]="\'breadcrumb\'"><ng-content></ng-content></nav>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass()',
  },
})
export class UiBreadcrumbComponent {
  readonly customClass = input<string>('');
}

