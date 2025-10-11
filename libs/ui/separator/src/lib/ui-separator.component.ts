import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type UiSeparatorOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-separator',
  standalone: true,
  templateUrl: './ui-separator.component.html',
  styleUrls: ['./ui-separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-slot]': '"separator-root"',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class UiSeparatorComponent {
  readonly orientation = input<UiSeparatorOrientation>('horizontal');
}
