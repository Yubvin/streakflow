# StreakFlow - Правила разработки
## Development Guidelines & Best Practices

---

## 🎯 Общие принципы

### 0. **CRITICAL THINKING - Критическое мышление** ⭐ **ГЛАВНОЕ ПРАВИЛО**

**ВСЕГДА ставь под сомнение каждое решение:**

#### ✅ Вопросы перед написанием кода:
```
❓ Можно ли сделать ПРОЩЕ?
❓ Нужна ли эта абстракция СЕЙЧАС?
❓ Не добавляю ли я ЛИШНЮЮ сложность?
❓ Есть ли более ЭЛЕГАНТНОЕ решение?
❓ Нужен ли этот код ВООБЩЕ?
❓ Решает ли это РЕАЛЬНУЮ проблему?
❓ Будет ли это понятно через 6 месяцев?
```

#### ✅ RED FLAGS - когда остановиться и переосмыслить:

```typescript
// 🚨 RED FLAG: Слишком много параметров
function createHabit(name, icon, color, goal, frequency, weekdays, reminders, tags, notes, archived) { }
// ✅ ЛУЧШЕ: Передать объект
function createHabit(habitData: HabitForm) { }

// 🚨 RED FLAG: Глубокая вложенность
if (user) {
  if (user.habits) {
    if (user.habits.length > 0) {
      if (user.habits[0].completed) { }
    }
  }
}
// ✅ ЛУЧШЕ: Early returns
if (!user?.habits?.length) return;
if (!user.habits[0].completed) return;

// 🚨 RED FLAG: Абстракция "на будущее"
class HabitFactory {
  createHabit() { }
  createMultiGoalHabit() { }
  createCustomHabit() { }
}
// ✅ ЛУЧШЕ: Простая функция
function createHabit(form: HabitForm): Habit { }

// 🚨 RED FLAG: Избыточная типизация
type HabitId = string;
type HabitName = string;
type HabitIcon = string;
// ✅ ЛУЧШЕ: Простые типы где достаточно
interface Habit {
  id: string;
  name: string;
  icon: string;
}

// 🚨 RED FLAG: Utility класс с одним методом
class HabitHelper {
  static calculateProgress(step: number, goal: number) { }
}
// ✅ ЛУЧШЕ: Просто функция
export function calculateProgress(step: number, goal: number) { }
```

#### 📋 Checklist перед коммитом:

```
□ Удалил ли я весь закомментированный код?
□ Удалил ли я все console.log()?
□ Удалил ли я неиспользуемые импорты?
□ Могу ли я упростить эту функцию?
□ Нет ли дублирования кода?
□ Нужны ли все эти параметры?
□ Понятны ли названия переменных?
□ Не слишком ли сложная эта абстракция?
```

#### 💡 Правило трех раз:

```
1-й раз: Пиши inline код
2-й раз: Заметил повтор? Все еще OK inline
3-й раз: ТЕПЕРЬ вынеси в функцию/компонент

❌ НЕ создавай абстракцию после первого использования!
```

#### 🎯 Принцип "Начни с простого":

```typescript
// ❌ НЕПРАВИЛЬНО: Сразу сложное решение
class HabitStateManager {
  private state$ = new BehaviorSubject<HabitState>({});
  private actions$ = new Subject<HabitAction>();
  
  dispatch(action: HabitAction) { }
  select<T>(selector: (state: HabitState) => T) { }
}

// ✅ ПРАВИЛЬНО: Начни с простого
const habits = signal<Habit[]>([]);

// Усложняй ТОЛЬКО если появится реальная необходимость
```

**Помни:** 
- Простой код > Умный код
- Работающий код > Идеальный код
- Понятный код > Короткий код
- Удаляемый код > Расширяемый код

---

### 1. **KISS (Keep It Simple, Stupid)**
- Простой код лучше сложного
- Если можно сделать проще - делай проще
- Не усложняй без необходимости

### 2. **DRY (Don't Repeat Yourself)**
- Не дублируй код
- Вынеси повторяющуюся логику в функции/сервисы
- Создай переиспользуемые компоненты

### 3. **YAGNI (You Aren't Gonna Need It)**
- Не пиши код "на будущее"
- Реализуй только то, что нужно сейчас
- Не создавай абстракции заранее

### 4. **Separation of Concerns**
- Один компонент/класс = одна ответственность
- Smart компоненты управляют данными
- Dumb компоненты отображают UI

### 5. **PIXEL-PERFECT - Визуальное соответствие прототипу** ⭐⭐⭐ **КРИТИЧНО**

**ПРАВИЛО:** Визуальная реализация ОБЯЗАНА быть 1 в 1 с React прототипом. Любое отклонение недопустимо.

#### ✅ **ОБЯЗАТЕЛЬНО соблюдать:**

**1. Точные размеры и отступы:**
```typescript
// ❌ НЕПРАВИЛЬНО: произвольные значения
<div class="p-4 gap-2">

// ✅ ПРАВИЛЬНО: точно как в прототипе
// Если в прототипе p-6 gap-4, то и у нас p-6 gap-4
<div class="p-6 gap-4">
```

**2. Точные цвета:**
```typescript
// ❌ НЕПРАВИЛЬНО: другие цвета
bg-blue-500 text-gray-600

// ✅ ПРАВИЛЬНО: точно как в прототипе
// Проверяй в прототипе className и копируй
bg-[#5B4DFF] text-[#64748B]
```

**3. Точные шрифты и размеры текста:**
```typescript
// ❌ НЕПРАВИЛЬНО: другой размер
<h1 class="text-xl">

// ✅ ПРАВИЛЬНО: как в прототипе
<h1 class="text-2xl font-semibold">
```

