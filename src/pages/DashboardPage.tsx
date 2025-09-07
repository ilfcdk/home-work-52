// DashboardPage
import { useAppSelector } from '@/app/hooks';
import { selectTasksState } from '@/features/tasks/selectors';
import { selectEquipmentList } from '@/features/equipment/selectors';

export default function DashboardPage() {
  const tasksState = useAppSelector(selectTasksState);
  const equipment = useAppSelector(selectEquipmentList);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Дашборд</h2>
      <ul>
        <li>Всього задач: {tasksState.ids.length}</li>
        <li>Активне обладнання: {equipment.filter((eq) => eq.isActive).length}</li>
        <li>Задач у статусі «PLANNED»: {tasksState.ids.map((id) => tasksState.entities[id]).filter((t) => t.status === 'PLANNED').length}</li>
      </ul>
    </div>
  );
}
