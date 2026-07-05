import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({ className, type = 'button', children, ...rest }: IconButtonProps) {
  return (
    <button type={type} className={clsx('flex items-center justify-center transition-colors', className)} {...rest}>
      {children}
    </button>
  );
}