import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import type { TableProps } from '../../types/ui/Table.type';
import Pagination from '../Pagination';
import FunctionalBar from './FuntionalBar';
import Table from './Table';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const AppTable = <TData, TValue>({
  data = [],
  columns,
  onRowEdit,
  onRowDelete,
  onRowDetail,
  onInsert,
  onSearch,
  pagination,
  onSelectPage,
  onSelectFilter,
  filterOption,
  onSearchFilter,
  selectedFilter,
  addTitle,
}: TableProps<TData, TValue>) => {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [sQuery, setSQuery] = useState<any>();

  return (
    <div>
      {/* Functional Bar */}
      {onInsert && (
        <FunctionalBar
          onInsert={onInsert}
          onSearch={onSearch}
          addTitle={addTitle}
        />
      )}

      <Table>
        <TableHeader
          headerGroups={table.getHeaderGroups()}
          flexRender={flexRender}
          setSQuery={setSQuery}
          onSearchFilter={onSearchFilter}
          onSelectFilter={onSelectFilter}
          filterOption={filterOption}
          selectedFilter={selectedFilter}
          sQuery={sQuery}
        />
        <TableBody
          rows={table.getRowModel().rows}
          columns={columns}
          flexRender={flexRender}
          onRowDelete={onRowDelete}
          onRowDetail={onRowDetail}
          onRowEdit={onRowEdit}
        />
      </Table>

      {table.getRowModel().rows.length > 0 && pagination && (
        <Pagination
          totalItem={pagination.totalItem}
          page={pagination.page}
          totalPage={pagination.totalPage}
          size={pagination.size}
          hasNext={pagination.hasNext}
          hasPrevious={pagination.hasPrevious}
          onSelectPage={onSelectPage!}
        />
      )}
    </div>
  );
};

export default AppTable;
