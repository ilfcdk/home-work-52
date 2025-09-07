// authSlice
import { createSlice } from '@reduxjs/toolkit';
import { login, logout, checkSession } from './thunks';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })

      // checkSession
      .addCase(checkSession.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
