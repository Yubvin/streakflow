import { Injectable, signal, computed } from '@angular/core';
import { Habit, HabitForm, HabitStats } from '../models/habit.model';
import { HabitUtils } from '../utils/habit.utils';

const STORAGE_KEY = 'streakflow_habits';

/**
 * Habit service - manages habit state and operations
 */
@Injectable({ providedIn: 'root' })
export class HabitService {
  // Private state (mutable)
  private habitsSignal = signal<Habit[]>([]);

  // Public read-only state
  readonly habits = this.habitsSignal.asReadonly();

  // Computed values
  readonly activeHabits = computed(() => 
    this.habits().filter(habit => !habit.archived)
  );

  readonly completedTodayCount = computed(() => 
    this.activeHabits().filter(habit => HabitUtils.isCompleted(habit)).length
  );

  readonly completionRate = computed(() => {
    const active = this.activeHabits();
    if (active.length === 0) return 0;
    return Math.round((this.completedTodayCount() / active.length) * 100);
  });

  readonly stats = computed((): HabitStats => {
    const active = this.activeHabits();
    return {
      totalHabits: active.length,
      completionRate: this.completionRate(),
      averageStreak: active.length > 0 
        ? HabitUtils.getAverageStreak(active)
        : 0,
      longestStreak: active.length > 0
        ? HabitUtils.getLongestStreak(active)
        : 0
    };
  });

  constructor() {
    this.loadFromStorage();
  }

  // CRUD Operations
  
  /**
   * Adds new habit
   */
  addHabit(form: HabitForm): void {
    const newHabit: Habit = {
      id: HabitUtils.generateId(),
      ...form,
      currentStreak: 0,
      longestStreak: 0,
      currentStep: 0,
      completedToday: false,
      lastCheckIn: null,
      progress: 0,
      createdAt: new Date().toISOString(),
      archived: false
    };

    this.habitsSignal.update(habits => [...habits, newHabit]);
    this.saveToStorage();
  }

  /**
   * Updates existing habit
   */
  updateHabit(id: string, updates: Partial<Habit>): void {
    this.habitsSignal.update(habits =>
      habits.map(habit => habit.id === id ? { ...habit, ...updates } : habit)
    );
    this.saveToStorage();
  }

  /**
   * Deletes habit
   */
  deleteHabit(id: string): void {
    this.habitsSignal.update(habits => habits.filter(habit => habit.id !== id));
    this.saveToStorage();
  }

  // Habit actions

  /**
   * Marks habit as completed for today
   */
  markHabitToday(id: string): void {
    this.habitsSignal.update(habits =>
      habits.map(habit => {
        if (habit.id !== id) return habit;

        const wasCompleted = HabitUtils.isCompleted(habit);
        const newCompleted = !wasCompleted;
        const newStreak = newCompleted 
          ? habit.currentStreak + 1 
          : Math.max(0, habit.currentStreak - 1);

        return {
          ...habit,
          completedToday: newCompleted,
          currentStreak: newStreak,
          longestStreak: Math.max(habit.longestStreak, newStreak),
          currentStep: newCompleted ? habit.goal : 0,
          progress: newCompleted ? 100 : 0,
          lastCheckIn: new Date().toISOString()
        };
      })
    );
    this.saveToStorage();
  }

  /**
   * Increments habit step (for multi-goal habits)
   */
  incrementHabitStep(id: string): void {
    this.habitsSignal.update(habits =>
      habits.map(habit => {
        if (habit.id !== id) return habit;

        const newStep = Math.min(habit.currentStep + 1, habit.goal);
        const newProgress = HabitUtils.calculateProgress(newStep, habit.goal);
        const isNowCompleted = newStep >= habit.goal;
        const newStreak = isNowCompleted && !habit.completedToday 
          ? habit.currentStreak + 1 
          : habit.currentStreak;

        return {
          ...habit,
          currentStep: newStep,
          progress: newProgress,
          completedToday: isNowCompleted,
          currentStreak: newStreak,
          longestStreak: Math.max(habit.longestStreak, newStreak),
          lastCheckIn: new Date().toISOString()
        };
      })
    );
    this.saveToStorage();
  }

  /**
   * Undoes one habit step
   */
  undoHabitStep(id: string): void {
    this.habitsSignal.update(habits =>
      habits.map(habit => {
        if (habit.id !== id || habit.currentStep === 0) return habit;

        const newStep = Math.max(0, habit.currentStep - 1);
        const newProgress = HabitUtils.calculateProgress(newStep, habit.goal);
        const wasCompleted = HabitUtils.isCompleted(habit);
        const isStillCompleted = newStep >= habit.goal;
        const newStreak = wasCompleted && !isStillCompleted
          ? Math.max(0, habit.currentStreak - 1)
          : habit.currentStreak;

        return {
          ...habit,
          currentStep: newStep,
          progress: newProgress,
          completedToday: isStillCompleted,
          currentStreak: newStreak,
          lastCheckIn: new Date().toISOString()
        };
      })
    );
    this.saveToStorage();
  }

  // Storage operations

  /**
   * Saves habits to localStorage
   */
  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.habits()));
  }

  /**
   * Loads habits from localStorage
   */
  private loadFromStorage(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const habits = JSON.parse(stored) as Habit[];
        this.habitsSignal.set(habits);
      } catch (error) {
        console.error('Failed to load habits from storage', error);
        this.loadDemoData();
      }
    } else {
      this.loadDemoData();
    }
  }

  /**
   * Loads demo data for initial experience
   */
  private loadDemoData(): void {
    const demoHabits: Habit[] = [
      {
        id: '1',
        name: 'Drink 8 glasses of water',
        icon: '💧',
        color: '#06B6D4',
        goal: 8,
        frequency: 'daily',
        currentStreak: 7,
        longestStreak: 15,
        currentStep: 5,
        completedToday: false,
        lastCheckIn: new Date().toISOString(),
        progress: 62,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        name: '30 minutes exercise',
        icon: '💪',
        color: '#22C55E',
        goal: 1,
        frequency: 'daily',
        currentStreak: 12,
        longestStreak: 20,
        currentStep: 1,
        completedToday: true,
        lastCheckIn: new Date().toISOString(),
        progress: 100,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        name: 'Read for 20 minutes',
        icon: '📚',
        color: '#A855F7',
        goal: 1,
        frequency: 'daily',
        currentStreak: 5,
        longestStreak: 8,
        currentStep: 0,
        completedToday: false,
        lastCheckIn: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        progress: 0,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ];

    this.habitsSignal.set(demoHabits);
    this.saveToStorage();
  }

  // Utility methods

  /**
   * Gets habit by ID
   */
  getHabitById(id: string): Habit | undefined {
    return this.habits().find(habit => habit.id === id);
  }

  /**
   * Filters habits by search term and frequency
   */
  filterHabits(searchTerm: string, frequency?: string): Habit[] {
    let filtered = this.activeHabits();

    if (searchTerm) {
      filtered = HabitUtils.filterBySearch(filtered, searchTerm);
    }

    if (frequency && frequency !== 'all') {
      filtered = HabitUtils.filterByFrequency(filtered, frequency);
    }

    return filtered;
  }
}

