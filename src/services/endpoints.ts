export const endpoints = {
  login: '/auth/login',
  equipment: '/equipment',
  equipmentById: (id: string) => `/equipment/${id}`,
  tasks: '/tasks',
  taskById: (id: string) => `/tasks/${id}`,
};
