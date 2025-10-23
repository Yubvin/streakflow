# StreakFlow - Roadmap реализации
## Пошаговый план от текущего состояния до production

---

## 📊 Текущее состояние (Что уже ЕСТЬ)

### ✅ UI библиотека (libs/ui) - 100% готово
- **Button** - все варианты и размеры
- **Badge** - статусы и размеры
- **Avatar** - с fallback и размерами
- **Card** - Header, Title, Description, Content, Footer, Action
- **Input / Textarea / Label** - формы
- **Progress / ProgressSteps** - индикаторы прогресса
- **Skeleton** - loading states
- **Checkbox / RadioGroup / Switch / Slider** - контролы форм
- **Toggle / ToggleGroup** - переключатели
- **Tabs** - табы
- **Breadcrumb / Pagination** - навигация
- **Separator** - разделители
- **Tooltip / HoverCard / Popover** - overlays
- **DropdownMenu / ContextMenu / Select** - меню и селекты
- **Dialog** - модальные окна
- **Sidebar** - полноценный sidebar с menu системой

### ✅ Demo приложение (web/src/app) - витрина компонентов
- Демонстрация всех UI компонентов
- Sidebar с навигацией по секциям
- Переключатель темы (dark/light)
- 3 базовых диалога (basic, form, delete)

### ❌ Чего НЕТ (нужно реализовать)
- ❌ Реальное приложение для отслеживания привычек
- ❌ Аутентификация (login/signup)
- ❌ Экраны: Dashboard, Habits, Analytics, Profile
- ❌ Компоненты приложения (HabitCard, KPICard, и т.д.)
- ❌ Сервисы (HabitService, AuthService, и т.д.)
- ❌ Адаптивность и мобильная версия
- ❌ Toast уведомления
- ❌ Графики и charts
- ❌ Backend интеграция

---

## 🎯 Стратегия реализации

### Принципы:
1. **Итеративная разработка** - работающее приложение на каждом этапе
2. **MVP First** - сначала основной функционал, потом улучшения
3. **Vertical Slices** - полные фичи от UI до логики, а не по слоям
4. **Постепенное усложнение** - сначала простые версии, потом расширение

### Определение MVP (Minimum Viable Product):
**Что ОБЯЗАТЕЛЬНО должно быть для работы:**
- ✅ Создание/редактирование/удаление привычек
- ✅ Отметка выполнения (single + multi-goal)
- ✅ Просмотр прогресса
- ✅ Базовая статистика (KPI)
- ✅ Локальное хранение (localStorage)

**Что можно ОТЛОЖИТЬ:**
- ⏳ Аутентификация (Phase 2)
- ⏳ Аналитика с графиками (Phase 3)
- ⏳ Мобильная адаптация (Phase 3)
- ⏳ Онбординг (Phase 3)
- ⏳ Backend API (Phase 4)

---

## 📋 План реализации (Phases)

---

## **PHASE 0: Подготовка** (1-2 дня)
### Цель: Настроить структуру проекта и создать базовые типы

### 0.1. Создать структуру папок
```bash
web/src/app/
├── core/
│   ├── models/
│   ├── services/
│   └── utils/
├── shared/
│   ├── components/
│   └── pipes/
├── features/
│   ├── dashboard/
│   ├── habits/
│   ├── analytics/
│   ├── profile/
│   └── auth/
├── layout/
│   ├── app-shell/
│   ├── topbar/
│   ├── sidebar/
│   └── mobile-nav/
└── modals/
```

**Команды:**
```bash
# Создать базовую структуру
cd web/src/app
mkdir -p core/{models,services,utils}
mkdir -p shared/{components,pipes}
mkdir -p features/{dashboard,habits,analytics,profile,auth}
mkdir -p layout/{app-shell,topbar,sidebar,mobile-nav}
mkdir -p modals
```

**Результат:** Структура папок готова

---

### 0.2. Создать модели данных
**Файл:** `core/models/habit.model.ts`

```typescript
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

export interface HabitForm {
  name: string;
  icon: string;
  color: string;
  goal: number;
  frequency: 'daily' | 'weekly' | 'custom';
  weekdays: boolean[];
}

export interface HabitStats {
  totalHabits: number;
  completionRate: number;
  averageStreak: number;
  longestStreak: number;
}
```

**Файл:** `core/models/user.model.ts`

```typescript
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string | null;
  createdAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  reminderTime?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}
```

**Файл:** `core/models/analytics.model.ts`

```typescript
export interface KPIData {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface HabitCompletionData {
  habitId: string;
  habitName: string;
  completionRate: number;
  totalCompletions: number;
}
```

**Результат:** Типы и интерфейсы определены

---

### 0.3. Создать утилиты
**Файл:** `core/utils/date.utils.ts`

```typescript
export class DateUtils {
  static formatRelativeTime(dateString: string | null): string {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  static isToday(dateString: string | null): boolean {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  static formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
    const date = new Date(dateString);
    return format === 'short' 
      ? date.toLocaleDateString()
      : date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}
```

**Файл:** `core/utils/habit.utils.ts`

```typescript
export class HabitUtils {
  static calculateProgress(currentStep: number, goal: number): number {
    return Math.round((currentStep / goal) * 100);
  }

  static isMultiGoal(habit: Habit): boolean {
    return habit.goal > 1;
  }

  static isCompleted(habit: Habit): boolean {
    return habit.completedToday || habit.currentStep >= habit.goal;
  }

  static getStreakEmoji(streak: number): string {
    if (streak === 0) return '⚪';
    if (streak < 7) return '🔥';
    if (streak < 30) return '🔥🔥';
    return '🔥🔥🔥';
  }

  static formatStreak(streak: number): string {
    return `${streak} day${streak !== 1 ? 's' : ''}`;
  }

  static generateId(): string {
    return `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

