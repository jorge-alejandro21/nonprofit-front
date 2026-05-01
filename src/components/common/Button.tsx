import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const sizeClass = size === 'medium' ? '' : `btn-${size}`;
  return (
    <button className={['btn', `btn-${variant}`, sizeClass, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </button>
  );
};

