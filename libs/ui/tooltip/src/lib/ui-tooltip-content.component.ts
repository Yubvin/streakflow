import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-tooltip-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-tooltip-content.component.html',
  styleUrls: ['./ui-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTooltipContentComponent {
  content: string = '';
  side: 'top' | 'bottom' | 'left' | 'right' = 'top';
}

