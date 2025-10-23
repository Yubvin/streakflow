/**
 * Habit model - main habit data structure
 */
export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  goal: number;
  frequency: 'daily' | 'weekly' | 'custom';
  weekdays?: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  currentStreak: number;
  longestStreak: number;
  currentStep: number;
  completedToday: boolean;
  lastCheckIn: string | null;
  progress: number;
  createdAt: string;
  archived?: boolean;
}

/**
 * Habit form - for creating/editing habits
 */
export interface HabitForm {
  name: string;
  icon: string;
  color: string;
  goal: number;
  frequency: 'daily' | 'weekly' | 'custom';
  weekdays: boolean[];
}

/**
 * Habit statistics
 */
export interface HabitStats {
  totalHabits: number;
  completionRate: number;
  averageStreak: number;
  longestStreak: number;
}

