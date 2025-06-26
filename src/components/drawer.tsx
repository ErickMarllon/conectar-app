import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreHorizontal, MoreVertical } from 'lucide-react';

interface Action {
  title: string;
  onAction: () => void;
}

interface DrawerProps {
  actions: Action[];
  morePosition?: 'vertical' | 'horizontal';
}
export function Drawer({ actions, morePosition = 'vertical' }: DrawerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
          {morePosition === 'vertical' ? (
            <MoreVertical className="h-4 w-4" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <DropdownMenuItem key={index} onClick={action.onAction} className="cursor-pointer">
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
