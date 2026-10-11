import React from 'react';
import './Card.css';

export const Card = ({ children, className = '', hoverable = false, ...props }) => {
  return (
    <div 
      className={`glass-card ${hoverable ? 'hoverable-card' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
