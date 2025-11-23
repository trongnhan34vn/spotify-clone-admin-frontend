import type { InputProps } from '../types/ui/Input.type';

const Input = ({
  disabled,
  className,
  type,
  id,
  placeholder,
  value,
  onChange,
  hidden,
  defaultValue,
}: InputProps) => {
  return (
    <input
      value={value}
      defaultValue={defaultValue}
      hidden={hidden}
      disabled={disabled}
      className={`${className} hover:border-white default-transition focus:border-white outline-none line px-3 py-3.5 border-[1px] w-full rounded border-[var(--color-border)]`}
      type={type ?? 'text'}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
