# Visual Regression Testing

Автоматическая проверка визуального соответствия Angular реализации React прототипу.

---

## 📐 Концепция

**PIXEL-PERFECT правило:**
- React prototype = эталон (source of truth)
- Angular implementation = должна совпадать 1 в 1
- Playwright автоматически проверяет

---

## 📁 Структура

```
tests/visual/
├── reference/              # Эталонные скриншоты (React)
│   ├── dashboard-full.png
│   ├── habit-card-single.png
│   ├── habit-card-multi.png
│   ├── add-habit-modal.png
│   └── ...
├── current/                # Текущие скриншоты (Angular)
├── diff/                   # Diff изображения
├── reports/                # HTML отчеты
├── capture-reference.spec.ts  # Захват эталонов из React
└── compare-angular.spec.ts    # Сравнение Angular (Phase 8)
```

---

## 🚀 Использование

### 1. Захват эталонных скриншотов (один раз)

```bash
# Запусти React прототип
cd prototype
npm run dev

# В другом терминале - захвати скриншоты
cd /Users/yubvin/PhpstormProjects/streakflow
npx playwright test tests/visual/capture-reference.spec.ts
```

**Результат:** Эталонные скриншоты в `tests/visual/reference/`

### 2. Проверка Angular (manual - сейчас)

```bash
# Запусти Angular
npm run start:web

# Открой оба приложения:
# - React: http://localhost:5173
# - Angular: http://localhost:4200

# Сравни визуально, используя скриншоты как reference
```

### 3. Автоматическое сравнение (Phase 8)

```bash
# Запусти Angular
npm run start:web

# Запусти comparison tests
npx playwright test tests/visual/compare-angular.spec.ts

# Смотри отчет
npx playwright show-report tests/visual/reports
```

---

## 📋 Что проверяется

### Экраны:
- ✅ Dashboard (full page + viewport)
- ✅ Habits screen (table view)
- ✅ Dashboard Dark theme

### Компоненты:
- ✅ Habit Card (single goal)
- ✅ Habit Card (multi goal)
- ✅ KPI Cards section
- ✅ Sidebar
- ✅ Topbar
- ✅ Add Habit Modal

### Viewports:
- ✅ Desktop (1280x720)
- ✅ Desktop Dark (1280x720)
- ✅ Tablet (1024x768)
- ✅ Mobile (393x852)

---

## ⚙️ Конфигурация

**Tolerance:**
- `maxDiffPixels: 100` - допустимо 100 пикселей отличия
- `threshold: 0.1` - 10% допустимого отличия на пиксель

**Почему tolerance:**
- Font rendering может слегка отличаться
- Browser sub-pixel rendering
- Anti-aliasing differences

---

## 📊 Процесс разработки

### Workflow:

```
1. Делаешь компонент в Angular
2. Запускаешь оба приложения рядом
3. Сравниваешь с reference screenshot
4. Корректируешь до pixel-perfect
5. В Phase 8: автоматическая проверка
```

### Обновление эталонов:

```bash
# Если прототип изменился
cd prototype && npm run dev
npx playwright test tests/visual/capture-reference.spec.ts

# Коммитишь новые скриншоты
git add tests/visual/reference/
git commit -m "chore(visual): update reference screenshots"
```

---

## 🎯 Критерии приёмки

**Скриншот считается ЭТАЛОННЫМ если:**
- ✅ React приложение полностью загружено
- ✅ Нет loading states
- ✅ Все анимации завершены
- ✅ Fonts загружены
- ✅ Images загружены
- ✅ Высокое качество (PNG)

**Angular реализация ПРИНИМАЕТСЯ если:**
- ✅ Visual diff < 10%
- ✅ maxDiffPixels < 100
- ✅ Размеры элементов совпадают
- ✅ Цвета совпадают
- ✅ Layout совпадает

---

## 📝 Scripts

Добавлено в `package.json`:

```json
{
  "scripts": {
    "test:visual:install": "playwright install chromium",
    "test:visual:reference": "playwright test tests/visual/capture-reference.spec.ts",
    "test:visual:compare": "playwright test tests/visual/compare-angular.spec.ts",
    "test:visual:update": "playwright test --update-snapshots",
    "test:visual:report": "playwright show-report tests/visual/reports"
  }
}
```

---

## 🎯 Next Steps

**Сейчас (Phase 6.5):**
- ✅ Playwright установлен
- ✅ Конфигурация создана
- ✅ Скрипт capture готов
- ⏳ Запустить захват эталонов

**Phase 8:**
- ⏳ Создать compare-angular.spec.ts
- ⏳ Автоматизировать в CI/CD
- ⏳ Интегрировать с Storybook
- ⏳ Chromatic (опционально)

---

**Эталонные скриншоты = источник истины для визуала!** ✅

