import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-menubar-checkbox-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ui-menubar-checkbox-item.component.html',
  host: {
    '[attr.data-slot]': '"menubar-checkbox-item"',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
    'class': 'ui-menubar-checkbox-item',
    'role': 'menuitemcheckbox',
    '[attr.aria-checked]': 'checked()',
    '(click)': 'toggle()',
  },
})
export class UiMenubarCheckboxItemComponent {
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);

  toggle() {
    if (!this.disabled()) {
      this.checked.update(v => !v);
    }
  }
}