**Файл:** `core/utils/validators.ts`

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
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

  static atLeastOneDaySelected(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const days = control.value as boolean[];
      if (!days || !days.some(day => day)) {
        return { noDaysSelected: true };
      }
      return null;
    };
  }

  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : { invalidEmail: true };
    };
  }

  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (!value) return null;
      
      const errors: any = {};
      if (value.length < 8) errors.minLength = true;
      if (!/[A-Z]/.test(value)) errors.noUppercase = true;
      if (!/[a-z]/.test(value)) errors.noLowercase = true;
      if (!/[0-9]/.test(value)) errors.noNumber = true;
      
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }
}
```

**Результат:** Утилиты созданы

---

### 0.4. Создать Pipes
**Файл:** `shared/pipes/relative-time.pipe.ts`

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from '../../core/utils/date.utils';

@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {
  transform(dateString: string | null): string {
    return DateUtils.formatRelativeTime(dateString);
  }
}
```

**Файл:** `shared/pipes/streak-format.pipe.ts`

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { HabitUtils } from '../../core/utils/habit.utils';

@Pipe({
  name: 'streakFormat',
  standalone: true
})
export class StreakFormatPipe implements PipeTransform {
  transform(streak: number): string {
    return HabitUtils.formatStreak(streak);
  }
}
```

**Результат:** Pipes созданы

---

## **PHASE 1: Сервисы и State Management** (2-3 дня)
### Цель: Создать централизованное управление данными

### 1.1. HabitService - управление привычками
**Файл:** `core/services/habit.service.ts`

```typescript
import { Injectable, signal, computed } from '@angular/core';
import { Habit, HabitForm, HabitStats } from '../models/habit.model';
import { HabitUtils } from '../utils/habit.utils';

const STORAGE_KEY = 'streakflow_habits';

@Injectable({ providedIn: 'root' })
export class HabitService {
  // Private state
  private habitsSignal = signal<Habit[]>([]);

  // Public read-only state
  readonly habits = this.habitsSignal.asReadonly();

  // Computed values
  readonly activeHabits = computed(() => 
    this.habits().filter(h => !h.archived)
  );

  readonly completedTodayCount = computed(() => 
    this.activeHabits().filter(h => HabitUtils.isCompleted(h)).length
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
        ? Math.round(active.reduce((sum, h) => sum + h.currentStreak, 0) / active.length)
        : 0,
      longestStreak: active.length > 0
        ? Math.max(...active.map(h => h.longestStreak))
        : 0
    };
  });

  constructor() {
    this.loadFromStorage();
  }

  // CRUD Operations
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

  updateHabit(id: string, updates: Partial<Habit>): void {
    this.habitsSignal.update(habits =>
      habits.map(h => h.id === id ? { ...h, ...updates } : h)
    );
    this.saveToStorage();
  }

  deleteHabit(id: string): void {
    this.habitsSignal.update(habits => habits.filter(h => h.id !== id));
    this.saveToStorage();
  }

  // Habit actions
  markHabitToday(id: string): void {
    this.habitsSignal.update(habits =>
      habits.map(h => {
        if (h.id !== id) return h;

        const wasCompleted = HabitUtils.isCompleted(h);
        const newCompleted = !wasCompleted;
        const newStreak = newCompleted ? h.currentStreak + 1 : Math.max(0, h.currentStreak - 1);

        return {
          ...h,
          completedToday: newCompleted,
          currentStreak: newStreak,
          longestStreak: Math.max(h.longestStreak, newStreak),
          currentStep: newCompleted ? h.goal : 0,
          progress: newCompleted ? 100 : 0,
          lastCheckIn: new Date().toISOString()
        };
      })
    );
    this.saveToStorage();
  }

  incrementHabitStep(id: string): void {
    this.habitsSignal.update(habits =>
      habits.map(h => {
        if (h.id !== id) return h;

        const newStep = Math.min(h.currentStep + 1, h.goal);
        const newProgress = HabitUtils.calculateProgress(newStep, h.goal);
        const isNowCompleted = newStep >= h.goal;
        const newStreak = isNowCompleted && !h.completedToday 
          ? h.currentStreak + 1 
          : h.currentStreak;

        return {
          ...h,
          currentStep: newStep,
          progress: newProgress,
          completedToday: isNowCompleted,
          currentStreak: newStreak,
          longestStreak: Math.max(h.longestStreak, newStreak),
          lastCheckIn: new Date().toISOString()
        };
      })
    );
    this.saveToStorage();
  }

  undoHabitStep(id: string): void {
    this.habitsSignal.update(habits =>
      habits.map(h => {
        if (h.id !== id || h.currentStep === 0) return h;

        const newStep = Math.max(0, h.currentStep - 1);
        const newProgress = HabitUtils.calculateProgress(newStep, h.goal);
        const wasCompleted = HabitUtils.isCompleted(h);
        const isStillCompleted = newStep >= h.goal;
        const newStreak = wasCompleted && !isStillCompleted
          ? Math.max(0, h.currentStreak - 1)
          : h.currentStreak;

        return {
          ...h,
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

  // Storage
  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.habits()));
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const habits = JSON.parse(stored) as Habit[];
        this.habitsSignal.set(habits);
      } catch (e) {
        console.error('Failed to load habits from storage', e);
      }
    } else {
      // Load demo data
      this.loadDemoData();
    }
  }

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
  getHabitById(id: string): Habit | undefined {
    return this.habits().find(h => h.id === id);
  }

  filterHabits(searchTerm: string, frequency?: string): Habit[] {
    let filtered = this.activeHabits();

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(h => h.name.toLowerCase().includes(term));
    }

    if (frequency && frequency !== 'all') {
      filtered = filtered.filter(h => h.frequency === frequency);
    }

    return filtered;
  }
}
```

**Тесты:**
```typescript
// core/services/habit.service.spec.ts
describe('HabitService', () => {
  it('should add habit', () => { ... });
  it('should mark habit as complete', () => { ... });
  it('should increment multi-goal habit', () => { ... });
  it('should calculate completion rate', () => { ... });
});
```

**Результат:** HabitService работает, тесты проходят

---

### 1.2. ThemeService - управление темой
**Файл:** `core/services/theme.service.ts`

```typescript
import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'streakflow_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSignal = signal<Theme>('system');
  readonly theme = this.themeSignal.asReadonly();

  readonly isDark = signal<boolean>(false);

  constructor() {
    this.loadTheme();
    this.applyTheme();

    // Auto-apply theme on change
    effect(() => {
      this.applyTheme();
    });
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    this.saveTheme();
  }

  toggleTheme(): void {
    const currentIsDark = this.isDark();
    this.setTheme(currentIsDark ? 'light' : 'dark');
  }

  private applyTheme(): void {
    const theme = this.theme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = theme === 'dark' || (theme === 'system' && prefersDark);
    this.isDark.set(shouldBeDark);

    document.documentElement.classList.toggle('dark', shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }

  private loadTheme(): void {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      this.themeSignal.set(stored);
    }
  }

  private saveTheme(): void {
    localStorage.setItem(STORAGE_KEY, this.theme());
  }
}
```

**Результат:** ThemeService работает

---

### 1.3. ToastService - уведомления
**Файл:** `core/services/toast.service.ts`

```typescript
import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  show(message: string, type: Toast['type'] = 'info', duration = 3000): void {
    const toast: Toast = {
      id: `toast_${Date.now()}`,
      type,
      message,
      duration
    };

    this.toastsSignal.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(toast.id), duration);
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  remove(id: string): void {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }
}
```

**Результат:** ToastService работает

---

## **PHASE 2: Презентационные компоненты** (3-4 дня)
### Цель: Создать переиспользуемые dumb компоненты

### 2.1. HabitCard - карточка привычки
**Файл:** `shared/components/habit-card/habit-card.component.ts`

```typescript
import { Component, input, output, computed, signal } from '@angular/core';
import { Habit } from '../../../core/models/habit.model';
import { HabitUtils } from '../../../core/utils/habit.utils';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiProgressComponent } from '@streakflow/ui/progress';
import { UiCardComponent } from '@streakflow/ui/card';

