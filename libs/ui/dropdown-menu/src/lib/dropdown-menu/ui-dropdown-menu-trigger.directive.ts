import { Directive, ElementRef, HostListener, inject, output, input } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[uiDropdownMenuTrigger]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"dropdown-menu-trigger"',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'isOpen',
  },
})
export class UiDropdownMenuTriggerDirective {
  readonly contentTemplate = input.required<TemplateRef<any>>({ alias: 'uiDropdownMenuTrigger' });
  readonly openedChange = output<boolean>();

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  isOpen = false;

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

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' && !this.isOpen) {
      event.preventDefault();
      this.open();
    } else if (event.key === 'Escape' && this.isOpen) {
      event.preventDefault();
      this.close();
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

    const positions: ConnectedPosition[] = [{
      originX: 'start' as const,
      originY: 'bottom' as const,
      overlayX: 'start' as const,
      overlayY: 'top' as const,
      offsetY: 4,
    }];

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions);

    // Get trigger width for overlay
    const triggerWidth = this.elementRef.nativeElement.offsetWidth;

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      minWidth: triggerWidth, // Match trigger width minimum
    });

    const portal = new TemplatePortal(this.contentTemplate(), this.viewContainerRef);
    const componentRef = this.overlayRef.attach(portal);
    
    // Listen for close events from the template
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
      this.elementRef.nativeElement.focus();
    }
  }
}
