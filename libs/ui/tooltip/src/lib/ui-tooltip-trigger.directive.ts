import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UiTooltipContentComponent } from './ui-tooltip-content.component';

@Directive({
  selector: '[uiTooltipTrigger]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"tooltip-trigger"',
  },
})
export class UiTooltipTriggerDirective {
  readonly tooltipText = input.required<string>({ alias: 'uiTooltipTrigger' });
  readonly tooltipSide = input<'top' | 'bottom' | 'left' | 'right'>('top', { alias: 'tooltipSide' });
  readonly sideOffset = input<number>(0, { alias: 'tooltipSideOffset' });

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private overlayRef: OverlayRef | null = null;

  @HostListener('mouseenter')
  show(): void {
    if (this.overlayRef) return;

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: this.tooltipSide() === 'bottom' ? 'bottom' : 'top',
          overlayX: 'center',
          overlayY: this.tooltipSide() === 'bottom' ? 'top' : 'bottom',
          offsetY: this.tooltipSide() === 'bottom' ? this.sideOffset() : -this.sideOffset(),
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    const portal = new ComponentPortal(UiTooltipContentComponent);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.content = this.tooltipText();
    componentRef.instance.side = this.tooltipSide();
  }

  @HostListener('mouseleave')
  hide(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}