@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [UiButtonComponent, UiProgressComponent, UiCardComponent],
  templateUrl: './habit-card.component.html',
  styleUrl: './habit-card.component.scss'
})
export class HabitCardComponent {
  // Inputs
  readonly habit = input.required<Habit>();

  // Outputs
  readonly markToday = output<void>();
  readonly incrementStep = output<void>();
  readonly undoToday = output<void>();

  // Local UI state
  readonly isAnimating = signal(false);
  readonly justCompleted = signal(false);

  // Computed
  readonly isMultiGoal = computed(() => HabitUtils.isMultiGoal(this.habit()));
  readonly isCompleted = computed(() => HabitUtils.isCompleted(this.habit()));
  readonly displayProgress = computed(() => 
    HabitUtils.calculateProgress(this.habit().currentStep, this.habit().goal)
  );

  onActionClick(): void {
    const habit = this.habit();
    
    if (this.isCompleted()) {
      this.handleUndo();
    } else if (this.isMultiGoal()) {
      this.handleIncrement();
    } else {
      this.handleMark();
    }
  }

  private handleMark(): void {
    this.animate();
    this.markToday.emit();
  }

  private handleIncrement(): void {
    this.animate();
    this.incrementStep.emit();
  }

  private handleUndo(): void {
    this.animate();
    this.undoToday.emit();
  }

