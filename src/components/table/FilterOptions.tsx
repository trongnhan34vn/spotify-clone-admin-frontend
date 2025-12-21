import { COLOR_REGEX } from '../../constants/regex.constant';
import CheckboxAllField from '../CheckboxAllField';
import CheckboxField from '../CheckboxField';
import DropdownItem from '../DropdownItem';

const FilterOptions = ({
  field,
  filters,
}: {
  field: string;
  filters?: string[];
}) => {
  if (!filters || filters.length === 0) {
    return <DropdownItem disable className='!p-2 text-white/50' label="No Filter" />;
  }

  const renderOptions = (f: string) => {
    if (f.match(COLOR_REGEX)) {
      return (
        <div className="flex items-center justify-between w-full gap-1">
          <span>{f}</span>
          <div style={{ backgroundColor: f }} className="w-4 h-4 rounded"></div>
        </div>
      );
    }
    return f
  };

  return (
    <>
      <DropdownItem
        disable
        label={<CheckboxAllField name={field} options={filters} />}
      />
      {filters.map(f => (
        <DropdownItem
          key={f}
          disable
          label={
            <CheckboxField name={field} value={f} label={renderOptions(f)} />
          }
        />
      ))}
    </>
  );
};

export default FilterOptions;
