/**
 * Shared types for Storybook Contracts
 * These types are used by both React prototype and Angular app
 */

export type HabitFrequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  goal: number;
  frequency: HabitFrequency;
  currentStreak: number;
  longestStreak: number;
  currentStep: number;
  completedToday: boolean;
  lastCheckIn: string | null;
  progress: number;
  createdAt: string;
  archived: boolean;
  weekdays: boolean[];
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar: string | null;
  createdAt: string;
}

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface KPIData {
  label: string;
  value: string;
  change: string;
  trend: TrendDirection;
  icon: string;
}

