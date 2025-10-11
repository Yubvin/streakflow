import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UiMenubarMenuComponent } from './ui-menubar-menu.component';

@Directive({
  selector: '[uiMenubarTrigger]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"menubar-trigger"',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'isOpen',
    '[attr.data-state]': 'isOpen ? "open" : "closed"',
    'class': 'ui-menubar-trigger',
  },
})
export class UiMenubarTriggerDirective {
  readonly contentTemplate = input.required<TemplateRef<any>>({ alias: 'uiMenubarTrigger' });

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private menuComponent = inject(UiMenubarMenuComponent, { optional: true });
  private overlayRef: OverlayRef | null = null;

  isOpen = false;

  @HostListener('click')
  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.overlayRef) return;

    // Позиционирование: под триггером, слева
    const positions: ConnectedPosition[] = [
      {
        originX: 'start' as const,
        originY: 'bottom' as const,
        overlayX: 'start' as const,
        overlayY: 'top' as const,
        offsetY: 8, // sideOffset: 8 (прототип)
        offsetX: -4, // alignOffset: -4 (прототип)
      },
      {
        originX: 'start' as const,
        originY: 'top' as const,
        overlayX: 'start' as const,
        overlayY: 'bottom' as const,
        offsetY: -8,
        offsetX: -4,
      },
    ];

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(this.contentTemplate(), this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen = true;
    this.menuComponent?.open();

    // Listen for backdrop clicks
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    // Listen for Escape key
    this.overlayRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.isOpen = false;
      this.menuComponent?.close();
    }
  }
}