**4. Точное расположение элементов:**
```typescript
// ❌ НЕПРАВИЛЬНО: другая структура
<div class="flex-col">
  <button>Action</button>
  <h1>Title</h1>
</div>

// ✅ ПРАВИЛЬНО: точная структура из прототипа
<div class="flex items-center justify-between">
  <h1>Title</h1>
  <button>Action</button>
</div>
```

**5. Точные border-radius, shadows, transitions:**
```typescript
// Копируй все визуальные свойства:
- rounded-lg vs rounded-md
- shadow-sm vs shadow-md
- transition-all duration-300
- hover:scale-105
```

#### 📋 **Процесс проверки:**

**Перед коммитом ОБЯЗАТЕЛЬНО:**
```
1. Открой прототип React (npm run dev в prototype/)
2. Открой Angular версию (npm run start:web)
3. Положи окна рядом
4. Проверь КАЖДЫЙ элемент:
   □ Размеры совпадают?
   □ Отступы совпадают?
   □ Цвета совпадают?
   □ Шрифты совпадают?
   □ Анимации совпадают?
   □ Hover states совпадают?
   □ Spacing (gap) совпадает?
   □ Border-radius совпадает?
```

#### 🔍 **Как копировать стили:**

**1. Открой компонент в прототипе:**
```typescript
// prototype/src/components/habit-card.tsx
<Card className="p-4 transition-all duration-300 ease-in-out 
                 hover:shadow-md group hover:scale-[1.02]">
```

**2. Копируй className ТОЧНО в Angular:**
```html
<!-- Angular -->
<ui-card class="p-4 transition-all duration-300 ease-in-out 
                hover:shadow-md group hover:scale-[1.02]">
```

**3. Проверь в DevTools:**
- Открой DevTools
- Проверь computed styles
- Сравни с прототипом

#### ❌ **НЕДОПУСТИМО:**

```typescript
// ❌ "Примерно так же"
// ❌ "Похоже"
// ❌ "На глаз норм"
// ❌ "Ну почти"

// ✅ ТОЛЬКО ТОЧНОЕ СОВПАДЕНИЕ
```

#### 📐 **Инструменты для проверки:**

1. **DevTools Inspector:**
   - Проверяй padding, margin, gap
   - Проверяй font-size, line-height
   - Проверяй colors (hex values)

2. **Pixel Perfect Extension:**
   - Overlay screenshot прототипа
   - Проверь pixel-by-pixel

3. **CSS diff:**
   - Сравнивай computed styles
   - Проверяй все значения

#### 🎯 **Критерии приёмки:**

- ✅ Визуально неотличимо от прототипа
- ✅ Все размеры совпадают
- ✅ Все цвета совпадают
- ✅ Все анимации совпадают
- ✅ Все hover effects совпадают
- ✅ Responsive breakpoints совпадают

**ВАЖНО:** Если сомневаешься - открой прототип и скопируй точно!

---

### 6. **Dispatch Table Pattern - Диспетчеризация без ветвлений** ⭐

**Правило:** Не ветвить действия в UI-обработчиках. Любой обработчик события обязан делегировать выбор действия чистой «таблице диспетчеризации», определённой над исчерпывающим типом состояния.

#### ❌ **АНТИПАТТЕРН - ветвление в обработчике:**
```typescript
// ❌ НЕПРАВИЛЬНО: if/else в обработчике
onActionClick(): void {
  if (this.isCompleted()) {
    this.handleUndo();
  } else if (this.isMultiGoal()) {
    this.handleIncrement();
  } else {
    this.handleMark();
  }
}

// ❌ НЕПРАВИЛЬНО: switch в обработчике
onStatusChange(status: string): void {
  switch (status) {
    case 'active':
      this.activateHabit();
      break;
    case 'paused':
      this.pauseHabit();
      break;
    case 'archived':
      this.archiveHabit();
      break;
  }
}
```

#### ✅ **ПРАВИЛЬНО - таблица диспетчеризации:**
```typescript
// ✅ Определяем исчерпывающий тип состояния
type HabitActionState =
  | { kind: 'completed' }
  | { kind: 'multi'; current: number; target: number }
  | { kind: 'single' };

type ActionHandler = () => void;

// ✅ Чистая функция-резолвер (без побочных эффектов)
function resolveAction(
  state: HabitActionState, 
  registry: Record<HabitActionState['kind'], ActionHandler>
): ActionHandler {
  return registry[state.kind];
}

// ✅ Computed определяет текущее состояние
readonly actionState = computed((): HabitActionState => {
  const habit = this.habit();
  
  if (HabitUtils.isCompleted(habit)) {
    return { kind: 'completed' };
  }
  
  if (HabitUtils.isMultiGoal(habit)) {
    return { 
      kind: 'multi', 
      current: habit.currentStep, 
      target: habit.goal 
    };
  }
  
  return { kind: 'single' };
});

// ✅ Обработчик БЕЗ ветвлений
onActionClick(): void {
  const state = this.actionState();
  
  const actionByKind: Record<HabitActionState['kind'], ActionHandler> = {
    completed: () => this.undoToday.emit(),
    multi:     () => this.incrementStep.emit(),
    single:    () => this.markToday.emit(),
  };
  
  resolveAction(state, actionByKind)();
}
```

#### ✅ **Преимущества:**

1. **Тотальность** - TypeScript гарантирует покрытие всех случаев
2. **Тестируемость** - можно тестировать таблицу отдельно
3. **Расширяемость** - добавить новый вариант = добавить одну строку
4. **Детерминизм** - резолвер без side effects
5. **Читаемость** - таблица как документация

