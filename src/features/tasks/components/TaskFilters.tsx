// TaskFilters component
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setFilters, clearFilters } from '../tasksSlice';
import { Status } from '@/shared/types/common';

export default function TaskFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.tasks.filters);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ ...filters, status: e.target.value as Status }));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Статус:
        <select value={filters.status ?? ''} onChange={handleChange}>
          <option value="">Всі</option>
          {Object.values(Status).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>
      <button onClick={() => dispatch(clearFilters())} style={{ marginLeft: '1rem' }}>
        Скинути
      </button>
    </div>
  );
}
