import { ChangeDetectionStrategy, Component, output, inject, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

@Component({
  selector: 'ui-dropdown-menu-content',
  standalone: true,
  template: `
    <div 
      class="ui-dropdown-menu-content" 
      data-slot="dropdown-menu-content"
      [attr.data-state]="state"
      #content
      role="menu"
      tabindex="-1"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ui-dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdownMenuContentComponent implements AfterViewInit, OnDestroy {
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.content.nativeElement.contains(event.target)) {
      this.closeRequested.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }
}
