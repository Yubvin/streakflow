# Аудит архитектуры Angular проекта

## 🧱 1. Архитектура и структура проекта

### ✅ Хорошо:
- ✅ Standalone components везде
- ✅ Монорепо структура с Nx
- ✅ Разделение UI библиотек по компонентам
- ✅ Единообразная структура: каждый компонент = отдельная библиотека
- ✅ Использование secondary entry points (`@streakflow/ui/button`)
- ✅ Shared theme с дизайн-токенами

### ✅ Исправлено:
- ✅ **41 компонент** перенесены с inline `template:` на `templateUrl:` (отличная читаемость)
- ❌ Нет разделения на smart/dumb компоненты (пока только UI primitives)
- ❌ Нет state management (NgRx/Signals Store) - только локальные signals
- ❌ Нет CoreModule/SharedModule паттерна (но standalone components, так что это OK)

### Компоненты с inline template (требуют рефакторинга):
1. `ui-select-label.component.ts`
2. `ui-select-group.component.ts`
3. `ui-select-item.component.ts`
4. `ui-select-content.component.ts`
5. `ui-context-menu-label.component.ts`
6. `ui-context-menu-separator.component.ts`
7. `ui-context-menu-item.component.ts`
8. `ui-context-menu-content.component.ts`
9. `ui-dropdown-menu-content.component.ts`
10. `ui-dropdown-menu-label.component.ts`
11. `ui-dropdown-menu-separator.component.ts`
12. `ui-dropdown-menu-item.component.ts`
13. `ui-popover-content.component.ts`
14. `ui-hover-card.component.ts`
15. `ui-breadcrumb-separator.component.ts`
16. `ui-tooltip-content.component.ts`
17. `ui-tooltip.component.ts`
18. `ui-pagination-previous.component.ts`
19. `ui-pagination-ellipsis.component.ts`
20. `ui-pagination-next.component.ts`
21. `ui-pagination-link.component.ts`
22. `ui-pagination-item.component.ts`
23. `ui-pagination-content.component.ts`
24. `ui-pagination.component.ts`
25. `ui-breadcrumb-ellipsis.component.ts`
26. `ui-breadcrumb-page.component.ts`
27. `ui-breadcrumb-link.component.ts`
28. `ui-breadcrumb-item.component.ts`
29. `ui-breadcrumb-list.component.ts`
30. `ui-breadcrumb.component.ts`
31. `ui-tabs-content.component.ts`
32. `ui-tabs-trigger.component.ts`
33. `ui-tabs.component.ts`
34. `ui-tabs-list.component.ts`
35. `ui-card-footer.component.ts`
36. `ui-card-content.component.ts`
37. `ui-card-action.component.ts`
38. `ui-card-description.component.ts`
39. `ui-card-title.component.ts`
40. `ui-card-header.component.ts`
41. `ui-card.component.ts`

---

## ⚡️ 2. Производительность

### ✅ Хорошо:
- ✅ `ChangeDetectionStrategy.OnPush` везде
- ✅ Signals для реактивности
- ✅ Standalone components (меньше бандл)
- ✅ Нет subscribe - используются signals и outputs

### ⚠️ Проверить:
- ⚠️ Нет lazy loading (пока только одно приложение)
- ⚠️ Bundle size warning: **739.68 kB** (превышает 500 kB на 239.68 kB)
- ⚠️ Нет trackBy в циклах (проверить app.html)
- ⚠️ Нет виртуализации для длинных списков

### Bundle size проблема:
```
▲ [WARNING] bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 239.68 kB with a total of 739.68 kB.
```

**Причины:**
- Angular CDK (overlay, a11y) добавляет вес
- Много UI компонентов в одном бандле
- Нет code splitting

---

## 🎨 3. UI / UX и визуальная точность

### ✅ Исправлено (1 в 1 с прототипом):
- ✅ **Button** - sizes (h-8/h-9/h-10), gap-2, focus ring-[3px], SVG rules
- ✅ **Badge** - border, gap-1, shrink-0, overflow-hidden
- ✅ **Input** - h-9, py-1, focus ring-[3px]
- ✅ **Select** - padding p-1, item правильный, label правильный
- ✅ **Slider** - track h-4, thumb size-4, border, shadow-sm, ring-4
- ✅ **Textarea** - min-h-16, focus ring-[3px], resize-none
- ✅ **Checkbox** - size-4, ring-[3px], shadow-xs
- ✅ **Radio** - size-4, ring-[3px], shadow-xs

