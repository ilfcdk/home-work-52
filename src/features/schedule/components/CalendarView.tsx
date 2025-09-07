// src/features/schedule/components/CalendarView.tsx
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchTasks, updateTask } from '@/features/tasks/thunks';
import { selectFilteredTasks } from '@/features/tasks/selectors';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { Event as RBCEvent } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { parse, startOfWeek, getDay, format } from 'date-fns';
import { uk } from 'date-fns/locale';

import { fetchSchedule } from '@/features/schedule/thunks';

// стилі календаря
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

// типи допоміжних полів події
type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
type Status = 'PLANNED' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';

// подія календаря з додатковими полями у resource
type CalendarEvent = RBCEvent & {
  id: string;
  resource?: {
    priority?: Priority;
    status?: Status;
    equipmentId?: string;
  };
};

const locales = { 'uk-UA': uk };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar);

// локалізація та формати
const messages = {
  today: 'Сьогодні',
  previous: 'Назад',
  next: 'Вперед',
  month: 'Місяць',
  week: 'Тиждень',
  day: 'День',
  agenda: 'План',
  showMore: (total: number) => `+${total} ще`,
};

const formats = {
  dayFormat: 'dd, dd.MM',
  dayHeaderFormat: 'eeee, dd MMMM',
  agendaDateFormat: 'dd.MM',
  agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, 'HH:mm')} — ${format(end, 'HH:mm')}`,
};

// стилізація подій за пріоритетом
const eventPropGetter: NonNullable<
  React.ComponentProps<typeof DnDCalendar>['eventPropGetter']
> = (event) => {
  const priority = event.resource?.priority ?? 'MEDIUM';

  const bg =
    priority === 'HIGH' ? '#fee2e2' :
    priority === 'LOW'  ? '#e0f2fe' : '#fef9c3';

  const border =
    priority === 'HIGH' ? '#fca5a5' :
    priority === 'LOW'  ? '#93c5fd' : '#fde68a';

  return {
    style: {
      backgroundColor: bg,
      borderLeft: `4px solid ${border}`,
      borderRadius: 8,
      padding: '2px 6px',
      fontSize: 12,
      color: '#111827',
    },
  };
};

export default function CalendarView() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredTasks);

  // завантаження подій для календаря/задач
  useEffect(() => {
    void dispatch(fetchSchedule());
    void dispatch(fetchTasks());
  }, [dispatch]);

  // мапимо задачі у події календаря та кладемо метадані у resource
  const events: CalendarEvent[] = useMemo(
    () =>
      tasks.map((t) => ({
        id: t.id,
        title: t.title, // тепер це може бути спокійно ReactNode/string — пріоритет беремо з resource
        start: new Date(t.plannedDate),
        end: t.dueDate ? new Date(t.dueDate) : new Date(t.plannedDate),
        allDay: true,
        resource: {
          priority: t.priority as Priority,
          status: t.status as Status,
          equipmentId: t.equipmentId,
        },
      })),
    [tasks]
  );

  const handleEventDrop: NonNullable<
    React.ComponentProps<typeof DnDCalendar>['onEventDrop']
  > = async ({ event, start, end }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    await dispatch(
      updateTask({
        id: event.id as string,
        data: {
          plannedDate: startDate.toISOString().slice(0, 10),
          dueDate: endDate.toISOString().slice(0, 10),
        },
      })
    );
  };

  const handleEventResize: NonNullable<
    React.ComponentProps<typeof DnDCalendar>['onEventResize']
  > = async ({ event, start, end }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    await dispatch(
      updateTask({
        id: event.id as string,
        data: {
          plannedDate: startDate.toISOString().slice(0, 10),
          dueDate: endDate.toISOString().slice(0, 10),
        },
      })
    );
  };

  return (
    <div className="calendar-card">
      <DnDCalendar
        localizer={localizer}
        events={events}
        messages={messages}
        formats={formats}
        eventPropGetter={eventPropGetter}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        showMultiDayTimes
        step={30}
        timeslots={2}
        culture="uk-UA"
        popup
        resizable
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        style={{ height: '100%' }}
      />
    </div>
  );
}
