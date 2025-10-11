import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { UiRadioGroupComponent } from './ui-radio-group.component';

@Component({
  selector: 'ui-radio-item',
  standalone: true,
  templateUrl: './ui-radio-item.component.html',
  styleUrls: ['./ui-radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '"radio-group-item"',
    '[class]': 'customClass()',
  },
})
export class UiRadioItemComponent {
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly customClass = input<string>('');

  private radioGroup = inject(UiRadioGroupComponent, { optional: true });

  get isSelected(): boolean {
    return this.radioGroup?.value === this.value();
  }

  select(): void {
    if (this.disabled() || !this.radioGroup) return;
    this.radioGroup.selectValue(this.value());
  }
}

