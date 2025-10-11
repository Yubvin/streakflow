import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-tooltip-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [attr.data-slot]="'tooltip-content'"
      [attr.data-side]="side"
      class="ui-tooltip-content"
    >
      {{ content }}
      <div class="ui-tooltip-arrow"></div>
    </div>
  `,
  styleUrls: ['./ui-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTooltipContentComponent {
  content: string = '';
  side: 'top' | 'bottom' | 'left' | 'right' = 'top';
}

