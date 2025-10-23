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
 * SignUpScreen - user registration screen
 * This is a SMART component - uses AuthService
 */
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    UiButtonComponent,
    UiInputComponent,
    UiLabelComponent,
    UiCardComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  readonly isLoading = signal(false);
  readonly showPassword = signal(false);

  readonly form: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
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
      await this.authService.signUp(this.form.value);
      this.toastService.success('Account created successfully! 🎉');
    } catch (error: any) {
      this.toastService.error(error.message || 'Sign up failed. Please try again.');
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