  private animate(): void {
    this.isAnimating.set(true);
    setTimeout(() => this.isAnimating.set(false), 300);
  }
}
```

**Template:** `habit-card.component.html` (см. прототип)

**Результат:** HabitCard отображается и работает

---

### 2.2. KPICard - карточка метрики
**Файл:** `shared/components/kpi-card/kpi-card.component.ts`

```typescript
import { Component, input } from '@angular/core';
import { KPIData } from '../../../core/models/analytics.model';
import { UiCardComponent } from '@streakflow/ui/card';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent {
  readonly data = input.required<KPIData>();
}
```

**Результат:** KPICard отображается

---

### 2.3. PageHeader - заголовок страницы
**Файл:** `shared/components/page-header/page-header.component.ts`

```typescript
import { Component, input, output } from '@angular/core';
import { UiButtonComponent } from '@streakflow/ui/button';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [UiButtonComponent],
  template: `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">{{ title() }}</h1>
        @if (description()) {
          <p class="text-muted-foreground">{{ description() }}</p>
        }
      </div>
      @if (actionLabel()) {
        <ui-button (click)="action.emit()">
          {{ actionLabel() }}
        </ui-button>
      }
    </div>
  `
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly actionLabel = input<string>();
  readonly action = output<void>();
}
```

**Результат:** PageHeader переиспользуется

---

### 2.4. EmptyState - пустое состояние
**Файл:** `shared/components/empty-state/empty-state.component.ts`

```typescript
import { Component, input, output } from '@angular/core';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiCardComponent } from '@streakflow/ui/card';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent],
  template: `
    <ui-card class="p-12 text-center">
      <div class="space-y-4">
        <div class="text-6xl">{{ icon() }}</div>
        <div>
          <h3 class="text-lg font-semibold text-foreground">{{ title() }}</h3>
          <p class="text-muted-foreground">{{ description() }}</p>
        </div>
        @if (actionLabel()) {
          <ui-button (click)="action.emit()">
            {{ actionLabel() }}
          </ui-button>
        }
      </div>
    </ui-card>
  `
})
export class EmptyStateComponent {
  readonly icon = input<string>('📭');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly actionLabel = input<string>();
  readonly action = output<void>();
}
```

**Результат:** EmptyState переиспользуется

---

### 2.5. HabitStatusControls - контролы состояния
(Аналогично прототипу, адаптировать для Angular)

**Результат:** HabitStatusControls работает в таблице

---

### 2.6. ToastContainer - контейнер уведомлений
**Файл:** `shared/components/toast-container/toast-container.component.ts`

```typescript
import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { UiCardComponent } from '@streakflow/ui/card';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [UiCardComponent],
  template: `
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      @for (toast of toasts(); track toast.id) {
        <ui-card 
          [class]="'p-4 min-w-[300px] animate-slide-in-right ' + getToastClass(toast.type)"
        >
          <div class="flex items-center gap-2">
            <span>{{ getToastIcon(toast.type) }}</span>
            <p class="flex-1">{{ toast.message }}</p>
            <button (click)="remove(toast.id)" class="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>
        </ui-card>
      }
    </div>
  `
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);
  readonly toasts = this.toastService.toasts;

  remove(id: string): void {
    this.toastService.remove(id);
  }

  getToastIcon(type: string): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  }

  getToastClass(type: string): string {
    switch (type) {
      case 'success': return 'border-green-500 bg-green-50 dark:bg-green-950';
      case 'error': return 'border-red-500 bg-red-50 dark:bg-red-950';
      case 'warning': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      default: return 'border-blue-500 bg-blue-50 dark:bg-blue-950';
    }
  }
}
```

**Результат:** Уведомления работают

---

## **PHASE 3: Layout и навигация** (2-3 дня)
### Цель: Создать структуру приложения

### 3.1. AppShell - главный контейнер
**Файл:** `layout/app-shell/app-shell.component.ts`

```typescript
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { AppSidebarComponent } from '../sidebar/app-sidebar.component';
import { AppTopbarComponent } from '../topbar/app-topbar.component';
import { ToastContainerComponent } from '../../shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    AppSidebarComponent,
    AppTopbarComponent,
    ToastContainerComponent
  ],
  template: `
    <div class="min-h-screen bg-background">
      <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <app-sidebar 
          [open]="sidebarOpen()"
          (openChange)="sidebarOpen.set($event)"
        />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Topbar -->
          <app-topbar 
            [title]="currentTitle()"
            (toggleSidebar)="toggleSidebar()"
          />

          <!-- Page Content -->
          <main class="flex-1 overflow-auto p-4 md:p-6">
            <router-outlet />
          </main>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <app-toast-container />
  `
})
export class AppShellComponent {
  private themeService = inject(ThemeService);
  
  readonly sidebarOpen = signal(true);
  readonly currentTitle = signal('Dashboard');

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }
}
```

**Результат:** AppShell создан

---

### 3.2. AppSidebar - боковая панель
**Файл:** `layout/sidebar/app-sidebar.component.ts`

```typescript
import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { 
  UiSidebarComponent,
  UiSidebarHeaderComponent,
  UiSidebarContentComponent,
  UiSidebarFooterComponent,
  UiSidebarMenuComponent,
  UiSidebarMenuItemComponent,
  UiSidebarMenuButtonComponent
} from '@streakflow/ui/sidebar';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    UiSidebarComponent,
    UiSidebarHeaderComponent,
    UiSidebarContentComponent,
    UiSidebarFooterComponent,
    UiSidebarMenuComponent,
    UiSidebarMenuItemComponent,
    UiSidebarMenuButtonComponent
  ],
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebarComponent {
  readonly open = input<boolean>(true);
  readonly openChange = output<boolean>();

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '📊' },
    { label: 'Habits', route: '/habits', icon: '✅' },
    { label: 'Analytics', route: '/analytics', icon: '📈' },
    { label: 'Profile', route: '/profile', icon: '👤' }
  ];
}
```

**Результат:** Sidebar с навигацией

---

### 3.3. AppTopbar - верхний бар
**Файл:** `layout/topbar/app-topbar.component.ts`

```typescript
import { Component, input, output, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { UiButtonComponent } from '@streakflow/ui/button';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [UiButtonComponent],
  template: `
    <header class="h-16 border-b flex items-center justify-between px-4">
      <div class="flex items-center gap-4">
        <ui-button variant="ghost" size="sm" (click)="toggleSidebar.emit()">
          <span class="text-xl">☰</span>
        </ui-button>
        <h1 class="font-semibold text-lg">{{ title() }}</h1>
      </div>

      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <ui-button 
          variant="ghost" 
          size="sm"
          (click)="themeService.toggleTheme()"
        >
          {{ themeService.isDark() ? '☀️' : '🌙' }}
        </ui-button>
      </div>
    </header>
  `
})
export class AppTopbarComponent {
  readonly themeService = inject(ThemeService);
  
