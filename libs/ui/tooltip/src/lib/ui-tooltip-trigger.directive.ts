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

    const side = this.tooltipSide();
    const offset = this.sideOffset() || 8; // Увеличил default offset до 8px

    // Определяем позицию в зависимости от side
    let positions;
    if (side === 'top') {
      positions = [{
        originX: 'center', originY: 'top',
        overlayX: 'center', overlayY: 'bottom',
        offsetY: -offset,
      }];
    } else if (side === 'bottom') {
      positions = [{
        originX: 'center', originY: 'bottom',
        overlayX: 'center', overlayY: 'top',
        offsetY: offset,
      }];
    } else if (side === 'left') {
      positions = [{
        originX: 'start', originY: 'center',
        overlayX: 'end', overlayY: 'center',
        offsetX: -offset,
      }];
    } else { // right
      positions = [{
        originX: 'end', originY: 'center',
        overlayX: 'start', overlayY: 'center',
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