#### ✅ **Табличные тесты:**
```typescript
describe('HabitCard action resolution', () => {
  const testCases: Array<[HabitActionState, string]> = [
    [{ kind: 'completed' }, 'should emit undo'],
    [{ kind: 'multi', current: 3, target: 5 }, 'should emit increment'],
    [{ kind: 'single' }, 'should emit mark']
  ];
  
  testCases.forEach(([state, expected]) => {
    it(expected, () => {
      // Test logic
    });
  });
});
```

#### 📋 **Критерии приёмки:**

- ✅ В обработчиках нет `if/else/switch`
- ✅ Состояние описано discriminated union или enum
- ✅ Есть тотальная мапа `State → ActionHandler`
- ✅ Эффекты вынесены из резолвера
- ✅ Резолвер детерминирован и покрыт тестами
- ✅ Добавление нового варианта = одна строка в мапе

---

## 📁 Структура файлов

### Именование файлов
```
✅ ПРАВИЛЬНО:
- habit-card.component.ts
- habit.service.ts
- date.utils.ts
- relative-time.pipe.ts
- habit.model.ts
- auth.guard.ts

❌ НЕПРАВИЛЬНО:
- HabitCard.component.ts
- habitService.ts
- DateUtils.ts
- RelativeTimePipe.ts
```

**Правило:** `kebab-case` для всех файлов

### Структура компонента
```
feature-name/
├── feature-name.component.ts       # Логика
├── feature-name.component.html     # Template
├── feature-name.component.scss     # Стили
├── feature-name.component.spec.ts  # Тесты
└── components/                     # Под-компоненты (если есть)
    └── sub-component/
```

### Где что размещать

#### `core/` - Singleton сервисы и глобальные вещи
```typescript
✅ Сюда:
- Services (HabitService, AuthService)
- Models/Interfaces
- Utils (DateUtils, HabitUtils)
- Guards
- Interceptors
- Global constants

❌ НЕ сюда:
- Компоненты
- Pipes (они в shared)
- Feature-specific логика
```

#### `shared/` - Переиспользуемые компоненты
```typescript
✅ Сюда:
- Dumb компоненты (HabitCard, KPICard)
- Pipes (RelativeTimePipe)
- Directives
- Общие UI компоненты

❌ НЕ сюда:
- Smart компоненты (они в features)
- Сервисы (они в core)
- Feature-specific компоненты
```

#### `features/` - Экраны и их логика
```typescript
✅ Сюда:
- Smart компоненты (DashboardComponent)
- Feature-specific под-компоненты
- Feature-specific services (опционально)

❌ НЕ сюда:
- Переиспользуемые компоненты (они в shared)
- Сервисы (они в core, кроме feature-specific)
```

#### `layout/` - Layout компоненты
```typescript
✅ Сюда:
- AppShell
- Sidebar
- Topbar
- MobileNav
- Footer

❌ НЕ сюда:
- Контент экранов (они в features)
- Модалки (они в modals)
```

#### `modals/` - Модальные окна
```typescript
✅ Сюда:
- AddHabitModal
- EditHabitModal
- DeleteHabitModal
- Любые Dialog компоненты

❌ НЕ сюда:
- Inline popover/dropdown (они в самих компонентах)
```

---

## 🧩 Компоненты

### Smart vs Dumb компоненты

#### ✅ **Smart компонент (Container)**
```typescript
// ✅ ПРАВИЛЬНО
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  // Инжектим сервисы
  private habitService = inject(HabitService);
  private toastService = inject(ToastService);
  
  // Получаем данные из сервисов
  readonly habits = this.habitService.habits;
  readonly stats = this.habitService.stats;
  
  // Методы - делегируем в сервисы
  onMarkHabit(id: string): void {
    this.habitService.markHabitToday(id);
    this.toastService.success('Done!');
  }
}
```

**Правила Smart компонента:**
- ✅ Инжектит сервисы
- ✅ Управляет данными
- ✅ Содержит бизнес-логику
- ✅ Делегирует действия в сервисы
- ❌ НЕ содержит сложный UI
- ❌ НЕ имеет локального состояния (по возможности)

#### ✅ **Dumb компонент (Presentation)**
```typescript
// ✅ ПРАВИЛЬНО
@Component({
  selector: 'app-habit-card',
  templateUrl: './habit-card.component.html'
})
export class HabitCardComponent {
  // Только inputs
  readonly habit = input.required<Habit>();
  
  // Только outputs
  readonly markToday = output<void>();
  
  // Computed для UI (чисто view logic)
  readonly isCompleted = computed(() => 
    this.habit().completedToday
  );
  
  // Методы - только emit events
  onMarkClick(): void {
    this.markToday.emit();
  }
}
```

**Правила Dumb компонента:**
- ✅ Только `input()` и `output()`
- ✅ Чистый UI logic (computed для отображения)
- ✅ Emit events вместо прямых действий
- ❌ НЕ инжектит сервисы (кроме ThemeService для стилей)
- ❌ НЕ содержит бизнес-логику
- ❌ НЕ делает HTTP запросы

### Signals - новый подход

#### ✅ **ИСПОЛЬЗУЙ Signals**
```typescript
// ✅ ПРАВИЛЬНО - Modern Angular
export class MyComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);
  
  increment(): void {
    this.count.update(v => v + 1);
  }
}
```

```html
<!-- ✅ ПРАВИЛЬНО - автоматический change detection -->
<p>Count: {{ count() }}</p>
<p>Doubled: {{ doubled() }}</p>
```

#### ❌ **НЕ ИСПОЛЬЗУЙ старый подход**
```typescript
// ❌ НЕПРАВИЛЬНО - старый подход
export class MyComponent {
  count = 0;
  
  get doubled() {
    return this.count * 2;
  }
  
  increment(): void {
    this.count++;
  }
}
```

