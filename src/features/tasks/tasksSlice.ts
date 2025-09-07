import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, deleteTask } from './thunks';
import type { Task } from '@/shared/types/task';
import type { Status } from '@/shared/types/common';

interface TasksState {
  entities: Record<string, Task>;
  ids: string[];
  loading: boolean;
  error?: string;
  filters: { status?: Status; equipmentId?: string; q?: string };
}

const initialState: TasksState = {
  entities: {},
  ids: [],
  loading: false,
  filters: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<TasksState['filters']>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entities = {};
        state.ids = [];
        payload.forEach((t) => {
          state.entities[t.id] = t;
          state.ids.push(t.id);
        });
      })
      .addCase(fetchTasks.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = payload;
        state.ids.unshift(payload.id);
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = payload;
      })
      .addCase(deleteTask.fulfilled, (state, { payload: id }) => {
        delete state.entities[id];
        state.ids = state.ids.filter((x) => x !== id);
      });
  },
});

export const { setFilters, clearFilters } = tasksSlice.actions;
export default tasksSlice.reducer;
