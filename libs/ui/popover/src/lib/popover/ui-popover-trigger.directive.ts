import { Directive, ElementRef, HostListener, inject, TemplateRef, ViewContainerRef, input, output } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[uiPopoverTrigger]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"popover-trigger"',
  },
})
export class UiPopoverTriggerDirective {
  readonly contentTemplate = input.required<TemplateRef<any>>({ alias: 'uiPopoverTrigger' });
  readonly side = input<'top' | 'bottom' | 'left' | 'right'>('bottom', { alias: 'popoverSide' });
  readonly align = input<'start' | 'center' | 'end'>('center', { alias: 'popoverAlign' });
  readonly sideOffset = input<number>(4, { alias: 'popoverSideOffset' });

  readonly openedChange = output<boolean>();

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;

  @HostListener('click', ['$event'])
  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.overlayRef) {
      this.close();
    } else {
      this.open();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.overlayRef && !this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  open(): void {
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
    this.openedChange.emit(true);
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.openedChange.emit(false);
    }
  }
}
