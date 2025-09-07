// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import equipmentReducer from '@/features/equipment/equipmentSlice';
import tasksReducer from '@/features/tasks/tasksSlice';
import scheduleReducer from '@/features/schedule/scheduleSlice';
import uiReducer from '@/features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    equipment: equipmentReducer,
    tasks: tasksReducer,
    schedule: scheduleReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
