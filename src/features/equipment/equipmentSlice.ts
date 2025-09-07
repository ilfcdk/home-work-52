import { createSlice } from '@reduxjs/toolkit';
import type { Equipment } from '@/shared/types/equipment';
import {
  fetchEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from './thunks';

interface EquipmentState {
  list: Equipment[];
  loading: boolean;
  error?: string;
}

const initialState: EquipmentState = { list: [], loading: false };

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchEquipment.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchEquipment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      })
      .addCase(fetchEquipment.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })

      // create
      .addCase(createEquipment.fulfilled, (state, { payload }) => {
        state.list.push(payload);
      })

      // update
      .addCase(updateEquipment.fulfilled, (state, { payload }) => {
        state.list = state.list.map((eq) => (eq.id === payload.id ? payload : eq));
      })

      // delete
      .addCase(deleteEquipment.fulfilled, (state, { payload: id }) => {
        state.list = state.list.filter((eq) => eq.id !== id);
      });
  },
});

export default equipmentSlice.reducer;
