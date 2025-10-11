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
import { UiMenubarSubComponent } from './ui-menubar-sub.component';

@Directive({
  selector: '[uiMenubarSubTrigger]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"menubar-sub-trigger"',
    '[attr.data-state]': 'isOpen ? "open" : "closed"',
    '[attr.data-inset]': 'inset() ? "true" : null',
    'class': 'ui-menubar-sub-trigger',
    'role': 'menuitem',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'isOpen',
  },
})
export class UiMenubarSubTriggerDirective {
  readonly contentTemplate = input.required<TemplateRef<any>>({ alias: 'uiMenubarSubTrigger' });
  readonly inset = input<boolean>(false);

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private subComponent = inject(UiMenubarSubComponent, { optional: true });
  private overlayRef: OverlayRef | null = null;

  isOpen = false;

  @HostListener('mouseenter')
  open(): void {
    if (this.overlayRef) return;

    // Позиционирование: справа от триггера
    const positions: ConnectedPosition[] = [
      {
        originX: 'end' as const,
        originY: 'top' as const,
        overlayX: 'start' as const,
        overlayY: 'top' as const,
        offsetX: 4,
      },
      {
        originX: 'start' as const,
        originY: 'top' as const,
        overlayX: 'end' as const,
        overlayY: 'top' as const,
        offsetX: -4,
      },
    ];

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
    this.isOpen = true;
    this.subComponent?.open();

    // Add mouse leave listener to overlay
    setTimeout(() => {
      const overlayElement = this.overlayRef?.overlayElement;
      if (overlayElement) {
        overlayElement.addEventListener('mouseleave', () => {
          this.close();
        });
      }
    }, 0);
  }

  @HostListener('mouseleave')
  close(): void {
    // Debounce close to allow moving to submenu
    setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.dispose();
        this.overlayRef = null;
        this.isOpen = false;
        this.subComponent?.close();
      }
    }, 150);
  }
}

