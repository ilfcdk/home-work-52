// selectors for equipment
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

// базовий селектор стану модуля
export const selectEquipmentState = (state: RootState) => state.equipment;

// список обладнання
export const selectEquipmentList = createSelector(
  selectEquipmentState,
  (equipmentState) => equipmentState.list
);

// стан завантаження
export const selectEquipmentLoading = createSelector(
  selectEquipmentState,
  (equipmentState) => equipmentState.loading
);

// помилка
export const selectEquipmentError = createSelector(
  selectEquipmentState,
  (equipmentState) => equipmentState.error
);

// вибір конкретного обладнання за id
export const selectEquipmentById = (id: string) =>
  createSelector(selectEquipmentList, (list) =>
    list.find((eq) => eq.id === id)
  );

// приклад: отримати тільки активне обладнання
export const selectActiveEquipment = createSelector(
  selectEquipmentList,
  (list) => list.filter((eq) => eq.isActive)
);