  readonly title = input.required<string>();
  readonly toggleSidebar = output<void>();
}
```

**Результат:** Topbar упрощен и работает

---

### 3.4. Routing
**Файл:** `app.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'habits',
    loadComponent: () => 
      import('./features/habits/habits.component').then(m => m.HabitsComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => 
      import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => 
      import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
```

**Обновить:** `app.ts` использовать AppShellComponent

**Результат:** Роутинг настроен

---

## **PHASE 4: Экраны (Features)** (4-5 дней)
### Цель: Создать основные экраны приложения

### 4.1. Dashboard - главный экран
**Файл:** `features/dashboard/dashboard.component.ts`

```typescript
import { Component, inject } from '@angular/core';
import { HabitService } from '../../core/services/habit.service';
import { ToastService } from '../../core/services/toast.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { HabitCardComponent } from '../../shared/components/habit-card/habit-card.component';
import { KPIData } from '../../core/models/analytics.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PageHeaderComponent,
    KpiCardComponent,
    HabitCardComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private habitService = inject(HabitService);
  private toastService = inject(ToastService);

  // Data from service
  readonly habits = this.habitService.activeHabits;
  readonly stats = this.habitService.stats;

  // KPI Data
  readonly kpiData: KPIData[] = [
    {
      title: "Today's Completion",
      value: `${this.habitService.completionRate()}%`,
      icon: '🎯',
      trend: 'up',
      trendValue: '+5% from yesterday'
    },
    {
      title: 'Active Habits',
      value: this.stats().totalHabits,
      icon: '✅',
      trend: 'neutral'
    },
    {
      title: 'Average Streak',
      value: `${this.stats().averageStreak} days`,
      icon: '🔥',
      trend: 'up'
    },
    {
      title: 'Longest Streak',
      value: `${this.stats().longestStreak} days`,
      icon: '🏆',
      trend: 'neutral'
    }
  ];

  // Actions
  onMarkHabit(id: string): void {
    this.habitService.markHabitToday(id);
    this.toastService.success('Habit marked as complete! 🎉');
  }

  onIncrementStep(id: string): void {
    this.habitService.incrementHabitStep(id);
    this.toastService.success('Progress updated!');
  }

  onUndoStep(id: string): void {
    this.habitService.undoHabitStep(id);
    this.toastService.info('Progress undone');
  }

  onAddHabit(): void {
    // Open modal (Phase 5)
    console.log('Add habit clicked');
  }
}
```

**Template:** `dashboard.component.html`

```html
<app-page-header 
  title="Dashboard"
  description="Track your daily habits and progress"
  actionLabel="Add Habit"
  (action)="onAddHabit()"
/>

<!-- KPI Cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  @for (kpi of kpiData; track kpi.title) {
    <app-kpi-card [data]="kpi" />
  }
</div>

<!-- Today's Habits -->
<div class="space-y-4">
  <h2 class="text-xl font-semibold">Today's Habits</h2>
  
  @if (habits().length === 0) {
    <app-empty-state
      title="No habits yet"
      description="Start by creating your first habit!"
      actionLabel="Add Habit"
      (action)="onAddHabit()"
    />
  } @else {
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      @for (habit of habits(); track habit.id) {
        <app-habit-card
          [habit]="habit"
          (markToday)="onMarkHabit(habit.id)"
          (incrementStep)="onIncrementStep(habit.id)"
          (undoToday)="onUndoStep(habit.id)"
        />
      }
    </div>
  }
</div>
```

**Результат:** Dashboard работает

---

### 4.2. Habits - список привычек
**Файл:** `features/habits/habits.component.ts`

```typescript
import { Component, inject, signal } from '@angular/core';
import { HabitService } from '../../core/services/habit.service';
import { ToastService } from '../../core/services/toast.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { UiInputComponent } from '@streakflow/ui/input';
import { UiCardComponent } from '@streakflow/ui/card';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [
    PageHeaderComponent,
    EmptyStateComponent,
    UiInputComponent,
    UiCardComponent
  ],
  templateUrl: './habits.component.html'
})
export class HabitsComponent {
  private habitService = inject(HabitService);
  private toastService = inject(ToastService);

  readonly habits = this.habitService.activeHabits;
  readonly searchTerm = signal('');
  readonly frequencyFilter = signal('all');

  filteredHabits = computed(() => {
    return this.habitService.filterHabits(
      this.searchTerm(),
      this.frequencyFilter()
    );
  });

  onAddHabit(): void {
    // Open modal
  }

  onEditHabit(id: string): void {
    // Open edit modal
  }

  onDeleteHabit(id: string): void {
    this.habitService.deleteHabit(id);
    this.toastService.success('Habit deleted');
  }
}
```

**Результат:** Habits экран работает

---

### 4.3. Analytics - аналитика
(Простая версия для MVP, без графиков)

**Файл:** `features/analytics/analytics.component.ts`

```typescript
import { Component, inject } from '@angular/core';
import { HabitService } from '../../core/services/habit.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [PageHeaderComponent, EmptyStateComponent],
  template: `
    <app-page-header
      title="Analytics"
      description="Track your progress and insights"
    />

    @if (habits().length === 0) {
      <app-empty-state
        icon="📊"
        title="No data yet"
        description="Start tracking habits to see analytics"
      />
    } @else {
      <div class="text-center p-12">
        <p class="text-muted-foreground">Analytics coming soon!</p>
      </div>
    }
  `
})
export class AnalyticsComponent {
  private habitService = inject(HabitService);
  readonly habits = this.habitService.activeHabits;
}
```

**Результат:** Analytics заглушка работает

---

### 4.4. Profile - профиль
(Простая версия для MVP)

**Файл:** `features/profile/profile.component.ts`

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UiCardComponent } from '@streakflow/ui/card';
import { UiButtonComponent } from '@streakflow/ui/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PageHeaderComponent, UiCardComponent, UiButtonComponent],
  template: `
    <app-page-header
      title="Settings"
      description="Manage your preferences"
    />

    <ui-card class="p-6 max-w-2xl">
      <h3 class="text-lg font-semibold mb-4">Theme</h3>
      <div class="flex gap-2">
        <ui-button (click)="themeService.setTheme('light')">
          ☀️ Light
        </ui-button>
        <ui-button (click)="themeService.setTheme('dark')">
          🌙 Dark
        </ui-button>
        <ui-button (click)="themeService.setTheme('system')">
          💻 System
        </ui-button>
      </div>
    </ui-card>
  `
})
export class ProfileComponent {
  readonly themeService = inject(ThemeService);
}
```

