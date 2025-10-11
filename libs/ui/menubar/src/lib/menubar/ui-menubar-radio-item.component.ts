import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-radio-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-radio-item.component.html',
  host: {
    '[attr.data-slot]': '"menubar-radio-item"',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
    'class': 'ui-menubar-radio-item',
    'role': 'menuitemradio',
    '[attr.aria-checked]': 'checked()',
    '(click)': 'select()',
  },
})
export class UiMenubarRadioItemComponent {
  readonly value = input.required<string>();
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly selected = output<string>();

  select() {
    if (!this.disabled()) {
      this.selected.emit(this.value());
    }
  }
}

