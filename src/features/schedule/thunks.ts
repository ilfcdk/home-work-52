// thunks for schedule
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/services/apiClient';
import { endpoints } from '@/services/endpoints';
import type { Task } from '@/shared/types/task';

// завантажити задачі для календаря
export const fetchSchedule = createAsyncThunk(
  'schedule/fetch',
  async () => {
    // можна підключити фільтрацію: ?from=...&to=...
    return await apiClient.get<Task[]>(endpoints.tasks);
  }
);
