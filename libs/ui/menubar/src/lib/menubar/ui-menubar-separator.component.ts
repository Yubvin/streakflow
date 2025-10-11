import { Component } from '@angular/core';

@Component({
  selector: 'ui-menubar-separator',
  standalone: true,
  template: '',
  host: {
    '[attr.data-slot]': '"menubar-separator"',
    'class': 'ui-menubar-separator',
    'role': 'separator',
  },
})
export class UiMenubarSeparatorComponent {}

