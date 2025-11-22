import { Controller, useFormContext } from 'react-hook-form';
import type { FieldProps } from '../types/ui/Form.type';
import Input from './Input';


const Field = ({
  type = 'text',
  label,
  name,
  placeholder,
  required,
  pattern,
  childClassName,
}: FieldProps) => {
  const { control } = useFormContext();
  const renderCompByType = () => {
    switch (type) {
      case 'select':
        break;
      default:
        return (
          <Controller
            control={control}
            name={name}
            rules={{
              ...(required ? { required: `${label} is required` } : {}),
              ...(pattern
                ? {
                    pattern: { value: pattern, message: `${label} is invalid` },
                  }
                : {}),
            }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <div>
                <Input
                  className={`${error ? 'border-red-500' : ''} ${childClassName}`}
                  type={type}
                  id={name}
                  placeholder={placeholder}
                  onChange={onChange}
                />
                <span className='text-red-500 text-xs block mt-1'>{error?.message}</span>
              </div>
            )}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label className="font-semibold block text-sm mb-2" htmlFor={name}>
        {label}
      </label>
      {renderCompByType()}
    </div>
  );
};

export default Field;
