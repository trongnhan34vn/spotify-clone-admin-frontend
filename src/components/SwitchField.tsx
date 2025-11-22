import { Switch } from '@headlessui/react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IProps = {
  enabled: boolean;
  onToggle?: (val: boolean) => void;
  hiddenLabel?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  name: string;
  label?: string;
  className?: string;
};
const SwitchField = ({
  enabled,
  onToggle,
  hidden,
  hiddenLabel,
  disabled,
  name,
  label,
  className,
}: IProps) => {
  const { control } = useFormContext();
  return (
    <div className={`mb-4 ${hidden && 'hidden'} w-full`}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            {!hiddenLabel && (
              <label
                className="font-semibold block text-sm mb-2"
                htmlFor={name}
              >
                {label}:{' '}
                <p
                  className={`${value ? 'text-green-400' : 'text-red-500'} inline-block`}
                >
                  {value ? 'Active' : 'Inactive'}
                </p>
              </label>
            )}
            <Switch
              checked={value}
              disabled={disabled}
              onChange={(val) => {
                onChange(val);
                onToggle?.(val)
              }}
              className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-[var(--color-primary)] data-focus:outline data-focus:outline-white"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
              />
            </Switch>
            <span className="text-red-500 text-xs block mt-1">
              {error?.message}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default SwitchField;
