import { useEffect, useState } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Label } from '../ui/label';
import { SelectWithReset } from './select-with-reset';
import type { ISelectorOption } from '@/shared/interfaces/ISelectorOption';
import { InputWithReset } from './input-with-reset';
import { getAutoComplete } from '@/utils/getAutoComplete';

export type InputVariantProps = React.ComponentProps<'input'>;
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & InputVariantProps;

interface FormFieldProps<T extends FieldValues> extends InputProps {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  forgotPassword?: boolean;
  options?: ISelectorOption[];
  defaultValue?: string;
  resetValue?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  placeholder?: string;
  type?: string;
}

export function FormField<T extends FieldValues>({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  disabled = false,
  readOnly = false,
  forgotPassword = false,
  error,
  options,
  defaultValue,
  resetValue,
}: FormFieldProps<T>) {
  const hasOptions = Array.isArray(options) && options.length > 0;

  const [fieldValue, setFieldValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    setFieldValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (value: string) => {
    setFieldValue(value);
    const event = { target: { name, value } };
    register(name).onChange(event as any);
  };

  const handleReset = () => {
    setFieldValue(undefined);
    resetValue?.();
  };

  return (
    <div className="relative flex flex-col gap-1">
      <span className="flex justify-between">
        <Label htmlFor={name}>{label}</Label>
        {forgotPassword && (
          <p className="hover:text-primary m-0 text-sm">
            <a
              href={'/#'}
              className="hover:text-primary m-0 text-sm hover:underline hover:underline-offset-4"
            >
              Forgot Password
            </a>
          </p>
        )}
      </span>

      {hasOptions ? (
        <SelectWithReset
          id={name}
          value={fieldValue ?? ''}
          placeholder={placeholder}
          disabled={disabled}
          options={options}
          onChange={handleChange}
          onReset={handleReset}
        />
      ) : (
        <InputWithReset
          id={name}
          name={name}
          type={type}
          value={fieldValue ?? ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={getAutoComplete(type, name)}
          resetValue={resetValue}
          showPasswordToggle={type === 'password'}
        />
      )}

      {error && (
        <span className="absolute -bottom-5 text-start text-sm text-red-500" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
