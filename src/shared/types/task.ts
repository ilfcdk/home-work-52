// Типи для планових робіт
// shared/types/task.ts
import type { ID, ISODate, Priority, Status } from './common';


export interface Task {
id: ID;
title: string; // коротка назва роботи
equipmentId: ID; // до якого обладнання
plannedDate: ISODate; // запланована дата
dueDate?: ISODate; // крайній термін (опц.)
status: Status;
priority: Priority;
description?: string;
assignee?: string; // відповідальна особа
createdAt: ISODate;
updatedAt: ISODate;
}