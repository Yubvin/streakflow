import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-context-menu-separator',
  standalone: true,
  templateUrl: './ui-context-menu-separator.component.html',
  styleUrls: ['./ui-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContextMenuSeparatorComponent {}
