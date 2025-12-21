import type { HeaderGroup } from '@tanstack/react-table';
import FilterHeader from './FilterHeader';

interface IProps<TData> {
  headerGroups: HeaderGroup<TData>[];
  flexRender: any;
  setSQuery?: any;
  sQuery?: any;
  onSearchFilter?: any;
  filterOption?: any;
  selectedFilter?: any;
  onSelectFilter?: any;
}
const TableHeader = <TData,>({
  headerGroups,
  flexRender,
  setSQuery,
  onSearchFilter,
  onSelectFilter,
  filterOption,
  selectedFilter,
  sQuery,
}: IProps<TData>) => {
  return (
    <thead>
      {headerGroups.map(headerGroup => (
        <tr
          key={headerGroup.id}
          className="border-b-[1px] border-[var(--color-border)] font-bold text-sm"
        >
          {headerGroup.headers.map(header => (
            <td
              width={
                header.id.toLowerCase() === 'id' ||
                header.id.toLowerCase() === 'actions'
                  ? '13%'
                  : '25%'
              }
              className="p-2"
              key={header.id}
            >
              {header.id.toLowerCase() !== 'actions' ? (
                <FilterHeader
                  setSQuery={setSQuery}
                  header={flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  onSearchFilter={onSearchFilter}
                  onSelectFilter={onSelectFilter}
                  filterOption={filterOption}
                  selectedFilter={selectedFilter}
                  sQuery={sQuery}
                  field={header.column.id}
                />
              ) : (
                flexRender(header.column.columnDef.header, header.getContext())
              )}
            </td>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
