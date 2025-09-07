// React Router v6 routes
// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import EquipmentPage from '@/pages/EquipmentPage';
import TaskPage from '@/pages/TaskPage';
import SchedulePage from '@/pages/SchedulePage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'equipment', element: <EquipmentPage /> },
      { path: 'tasks', element: <TaskPage /> },
      { path: 'schedule', element: <SchedulePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
