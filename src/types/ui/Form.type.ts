import type { ReactNode } from "react";

export type FieldProps = {
  name: string;
  label?: string | ReactNode;
  className?: string;
  type?: 'text' | 'select' | 'checkbox' | 'password';
  required?: boolean;
  pattern?: RegExp;
  id: string;
  placeholder?: string;
  onChange?: (e: string) => void;
  childClassName?: string
  disabled?: boolean;
  getValue?: (value: string) => void;
  hidden?:boolean
  validateValue?: any,
  validateMessage?: string,
  defaultValue?: any,
  hiddenLabel?: string | ReactNode,
};