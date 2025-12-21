import type { ReactNode } from 'react';
import Dropdown from '../Dropdown';
import FilterHeaderButton from './FilterHeaderButton';
import FilterSearch from './FilterSearch';
import Form from '../Form';
import FilterOptions from './FilterOptions';
import FilterFooter from './FilterFooter';
import DropdownItem from '../DropdownItem';

interface IProps {
  setSQuery?: any;
  sQuery?: any;
  onSearchFilter?: any;
  filterOption?: any;
  selectedFilter?: any;
  field: string;
  header: ReactNode;
  onSelectFilter?: any;
}
const FilterHeader = ({
  setSQuery,
  onSearchFilter,
  filterOption,
  selectedFilter,
  field,
  header,
  sQuery,
  onSelectFilter,
}: IProps) => {
  const filters = filterOption?.[field];
  const selected = selectedFilter?.[field];

  const handleSearchChange = (val: string) => {
    setSQuery((prev: any) => ({ ...prev, [field]: val }) as any);
    const query: Record<string, string> = {};
    query[field] = val;
    onSearchFilter?.(query);
  };

  return (
    <Dropdown
      anchor="bottom start"
      itemsClassName="!max-h-74"
      button={
        <FilterHeaderButton
          header={header}
          field={field}
          filterOption={filterOption}
          selectedFilter={selectedFilter}
        />
      }
    >
      <FilterSearch
        value={sQuery?.[field] ?? ''}
        onChange={handleSearchChange}
      />

      {/* <DivideBar /> */}

      {filterOption ? (
        <Form
          onSubmit={data => onSelectFilter?.(field, data)}
          defaultValues={{ [field]: selected }}
        >
          <FilterOptions field={field} filters={filters} />
          {/* <DivideBar /> */}
          <FilterFooter disabled={!filters?.length} />
        </Form>
      ) : (
        <DropdownItem className='!p-2 text-white/5' label="No Filter" />
      )}
    </Dropdown>
  );
};

export default FilterHeader;
