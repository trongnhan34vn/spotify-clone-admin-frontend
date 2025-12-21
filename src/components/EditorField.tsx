import React, { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TiptapEditor from './TiptapEditor';
import { capitalizeFirst } from '../types/utils/string.format';

interface IProps {
  name: string;
  label: string | ReactNode;
  id: string;
  containerClassName?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}
const EditorField = ({
  name,
  label,
  id,
  containerClassName,
  className,
  disabled,
  required,
}: IProps) => {
  const { control } = useFormContext();
  return (
    <div className={`${containerClassName} mb-4`}>
      {label && <label className="mb-2 block font-bold">{label}</label>}
      <Controller
        control={control}
        name={name}
        rules={{
          ...(required
            ? { required: `${capitalizeFirst(name)} is required` }
            : {}),
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <>
              <TiptapEditor
                disabled={disabled}
                className={error ? '!border-red-500' : ''}
                id={id}
                value={value}
                onChange={onChange}
              />
              <span className="text-xs text-red-500 mt-1 block">
                {error?.message}
              </span>
            </>
          );
        }}
      />
    </div>
  );
};

export default EditorField;
