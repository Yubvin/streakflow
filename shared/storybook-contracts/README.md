# Storybook Contracts

**Shared configuration for pixel-perfect visual testing**

## 📦 Purpose

This package provides a **single source of truth** for Storybook stories across:
- React prototype (эталон)
- Angular implementation (проверяемый)

By using identical fixtures, decorators, and parameters, we ensure:
- ✅ Deterministic rendering
- ✅ Stable visual diffs
- ✅ Reliable pixel-perfect comparisons

---

## 📁 Structure

```
shared/storybook-contracts/
├── fixtures/           # Mock data
│   ├── habits.fixture.ts
│   ├── user.fixture.ts
│   └── kpi.fixture.ts
├── decorators/         # Storybook decorators
│   ├── stable.decorator.ts      # Eliminates non-determinism
│   ├── theme.decorator.ts       # Light/Dark mode
│   └── viewport.decorator.ts    # Responsive breakpoints
├── parameters/         # Storybook parameters
│   └── global.ts
├── types.ts            # Shared TypeScript types
└── index.ts            # Barrel export
```

---

## 🚀 Usage

### React Prototype

**`.storybook/preview.tsx`**
```tsx
import { 
  stableDecorator, 
  themeDecorator, 
  themeGlobalTypes,
  globalParameters,
  viewportParameters 
} from '../shared/storybook-contracts';

import '../src/index.css';

export default {
  parameters: {
    ...globalParameters,
    ...viewportParameters
  },
  decorators: [
    stableDecorator, 
    themeDecorator
  ],
  globalTypes: themeGlobalTypes
};
```

**Story example:**
```tsx
import { habitFixtures } from '../shared/storybook-contracts';

export const MultiGoalProgress: Story = {
  args: {
    habit: habitFixtures.waterMultiGoal
  }
};
```

### Angular App

**`.storybook/preview.ts`**
```typescript
import { 
  stableDecoratorAngular, 
  themeDecoratorAngular, 
  themeGlobalTypes,
  globalParameters,
  viewportParameters 
} from '../shared/storybook-contracts';

import '../web/src/styles.scss';

export default {
  parameters: {
    ...globalParameters,
    ...viewportParameters
  },
  decorators: [
    stableDecoratorAngular, 
    themeDecoratorAngular
  ],
  globalTypes: themeGlobalTypes
};
```

**Story example:**
```typescript
import { habitFixtures } from '../../../../../../shared/storybook-contracts';

export const MultiGoalProgress: Story = {
  args: {
    habit: habitFixtures.waterMultiGoal
  }
};
```

---

## 🎯 Key Features

### Stable Decorator

Eliminates all sources of non-determinism:
- ✅ Fixed Date: `2024-01-15T12:00:00.000Z`
- ✅ Fixed Random: Deterministic `Math.random()`
- ✅ Disabled animations: `animation: none !important`
- ✅ Disabled transitions: `transition: none !important`
- ✅ Hidden cursor: `caret-color: transparent`
- ✅ Fonts loaded: Waits for `document.fonts.ready`

### Theme Decorator

Applies consistent theme:
- 🌞 Light mode: `html.classList.remove('dark')`
- 🌙 Dark mode: `html.classList.add('dark')`

### Viewport Parameters

Standard breakpoints:
- 📱 Mobile: 375×667
- 📋 Tablet: 768×1024
- 🖥️ Desktop: 1280×800

### Fixtures

Deterministic test data:
- **habits.fixture.ts** - 5 habit scenarios
- **user.fixture.ts** - User with/without avatar
- **kpi.fixture.ts** - KPI data with trends

---

## ⚠️ Important Rules

1. **DO NOT modify fixtures without updating baseline!**
   - Changing fixtures will break all visual tests
   - Update baseline: `cd prototype && npm run loki:update`

2. **Story names MUST match exactly:**
   ```tsx
   // React
   export const MultiGoalProgress: Story = { ... }
   
   // Angular - MUST be identical
   export const MultiGoalProgress: Story = { ... }
   ```

3. **Title paths MUST match exactly:**
   ```tsx
   // Both must use same title
   title: 'Components/HabitCard'
   ```

4. **Use fixtures, not hardcoded data:**
   ```tsx
   // ✅ Good
   args: { habit: habitFixtures.waterMultiGoal }
   
   // ❌ Bad
   args: { habit: { name: 'Water', ... } }
   ```

---

## 📊 Testing Workflow

1. Create React story with fixtures
2. Create identical Angular story with same fixtures
3. Run Loki comparison
4. If diff > threshold → fix Angular component
5. Repeat until pixel-perfect ✅

---

## 🔧 Maintenance

### Adding New Fixtures

1. Add to appropriate fixture file
2. Export from `index.ts`
3. Update baseline: `npm run loki:update`
4. Commit new baseline screenshots

### Updating Existing Fixtures

1. Update fixture data
2. Rebuild both Storybooks
3. Update baseline: `npm run loki:update`
4. Review all affected stories
5. Commit updated screenshots

---

## 📝 Version

Current: **1.0.0**

**Changelog:**
- 1.0.0 - Initial release with habits, user, KPI fixtures

