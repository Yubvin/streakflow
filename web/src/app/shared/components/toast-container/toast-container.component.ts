import { Component, inject } from '@angular/core';
import { ToastService, Toast } from '../../../core/services/toast.service';
import { UiCardComponent } from '@streakflow/ui/card';
import { UiButtonComponent } from '@streakflow/ui/button';

/**
 * Toast type mappings - dispatch tables
 */
const TOAST_ICONS: Record<Toast['type'], string> = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

const TOAST_CLASSES: Record<Toast['type'], string> = {
  success: 'border-green-500 bg-green-50 dark:bg-green-950',
  error: 'border-red-500 bg-red-50 dark:bg-red-950',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
};

/**
 * ToastContainer - displays toast notifications
 * This is a SMART component - uses ToastService
 */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [UiCardComponent, UiButtonComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);
  
  readonly toasts = this.toastService.toasts;

  /**
   * Removes toast by ID
   */
  remove(id: string): void {
    this.toastService.remove(id);
  }

  /**
   * Gets icon for toast type using dispatch table
   */
  getToastIcon(type: Toast['type']): string {
    return TOAST_ICONS[type];
  }

  /**
   * Gets CSS class for toast type using dispatch table
   */
  getToastClass(type: Toast['type']): string {
    return TOAST_CLASSES[type];
  }
}


