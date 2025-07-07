import React, { FC } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  className?: string;
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  className,
}) => (
  <div className="flex flex-col items-start w-full">
    <p className="font-normal mb-2">{label}</p>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <p className="mt-2 text-red-600">{error}</p>
  </div>
);

export default SelectField;
