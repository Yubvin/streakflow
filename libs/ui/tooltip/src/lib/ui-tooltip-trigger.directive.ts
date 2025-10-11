import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
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

    const side = this.tooltipSide();
    const offset = this.sideOffset() || 8;

    let positions: ConnectedPosition[];
    if (side === 'top') {
      positions = [{
        originX: 'center' as const,
        originY: 'top' as const,
        overlayX: 'center' as const,
        overlayY: 'bottom' as const,
        offsetY: -offset,
      }];
    } else if (side === 'bottom') {
      positions = [{
        originX: 'center' as const,
        originY: 'bottom' as const,
        overlayX: 'center' as const,
        overlayY: 'top' as const,
        offsetY: offset,
      }];
    } else if (side === 'left') {
      positions = [{
        originX: 'start' as const,
        originY: 'center' as const,
        overlayX: 'end' as const,
        overlayY: 'center' as const,
        offsetX: -offset,
      }];
    } else {
      positions = [{
        originX: 'end' as const,
        originY: 'center' as const,
        overlayX: 'start' as const,
        overlayY: 'center' as const,
        offsetX: offset,
      }];
    }

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    const portal = new ComponentPortal(UiTooltipContentComponent);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.content = this.tooltipText();
    componentRef.instance.side = side;
  }

  @HostListener('mouseleave')
  hide(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}

