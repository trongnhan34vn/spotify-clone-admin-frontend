import type { ColumnDef } from '@tanstack/react-table';
import type { Pagination } from '../entities/pagination.type';
export type TableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: Pagination<TData>;
  onRowEdit?: (data: TData) => void;
  onRowDetail?: (id: string) => void;
  onRowDelete?: (data: TData) => void;
  onInsert?: () => void;
  onSearch?: () => void;
  onSelectPage?: (p: number) => void;
  onSelectFilter?: (field: string, data: any) => void;
  filterOption?: any
  onSearchFilter?: (query: Record<string, string>) => void;
  selectedFilter?: any 
  createBtnTitle?: string
};
