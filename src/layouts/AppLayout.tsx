import { Outlet, NavLink } from 'react-router-dom';
import UiRoot from '@/features/ui/UiRoot';

export default function AppLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          background: '#282c34',
          padding: '1rem',
          color: '#fff',
        }}
      >
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? '#61dafb' : '#fff',
              textDecoration: 'none',
            })}
          >
            Дашборд
          </NavLink>
          <NavLink
            to="/equipment"
            style={({ isActive }) => ({
              color: isActive ? '#61dafb' : '#fff',
              textDecoration: 'none',
            })}
          >
            Обладнання
          </NavLink>
          <NavLink
            to="/tasks"
            style={({ isActive }) => ({
              color: isActive ? '#61dafb' : '#fff',
              textDecoration: 'none',
            })}
          >
            Роботи
          </NavLink>
          <NavLink
            to="/schedule"
            style={({ isActive }) => ({
              color: isActive ? '#61dafb' : '#fff',
              textDecoration: 'none',
            })}
          >
            Календар
          </NavLink>
        </nav>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          background: '#f5f5f5',
          padding: '1rem',
          textAlign: 'center',
          borderTop: '1px solid #ddd',
        }}
      >
        © {new Date().getFullYear()} Maintenance Planner
      </footer>

      {/* Global UI (toasts, etc.) */}
      <UiRoot />
    </div>
  );
}