**Правила Signals:**
- ✅ `signal()` для изменяемого состояния
- ✅ `computed()` для производных значений
- ✅ `effect()` для side effects
- ✅ `.asReadonly()` для публичных signal
- ❌ НЕ используй `BehaviorSubject` для локального состояния

### Standalone компоненты

#### ✅ **ВСЕГДА Standalone**
```typescript
// ✅ ПРАВИЛЬНО
@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [
    UiButtonComponent,
    UiCardComponent,
    UiProgressComponent
  ],
  templateUrl: './habit-card.component.html'
})
export class HabitCardComponent { }
```

#### ❌ **НЕ используй NgModule**
```typescript
// ❌ НЕПРАВИЛЬНО - старый подход
@NgModule({
  declarations: [HabitCardComponent],
  imports: [CommonModule],
  exports: [HabitCardComponent]
})
export class HabitCardModule { }
```

**Правило:** Все компоненты должны быть `standalone: true`

### Новый синтаксис `input()` и `output()`

#### ✅ **ИСПОЛЬЗУЙ новый синтаксис**
```typescript
// ✅ ПРАВИЛЬНО - Angular 17.1+
export class MyComponent {
  readonly title = input.required<string>();
  readonly count = input<number>(0);
  readonly clicked = output<void>();
  readonly valueChange = output<string>();
}
```

#### ❌ **НЕ используй старый синтаксис**
```typescript
// ❌ НЕПРАВИЛЬНО - старый подход
export class MyComponent {
  @Input({ required: true }) title!: string;
  @Input() count = 0;
  @Output() clicked = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<string>();
}
```

### Control Flow (@if, @for)

#### ✅ **ИСПОЛЬЗУЙ новый синтаксис**
```html
<!-- ✅ ПРАВИЛЬНО - Angular 17+ -->
@if (habits().length > 0) {
  <div>Has habits</div>
} @else {
  <app-empty-state />
}

@for (habit of habits(); track habit.id) {
  <app-habit-card [habit]="habit" />
}

@switch (status()) {
  @case ('loading') { <p>Loading...</p> }
  @case ('error') { <p>Error!</p> }
  @default { <p>Content</p> }
}
```

#### ❌ **НЕ используй старый синтаксис**
```html
<!-- ❌ НЕПРАВИЛЬНО - старый подход -->
<div *ngIf="habits().length > 0; else empty">
  Has habits
</div>
<ng-template #empty>
  <app-empty-state />
</ng-template>

<app-habit-card 
  *ngFor="let habit of habits(); trackBy: trackById" 
  [habit]="habit" 
/>

<div [ngSwitch]="status()">
  <p *ngSwitchCase="'loading'">Loading...</p>
  <p *ngSwitchCase="'error'">Error!</p>
  <p *ngSwitchDefault>Content</p>
</div>
```

### Dependency Injection

#### ✅ **ИСПОЛЬЗУЙ `inject()`**
```typescript
// ✅ ПРАВИЛЬНО - функциональный подход
export class MyComponent {
  private habitService = inject(HabitService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
}
```

#### ❌ **НЕ используй constructor injection**
```typescript
// ❌ НЕПРАВИЛЬНО - старый подход
export class MyComponent {
  constructor(
    private habitService: HabitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
```

**Исключение:** Guards и Interceptors могут использовать constructor (если не используют functional подход)

---

## 🎨 Стили и CSS

### Tailwind CSS - основной инструмент

#### ✅ **ИСПОЛЬЗУЙ Tailwind**
```html
<!-- ✅ ПРАВИЛЬНО -->
<div class="flex items-center gap-4 p-6 rounded-lg bg-card border">
  <h3 class="text-lg font-semibold">Title</h3>
</div>
```

#### ❌ **НЕ пиши custom CSS без необходимости**
```html
<!-- ❌ НЕПРАВИЛЬНО -->
<div class="custom-container">
  <h3 class="custom-title">Title</h3>
</div>
```

```scss
// ❌ НЕ нужно
.custom-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
}
```

### Адаптивность - Mobile First

#### ✅ **ПРАВИЛЬНЫЙ подход**
```html
<!-- ✅ Mobile first, затем больше -->
<div class="
  flex flex-col gap-2    
  md:flex-row md:gap-4   
  lg:gap-6
">
  <div class="w-full md:w-1/2 lg:w-1/3">Content</div>
</div>
```

#### ❌ **НЕПРАВИЛЬНЫЙ подход**
```html
<!-- ❌ Desktop first -->
<div class="flex-row gap-6 lg:flex-col">
  <div class="w-1/3 md:w-full">Content</div>
</div>
```

### Breakpoints
```
Mobile:  < 640px   (default, без префикса)
Tablet:  640px+    (sm:)
Desktop: 768px+    (md:)
Large:   1024px+   (lg:)
XLarge:  1280px+   (xl:)
2XL:     1536px+   (2xl:)
```

**Правило:** Всегда начинай с мобильной версии

### CSS Custom Properties для цветов

#### ✅ **ИСПОЛЬЗУЙ CSS переменные**
```html
<!-- ✅ ПРАВИЛЬНО - поддержка темы -->
<div class="bg-background text-foreground border-border">
  <p class="text-muted-foreground">Description</p>
</div>
```

#### ❌ **НЕ хардкодь цвета**
```html
<!-- ❌ НЕПРАВИЛЬНО - нет темизации -->
<div class="bg-white text-black border-gray-300">
  <p class="text-gray-500">Description</p>
</div>
```

### Анимации - используй Tailwind

