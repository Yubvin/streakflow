import { ChangeDetectionStrategy, Component, output, inject, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

@Component({
  selector: 'ui-context-menu-content',
  standalone: true,
  templateUrl: './ui-context-menu-content.component.html',
  styleUrls: ['./ui-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContextMenuContentComponent implements AfterViewInit, OnDestroy {
  readonly closeRequested = output<void>();

  @ViewChild('content', { static: true }) content!: ElementRef;

  private focusTrapFactory = inject(FocusTrapFactory);
  private focusTrap: FocusTrap | null = null;
  state = 'open';

  ngAfterViewInit(): void {
    // Initialize focus trap
    this.focusTrap = this.focusTrapFactory.create(this.content.nativeElement);
    this.focusTrap.focusInitialElement();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeRequested.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }
}
