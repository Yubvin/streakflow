import { Directive, ElementRef, HostListener, inject, output, input } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[uiContextMenuTrigger]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"context-menu-trigger"',
  },
})
export class UiContextMenuTriggerDirective {
  readonly contentTemplate = input.required<TemplateRef<any>>({ alias: 'uiContextMenuTrigger' });
  readonly openedChange = output<boolean>();

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  isOpen = false;

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.open(event.clientX, event.clientY);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Context menu key (usually Shift+F10 or Menu key)
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
      event.preventDefault();
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      this.open(rect.left, rect.bottom);
    } else if (event.key === 'Escape' && this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }

  private open(x: number, y: number): void {
    if (this.overlayRef) return;

    // Create position strategy for cursor position
    const positions: ConnectedPosition[] = [{
      originX: 'start' as const,
      originY: 'top' as const,
      overlayX: 'start' as const,
      overlayY: 'top' as const,
      offsetX: 0,
      offsetY: 0,
    }];

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo({ x, y })
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(this.contentTemplate(), this.viewContainerRef);
    this.overlayRef.attach(portal);
    
    // Listen for close events
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    this.isOpen = true;
    this.openedChange.emit(true);
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.isOpen = false;
      this.openedChange.emit(false);
    }
  }
}
