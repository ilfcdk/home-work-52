// Select component
import type { SelectHTMLAttributes, ReactNode } from 'react';

export default function Select({
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      {...rest}
      style={{
        padding: '0.4rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
      }}
    >
      {children}
    </select>
  );
}
