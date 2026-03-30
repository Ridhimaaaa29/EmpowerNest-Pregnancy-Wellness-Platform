import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'md', className, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = variant === 'outline' ? 'bg-transparent text-primary border-primary' : 'bg-primary text-white';
  const sizeStyles = size === 'sm' ? 'px-2.5 py-1.5 text-xs' : size === 'lg' ? 'px-4 py-2 text-lg' : 'px-3 py-2 text-sm';

  return (
    <button
      {...props}
      className={cn(baseStyles, variantStyles, sizeStyles, className)}
    />
  );
};