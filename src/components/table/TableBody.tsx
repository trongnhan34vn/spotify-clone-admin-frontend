import type { ColumnDef, Row } from '@tanstack/react-table';
import ActionButtons from '../ActionButtons';

interface IProps<TData, TValue> {
  rows: Row<TData>[];
  columns: ColumnDef<TData, TValue>[];
  flexRender: any;
  onRowEdit?: (data: TData) => void;
  onRowDetail?: (id: string) => void;
  onRowDelete?: (data: TData) => void;
}
const TableBody = <TData, TValue>({
  rows,
  columns,
  flexRender,
  onRowDelete,
  onRowDetail,
  onRowEdit,
}: IProps<TData, TValue>) => {
  return (
    <tbody className="text-sm">
      {rows.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="text-center py-4 text-[var(--color-border)]"
          >
            No data found.
          </td>
        </tr>
      ) : (
        rows.map(row => (
          <tr
            key={row.id}
            className="cursor-pointer transition-all duration-200 ease-in hover:bg-[var(--color-secondary-background-hover)]"
          >
            {row.getVisibleCells().map(cell => {
              if (
                cell.column.columnDef.header?.toString().toLowerCase() ===
                'actions'
              ) {
                return (
                  <td key={cell.id} className="text-center">
                    <ActionButtons
                      data={row.original as any}
                      onDelete={onRowDelete}
                      onDetail={onRowDetail}
                      onEdit={onRowEdit}
                    />
                  </td>
                );
              }
              return (
                <td
                  onClick={() =>
                    onRowDetail?.((row.original as any).id as string)
                  }
                  key={cell.id}
                  className="p-4"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext()) ??
                    ''}
                </td>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableBody;
