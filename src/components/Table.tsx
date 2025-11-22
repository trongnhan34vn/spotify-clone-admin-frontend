import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, type ReactNode } from 'react';
import { BsFilterSquare, BsFilterSquareFill } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineSearch } from 'react-icons/md';
import type { TableProps } from '../types/ui/Table.type';
import ActionButtons from './ActionButtons';
import Button from './Button';
import CheckboxAllField from './CheckboxAllField';
import CheckboxField from './CheckboxField';
import DivideBar from './DivideBar';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import Form from './Form';
import Input from './Input';
import Pagination from './Pagination';

const Table = <TData, TValue>({
  data,
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
}: TableProps<TData, TValue>) => {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const addBtnComp = (
    <div className="flex items-center gap-2">
      <FiPlus size={20} />
      <p>Add Admin</p>
    </div>
  );
  const identifyFieldsOnFilter = (field: string) => {
    if (!selectedFilter || !filterOption) return false;
    const selects = selectedFilter[field];
    const refs = filterOption[field];
    if (selects.length < refs.length) return true;
    return false;
  };

  const [sQuery, setSQuery] = useState<any>();

  const headerTable = (header: ReactNode, field: string) => {
    if (!filterOption)
      return (
        <Dropdown
          anchor="bottom start"
          button={
            <div className="flex items-center cursor-pointer gap-2">
              {identifyFieldsOnFilter(field) ? (
                <BsFilterSquareFill size={16} />
              ) : (
                <BsFilterSquare size={16} />
              )}
              <div>{header}</div>
            </div>
          }
        >
          <DropdownItem
            disable
            className="!cursor-default hover:!bg-transparent "
            label={
              <div>
                <Input
                  className="!py-2 !px-2"
                  id="filter"
                  placeholder="Search..."
                />
              </div>
            }
          />
          <DivideBar />
          <DropdownItem label={'No Filter'} />
        </Dropdown>
      );
    const filters = filterOption?.[field];

    const sFilter = selectedFilter?.[field];
    return (
      <Dropdown
        anchor="bottom start"
        onChange={s => {

        }}
        button={
          <div className="flex items-center cursor-pointer gap-2">
            {identifyFieldsOnFilter(field) ? (
              <BsFilterSquareFill size={18} />
            ) : (
              <BsFilterSquare size={18} />
            )}
            <div>{header}</div>
          </div>
        }
      >
        <DropdownItem
          disable
          className="!cursor-default hover:!bg-transparent "
          label={
            <Input
              value={sQuery?.[field]}
              onChange={(val: string) => {
                setSQuery((prev: any) => ({
                  ...prev,
                  [field]: val
                } as any));
                const query: Record<string, string> = {};
                query[field] = val;
                onSearchFilter?.(query);
              }}
              className="!py-2 !px-2"
              placeholder="Search..."
              id="filter"
            />
          }
        />
        <DivideBar />
        <Form
          onSubmit={data => onSelectFilter?.(field, data)}
          defaultValues={{ [field]: sFilter }}
        >
          <DropdownItem
            disable
            label={<CheckboxAllField name={field} options={filters} />}
          />
          {filterOption &&
            (filters ? (
              filters.map((f: string) => (
                <DropdownItem
                  key={f}
                  disable
                  label={
                    <CheckboxField
                      name={field}
                      value={f}
                      label={
                        (f as any) == 'true'
                          ? 'Active'
                          : (f as any) == 'false'
                            ? 'Inactive'
                            : f
                      }
                    />
                  }
                />
              ))
            ) : (
              <DropdownItem label={'No Filter'} />
            ))}
          <DivideBar />
          <DropdownItem
            className="!py-0 !cursor-default hover:!bg-transparent "
            label={
              <div className="w-full flex mt-1 mb-1 gap-2">
                <Button
                  disabled={filters.length == 0}
                  type="submit"
                  className="!p-0 hover:!scale-100 !rounded"
                  label="Apply"
                />
                <Button
                  className="!p-2 hover:!scale-100 !bg-transparent !text-white"
                  label="Cancel"
                />
              </div>
            }
          />
        </Form>
      </Dropdown>
    );
  };

  return (
    <div>
      {/* Functional Bar */}
      <div className="float-right flex items-center gap-4 mb-5">
        {/* Search Feature */}
        <div className="flex items-center border-[1px] hover:border-[#fff] transition-all focus-within:border-[#fff] group duration-200 ease-in rounded-[500px] px-3 border-[var(--color-border)]">
          <MdOutlineSearch
            size={36}
            className="group-hover:!text-[#fff] text-[var(--color-border)] group-focus-within:text-white transition-all group duration-200 ease-in"
          />
          <Input
            onChange={onSearch}
            className="!border-none"
            placeholder="Search..."
            id="search"
          />
        </div>
        {/* Add Feature */}
        <Button
          onClick={onInsert}
          className="!px-4 flex-1 w-fit"
          type="button"
          label={addBtnComp}
        />
      </div>

      <table border={1} className="w-full table table-fixed">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
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
                  {header.id.toLowerCase() !== 'actions'
                    ? headerTable(
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ),
                        header.column.id
                      )
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-sm">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-[var(--color-border)]"
              >
                No data found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
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
                      <td key={cell.id} className='text-center'>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {table.getRowModel().rows.length !== 0 && pagination && (
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

export default Table;
