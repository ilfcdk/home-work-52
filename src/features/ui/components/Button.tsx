// Button component
import { type ButtonHTMLAttributes } from 'react';

export default function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        background: '#f5f5f5',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
