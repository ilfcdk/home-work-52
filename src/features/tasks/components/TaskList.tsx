import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchTasks } from '../thunks';
import { selectFilteredTasks } from '../selectors';
import TaskRow from './TaskRow';

export default function TaskList() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredTasks);
  const loading = useAppSelector((s) => s.tasks.loading);

  useEffect(() => {
    void dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p>Завантаження...</p>;
  if (!tasks.length) return <p>Задач ще немає.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Назва</th>
          <th>Обладнання</th>
          <th>Дата</th>
          <th>Пріоритет</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t) => (
          <TaskRow key={t.id} task={t} />
        ))}
      </tbody>
    </table>
  );
}
