import { Directive, ElementRef, HostListener, inject, output, input } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[uiSelectTrigger]',
  standalone: true,
  host: {
    '[attr.data-slot]': '"select-trigger"',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-expanded]': 'isOpen',
    '[attr.aria-labelledby]': 'labelId',
    '[attr.aria-describedby]': 'descriptionId',
    '[attr.aria-invalid]': 'invalid',
    '[attr.aria-required]': 'required',
  },
})
export class UiSelectTriggerDirective {
  readonly contentTemplate = input.required<TemplateRef<any>>({ alias: 'uiSelectTrigger' });
  readonly placeholder = input<string>('Select an option...');
  readonly value = input<string>('');
  readonly invalid = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly labelId = input<string>('');
  readonly descriptionId = input<string>('');

  readonly openedChange = output<boolean>();
  readonly valueChange = output<string>();


  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private positionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  isOpen = false;

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.disabled()) return;
    
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
    if (this.disabled()) return;

    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.isOpen) {
        this.open();
      }
    } else if (event.key === 'Escape' && this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }

  private open(): void {
    if (this.overlayRef) return;

    const positions: ConnectedPosition[] = [
      {
        originX: 'start' as const,
        originY: 'bottom' as const,
        overlayX: 'start' as const,
        overlayY: 'top' as const,
        offsetY: 4,
      },
      {
        originX: 'start' as const,
        originY: 'top' as const,
        overlayX: 'start' as const,
        overlayY: 'bottom' as const,
        offsetY: -4,
      }
    ];

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
      minWidth: triggerWidth, // Match trigger width (прототип)
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

  selectValue(value: string): void {
    this.valueChange.emit(value);
    this.close();
  }
}
