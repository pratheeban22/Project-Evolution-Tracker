import React from 'react';
import './Button.css';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // primary, ghost, danger, outline
  size = 'md', // sm, md, lg
  isLoading = false,
  className = '',
  icon: Icon,
  fullWidth = false,
  ...props
}) => {
  const baseClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`;

  return (
    <button className={baseClass} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 16 : 20} />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 16 : 20} className="btn-icon" />
      ) : null}
      <span className="btn-text">{children}</span>
    </button>
  );
};
