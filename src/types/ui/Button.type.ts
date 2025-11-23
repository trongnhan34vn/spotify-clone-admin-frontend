import type { ReactNode } from "react";

export type ButtonProps = {
  label: string | ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  disabled?: boolean
};