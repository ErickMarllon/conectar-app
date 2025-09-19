import { X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

interface InputWithResetProps extends React.InputHTMLAttributes<HTMLInputElement> {
  resetValue?: () => void;
  showPasswordToggle?: boolean;
}

export function InputWithReset({
  type,
  resetValue,
  showPasswordToggle = false,
  ...props
}: InputWithResetProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle ? (showPassword ? 'text' : type) : type;

  return (
    <div className="relative w-full">
      <Input {...props} type={inputType} className="pr-10" />

      {resetValue && (
        <button
          type="button"
          onClick={resetValue}
          className="text-muted-foreground hover:text-primary absolute top-1/2 right-2 -translate-y-1/2"
        >
          <X size={16} />
        </button>
      )}

      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-muted-foreground absolute top-1/2 right-10 -translate-y-1/2"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}
