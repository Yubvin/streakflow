import { Directive, ElementRef, HostListener, inject, TemplateRef, ViewContainerRef, input } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[uiHoverCardTrigger]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"hover-card-trigger"',
  },
})
export class UiHoverCardTriggerDirective {
  readonly contentTemplate = input.required<TemplateRef<any>>({ alias: 'uiHoverCardTrigger' });
  readonly side = input<'top' | 'bottom' | 'left' | 'right'>('bottom', { alias: 'hoverCardSide' });
  readonly align = input<'start' | 'center' | 'end'>('center', { alias: 'hoverCardAlign' });
  readonly sideOffset = input<number>(4, { alias: 'hoverCardSideOffset' });

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private hideTimeout: any;
  private showTimeout: any;

  @HostListener('mouseenter')
  show(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    if (this.overlayRef) return;

    // Debounce показ чтобы избежать мигания
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    this.showTimeout = setTimeout(() => {
      if (this.overlayRef) return;

    const side = this.side();
    const align = this.align();
    const offset = this.sideOffset();

    let positions: ConnectedPosition[];
    if (side === 'top') {
      positions = [{
        originX: align as any,
        originY: 'top' as const,
        overlayX: align as any,
        overlayY: 'bottom' as const,
        offsetY: -offset,
      }];
    } else if (side === 'bottom') {
      positions = [{
        originX: align as any,
        originY: 'bottom' as const,
        overlayX: align as any,
        overlayY: 'top' as const,
        offsetY: offset,
      }];
    } else if (side === 'left') {
      positions = [{
        originX: 'start' as const,
        originY: align === 'center' ? 'center' as const : align === 'start' ? 'top' as const : 'bottom' as const,
        overlayX: 'end' as const,
        overlayY: align === 'center' ? 'center' as const : align === 'start' ? 'top' as const : 'bottom' as const,
        offsetX: -offset,
      }];
    } else {
      positions = [{
        originX: 'end' as const,
        originY: align === 'center' ? 'center' as const : align === 'start' ? 'top' as const : 'bottom' as const,
        overlayX: 'start' as const,
        overlayY: align === 'center' ? 'center' as const : align === 'start' ? 'top' as const : 'bottom' as const,
        offsetX: offset,
      }];
    }

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
    });

      const portal = new TemplatePortal(this.contentTemplate(), this.viewContainerRef);
      this.overlayRef.attach(portal);

      // Добавляем обработку hover на overlay content
      setTimeout(() => {
        const overlayElement = this.overlayRef?.overlayElement;
        if (overlayElement) {
          overlayElement.addEventListener('mouseenter', () => {
            if (this.hideTimeout) {
              clearTimeout(this.hideTimeout);
              this.hideTimeout = null;
            }
          });
          overlayElement.addEventListener('mouseleave', () => {
            this.hide();
          });
        }
      }, 0);
    }, 200); // Задержка 200ms перед показом
  }

  @HostListener('mouseleave')
  hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    this.hideTimeout = setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.dispose();
        this.overlayRef = null;
      }
    }, 200);
  }
}

