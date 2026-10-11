import React, { useState } from 'react';
import './Input.css';
import { Eye, EyeOff } from 'lucide-react';

export const Input = React.forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  fullWidth = true,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  const containerClass = `input-container ${fullWidth ? 'full-width' : ''} ${error ? 'has-error' : ''} ${isFocused ? 'is-focused' : ''} ${className}`;

  return (
    <div className={containerClass}>
      {label && <label className="input-label">{label}</label>}
      
      <div className="input-wrapper">
        <input
          ref={ref}
          type={inputType}
          className="custom-input"
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
