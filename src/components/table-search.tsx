import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TableSearchProps {
  search?: string;
  onSearchChange: (value: string) => void;
}

export function TableSearch({ search, onSearchChange }: TableSearchProps) {
  return (
    <div className="flex gap-2">
      <Label className="text-muted-foreground sr-only text-sm" htmlFor="search">
        Search
      </Label>
      <Input
        id="search"
        placeholder="Search"
        autoComplete="off"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