#### ✅ **ПРАВИЛЬНО**
```html
<div class="transition-all duration-300 hover:scale-105">
  Animated
</div>
```

#### ⚠️ **Custom анимации - только если необходимо**
```scss
// ⚠️ Только для сложных анимаций
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

---

## 🔧 Сервисы

### State Management с Signals

#### ✅ **ПРАВИЛЬНАЯ структура сервиса**
```typescript
@Injectable({ providedIn: 'root' })
export class HabitService {
  // 1. Private state (изменяемый)
  private habitsSignal = signal<Habit[]>([]);
  
  // 2. Public read-only state
  readonly habits = this.habitsSignal.asReadonly();
  
  // 3. Computed values
  readonly activeHabits = computed(() => 
    this.habits().filter(h => !h.archived)
  );
  
  readonly completionRate = computed(() => {
    const active = this.activeHabits();
    const completed = active.filter(h => h.completedToday).length;
    return active.length > 0 ? (completed / active.length) * 100 : 0;
  });
  
  // 4. Constructor - инициализация
  constructor() {
    this.loadFromStorage();
  }
  
  // 5. Public methods - actions
  addHabit(form: HabitForm): void {
    const newHabit = this.createHabit(form);
    this.habitsSignal.update(habits => [...habits, newHabit]);
    this.saveToStorage();
  }
  
  // 6. Private methods - helpers
  private createHabit(form: HabitForm): Habit {
    return {
      id: this.generateId(),
      ...form,
      currentStreak: 0,
      completedToday: false
    };
  }
  
  private saveToStorage(): void { }
  private loadFromStorage(): void { }
  private generateId(): string { }
}
```

**Правила сервисов:**
- ✅ Private signal для state
- ✅ Public readonly computed для доступа
- ✅ Computed values для производных данных
- ✅ Public методы - только actions
- ✅ Private методы - helpers
- ❌ НЕ expose изменяемый state напрямую

### Singleton сервисы

#### ✅ **ВСЕГДА providedIn: 'root'**
```typescript
// ✅ ПРАВИЛЬНО
@Injectable({ providedIn: 'root' })
export class HabitService { }
```

#### ❌ **НЕ используй providers в компонентах**
```typescript
// ❌ НЕПРАВИЛЬНО - создаст новый instance
@Component({
  providers: [HabitService]
})
```

**Исключение:** Feature-specific сервисы, которые нужны только в одном месте

---

## 📝 Типизация и интерфейсы

### Именование переменных

#### ✅ **ПРАВИЛЬНЫЕ имена переменных**
```typescript
// ✅ ПРАВИЛЬНО - полные, описательные имена
const habitList: Habit[] = [];
const completionRate: number = 0;
const isAuthenticated: boolean = false;
const currentUser: User | null = null;
const filteredHabits: Habit[] = [];

// ✅ Допустимые общепринятые сокращения
const id: string = '123';
const userId: string = 'user_1';
const habitId: string = 'habit_1';
const apiUrl: string = 'https://api.example.com';
const httpClient = inject(HttpClient);
const url: string = '/api/habits';
const html: string = '<div>Content</div>';
const css: string = 'color: red';
const json: object = { key: 'value' };

// ✅ ПРАВИЛЬНО - циклы с понятным контекстом
for (const habit of habits) {
  console.log(habit.name);
}

habits.forEach(habit => {
  processHabit(habit);
});

habits.map(habit => ({
  id: habit.id,
  name: habit.name
}));
```

#### ❌ **НЕПРАВИЛЬНЫЕ имена переменных**
```typescript
// ❌ НЕПРАВИЛЬНО - однобуквенные переменные
const h: Habit[] = [];
const n: number = 0;
const i: boolean = false;
const u: User | null = null;

// ❌ НЕПРАВИЛЬНО - неочевидные аббревиатуры
const hab: Habit[] = [];      // ❌ Используй habitList
const comp: number = 0;       // ❌ Используй completionRate
const auth: boolean = false;  // ❌ Используй isAuthenticated
const usr: User = null;       // ❌ Используй currentUser
const msg: string = '';       // ❌ Используй message
const btn: HTMLElement;       // ❌ Используй button
const txt: string = '';       // ❌ Используй text
const img: string = '';       // ❌ Используй image или imageUrl
const cfg: Config = {};       // ❌ Используй config
const srv: Service;           // ❌ Используй service
const repo: Repository;       // ❌ Используй repository
const ctrl: Controller;       // ❌ Используй controller
const mgr: Manager;           // ❌ Используй manager

// ❌ НЕПРАВИЛЬНО - даже в циклах
for (const h of habits) {      // ❌ Используй habit
  console.log(h.name);
}

habits.forEach(h => {          // ❌ Используй habit
  processHabit(h);
});

habits.map(h => ({             // ❌ Используй habit
  id: h.id,
  name: h.name
}));

