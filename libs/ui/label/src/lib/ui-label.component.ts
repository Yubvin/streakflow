import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-label',
  standalone: true,
  templateUrl: './ui-label.component.html',
  styleUrls: ['./ui-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"label"',
    '[class]': 'customClass()',
    '[attr.for]': 'for()',
  },
})
export class UiLabelComponent {
  readonly for = input<string>('');
  readonly customClass = input<string>('');
}

