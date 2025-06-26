import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { IPaginatedMeta } from '@/shared/interfaces/IPaginate';

interface PaginationProps {
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  meta?: Omit<IPaginatedMeta, 'limit'>;
  limitOptions?: number[];
}

export function Paginate({
  limit = 5,
  limitOptions = [5, 10, 15, 20],
  meta = {
    currentPage: 1,
    totalPages: 1,
    previousPage: 0,
    nextPage: 0,
  },
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const { currentPage, totalPages, nextPage, previousPage, totalRecords } = meta;
  const getPages = () => {
    const pages: number[] = [];
    const totalToShow = 5;
    const start = Math.max(1, currentPage - Math.floor(totalToShow / 2));
    const end = Math.min(totalPages, start + totalToShow - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="mx-4 my-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm whitespace-nowrap">Items per page:</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-20 px-2">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent side="top">
            {limitOptions.map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (previousPage) onPageChange(previousPage);
                }}
              />
            </PaginationItem>

            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > pages[pages.length - 1] && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (nextPage) onPageChange(nextPage);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
