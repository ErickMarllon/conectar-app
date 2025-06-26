import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useMemo } from 'react';

interface Option {
  label: string;
  value: string;
}

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
  readOnly?: boolean;
  options?: Option[];
  defaultValue?: string;
}

export function FormField<T extends FieldValues>({
  label,
  name,
  type,
  placeholder,
  register,
  error,
  readOnly = false,
  options,
  defaultValue,
}: FormFieldProps<T>) {
  const hasOptions = options && Array.isArray(options) && options.length > 0;
  const selectedDefault = useMemo(() => {
    return options?.find((opt) => opt.value === defaultValue);
  }, [options, defaultValue]);

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>

      {hasOptions ? (
        <>
          <Select
            defaultValue={selectedDefault?.value}
            disabled={readOnly}
            onValueChange={(value) => {
              const event = { target: { name, value } };
              register(name).onChange(event as any);
            }}
          >
            <SelectTrigger id={name} className="w-full">
              <SelectValue placeholder={selectedDefault?.label} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value ?? selectedDefault?.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          {...register(name)}
        />
      )}
      {error && <span className="-mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
}
