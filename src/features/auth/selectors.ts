// selectors for auth
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export const selectAuthState = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  selectAuthState,
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (auth) => Boolean(auth.token)
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (auth) => auth.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (auth) => auth.error
);
