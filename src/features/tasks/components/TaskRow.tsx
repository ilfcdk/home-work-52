import { useAppDispatch } from '@/app/hooks';
import { deleteTask, updateTask } from '../thunks';
import { showToast } from '@/features/ui/uiSlice';
import type { Task } from '@/shared/types/task';

export default function TaskRow({ task }: { task: Task }) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!confirm(`Видалити роботу "${task.title}"?`)) return;
    try {
      await dispatch(deleteTask(task.id)).unwrap();
      dispatch(showToast({ type: 'success', message: 'Роботу видалено' }));
    } catch {
      dispatch(showToast({ type: 'error', message: 'Не вдалося видалити роботу' }));
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = task.status === 'DONE' ? 'PLANNED' : 'DONE';
    try {
      await dispatch(updateTask({ id: task.id, data: { status: newStatus } })).unwrap();
      dispatch(showToast({ type: 'success', message: 'Статус оновлено' }));
    } catch {
      dispatch(showToast({ type: 'error', message: 'Не вдалося оновити статус' }));
    }
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.equipmentId}</td>
      <td>{task.plannedDate}</td>
      <td>{task.priority}</td>
      <td>{task.status}</td>
      <td>
        <button onClick={handleToggleStatus}>
          {task.status === 'DONE' ? 'Відновити' : 'Завершити'}
        </button>
        <button onClick={handleDelete} style={{ marginLeft: 8 }}>
          Видалити
        </button>
      </td>
    </tr>
  );
}
