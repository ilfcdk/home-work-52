import { ReactNode } from 'react';

export default function Toast({
  type = 'info',
  children,
  onClose,
}: {
  type?: 'success' | 'error' | 'info';
  children: ReactNode;
  onClose?: () => void;
}) {
  const bg =
    type === 'success' ? '#ecfdf5' :
    type === 'error'   ? '#fef2f2' : '#eff6ff';
  const border =
    type === 'success' ? '#10b981' :
    type === 'error'   ? '#ef4444' : '#3b82f6';

  return (
    <div
      role="status"
      style={{
        background: bg,
        borderLeft: `4px solid ${border}`,
        boxShadow: '0 6px 24px rgba(0,0,0,.08)',
        color: '#111827',
        padding: '10px 12px',
        borderRadius: 12,
        minWidth: 260,
        maxWidth: 380,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 13, color: border.toString() }}>
        {type.toUpperCase()}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.3, flex: 1 }}>{children}</div>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: 18,
          lineHeight: 1,
          cursor: 'pointer',
          color: '#6b7280',
        }}
      >
        ×
      </button>
    </div>
  );
}
