import React, { FC } from 'react';

interface CheckboxFieldProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  error?: string;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  name,
  label,
  checked,
  onChange,
  className,
  error,
}) => (
  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className={`form-checkbox h-4 w-4 accent-black ${className}`}
    />
    <label htmlFor={name} className="text-gray-700 text-sm">
      {label}
    </label>
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export default CheckboxField;