// ❌ НЕПРАВИЛЬНО - загадочные сокращения
const temp = getHabits();      // ❌ Что это? Используй habits или temporaryHabits
const res = await fetch();     // ❌ Используй response
const req = createRequest();   // ❌ Используй request
const val = getValue();        // ❌ Используй value
const arr = [];                // ❌ Используй конкретное имя
const obj = {};                // ❌ Используй конкретное имя
const data = {};               // ❌ Слишком общее, используй habitData, userData и т.д.
```

#### ✅ **Общепринятые аббревиатуры (РАЗРЕШЕНЫ)**
```typescript
// ✅ Эти аббревиатуры общепризнанны и понятны
id          // identifier
userId      // user identifier  
habitId     // habit identifier
url         // uniform resource locator
uri         // uniform resource identifier
api         // application programming interface
http        // hypertext transfer protocol
https       // http secure
html        // hypertext markup language
css         // cascading style sheets
json        // javascript object notation
xml         // extensible markup language
pdf         // portable document format
svg         // scalable vector graphics
guid        // globally unique identifier
uuid        // universally unique identifier
i18n        // internationalization
a11y        // accessibility
```

**Правило:** 
- ✅ Переменные должны быть **полными словами** или **общепризнанными аббревиатурами**
- ❌ **НИКОГДА** не используй однобуквенные переменные
- ❌ **НИКОГДА** не используй непонятные сокращения (hab, msg, btn, usr, cfg)
- ✅ Имя переменной должно объяснять **ЧТО** она хранит
- ✅ Даже в циклах используй полные имена: `for (const habit of habits)`
- ✅ Единственное исключение: математические алгоритмы где `i, j, k` традиционны

### Строгая типизация

#### ✅ **ВСЕГДА типизируй**
```typescript
// ✅ ПРАВИЛЬНО
interface HabitForm {
  name: string;
  goal: number;
  frequency: 'daily' | 'weekly' | 'custom';
}

function createHabit(form: HabitForm): Habit {
  return {
    id: generateId(),
    ...form,
    currentStreak: 0
  };
}

const habits: Habit[] = [];
```

#### ❌ **НЕ используй any**
```typescript
// ❌ НЕПРАВИЛЬНО
function createHabit(form: any): any {
  return { ...form };
}

const habits: any[] = [];
```

### Type Guards

#### ✅ **ИСПОЛЬЗУЙ Type Guards**
```typescript
// ✅ ПРАВИЛЬНО
function isMultiGoalHabit(habit: Habit): boolean {
  return habit.goal > 1;
}

if (isMultiGoalHabit(habit)) {
  // TypeScript знает, что habit.goal > 1
}
```

### Enum vs Union Types

#### ✅ **ИСПОЛЬЗУЙ Union Types**
```typescript
// ✅ ПРАВИЛЬНО - более гибко
type Frequency = 'daily' | 'weekly' | 'custom';
type Theme = 'light' | 'dark' | 'system';
```

#### ⚠️ **Enum - только для complex cases**
```typescript
// ⚠️ Только если нужны методы или преобразования
enum HabitStatus {
  Active = 'ACTIVE',
  Paused = 'PAUSED',
  Archived = 'ARCHIVED'
}
```

---

## 🧪 Тестирование

### Unit tests - обязательно для сервисов

```typescript
// ✅ ОБЯЗАТЕЛЬНО тестируй сервисы
describe('HabitService', () => {
  let service: HabitService;

  beforeEach(() => {
    service = new HabitService();
  });

  it('should add habit', () => {
    const form: HabitForm = {
      name: 'Test',
      goal: 1,
      frequency: 'daily'
    };
    
    service.addHabit(form);
    
    expect(service.habits().length).toBe(1);
    expect(service.habits()[0].name).toBe('Test');
  });

  it('should calculate completion rate', () => {
    // Setup habits
    service.addHabit({ name: 'H1', goal: 1, frequency: 'daily' });
    service.addHabit({ name: 'H2', goal: 1, frequency: 'daily' });
    
    // Mark one as complete
    service.markHabitToday(service.habits()[0].id);
    
    expect(service.completionRate()).toBe(50);
  });
});
```

### Component tests - для dumb компонентов

```typescript
// ✅ Тестируй dumb компоненты
describe('HabitCardComponent', () => {
  it('should emit markToday when button clicked', () => {
    const component = new HabitCardComponent();
    component.habit.set(mockHabit);
    
    let emitted = false;
    component.markToday.subscribe(() => emitted = true);
    
    component.onActionClick();
    
    expect(emitted).toBe(true);
  });
});
```

### E2E tests - для critical flows

```typescript
// ✅ E2E для важных флоу
describe('Habit Creation Flow', () => {
  it('should create habit and show on dashboard', () => {
    cy.visit('/dashboard');
    cy.contains('Add Habit').click();
    cy.get('[data-testid="habit-name"]').type('Test Habit');
    cy.get('[data-testid="submit"]').click();
    cy.contains('Test Habit').should('be.visible');
  });
});
```

**Правило:** 
- ✅ Unit tests - для всех сервисов и utils
- ✅ Component tests - для dumb компонентов
- ✅ E2E tests - для критических сценариев (login, create habit, etc.)

---

## 📦 Git и Version Control

### Язык коммитов и комментариев

#### ✅ **ВСЕГДА используй английский**

**Правило:** Все коммиты, комментарии в коде, и документация внутри кода должны быть **на английском языке**.

```typescript
// ✅ ПРАВИЛЬНО - английский
/**
 * Calculates completion rate for habits
 * @param habits - List of habits
 * @returns Completion rate in percentage
 */
function calculateCompletionRate(habits: Habit[]): number {
  // Filter completed habits
  const completed = habits.filter(habit => habit.completedToday);
  return (completed.length / habits.length) * 100;
}

// ❌ НЕПРАВИЛЬНО - русский
/**
 * Вычисляет процент выполнения привычек
 * @param habits - Список привычек
 * @returns Процент выполнения
 */
function calculateCompletionRate(habits: Habit[]): number {
  // Фильтруем выполненные привычки
  const completed = habits.filter(habit => habit.completedToday);
  return (completed.length / habits.length) * 100;
}
```

**Почему английский:**
- ✅ Международный стандарт
- ✅ Читаемость для всех разработчиков
- ✅ Совместимость с инструментами и IDE
- ✅ Профессиональный подход

**Исключения:**
- 📄 Пользовательская документация (README.md на русском - OK)
- 💬 Issue descriptions и обсуждения (можно на русском)
- 🎨 UI тексты для пользователей (на русском)

### Commit messages

#### ✅ **ПРАВИЛЬНЫЙ формат (АНГЛИЙСКИЙ)**
```
type(scope): subject

