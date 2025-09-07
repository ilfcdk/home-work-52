import TaskFilters from '@/features/tasks/components/TaskFilters';
import TaskForm from '@/features/tasks/components/TaskForm';
import TaskList from '@/features/tasks/components/TaskList';

export default function TaskPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Планові роботи</h2>

      <section style={{ marginBottom: '1.5rem' }}>
        <h3>Фільтри</h3>
        <TaskFilters />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Додати нову роботу</h3>
        <TaskForm />
      </section>

      <section>
        <h3>Список робіт</h3>
        <TaskList />
      </section>
    </div>
  );
}
