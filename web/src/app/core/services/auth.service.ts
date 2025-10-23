import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthState, LoginCredentials, SignUpData } from '../models/user.model';

const STORAGE_KEY_USER = 'streakflow_user';
const STORAGE_KEY_TOKEN = 'streakflow_token';

/**
 * AuthService - manages authentication state
 * Mock implementation without backend
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Private state
  private authStateSignal = signal<AuthState>({
    isAuthenticated: false,
    user: null,
    token: undefined
  });

  // Public read-only state
  readonly authState = this.authStateSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.authState().isAuthenticated);
  readonly currentUser = computed(() => this.authState().user);

  constructor(private router: Router) {
    this.loadAuthState();
  }

  /**
   * Mock login (without backend)
   * Simulates API call with delay
   */
  async login(credentials: LoginCredentials): Promise<void> {
    await this.delay(1000);

    // Mock validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    if (credentials.password.length < 6) {
      throw new Error('Invalid credentials');
    }

    // Create mock user
    const user: User = {
      id: this.generateUserId(),
      email: credentials.email,
      fullName: this.extractNameFromEmail(credentials.email),
      avatar: null,
      createdAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        notificationsEnabled: true
      }
    };

    const token = this.generateMockToken();

    this.authStateSignal.set({
      isAuthenticated: true,
      user,
      token
    });

    this.saveAuthState();
    this.router.navigate(['/dashboard']);
  }

  /**
   * Mock sign up (without backend)
   * Simulates API call with delay
   */
  async signUp(data: SignUpData): Promise<void> {
    await this.delay(1000);

    // Validation
    if (!data.email || !data.password || !data.fullName) {
      throw new Error('All fields are required');
    }

    if (data.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (data.fullName.length < 2) {
      throw new Error('Full name must be at least 2 characters');
    }

    // Create user
    const user: User = {
      id: this.generateUserId(),
      email: data.email,
      fullName: data.fullName,
      avatar: null,
      createdAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        notificationsEnabled: true
      }
    };

    const token = this.generateMockToken();

    this.authStateSignal.set({
      isAuthenticated: true,
      user,
      token
    });

    this.saveAuthState();
    this.router.navigate(['/dashboard']);
  }

  /**
   * Logs out user
   */
  logout(): void {
    this.authStateSignal.set({
      isAuthenticated: false,
      user: null,
      token: undefined
    });

    this.clearAuthState();
    this.router.navigate(['/auth/welcome']);
  }

  /**
   * Updates user information
   */
  updateUser(updates: Partial<User>): void {
    const user = this.currentUser();
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    this.authStateSignal.update(state => ({
      ...state,
      user: updatedUser
    }));

    this.saveAuthState();
  }

  // Private methods

  /**
   * Saves auth state to localStorage
   */
  private saveAuthState(): void {
    const state = this.authState();
    if (state.user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(state.user));
    }
    if (state.token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, state.token);
    }
  }

  /**
   * Loads auth state from localStorage
   */
  private loadAuthState(): void {
    const userJson = localStorage.getItem(STORAGE_KEY_USER);
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);

    if (userJson && token) {
      try {
        const user = JSON.parse(userJson) as User;
        this.authStateSignal.set({
          isAuthenticated: true,
          user,
          token
        });
      } catch (error) {
        console.error('Failed to load auth state', error);
        this.clearAuthState();
      }
    }
  }

  /**
   * Clears auth state from localStorage
   */
  private clearAuthState(): void {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }

  /**
   * Simulates API delay
   */
  private delay(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Generates mock token
   */
  private generateMockToken(): string {
    return `mock_token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
  }

  /**
   * Generates user ID
   */
  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Extracts name from email (for demo)
   */
  private extractNameFromEmail(email: string): string {
    const username = email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
}