[optional body]

[optional footer]
```

**Types:**
- `feat:` - новая фича
- `fix:` - исправление бага
- `refactor:` - рефакторинг без изменения функционала
- `style:` - форматирование, стили
- `test:` - добавление тестов
- `docs:` - документация
- `chore:` - обновление dependencies, build scripts

**Примеры:**
```
✅ ПРАВИЛЬНО (АНГЛИЙСКИЙ):
feat(habits): add multi-goal support
fix(dashboard): correct completion rate calculation
refactor(auth): migrate to signals
style(habit-card): update button spacing
test(habit-service): add completion rate tests
docs(readme): update setup instructions
chore(deps): update angular to v18

❌ НЕПРАВИЛЬНО (РУССКИЙ):
feat(habits): добавлена поддержка multi-goal
fix(dashboard): исправлен расчет
Added feature
Fixed bug
WIP
temp commit
```

### Branching strategy

```
main                    - production код
├── develop             - development ветка
    ├── feature/habit-card
    ├── feature/dashboard
    ├── fix/auth-bug
    └── refactor/signals-migration
```

**Правила:**
- ✅ `feature/` - новые фичи
- ✅ `fix/` - исправления
- ✅ `refactor/` - рефакторинг
- ✅ `hotfix/` - срочные исправления в production
- ❌ НЕ коммить напрямую в `main`
- ❌ НЕ коммить напрямую в `develop`

### Pull Requests

**Обязательно:**
- ✅ Описание изменений
- ✅ Скриншоты (если UI)
- ✅ Ссылка на issue/задачу
- ✅ Тесты пройдены
- ✅ Код review от коллеги

**Шаблон PR:**
```markdown
## Описание
Добавлен компонент HabitCard для отображения привычек

## Изменения
- Создан HabitCardComponent
- Добавлены тесты
- Обновлена документация

## Скриншоты
[прикрепить скриншот]

## Checklist
- [x] Тесты пройдены
- [x] Линтер пройден
- [x] Документация обновлена
- [x] Code review запрошен
```

### .gitignore правила

```
✅ ОБЯЗАТЕЛЬНО игнорировать:
node_modules/
dist/
.angular/
.env
.env.local
*.log
.DS_Store
coverage/

❌ НЕ коммитить:
- node_modules
- build artifacts
- environment файлы с секретами
- IDE файлы (.idea, .vscode)
- OS файлы (.DS_Store)
```

---

## 🔒 Безопасность

### Environment variables

#### ✅ **ПРАВИЛЬНО**
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: import.meta.env['VITE_API_URL'],
  apiKey: import.meta.env['VITE_API_KEY']
};
```

```bash
# .env.local (НЕ коммитить!)
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your-secret-key
```

#### ❌ **НЕПРАВИЛЬНО**
```typescript
// ❌ НЕ хардкодь секреты
export const environment = {
  apiUrl: 'http://localhost:3000',
  apiKey: 'sk_live_51J...'  // ❌ НИКОГДА!
};
```

### XSS Prevention

#### ✅ **Angular защищает автоматически**
```html
<!-- ✅ Безопасно - Angular экранирует -->
<p>{{ userInput }}</p>
```

#### ❌ **НЕ используй innerHTML без sanitization**
```html
<!-- ❌ ОПАСНО -->
<div [innerHTML]="userInput"></div>
```

#### ✅ **Если нужен HTML - sanitize**
```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

getSafeHtml(html: string) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
}
```

### Auth tokens

#### ✅ **ПРАВИЛЬНОЕ хранение**
```typescript
// ✅ Используй httpOnly cookies (если backend поддерживает)
// ✅ Или localStorage с короткими TTL

private saveToken(token: string): void {
  localStorage.setItem('auth_token', token);
  // Set expiration
  localStorage.setItem('token_expiry', (Date.now() + 3600000).toString());
}

private isTokenExpired(): boolean {
  const expiry = localStorage.getItem('token_expiry');
  return expiry ? Date.now() > parseInt(expiry) : true;
}
```

#### ❌ **НЕПРАВИЛЬНО**
```typescript
// ❌ Не храни sensitive данные
localStorage.setItem('password', password);
localStorage.setItem('creditCard', cardNumber);
```

---

## 🚀 Performance

### Lazy Loading

#### ✅ **ВСЕГДА lazy load роуты**
```typescript
// ✅ ПРАВИЛЬНО
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  }
];
```

#### ❌ **НЕ импортируй напрямую**
```typescript
// ❌ НЕПРАВИЛЬНО
import { DashboardComponent } from './features/dashboard';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }
];
```

### Computed values вместо методов в template

#### ✅ **ПРАВИЛЬНО**
```typescript
// ✅ Computed кэширует результат
readonly completionRate = computed(() => {
  const habits = this.habits();
  return habits.length > 0 
    ? (habits.filter(h => h.completedToday).length / habits.length) * 100 
    : 0;
});
```

```html
<!-- ✅ Вызывается один раз -->
<p>{{ completionRate() }}</p>
```

#### ❌ **НЕПРАВИЛЬНО**
```typescript
// ❌ Метод вызывается при каждом change detection
getCompletionRate(): number {
  const habits = this.habits();
  return habits.length > 0 
    ? (habits.filter(h => h.completedToday).length / habits.length) * 100 
    : 0;
}
```

```html
<!-- ❌ Вызывается многократно -->
<p>{{ getCompletionRate() }}</p>
```

