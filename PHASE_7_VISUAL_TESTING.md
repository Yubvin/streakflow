# PHASE 7: Storybook + Visual Testing (Pixel-Perfect)

## 🎯 Цель
Обеспечить **100% pixel-perfect** соответствие Angular реализации React прототипу через:
- **Storybook Contracts** - единый контракт для обоих проектов
- **Loki** - бесплатный и надежный visual diff
- **Стабилизация** - устранение флейков
- **Playwright E2E** - проверка страниц

---

## 📐 Концепция

### Подход: Storybook для компонентов + E2E для страниц

```
React Prototype Storybook (~20 stories)
         ↓ baseline
    storybook-contracts (shared)
         ↓ same stories
Angular App Storybook (~20 stories)
         ↓ compare
      Loki Visual Diff
         ↓
    ✅ Pixel-perfect или ❌ Report
```

**Преимущества:**
- ✅ Изоляция компонентов → меньше флейков
- ✅ Общий контракт → идентичные истории
- ✅ Стабилизация → детерминизм
- ✅ Локальный контроль → бесплатно
- ✅ Быстрая итерация → минуты, не часы

---

## 📦 Этапы реализации

### Phase 7.1: Storybook Contracts (общий пакет)

**Цель:** Создать единый источник истин для обоих проектов

#### 7.1.1. Создать структуру

```bash
mkdir -p shared/storybook-contracts/{fixtures,decorators,parameters}
cd shared/storybook-contracts
npm init -y
```

**Структура:**
```
shared/storybook-contracts/
├── package.json
├── tsconfig.json
├── fixtures/
│   ├── habits.fixture.ts
│   ├── user.fixture.ts
│   └── kpi.fixture.ts
├── decorators/
│   ├── stable.decorator.ts      # Стабилизация
│   ├── theme.decorator.ts       # Light/Dark
│   └── viewport.decorator.ts    # Responsive
├── parameters/
│   └── global.ts
└── index.ts
```

#### 7.1.2. Фикстуры данных

**fixtures/habits.fixture.ts**
```typescript
import { Habit } from '../../types';

export const habitFixtures = {
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
  } as Habit
};

export const allHabits = Object.values(habitFixtures);
```

**fixtures/user.fixture.ts**
```typescript
export const userFixture = {
  id: 'user-fixture-1',
  email: 'test@example.com',
  fullName: 'John Doe',
  avatar: null,
  createdAt: '2024-01-01T00:00:00.000Z'
};
```

**fixtures/kpi.fixture.ts**
```typescript
export const kpiFixtures = {
  todayCompletion: {
    label: "Today's Completion",
    value: '75%',
    change: '+5%',
    trend: 'up' as const,
    icon: '📊'
  },
  currentStreak: {
    label: 'Current Streak',
    value: '10 days',
    change: '+2 days',
    trend: 'up' as const,
    icon: '🔥'
  },
  totalHabits: {
    label: 'Total Habits',
    value: '8',
    change: '+1',
    trend: 'up' as const,
    icon: '✅'
  },
  longestStreak: {
    label: 'Longest Streak',
    value: '45 days',
    change: 'Record!',
    trend: 'neutral' as const,
    icon: '🏆'
  }
};
```

#### 7.1.3. Декораторы стабилизации

**decorators/stable.decorator.ts**
```typescript
import { Decorator } from '@storybook/react'; // or @storybook/angular

/**
 * Stable Decorator - eliminates all sources of non-determinism
 * 
 * Fixes:
 * - Animations
 * - Date/Time
 * - Random values
 * - Fonts loading
 */
export const stableDecorator: Decorator = (Story) => {
  // Fix Date
  const originalDate = Date;
  const FIXED_DATE = new Date('2024-01-15T12:00:00.000Z');
  
  // @ts-ignore
  global.Date = class extends Date {
    constructor(...args: any[]) {
      if (args.length === 0) {
        super(FIXED_DATE);
      } else {
        super(...args);
      }
    }
    
    static now() {
      return FIXED_DATE.getTime();
    }
  };

  // Fix Math.random
  let seed = 12345;
  Math.random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // Disable animations
  const style = document.createElement('style');
  style.innerHTML = `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
    
    * {
      caret-color: transparent !important;
    }
  `;
  document.head.appendChild(style);

  const result = Story();

  // Cleanup
  global.Date = originalDate;
  
  return result;
};
```

**decorators/theme.decorator.ts**
```typescript
import { Decorator } from '@storybook/react';

export const themeDecorator: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';
  
  // Apply theme class
  document.documentElement.classList.toggle('dark', theme === 'dark');
  
  return Story();
};

export const themeGlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' }
      ],
      showName: true
    }
  }
};
```

