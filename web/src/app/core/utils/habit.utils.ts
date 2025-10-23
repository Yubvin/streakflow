import { Habit } from '../models/habit.model';

/**
 * Habit utilities
 */
export class HabitUtils {
  /**
   * Calculates progress in percentage
   */
  static calculateProgress(currentStep: number, goal: number): number {
    if (goal === 0) return 0;
    return Math.round((currentStep / goal) * 100);
  }

  /**
   * Checks if habit is multi-goal (multiple steps)
   */
  static isMultiGoal(habit: Habit): boolean {
    return habit.goal > 1;
  }

  /**
   * Checks if habit is completed
   */
  static isCompleted(habit: Habit): boolean {
    return habit.completedToday || habit.currentStep >= habit.goal;
  }

  /**
   * Streak thresholds - declarative configuration
   */
  private static readonly STREAK_THRESHOLDS: ReadonlyArray<{ min: number; emoji: string }> = [
    { min: 30, emoji: '🔥🔥🔥' },
    { min: 7, emoji: '🔥🔥' },
    { min: 1, emoji: '🔥' },
    { min: 0, emoji: '⚪' },
  ];

  /**
   * Returns emoji for streak display
   * Uses declarative threshold table
   */
  static getStreakEmoji(streak: number): string {
    return this.STREAK_THRESHOLDS.find(threshold => streak >= threshold.min)?.emoji ?? '⚪';
  }

  /**
   * Formats streak to readable format
   */
  static formatStreak(streak: number): string {
    return `${streak} day${streak !== 1 ? 's' : ''}`;
  }

  /**
   * Generates unique ID for habit
   */
  static generateId(): string {
    return `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Calculates completion rate for habits list
   */
  static calculateCompletionRate(habits: Habit[]): number {
    if (habits.length === 0) return 0;
    const completedCount = habits.filter(habit => this.isCompleted(habit)).length;
    return Math.round((completedCount / habits.length) * 100);
  }

  /**
   * Gets average streak length for habits list
   */
  static getAverageStreak(habits: Habit[]): number {
    if (habits.length === 0) return 0;
    const totalStreak = habits.reduce((sum, habit) => sum + habit.currentStreak, 0);
    return Math.round(totalStreak / habits.length);
  }

  /**
   * Gets longest streak from habits list
   */
  static getLongestStreak(habits: Habit[]): number {
    if (habits.length === 0) return 0;
    return Math.max(...habits.map(habit => habit.longestStreak));
  }

  /**
   * Sorts habits by current streak (descending)
   */
  static sortByStreak(habits: Habit[]): Habit[] {
    return [...habits].sort((a, b) => b.currentStreak - a.currentStreak);
  }

  /**
   * Filters habits by frequency
   */
  static filterByFrequency(habits: Habit[], frequency: string): Habit[] {
    if (frequency === 'all') return habits;
    return habits.filter(habit => habit.frequency === frequency);
  }

  /**
   * Filters habits by search query
   */
  static filterBySearch(habits: Habit[], searchTerm: string): Habit[] {
    if (!searchTerm.trim()) return habits;
    const term = searchTerm.toLowerCase();
    return habits.filter(habit => habit.name.toLowerCase().includes(term));
  }
}

