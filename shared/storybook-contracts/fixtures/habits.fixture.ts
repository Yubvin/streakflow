import { Habit } from '../types';

/**
 * Habit Fixtures for Storybook
 * 
 * These fixtures provide deterministic data for visual testing.
 * Used by both React prototype and Angular app Storybook stories.
 * 
 * IMPORTANT: Do not modify these without updating baseline screenshots!
 */

export const habitFixtures = {
  /**
   * Multi-goal habit with progress (5/8)
   * State: In progress, not completed today
   */
  waterMultiGoal: {
    id: 'fixture-1',
    name: 'Drink Water',
    icon: '💧',
    color: '#06B6D4',
    goal: 8,
    frequency: 'daily',
    currentStreak: 10,
    longestStreak: 15,
    currentStep: 5,
    completedToday: false,
    lastCheckIn: '2024-01-15T10:00:00.000Z',
    progress: 62,
    createdAt: '2024-01-01T00:00:00.000Z',
    archived: false,
    weekdays: [true, true, true, true, true, true, true]
  } as Habit,

  /**
   * Single-goal habit, completed today
   * State: Completed, shows undo button
   */
  exerciseSingleCompleted: {
    id: 'fixture-2',
    name: 'Exercise',
    icon: '💪',
    color: '#10B981',
    goal: 1,
    frequency: 'daily',
    currentStreak: 5,
    longestStreak: 10,
    currentStep: 1,
    completedToday: true,
    lastCheckIn: '2024-01-15T10:00:00.000Z',
    progress: 100,
    createdAt: '2024-01-01T00:00:00.000Z',
    archived: false,
    weekdays: [true, true, true, true, true, true, true]
  } as Habit,

  /**
   * Single-goal habit, not started today
   * State: Idle, shows mark button
   */
  readingSingleIdle: {
    id: 'fixture-3',
    name: 'Read Book',
    icon: '📚',
    color: '#8B5CF6',
    goal: 1,
    frequency: 'daily',
    currentStreak: 0,
    longestStreak: 3,
    currentStep: 0,
    completedToday: false,
    lastCheckIn: null,
    progress: 0,
    createdAt: '2024-01-01T00:00:00.000Z',
    archived: false,
    weekdays: [true, true, true, true, true, true, true]
  } as Habit,

  /**
   * Single-goal habit with long streak (30+ days)
   * State: Completed, shows fire emoji streak
   */
  meditationLongStreak: {
    id: 'fixture-4',
    name: 'Meditation',
    icon: '🧘',
    color: '#F59E0B',
    goal: 1,
    frequency: 'daily',
    currentStreak: 30,
    longestStreak: 45,
    currentStep: 1,
    completedToday: true,
    lastCheckIn: '2024-01-15T10:00:00.000Z',
    progress: 100,
    createdAt: '2023-12-01T00:00:00.000Z',
    archived: false,
    weekdays: [true, true, true, true, true, true, true]
  } as Habit,

  /**
   * Weekly habit
   * State: Idle
   */
  yogaWeekly: {
    id: 'fixture-5',
    name: 'Yoga Class',
    icon: '🧘‍♀️',
    color: '#EC4899',
    goal: 3,
    frequency: 'weekly',
    currentStreak: 2,
    longestStreak: 8,
    currentStep: 1,
    completedToday: false,
    lastCheckIn: '2024-01-14T10:00:00.000Z',
    progress: 33,
    createdAt: '2024-01-01T00:00:00.000Z',
    archived: false,
    weekdays: [false, true, false, true, false, false, true]
  } as Habit
};

/**
 * All habits as array for list views
 */
export const allHabits = Object.values(habitFixtures);

/**
 * Empty habits array for empty states
 */
export const emptyHabits: Habit[] = [];

