import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type UiToggleVariant = 'default' | 'outline';
export type UiToggleSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'ui-toggle',
  standalone: true,
  templateUrl: './ui-toggle.component.html',
  styleUrls: ['./ui-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"toggle"',
    '[class]': 'customClass()',
  },
})
export class UiToggleComponent {
  readonly variant = input<UiToggleVariant>('default');
  readonly size = input<UiToggleSize>('default');
  readonly disabled = input<boolean>(false);
  readonly pressed = input<boolean>(false);
  readonly customClass = input<string>('');
  readonly pressedChange = output<boolean>();

  toggle(): void {
    if (this.disabled()) return;
    this.pressedChange.emit(!this.pressed());
  }
}

