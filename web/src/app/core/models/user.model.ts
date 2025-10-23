/**
 * User model - user data structure
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string | null;
  createdAt: string;
  preferences?: UserPreferences;
}

/**
 * User preferences
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  reminderTime?: string;
}

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Sign up data
 */
export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

