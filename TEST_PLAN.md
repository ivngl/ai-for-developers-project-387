# Test Plan — Simple Cal

Calendar scheduling web app. Users can browse event types and book slots; admin manages event types and bookings.

## Environment

| Component | Technology |
|-----------|------------|
| Client | React 18 + TypeScript + Vite (port 5173) |
| Server | Express + TypeScript (port 3001) |
| Database | SQLite via Prisma ORM (`prisma/dev.db` for dev, `prisma/test.db` for tests) |
| E2E | Playwright (API + Browser) |
| Auth | Admin password (`ADMIN_PASSWORD` env) + JWT |

Test DB is reset before each test via `cleanDb()` (deletes all bookings and event types).

---

## A. Public User (Guest)

| ID | Сценарий | Шаги | Ожидаемый результат | Тест(ы) |
|----|----------|------|---------------------|---------|
| A1 | Просмотр списка типов встреч | Открыть `/` | Отображаются все event types, видны title, description, duration | [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `GET /api/event-types returns created event types`; [`e2e/flows/booking.spec.ts`](e2e/flows/booking.spec.ts) → `user can book a meeting end-to-end` |
| A2 | Просмотр пустого списка | Открыть `/` без event types | Сообщение "No event types available" | [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `GET /api/event-types returns empty array initially` |
| A3 | Выбор даты и просмотр слотов | Нажать Book → выбрать дату | Отображаются доступные слоты, занятые помечены "(booked)" | [`e2e/api/slots.spec.ts`](e2e/api/slots.spec.ts) → `returns slots across work hours` + `marks booked slots as unavailable`; [`e2e/flows/booking.spec.ts`](e2e/flows/booking.spec.ts) → `user can book a meeting end-to-end` |
| A4 | Успешное бронирование | Выбрать дату → слот → заполнить guestName/guestEmail → Confirm | "Booking Confirmed!", запись в БД | [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `POST /api/bookings creates a booking`; [`e2e/flows/booking.spec.ts`](e2e/flows/booking.spec.ts) → `user can book a meeting end-to-end` |
| A5 | Бронирование без опциональных полей | Выбрать дату → слот → Confirm (пустые name/email) | Бронирование создаётся, guestName/guestEmail = null | [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `without guestName and guestEmail creates booking with nulls`; [`e2e/flows/booking.spec.ts`](e2e/flows/booking.spec.ts) → `user can book without providing name or email` |
| A6 | Попытка бронирования занятого слота | Забронировать слот → попробовать ещё раз через API | 409 "already booked" | [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `with conflicting time returns 409` |
| A7 | Навигация Back to Home после бронирования | Забронировать → Back to Home | Возврат на `/`, список типов | [`e2e/flows/booking.spec.ts`](e2e/flows/booking.spec.ts) → `user can go back to home after booking` |
| A8 | Просмотр single-slot event type | Тип с date+startTime → Book → выбор даты | 1 слот, если дата совпадает, иначе пусто | [`e2e/api/slots.spec.ts`](e2e/api/slots.spec.ts) → `returns correct slot for single-slot event type` + `returns empty for single-slot event type on non-matching date` |

---

## B. Администратор (Admin)

| ID | Сценарий | Шаги | Ожидаемый результат | Тест(ы) |
|----|----------|------|---------------------|---------|
| B1 | Вход с правильным паролем | `/admin/login` → пароль → Login | Редирект на `/admin`, видны Event Types и Upcoming Bookings | [`e2e/api/admin.spec.ts`](e2e/api/admin.spec.ts) → `POST /api/admin/login with correct password returns token`; [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin can log in and see the dashboard` |
| B2 | Вход с неверным паролем | `/admin/login` → wrong → Login | Ошибка "Invalid password", остаётся на `/admin/login` | [`e2e/api/admin.spec.ts`](e2e/api/admin.spec.ts) → `with wrong password returns 401` + `with empty body returns 401`; [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin with wrong password sees error` |
| B3 | Создание шаблонного event type | New Event Type → title + duration → Save | Появляется в списке на дашборде | [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `POST /api/event-types with auth creates event type`; [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin can create a new event type` |
| B4 | Создание single-slot event type | New → title + duration + date + startTime → Save | Отображается с бейджем даты | [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin can create a single-slot event type` |
| B5 | Создание с невалидными полями | New → пустой title → Save / duration = 0 → Save | Ошибка валидации, 400 | [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `with missing title returns 400` + `with invalid duration returns 400` + `with date but no startTime returns 400` + `with invalid date format returns 400` |
| B6 | Редактирование event type | Edit → изменить title → Save | Изменения отображаются, БД обновлена | [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `PUT /api/event-types/:id updates event type`; [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin can edit an existing event type` |
| B7 | Удаление event type | Delete → подтвердить диалог | Тип исчезает из списка | [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `DELETE /api/event-types/:id deletes event type`; [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin can delete an event type` |
| B8 | Удаление event type с бронированиями | Создать тип → создать бронь → удалить тип | Каскадное удаление (тип и его брони удаляются) | [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin sees error when deleting event type with bookings` |
| B9 | Просмотр пустых бронирований | Залогиниться без броней | "No bookings yet" | [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin can see empty bookings state` |
| B10 | Просмотр бронирований с данными | Залогиниться с бронями | Таблица: тип, время, имя, email | [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `GET /api/bookings with auth returns bookings list`; [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin can see bookings with data` |
| B11 | Logout | Нажать Logout | Токен очищен, редирект на `/admin/login` | [`e2e/flows/admin.spec.ts`](e2e/flows/admin.spec.ts) → `admin can log out` |

---

## C. API & Edge Cases

| ID | Сценарий | Ожидаемый результат | API | Тест(ы) |
|----|----------|---------------------|-----|---------|
| C1 | Истекший/невалидный JWT | 401 | Любой admin route | [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `POST/PUT/DELETE without auth returns 401`; [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `GET /api/bookings without auth returns 401` + `with invalid JWT returns 401` |
| C2 | Гонка бронирования (concurrent) | Один 201, другой 409 | `POST /api/bookings` | [`e2e/api/concurrency.spec.ts`](e2e/api/concurrency.spec.ts) |
| C3 | pastDate → /api/slots | 400 "Date cannot be in the past" | `GET /api/slots` | [`e2e/api/slots.spec.ts`](e2e/api/slots.spec.ts) → `with past date returns 400` |
| C4 | date > 14 дней → /api/slots | 400 "Date must be within the next 14 days" | `GET /api/slots` | [`e2e/api/slots.spec.ts`](e2e/api/slots.spec.ts) → `with date beyond 14 days returns 400` |
| C5 | PUT только с title → остальные поля не меняются | Частичное обновление | `PUT /api/event-types/:id` | [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `PUT /api/event-types/:id with only title leaves other fields unchanged` |
| C6 | startTime ≥ endTime → /api/bookings | 400 "startTime must be before endTime" | `POST /api/bookings` | [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `with startTime >= endTime returns 400` |
| C7 | duration ≠ eventType.duration → /api/bookings | 400 "Booking duration must be exactly N minutes" | `POST /api/bookings` | [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `with wrong duration returns 400` |
| C8 | Несуществующий eventTypeId | 404 "not found" | `GET /api/slots`, `POST /api/bookings`, `PUT/DELETE /api/event-types/:id` | [`e2e/api/slots.spec.ts`](e2e/api/slots.spec.ts) → `with non-existent event type returns 404`; [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `with non-existent event type returns 404`; [`e2e/api/event-types.spec.ts`](e2e/api/event-types.spec.ts) → `PUT/DELETE with non-existent id returns 404` |
| C9 | Отсутствие обязательных параметров | 400 | `GET /api/slots` (без eventTypeId/date), `POST /api/bookings` (без eventTypeId) | [`e2e/api/slots.spec.ts`](e2e/api/slots.spec.ts) → `without eventTypeId returns 400` + `without date returns 400`; [`e2e/api/bookings.spec.ts`](e2e/api/bookings.spec.ts) → `with missing eventTypeId returns 400` |
| C10 | Health check | 200 `{ status: "ok" }` | `GET /api/health` | [`e2e/api/health.spec.ts`](e2e/api/health.spec.ts) |

---

## Coverage Summary

| Area | Total | Covered | Missing |
|------|-------|---------|---------|
| Public (A1–A8) | 8 | 8 | — |
| Admin (B1–B11) | 11 | 11 | — |
| API & Edge (C1–C10) | 10 | 10 | — |
| **Total** | **29** | **29** | **0** |

## Running Tests

```bash
# API tests only
npx playwright test --config e2e/playwright.config.ts e2e/api/

# UI flow tests only
npx playwright test --config e2e/playwright.config.ts e2e/flows/

# All tests
npx playwright test --config e2e/playwright.config.ts
```
