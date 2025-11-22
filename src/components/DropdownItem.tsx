import { MenuItem } from '@headlessui/react';
import React, { type ReactNode } from 'react';

type IProps = {
  label: string | ReactNode;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
};
const DropdownItem = ({ label, onClick, className, disable }: IProps) => {
  return (
    <MenuItem disabled={disable}>
      <div
        onClick={onClick}
        className={`${className} py-2 hover:bg-[var(--color-card-hover)] transition-all duration-150 ease-in cursor-pointer group flex w-full items-center gap-2 rounded px-3`}
      >
        {/* <PencilIcon className="size-4 fill-white/30" /> */}
        {label}
      </div>
    </MenuItem>
  );
};

export default DropdownItem;
