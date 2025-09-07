// TextField component
import { type InputHTMLAttributes } from 'react';

export default function TextField({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      style={{
        padding: '0.4rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        width: '100%',
      }}
    />
  );
}
