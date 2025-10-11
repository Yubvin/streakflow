import { ChangeDetectionStrategy, Component, input, inject, TemplateRef, ViewContainerRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'ui-popover-content',
  standalone: true,
  template: `
    <div 
      class="ui-popover-content" 
      data-slot="popover-content"
      [attr.data-side]="side()"
      [attr.data-state]="state()"
      #content
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ui-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPopoverContentComponent implements AfterViewInit {
  readonly side = input<'top' | 'bottom' | 'left' | 'right'>('bottom');
  readonly state = input<'open' | 'closed'>('open');

  @ViewChild('content', { static: true }) content!: ElementRef;

  ngAfterViewInit(): void {
    // Add arrow element after content is rendered
    this.addArrow();
  }

  private addArrow(): void {
    const arrow = document.createElement('div');
    arrow.className = 'ui-popover-arrow';
    
    const contentEl = this.content.nativeElement;
    contentEl.appendChild(arrow);
  }
}
