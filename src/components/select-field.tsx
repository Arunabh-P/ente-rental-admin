import React from 'react';

interface SelectOption<T = string> {
  value: T;
  label: string;
}

interface SelectFieldProps<T = string> {
  name: string;
  label?: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption<T>[];
  required?: boolean;
  error?: string;
  className?: string;
}

const SelectField = <T extends string | number = string>({
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  className = '',
}: SelectFieldProps<T>) => (
  <div className="flex flex-col items-start w-full">
    {label&&<p className="font-normal mb-2">{label}</p>}
    <select
      name={name}
      value={String(value)}
      onChange={onChange}
      required={required}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${className}`}
    >
      {options.map(opt => (
        <option key={String(opt.value)} value={String(opt.value)}  className="checked:bg-black checked:text-white">
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-2 text-red-600">{error}</p>}
  </div>
);

export default SelectField;
