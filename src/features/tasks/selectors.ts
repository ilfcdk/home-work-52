// selectors for tasks
// features/tasks/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export const selectTasksState = (s: RootState) => s.tasks;

export const selectFilteredTasks = createSelector(selectTasksState, (state) => {
  const { ids, entities, filters } = state;
  return ids.map((id) => entities[id]).filter((t) => {
    if (filters.status && t.status !== filters.status) return false;
    if (filters.equipmentId && t.equipmentId !== filters.equipmentId) return false;
    if (filters.q && !t.title.toLowerCase().includes(filters.q.toLowerCase())) return false;
    return true;
  });
});
