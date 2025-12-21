import DropdownItem from "../DropdownItem";
import Input from "../Input";

const FilterSearch = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (e: any) => void;
}) => (
  <DropdownItem
    disable
    className="!cursor-default !pt-3 !border-b-[1px] px-2 py-2 border-white/5 !sticky !top-0 bg-[var(--color-bg-card)]"
    label={
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="!py-2 !px-2"
        placeholder="Search..."
        id="filter"
      />
    }
  />
);

export default FilterSearch