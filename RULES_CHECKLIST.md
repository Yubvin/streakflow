# ✅ Rules Checklist - Обязательно к выполнению
## Все правила разработки в одном месте

---

## 🎯 **ТОП-6 КРИТИЧНЫХ ПРАВИЛ**

### 1. ⭐⭐⭐ **PIXEL-PERFECT - Визуальное соответствие** 

**СТРОГО НАСТРОГО:**
- ✅ Визуально 1 в 1 с React прототипом
- ✅ Точные размеры, отступы, цвета
- ✅ Точные шрифты и animations
- ✅ Открой prototype/ и web/ рядом и сверяй
- ❌ НИКАКИХ "примерно", "похоже", "на глаз"

**Процесс:**
```
1. Открой прототип (npm run dev в prototype/)
2. Открой Angular (npm run start:web)
3. Положи окна рядом
4. Копируй className ТОЧНО
5. Проверь в DevTools
```

---

### 2. ⭐⭐⭐ **DISPATCH TABLE PATTERN**

**СТРОГО:**
- ❌ НЕТ if/else/switch в UI-обработчиках
- ✅ Discriminated unions для состояний
- ✅ Таблицы диспетчеризации (Record<Kind, Handler>)
- ✅ Pure резолверы без side effects

**Пример:**
```typescript
type State = { kind: 'a' } | { kind: 'b' };
const actions: Record<State['kind'], Handler> = {
  a: () => action1(),
  b: () => action2()
};
resolveAction(state, actions)();
```

---

### 3. ⭐⭐⭐ **CRITICAL THINKING**

**ВСЕГДА спрашивай:**
- ❓ Можно ли ПРОЩЕ?
- ❓ Нужна ли эта абстракция СЕЙЧАС?
- ❓ Не добавляю ли ЛИШНЮЮ сложность?
- ❓ Есть ли более ЭЛЕГАНТНОЕ решение?
- ❓ Нужен ли этот код ВООБЩЕ?

**Принципы:**
- ✅ Простой код > Умный код
- ✅ Работающий код > Идеальный код
- ✅ Понятный код > Короткий код

---

### 4. ⭐⭐ **ПОЛНЫЕ ИМЕНА ПЕРЕМЕННЫХ**

**ЗАПРЕЩЕНО:**
- ❌ Однобуквенные: `h`, `n`, `i`, `u`
- ❌ Сокращения: `hab`, `msg`, `btn`, `usr`, `cfg`
- ❌ Загадочные: `temp`, `res`, `req`, `val`

**РАЗРЕШЕНО:**
- ✅ Полные: `habitList`, `completionRate`, `currentUser`
- ✅ В циклах: `for (const habit of habits)`
- ✅ Общепринятые: `id`, `url`, `html`, `css`, `api`

---

### 5. ⭐⭐ **АНГЛИЙСКИЙ ЯЗЫК**

**ВСЕГДА English:**
- ✅ Комментарии
- ✅ JSDoc
- ✅ Commit messages
- ✅ Code documentation

**Формат коммитов:**
```
feat(habits): add multi-goal support
fix(dashboard): correct completion rate
```

---

### 6. ⭐⭐ **MODERN ANGULAR 17+**

**ИСПОЛЬЗУЙ:**
- ✅ `input()` / `output()` вместо `@Input` / `@Output`
- ✅ `signal()` / `computed()` вместо getters
- ✅ `inject()` вместо constructor injection
- ✅ `@if` / `@for` вместо `*ngIf` / `*ngFor`
- ✅ `standalone: true` для всех компонентов
- ✅ `viewChild.required()` для доступа к child

---

## 📋 **CHECKLIST ПЕРЕД КОММИТОМ**

### Обязательно проверь:

**Код:**
```
□ Нет if/else/switch в UI-обработчиках
□ Все переменные с полными именами
□ Все комментарии на английском
□ Используется Modern Angular синтаксис
□ Нет закомментированного кода
□ Нет console.log
□ Нет неиспользуемых импортов
□ Линтер проходит (0 ошибок)
```

**Визуал:**
```
□ Открыл прототип и Angular рядом
□ Размеры совпадают (p-4, gap-2, h-8)
□ Цвета совпадают (bg-[#5B4DFF])
□ Шрифты совпадают (text-2xl font-semibold)
□ Анимации совпадают (transition-all duration-300)
□ Hover effects совпадают
□ Border-radius совпадает (rounded-lg)
□ Shadows совпадают (shadow-md)
□ Spacing совпадает
```

**Архитектура:**
```
□ Файл в правильной папке (core/shared/features/layout/modals)
□ Smart/Dumb правильно разделены
□ Сервисы инжектятся правильно
□ Barrel exports обновлены (index.ts)
```

---

## 🎯 **ПРОЦЕСС РАЗРАБОТКИ**

### При создании компонента:

```
1. ❓ CRITICAL THINKING:
   - Точно нужен новый компонент?
   - Можно переиспользовать существующий?
   - Не слишком ли сложно?

2. 📐 PIXEL-PERFECT:
   - Открой прототип
   - Найди аналогичный компонент
   - Скопируй структуру HTML точно
   - Скопируй className точно

3. 🎨 DISPATCH TABLES:
   - Определи состояния (discriminated union)
   - Создай таблицу диспетчеризации
   - Computed для определения состояния
   - Обработчик без ветвлений

4. 📝 ИМЕНОВАНИЕ:
   - Полные имена переменных
   - kebab-case для файлов
   - Английский для комментариев

5. 🔧 MODERN ANGULAR:
   - input() / output()
   - signal() / computed()
   - inject()
   - @if / @for

6. ✅ ПРОВЕРКА:
   - Линтер
   - Визуальное сравнение с прототипом
   - Checklist выше
```

---

## 📐 **PIXEL-PERFECT GUIDE**

### Где брать точные стили:

**1. HabitCard:**
```
Файл: prototype/src/components/habit-card.tsx
Копируй: className из <Card>, <Button>, все элементы
```

**2. Dashboard:**
```
Файл: prototype/src/components/screens/dashboard.tsx
Копируй: grid layouts, card padding, spacing
```

**3. KPICard:**
```
Файл: prototype/src/components/kpi-card.tsx
Копируй: структуру, размеры иконок, spacing
```

**4. Habits Table:**
```
Файл: prototype/src/components/screens/habits.tsx
Копируй: table structure, cell padding, hover effects
```

**5. Modals:**
```
Файл: prototype/src/components/add-habit-modal.tsx
Копируй: form layout, button sizes, spacing
```

### Как проверять:

**1. Screenshot compare:**
```bash
# Сделай скриншот прототипа
# Сделай скриншот Angular версии
# Наложи друг на друга
# Проверь совпадение pixel-by-pixel
```

**2. DevTools compare:**
```
Прототип DevTools → Computed styles
Angular DevTools → Computed styles
Сравни все значения
```

**3. Visual regression:**
```
Когда будет Phase 8 (Storybook)
Chromatic автоматически проверит
```

---

## 🚨 **RED FLAGS - когда остановиться**

**Визуал:**
- 🚨 Размеры не совпадают → СТОП, проверь прототип
- 🚨 Цвета отличаются → СТОП, скопируй точно
- 🚨 Spacing другой → СТОП, проверь gap/padding
- 🚨 Шрифты не те → СТОП, проверь text-*

**Код:**
- 🚨 if/else в обработчике → СТОП, сделай dispatch table
- 🚨 Переменная h, msg, btn → СТОП, полное имя
- 🚨 Комментарий на русском → СТОП, English
- 🚨 @Input вместо input() → СТОП, Modern Angular

**Архитектура:**
- 🚨 Сервис в Dumb компоненте → СТОП, вынеси в Smart
- 🚨 Логика в Template → СТОП, вынеси в computed
- 🚨 Дублирование кода → СТОП, создай утилиту

---

## ✅ **QUICK REFERENCE**

### Перед началом работы:
1. ✅ Прочитал DEVELOPMENT_RULES.md
2. ✅ Открыл прототип для сравнения
3. ✅ Понял какой компонент делаю
4. ✅ Проверил нет ли уже такого

### Во время работы:
1. ✅ Копирую стили точно из прототипа
2. ✅ Использую dispatch tables
3. ✅ Полные имена переменных
4. ✅ Комментарии на английском
5. ✅ Modern Angular синтаксис

### Перед коммитом:
1. ✅ Линтер проходит (0 ошибок)
2. ✅ Визуально 1 в 1 с прототипом
3. ✅ Нет if/else в обработчиках
4. ✅ Все чеклисты пройдены
5. ✅ Commit message правильный

---

## 📚 **ДОКУМЕНТЫ ДЛЯ ИЗУЧЕНИЯ**

**Обязательно прочитай:**
1. ⭐⭐⭐ **DEVELOPMENT_RULES.md** - все правила детально
2. ⭐⭐ **IMPLEMENTATION_ROADMAP.md** - план фаз
3. ⭐ **README.md** - quick start

**Для справки:**
- ARCHITECTURE_CRITIQUE.md - архитектурные решения
- PROTOTYPE_ANALYSIS.md - что есть в прототипе
- REFACTORING_REPORT.md - примеры рефакторинга

---

## 🎯 **ПОМНИ:**

> **Визуально 1 в 1 с прототипом - СТРОГО НАСТРОГО!**

> **Никаких if/else в UI-обработчиках - ВСЕГДА dispatch tables!**

> **Полные имена переменных - НИКОГДА сокращений!**

> **Английский язык - ВСЕГДА для кода!**

> **Modern Angular - ТОЛЬКО новый синтаксис!**

---

**Эти правила ОБЯЗАТЕЛЬНЫ для КАЖДОГО коммита!** ✅