**decorators/viewport.decorator.ts**
```typescript
export const viewportParameters = {
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px'
        }
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px'
        }
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1280px',
          height: '800px'
        }
      }
    },
    defaultViewport: 'desktop'
  }
};
```

#### 7.1.4. Global Parameters

**parameters/global.ts**
```typescript
export const globalParameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i
    }
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#0a0a0a' }
    ]
  }
};
```

#### 7.1.5. Index export

**index.ts**
```typescript
export * from './fixtures/habits.fixture';
export * from './fixtures/user.fixture';
export * from './fixtures/kpi.fixture';

export * from './decorators/stable.decorator';
export * from './decorators/theme.decorator';
export * from './decorators/viewport.decorator';

export * from './parameters/global';
```

**Результат Phase 7.1:** ✅ Общий контракт готов

---

### Phase 7.2: React Storybook (Эталон)

**Цель:** Создать baseline stories в React прототипе

#### 7.2.1. Установка Storybook

```bash
cd prototype
npx storybook@latest init --type react-vite --yes
```

#### 7.2.2. Подключить contracts

**prototype/.storybook/preview.tsx**
```tsx
import type { Preview } from '@storybook/react';
import { 
  stableDecorator, 
  themeDecorator, 
  themeGlobalTypes,
  globalParameters,
  viewportParameters 
} from '../shared/storybook-contracts';

// Import global styles
import '../src/index.css';

const preview: Preview = {
  parameters: {
    ...globalParameters,
    ...viewportParameters
  },
  decorators: [stableDecorator, themeDecorator],
  globalTypes: themeGlobalTypes
};

export default preview;
```

#### 7.2.3. Создать stories

**prototype/src/components/HabitCard.stories.tsx**
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { HabitCard } from './HabitCard';
import { habitFixtures } from '../../../shared/storybook-contracts';

const meta = {
  title: 'Components/HabitCard',
  component: HabitCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HabitCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiGoalProgress: Story = {
  args: {
    habit: habitFixtures.waterMultiGoal,
    onMark: () => console.log('mark'),
    onIncrement: () => console.log('increment'),
    onEdit: () => console.log('edit'),
    onDelete: () => console.log('delete')
  }
};

export const SingleGoalCompleted: Story = {
  args: {
    habit: habitFixtures.exerciseSingleCompleted,
    onMark: () => console.log('mark'),
    onIncrement: () => console.log('increment'),
    onEdit: () => console.log('edit'),
    onDelete: () => console.log('delete')
  }
};

export const SingleGoalIdle: Story = {
  args: {
    habit: habitFixtures.readingSingleIdle,
    onMark: () => console.log('mark'),
    onIncrement: () => console.log('increment'),
    onEdit: () => console.log('edit'),
    onDelete: () => console.log('delete')
  }
};

export const LongStreak: Story = {
  args: {
    habit: habitFixtures.meditationLongStreak,
    onMark: () => console.log('mark'),
    onIncrement: () => console.log('increment'),
    onEdit: () => console.log('edit'),
    onDelete: () => console.log('delete')
  }
};
```

**Аналогично создать:**
- `KPICard.stories.tsx`
- `PageHeader.stories.tsx`
- `EmptyState.stories.tsx`
- `Sidebar.stories.tsx`
- `Topbar.stories.tsx`
- `HabitToolbar.stories.tsx`
- `Table.stories.tsx`

**Итого: ~20 stories**

#### 7.2.4. Локальный запуск

```bash
cd prototype
npm run storybook
# Откроется на http://localhost:6006
```

**Результат Phase 7.2:** ✅ React Storybook работает

---

### Phase 7.3: Loki Baseline

**Цель:** Создать эталонные скриншоты

#### 7.3.1. Установка Loki

```bash
cd prototype
npm install --save-dev loki
```

#### 7.3.2. Конфигурация

**prototype/.loki/config.json**
```json
{
  "configurations": {
    "chrome.desktop": {
      "target": "chrome.app",
      "width": 1280,
      "height": 800,
      "deviceScaleFactor": 1,
      "mobile": false
    },
    "chrome.tablet": {
      "target": "chrome.app",
      "width": 768,
      "height": 1024,
      "deviceScaleFactor": 1,
      "mobile": false
    },
    "chrome.mobile": {
      "target": "chrome.app",
      "width": 375,
      "height": 667,
      "deviceScaleFactor": 2,
      "mobile": true
    }
  },
  "diffingEngine": "pixelmatch",
  "threshold": 0.1,
  "storiesFilter": "^(?!.*Dark).*$",
  "chromeSelector": "#storybook-root > *"
}
```

**Опции:**
- `threshold: 0.1` - допустимо 10% различий (для контента)
- `threshold: 0` - для примитивов (кнопки, иконки)
- `storiesFilter` - исключает Dark варианты (делаем отдельно)

#### 7.3.3. Добавить scripts

**prototype/package.json**
```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "loki:update": "loki update --requireReference --reactUri file:./storybook-static",
    "loki:test": "loki test --requireReference --reactUri file:./storybook-static",
    "loki:approve": "loki approve"
  }
}
```

#### 7.3.4. Создать baseline

```bash
# 1. Build Storybook
cd prototype
npm run build-storybook

