import { KPIData } from '../types';

/**
 * KPI Fixtures for Storybook
 * 
 * Deterministic KPI data for dashboard cards.
 */

export const kpiFixtures = {
  todayCompletion: {
    label: "Today's Completion",
    value: '75%',
    change: '+5%',
    trend: 'up' as const,
    icon: '📊'
  } as KPIData,

  currentStreak: {
    label: 'Current Streak',
    value: '10 days',
    change: '+2 days',
    trend: 'up' as const,
    icon: '🔥'
  } as KPIData,

  totalHabits: {
    label: 'Total Habits',
    value: '8',
    change: '+1',
    trend: 'up' as const,
    icon: '✅'
  } as KPIData,

  longestStreak: {
    label: 'Longest Streak',
    value: '45 days',
    change: 'Record!',
    trend: 'neutral' as const,
    icon: '🏆'
  } as KPIData,

  completionRateDown: {
    label: "Today's Completion",
    value: '45%',
    change: '-10%',
    trend: 'down' as const,
    icon: '📊'
  } as KPIData
};

export const allKPIs = [
  kpiFixtures.todayCompletion,
  kpiFixtures.currentStreak,
  kpiFixtures.totalHabits,
  kpiFixtures.longestStreak
];

