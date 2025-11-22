export type FieldProps = {
  name: string;
  label?: string;
  className?: string;
  type?: 'text' | 'select' | 'checkbox' | 'password';
  required?: boolean;
  pattern?: RegExp;
  id: string;
  placeholder?: string;
  onChange?: () => void;
  childClassName?: string
};