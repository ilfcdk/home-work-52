// Загальні типи (ID, Paginated, etc.)
// shared/types/common.ts
export type ID = string;
export type ISODate = string; // YYYY-MM-DD or ISO8601


export interface Paginated<T> {
items: T[];
total: number;
page: number;
pageSize: number;
}

export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];


export const Status = {
  PLANNED: 'PLANNED',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  CANCELED: 'CANCELED',
} as const;

export type Status = (typeof Status)[keyof typeof Status];