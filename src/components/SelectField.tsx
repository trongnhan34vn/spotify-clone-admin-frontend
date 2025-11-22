import type { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { type MultiValue } from 'react-select';
import { capitalizeFirst } from '../types/utils/string.format';
type IProps = {
  options: any[];
  label: string | ReactNode;
  name: string;
  id: string;
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  selectClassName?: string;
};
const SelectField = ({
  id,
  options,
  label,
  name,
  selectClassName,
  required,
  disabled,
  multiple,
  placeholder,
}: IProps) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4 w-full">
      <label
        className="font-semibold capitalize block text-sm mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{
          ...(required
            ? { required: `${capitalizeFirst(name)} is required.` }
            : false),
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          
          return (
            <div className={`${selectClassName} w-full`}>
              <Select
                value={options.filter(option => value?.includes(option.value))}
                isDisabled={disabled}
                className={`${disabled ? 'cursor-not-allowed' : ''}`}
                placeholder={placeholder ?? 'Select...'}
                inputId={id}
                options={options}
                onChange={options => onChange(options.map((o: any) => o.value))}
                isMulti={multiple}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: 'transparent', // 💡 nền trong suốt
                    borderColor: error
                      ? 'red' // 🔴 viền đỏ khi có lỗi
                      : state.isFocused
                        ? 'white'
                        : 'var(--color-border)',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: 'white',
                    },
                    transition: 'all ease-in 0.15s',
                    borderRadius: '0.3rem', // rounded-md
                    padding: '0.32rem 0.25rem',
                    minHeight: '2.75rem', // chiều cao tương tự input
                  }),
                  placeholder: base => ({
                    ...base,
                    color: 'var(--color-muted)',
                  }),
                  singleValue: base => ({
                    ...base,
                    color: 'var(--color-text)',
                  }),
                  menu: base => ({
                    ...base,
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: '0.3rem',
                    marginTop: '0.25rem',
                    border: '1px solid var(--color-border)',
                    zIndex: 50,
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? 'var(--color-primary)'
                      : state.isFocused
                        ? 'var(--color-hover)'
                        : 'transparent',
                    color: state.isSelected ? 'white' : 'var(--color-text)',
                    cursor: 'pointer',
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  dropdownIndicator: base => ({
                    ...base,
                    color: 'var(--color-muted)',
                    paddingRight: '0.5rem',
                    '&:hover': { color: 'white' },
                  }),
                }}
              />
              <span className="text-red-500 text-xs block mt-1">
                {error?.message}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default SelectField;