**Результат:** Profile базовая версия работает

---

## **PHASE 5: Модалки** (2-3 дня)
### Цель: Добавить создание/редактирование привычек

### 5.1. AddHabitModal
**Файл:** `modals/add-habit-modal/add-habit-modal.component.ts`

```typescript
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HabitService } from '../../core/services/habit.service';
import { ToastService } from '../../core/services/toast.service';
import { CustomValidators } from '../../core/utils/validators';
import { UiDialogService } from '@streakflow/ui/dialog';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiInputComponent } from '@streakflow/ui/input';
import { UiLabelComponent } from '@streakflow/ui/label';

@Component({
  selector: 'app-add-habit-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiButtonComponent,
    UiInputComponent,
    UiLabelComponent
  ],
  templateUrl: './add-habit-modal.component.html'
})
export class AddHabitModalComponent {
  private fb = inject(FormBuilder);
  private habitService = inject(HabitService);
  private toastService = inject(ToastService);

  readonly habitIcons = ['🎯', '💧', '💪', '📚', '🧘', '🏃', '🥗', '💤', '🎨', '🎵'];
  readonly habitColors = ['#4F46E5', '#06B6D4', '#22C55E', '#A855F7', '#F97316', '#EF4444'];

  readonly form: FormGroup = this.fb.group({
    name: ['', [CustomValidators.habitName()]],
    goal: [1, [Validators.required, Validators.min(1)]],
    frequency: ['daily'],
    icon: ['🎯'],
    color: ['#4F46E5'],
    weekdays: [[true, true, true, true, true, true, true]]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.habitService.addHabit(this.form.value);
      this.toastService.success('Habit created successfully! 🎉');
      this.form.reset();
    }
  }
}
```

**Результат:** Можно создавать привычки

---

### 5.2. EditHabitModal
(Аналогично AddHabitModal, но с предзаполнением)

**Результат:** Можно редактировать привычки

---

### 5.3. DeleteHabitModal
**Файл:** `modals/delete-habit-modal/delete-habit-modal.component.ts`

```typescript
import { Component, input, inject } from '@angular/core';
import { HabitService } from '../../core/services/habit.service';
import { ToastService } from '../../core/services/toast.service';
import { UiButtonComponent } from '@streakflow/ui/button';

@Component({
  selector: 'app-delete-habit-modal',
  standalone: true,
  imports: [UiButtonComponent],
  template: `
    <div class="p-6">
      <h3 class="text-lg font-semibold mb-2">Delete Habit?</h3>
      <p class="text-muted-foreground mb-4">
        Are you sure you want to delete "{{ habitName() }}"? This action cannot be undone.
      </p>
      <div class="flex gap-2 justify-end">
        <ui-button variant="outline" (click)="onCancel()">Cancel</ui-button>
        <ui-button variant="destructive" (click)="onConfirm()">Delete</ui-button>
      </div>
    </div>
  `
})
export class DeleteHabitModalComponent {
  readonly habitId = input.required<string>();
  readonly habitName = input.required<string>();

  private habitService = inject(HabitService);
  private toastService = inject(ToastService);

  onConfirm(): void {
    this.habitService.deleteHabit(this.habitId());
    this.toastService.success('Habit deleted');
  }

  onCancel(): void {
    // Close modal
  }
}
```

**Результат:** Можно удалять привычки с подтверждением

---

## **🎉 MVP ГОТОВ!** (10-15 дней разработки)

На этом этапе у нас есть **работающее приложение**:
- ✅ Создание/редактирование/удаление привычек
- ✅ Отметка выполнения (single + multi-goal)
- ✅ Dashboard с KPI и карточками
- ✅ Habits список
- ✅ Переключатель темы
- ✅ Toast уведомления
- ✅ Локальное хранение

---

## **PHASE 6: Аутентификация** (3-4 дня)
### Цель: Добавить систему входа/регистрации

### 6.1. AuthService - управление аутентификацией
**Файл:** `core/services/auth.service.ts`

