import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-context-menu-label',
  standalone: true,
  templateUrl: './ui-context-menu-label.component.html',
  styleUrls: ['./ui-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContextMenuLabelComponent {}
