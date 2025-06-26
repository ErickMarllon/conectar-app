import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { IFields } from '@/views/Auth/interfaces/common';

interface AccessFieldsRendererProps {
  fields: IFields[];
}

export function AccessFieldsRenderer({ fields }: AccessFieldsRendererProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <span className="flex justify-between">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field?.forgotPassword && (
              <p className="hover:text-primary m-0 text-sm underline underline-offset-4">
                <a
                  href={field?.forgotPassword?.href ?? '#'}
                  className="hover:text-primary m-0 text-sm underline underline-offset-4"
                >
                  {field.forgotPassword.label}
                </a>
              </p>
            )}
          </span>
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name)}
          />
          {errors[field.name] && (
            <span className="relative">
              <p className="absolute -mt-1.5 text-sm text-red-500">
                {String(errors[field.name]?.message)}
              </p>
            </span>
          )}
        </div>
      ))}
    </>
  );
}
