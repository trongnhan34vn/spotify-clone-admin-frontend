import { type ReactNode } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Controller, useFormContext } from 'react-hook-form';
interface IProps {
  name: string;
  defaultValue?: string;
  label?: string | ReactNode;
  id: string;
  containerClassName?: string;
}
const ColorField = ({
  name,
  defaultValue,
  label,
  id,
  containerClassName,
}: IProps) => {
  const { control } = useFormContext();
  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="mb-2 block font-bold" htmlFor={id}>
          {label}
        </label>
      )}
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
