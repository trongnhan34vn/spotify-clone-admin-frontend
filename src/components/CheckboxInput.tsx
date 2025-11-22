import { Checkbox } from '@headlessui/react';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

type IProps = {
  label: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  defaultChecked?: boolean;
  value?: string;
  name?: string;
};
const CheckboxInput = ({
  label,
  checked,
  onChange,
  defaultChecked,
  value,
  name
}: IProps) => {
  const handleToggle = () => {
    if (onChange && typeof checked === 'boolean') {
      onChange(!checked);
    }
  };

  return (
    <div onClick={handleToggle} className="flex items-center w-full gap-2">
      <Checkbox
        defaultChecked={defaultChecked}
        checked={checked}
        value={value}
        name={name}
        onChange={onChange}
        className="group size-4 flex items-center justify-center rounded bg-white/10 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-[var(--color-primary)] data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
      >
        <FaCheck className="hidden size-3 fill-black group-data-checked:block" />
      </Checkbox>
      <p className="mt-[2px] text-sm">{label}</p>
    </div>
  );
};

export default CheckboxInput;