### TrackBy для *ngFor и @for

#### ✅ **ВСЕГДА используй track**
```html
<!-- ✅ ПРАВИЛЬНО -->
@for (habit of habits(); track habit.id) {
  <app-habit-card [habit]="habit" />
}
```

#### ❌ **НЕ используй без track**
```html
<!-- ❌ НЕПРАВИЛЬНО - пересоздает элементы -->
@for (habit of habits(); track $index) {
  <app-habit-card [habit]="habit" />
}
```

### OnPush Change Detection

#### ✅ **Используй для dumb компонентов**
```typescript
// ✅ ПРАВИЛЬНО - оптимизация
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HabitCardComponent { }
```

**Правило:** Все dumb компоненты должны использовать `OnPush`

---

## 📱 Accessibility (A11y)

### Semantic HTML

#### ✅ **ИСПОЛЬЗУЙ правильные теги**
```html
<!-- ✅ ПРАВИЛЬНО -->
<button (click)="onClick()">Click me</button>
<nav>
  <a href="/dashboard">Dashboard</a>
</nav>
<main>
  <h1>Page Title</h1>
  <article>Content</article>
</main>
```

#### ❌ **НЕ используй div для всего**
```html
<!-- ❌ НЕПРАВИЛЬНО -->
<div (click)="onClick()">Click me</div>
<div class="nav">
  <div class="link">Dashboard</div>
</div>
```

### ARIA attributes

#### ✅ **Добавляй ARIA когда нужно**
```html
<!-- ✅ ПРАВИЛЬНО -->
<button 
  [attr.aria-label]="isCompleted() ? 'Mark incomplete' : 'Mark complete'"
  [attr.aria-pressed]="isCompleted()"
>
  {{ isCompleted() ? 'Done' : 'Mark' }}
</button>

<div role="alert" aria-live="polite">
  {{ message() }}
</div>
```

### Keyboard navigation

#### ✅ **Поддерживай keyboard**
```typescript
// ✅ ПРАВИЛЬНО
@HostListener('keydown.enter')
onEnter(): void {
  this.action.emit();
}

@HostListener('keydown.escape')
onEscape(): void {
  this.close.emit();
}
```

### Focus management

#### ✅ **Управляй фокусом**
```typescript
// ✅ После открытия модалки - фокус на первый input
@ViewChild('firstInput') firstInput!: ElementRef;

ngAfterViewInit(): void {
  this.firstInput.nativeElement.focus();
}
```

---

## 📚 Документация

### Code comments

#### ✅ **КОГДА комментировать**
```typescript
// ✅ ПРАВИЛЬНО - объясняет WHY, не WHAT
// Используем debounce чтобы не спамить API при быстром вводе
this.searchQuery.pipe(
  debounceTime(300)
).subscribe();

// Обходим баг в Safari с z-index
.modal { z-index: 9999; transform: translateZ(0); }
```

#### ❌ **НЕ комментируй очевидное**
```typescript
// ❌ НЕПРАВИЛЬНО - очевидно
// Увеличиваем счетчик на 1
count++;

// ❌ НЕПРАВИЛЬНО - не объясняет почему
// Fix
this.value = null;
```

### JSDoc для публичных API

#### ✅ **Документируй публичные методы**
```typescript
/**
 * Отмечает привычку как выполненную сегодня
 * @param habitId - ID привычки
 * @throws {Error} Если привычка не найдена
 */
markHabitToday(habitId: string): void {
  const habit = this.getHabitById(habitId);
  if (!habit) {
    throw new Error(`Habit ${habitId} not found`);
  }
  // ...
}
```

### README.md

**Обязательные секции:**
```markdown
# Project Name

## Описание
Краткое описание проекта

## Setup
npm install
npm start

## Scripts
npm run build
npm run test
npm run lint

## Architecture
Ссылка на ARCHITECTURE.md

## Contributing
Ссылка на DEVELOPMENT_RULES.md
```

---

## ⚡ Quick Reference Checklist

### Перед коммитом:
- [ ] Код прошел линтер (`npm run lint`)
- [ ] Тесты проходят (`npm run test`)
- [ ] Нет console.log
- [ ] Нет commented code
- [ ] Commit message правильный формат
- [ ] Документация обновлена (если нужно)

### Перед PR:
- [ ] Ветка обновлена с develop
- [ ] Все тесты проходят
- [ ] Нет конфликтов
- [ ] PR description заполнен
- [ ] Скриншоты добавлены (если UI)
- [ ] Reviewer назначен

### Code Review Checklist:
- [ ] Код следует стандартам проекта
- [ ] Нет дублирования
- [ ] Компоненты правильно разделены (Smart/Dumb)
- [ ] Используются Signals
- [ ] Типизация полная
- [ ] Тесты покрывают новый код
- [ ] Performance не пострадал
- [ ] A11y соблюдено

---

## 🎯 Ключевые принципы (повторим)

1. **Signals everywhere** - используй новый реактивный подход
2. **Smart/Dumb separation** - чистая архитектура
3. **Standalone components** - современный Angular
4. **TypeScript strict** - максимальная типизация
5. **Tailwind CSS** - utility-first стили
6. **Mobile First** - адаптивность с начала
7. **Test coverage** - тесты для критичного кода
8. **Clean commits** - понятная история изменений
9. **Code reviews** - обязательно перед merge
10. **Documentation** - актуальная документация

---

## 💡 Помни

> **Хороший код - это код, который легко читать, легко изменять, и легко удалять.**

**Пиши код так, будто его будет поддерживать психопат, который знает, где ты живешь.** 😄

---

Эти правила - живой документ. Обновляй их по мере эволюции проекта! 🚀

