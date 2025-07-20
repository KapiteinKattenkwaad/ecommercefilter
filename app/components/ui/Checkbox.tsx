import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const baseClasses = "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500";
  
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className={`${baseClasses} ${className}`}
        {...props}
      />
      <label htmlFor={id} className="text-gray-700 text-sm cursor-pointer">
        {label}
      </label>
    </div>
  );
} 