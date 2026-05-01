import type { AriaRole, MouseEventHandler, ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Título visible en la parte superior de la tarjeta */
  title?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  role?: AriaRole;
  tabIndex?: number;
}

export const Card = ({ children, className = '', title, onClick, role, tabIndex }: CardProps) => {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      role={role ?? (onClick ? 'button' : undefined)}
      tabIndex={tabIndex ?? (onClick ? 0 : undefined)}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.currentTarget.click();
              }
            }
          : undefined
      }
    >
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};

