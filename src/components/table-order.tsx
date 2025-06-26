import { Order } from '@/shared/constants/enums';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TableOrderProps {
  order: Order;
  onOrderChange: (order: Order) => void;
}

export function TableOrder({ order, onOrderChange }: TableOrderProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground sr-only text-sm whitespace-nowrap">order by:</span>
      <Select value={order} onValueChange={(value) => onOrderChange(value as Order)}>
        <SelectTrigger className="w-20 px-2">
          <SelectValue placeholder="order" />
        </SelectTrigger>
        <SelectContent side="bottom">
          {Object.values(Order).map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
