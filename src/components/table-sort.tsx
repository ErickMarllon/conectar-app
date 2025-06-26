import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortBy } from '@/shared/constants/enums';

interface TableSortProps {
  sortBy: SortBy;
  onSortChange: (value: SortBy) => void;
}

const SortByLabels: Record<SortBy, string> = {
  [SortBy.CREATED_AT]: 'Criado em',
  [SortBy.FIRST_NAME]: 'Primeiro nome',
  [SortBy.LAST_NAME]: 'Último nome',
  [SortBy.EMAIL]: 'Email',
  [SortBy.UPDATED_AT]: 'Atualizado em',
  [SortBy.LAST_LOGIN_AT]: 'Último login',
  [SortBy.ROLE]: 'Papel',
};

export function TableSort({ sortBy, onSortChange }: TableSortProps) {
  return (
    <div className="flex items-center gap-2">
      <Label className="text-muted-foreground sr-only text-sm whitespace-nowrap" htmlFor="sortBy">
        Sort By
      </Label>
      <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortBy)}>
        <SelectTrigger id="sortBy" className="w-32 px-2">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent side="bottom">
          {Object.values(SortBy).map((value) => (
            <SelectItem key={value} value={value}>
              {SortByLabels[value]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
