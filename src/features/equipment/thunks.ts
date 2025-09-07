// thunks for equipment
// features/equipment/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/services/apiClient';
import { endpoints } from '@/services/endpoints';
import type { Equipment } from '@/shared/types/equipment';

// завантаження списку
export const fetchEquipment = createAsyncThunk('equipment/fetchAll', async () => {
  return await apiClient.get<Equipment[]>(endpoints.equipment);
});

// створення нового обладнання
export const createEquipment = createAsyncThunk(
  'equipment/create',
  async (payload: Omit<Equipment, 'id'>) => {
    return await apiClient.post<Equipment>(endpoints.equipment, payload);
  }
);

// редагування
export const updateEquipment = createAsyncThunk(
  'equipment/update',
  async ({ id, data }: { id: string; data: Partial<Equipment> }) => {
    return await apiClient.patch<Equipment>(endpoints.equipmentById(id), data);
  }
);

// видалення
export const deleteEquipment = createAsyncThunk(
  'equipment/delete',
  async (id: string) => {
    await apiClient.delete<unknown>(endpoints.equipmentById(id));
    return id;
  }
);
