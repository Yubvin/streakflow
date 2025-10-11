import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-dropdown-menu-label',
  standalone: true,
  templateUrl: './ui-dropdown-menu-label.component.html',
  styleUrls: ['./ui-dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdownMenuLabelComponent {}
