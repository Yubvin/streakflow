import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

/**
 * Toast service - manages toast notifications
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  // Private state
  private toastsSignal = signal<Toast[]>([]);
  
  // Public read-only state
  readonly toasts = this.toastsSignal.asReadonly();

  /**
   * Shows toast notification
   */
  show(message: string, type: Toast['type'] = 'info', duration = 3000): void {
    const toast: Toast = {
      id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      duration
    };

    this.toastsSignal.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(toast.id), duration);
    }
  }

  /**
   * Shows success toast
   */
  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  /**
   * Shows error toast
   */
  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  /**
   * Shows info toast
   */
  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  /**
   * Shows warning toast
   */
  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Removes toast by ID
   */
  remove(id: string): void {
    this.toastsSignal.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  /**
   * Clears all toasts
   */
  clearAll(): void {
    this.toastsSignal.set([]);
  }
}

