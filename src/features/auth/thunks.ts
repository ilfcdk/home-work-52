import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/services/apiClient';
import { endpoints } from '@/services/endpoints';

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload) => {
    return await apiClient.post<{ token: string; user: { id: string; email: string; name?: string } }>(
      endpoints.login,
      payload
    );
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // тут можна викликати API /auth/logout, якщо є
  return true;
});

export const checkSession = createAsyncThunk('auth/checkSession', async () => {
  // наприклад, оновлення токена/сесії
  return await apiClient.get<{ token: string; user: { id: string; email: string; name?: string } }>(
    '/auth/session'
  );
});
