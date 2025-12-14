import { Controller, useFormContext } from 'react-hook-form';
import type { FieldProps } from '../types/ui/Form.type';
import Input from './Input';
import { EntityCode } from '../constants/entity.code.constant';
import { capitalizeFirst } from '../types/utils/string.format';

const TextField = ({
  type = 'text',
  label,
  name,
  placeholder,
  required,
  pattern,
  disabled,
  hidden,
  childClassName,
  validateValue,
  validateMessage,
  defaultValue,
  hiddenLabel,
  className,
  getValue,
}: FieldProps) => {
  const { control } = useFormContext();

  return (
    <div className={`mb-4 ${className} ${hidden && 'hidden'}`}>
      {!hiddenLabel && (
        <label className="font-semibold block text-sm mb-2" htmlFor={name}>
          {label}
        </label>
      )}

      <Controller
        // disabled={disabled}
        control={control}
        name={name}
        rules={{
          ...(required
            ? { required: `${capitalizeFirst(name)} is required.` }
            : {}),
          ...(pattern
            ? {
                pattern: {
                  value: pattern,
                  message: `${capitalizeFirst(name)} is invalid.`,
                },
              }
            : {}),
          ...(validateValue
            ? {
                validate: (value: string) => {
                  if (value !== validateValue) {
                    return (
                      validateMessage ||
                      `${capitalizeFirst(name)} does not match`
                    );
                  }
                  return true;
                },
              }
            : {}),
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <Input
              hidden={hidden}
              disabled={disabled}
              value={value}
              // defaultValue={value}
              className={`${error ? 'border-red-500' : ''} ${childClassName} ${disabled ? ' cursor-not-allowed' : ''}`}
              type={type}
              id={name}
              placeholder={placeholder}
              onChange={value => {
                onChange(value);
                getValue?.(value);
              }}
            />
            <span className="text-red-500 text-xs block mt-1">
              {error?.message}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default TextField;
