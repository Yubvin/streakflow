/**
 * KPI data for metric cards
 */
export interface KPIData {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: string;
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

/**
 * Habit completion data
 */
export interface HabitCompletionData {
  habitId: string;
  habitName: string;
  completionRate: number;
  totalCompletions: number;
}

