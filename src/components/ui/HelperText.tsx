type HelperTypes = 'warn' | 'error' | 'success' | 'default';

interface IHelperTextProps {
  message?: string;
  type?: HelperTypes;
  isActive?: boolean;
}
const errorMessage = 'campo obrigatório!';

const typeColorMap: Record<HelperTypes, string> = {
  error: 'text-red-500',
  warn: 'text-yellow-500',
  success: 'text-green-500',
  default: 'text-muted-foreground',
};

function HelperText({
  message = errorMessage,
  type = 'error',
  isActive = false,
}: IHelperTextProps) {
  if (!isActive) return;

  return (
    <div className="relative">
      <span className={`absolute left-0 -mt-2 text-sm font-medium ${typeColorMap[type]}`}>
        {message}
      </span>
    </div>
  );
}
export { HelperText };
