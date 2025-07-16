import React, { FC, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface FieldProps {
  type?: string;
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  placeholder?: string;
}

const InputField: FC<FieldProps> = ({
  name,
  type = 'text',
  onChange,
  value,
  required = false,
  label,
  error,
  className,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col items-start w-full relative">
      {label && <p className="font-normal mb-2">{label}</p>}

      <div className="w-full relative">
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 text-gray-600 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
