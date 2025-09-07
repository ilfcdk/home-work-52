// scheduleSlice
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchSchedule } from './thunks';
import type { Task } from '@/shared/types/task';

interface ScheduleState {
  tasks: Task[];
  loading: boolean;
  error?: string;
  view: 'month' | 'week' | 'day'; // режим календаря
  selectedDate: string; // ISO дата
}

const initialState: ScheduleState = {
  tasks: [],
  loading: false,
  view: 'month',
  selectedDate: new Date().toISOString().slice(0, 10),
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setView(state, action: PayloadAction<'month' | 'week' | 'day'>) {
      state.view = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchSchedule.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tasks = payload;
      })
      .addCase(fetchSchedule.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { setView, setSelectedDate } = scheduleSlice.actions;
export default scheduleSlice.reducer;
