import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearToast } from './uiSlice';
import Toast from './components/Toast';

export default function UiRoot() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((s) => s.ui.toast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(clearToast()), 3000);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 2000,
      }}
    >
      <Toast type={toast.type} onClose={() => dispatch(clearToast())}>
        {toast.message}
      </Toast>
    </div>
  );
}
