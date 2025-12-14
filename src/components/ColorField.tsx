import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { HexColorPicker } from 'react-colorful';
interface IProps {
  name: string;
  defaultValue?: string;
  label: string;
  id: string;
  containerClassName?: string
}
const ColorField = ({ name, defaultValue, label, id, containerClassName }: IProps) => {
  const { control } = useFormContext();
  return (
    <div className={`${containerClassName}`}>
      <label className='mb-2 block font-bold' htmlFor={id}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <HexColorPicker
            id={id}
            color={defaultValue ?? '#000'}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default ColorField;
