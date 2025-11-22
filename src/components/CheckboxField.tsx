import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CheckboxInput from './CheckboxInput';

type IProps = {
  name: string;
  value?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  label: string;
};
const CheckboxField = ({
  name,
  value,
  defaultChecked,
  checked,
  label,
}: IProps) => {
  const { control, setValue, watch } = useFormContext();
  const values: string[] = watch(name) || [];

  const isChecked = values.includes(value!);
  const handleToggle = () => {
    if (isChecked) {
      setValue(
        name,
        values.filter(v => v !== value)
      );
    } else {
      setValue(name, [...values, value]);
    }
  };
  return (

      <Controller
        control={control}
        name={name}
        render={() => (
          <CheckboxInput
            onChange={handleToggle}
            value={value}
            defaultChecked={defaultChecked}
            checked={isChecked}
            label={label}
            name={name}
          />
        )}
      />

  );
};

export default CheckboxField;
