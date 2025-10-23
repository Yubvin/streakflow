import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validators for forms
 */
export class CustomValidators {
  /**
   * Validator for habit name
   */
  static habitName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      
      if (!value || value.trim().length === 0) {
        return { required: true };
      }
      
      if (value.length < 3) {
        return { minLength: { requiredLength: 3, actualLength: value.length } };
      }
      
      if (value.length > 50) {
        return { maxLength: { requiredLength: 50, actualLength: value.length } };
      }
      
      return null;
    };
  }

  /**
   * Validator to check that at least one day is selected
   */
  static atLeastOneDaySelected(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const days = control.value as boolean[];
      
      if (!days || !Array.isArray(days)) {
        return { invalidDays: true };
      }
      
      if (!days.some(day => day)) {
        return { noDaysSelected: true };
      }
      
      return null;
    };
  }

  /**
   * Email validator
   */
  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      
      if (!value) return null; // required проверяется отдельно
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : { invalidEmail: true };
    };
  }

  /**
   * Strong password validator
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      
      if (!value) return null; // required checked separately
      
      const errors: Record<string, boolean> = {};
      
      if (value.length < 8) {
        errors['minLength'] = true;
      }
      
      if (!/[A-Z]/.test(value)) {
        errors['noUppercase'] = true;
      }
      
      if (!/[a-z]/.test(value)) {
        errors['noLowercase'] = true;
      }
      
      if (!/[0-9]/.test(value)) {
        errors['noNumber'] = true;
      }
      
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  /**
   * Positive number validator
   */
  static positiveNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      
      if (value === null || value === undefined || value === '') {
        return null; // required checked separately
      }
      
      const numberValue = Number(value);
      
      if (isNaN(numberValue)) {
        return { notANumber: true };
      }
      
      if (numberValue <= 0) {
        return { notPositive: true };
      }
      
      return null;
    };
  }

  /**
   * Number range validator
   */
  static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      
      if (value === null || value === undefined || value === '') {
        return null;
      }
      
      const numberValue = Number(value);
      
      if (isNaN(numberValue)) {
        return { notANumber: true };
      }
      
      if (numberValue < min || numberValue > max) {
        return { outOfRange: { min, max, actual: numberValue } };
      }
      
      return null;
    };
  }
}

