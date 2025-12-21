import Button from "../Button";
import DropdownItem from "../DropdownItem";

const FilterFooter = ({ disabled }: { disabled?: boolean }) => (
  <DropdownItem
    className="!py-0 border-t-[1px] border-white/5 !px-1 !cursor-default !sticky !bottom-0 bg-[var(--color-bg-card)]"
    label={
      <div className="w-full flex mt-1 mb-1 p-1 gap-2">
        <Button
          disabled={disabled}
          type="submit"
          className="!p-0 hover:!scale-100 !rounded"
          label="Apply"
        />
        <Button
          className="!p-2 hover:!scale-100 !text-white !bg-transparent"
          label="Cancel"
        />
      </div>
    }
  />
);

export default FilterFooter;