# 2. Create reference screenshots
npm run loki:update

# Результат: .loki/reference/ с эталонными PNG
```

**Структура baseline:**
```
prototype/.loki/reference/
├── chrome.desktop_Components_HabitCard_MultiGoalProgress.png
├── chrome.desktop_Components_HabitCard_SingleGoalCompleted.png
├── chrome.desktop_Components_KPICard_Default.png
├── chrome.tablet_Components_HabitCard_MultiGoalProgress.png
└── ... (~60 файлов: 20 stories × 3 viewports)
```

**Результат Phase 7.3:** ✅ Baseline создан

---

### Phase 7.4: Angular Storybook

**Цель:** Создать идентичные stories в Angular

#### 7.4.1. Установка Storybook

```bash
cd /Users/yubvin/PhpstormProjects/streakflow
npx storybook@latest init --type angular --yes
```

#### 7.4.2. Подключить contracts

**.storybook/preview.ts**
```typescript
import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { 
  stableDecorator, 
  themeDecorator, 
  themeGlobalTypes,
  globalParameters,
  viewportParameters 
} from '../shared/storybook-contracts';

// Import global styles
import '../web/src/styles.scss';

const preview: Preview = {
  parameters: {
    ...globalParameters,
    ...viewportParameters
  },
  decorators: [
    // Angular-specific wrapper
    (Story, context) => {
      stableDecorator(Story, context);
      themeDecorator(Story, context);
      return Story();
    }
  ],
  globalTypes: themeGlobalTypes
};

export default preview;
```

#### 7.4.3. Создать идентичные stories

**web/src/app/shared/components/habit-card/habit-card.stories.ts**
```typescript
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HabitCardComponent } from './habit-card.component';
import { habitFixtures } from '../../../../../../shared/storybook-contracts';

const meta: Meta<HabitCardComponent> = {
  title: 'Components/HabitCard', // ⚠️ Идентично React!
  component: HabitCardComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<HabitCardComponent>;

export const MultiGoalProgress: Story = { // ⚠️ Идентично React!
  args: {
    habit: habitFixtures.waterMultiGoal
  }
};

export const SingleGoalCompleted: Story = {
  args: {
    habit: habitFixtures.exerciseSingleCompleted
  }
};

export const SingleGoalIdle: Story = {
  args: {
    habit: habitFixtures.readingSingleIdle
  }
};

export const LongStreak: Story = {
  args: {
    habit: habitFixtures.meditationLongStreak
  }
};
```

**⚠️ КРИТИЧНО:**
- Названия stories ИДЕНТИЧНЫ React
- Title paths ИДЕНТИЧНЫ
- Порядок stories ИДЕНТИЧЕН
- Данные из ОДНИХ фикстур

**Создать аналогичные stories для всех компонентов:**
- `kpi-card.stories.ts`
- `page-header.stories.ts`
- `empty-state.stories.ts`
- ... (всего ~20)

#### 7.4.4. Локальный запуск

```bash
npm run storybook
# Откроется на http://localhost:6007
```

**Результат Phase 7.4:** ✅ Angular Storybook работает

---

### Phase 7.5: Loki Comparison

**Цель:** Сравнить Angular с React baseline

#### 7.5.1. Setup Loki для Angular

```bash
cd /Users/yubvin/PhpstormProjects/streakflow
npm install --save-dev loki
```

**package.json**
```json
{
  "scripts": {
    "storybook": "storybook dev -p 6007",
    "build-storybook": "storybook build -o storybook-static",
    "loki:test": "loki test --requireReference --reactUri file:./storybook-static",
    "loki:approve": "loki approve",
    "loki:diff": "loki test --requireReference --reactUri file:./storybook-static"
  }
}
```

#### 7.5.2. Скопировать baseline

```bash
# Copy reference from React prototype
cp -r prototype/.loki/reference .loki/
```

#### 7.5.3. Запустить сравнение

```bash
# 1. Build Angular Storybook
npm run build-storybook

# 2. Compare with baseline
npm run loki:test
```

**Результаты:**
- ✅ Если все ОК: `All tests passed`
- ❌ Если есть различия: `.loki/difference/` с diff-изображениями

#### 7.5.4. Просмотр diff

```bash
# Open diff images
open .loki/difference/
```

**Структура diff:**
```
.loki/
├── reference/          # Эталон (React)
├── current/            # Текущий (Angular)
└── difference/         # Различия
    ├── chrome.desktop_Components_HabitCard_MultiGoalProgress.png
    └── ... (только файлы с отличиями)
```

**Результат Phase 7.5:** ✅ Автоматическое сравнение работает

---

### Phase 7.6: Итеративное исправление

**Цель:** Достичь pixel-perfect

#### Workflow:

```
1. Запустить loki:test
   ↓
2. Открыть .loki/difference/
   ↓
3. Для каждого diff:
   a) Открыть React Storybook (localhost:6006)
   b) Открыть Angular Storybook (localhost:6007)
   c) Side-by-side сравнение
   d) Найти отличия:
      - Размер шрифта?
      - Padding/margin?
      - Цвет?
      - Border radius?
      - Shadow?
   ↓
