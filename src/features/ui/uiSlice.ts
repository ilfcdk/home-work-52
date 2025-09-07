import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  modal: { name?: string; props?: Record<string, unknown> } | null;
  busy: boolean;
  toast?: { type: 'success' | 'error' | 'info'; message: string };
}

const initialState: UIState = { modal: null, busy: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state, { payload }: PayloadAction<UIState['modal']>) {
      state.modal = payload;
    },
    closeModal(state) {
      state.modal = null;
    },
    setBusy(state, { payload }: PayloadAction<boolean>) {
      state.busy = payload;
    },
    showToast(state, { payload }: PayloadAction<NonNullable<UIState['toast']>>) {
      state.toast = payload;
    },
    clearToast(state) {
      state.toast = undefined;
    },
  },
});

export const { openModal, closeModal, setBusy, showToast, clearToast } =
  uiSlice.actions;

export default uiSlice.reducer;
