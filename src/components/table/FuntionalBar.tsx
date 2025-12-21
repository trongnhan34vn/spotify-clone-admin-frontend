import { FiPlus } from 'react-icons/fi';
import { MdOutlineSearch } from 'react-icons/md';
import Button from '../Button';
import Input from '../Input';

interface IProps {
  onSearch?: () => void;
  onInsert?: () => void;
  addTitle?: string;
}
const FunctionalBar = ({ onSearch, onInsert, addTitle }: IProps) => {
  return (
    <div className="float-right flex items-center gap-4 mb-3">
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
        label={
          <div className="flex items-center gap-2">
            <FiPlus size={20} />
            <p>Create {addTitle ?? ''}</p>
          </div>
        }
      />
    </div>
  );
};

export default FunctionalBar;
