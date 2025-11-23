import type { ButtonProps } from '../types/ui/Button.type';

const Button = ({
  type = 'button',
  className,
  label,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${className} cursor-pointer default-transition hover:scale-[102%] hover:opacity-100 opacity-85 text-center text-black font-bold w-full bg-[var(--color-primary)] rounded-[50px] py-3.5`}
    >
      {label}
    </button>
  );
};

export default Button;
