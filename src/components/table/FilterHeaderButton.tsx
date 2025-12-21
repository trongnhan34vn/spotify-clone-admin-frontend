import type { ReactNode } from 'react';
import { BsFilterSquare, BsFilterSquareFill } from 'react-icons/bs';

const FilterHeaderButton = ({
  header,
  field,
  selectedFilter,
  filterOption
}: {
  header: ReactNode;
  field: string;
  selectedFilter: any
  filterOption: any
}) => {
  const identifyFieldsOnFilter = (field: string) => {
    if (!selectedFilter || !filterOption) return false;
    if (filterOption.length == 0) return false;
    const selects = selectedFilter[field];
    const refs = filterOption[field];
    if (selects?.length < refs?.length) return true;
    return false;
  };
  return (
    <div className="flex items-center cursor-pointer gap-2">
      {identifyFieldsOnFilter(field) ? (
        <BsFilterSquareFill size={18} />
      ) : (
        <BsFilterSquare size={18} />
      )}
      <div>{header}</div>
    </div>
  );
};
export default FilterHeaderButton;
