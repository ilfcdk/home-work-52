// Типи для обладнання
// shared/types/equipment.ts
import type { ID, ISODate } from './common';


export interface Equipment {
id: ID;
code: string; // інвентарний/заводський номер
name: string; // назва
location?: string; // цех/ділянка
model?: string;
vendor?: string;
commissionedAt?: ISODate; // дата введення в експлуатацію
isActive: boolean;
}