4. Исправить Angular компонент
   ↓
5. Rebuild Storybook
   ↓
6. Повторить loki:test
   ↓
7. Если diff исчез → ✅
   Если остался → вернуться к шагу 3
```

#### Инструменты отладки:

1. **Browser DevTools**
   ```
   - Inspect element
   - Compare computed styles
   - Check box model (padding, margin, border)
   - Verify colors (hex, rgb)
   - Check font family, size, weight
   ```

2. **Storybook Controls**
   ```
   - Изменять props в реальном времени
   - Тестировать разные состояния
   - Проверять responsive
   ```

3. **Loki threshold tuning**
   ```json
   // Для примитивов - strict
   "threshold": 0
   
   // Для контента - lenient
   "threshold": 0.1
   ```

**Результат Phase 7.6:** ✅ Pixel-perfect достигнут

---

## 📊 Порядок выполнения

```
Week 1: Setup
├─ Day 1: Phase 7.1 - Storybook Contracts
├─ Day 2: Phase 7.2 - React Storybook + stories
└─ Day 3: Phase 7.3 - Loki baseline

Week 2: Implementation
├─ Day 4: Phase 7.4 - Angular Storybook + stories
├─ Day 5: Phase 7.5 - Loki comparison
└─ Day 6-7: Phase 7.6 - Iterative fixes → pixel-perfect ✅
```

---

## 🎯 Критерии приёмки

**Phase 7 считается завершенным когда:**

1. ✅ `storybook-contracts` пакет создан
2. ✅ React Storybook: ~20 stories
3. ✅ Angular Storybook: ~20 identical stories
4. ✅ Loki baseline создан (~60 PNG)
5. ✅ `npm run loki:test` → **0 differences**
6. ✅ Документация обновлена

---

## 📝 NPM Scripts (финальные)

**Root package.json**
```json
{
  "scripts": {
    // Angular
    "start:web": "nx serve web",
    "storybook": "storybook dev -p 6007",
    "build-storybook": "storybook build",
    
    // Visual Testing
    "visual:test": "npm run build-storybook && npm run loki:test",
    "loki:test": "loki test --requireReference --reactUri file:./storybook-static",
    "loki:approve": "loki approve",
    "loki:update": "npm run build-storybook && loki update --requireReference --reactUri file:./storybook-static",
    
    // Prototype
    "prototype:storybook": "cd prototype && npm run storybook",
    "prototype:baseline": "cd prototype && npm run build-storybook && npm run loki:update"
  }
}
```

---

## 🔧 Troubleshooting

### Проблема: Loki показывает много diff'ов

**Причины:**
1. Шрифты не загрузились → добавить `preload` в HTML
2. Анимации не выключены → проверить `stable.decorator.ts`
3. Дата не зафиксирована → проверить `Date.now`
4. Viewport отличается → проверить `.loki/config.json`

**Решение:**
```bash
# Увеличить threshold временно
"threshold": 0.3

# Или исключить проблемные stories
"storiesFilter": "^(?!.*Problematic).*$"
```

### Проблема: Stories не совпадают по названиям

**Причина:** Title или export name отличаются

**Решение:**
```typescript
// React
export const MultiGoalProgress: Story = { ... }

// Angular - ДОЛЖНО БЫТЬ ИДЕНТИЧНО
export const MultiGoalProgress: Story = { ... }
```

### Проблема: Loki не запускается

**Причина:** Chromium не установлен

**Решение:**
```bash
npx loki --update-chrome
```

---

## 🚀 Готово к старту!

**Начинаем с Phase 7.1 - Storybook Contracts?** ✅

