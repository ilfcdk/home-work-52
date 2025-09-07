import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/services/apiClient';
import { endpoints } from '@/services/endpoints';
import type { Task } from '@/shared/types/task';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  return await apiClient.get<Task[]>(endpoints.tasks);
});

export const createTask = createAsyncThunk(
  'tasks/create',
  async (payload: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await apiClient.post<Task>(endpoints.tasks, payload);
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, data }: { id: string; data: Partial<Task> }) => {
    return await apiClient.patch<Task>(endpoints.taskById(id), data);
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await apiClient.delete<unknown>(endpoints.taskById(id));
  return id;
});
