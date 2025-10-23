import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { CustomValidators } from '../../../core/utils/validators';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiInputComponent } from '@streakflow/ui/input';
import { UiLabelComponent } from '@streakflow/ui/label';
import { UiCardComponent } from '@streakflow/ui/card';

/**
 * LoginScreen - user login screen
 * This is a SMART component - uses AuthService
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    UiButtonComponent,
    UiInputComponent,
    UiLabelComponent,
    UiCardComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  readonly isLoading = signal(false);
  readonly showPassword = signal(false);

  readonly form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, CustomValidators.email()]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /**
   * Handles form submission
   */
  async onSubmit(): Promise<void> {
    if (!this.form.valid) return;

    this.isLoading.set(true);

    try {
      await this.authService.login(this.form.value);
      this.toastService.success('Welcome back! 👋');
    } catch (error: any) {
      this.toastService.error(error.message || 'Login failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Toggles password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }
}

