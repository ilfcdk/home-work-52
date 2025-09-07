# 🛠 Maintenance Planner (React + Redux Toolkit + TypeScript)

Програма для **реєстрації, редагування та контролю планових робіт на обладнанні**.  
Розроблено як курсовий проект для закріплення навичок роботи з **React**, **Redux Toolkit** та **TypeScript**.

---

## 🚀 Можливості застосунку

- **Обладнання**
  - Перегляд списку обладнання
  - Додавання нового обладнання через форму
  - Редагування/видалення існуючого
  - Зв’язок обладнання з роботами

- **Роботи (Tasks)**
  - Створення планових робіт з прив’язкою до обладнання
  - Вибір пріоритету (LOW/MEDIUM/HIGH) та статусу (PLANNED/IN_PROGRESS/DONE/CANCELED)
  - Редагування та видалення робіт
  - Фільтри для швидкого пошуку

- **Календар**
  - Відображення робіт у вигляді календаря (`react-big-calendar`)
  - Підтримка **drag’n’drop** та **resize** для зміни дат
  - Автоматичне оновлення робіт після зміни дати
  - Українська локалізація + стилі для різних пріоритетів

- **UI / UX**
  - Глобальні **тости** для повідомлень про успіх чи помилки
  - Зручна навігація (Dashboard, Equipment, Tasks, Schedule)
  - Сучасний дизайн (чисті картки, відступи, кольорові бейджі)

---

## 🗂 Структура проєкту

```
src/
├─ app/               # store, router, hooks
├─ layouts/           # AppLayout (header, nav, footer)
├─ pages/             # сторінки (Dashboard, Equipment, Tasks, Schedule, NotFound)
├─ features/
│  ├─ equipment/      # slice + компоненти (EquipmentList, Card, Form)
│  ├─ tasks/          # slice + компоненти (TaskList, TaskRow, TaskForm, Filters)
│  ├─ schedule/       # slice + CalendarView
│  └─ ui/             # uiSlice + Toast + UiRoot
├─ services/          # apiClient.ts, apiClient.mock.ts, mockDb.ts, endpoints.ts
└─ shared/            # типи (Equipment, Task, User, Priority, Status)
```

---

## 🔌 API (Mock vs Real)

Застосунок підтримує два режими:
1. **Mock API** (за замовчуванням)  
   - Дані зберігаються у `localStorage`
   - Працює через `src/services/mockDb.ts`
   - Вмикається прапором у `.env`:
     ```
     VITE_USE_MOCK=1
     ```

2. **Real API** (для інтеграції з бекендом)  
   - Використовує `fetch` до `VITE_API_URL`
   - Приклад `.env`:
     ```
     VITE_USE_MOCK=0
     VITE_API_URL=http://localhost:4000
     ```

---

## ⚡ Запуск проєкту

1. Встановити залежності:
   ```bash
   npm install
   ```

2. Запустити у **mock-режимі** (нічого більше не потрібно):
   ```bash
   npm run dev
   ```
   Всі дані будуть зберігатися у браузері (`localStorage`).

3. Очистити дані:
   - Відкрити DevTools → Application → Local Storage → видалити ключ `mock-db-v1`.

4. При наявності бекенду:
   - У `.env` вказати `VITE_API_URL`
   - Запустити бекенд на відповідному порту
   - Перезапустити `npm run dev`

---

## 🧭 Сторінки

- `/` – **Dashboard**: огляд системи
- `/equipment` – список обладнання
- `/tasks` – роботи (таблиця з CRUD)
- `/schedule` – календар з подіями
- `*` – сторінка **Not Found**

---

## 🎨 UI та Стилі

- **react-big-calendar** + локалізація `date-fns/locale/uk`
- Події календаря стилізовані за пріоритетом:
  - 🔴 HIGH – червоний фон
  - 🟡 MEDIUM – жовтий фон
  - 🔵 LOW – блакитний фон
- **Toast-повідомлення**:
  - 🟢 Успіх – зелене
  - 🔴 Помилка – червоне
  - 🔵 Інфо – синє
- Лейаут: шапка з навігацією, контент, футер

---

## 📦 Використані бібліотеки

- [React](https://react.dev/) 19
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) (валідація форм)
- [react-big-calendar](https://github.com/jquense/react-big-calendar)
- [date-fns](https://date-fns.org/)

---

## 🛠 Розробка

### ESLint + Prettier
Проєкт налаштований під **чистий код**:  
- ESLint перевіряє синтаксис і типи
- Prettier форматує автоматично

### Scripts
- `npm run dev` – запуск у dev-режимі
- `npm run build` – білд для продакшена
- `npm run lint` – перевірка ESLint

---

## 💡 Подальші покращення

- 🔐 Аутентифікація та розмежування прав доступу  
- 📊 Аналітика використання обладнання  
- 📅 Інтеграція з зовнішнім календарем (Google/Outlook)  
- 🌐 Мульти-мовність (uk/en)  
- 🖼 Кастомний рендер подій у календарі (іконки, бейджі, обладнання)

---

## 👨‍💻 Автор

Проєкт створено як навчальний курсовий для закріплення знань **React + Redux Toolkit + TypeScript**.

## 🌐 Демо

Посилання на розгорнутий проєкт: [Vercel](https://home-work-52.vercel.app/)