```typescript
import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthState, LoginCredentials, SignUpData } from '../models/user.model';

const STORAGE_KEY_USER = 'streakflow_user';
const STORAGE_KEY_TOKEN = 'streakflow_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStateSignal = signal<AuthState>({
    isAuthenticated: false,
    user: null,
    token: undefined
  });

  readonly authState = this.authStateSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.authState().isAuthenticated);
  readonly currentUser = computed(() => this.authState().user);

  constructor(private router: Router) {
    this.loadAuthState();
  }

  // Mock login (без backend)
  async login(credentials: LoginCredentials): Promise<void> {
    // Simulate API call
    await this.delay(1000);

    // Mock validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Invalid credentials');
    }

    // Mock user
    const user: User = {
      id: 'user_1',
      email: credentials.email,
      fullName: 'Demo User',
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

  async signUp(data: SignUpData): Promise<void> {
    // Simulate API call
    await this.delay(1000);

    // Validation
    if (!data.email || !data.password || !data.fullName) {
      throw new Error('All fields are required');
    }

    // Create user
    const user: User = {
      id: this.generateId(),
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
    this.router.navigate(['/onboarding']); // Show onboarding for new users
  }

  logout(): void {
    this.authStateSignal.set({
      isAuthenticated: false,
      user: null,
      token: undefined
    });

    this.clearAuthState();
    this.router.navigate(['/auth/welcome']);
  }

  updateUser(updates: Partial<User>): void {
    const currentUser = this.currentUser();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    this.authStateSignal.update(state => ({
      ...state,
      user: updatedUser
    }));

    this.saveAuthState();
  }

  // Storage
  private saveAuthState(): void {
    const state = this.authState();
    if (state.user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(state.user));
    }
    if (state.token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, state.token);
    }
  }

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
      } catch (e) {
        console.error('Failed to load auth state', e);
        this.clearAuthState();
      }
    }
  }

  private clearAuthState(): void {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }

  // Utils
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateMockToken(): string {
    return `mock_token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

**Результат:** AuthService готов

---

### 6.2. Auth Guard - защита роутов
**Файл:** `core/guards/auth.guard.ts`

```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/welcome']);
  return false;
};

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
```

**Результат:** Guards готовы

---

### 6.3. Auth экраны

#### WelcomeScreen
**Файл:** `features/auth/welcome/welcome.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiCardComponent } from '@streakflow/ui/card';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, UiButtonComponent, UiCardComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <ui-card class="max-w-md w-full p-8 text-center">
        <div class="text-6xl mb-4">🔥</div>
        <h1 class="text-3xl font-bold mb-2">StreakFlow</h1>
        <p class="text-muted-foreground mb-8">
          Build better habits, one day at a time
        </p>

        <div class="space-y-3">
          <ui-button 
            [routerLink]="['/auth/signup']" 
            class="w-full"
          >
            Get Started
          </ui-button>
          <ui-button 
            [routerLink]="['/auth/login']" 
            variant="outline"
            class="w-full"
          >
            Sign In
          </ui-button>
        </div>
      </ui-card>
    </div>
  `
})
export class WelcomeComponent {}
```

#### LoginScreen
**Файл:** `features/auth/login/login.component.ts`

```typescript
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiInputComponent } from '@streakflow/ui/input';
import { UiLabelComponent } from '@streakflow/ui/label';
import { UiCardComponent } from '@streakflow/ui/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    UiButtonComponent,
    UiInputComponent,
    UiLabelComponent,
    UiCardComponent
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <ui-card class="max-w-md w-full p-8">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold">Welcome Back</h1>
          <p class="text-muted-foreground">Sign in to your account</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="space-y-2">
            <ui-label>Email</ui-label>
            <ui-input 
              type="email" 
              formControlName="email" 
              placeholder="you@example.com"
            />
          </div>

          <div class="space-y-2">
            <ui-label>Password</ui-label>
            <ui-input 
              type="password" 
              formControlName="password" 
              placeholder="••••••••"
            />
          </div>

          <ui-button 
            type="submit" 
            [disabled]="!form.valid || isLoading()"
            class="w-full"
          >
            {{ isLoading() ? 'Signing in...' : 'Sign In' }}
          </ui-button>
        </form>

        <div class="mt-4 text-center text-sm">
          <span class="text-muted-foreground">Don't have an account?</span>
          <a [routerLink]="['/auth/signup']" class="text-primary hover:underline ml-1">
            Sign up
          </a>
        </div>
      </ui-card>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  readonly isLoading = signal(false);

  readonly form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {
    if (!this.form.valid) return;

    this.isLoading.set(true);

    try {
      await this.authService.login(this.form.value);
      this.toastService.success('Welcome back! 👋');
    } catch (error: any) {
      this.toastService.error(error.message || 'Login failed');
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

#### SignUpScreen
**Файл:** `features/auth/signup/signup.component.ts`
(Аналогично LoginComponent, но с дополнительным полем fullName)

**Результат:** Auth экраны готовы

---

### 6.4. Обновить роутинг с Guards
**Файл:** `app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      {
        path: 'welcome',
        loadComponent: () => import('./features/auth/welcome/welcome.component').then(m => m.WelcomeComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignUpComponent)
      }
    ]
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'habits',
        loadComponent: () => import('./features/habits/habits.component').then(m => m.HabitsComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/welcome'
  }
];
```

**Результат:** Роутинг с защитой готов

---

## **PHASE 7: Storybook + Visual Testing (Pixel-Perfect)** (7-10 дней)
### Цель: Обеспечить 100% pixel-perfect соответствие через Storybook + Playwright

**⚠️ ВАЖНО:** Phase 7 должна быть выполнена ПЕРЕД Phase 8 (Mobile adaptation)  
**Причина:** Storybook + Playwright необходимы для автоматической проверки pixel-perfect на всех viewport'ах

**Стратегия:**
1. 📚 Storybook для React прототипа → эталонные stories
2. 📚 Storybook для Angular → наши stories
3. 🎭 Playwright → автоматическое сравнение компонент
4. 🔧 Итеративное исправление → компонент за компонентом
5. ✅ Unit тесты → логика работает

**📄 Детальная документация:** См. `PHASE_8_VISUAL_TESTING.md`

**Результат:** Инструменты для pixel-perfect проверки готовы

---

## **PHASE 8: Адаптивность и мобильная версия** (2-3 дня)
### Цель: Сделать приложение responsive (с использованием Storybook из Phase 7)

**⚠️ ВАЖНО:** Требуется завершенная Phase 7 (Storybook + Visual Testing)  
**Причина:** Проверяем pixel-perfect на Desktop/Tablet/Mobile через Playwright

---

### 8.1. MobileNav - мобильная навигация
**Файл:** `layout/mobile-nav/mobile-nav.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiButtonComponent } from '@streakflow/ui/button';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, UiButtonComponent],
  template: `
    <nav class="fixed bottom-0 left-0 right-0 bg-card border-t md:hidden z-40">
      <div class="flex justify-around py-2">
        <a 
          [routerLink]="['/dashboard']" 
          routerLinkActive="text-primary"
          class="flex flex-col items-center gap-1 p-2"
        >
          <span class="text-xl">📊</span>
          <span class="text-xs">Dashboard</span>
        </a>
        <a 
          [routerLink]="['/habits']" 
          routerLinkActive="text-primary"
          class="flex flex-col items-center gap-1 p-2"
        >
          <span class="text-xl">✅</span>
          <span class="text-xs">Habits</span>
        </a>
        <a 
          [routerLink]="['/analytics']" 
          routerLinkActive="text-primary"
          class="flex flex-col items-center gap-1 p-2"
        >
          <span class="text-xl">📈</span>
          <span class="text-xl">Analytics</span>
        </a>
        <a 
          [routerLink]="['/profile']" 
          routerLinkActive="text-primary"
          class="flex flex-col items-center gap-1 p-2"
        >
          <span class="text-xl">👤</span>
          <span class="text-xs">Profile</span>
        </a>
      </div>
    </nav>
  `
})
export class MobileNavComponent {}
```

**Обновить:** AppShellComponent добавить MobileNav

**Результат:** Мобильная навигация работает

---

### 8.2. Адаптивные стили
- Обновить все компоненты с `sm:`, `md:`, `lg:` breakpoints
- Скрыть sidebar на мобильных
- Адаптировать grid layouts
- Добавить `pb-20` на mobile для MobileNav

**Результат:** Приложение адаптивное

---

### 8.3. Visual Testing на всех viewport'ах
**Использовать Playwright из Phase 7:**

```bash
# Test на всех устройствах
npm run test:visual:compare -- --project="Desktop - Light"
npm run test:visual:compare -- --project="Desktop - Dark"
npm run test:visual:compare -- --project="Tablet"
npm run test:visual:compare -- --project="Mobile"
```

**Результат:** Pixel-perfect на всех устройствах ✅

---

## **PHASE 9: Улучшения и полировка** (3-5 дней)
### Цель: Довести до production quality

### 9.1. OnboardingModal
(Приветствие новых пользователей с созданием первой привычки)

### 9.2. Analytics с графиками
- Интегрировать библиотеку графиков (ngx-charts или chart.js)
- Реализовать WeeklyChart
- Реализовать BarChart
- Реализовать PieChart

### 9.3. Дополнительные фичи
- ViewHistoryModal - календарь истории привычки
- NotificationsDropdown - уведомления
- SearchBar - поиск по привычкам
- AvatarUploadModal - загрузка аватара
- Keyboard shortcuts

**Результат:** Приложение полированное

---

## **PHASE 10: Backend интеграция** (5-7 дней)
### Цель: Подключить реальный backend API

### 10.1. API Service
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // Auth
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials);
  }

  // Habits
  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.baseUrl}/habits`);
  }

  createHabit(habit: HabitForm): Observable<Habit> {
    return this.http.post<Habit>(`${this.baseUrl}/habits`, habit);
  }

  updateHabit(id: string, updates: Partial<Habit>): Observable<Habit> {
    return this.http.patch<Habit>(`${this.baseUrl}/habits/${id}`, updates);
  }

  deleteHabit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/habits/${id}`);
  }
}
```

### 10.2. Environment Configuration
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.streakflow.com'
};
```

