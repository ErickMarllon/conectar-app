import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { ISelectorOption } from '@/shared/interfaces/ISelectorOption';

interface SelectWithResetProps {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  options: ISelectorOption[];
  onChange: (value: string) => void;
  onReset: () => void;
  resetValue?: () => void;
}

export function SelectWithReset({
  id,
  value,
  placeholder,
  disabled,
  options,
  onChange,
  onReset,
}: SelectWithResetProps) {
  return (
    <div className="relative w-full">
      <Select value={value} disabled={disabled} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {onReset && value && (
        <button
          type="button"
          onClick={onReset}
          className="text-muted-foreground hover:text-primary absolute top-1/2 right-8 -translate-y-1/2"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
