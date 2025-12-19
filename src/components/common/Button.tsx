import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5';
  
  const variants = {
    primary: 'text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300',
    danger: 'text-white shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const gradientStyles = {
    primary: {
      background: 'linear-gradient(to right, #0ea5e9, #0284c7)',
      backgroundHover: 'linear-gradient(to right, #0284c7, #0369a1)',
    },
    danger: {
      background: 'linear-gradient(to right, #ef4444, #dc2626)',
      backgroundHover: 'linear-gradient(to right, #dc2626, #b91c1c)',
    }
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      style={
        variant === 'primary' 
          ? { background: gradientStyles.primary.background }
          : variant === 'danger'
          ? { background: gradientStyles.danger.background }
          : undefined
      }
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.background = gradientStyles.primary.backgroundHover;
        } else if (variant === 'danger') {
          e.currentTarget.style.background = gradientStyles.danger.backgroundHover;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.background = gradientStyles.primary.background;
        } else if (variant === 'danger') {
          e.currentTarget.style.background = gradientStyles.danger.background;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};