### 10.3. HTTP Interceptors
```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

// error.interceptor.ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toastService.error(error.message || 'Something went wrong');
      return throwError(() => error);
    })
  );
};
```

### 10.4. Update Services to use API
```typescript
// habit.service.ts - refactor to use ApiService
@Injectable({ providedIn: 'root' })
export class HabitService {
  private apiService = inject(ApiService);
  private habitsSignal = signal<Habit[]>([]);

  loadHabits(): void {
    this.apiService.getHabits().subscribe(habits => {
      this.habitsSignal.set(habits);
    });
  }

  addHabit(form: HabitForm): void {
    this.apiService.createHabit(form).subscribe(habit => {
      this.habitsSignal.update(habits => [...habits, habit]);
    });
  }

  // ... other methods
}
```

**Результат:** Backend интеграция готова

---

## **ЗАВЕРШЕНИЕ ПРОЕКТА**

### Checklist финальной проверки:

**Code Quality:**
- ✅ 0 ESLint errors
- ✅ 0 TypeScript errors  
- ✅ All imports resolved
- ✅ No console.logs in production

**Tests:**
- ✅ Unit tests: 85%+ coverage
- ✅ Component tests: passing
- ✅ E2E tests: critical paths covered
- ✅ Visual tests: pixel-perfect ✅

**Performance:**
- ✅ Lighthouse score 90+
- ✅ FCP < 1.5s
- ✅ LCP < 2.5s
- ✅ Bundle size optimized

**Accessibility:**
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Color contrast ratios

**Security:**
- ✅ XSS prevention
- ✅ CSRF protection
- ✅ Secure headers
- ✅ Input validation

**Documentation:**
- ✅ README.md updated
- ✅ API documentation
- ✅ Storybook stories
- ✅ Deployment guide

---

**🎉 ПРОЕКТ ГОТОВ К ДЕПЛОЮ!**
