import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  children: ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

