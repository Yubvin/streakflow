import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-radio-group.component.html',
  host: {
    '[attr.data-slot]': '"menubar-radio-group"',
    'class': 'ui-menubar-radio-group',
    'role': 'group',
  },
})
export class UiMenubarRadioGroupComponent {
  readonly value = model<string>('');

  setValue(newValue: string) {
    this.value.set(newValue);
  }
}

