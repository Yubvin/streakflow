import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-menubar-item.component.html',
  host: {
    '[attr.data-slot]': '"menubar-item"',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
    '[attr.data-inset]': 'inset() ? "true" : null',
    '[attr.data-variant]': 'variant()',
    'class': 'ui-menubar-item',
    'role': 'menuitem',
    '(click)': 'handleClick()',
  },
})
export class UiMenubarItemComponent {
  readonly disabled = input<boolean>(false);
  readonly inset = input<boolean>(false);
  readonly variant = input<'default' | 'destructive'>('default');
  readonly selected = output<void>();

  handleClick() {
    if (!this.disabled()) {
      this.selected.emit();
    }
  }
}