### ❌ Требуют проверки/исправления:
- ❌ **Switch** - размеры могут не совпадать
- ❌ **Toggle** - не проверен
- ❌ **Toggle Group** - не проверен
- ❌ **Tabs** - не проверен
- ❌ **Breadcrumb** - не проверен
- ❌ **Pagination** - не проверен
- ❌ **Tooltip** - не проверен
- ❌ **Hover Card** - не проверен детально
- ❌ **Popover** - не проверен детально
- ❌ **Dropdown Menu** - не проверен детально
- ❌ **Context Menu** - не проверен детально

### Дизайн-токены:
- ✅ Используются CSS variables
- ✅ Централизованы в `libs/shared-theme`
- ✅ Light/Dark mode поддержка

---

## 🧠 4. Читаемость и поддерживаемость кода

### ✅ Хорошо:
- ✅ TypeScript строгий режим
- ✅ Осмысленные названия компонентов
- ✅ Barrel exports (`index.ts`)
- ✅ Единообразная структура файлов

### ❌ Проблемы:
- ❌ **41 компонент с inline template** - КРИТИЧНО
- ❌ Нет ESLint правил запрещающих inline templates
- ❌ Мало комментариев JSDoc для публичных API
- ❌ Нет Prettier конфигурации (удалили `.prettierrc.json`)
- ❌ Нет Husky pre-commit hooks

### Примеры inline templates (плохая практика):
```typescript
// ❌ ПЛОХО - libs/ui/card/src/lib/ui-card.component.ts
@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <div class="ui-card" data-slot="card">
      <ng-content></ng-content>
    </div>
  `,
  ...
})

// ✅ ХОРОШО - должно быть так:
@Component({
  selector: 'ui-card',
  standalone: true,
  templateUrl: './ui-card.component.html',
  ...
})
```

---

## 🧩 5. Тесты и качество

### ❌ Критичные проблемы:
- ❌ **Нет unit тестов** (все `.spec.ts` файлы пустые или дефолтные)
- ❌ **Нет E2E тестов**
- ❌ Coverage = 0%
- ❌ Тесты не запускались ни разу

### Что нужно:
- ❌ Unit тесты для каждого компонента
- ❌ E2E тесты для критичных flow (Playwright/Cypress)
- ❌ Visual regression tests (Chromatic/Percy)
- ❌ Accessibility tests (axe-core)

---

## 🔒 6. Безопасность и конфигурации

### ✅ Хорошо:
- ✅ Нет прямого доступа к `window`/`document` (используются Angular abstractions)
- ✅ Нет API ключей в коде
- ✅ `environment.ts` чистый

### ⚠️ Проверить:
- ⚠️ Нет sanitization для user content
- ⚠️ Нет CSP headers настройки
- ⚠️ Dist папка в git (должна быть в .gitignore) - **ИСПРАВЛЕНО**

---

## 📊 Дополнительно

### ❌ Отсутствует:
- ❌ Lighthouse audit (не проводился)
- ❌ CI/CD pipeline
- ❌ i18n (Transloco/ngx-translate)
- ❌ Feature flags
- ❌ Error boundary / Error handling
- ❌ Logging service
- ❌ Analytics integration

---

## 🎯 План действий (по приоритету)

### 🔥 КРИТИЧНО (сделать сейчас):
1. ✅ Вынести все inline templates в `.html` файлы (41 компонент)
2. ✅ Продолжить сверку с прототипом (Switch, Toggle, Tabs, overlays)

### ⚠️ ВАЖНО (следующий спринт):
3. ⚠️ Добавить ESLint правило: запретить inline templates
4. ⚠️ Оптимизировать bundle size (lazy load, tree shaking)
5. ⚠️ Добавить unit тесты для UI компонентов

### 📝 ЖЕЛАТЕЛЬНО (backlog):
6. 📝 Добавить Prettier + Husky
7. 📝 Добавить Storybook для UI компонентов
8. 📝 Добавить visual regression tests
9. 📝 Настроить CI/CD
10. 📝 Добавить error handling

---

## Следующий шаг

**Начинаю рефакторинг inline templates → .html файлы?**
Или **сначала доделать сверку с прототипом?**

