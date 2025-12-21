import { Checkbox } from '@headlessui/react';
import { type ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';

type IProps = {
  label: string | ReactNode;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  defaultChecked?: boolean;
  value?: string;
  name?: string;
  checkboxClassName?: string;
  className?: string;
};
const CheckboxInput = ({
  label,
  checked,
  onChange,
  defaultChecked,
  value,
  name,
  className,
  checkboxClassName,
}: IProps) => {
  const handleToggle = () => {
    if (onChange && typeof checked === 'boolean') {
      onChange(!checked);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`${className} flex items-center w-full gap-2 hover:bg-white/4 py-2 px-3 transition-all duration-150 ease-in`}
    >
      <Checkbox
        defaultChecked={defaultChecked}
        checked={checked}
        value={value}
        name={name}
        onChange={onChange}
        className={`${checkboxClassName} group size-4 flex items-center justify-center rounded bg-white/10 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-[var(--color-primary)] data-focus:outline data-focus:outline-offset-2 data-focus:outline-white`}
      >
        <FaCheck className="hidden size-3 fill-black group-data-checked:block" />
      </Checkbox>
      <div className="mt-[2px] w-full flex-1 text-sm">{label}</div>
    </div>
  );
};

export default CheckboxInput;
